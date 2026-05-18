// GET /api/dashboard/meta
// Returns workspace members and projects for the quick-add form dropdowns.
import { isAuthenticated } from './auth.js';
import { asanaFetch, getWorkspaceGid } from './_asana.js';

export default async function handler(req, res) {
  if (!isAuthenticated(req)) {
    res.status(401).json({ ok: false, error: 'Not authenticated' });
    return;
  }

  try {
    const workspaceGid = await getWorkspaceGid();

    const [users, projects] = await Promise.all([
      asanaFetch(`/workspaces/${workspaceGid}/users?opt_fields=name,email`),
      asanaFetch(`/workspaces/${workspaceGid}/projects?archived=false&opt_fields=name&limit=100`),
    ]);

    res.status(200).json({
      ok: true,
      workspaceGid,
      users: (users?.data || []).map((u) => ({ gid: u.gid, name: u.name, email: u.email })),
      projects: (projects?.data || []).map((p) => ({ gid: p.gid, name: p.name })),
    });
  } catch (err) {
    res.status(500).json({ ok: false, error: String(err.message || err) });
  }
}
