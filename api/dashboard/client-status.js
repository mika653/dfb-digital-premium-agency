// GET /api/dashboard/client-status?projectGid=...
// PUBLIC endpoint — returns a read-only snapshot of a client's project status
// for sharing via a /status/<gid> URL.
// No auth required (we expose project data shared via the URL only).
//
// Combines:
// - Asana project + tasks (live)
// - Upstash notes for this project (most recent saved by team)
// - Computed: progress %, active work, recent wins, upcoming milestones
import { asanaFetch, getWorkspaceGid } from './_asana.js';
import { kvGet } from './_upstash.js';

export default async function handler(req, res) {
  const projectGid = String(req.query.projectGid || '').trim();
  if (!projectGid) {
    res.status(400).json({ ok: false, error: 'projectGid required' });
    return;
  }

  try {
    // 1) Project info
    const projectResp = await asanaFetch(`/projects/${projectGid}?opt_fields=name,notes,created_at,modified_at,archived`).catch(() => null);
    const project = projectResp?.data;
    if (!project) {
      res.status(404).json({ ok: false, error: 'Project not found' });
      return;
    }

    // 2) Tasks for this project (both open and recently completed)
    const fields = [
      'name', 'completed', 'completed_at', 'due_on', 'due_at',
      'created_at', 'modified_at',
      'assignee.name', 'permalink_url',
    ].join(',');

    const sevenDaysAgoIso = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

    const [openResp, recentResp] = await Promise.all([
      asanaFetch(`/projects/${projectGid}/tasks?completed_since=now&limit=100&opt_fields=${fields}`).catch(() => ({ data: [] })),
      asanaFetch(`/projects/${projectGid}/tasks?completed_since=${encodeURIComponent(sevenDaysAgoIso)}&limit=100&opt_fields=${fields}`).catch(() => ({ data: [] })),
    ]);

    const openTasks = (openResp?.data || []).filter((t) => !t.completed);
    const recentCompleted = (recentResp?.data || []).filter((t) => t.completed);

    // 3) Notes from KV (best-effort)
    let notes = '';
    try {
      const stored = await kvGet(`notes:project:${projectGid}`);
      notes = stored?.content || '';
    } catch {
      // ignore
    }

    // 4) Compute rollups
    const today = startOfDay(new Date());
    const overdue = openTasks.filter((t) => t.due_on && parseDateOnly(t.due_on) < today);
    const dueSoon = openTasks
      .filter((t) => t.due_on && parseDateOnly(t.due_on) >= today)
      .sort((a, b) => (a.due_on || '').localeCompare(b.due_on || ''))
      .slice(0, 6);

    const totalSoFar = openTasks.length + recentCompleted.length;
    const progressPct = totalSoFar === 0 ? 0 : Math.round((recentCompleted.length / totalSoFar) * 100);

    res.status(200).json({
      ok: true,
      project: {
        gid: project.gid,
        name: project.name,
        createdAt: project.created_at,
      },
      stats: {
        openCount: openTasks.length,
        overdueCount: overdue.length,
        completedLast7Days: recentCompleted.length,
        progressPct,
      },
      recentWins: recentCompleted
        .map((t) => ({
          gid: t.gid,
          name: t.name,
          completedAt: t.completed_at,
          assignee: t.assignee?.name || null,
        }))
        .sort((a, b) => (b.completedAt || '').localeCompare(a.completedAt || '')),
      upcoming: dueSoon.map((t) => ({
        gid: t.gid,
        name: t.name,
        due: t.due_on,
        assignee: t.assignee?.name || null,
      })),
      overdue: overdue.map((t) => ({
        gid: t.gid,
        name: t.name,
        due: t.due_on,
        assignee: t.assignee?.name || null,
      })),
      notes,
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
function parseDateOnly(yyyymmdd) {
  const [y, m, day] = yyyymmdd.split('-').map(Number);
  return new Date(y, m - 1, day);
}
