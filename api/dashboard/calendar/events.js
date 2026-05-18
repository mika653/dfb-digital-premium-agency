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

  // Fetch events from today through 7 days out
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const horizon = new Date(startOfToday.getTime() + 7 * 24 * 60 * 60 * 1000);
  const params = new URLSearchParams({
    timeMin: startOfToday.toISOString(),
    timeMax: horizon.toISOString(),
    singleEvents: 'true',
    orderBy: 'startTime',
    maxResults: '50',
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
      events,
    });
  } catch (err) {
    res.status(500).json({ ok: false, error: String(err.message || err) });
  }
}
