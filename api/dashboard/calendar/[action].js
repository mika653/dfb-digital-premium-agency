// Dynamic dispatcher for /api/dashboard/calendar/<action>
// Consolidates 5 separate calendar endpoints into a single serverless
// function to stay under Vercel's Hobby-tier 12-function cap. URLs
// stay identical (Google's OAuth redirect URIs don't need to change).
import authorize from './_authorize.js';
import callback from './_callback.js';
import events from './_events.js';
import createEvent from './_create-event.js';
import disconnect from './_disconnect.js';

const handlers = {
  authorize,
  callback,
  events,
  'create-event': createEvent,
  disconnect,
};

export default async function handler(req, res) {
  const action = String(req.query.action || '');
  const fn = handlers[action];
  if (!fn) {
    res.status(404).json({ ok: false, error: `Unknown calendar action: ${action}` });
    return;
  }
  return fn(req, res);
}
