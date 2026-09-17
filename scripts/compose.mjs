// Compose the production output: the redesigned static site (concept/) on top of the Vite build (dist/).
// The React app keeps serving the legacy tool routes from dist/app.html (see vercel.json + api/render-page.js).
import { cpSync, existsSync, mkdirSync, readdirSync, renameSync, rmSync, statSync, writeFileSync } from 'fs';
import { join } from 'path';

const DIST = 'dist', SRC = 'concept', SITE = 'https://www.dfbdigital.com';
const SKIP = new Set(['build.py', '_content', 'vercel.json', '.vercel', 'README.txt', '404']);

if (!existsSync(join(DIST, 'index.html'))) throw new Error('dist/index.html missing — run vite build first');
renameSync(join(DIST, 'index.html'), join(DIST, 'app.html'));

const collisions = [];
function copy(rel) {
  const from = join(SRC, rel), to = join(DIST, rel);
  if (statSync(from).isDirectory()) { mkdirSync(to, { recursive: true }); for (const f of readdirSync(from)) copy(join(rel, f)); return; }
  if (existsSync(to)) collisions.push(rel);
  cpSync(from, to);
}
for (const f of readdirSync(SRC)) if (!SKIP.has(f)) copy(f);
cpSync(join(SRC, '404', 'index.html'), join(DIST, '404.html'));

// sitemap + robots for the static pages
const pages = [];
(function walk(dir, url) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) { if (!['assets', 'work'].includes(f) || url) walk(p, url + '/' + f); }
    else if (f === 'index.html') pages.push(url || '/');
  }
})(SRC, '');
const skip = new Set(['/404']);
const urls = pages.filter(u => !skip.has(u)).sort();
writeFileSync(join(DIST, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u => `  <url><loc>${SITE}${u === '/' ? '/' : u}</loc></url>`).join('\n')}\n</urlset>\n`);
writeFileSync(join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /dashboard\nDisallow: /status/\nDisallow: /joe-rh-ed5d55b85741\nSitemap: ${SITE}/sitemap.xml\n`);

console.log(`composed: ${urls.length} static pages over the app shell` + (collisions.length ? `\n  overwrote: ${collisions.join(', ')}` : ''));
