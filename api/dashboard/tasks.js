// GET /api/dashboard/tasks
// Returns incomplete tasks for everyone in the workspace, grouped by
// overdue / today / this-week / upcoming.
//
// NOTE: We deliberately avoid the /workspaces/{gid}/tasks/search endpoint
// because it requires Asana Premium. Instead we iterate workspace users
// and fetch each user's incomplete tasks via /tasks (free-tier available).
import { isAuthenticated } from './auth.js';
import { asanaFetch, getMe, getWorkspaceGid } from './_asana.js';

export default async function handler(req, res) {
  if (!isAuthenticated(req)) {
    res.status(401).json({ ok: false, error: 'Not authenticated' });
    return;
  }

  if (req.method !== 'GET') {
    res.status(405).json({ ok: false, error: 'Method not allowed' });
    return;
  }

  try {
    const me = await getMe();
    const workspaceGid = await getWorkspaceGid();

    const fields = [
      'name',
      'completed',
      'due_on',
      'due_at',
      'created_at',
      'modified_at',
      'assignee.name',
      'assignee.gid',
      'projects.name',
      'projects.gid',
      'permalink_url',
      'notes',
    ].join(',');

    // Fetch workspace users (capped for safety; tiny agency teams).
    const usersResp = await asanaFetch(
      `/workspaces/${workspaceGid}/users?limit=25&opt_fields=name`
    );
    const users = usersResp?.data || [];

    // Two parallel fetches per user:
    //  - incomplete tasks (completed_since=now)
    //  - tasks completed in the last 7 days (for the Weekly Review wins list)
    const sevenDaysAgoIso = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const perUser = await Promise.all(
      users.map(async (u) => {
        const [openResp, recentResp] = await Promise.all([
          asanaFetch(
            `/tasks?workspace=${workspaceGid}&assignee=${u.gid}&completed_since=now&limit=100&opt_fields=${fields}`
          ).catch(() => ({ data: [] })),
          asanaFetch(
            `/tasks?workspace=${workspaceGid}&assignee=${u.gid}&completed_since=${encodeURIComponent(sevenDaysAgoIso)}&limit=100&opt_fields=${fields}`
          ).catch(() => ({ data: [] })),
        ]);
        return { open: openResp?.data || [], recent: recentResp?.data || [] };
      })
    );

    // Combine + dedupe open tasks
    const seenOpen = new Set();
    let tasks = [];
    for (const result of perUser) {
      for (const t of result.open || []) {
        if (t.completed) continue; // safety: skip anything marked completed
        if (seenOpen.has(t.gid)) continue;
        seenOpen.add(t.gid);
        tasks.push(t);
      }
    }

    // Completed-this-week list for the Weekly Review
    const seenRecent = new Set();
    const recentlyCompleted = [];
    for (const result of perUser) {
      for (const t of result.recent || []) {
        if (!t.completed) continue;
        if (seenRecent.has(t.gid)) continue;
        seenRecent.add(t.gid);
        recentlyCompleted.push(t);
      }
    }

    // Optional: hide tasks whose only projects are in DASHBOARD_HIDE_PROJECTS
    // (comma-separated project names, case-insensitive). Tasks with at least
    // one visible project — or no projects at all — pass through.
    const hideList = (process.env.DASHBOARD_HIDE_PROJECTS || '')
      .split(',')
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);
    if (hideList.length) {
      tasks = tasks.filter((t) => {
        const projects = t.projects || [];
        if (projects.length === 0) return true;
        return projects.some((p) => !hideList.includes((p.name || '').toLowerCase()));
      });
    }

    const today = startOfDay(new Date());
    const endOfWeek = addDays(today, 7);
    const STALE_DAYS = 30; // a project is "at risk" if its oldest open task is older than this

    const buckets = { overdue: [], today: [], thisWeek: [], upcoming: [], noDate: [] };
    // Aggregations
    const projectMap = new Map(); // gid → client tile
    const capacityMap = new Map(); // assignee gid → capacity row

    for (const task of tasks) {
      const due = task.due_on || (task.due_at ? task.due_at.slice(0, 10) : null);
      const createdAtMs = task.created_at ? new Date(task.created_at).getTime() : Date.now();
      const ageDays = Math.floor((Date.now() - createdAtMs) / (1000 * 60 * 60 * 24));

      const item = {
        gid: task.gid,
        name: task.name,
        due,
        assignee: task.assignee ? { gid: task.assignee.gid, name: task.assignee.name } : null,
        projects: (task.projects || []).map((p) => ({ gid: p.gid, name: p.name })),
        url: task.permalink_url,
        notes: task.notes || '',
        ageDays,
      };

      // Bucket by due date
      let isOverdue = false;
      if (!due) {
        buckets.noDate.push(item);
      } else {
        const dueDate = parseDateOnly(due);
        if (dueDate < today) {
          buckets.overdue.push(item);
          isOverdue = true;
        } else if (dueDate.getTime() === today.getTime()) {
          buckets.today.push(item);
        } else if (dueDate < endOfWeek) {
          buckets.thisWeek.push(item);
        } else {
          buckets.upcoming.push(item);
        }
      }

      // Per-project aggregation (client tiles)
      for (const p of task.projects || []) {
        const key = p.gid;
        if (!projectMap.has(key)) {
          projectMap.set(key, {
            gid: p.gid,
            name: p.name,
            total: 0,
            overdue: 0,
            today: 0,
            upcoming: 0,
            oldestAgeDays: 0,
          });
        }
        const proj = projectMap.get(key);
        proj.total += 1;
        if (isOverdue) proj.overdue += 1;
        if (due && parseDateOnly(due).getTime() === today.getTime()) proj.today += 1;
        if (due && parseDateOnly(due) > today) proj.upcoming += 1;
        if (ageDays > proj.oldestAgeDays) proj.oldestAgeDays = ageDays;
      }

      // Per-person aggregation (capacity)
      if (task.assignee && task.assignee.gid) {
        const key = task.assignee.gid;
        if (!capacityMap.has(key)) {
          capacityMap.set(key, {
            gid: key,
            name: task.assignee.name,
            total: 0,
            overdue: 0,
            today: 0,
            thisWeek: 0,
          });
        }
        const cap = capacityMap.get(key);
        cap.total += 1;
        if (isOverdue) cap.overdue += 1;
        if (due && parseDateOnly(due).getTime() === today.getTime()) cap.today += 1;
        if (due) {
          const dd = parseDateOnly(due);
          if (dd > today && dd < endOfWeek) cap.thisWeek += 1;
        }
      }
    }

    // Convert maps to sorted arrays. Show riskiest projects first.
    const clients = Array.from(projectMap.values())
      .map((p) => ({
        ...p,
        atRisk: p.overdue > 0 || p.oldestAgeDays >= STALE_DAYS,
      }))
      .sort((a, b) => {
        if (b.overdue !== a.overdue) return b.overdue - a.overdue;
        if (b.oldestAgeDays !== a.oldestAgeDays) return b.oldestAgeDays - a.oldestAgeDays;
        return b.total - a.total;
      });

    const capacity = Array.from(capacityMap.values()).sort((a, b) => b.total - a.total);

    // Shape the "recently completed" wins list for the Weekly Review
    const wins = recentlyCompleted
      .map((t) => ({
        gid: t.gid,
        name: t.name,
        assignee: t.assignee ? { gid: t.assignee.gid, name: t.assignee.name } : null,
        projects: (t.projects || []).map((p) => ({ gid: p.gid, name: p.name })),
        url: t.permalink_url,
      }))
      .sort((a, b) => (a.name || '').localeCompare(b.name || ''));

    res.status(200).json({
      ok: true,
      me: { gid: me.gid, name: me.name, email: me.email },
      workspaceGid,
      counts: {
        overdue: buckets.overdue.length,
        today: buckets.today.length,
        thisWeek: buckets.thisWeek.length,
        upcoming: buckets.upcoming.length,
        noDate: buckets.noDate.length,
        winsThisWeek: wins.length,
      },
      buckets,
      clients,
      capacity,
      wins,
    });
  } catch (err) {
    res.status(500).json({ ok: false, error: String(err.message || err) });
  }
}

function startOfDay(d) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}
function addDays(d, days) {
  const x = new Date(d);
  x.setDate(x.getDate() + days);
  return x;
}
function parseDateOnly(yyyymmdd) {
  const [y, m, day] = yyyymmdd.split('-').map(Number);
  return new Date(y, m - 1, day);
}
