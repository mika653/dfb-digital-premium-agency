// Thin Upstash Redis REST API wrapper. Vercel's Upstash integration
// injects either KV_REST_API_* or UPSTASH_REDIS_REST_* — accept both.

const REST_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || '';
const REST_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || '';

function assertConfigured() {
  if (!REST_URL || !REST_TOKEN) {
    throw new Error('Upstash KV not configured (missing KV_REST_API_URL / KV_REST_API_TOKEN)');
  }
}

export async function kvGet(key) {
  assertConfigured();
  const url = `${REST_URL}/get/${encodeURIComponent(key)}`;
  const resp = await fetch(url, {
    headers: { Authorization: `Bearer ${REST_TOKEN}` },
  });
  if (!resp.ok) {
    if (resp.status === 404) return null;
    const body = await resp.text().catch(() => '');
    throw new Error(`KV GET ${resp.status}: ${body}`);
  }
  const data = await resp.json();
  if (data.result == null) return null;
  try {
    return JSON.parse(data.result);
  } catch {
    return data.result;
  }
}

export async function kvSet(key, value) {
  assertConfigured();
  const url = `${REST_URL}/set/${encodeURIComponent(key)}`;
  const payload = typeof value === 'string' ? value : JSON.stringify(value);
  const resp = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${REST_TOKEN}`,
      'Content-Type': 'text/plain',
    },
    body: payload,
  });
  if (!resp.ok) {
    const body = await resp.text().catch(() => '');
    throw new Error(`KV SET ${resp.status}: ${body}`);
  }
  return true;
}

export async function kvDel(key) {
  assertConfigured();
  const url = `${REST_URL}/del/${encodeURIComponent(key)}`;
  const resp = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${REST_TOKEN}` },
  });
  return resp.ok;
}
