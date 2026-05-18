// GET /api/dashboard/calendar/events?viewerGid=...
// Returns the viewer's calendar events for today + next 7 days.
// Returns {connected: false} if the viewer hasn't authorized Google yet.
// Refreshes the access token automatically when it's near expiry.
import { isAuthenticated } from '../auth.js';
import { kvGet, kvSet } from '../_upstash.js';

export default async function handler(req, res) {
  if (!isAuthenticated(req)) {
    res.status(401).json({ ok: false, error: 'Not authenticated' });
    return;
  }

  const viewerGid = String(req.query.viewerGid || '').trim();
  if (!viewerGid) {
    res.status(400).json({ ok: false, error: 'viewerGid required' });
    return;
  }

  const stored = await kvGet(`calendar:${viewerGid}`);
  if (!stored || !stored.refresh_token) {
    res.status(200).json({ ok: true, connected: false });
    return;
  }

  // Refresh access token if missing or near expiry
  let accessToken = stored.access_token;
  if (!accessToken || !stored.expires_at || Date.now() >= Number(stored.expires_at) - 60_000) {
    try {
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
        // If refresh token was revoked, surface that so the UI can prompt reconnect
        const isRevoked = refreshResp.status === 400 || refreshResp.status === 401;
        res.status(200).json({
          ok: true,
          connected: false,
          needsReconnect: isRevoked,
          error: `Refresh failed (${refreshResp.status}): ${body.slice(0, 200)}`,
        });
        return;
      }
      const refreshed = await refreshResp.json();
      accessToken = refreshed.access_token;
      await kvSet(`calendar:${viewerGid}`, {
        ...stored,
        access_token: accessToken,
        expires_at: Date.now() + Number(refreshed.expires_in || 0) * 1000,
      });
    } catch (err) {
      res.status(500).json({ ok: false, error: String(err.message || err) });
      return;
    }
  }

  // Fetch events for a configurable window.
  // Default: the visible month grid (6 weeks centered on the current month)
  // Optional ?month=YYYY-MM lets the frontend page through months.
  const monthParam = String(req.query.month || '').trim();
  let baseDate;
  if (/^\d{4}-\d{2}$/.test(monthParam)) {
    const [y, m] = monthParam.split('-').map(Number);
    baseDate = new Date(y, m - 1, 1);
  } else {
    const now = new Date();
    baseDate = new Date(now.getFullYear(), now.getMonth(), 1);
  }

  // Start of the calendar grid: the Sunday on or before the 1st of the month.
  const gridStart = new Date(baseDate);
  gridStart.setDate(gridStart.getDate() - gridStart.getDay());
  // End of the calendar grid: 42 days later (6 full weeks).
  const gridEnd = new Date(gridStart);
  gridEnd.setDate(gridEnd.getDate() + 42);

  const params = new URLSearchParams({
    timeMin: gridStart.toISOString(),
    timeMax: gridEnd.toISOString(),
    singleEvents: 'true',
    orderBy: 'startTime',
    maxResults: '250',
  });

  try {
    const eventsResp = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/primary/events?${params.toString()}`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    if (!eventsResp.ok) {
      const body = await eventsResp.text().catch(() => '');
      res.status(500).json({ ok: false, error: `Calendar API ${eventsResp.status}: ${body.slice(0, 200)}` });
      return;
    }
    const data = await eventsResp.json();
    const events = (data.items || []).map((e) => ({
      id: e.id,
      summary: e.summary || '(no title)',
      start: e.start?.dateTime || e.start?.date,
      end: e.end?.dateTime || e.end?.date,
      location: e.location || '',
      htmlLink: e.htmlLink || '',
      allDay: !e.start?.dateTime,
      attendees: (e.attendees || []).length,
    }));

    res.status(200).json({
      ok: true,
      connected: true,
      email: stored.email || '',
      month: `${baseDate.getFullYear()}-${String(baseDate.getMonth() + 1).padStart(2, '0')}`,
      events,
    });
  } catch (err) {
    res.status(500).json({ ok: false, error: String(err.message || err) });
  }
}
