// GET /api/dashboard/timesheet?viewerGid=...
// Reads the configured Google Sheet, parses duration strings ("1 hr",
// "30 mins", "4 hrs"), sums hours for today and this week, and returns
// whether Joe's already been pinged about today's 6-hour milestone.
//
// Config:
// - TIMESHEET_SPREADSHEET_ID env var holds the spreadsheet to read.
// - Falls back to a hardcoded default (Mika's tracker) so the feature
//   works out of the box.
import { isAuthenticated } from './auth.js';
import { getValidAccessToken } from './calendar/_helpers.js';
import { kvGet } from './_upstash.js';

const DEFAULT_SPREADSHEET_ID = '1ZKQfXSTa6lKwA-P9qQzeIu9X--RgIRMXkc_oQnbsvPk';

const MONTH_NAMES = [
  'january', 'february', 'march', 'april', 'may', 'june',
  'july', 'august', 'september', 'october', 'november', 'december',
];

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

  const spreadsheetId = process.env.TIMESHEET_SPREADSHEET_ID || DEFAULT_SPREADSHEET_ID;

  let accessToken;
  try {
    accessToken = await getValidAccessToken(viewerGid);
  } catch (err) {
    if (err.code === 'NOT_CONNECTED' || err.code === 'NEEDS_RECONNECT') {
      res.status(200).json({ ok: true, connected: false, needsReconnect: err.code === 'NEEDS_RECONNECT' });
      return;
    }
    res.status(500).json({ ok: false, error: String(err.message || err) });
    return;
  }

  try {
    // 1) Fetch spreadsheet metadata to find which sheet/tab to read.
    // We'll just read the first sheet (gid 1585261867 is likely the
    // primary tab — we ask Sheets API for the name rather than guess).
    const metaResp = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?fields=sheets.properties(sheetId,title)`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    if (!metaResp.ok) {
      const body = await metaResp.text().catch(() => '');
      const isScopeIssue = metaResp.status === 403 && /insufficient/i.test(body);
      res.status(200).json({
        ok: false,
        needsReconnect: isScopeIssue,
        connected: false,
        error: `Sheets metadata ${metaResp.status}: ${body.slice(0, 300)}`,
      });
      return;
    }
    const meta = await metaResp.json();
    const sheets = meta.sheets || [];
    // Prefer the tab matching gid=1585261867 if present, else first sheet
    const preferredGid = 1585261867;
    const sheet = sheets.find((s) => s.properties?.sheetId === preferredGid) || sheets[0];
    if (!sheet) {
      res.status(500).json({ ok: false, error: 'No sheets found in spreadsheet' });
      return;
    }
    const sheetTitle = sheet.properties.title;

    // 2) Read the data we care about. Columns A:F covers date, task,
    //    duration, client, status, and link in Mika's tracker.
    const range = `${encodeURIComponent(sheetTitle)}!A:F`;
    const valuesResp = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    if (!valuesResp.ok) {
      const body = await valuesResp.text().catch(() => '');
      res.status(500).json({ ok: false, error: `Sheets values ${valuesResp.status}: ${body.slice(0, 300)}` });
      return;
    }
    const valuesJson = await valuesResp.json();
    const rows = valuesJson.values || [];

    // 3) Parse rows into typed entries.
    //    Carry-forward the date from the previous row when a cell is blank
    //    (Mika's sheet uses blank-date rows for additional tasks on the
    //    same day, as the screenshot shows).
    const today = new Date();
    const todayKey = `${MONTH_NAMES[today.getMonth()]}-${today.getDate()}`;
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay()); // back to Sunday

    let carriedDate = null;
    let todayHours = 0;
    let weekHours = 0;
    const todayEntries = [];

    for (const row of rows) {
      const [dateCell, task, duration] = row;
      const parsedDate = parseDateCell(dateCell, today.getFullYear());
      const effectiveDate = parsedDate || carriedDate;
      if (parsedDate) carriedDate = parsedDate;
      if (!effectiveDate) continue; // header / blank section

      const hours = parseDurationHours(duration);
      if (hours <= 0) continue;

      // Today match
      const monthName = MONTH_NAMES[effectiveDate.getMonth()];
      const dayKey = `${monthName}-${effectiveDate.getDate()}`;
      if (dayKey === todayKey && effectiveDate.getFullYear() === today.getFullYear()) {
        todayHours += hours;
        todayEntries.push({
          task: String(task || '').trim(),
          duration: String(duration || '').trim(),
          hours,
        });
      }
      // Week-to-date (Sunday → today)
      const cmp = startOfDay(effectiveDate);
      const start = startOfDay(startOfWeek);
      const end = startOfDay(today);
      if (cmp >= start && cmp <= end) {
        weekHours += hours;
      }
    }

    // 4) Check if Joe was already auto-pinged for today's 6-hour milestone
    const todayDateKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    let pingedAt = null;
    try {
      const pingRecord = await kvGet(`timesheet:ping:${todayDateKey}:${viewerGid}`);
      if (pingRecord?.timestamp) pingedAt = pingRecord.timestamp;
    } catch {
      // ignore
    }

    res.status(200).json({
      ok: true,
      connected: true,
      spreadsheetId,
      sheetTitle,
      todayHours,
      weekHours,
      todayEntries,
      pingedAt,
      crossedThreshold: todayHours >= 6,
    });
  } catch (err) {
    res.status(500).json({ ok: false, error: String(err.message || err) });
  }
}

// ───────────────────────────────────────────────────────────────────────────
// Parsers

function parseDateCell(raw, fallbackYear) {
  if (raw == null) return null;
  const s = String(raw).trim();
  if (!s) return null;
  // Format in Mika's sheet: "April 9", "May 13"
  const m = s.match(/^([a-z]+)\s+(\d{1,2})(?:,?\s*(\d{4}))?$/i);
  if (!m) return null;
  const monthIdx = MONTH_NAMES.indexOf(m[1].toLowerCase());
  if (monthIdx < 0) return null;
  const day = parseInt(m[2], 10);
  if (!day || day < 1 || day > 31) return null;
  const year = m[3] ? parseInt(m[3], 10) : fallbackYear;
  return new Date(year, monthIdx, day);
}

function parseDurationHours(raw) {
  if (raw == null) return 0;
  const s = String(raw).trim().toLowerCase();
  if (!s) return 0;
  // "1 hr", "30 mins", "4 hrs", "1.5 hrs", "90 min"
  const hrMatch = s.match(/^(\d+(?:\.\d+)?)\s*(?:hrs?|hours?|h)\b/);
  if (hrMatch) return parseFloat(hrMatch[1]) || 0;
  const minMatch = s.match(/^(\d+(?:\.\d+)?)\s*(?:mins?|minutes?|m)\b/);
  if (minMatch) return (parseFloat(minMatch[1]) || 0) / 60;
  // Fallback: bare number → assume hours
  const numMatch = s.match(/^(\d+(?:\.\d+)?)$/);
  if (numMatch) return parseFloat(numMatch[1]) || 0;
  return 0;
}

function startOfDay(d) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}
