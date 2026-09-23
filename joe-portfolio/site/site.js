(function () {
  document.documentElement.classList.add('js');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  // scroll direction, for direction-aware entrances
  let lastY = scrollY, down = true;
  addEventListener('scroll', () => { const y = scrollY; if (Math.abs(y - lastY) > 2) { down = y > lastY; lastY = y; } }, { passive: true });
  // cards enter from their side when scrolling down, from the opposite side when scrolling back up; they re-run every time
  const io = new IntersectionObserver(es => es.forEach(e => {
    const el = e.target, side = el.dataset.side;
    if (e.isIntersecting) {
      if (side) { const from = down ? side : (side === 'left' ? 'right' : 'left'); el.classList.remove('from-left', 'from-right'); el.classList.add('from-' + from); void el.offsetWidth; }
      el.classList.add('in');
    } else if (side) { el.classList.remove('in'); }
  }), { threshold: .12, rootMargin: '0px 0px -5% 0px' });
  document.querySelectorAll('.rv').forEach(el => io.observe(el));
  // parallax: elements drift sideways with the scroll, each at its own rate and direction
  const px = [...document.querySelectorAll('[data-px]')].map(el => ({ el, k: parseFloat(el.dataset.px) }));
  if (!reduced && px.length) {
    let tick = false;
    const run = () => { tick = false; const vh = innerHeight, damp = innerWidth < 900 ? 0.3 : 1; px.forEach(({ el, k }) => { const r = el.getBoundingClientRect(); const p = (r.top + r.height / 2 - vh / 2) / vh; el.style.transform = `translateX(${(-p * k * 320 * damp).toFixed(1)}px)`; }); };
    addEventListener('scroll', () => { if (!tick) { tick = true; requestAnimationFrame(run); } }, { passive: true }); run();
  }
  // videos: load when near, play in view, pause out of view
  const vio = new IntersectionObserver(es => es.forEach(e => {
    const v = e.target, fig = v.closest('.piece, .reel');
    if (e.isIntersecting) { if (!v.src) { v.src = v.dataset.src; v.load(); } if (!reduced) v.play().then(() => fig.classList.add('playing')).catch(() => {}); }
    else { v.pause(); fig.classList.remove('playing'); }
  }), { threshold: .35, rootMargin: '200px 0px' });
  document.querySelectorAll('.piece video, .reel video').forEach(v => vio.observe(v));
  // active chapter chip
  const chips = [...document.querySelectorAll('.chips a')];
  const cio = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) chips.forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + e.target.id)); }), { rootMargin: '-40% 0px -50% 0px' });
  document.querySelectorAll('.chapter').forEach(s => cio.observe(s));
  // lightbox
  const P = window.PIECES || [], lb = document.getElementById('lb'), stage = document.getElementById('lb-stage'), cap = document.getElementById('lb-cap');
  let cur = -1, lastFocus = null;
  function show(i) {
    cur = (i + P.length) % P.length; const p = P[cur];
    stage.innerHTML = p.type === 'video' ? `<video src="${p.src}" poster="${p.poster || ''}" controls autoplay playsinline loop></video>` : `<img src="${p.src}" alt="${p.title}">`;
    cap.innerHTML = `<span>${p.title}</span><small>${p.brand} · ${cur + 1}/${P.length}</small>`;
    [cur - 1, cur + 1].forEach(j => { const q = P[(j + P.length) % P.length]; if (q.type !== 'video') { const im = new Image(); im.src = q.src; } });
  }
  function open(i) { lastFocus = document.activeElement; lb.hidden = false; document.body.style.overflow = 'hidden'; show(i); document.getElementById('lb-x').focus(); }
  function close() { lb.hidden = true; stage.innerHTML = ''; document.body.style.overflow = ''; if (lastFocus) lastFocus.focus(); }
  document.querySelectorAll('.piece').forEach(f => { f.tabIndex = 0; f.setAttribute('role', 'button'); f.addEventListener('click', () => open(+f.dataset.idx)); f.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(+f.dataset.idx); } }); });
  document.getElementById('lb-x').addEventListener('click', close);
  document.getElementById('lb-prev').addEventListener('click', () => show(cur - 1));
  document.getElementById('lb-next').addEventListener('click', () => show(cur + 1));
  lb.addEventListener('click', e => { if (e.target === lb || e.target === stage) close(); });
  addEventListener('keydown', e => { if (lb.hidden) return; if (e.key === 'Escape') close(); if (e.key === 'ArrowLeft') show(cur - 1); if (e.key === 'ArrowRight') show(cur + 1); });
  let tx = 0; lb.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true }); lb.addEventListener('touchend', e => { const dx = e.changedTouches[0].clientX - tx; if (Math.abs(dx) > 60) show(cur + (dx < 0 ? 1 : -1)); });
})();
