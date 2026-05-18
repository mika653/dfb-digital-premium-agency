// Shared helpers for the calendar endpoints.
// Encapsulates the token-refresh dance so create-event and events don't
// duplicate the logic.
import { kvGet, kvSet } from '../_upstash.js';

/**
 * Returns a usable access token for the given viewerGid, refreshing if needed.
 * Throws if the viewer hasn't connected or the refresh token is revoked.
 */
export async function getValidAccessToken(viewerGid) {
  const stored = await kvGet(`calendar:${viewerGid}`);
  if (!stored || !stored.refresh_token) {
    const err = new Error('Not connected');
    err.code = 'NOT_CONNECTED';
    throw err;
  }

  let accessToken = stored.access_token;
  const expiresAt = Number(stored.expires_at || 0);
  const needsRefresh = !accessToken || !expiresAt || Date.now() >= expiresAt - 60_000;

  if (!needsRefresh) return accessToken;

  const refreshResp = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID || '',
      client_secret: process.env.GOOGLE_CLIENT_SECRET || '',
      refresh_token: stored.refresh_token,
      grant_type: 'refresh_token',
    }).toString(),
  });

  if (!refreshResp.ok) {
    const body = await refreshResp.text().catch(() => '');
    const isRevoked = refreshResp.status === 400 || refreshResp.status === 401;
    const err = new Error(`Refresh failed (${refreshResp.status}): ${body.slice(0, 200)}`);
    err.code = isRevoked ? 'NEEDS_RECONNECT' : 'REFRESH_FAILED';
    throw err;
  }

  const refreshed = await refreshResp.json();
  accessToken = refreshed.access_token;
  await kvSet(`calendar:${viewerGid}`, {
    ...stored,
    access_token: accessToken,
    expires_at: Date.now() + Number(refreshed.expires_in || 0) * 1000,
  });
  return accessToken;
}
