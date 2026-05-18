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

// Returns the workspace GID for the authenticated user.
// Cached per cold start.
let cachedWorkspaceGid = null;
export async function getWorkspaceGid() {
  if (cachedWorkspaceGid) return cachedWorkspaceGid;
  const me = await asanaFetch('/users/me');
  const workspaces = me?.data?.workspaces || [];
  if (!workspaces.length) throw new Error('No Asana workspaces found for this user');
  cachedWorkspaceGid = workspaces[0].gid;
  return cachedWorkspaceGid;
}

export async function getMe() {
  const me = await asanaFetch('/users/me');
  return me?.data;
}
