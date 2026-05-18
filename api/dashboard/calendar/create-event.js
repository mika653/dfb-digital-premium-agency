// POST /api/dashboard/calendar/create-event
// Body: { viewerGid, summary, start, end, allDay?, location?, description?, timeZone? }
// Creates a single event on the viewer's primary calendar.
//
// Date/time format expectations:
// - allDay=true → start/end as YYYY-MM-DD (inclusive start, exclusive end)
// - allDay=false → start/end as ISO datetime strings (with offset or Z)
import { isAuthenticated } from '../auth.js';
import { getValidAccessToken } from './_helpers.js';

export default async function handler(req, res) {
  if (!isAuthenticated(req)) {
    res.status(401).json({ ok: false, error: 'Not authenticated' });
    return;
  }
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'Method not allowed' });
    return;
  }

  const { viewerGid, summary, start, end, allDay, location, description, timeZone } = req.body || {};

  if (!viewerGid) {
    res.status(400).json({ ok: false, error: 'viewerGid required' });
    return;
  }
  if (!summary || !String(summary).trim()) {
    res.status(400).json({ ok: false, error: 'Event title is required' });
    return;
  }
  if (!start || !end) {
    res.status(400).json({ ok: false, error: 'start and end are required' });
    return;
  }

  let accessToken;
  try {
    accessToken = await getValidAccessToken(viewerGid);
  } catch (err) {
    if (err.code === 'NOT_CONNECTED' || err.code === 'NEEDS_RECONNECT') {
      res.status(200).json({ ok: false, needsReconnect: true, error: err.message });
      return;
    }
    res.status(500).json({ ok: false, error: String(err.message || err) });
    return;
  }

  // Build the Google Calendar event body
  const eventBody = {
    summary: String(summary).trim(),
    ...(location ? { location: String(location).trim() } : {}),
    ...(description ? { description: String(description).trim() } : {}),
    start: allDay ? { date: start } : { dateTime: start, ...(timeZone ? { timeZone } : {}) },
    end: allDay ? { date: end } : { dateTime: end, ...(timeZone ? { timeZone } : {}) },
  };

  try {
    const createResp = await fetch(
      'https://www.googleapis.com/calendar/v3/calendars/primary/events',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventBody),
      }
    );

    if (!createResp.ok) {
      const body = await createResp.text().catch(() => '');
      // 403 with "insufficient permission" — scope mismatch (still using readonly token)
      const isScopeIssue = createResp.status === 403 && /insufficient/i.test(body);
      res.status(200).json({
        ok: false,
        needsReconnect: isScopeIssue,
        error: `Calendar API ${createResp.status}: ${body.slice(0, 300)}`,
      });
      return;
    }

    const created = await createResp.json();
    res.status(200).json({
      ok: true,
      event: {
        id: created.id,
        summary: created.summary,
        start: created.start?.dateTime || created.start?.date,
        end: created.end?.dateTime || created.end?.date,
        htmlLink: created.htmlLink,
        allDay: !created.start?.dateTime,
      },
    });
  } catch (err) {
    res.status(500).json({ ok: false, error: String(err.message || err) });
  }
}
