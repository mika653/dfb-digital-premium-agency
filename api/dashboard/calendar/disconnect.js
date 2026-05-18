// POST /api/dashboard/calendar/disconnect
// Body: { viewerGid }
// Removes the stored Google Calendar tokens for the viewer.
// Note: this only forgets the tokens locally. To fully revoke access,
// the user can also remove the app at https://myaccount.google.com/permissions.
import { isAuthenticated } from '../auth.js';
import { kvDel } from '../_upstash.js';

export default async function handler(req, res) {
  if (!isAuthenticated(req)) {
    res.status(401).json({ ok: false, error: 'Not authenticated' });
    return;
  }
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'Method not allowed' });
    return;
  }

  const viewerGid = String(req.body?.viewerGid || req.query?.viewerGid || '').trim();
  if (!viewerGid) {
    res.status(400).json({ ok: false, error: 'viewerGid required' });
    return;
  }

  try {
    await kvDel(`calendar:${viewerGid}`);
    res.status(200).json({ ok: true });
  } catch (err) {
    res.status(500).json({ ok: false, error: String(err.message || err) });
  }
}
