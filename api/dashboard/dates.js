// GET  /api/dashboard/dates                      → { ok, entries: [...] }
// POST /api/dashboard/dates                      → body: { name, monthDay, type, notes? }
//                                                  type: 'birthday' | 'anniversary' | 'contract-start' | 'other'
// DELETE /api/dashboard/dates?id=...              → remove one entry
// Storage: Upstash KV under key "dates:list" — a JSON array of entries.
// Small enough scale (a few dozen contacts) that one flat list is fine.
import crypto from 'crypto';
import { isAuthenticated } from './auth.js';
import { kvGet, kvSet } from './_upstash.js';

const KEY = 'dates:list';

async function loadAll() {
  const raw = await kvGet(KEY);
  return Array.isArray(raw) ? raw : [];
}

export default async function handler(req, res) {
  if (!isAuthenticated(req)) {
    res.status(401).json({ ok: false, error: 'Not authenticated' });
    return;
  }

  try {
    if (req.method === 'GET') {
      const entries = await loadAll();
      res.status(200).json({ ok: true, entries });
      return;
    }

    if (req.method === 'POST') {
      const { name, monthDay, type, notes } = req.body || {};
      const cleanName = String(name || '').trim();
      const cleanMonthDay = String(monthDay || '').trim(); // expected "MM-DD"
      const cleanType = String(type || 'birthday').trim();
      if (!cleanName) {
        res.status(400).json({ ok: false, error: 'name required' });
        return;
      }
      if (!/^\d{2}-\d{2}$/.test(cleanMonthDay)) {
        res.status(400).json({ ok: false, error: 'monthDay must be MM-DD' });
        return;
      }

      const entries = await loadAll();
      const newEntry = {
        id: crypto.randomBytes(8).toString('hex'),
        name: cleanName,
        monthDay: cleanMonthDay,
        type: cleanType,
        notes: notes ? String(notes).trim() : '',
        createdAt: Date.now(),
      };
      entries.push(newEntry);
      await kvSet(KEY, entries);
      res.status(200).json({ ok: true, entry: newEntry });
      return;
    }

    if (req.method === 'DELETE') {
      const id = String(req.query.id || '').trim();
      if (!id) {
        res.status(400).json({ ok: false, error: 'id required' });
        return;
      }
      const entries = await loadAll();
      const next = entries.filter((e) => e.id !== id);
      await kvSet(KEY, next);
      res.status(200).json({ ok: true, removed: entries.length - next.length });
      return;
    }

    res.status(405).json({ ok: false, error: 'Method not allowed' });
  } catch (err) {
    res.status(500).json({ ok: false, error: String(err.message || err) });
  }
}
