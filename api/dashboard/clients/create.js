// POST /api/dashboard/clients/create
// Body: { name, notes?, applyTemplate, templateTasks?: [{ name, daysFromNow, assigneeGid? }] }
// Creates a new Asana project (one project = one client in DFB's setup)
// and optionally seeds it with an onboarding template of tasks.
import { isAuthenticated } from '../auth.js';
import { asanaFetch, getWorkspaceGid } from '../_asana.js';

function isoDateOffset(days) {
  const d = new Date();
  d.setDate(d.getDate() + Number(days || 0));
  return d.toISOString().slice(0, 10);
}

export default async function handler(req, res) {
  if (!isAuthenticated(req)) {
    res.status(401).json({ ok: false, error: 'Not authenticated' });
    return;
  }
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'Method not allowed' });
    return;
  }

  const { name, notes, applyTemplate, templateTasks } = req.body || {};
  if (!name || !String(name).trim()) {
    res.status(400).json({ ok: false, error: 'Client name is required' });
    return;
  }

  try {
    const workspaceGid = await getWorkspaceGid();

    // 1) Create the project
    const projectCreated = await asanaFetch('/projects', {
      method: 'POST',
      body: JSON.stringify({
        data: {
          name: String(name).trim(),
          workspace: workspaceGid,
          ...(notes ? { notes: String(notes).trim() } : {}),
        },
      }),
    });
    const project = projectCreated?.data;
    if (!project?.gid) {
      res.status(500).json({ ok: false, error: 'Project creation failed (no GID returned)' });
      return;
    }

    // 2) Seed template tasks if requested
    const seededTasks = [];
    const seedErrors = [];
    if (applyTemplate && Array.isArray(templateTasks)) {
      // Sequential so we don't hammer Asana with parallel writes for one project
      for (const t of templateTasks) {
        const taskName = String(t?.name || '').trim();
        if (!taskName) continue;
        try {
          const created = await asanaFetch('/tasks', {
            method: 'POST',
            body: JSON.stringify({
              data: {
                name: taskName,
                projects: [project.gid],
                workspace: workspaceGid,
                ...(t.daysFromNow != null ? { due_on: isoDateOffset(t.daysFromNow) } : {}),
                ...(t.assigneeGid ? { assignee: t.assigneeGid } : {}),
              },
            }),
          });
          if (created?.data?.gid) {
            seededTasks.push({ gid: created.data.gid, name: created.data.name });
          }
        } catch (err) {
          seedErrors.push({ name: taskName, error: String(err.message || err) });
        }
      }
    }

    res.status(200).json({
      ok: true,
      project: { gid: project.gid, name: project.name, url: project.permalink_url },
      tasksCreated: seededTasks.length,
      seedErrors,
    });
  } catch (err) {
    res.status(500).json({ ok: false, error: String(err.message || err) });
  }
}
