// GET /api/dashboard/calendar/callback?code=...&state=...
// Google redirects here after the user grants/denies access.
// Verifies the signed state, exchanges code for tokens, stores them in KV,
// then redirects back to /dashboard with a status query param.
import crypto from 'crypto';
import { kvSet } from '../_upstash.js';

function signingSecret() {
  return process.env.DASHBOARD_SECRET || process.env.DASHBOARD_PASSWORD || 'fallback-secret';
}

function redirectToDashboard(res, params) {
  const qs = new URLSearchParams(params).toString();
  res.writeHead(302, { Location: `/dashboard?${qs}` });
  res.end();
}

export default async function handler(req, res) {
  // OAuth callback is hit by the browser after Google's redirect.
  // We can't require dashboard-auth here because the cookie might not
  // be sent across the cross-site redirect on first attempt. We rely
  // on the signed state instead.
  const { code, state, error } = req.query;

  if (error) {
    return redirectToDashboard(res, { cal_error: String(error) });
  }
  if (!code || !state) {
    return redirectToDashboard(res, { cal_error: 'missing_params' });
  }

  // Verify state: viewerGid.nonce.signature
  const parts = String(state).split('.');
  if (parts.length !== 3) {
    return redirectToDashboard(res, { cal_error: 'bad_state' });
  }
  const [viewerGid, nonce, providedSig] = parts;
  const expectedSig = crypto
    .createHmac('sha256', signingSecret())
    .update(`${viewerGid}.${nonce}`)
    .digest('hex');

  // timing-safe equality check
  const a = Buffer.from(providedSig);
  const b = Buffer.from(expectedSig);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
    return redirectToDashboard(res, { cal_error: 'state_invalid' });
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return redirectToDashboard(res, { cal_error: 'server_misconfigured' });
  }

  const host = req.headers['x-forwarded-host'] || req.headers.host;
  const protocol = req.headers['x-forwarded-proto'] || 'https';
  const redirectUri = `${protocol}://${host}/api/dashboard/calendar/callback`;

  try {
    // Exchange authorization code for tokens
    const tokenResp = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code: String(code),
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }).toString(),
    });

    if (!tokenResp.ok) {
      const body = await tokenResp.text().catch(() => '');
      console.error('Token exchange failed', tokenResp.status, body);
      return redirectToDashboard(res, { cal_error: 'token_exchange_failed' });
    }

    const tokens = await tokenResp.json();
    // tokens: { access_token, expires_in, refresh_token, scope, token_type, id_token? }

    // Best-effort: fetch the authorized user's email so the dashboard can show
    // "Connected as foo@gmail.com" without storing personal info beyond that.
    let calEmail = '';
    try {
      const ui = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: { Authorization: `Bearer ${tokens.access_token}` },
      });
      if (ui.ok) {
        const json = await ui.json();
        calEmail = json.email || '';
      }
    } catch {
      // non-fatal
    }

    const record = {
      refresh_token: tokens.refresh_token || '',
      access_token: tokens.access_token || '',
      expires_at: Date.now() + (Number(tokens.expires_in || 0) * 1000),
      email: calEmail,
      connected_at: Date.now(),
    };

    if (!record.refresh_token) {
      // Without a refresh_token we can't fetch later — usually means user
      // had a previous grant. They need to revoke and re-authorize.
      return redirectToDashboard(res, { cal_error: 'no_refresh_token' });
    }

    await kvSet(`calendar:${viewerGid}`, record);

    return redirectToDashboard(res, { cal_connected: '1' });
  } catch (err) {
    console.error('callback error', err);
    return redirectToDashboard(res, { cal_error: String(err.message || err) });
  }
}
