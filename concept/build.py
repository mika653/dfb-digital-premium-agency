#!/usr/bin/env python3
"""DFB Digital concept — static site generator.  python3 build.py"""
import json, os, re, subprocess, html as H

ROOT = os.path.dirname(os.path.abspath(__file__))
C = lambda f: json.load(open(f'{ROOT}/_content/{f}'))
SV, ART, BLOG, RH = C('services.json'), C('articles.json'), C('blog.json'), C('rh.json')
_rp = open(f'{ROOT}/../api/render-page.js').read()
PC = json.loads(subprocess.check_output(['node','-e','console.log(JSON.stringify(%s))' % re.search(r'const pageContent = (\{[\s\S]*?\n\});', _rp).group(1)]))
MAIL = 'mailto:hello@dfbdigital.com'

# ── text helpers: escape, smart quotes, spaced em-dashes, keep last two words together ──
def esc(t):
    t = H.escape(str(t), quote=False)
    t = re.sub(r"(\w)'(\w)", "\\1’\\2", t)                     # apostrophes
    t = re.sub(r'"([^"]*)"', '“\\1”', t)                        # paired quotes
    t = re.sub(r"(?<=\w)'|'(?=\w)", "’", t)                     # stray singles
    t = re.sub(r'\s*—\s*', ' — ', t)
    for a,b in BRIT: t = t.replace(a,b)
    return t
BRIT = [('Centralized','Centralised'),('centralized','centralised'),('Optimization','Optimisation'),('optimization','optimisation'),('optimize','optimise'),('Optimize','Optimise'),
        ('organizations','organisations'),('organization','organisation'),('personalized','personalised'),('prioritize','prioritise'),('analyze','analyse'),('behavior','behaviour'),('color ','colour '),('customized','customised'),('Prioritization','Prioritisation'),('prioritization','prioritisation'),('Organizations','Organisations'),('Organization','Organisation'),('recognizable','recognisable'),('recognize','recognise')]
def brit(t):
    for a,b in BRIT: t = t.replace(a,b)
    return t
def smart(html_):
    def fix(m):
        t = m.group(1)
        for a,b in BRIT: t = t.replace(a,b)
        t = re.sub(r"(\w)'(\w)", "\\1’\\2", t)
        t = re.sub(r'"([^"<>]*)"', '“\\1”', t)
        return '>' + t + '<'
    # only text between tags, never inside attributes or scripts
    head, sep, body = html_.partition('<main>')
    body, sep2, tail = body.partition('</main>')
    body = re.sub(r'>([^<>]+)<', fix, body)
    return head + sep + body + sep2 + tail
def nb(t):
    p = t.rsplit(' ', 1); return t if len(p) < 2 else f'{p[0]}&nbsp;{p[1]}'
I = lambda name: f'<i data-lucide="{name}"></i>'
HAT = '<svg class="hat-mark" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21.6 16.9Q32 13.6 42.4 16.9"/><path d="M21.6 16.9L16.8 34M42.4 16.9L47.2 34"/><path d="M16.8 34Q32 36.6 47.2 34"/><path d="M16.8 34L5.5 43Q32 50.5 58.5 43L47.2 34"/><path d="M9.5 40.2Q32 46.8 54.5 40.2" stroke-width="3"/></svg>'

# ── catalogue ──
PRACTICE_ICONS = {'Web Development':'layout-template','Digital Marketing':'megaphone','Digital Consultancy':'compass'}
SERVICE_ICONS = {'event-lab':'calendar-days','instasite':'zap','launchpad':'rocket','digital-strategy':'map','social-media':'share-2','content-marketing':'pen-tool','email-crm':'mail','ai-automations':'cpu','digital-transformation':'route'}
def L(c,i): return SV[c]['_lead'][i] if len(SV[c]['_lead'])>i else ''
def it(c,k): return SV[c].get(k) or []
SERVICES = {
 'event-lab': dict(c='EventLab', name='Event Lab', practice='Web Development', h1='Websites built for moments <br class=lg>that matter.', lead=L('EventLab',1),
    who="Conferences, launches, community events and private gatherings that need one focused digital home before, during and after the day.",
    features=it('EventLab','keyFeatures'), steps=it('EventLab','eventPhases'), featTitle='What the site does', stepsTitle='One site, three moments', stepsH2='Before, during and after the&nbsp;day.'),
 'instasite': dict(c='InstaSite', name='InstaSite', practice='Web Development', h1='Your digital presence <br class=lg>starts here.', lead=L('InstaSite',1), who=L('InstaSite',2),
    features=it('InstaSite','features'), steps=it('InstaSite','benefits'), featTitle='What you get', stepsTitle='Why it works', stepsH2='Fast, clean, and built to be&nbsp;trusted.',
    extra=lambda: section('Pick your tier', 'Every business is different. Pick the tier that matches where you&nbsp;are.', cells([
        dict(tier='Starter', title='Professional Presence', description='A clean, single-page site that puts your name on the map. Perfect for professionals who need a polished digital calling card, fast.'),
        dict(tier='Pro', title='Client-Ready', description='A multi-page site designed to turn visitors into clients. Services, trust signals and clear calls to action, all working together.'),
        dict(tier='Elite', title='Premium Digital Front Desk', description='The full experience. A premium, multi-page site with refined design, advanced sections and the polish that sets you apart.')], tier=True))),
 'launchpad': dict(c='LaunchPad', name='LaunchPad', practice='Web Development', h1='Your digital foundation, <br class=lg>built right from day one.', lead=L('LaunchPad',1), who=L('LaunchPad',2),
    features=it('LaunchPad','features'), steps=it('LaunchPad','benefits'), featTitle='What you get', stepsTitle='Built for the long run', stepsH2='A site that grows with the&nbsp;business.'),
 'digital-strategy': dict(c='DigitalStrategy', name='Digital Strategy & Campaign Planning', short='Digital Strategy', practice='Digital Marketing', h1='Move forward with a plan, <br class=lg>not guesswork.', lead=L('DigitalStrategy',1), who=L('DigitalStrategy',2),
    features=it('DigitalStrategy','features'), steps=it('DigitalStrategy','benefits'), featTitle='What you get', stepsTitle='How we build the plan', stepsH2='Audit first. Then a roadmap you can&nbsp;follow.'),
 'social-media': dict(c='SocialMediaMarketing', name='Social Media Marketing', practice='Digital Marketing', h1='Show up with purpose, <br class=lg>not just presence.', lead=L('SocialMediaMarketing',1), who=L('SocialMediaMarketing',2),
    features=it('SocialMediaMarketing','features'), steps=it('SocialMediaMarketing','benefits'), featTitle='What you get', stepsTitle='How it runs', stepsH2='Strategy, content and community, every&nbsp;month.'),
 'content-marketing': dict(c='ContentMarketing', name='Content Marketing', practice='Digital Marketing', h1='Tell your story. <br class=lg>Attract your audience.', lead=L('ContentMarketing',1), who=L('ContentMarketing',2),
    features=it('ContentMarketing','features'), steps=it('ContentMarketing','benefits'), featTitle='What you get', stepsTitle='How we approach it', stepsH2='Editorial thinking, applied to your&nbsp;business.'),
 'email-crm': dict(c='EmailCRM', name='Email & CRM-Based Marketing', short='Email & CRM', practice='Digital Marketing', h1='The right message. <br class=lg>The right time.', lead=L('EmailCRM',1), who=L('EmailCRM',2),
    features=it('EmailCRM','features'), steps=it('EmailCRM','benefits'), featTitle='What you get', stepsTitle='How it works', stepsH2='From first hello to loyal&nbsp;customer.'),
 'ai-automations': dict(c='AIAutomations', name='AI Automations', practice='Digital Consultancy', h1='Get your <br class=lg>time back.', lead=L('AIAutomations',0), who=L('AIAutomations',1),
    features=it('AIAutomations','outcomes'), steps=it('AIAutomations','sections'), featTitle='What changes', stepsTitle='What this actually means', stepsH2='No new software. No dashboards. Just less&nbsp;admin.', faq=PC['/aiautomations']['faq']),
 'digital-transformation': dict(c='DigitalTransformation', name='Digital Transformation Consultation', short='Digital Transformation', practice='Digital Consultancy', h1='A clear plan for catching up, <br class=lg>without starting over.', lead=L('DigitalTransformation',0), who=L('DigitalTransformation',1),
    features=[{'title':s['h2'],'description':s['p']} for s in PC['/digitaltransformation']['sections']], steps=it('DigitalTransformation','steps'), featTitle='What you get', stepsTitle='How it works', stepsH2='One session. One written plan. Your&nbsp;call.', faq=PC['/digitaltransformation']['faq']),
}
PRACTICES = [('Web Development','Precision-built digital properties, engineered around what you actually need them to do.',['event-lab','instasite','launchpad']),
             ('Digital Marketing','Positioning, channels and campaigns sized to your budget, built to be executed, not admired.',['digital-strategy','social-media','content-marketing','email-crm']),
             ('Digital Consultancy','Straight-talk guidance for owners who need to catch up without starting over.',['ai-automations','digital-transformation'])]
WORK = [
 dict(slug='rh', url='https://rheventdesign.com', k='01 · Strategic partnership', name='RH Event Design', did=['Web design','Build','Digital strategy','Ongoing'],
      p="Hong Kong luxury event design and PR, led by Reyna Harilela. We built the site and run the digital strategy that carries her standard of polish&nbsp;online."),
 dict(slug='derek', url='https://thederekcollins.com', k='02 · Website, newsletter, social', name='Prof. Derek Burton Collins', did=['Website','Newsletter setup','Social strategy'],
      p="A Harvard-trained art advisor to private clients, auction houses and museums. Website, newsletter infrastructure and a social strategy with something to&nbsp;say.", res=('+2,700%','Instagram following, 75 to 2,100 in five months')),
 dict(slug='dante', url='https://ladante.cc', k='03 · Custom CMS', name='Dante Alighieri Society, Hong&nbsp;Kong', did=['Custom CMS','Web development','Training'],
      p="Ninety years of Italian language and culture in Hong Kong. A CMS-powered site so their team publishes courses and events themselves, without waiting on a&nbsp;developer."),
 dict(slug='aldeon', url='https://aldeonluxurysuites.com', k='04 · Web design and build', name='Aldeon Luxury Suites', did=['Web design','Build','Photography-led'],
      p="Boutique suites where the rooms are the product. A site that leads with photography and gets out of the&nbsp;way."),
]

TESTIMONIALS = [
 dict(name='Professor Derek Burton Collins', role='Art advisor · thederekcollins.com', ini='DC', href='https://linkedin.com/in/daddyfunbuckets',
      pull="One of the biggest mistakes you can make is to leave your digital plan for later.",
      quote="Joe Flores is a highly competent, creative and thoughtful digital strategist who has extensive corporate experience. From idea to strategy to digital execution in B2B or B2C cycles, he will work with you to achieve and exceed your targeted outcomes. I would highly recommend working with Joe sooner rather than later, to position your digital strategy much earlier than you might think necessary. I've learned one of the biggest mistakes you can make is to leave your digital plan for later. It's actually one of the most important early things you can do. Joe delivers a proven digital strategy that will grow your business. I give him my highest marks!"),
 dict(name='Sean Coxall', role='Founder · Consciousness at Work', ini='SC', href=None,
      pull="We work remotely, so it doesn't matter which country or time zone you're in. Joe makes it work seamlessly.",
      quote="Joe has been helping me to manage my social media and build my content. He has helped me immensely in taking my photos and videos and carefully and intentionally linking them back to my business and the services I offer, in a professional and credible way. He also guides me and writes stories that I can capture, which is very helpful. We work remotely, so it doesn't matter which country or time zone you're in. Joe makes it work seamlessly. We make a great team, and I could highly recommend him if you're looking for someone to manage and build your social media presence."),
]
def quotes(full=False):
    cards = ''
    for t in TESTIMONIALS:
        body = t['quote'] if full else t['pull']
        name = f'<a href="{t["href"]}" target="_blank" rel="noopener">{t["name"]}</a>' if t['href'] else t['name']
        cards += f'<figure class="quote card"><blockquote>{esc(body)}</blockquote><figcaption><span class="avatar" aria-hidden="true">{t["ini"]}</span><div><b>{name}</b><span>{t["role"]}</span></div></figcaption></figure>'
    return f'<div class="quotes">{cards}</div>'
def quotes_section(h2, full=False):
    return f'<section class="proof"><div class="wrap"><div class="sec-h rv"><div class="lbl">In their words <em>two clients</em></div><h2>{h2}</h2></div>{quotes(full)}</div></section>'

# ── shell ──
def nav(active=''):
    links = ''.join(f'<a href="{h}"{" style=color:var(--ink)" if active==t.lower() else ""}>{t}</a>' for t,h in [('Services','/services'),('Work','/work'),('Blog','/blog'),('About','/about')])
    return f'''
<nav><div class="wrap nav-in"><a href="/" aria-label="DFB Digital home"><img src="/assets/dfb-logo.png" alt="DFB Digital"></a>
<button class="burger" aria-label="Menu" aria-expanded="false" onclick="const l=document.querySelector('.links');const o=l.classList.toggle('open');this.setAttribute('aria-expanded',o);this.classList.toggle('open',o)">{I("menu")}{I("x")}</button>
<div class="links">{links}<a class="pill" href="{MAIL}">{I("mail")}Book a 30-minute call</a></div></div></nav>'''
def cta_band(h='Do Digital Better.', p="Thirty minutes. No pitch deck. We'll tell you what we'd fix first and why, and you decide what to do with it."):
    return f'''<div class="wrap"><div class="cta-band rv"><div class="k">Ready when you are</div><h2>{h}</h2><p>{esc(p)}</p>
<div class="cta-row" style="justify-content:center"><a class="pill blue" href="{MAIL}">{I("mail")}Book a 30-minute call</a><a class="pill ghost" href="/work">See the work{I("arrow-right")}</a></div></div></div>'''
def footer():
    svc = ''.join(f'<a href="/services/{s}">{SERVICES[s].get("short",SERVICES[s]["name"])}</a>' for s in SERVICES)
    return f'''<footer><div class="wrap"><div class="fgrid">
<div><img src="/assets/dfb-logo.png" alt="DFB Digital"><p>Boutique digital consultancy for established business owners. Systems for clarity, structure and long-term execution.</p></div>
<div><h4>Services</h4>{svc}</div>
<div><h4>Company</h4><a href="/work">Work</a><a href="/about">About</a><a href="/blog">Blog</a><a href="/partners/rh-event-design">Partners</a><a href="/contact">Contact</a></div>
<div><h4>Contact</h4><a href="{MAIL}">{I("mail")}hello@dfbdigital.com</a><a href="https://linkedin.com/in/daddyfunbuckets" target="_blank" rel="noopener">{I("linkedin")}LinkedIn</a><address>Unit B, 11/F Yam Tze Comm Bldg<br>23 Thomson Rd, Wan Chai, Hong Kong</address></div>
</div><div class="foot"><div style="display:flex;align-items:center;gap:10px">{HAT}© 2026 DFB Digital</div><div>Preserving your legacy. Powering your future.</div></div></div></footer>'''
SCRIPT = '''<script src="https://cdn.jsdelivr.net/npm/lucide@0.460.0/dist/umd/lucide.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/lenis@1.1.18/dist/lenis.min.js"></script>
<script>
document.documentElement.classList.add('js');try{lucide.createIcons()}catch(e){}
try{if(matchMedia('(min-width:821px)').matches){const lenis=new Lenis({lerp:.1,smoothWheel:true});(function raf(t){lenis.raf(t);requestAnimationFrame(raf)})(0)}}catch(e){}
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.1,rootMargin:'0px 0px -5% 0px'});
document.querySelectorAll('.rv,.card').forEach(el=>io.observe(el));
</script>'''
SITE = 'https://www.dfbdigital.com'
GA = '''<script async src="https://www.googletagmanager.com/gtag/js?id=G-764DPGDSKW"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-764DPGDSKW');</script>'''
def page(path, title, desc, body, active='', noindex=False, head=''):
    url = SITE + ('' if path == '/' else path)
    robots = '<meta name="robots" content="noindex, nofollow">' if noindex else ''
    doc = f'''<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">{robots}
<title>{H.escape(title)}</title><meta name="description" content="{H.escape(brit(desc))}">
<link rel="canonical" href="{url}"><meta property="og:type" content="website"><meta property="og:url" content="{url}"><meta property="og:site_name" content="DFB Digital"><meta property="og:title" content="{H.escape(title)}"><meta property="og:description" content="{H.escape(brit(desc))}"><meta property="og:image" content="{SITE}/og-image.png"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta name="twitter:card" content="summary_large_image">
{GA}
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600&display=swap" rel="stylesheet">
<link rel="icon" type="image/svg+xml" href="/assets/hat.svg"><link rel="icon" type="image/png" sizes="32x32" href="/assets/hat-32.png"><link rel="apple-touch-icon" href="/assets/hat-180.png">
<link rel="stylesheet" href="/assets/site.css">{head}</head>
<body>{nav(active)}<main>{body}</main>{footer()}{SCRIPT}</body></html>'''
    out = f'{ROOT}{path}/index.html' if path != '/' else f'{ROOT}/index.html'
    os.makedirs(os.path.dirname(out), exist_ok=True); open(out,'w').write(smart(doc)); print('  ✓', path)

# ── components ──
def section(label, h2, inner, cls=''):
    return f'<section class="{cls}"><div class="wrap"><div class="sec-h rv"><div class="lbl">{esc(label)}</div><h2>{h2}</h2></div>{inner}</div></section>'
def cells(lst, tier=False):
    return '<div class="grid3">' + ''.join(f'<div class="cell card">{("<div class=tier>%s</div>" % x["tier"]) if tier else ("<div class=num>0%d</div>" % (i+1))}<h3>{esc(x["title"])}</h3><p>{esc(x.get("description",""))}</p></div>' for i,x in enumerate(lst)) + '</div>'
def steps(lst):
    return '<div class="steps">' + ''.join(f'<div class="step card"><div class="big">0{i+1}</div><h3>{esc(x["title"])}</h3><p>{esc(x.get("description",""))}</p></div>' for i,x in enumerate(lst)) + '</div>'
def faq(lst):
    return ('<div class="faq"><div class="lbl">Common questions</div>' + ''.join(f'<details><summary>{esc(q["q"])}</summary><p>{esc(q["a"])}</p></details>' for q in lst) + '</div>') if lst else ''
def mock(w): return f'<a class="mock" href="{w["url"]}" target="_blank" rel="noopener"><div class="mbar"><i class="dot"></i><i class="dot"></i><i class="dot"></i><span class="murl">{w["url"].split("//")[1]}</span></div><img src="/work/{w["slug"]}.jpg" alt="{re.sub("&nbsp;"," ",w["name"])} website" loading="lazy"></a>'
def case(w, detail=False):
    did = ('<ul class="did">'+''.join(f'<li>{d}</li>' for d in w['did'])+'</ul>') if detail else ''
    res = f'<div class="res"><b>{w["res"][0]}</b><span>{esc(w["res"][1])}</span></div>' if w.get('res') else ''
    return f'<article class="case card">{mock(w)}<div class="meta"><div class="k">{w["k"]}</div><h3>{w["name"]}</h3><p>{w["p"]}</p>{did}{res}</div></article>'
def work_grid(detail=False): return '<div class="work-grid">' + ''.join(case(w, detail) for w in WORK) + '</div>'
def svc_card(s, kicker=False):
    x=SERVICES[s]; n=x.get("short",x["name"]); k = f'<div class="k">{x["practice"]}</div>' if kicker else ''
    return f'<a class="svc-card card" href="/services/{s}"><span class="ic">{I(SERVICE_ICONS[s])}</span>{k}<h3>{n}</h3><p>{esc(re.sub("<br[^>]*>"," ",x["h1"]))}</p><span class="go">See {n}{I("arrow-right")}</span></a>'
def post(b, feat=False):
    return f'''<a class="post card{" feat" if feat else ""}" href="/blog/{b['id']}"><div class="cover"><div class="k">{esc(b['category'])}</div><div><div class="t">{esc(b['title'])}</div><div class="rule" style="margin-top:14px"></div></div></div>
<div class="body"><div class="meta"><span>{I("clock")}{esc(b['readTime'])}</span></div><p>{esc(b['excerpt'])}</p>{('<span class="more" style="margin-top:22px">Read the article'+I("arrow-right")+'</span>') if feat else ''}</div></a>'''
HOW = [('01','Clear direction',"We look at how your business actually runs, tell you plainly what's costing you time or customers, and rank what to fix first. A written plan, not a pitch."),
       ('02','Right-fit solutions',"Nothing bundled, nothing assumed. Most businesses keep what already works and fix the twenty percent that's actually holding them back."),
       ('03','Open communication',"You work with the founder, not a rotating cast of account managers. Every recommendation comes with a plain-English reason you can weigh yourself.")]
def how_section(h2="It's not about doing more. <br class=lg>It's about doing it right."):
    return f'<section class="how"><div class="wrap"><div class="sec-h rv"><div class="lbl">How we work</div><h2>{h2}</h2></div><div class="how-grid">' + ''.join(f'<div class="card"><div class="num">{n}</div><h3>{t}</h3><p>{esc(p)}</p></div>' for n,t,p in HOW) + '</div></div></section>'
PARTNER_CARD = f'<a class="partner rv" href="/partners/rh-event-design"><div><div class="k">Strategic partnership</div><h3>RH Event Design × DFB Digital</h3><p>Reyna Harilela brings twenty years of luxury events and PR relationships. DFB Digital brings the web, strategy and systems that carry the same standard online. One team, both halves of the&nbsp;brief.</p></div><img src="/assets/rh-logo.png" alt="RH Event Design"></a>'

def pixel_mark_svg(n=26, start=3.8, span=1.3, seed=7):
    """The DFB mark as N×N blocks, each snapping on at its own delay (deterministic shuffle)."""
    from PIL import Image
    import random
    im = Image.open(f'{ROOT}/assets/dfb-mark.png').convert('RGBA').resize((n*8, n*8), Image.LANCZOS)
    px = im.load(); cells = []
    for gy in range(n):
        for gx in range(n):
            on = sum(1 for y in range(gy*8,(gy+1)*8) for x in range(gx*8,(gx+1)*8) if px[x,y][3] > 128)
            if on >= 32: cells.append((gx,gy))
    rnd = random.Random(seed); order = cells[:]; rnd.shuffle(order)
    # bias: blocks nearer the bottom-left land slightly earlier, so it reads as building along the diagonal
    delay = {c: start + span * ((i/len(order))*0.7 + 0.3*((c[0] + (n-c[1]))/(2*n))) for i,c in enumerate(order)}
    rects = ''.join(f'<rect x="{x}" y="{y}" width="1.04" height="1.04" style="animation-delay:{delay[(x,y)]:.2f}s"/>' for x,y in cells)
    return f'<svg class="px" viewBox="0 0 {n} {n}" fill="#0000FF" aria-hidden="true">{rects}</svg>', len(cells)

# ── pages ──
def calling_card():
    """Embed Joe's DFB calling card (public/joe.html) as-is: its sections and its CSS, scoped under .jcard."""
    src = open(f'{ROOT}/../public/joe.html', encoding='utf-8').read()
    css = re.search(r'<style[^>]*>(.*?)</style>', src, re.S).group(1)
    css = re.sub(r'@import\s+url\([^)]*\)[^;]*;', '', css)
    css = re.sub(r'/\*.*?\*/', '', css, flags=re.S)
    DROP = ('html', 'header', 'nav', '.logo', '.nav-cta')
    def scope_sel(sel):
        sel = sel.strip()
        if not sel: return None
        if sel == ':root' or sel == 'body': return '.jcard'
        if sel == '*': return '.jcard *'
        if any(sel == d or sel.startswith(d + ' ') or sel.startswith(d + ':') or sel.startswith(d + '.') for d in DROP): return None
        return '.jcard ' + sel
    def scope(block):
        out, i, n = [], 0, len(block)
        while i < n:
            j = block.find('{', i)
            if j < 0: break
            head = block[i:j].strip()
            depth, k = 1, j + 1
            while k < n and depth:
                depth += (block[k] == '{') - (block[k] == '}'); k += 1
            inner = block[j+1:k-1]
            if head.startswith('@media'):
                out.append(f'{head}{{{scope(inner)}}}')
            elif head.startswith('@'):
                out.append(f'{head}{{{inner}}}')
            else:
                sels = [x for x in (scope_sel(t) for t in head.split(',')) if x]
                if sels: out.append(f'{",".join(sels)}{{{inner}}}')
            i = k
        return ''.join(out)
    scoped = scope(css) + """
.jcard{padding:0;background:transparent}
.jcard .hero{min-height:0;padding:96px 0 72px}
.jcard section{scroll-margin-top:84px}
.jcard .foot-bottom{display:none}
.jcard footer{padding-bottom:56px}
"""
    open(f'{ROOT}/assets/jcard.css', 'w', encoding='utf-8').write(scoped)
    body = re.search(r'<body[^>]*>(.*)</body>', src, re.S).group(1)
    body = body[body.index('<section'):body.rindex('</footer>') + len('</footer>')]
    for old, new in [('id="top"', 'id="jc-top"'), ('id="about"', 'id="jc-about"'), ('id="services"', 'id="jc-services"'), ('id="contact"', 'id="jc-contact"'),
                     ('href="#about"', 'href="#jc-about"'), ('href="#services"', 'href="#jc-services"'), ('href="#contact"', 'href="#jc-contact"'), ('href="#top"', 'href="#about"')]:
        body = body.replace(old, new)
    body = re.sub(r'src="data:image/jpeg;base64,[^"]+"', 'src="/assets/joe-original.jpg"', body)
    body = re.sub(r'<img src="data:image/png;base64,[^"]+"[^>]*>', '', body)
    return body

def notfound():
    body = f'''<section class="sec" style="min-height:60vh;display:grid;align-items:center"><div class="wrap"><div class="sec-h rv"><div class="lbl">404</div><h2>That page isn’t&nbsp;here.</h2><p class="lead">It may have moved when the site was rebuilt. The services, work and blog are all one click&nbsp;away.</p></div>
<div class="cta-row rv d2"><a class="pill blue" href="/">{I("arrow-left")}Back to the start</a><a class="pill ghost" href="/services">Services{I("arrow-right")}</a><a class="pill ghost" href="/contact">Contact{I("arrow-right")}</a></div></div></section>'''
    page('/404', 'Page not found — DFB Digital', 'That page isn’t here. It may have moved when the site was rebuilt.', body, noindex=True)

def home():
    hero = open(f'{ROOT}/_content/hero.html').read()
    pxsvg, ncells = pixel_mark_svg(); hero = hero.replace('{{PIXEL_MARK}}', pxsvg); print(f'  pixel mark: {ncells} blocks')
    stats = '''<div class="wrap"><div class="stats">
<div class="stat card"><div class="n"><b>+</b>2,700<b>%</b></div><div class="l">Instagram growth<small>75 → 2,100 followers in five months, one client</small></div></div>
<div class="stat card"><div class="n">4</div><div class="l">Live client sites<small>every one linked below, judge for yourself</small></div></div>
<div class="stat card"><div class="n">12<b>+</b></div><div class="l">Years<small>digital marketing and strategy, agency and client side</small></div></div></div></div>'''
    svc = ''.join(f'''<div class="svc card"><div class="num">0{i+1}</div><h3>{p}</h3><p class="d">{esc(d)}</p><ul>{"".join(f'<li><a href="/services/{s}">{I(SERVICE_ICONS[s])}{SERVICES[s].get("short",SERVICES[s]["name"])}</a><span>{esc(re.sub("<br[^>]*>"," ",SERVICES[s]["h1"]).rstrip("."))}</span></li>' for s in ss)}</ul></div>''' for i,(p,d,ss) in enumerate(PRACTICES))
    body = f'''{hero}
<section id="services"><div class="wrap"><div class="sec-h rv"><div class="lbl">Services <em>three practices</em></div><h2>Everything a growing business needs&nbsp;online. <br class=lg>Nothing it doesn't.</h2><p class="lead">Pick what you need. Nothing is bundled, and every recommendation comes with the reason behind&nbsp;it.</p></div>
<div class="svc-grid">{svc}</div><p class="rv" style="margin-top:28px"><a class="more" href="/services">Every service, in detail{I("arrow-right")}</a></p></div></section>
<section id="work"><div class="wrap"><div class="sec-h rv"><div class="lbl">Selected work <em>four live sites</em></div><h2>Proof, not&nbsp;promises.</h2><p class="lead">A boutique is only as good as what it ships. Every one of these is live. Click through and judge for&nbsp;yourself.</p></div>{work_grid()}
<p class="rv" style="margin-top:32px"><a class="more" href="/work">What we did on each{I("arrow-right")}</a></p></div></section>
{quotes_section("What it's like to work with&nbsp;us.")}
<section id="about" class="jcard">{calling_card()}</section>
<div class="wrap" style="padding:72px 0 96px">{PARTNER_CARD}</div>
{cta_band()}'''
    page('/', 'DFB Digital — Do Digital Better.', 'Boutique digital consultancy for established business owners. Websites, digital strategy and systems, with a plain-English reason behind every recommendation.', body,
         head='<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800&family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet"><link rel="stylesheet" href="/assets/jcard.css">')

def services_index():
    pr = ''.join(f'<div class="practice rv"><div class="ph"><h3>{p}</h3><span class="k">0{i+1} · {len(ss)} services</span></div><p class="lead" style="margin:0 0 22px">{esc(d)}</p><div class="svc-cards">{"".join(svc_card(s) for s in ss)}</div></div>' for i,(p,d,ss) in enumerate(PRACTICES))
    body = f'''<div class="phero center"><div class="wrap"><div class="crumb"><a href="/">Home</a>{I("chevron-right")}<b>Services</b></div><h1>Everything a growing business needs&nbsp;online. <br class=lg>Nothing it doesn't.</h1>
<p class="lead">Three practices, one team. Nothing is bundled, and every recommendation comes with the reason behind&nbsp;it.</p></div></div>
<section><div class="wrap">{pr}</div></section>{cta_band("Not sure where to start?", "Book a 30-minute call. We'll tell you what we'd fix first and why, and which of these you actually need.")}'''
    page('/services', 'Services — DFB Digital', 'Web development, digital marketing and digital consultancy for established businesses.', body, 'services')

def service(slug):
    s = SERVICES[slug]; name = s.get('short', s['name'])
    sibs = [x for p,_,ss in PRACTICES if slug in ss for x in ss if x != slug]
    body = f'''<div class="phero"><div class="wrap"><div class="crumb"><span class="c"><a href="/services">Services</a>{I("chevron-right")}</span><span class="c"><span>{s["practice"]}</span>{I("chevron-right")}</span><b>{name}</b></div>
<h1>{s["h1"]}</h1><p class="lead">{esc(s["lead"])}</p>
<div class="who rv" style="max-width:720px;margin-bottom:28px"><b>{I("user-check")}Who it's for</b><span>{esc(s["who"])}</span></div>
<div class="cta-row"><a class="pill blue" href="{MAIL}">{I("mail")}Book a 30-minute call</a><a class="pill ghost" href="/work">See the work{I("arrow-right")}</a></div></div></div>
{section(s["featTitle"], f"{name}, in&nbsp;practice.", cells(s["features"]))}
{section(s["stepsTitle"], s["stepsH2"], steps(s["steps"]), "how")}
{s["extra"]() if s.get("extra") else ""}
{("<section><div class=wrap><div class=article style=max-width:820px>"+faq(s["faq"])+"</div></div></section>") if s.get("faq") else ""}
<section style="padding-top:56px"><div class="wrap"><div class="sec-h rv"><div class="lbl">Also in {s["practice"]}</div></div><div class="svc-cards">{"".join(svc_card(x) for x in sibs)}</div></div></section>
{cta_band(f"Ready for {name}?", "Thirty minutes, no pitch deck. We'll tell you whether this is the right fit, and what we'd do first.")}'''
    page(f'/services/{slug}', f'{s["name"]} — DFB Digital', s['lead'][:155], body, 'services')

def work():
    body = f'''<div class="phero center"><div class="wrap"><div class="crumb"><a href="/">Home</a>{I("chevron-right")}<b>Work</b></div><h1>Four live sites. <br class=lg>Every one still&nbsp;running.</h1>
<p class="lead">Click any of them. They're all live, all built to be run by the people who own them, and none of them is a mock-up.</p></div></div>
<section><div class="wrap">{work_grid(detail=True)}</div></section>
<section class="how"><div class="wrap"><div class="sec-h rv"><div class="lbl">What they have in common</div><h2>Built to be run by the people <br class=lg>who own&nbsp;them.</h2></div>
<div class="how-grid"><div class="card"><div class="num">01</div><h3>Owner-operable</h3><p>Every site is built so the client's own team can publish and update without waiting on a developer.</p></div><div class="card"><div class="num">02</div><h3>Fast, everywhere</h3><p>Mobile-first, lightweight and hosted on modern infrastructure, because most of your customers are on a phone.</p></div><div class="card"><div class="num">03</div><h3>Measured</h3><p>Analytics wired in from day one, so decisions after launch are made on what's actually happening.</p></div></div></div></section>
{cta_band("Let's build the next one.")}'''
    page('/work', 'Work — DFB Digital', 'Selected work by DFB Digital: RH Event Design, Prof. Derek Burton Collins, Dante Alighieri Society, Aldeon Luxury Suites.', body, 'work')

def about():
    body = f'''<div class="phero"><div class="wrap phero-grid"><div><div class="crumb"><a href="/">Home</a>{I("chevron-right")}<b>About</b></div><h1 style="max-width:16ch">Twelve years inside the agencies. Now on your side of the&nbsp;table.</h1>
<p class="lead">DFB Digital is a boutique digital consultancy, registered in Hong Kong and delivered from Manila, led by founder Joe&nbsp;Flores.</p></div>
<div class="rv d1"><div class="portrait"><img src="/assets/joe-original.jpg" alt="Joe Flores, Founder of DFB Digital"><div class="badge"><b>Joe Flores</b><span>Founder · aka Daddy FunBuckets</span></div></div></div></div></div>
<section><div class="wrap about" style="max-width:760px"><div class="lbl rv">The founder</div>
<p class="rv" style="margin-top:22px">{esc("Joe Flores spent over a decade in digital marketing and strategy across Asia, the Middle East and global markets, including inside global agency social teams, before founding DFB Digital to work directly with the business owners those agencies never quite served.")}</p>
<p class="rv">{esc("Most of those owners don't need more marketing. They need someone to look at how the business actually runs, say plainly what's costing them time or customers, and fix that first. That's the job. Websites, digital strategy and the systems behind them, explained in plain English, with the reasoning shown.")}</p>
<div class="lbl rv" style="margin-top:44px">{HAT}About the name</div>
<p class="rv" style="margin-top:22px">{esc("DFB is Daddy FunBuckets, the nickname Joe has answered to for years and the handle he's built his work under. The bucket hat is the shorthand for how the place works: serious about the outcome, unserious about the ceremony. It's why the blog is called Into the Bucket, and why there's a hat on the browser tab.")}</p></div></section>
{quotes_section("Two clients, in full.", full=True)}
<div class="wrap" style="padding-top:96px;padding-bottom:96px">{PARTNER_CARD}</div>
{cta_band()}'''
    page('/about', 'About — DFB Digital', 'DFB Digital is led by founder Joe Flores, with 12+ years of digital marketing and strategy across Asia, the Middle East and global markets.', body, 'about')

def blog_index():
    body = f'''<div class="phero center"><div class="wrap"><div class="crumb"><a href="/">Home</a>{I("chevron-right")}<b style="display:inline-flex;align-items:center;gap:8px">{HAT}Into the Bucket</b></div><h1>Clear thinking on digital, <br class=lg>for decision&#8209;makers.</h1>
<p class="lead">Practical perspectives on strategy, marketing and building businesses that last, written for owners who want clarity, not&nbsp;complexity.</p></div></div>
<section><div class="wrap"><div class="posts">{post(BLOG[0], True)}</div><div class="posts three" style="margin-top:24px">{"".join(post(b) for b in BLOG[1:])}</div></div></section>
{cta_band("Prefer a conversation to a reading list?")}'''
    page('/blog', 'Into the Bucket — The DFB Digital Blog', 'Clear thinking on digital for decision-makers, from DFB Digital.', body, 'blog')

def article(slug):
    a = ART[slug]; meta = next(b for b in BLOG if b['id']==slug)
    flow = a['flow']; title = next(t for tag,t in flow if tag=='h1'); rest = [(tag,t) for tag,t in flow if tag!='h1']
    dek = rest[0][1] if rest and rest[0][0]=='p' else meta['subtitle']; blocks = rest[1:] if rest and rest[0][0]=='p' else rest
    prose = ''.join(f'<{tag}>{esc(t)}</{tag}>' for tag,t in blocks)
    others = [b for b in BLOG if b['id']!=slug][:2]
    body = f'''<div class="wrap"><div class="article"><div class="ahead"><div class="meta"><b>{esc(meta['category'])}</b><span>{I("clock")}{esc(meta['readTime'])}</span></div><h1>{nb(esc(title))}</h1><p class="dek">{esc(dek)}</p>
<div class="byline"><img src="/assets/joe-original.jpg" alt=""><span>By <b>Joe Flores</b> · Founder, DFB Digital</span></div></div>
<div class="prose rv">{prose}</div>{faq(a['faq'])}
<div class="next"><div class="lbl">Keep reading</div>{"".join(post(b) for b in others)}</div></div></div>
{cta_band()}'''
    page(f'/blog/{slug}', f'{title} — DFB Digital', dek[:155], body, 'blog')

def partner():
    svcs = ''.join(f'<li>{esc(s)}</li>' for s in RH['services'] if not s.startswith('Timeless'))
    body = f'''<div class="phero"><div class="wrap phero-grid"><div><div class="crumb"><a href="/">Home</a>{I("chevron-right")}<b>Partners</b></div><h1>RH Event Design <br class=lg>× DFB&nbsp;Digital</h1>
<p class="lead">{esc(RH['text'][0])}</p><a class="pill ghost" href="https://rheventdesign.com" target="_blank" rel="noopener">Visit rheventdesign.com{I("arrow-up-right")}</a></div>
<div class="rv d1">{mock(WORK[0])}</div></div></div>
<section><div class="wrap about" style="max-width:760px"><div class="lbl rv">About RH Event Design</div>
<p class="rv" style="margin-top:22px">{esc(RH['text'][1])}</p><p class="rv">{esc(RH['text'][2])}</p>
<div class="rv" style="margin-top:28px"><div class="lbl" style="margin-bottom:14px">What they do</div><ul class="did">{svcs}</ul></div>
<blockquote class="rv">{esc(RH['text'][4])}<cite>A client, on Reyna</cite></blockquote>
<div class="lbl rv">Notable work</div><p class="rv" style="margin-top:16px">{esc(RH['text'][3])}</p></div></section>
<section class="how"><div class="wrap"><div class="sec-h rv"><div class="lbl">Why we partner</div><h2>They handle the room. <br class=lg>We handle the&nbsp;screen.</h2></div>
<div class="how-grid"><div class="card"><div class="num">01</div><h3>The room</h3><p>Relationships, taste and event execution: media, guest lists, venues and the moments people remember.</p></div><div class="card"><div class="num">02</div><h3>The screen</h3><p>Websites, digital strategy and systems that carry the same level of polish online, before and after the event.</p></div><div class="card"><div class="num">03</div><h3>One team</h3><p>{esc(RH['text'][6])}</p></div></div></div></section>
{cta_band("Planning something worth talking about?", "Get in touch about a joint event or digital engagement. One conversation covers both halves of the brief.")}'''
    page('/partners/rh-event-design', 'RH Event Design × DFB Digital — Strategic Partnership', RH['text'][0][:155], body)

def contact():
    body = f'''<div class="phero center"><div class="wrap"><div class="crumb"><a href="/">Home</a>{I("chevron-right")}<b>Contact</b></div><h1>Thirty minutes. <br class=lg>No pitch&nbsp;deck.</h1>
<p class="lead">We'll tell you what we'd fix first and why, and you decide what to do with&nbsp;it.</p></div></div>
<section><div class="wrap contact-grid"><div class="rv"><div class="lbl">Book a call</div><h2 style="margin-bottom:16px">Email us three times that work for&nbsp;you.</h2><p class="lead" style="margin:0 0 26px">{esc("We'll confirm one within a working day. A conversation with the founder, then a written plan you can act on. No obligation.")}</p>
<a class="pill blue" href="{MAIL}?subject=30-minute%20call">{I("mail")}Email hello@dfbdigital.com</a><p class="k" style="margin-top:16px;text-transform:none;letter-spacing:0;font-weight:500">Currently taking on two new clients for Q4 2026.</p></div>
<div class="cinfo rv d1"><div class="k">{I("mail")}Email</div><a href="{MAIL}">hello@dfbdigital.com</a><div class="k">{I("linkedin")}LinkedIn</div><a href="https://linkedin.com/in/daddyfunbuckets" target="_blank" rel="noopener">linkedin.com/in/daddyfunbuckets</a>
<div class="k">{I("map-pin")}Office</div><p>Unit B, 11/F Yam Tze Comm Bldg<br>23 Thomson Rd, Wan Chai <br class=lg>Hong Kong</p><div class="k">{I("globe")}Delivery</div><p>Manila, Philippines</p></div></div></section>'''
    page('/contact', 'Contact — DFB Digital', 'Book a 30-minute call with DFB Digital.', body)

if __name__ == '__main__':
    print('building…'); home(); services_index()
    for s in SERVICES: service(s)
    work(); about(); blog_index()
    for a in ART: article(a)
    partner(); contact(); notfound()
    open(f'{ROOT}/vercel.json','w').write('{"cleanUrls":true,"trailingSlash":false}')
    print(f'done — {2+len(SERVICES)+3+len(ART)+2} pages')
