// Simple shared-password gate for the internal dashboard.
// Sets an HttpOnly cookie with an HMAC of the password so subsequent
// requests don't need to re-submit the password.
import crypto from 'crypto';

const COOKIE_NAME = 'dfb_dash';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

function sign(secret, payload) {
  return crypto.createHmac('sha256', secret).update(payload).digest('hex');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'Method not allowed' });
    return;
  }

  const password = (req.body && req.body.password) || '';
  const expected = process.env.DASHBOARD_PASSWORD;
  const secret = process.env.DASHBOARD_SECRET || expected;

  if (!expected) {
    res.status(500).json({ ok: false, error: 'DASHBOARD_PASSWORD env var not set' });
    return;
  }

  if (password !== expected) {
    res.status(401).json({ ok: false, error: 'Incorrect password' });
    return;
  }

  const token = sign(secret, 'authenticated');
  const cookie = [
    `${COOKIE_NAME}=${token}`,
    'HttpOnly',
    'Secure',
    'SameSite=Lax',
    'Path=/',
    `Max-Age=${COOKIE_MAX_AGE}`,
  ].join('; ');

  res.setHeader('Set-Cookie', cookie);
  res.status(200).json({ ok: true });
}

export function isAuthenticated(req) {
  const expected = process.env.DASHBOARD_PASSWORD;
  const secret = process.env.DASHBOARD_SECRET || expected;
  if (!expected) return false;

  const cookies = parseCookies(req.headers.cookie || '');
  const provided = cookies[COOKIE_NAME];
  if (!provided) return false;

  const expectedToken = sign(secret, 'authenticated');
  return crypto.timingSafeEqual(Buffer.from(provided), Buffer.from(expectedToken));
}

function parseCookies(header) {
  const out = {};
  header.split(';').forEach((pair) => {
    const idx = pair.indexOf('=');
    if (idx < 0) return;
    const key = pair.slice(0, idx).trim();
    const val = pair.slice(idx + 1).trim();
    if (key) out[key] = decodeURIComponent(val);
  });
  return out;
}
