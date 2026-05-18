// POST /api/dashboard/create-task
// Body: { name, assigneeGid?, projectGid?, dueOn?, notes? }
import { isAuthenticated } from './auth.js';
import { asanaFetch, getWorkspaceGid } from './_asana.js';

export default async function handler(req, res) {
  if (!isAuthenticated(req)) {
    res.status(401).json({ ok: false, error: 'Not authenticated' });
    return;
  }
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'Method not allowed' });
    return;
  }

  const { name, assigneeGid, projectGid, dueOn, notes } = req.body || {};
  if (!name || !name.trim()) {
    res.status(400).json({ ok: false, error: 'Task name is required' });
    return;
  }

  try {
    const workspaceGid = await getWorkspaceGid();
    const data = { name: name.trim(), workspace: workspaceGid };
    if (assigneeGid) data.assignee = assigneeGid;
    if (dueOn) data.due_on = dueOn; // YYYY-MM-DD
    if (notes) data.notes = notes;
    if (projectGid) data.projects = [projectGid];

    const created = await asanaFetch('/tasks', {
      method: 'POST',
      body: JSON.stringify({ data }),
    });

    const t = created?.data;
    res.status(200).json({
      ok: true,
      task: {
        gid: t.gid,
        name: t.name,
        url: t.permalink_url,
      },
    });
  } catch (err) {
    res.status(500).json({ ok: false, error: String(err.message || err) });
  }
}
