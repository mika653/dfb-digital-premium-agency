// POST /api/dashboard/timesheet-ping
// Body: { viewerGid, viewerName, todayHours, note? }
// Sends Joe the "Mika hit 6 hours" email and stamps Upstash so we
// don't ping twice in the same day.
import { isAuthenticated } from './auth.js';
import { kvGet, kvSet } from './_upstash.js';

export default async function handler(req, res) {
  if (!isAuthenticated(req)) {
    res.status(401).json({ ok: false, error: 'Not authenticated' });
    return;
  }
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'Method not allowed' });
    return;
  }

  const { viewerGid, viewerName, todayHours, note } = req.body || {};
  if (!viewerGid || !viewerName) {
    res.status(400).json({ ok: false, error: 'viewerGid and viewerName required' });
    return;
  }

  const today = new Date();
  const dateKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  const kvKey = `timesheet:ping:${dateKey}:${viewerGid}`;

  // Already pinged today?
  try {
    const existing = await kvGet(kvKey);
    if (existing?.timestamp) {
      res.status(200).json({ ok: true, alreadyPinged: true, pingedAt: existing.timestamp });
      return;
    }
  } catch {
    // ignore — if KV is down we still try to send
  }

  const hours = Number(todayHours) || 0;
  const todayLabel = today.toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  try {
    const resp = await fetch('https://formsubmit.co/ajax/joe@dfbdigital.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        from_dashboard: 'DFB Dashboard · Auto Time Ping',
        who: viewerName,
        hours,
        date: todayLabel,
        note: String(note || '').trim() || '(no note — auto-ping at 6h threshold)',
        _subject: `${viewerName} hit ${hours} hours today — ${todayLabel}`,
      }),
    });
    if (!resp.ok) {
      const body = await resp.text().catch(() => '');
      throw new Error(`formsubmit returned ${resp.status}: ${body.slice(0, 200)}`);
    }
  } catch (err) {
    res.status(500).json({ ok: false, error: String(err.message || err) });
    return;
  }

  // Mark as pinged so we don't double-ping later in the day
  try {
    await kvSet(kvKey, { timestamp: Date.now(), hours, note: String(note || '').trim() });
  } catch {
    // non-fatal
  }

  res.status(200).json({ ok: true, alreadyPinged: false, pingedAt: Date.now() });
}
