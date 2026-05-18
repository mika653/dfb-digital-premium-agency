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

    // Per-user task fetch in parallel. completed_since=now is the
    // Asana idiom for "only incomplete tasks."
    const perUser = await Promise.all(
      users.map((u) =>
        asanaFetch(
          `/tasks?workspace=${workspaceGid}&assignee=${u.gid}&completed_since=now&limit=100&opt_fields=${fields}`
        ).catch(() => ({ data: [] }))
      )
    );

    // Combine + dedupe (a task assigned to one user can technically show
    // up only once, but dedupe defensively in case of collaborator queries).
    const seen = new Set();
    const tasks = [];
    for (const result of perUser) {
      for (const t of result?.data || []) {
        if (seen.has(t.gid)) continue;
        seen.add(t.gid);
        tasks.push(t);
      }
    }

    const today = startOfDay(new Date());
    const tomorrow = addDays(today, 1);
    const endOfWeek = addDays(today, 7);

    const buckets = { overdue: [], today: [], thisWeek: [], upcoming: [], noDate: [] };

    for (const task of tasks) {
      const due = task.due_on || (task.due_at ? task.due_at.slice(0, 10) : null);
      const item = {
        gid: task.gid,
        name: task.name,
        due,
        assignee: task.assignee ? { gid: task.assignee.gid, name: task.assignee.name } : null,
        projects: (task.projects || []).map((p) => ({ gid: p.gid, name: p.name })),
        url: task.permalink_url,
        notes: task.notes || '',
      };

      if (!due) {
        buckets.noDate.push(item);
        continue;
      }
      const dueDate = parseDateOnly(due);
      if (dueDate < today) buckets.overdue.push(item);
      else if (dueDate.getTime() === today.getTime()) buckets.today.push(item);
      else if (dueDate < endOfWeek) buckets.thisWeek.push(item);
      else buckets.upcoming.push(item);
    }

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
      },
      buckets,
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
