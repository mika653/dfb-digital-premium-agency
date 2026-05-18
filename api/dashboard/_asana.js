// Thin Asana API wrapper. All calls use the Personal Access Token
// stored in ASANA_PAT env var. Keep PAT server-side only.

const ASANA_BASE = 'https://app.asana.com/api/1.0';

export async function asanaFetch(path, options = {}) {
  const pat = process.env.ASANA_PAT;
  if (!pat) throw new Error('ASANA_PAT env var not set');

  const url = path.startsWith('http') ? path : `${ASANA_BASE}${path}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${pat}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    const body = await response.text().catch(() => '');
    throw new Error(`Asana ${response.status}: ${body || response.statusText}`);
  }

  return response.json();
}

// Returns the workspace GID to operate against.
// If ASANA_WORKSPACE_NAME is set, picks the workspace with that name
// (case-insensitive). Otherwise falls back to the first workspace
// the authenticated user belongs to. Cached per cold start.
let cachedWorkspaceGid = null;
export async function getWorkspaceGid() {
  if (cachedWorkspaceGid) return cachedWorkspaceGid;
  const me = await asanaFetch('/users/me');
  const workspaces = me?.data?.workspaces || [];
  if (!workspaces.length) throw new Error('No Asana workspaces found for this user');

  const wanted = (process.env.ASANA_WORKSPACE_NAME || '').trim().toLowerCase();
  if (wanted) {
    const match = workspaces.find((w) => (w.name || '').toLowerCase() === wanted);
    if (match) {
      cachedWorkspaceGid = match.gid;
      return cachedWorkspaceGid;
    }
    const available = workspaces.map((w) => w.name).join(', ');
    throw new Error(
      `ASANA_WORKSPACE_NAME="${process.env.ASANA_WORKSPACE_NAME}" not found. Available workspaces: ${available}`
    );
  }

  cachedWorkspaceGid = workspaces[0].gid;
  return cachedWorkspaceGid;
}

export async function getMe() {
  const me = await asanaFetch('/users/me');
  return me?.data;
}
