// GET /api/dashboard/calendar/authorize?viewerGid=...
// Kicks off the Google OAuth flow for the calling viewer.
// Builds a signed state token (HMAC of viewerGid+nonce) so the callback
// can verify the response without a separate state cookie.
import crypto from 'crypto';
import { isAuthenticated } from '../auth.js';

const OAUTH_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
// Read + write events on the user's calendars (NOT settings/sharing).
// Tighter than the broader /auth/calendar scope.
const SCOPES = [
  'https://www.googleapis.com/auth/calendar.events',
  'https://www.googleapis.com/auth/userinfo.email',
].join(' ');

function signingSecret() {
  return process.env.DASHBOARD_SECRET || process.env.DASHBOARD_PASSWORD || 'fallback-secret';
}

export default async function handler(req, res) {
  if (!isAuthenticated(req)) {
    res.status(401).json({ ok: false, error: 'Not authenticated' });
    return;
  }

  const viewerGid = String(req.query.viewerGid || '').trim();
  if (!viewerGid) {
    res.status(400).json({ ok: false, error: 'viewerGid query param required' });
    return;
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  if (!clientId) {
    res.status(500).json({ ok: false, error: 'GOOGLE_CLIENT_ID env var not set' });
    return;
  }

  const nonce = crypto.randomBytes(16).toString('hex');
  const payload = `${viewerGid}.${nonce}`;
  const sig = crypto.createHmac('sha256', signingSecret()).update(payload).digest('hex');
  const state = `${payload}.${sig}`;

  const host = req.headers['x-forwarded-host'] || req.headers.host;
  const protocol = req.headers['x-forwarded-proto'] || 'https';
  const redirectUri = `${protocol}://${host}/api/dashboard/calendar/callback`;

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: SCOPES,
    access_type: 'offline', // need refresh_token
    prompt: 'consent',       // force refresh_token on every connect
    state,
  });

  res.writeHead(302, { Location: `${OAUTH_AUTH_URL}?${params.toString()}` });
  res.end();
}
