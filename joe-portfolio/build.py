"""Joe's personal portfolio — static page generator.  python3 build.py → site/index.html"""
import json, html as H, re
C = json.load(open('content.json', encoding='utf-8'))
M = {m['id']: m for m in json.load(open('site/media/manifest.json'))}
def esc(t): return H.escape(t).replace(' — ', ' — ')
def slug(s): return re.sub(r'[^a-z0-9]+', '-', s.lower()).strip('-')
def find(ch, key):
    folders = ch.get('folders') or [ch['folder']]
    for f in folders:
        i = M.get(slug(f) + '--' + key)
        if i: return i
    raise SystemExit(f'missing {key} in {folders}')
def title(m):
    t = m['file'].rsplit('.', 1)[0]
    t = re.sub(r'^screenshot [\d-]+ \d+$', 'Market meme', t, flags=re.I)
    t = t.replace('KB_070717_v3', 'Kinder Bueno reaction post').replace('pAUL sMITH 1', 'Paul Smith 1').replace('AICA-071118', 'Turning Japanese')
    return t

def piece(m, ch, idx):
    ratio = m['w'] / m['h']; span = 'wide' if ratio > 1.5 else 'tall' if ratio < 0.8 else ''
    side = 'left' if idx % 2 == 0 else 'right'
    t = esc(title(m)); cap = f'<figcaption><span>{t}</span><small>{esc(ch["name"])}</small></figcaption>'
    if m['type'] == 'video':
        return f'<figure class="piece {span} video rv" data-side="{side}" data-idx="{idx}" style="--w:{m["w"]};--h:{m["h"]}"><video muted loop playsinline preload="none" poster="media/{m["poster"]}" data-src="media/{m["src"]}" width="{m["w"]}" height="{m["h"]}"></video><span class="dur">{m["dur"]}s</span>{cap}</figure>'
    tag = 'anim' if m['type'] == 'anim' else ''
    return f'<figure class="piece {span} {tag} rv" data-side="{side}" data-idx="{idx}" style="--w:{m["w"]};--h:{m["h"]}"><img src="media/{m["src"]}" width="{m["w"]}" height="{m["h"]}" alt="{t}" loading="lazy" decoding="async">{cap}</figure>'

all_pieces = []; sections = []
for n, ch in enumerate(C['chapters']):
    items = [find(ch, k) for k in ch['order']]
    figs = ''
    for m in items:
        idx = len(all_pieces); all_pieces.append({'m': m, 'ch': ch['name']})
        figs += piece(m, ch, idx)
    proof = f'<div class="proof">{esc(ch["proof"])}</div>' if ch.get('proof') else ''
    sections.append(f'''<section class="chapter" id="{ch['id']}" style="--acc:{ch['accent']}">
  <div class="ch-head"><div class="ch-sticky rv" data-side="left"><div class="num">{n+1:02d} / {len(C['chapters']):02d}</div><h2>{esc(ch['name'])}</h2><div class="kicker">{esc(ch['kicker'])}</div><p>{esc(ch['blurb'])}</p>{proof}</div></div>
  <div class="ch-grid">{figs}</div>
</section>''')

# marquee: two rows of thumbnails from across the chapters
thumbs = [p['m'] for p in all_pieces if p['m']['type'] != 'video'] + [p['m'] for p in all_pieces if p['m']['type'] == 'video']
def thumb(m):
    src = m['poster'] if m['type'] == 'video' else m['src']
    return f'<img src="media/{src}" alt="" loading="eager" decoding="async" style="--r:{m["w"]/m["h"]:.3f}">'
rowA = ''.join(thumb(m) for m in thumbs[0::2]); rowB = ''.join(thumb(m) for m in thumbs[1::2])
stats = ''.join(f'<div><b>{esc(a)}</b><span>{esc(b)}</span></div>' for a, b in C['stats'])
nav = ''.join(f'<a href="#{ch["id"]}">{esc(ch["name"])}</a>' for ch in C['chapters']) + ('<a href="#now" class="hi">Now · DFB</a>' if C.get('now') else '')
lb = json.dumps([{'type': p['m']['type'], 'src': 'media/' + p['m']['src'], 'poster': ('media/' + p['m']['poster']) if p['m'].get('poster') else None, 'w': p['m']['w'], 'h': p['m']['h'], 'title': title(p['m']), 'brand': p['ch']} for p in all_pieces])
def link(i, u, t):
    ext = '' if u.startswith('https://www.dfbdigital.com') else ' target="_blank" rel="noopener"'
    return f'<a class="pill{" blue" if i == 0 else ""}" href="{u}"{ext}>{esc(t)}</a>'
links = ''.join(link(i, u, t) for i, (u, t) in enumerate(C['close']['links']))

import re as _re
def embed(platform, url):
    if platform == 'instagram':
        return f'<blockquote class="instagram-media" data-instgrm-permalink="{H.escape(url)}" data-instgrm-version="14" style="margin:0;max-width:540px;width:100%"><a href="{H.escape(url)}" target="_blank" rel="noopener">View on Instagram</a></blockquote>'
    m = _re.search(r'urn:li:(?:share|activity|ugcPost):(\d+)', url) or _re.search(r'activity-(\d+)', url)
    if not m: return f'<a class="pill" href="{H.escape(url)}" target="_blank" rel="noopener">View post on LinkedIn</a>'
    kind = 'ugcPost' if 'ugcPost' in url else 'share'
    return f'<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:{kind}:{m.group(1)}" height="620" width="100%" frameborder="0" allowfullscreen title="LinkedIn post" loading="lazy"></iframe>'
N = C.get('now'); now_html = ''
if N:
    cards = ''
    for cl in N['clients']:
        # local clips/images dropped into now/<client>/ (downloaded stories, screen recordings, screenshots with the numbers)
        import os as _os, shutil as _sh
        local = ''
        ldir = f"now/{cl['id']}"
        if _os.path.isdir(ldir):
            _os.makedirs('site/media/now', exist_ok=True)
            for i, f in enumerate(sorted(_os.listdir(ldir))):
                ext = f.lower().rsplit('.', 1)[-1]
                if ext not in ('mp4', 'mov', 'webm', 'jpg', 'jpeg', 'png', 'webp'): continue
                dst = f"media/now/{cl['id']}-{i+1}.{ext}"; _sh.copy(_os.path.join(ldir, f), 'site/' + dst)
                side = 'left' if i % 2 == 0 else 'right'
                if ext in ('mp4', 'mov', 'webm'): local += f'<figure class="piece tall video rv" data-side="{side}" style="--w:9;--h:16"><video muted loop playsinline preload="metadata" data-src="{dst}" src="{dst}"></video><span class="dur">story</span></figure>'
                else: local += f'<figure class="piece rv" data-side="{side}"><img src="{dst}" alt="" loading="lazy"></figure>'
        posts = local + ''.join(f'<div class="embed rv" data-side="{"left" if i % 2 == 0 else "right"}">{embed(cl["platform"], u)}</div>' for i, u in enumerate(cl['posts']))
        if not posts: posts = f'<a class="soon rv" data-side="right" href="{cl["profile"]}" target="_blank" rel="noopener"><span>Live posts land here</span><small>Open the account →</small></a>'
        cards += f'''<div class="client" id="{cl['id']}"><div class="client-head rv" data-side="left"><div class="stat-big"><b>{esc(cl['stat'][0])}</b><span>{esc(cl['stat'][1])}</span></div><h3>{esc(cl['name'])}</h3><div class="kicker">{esc(cl['role'])}</div><p>{esc(cl['blurb'])}</p><a class="pill sm" href="{cl['profile']}" target="_blank" rel="noopener">{'Instagram' if cl['platform'] == 'instagram' else 'LinkedIn'} →</a></div><div class="embeds">{posts}</div></div>'''
    ig = any(cl['platform'] == 'instagram' and cl['posts'] for cl in N['clients'])
    now_html = f'''<section class="now" id="now"><div class="now-head rv"><div class="eyebrow">{esc(N['eyebrow'])}</div><h2>{esc(N['h2'])}</h2><p>{esc(N['p'])}</p></div>{cards}{'<script async src="https://www.instagram.com/embed.js"></script>' if ig else ''}</section>'''

doc = f'''<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow, noarchive"><title>Joe Flores — Selected work</title>
<meta name="description" content="Selected work by Joe Flores before DFB Digital: social, content, campaigns and film for Kinder Bueno, TLC Solutions, Paul Smith, CoinStats and more.">
<meta property="og:title" content="Joe Flores — Selected work"><meta property="og:description" content="Twelve years of making brands talk. The work before DFB Digital."><meta property="og:image" content="https://www.dfbdigital.com/joe/portfolio/og.jpg"><meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="https://www.dfbdigital.com/favicon.ico"><link rel="apple-touch-icon" href="https://www.dfbdigital.com/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;800;900&family=Poppins:wght@300;400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="site.css"></head>
<body>
<div class="grain" aria-hidden="true"></div>
<header class="top"><a class="brand" href="https://www.dfbdigital.com/joe">Joe Flores</a><nav class="chips">{nav}</nav><a class="pill sm" href="https://www.dfbdigital.com">DFB Digital →</a></header>
<section class="hero">
  <div class="hero-copy">
    <div class="eyebrow rv">{esc(C['hero']['eyebrow'])}</div>
    <h1 class="rv d1"><span data-px="-0.18">{esc(C['hero']['h1'][0])}</span><span class="blue" data-px="0.18">{esc(C['hero']['h1'][1])}</span></h1>
    <p class="sub rv d2">{esc(C['hero']['sub'])}</p>
    <div class="stats rv d3">{stats}</div>
  </div>
  <div class="marquee" aria-hidden="true"><div class="row a" data-px="-0.25"><div class="track">{rowA}{rowA}</div></div><div class="row b" data-px="0.25"><div class="track">{rowB}{rowB}</div></div></div>
</section>
<main>{''.join(sections)}{now_html}</main>
<section class="close"><div class="close-in rv"><div class="eyebrow">Now</div><h2 data-px="-0.08">{esc(C['close']['h2'])}</h2><p>{esc(C['close']['p'])}</p><div class="cta">{links}</div></div></section>
<footer class="foot"><span>© 2026 Joe Flores · Work shown was produced for the clients named; all marks belong to their owners.</span><a href="https://www.dfbdigital.com">dfbdigital.com</a></footer>
<div class="lightbox" id="lb" hidden><button class="lb-x" id="lb-x" aria-label="Close">✕</button><button class="lb-prev" id="lb-prev" aria-label="Previous">‹</button><div class="lb-stage" id="lb-stage"></div><button class="lb-next" id="lb-next" aria-label="Next">›</button><div class="lb-cap" id="lb-cap"></div></div>
<script>window.PIECES={lb};</script>
<script src="site.js"></script>
</body></html>'''
open('site/index.html', 'w', encoding='utf-8').write(doc)
print(f'built: {len(all_pieces)} pieces, {len(sections)} chapters')
