// GET  /api/dashboard/notes?projectGid=...    → { ok, content, updatedAt, updatedBy }
// POST /api/dashboard/notes                   → body: { projectGid, content, viewerName? }
// Per-project notes scratchpad backed by Upstash KV.
// Key shape: notes:project:<gid>
import { isAuthenticated } from './auth.js';
import { kvGet, kvSet } from './_upstash.js';

export default async function handler(req, res) {
  if (!isAuthenticated(req)) {
    res.status(401).json({ ok: false, error: 'Not authenticated' });
    return;
  }

  if (req.method === 'GET') {
    const projectGid = String(req.query.projectGid || '').trim();
    if (!projectGid) {
      res.status(400).json({ ok: false, error: 'projectGid required' });
      return;
    }
    try {
      const stored = await kvGet(`notes:project:${projectGid}`);
      res.status(200).json({
        ok: true,
        content: stored?.content || '',
        updatedAt: stored?.updatedAt || null,
        updatedBy: stored?.updatedBy || null,
      });
    } catch (err) {
      res.status(500).json({ ok: false, error: String(err.message || err) });
    }
    return;
  }

  if (req.method === 'POST') {
    const { projectGid, content, viewerName } = req.body || {};
    if (!projectGid) {
      res.status(400).json({ ok: false, error: 'projectGid required' });
      return;
    }
    try {
      const record = {
        content: String(content ?? ''),
        updatedAt: Date.now(),
        updatedBy: viewerName ? String(viewerName) : null,
      };
      await kvSet(`notes:project:${projectGid}`, record);
      res.status(200).json({ ok: true, ...record });
    } catch (err) {
      res.status(500).json({ ok: false, error: String(err.message || err) });
    }
    return;
  }

  res.status(405).json({ ok: false, error: 'Method not allowed' });
}
