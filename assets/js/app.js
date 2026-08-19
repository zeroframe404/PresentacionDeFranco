/* ===============================================================
   MOTOR DE LA PRESENTACIÓN
   Manejadores: teclado · rueda · gestos táctiles · flechas ·
   puntos · índice lateral · pantalla completa · tema · enlace directo
   =============================================================== */
(function () {
  'use strict';

  const D = window.DECK;
  const I = window.ICONS;
  const $ = (s) => document.querySelector(s);

  /* ── Referencias ─────────────────────────────────────────── */
  const deckEl   = $('#deck');
  const dotsEl   = $('#dots');
  const ovGrid   = $('#overviewGrid');
  const ovFoot   = $('#overviewFoot');
  const barEl    = $('#progressBar');
  const nowEl    = $('#counterNow');
  const totEl    = $('#counterTotal');
  const btnPrev  = $('#btnPrev');
  const btnNext  = $('#btnNext');
  const btnMenu  = $('#btnMenu');
  const btnClose = $('#btnCloseOverview');
  const btnFull  = $('#btnFull');
  const btnTheme = $('#btnTheme');
  const scrim    = $('#scrim');
  const brandEl  = $('#brand');

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let slides = [];
  let total  = 0;
  let index  = 0;
  let locked = false;
  let lockTimer = 0;

  /* ══════════════ Construcción ═══════════════════════════════ */
  function boot() {
    document.title = D.meta.docTitle || document.title;
    slides = window.Render.build(D, deckEl);
    total  = slides.length;

    brandEl.innerHTML = window.Render.lockup(D.meta, 'lockup--sm');
    totEl.textContent = pad(total);

    btnPrev.innerHTML  = I.arrowLeft;
    btnNext.innerHTML  = I.arrowRight;
    btnMenu.innerHTML  = I.menu;
    btnClose.innerHTML = I.close;
    if (ovFoot) ovFoot.textContent = `${D.meta.person} · ${D.meta.role}`;

    buildDots();
    buildOverview();
    syncFullIcon();
    syncThemeIcon();

    go(readHash(), 1, true);

    requestAnimationFrame(() => document.body.classList.add('ready'));
  }

  const pad = (n) => String(n).padStart(2, '0');

  function buildDots() {
    dotsEl.innerHTML = D.slides.map((s, i) => `
      <button class="dot" type="button" data-goto="${i}"
        aria-label="Ir a: ${(s.nav || '').replace(/"/g, '')}"><span>${s.nav || i + 1}</span></button>`).join('');
  }

  function buildOverview() {
    ovGrid.innerHTML = D.slides.map((s, i) => `
      <button class="ov-item" type="button" data-goto="${i}" style="--i:${i}">
        <b>${pad(i + 1)}</b><span>${s.nav || `Diapositiva ${i + 1}`}</span>
      </button>`).join('');
  }

  /* ══════════════ Navegación ═════════════════════════════════ */
  function go(next, dir, initial) {
    next = Math.max(0, Math.min(total - 1, next));
    if (!initial && (locked || next === index)) return;

    const cur = slides[index];
    const nxt = slides[next];
    const back = dir < 0;

    if (!initial && cur) {
      cur.dataset.state = back ? 'out-right' : 'out-left';
      cur.setAttribute('inert', '');
      window.setTimeout(() => {
        if (cur.dataset.state !== 'in') cur.dataset.state = 'idle';
      }, reduced ? 160 : 900);
    }

    /* Posicionamos sin transición y activamos en el siguiente frame */
    nxt.dataset.state = back ? 'pre-left' : 'pre-right';
    void nxt.offsetWidth;
    nxt.dataset.state = 'in';
    nxt.removeAttribute('inert');
    nxt.querySelector('.slide__inner').scrollTop = 0;

    index = next;
    lock();
    sync();
  }

  const nextSlide = () => go(index + 1, 1);
  const prevSlide = () => go(index - 1, -1);

  function lock() {
    locked = true;
    clearTimeout(lockTimer);
    lockTimer = window.setTimeout(() => { locked = false; }, reduced ? 180 : 560);
  }

  function sync() {
    const s = D.slides[index];

    nowEl.textContent = pad(index + 1);
    barEl.style.width = (((index + 1) / total) * 100) + '%';

    document.body.classList.toggle('at-start', index === 0);
    document.body.classList.toggle('on-dark', !!(s && s.tone === 'dark'));

    btnPrev.disabled = index === 0;
    btnNext.disabled = index === total - 1;

    dotsEl.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('is-on', i === index));
    ovGrid.querySelectorAll('.ov-item').forEach((b, i) => {
      b.classList.toggle('is-on', i === index);
      b.setAttribute('aria-current', i === index ? 'true' : 'false');
    });

    const hash = '#/' + (index + 1);
    if (location.hash !== hash) history.replaceState(null, '', hash);
  }

  function readHash() {
    const m = /^#\/(\d+)$/.exec(location.hash);
    if (m) return Math.max(0, Math.min(total - 1, parseInt(m[1], 10) - 1));
    const byId = D.slides.findIndex((s) => '#' + s.id === location.hash);
    return byId > -1 ? byId : 0;
  }

  /* ══════════════ Índice lateral ═════════════════════════════ */
  function overview(open) {
    const on = open === undefined ? !document.body.classList.contains('overview-open') : open;
    document.body.classList.toggle('overview-open', on);
    btnMenu.setAttribute('aria-expanded', String(on));
    $('#overview').setAttribute('aria-hidden', String(!on));
    if (on) window.setTimeout(() => btnClose.focus(), 120);
  }

  /* ══════════════ Pantalla completa ══════════════════════════ */
  function toggleFull() {
    const el = document.documentElement;
    if (!document.fullscreenElement) {
      (el.requestFullscreen || el.webkitRequestFullscreen || function () {}).call(el);
    } else {
      (document.exitFullscreen || document.webkitExitFullscreen || function () {}).call(document);
    }
  }
  const syncFullIcon = () => { btnFull.innerHTML = document.fullscreenElement ? I.collapse : I.expand; };

  /* ══════════════ Tema ═══════════════════════════════════════ */
  function toggleTheme() {
    const now = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', now);
    try { localStorage.setItem('fm-theme', now); } catch (e) {}
    syncThemeIcon();
  }
  function syncThemeIcon() {
    const dark = document.documentElement.getAttribute('data-theme') === 'dark';
    btnTheme.innerHTML = dark ? I.sun : I.moon;
    btnTheme.title = dark ? 'Tema claro (T)' : 'Tema oscuro (T)';
  }

  /* ══════════════ Manejadores ════════════════════════════════ */

  /* Clic delegado: cualquier elemento con data-goto navega */
  document.addEventListener('click', (e) => {
    const t = e.target.closest('[data-goto]');
    if (!t) return;
    e.preventDefault();
    const raw = t.dataset.goto;
    const n = /^\d+$/.test(raw) ? parseInt(raw, 10) : D.slides.findIndex((s) => s.id === raw);
    if (n < 0) return;
    if (document.body.classList.contains('overview-open')) overview(false);
    go(n, n > index ? 1 : -1);
  });

  btnPrev.addEventListener('click', prevSlide);
  btnNext.addEventListener('click', nextSlide);
  btnMenu.addEventListener('click', () => overview());
  btnClose.addEventListener('click', () => overview(false));
  scrim.addEventListener('click', () => overview(false));
  btnFull.addEventListener('click', toggleFull);
  btnTheme.addEventListener('click', toggleTheme);
  document.addEventListener('fullscreenchange', syncFullIcon);
  window.addEventListener('hashchange', () => { const n = readHash(); if (n !== index) go(n, n > index ? 1 : -1); });

  /* Teclado */
  document.addEventListener('keydown', (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const tag = (e.target.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'textarea') return;

    switch (e.key) {
      case 'ArrowRight': case 'ArrowDown': case 'PageDown': case ' ':
        e.preventDefault(); nextSlide(); break;
      case 'ArrowLeft': case 'ArrowUp': case 'PageUp':
        e.preventDefault(); prevSlide(); break;
      case 'Home': e.preventDefault(); go(0, -1); break;
      case 'End':  e.preventDefault(); go(total - 1, 1); break;
      case 'Escape': overview(false); break;
      default:
        if (/^[0-9]$/.test(e.key)) { const n = (parseInt(e.key, 10) || 10) - 1; if (n < total) go(n, n > index ? 1 : -1); }
        else if (e.key === 'f' || e.key === 'F') toggleFull();
        else if (e.key === 'o' || e.key === 'O' || e.key === 'm' || e.key === 'M') overview();
        else if (e.key === 't' || e.key === 'T') toggleTheme();
    }
  });

  /* ¿El contenido de la diapositiva puede desplazarse en esa dirección? */
  function innerCanScroll(dir) {
    const el = slides[index] && slides[index].querySelector('.slide__inner');
    if (!el) return false;
    const room = el.scrollHeight - el.clientHeight;
    if (room < 6) return false;
    return dir > 0 ? el.scrollTop < room - 2 : el.scrollTop > 2;
  }

  /* Rueda del mouse / trackpad */
  let wheelAcc = 0, wheelTimer = 0;
  deckEl.addEventListener('wheel', (e) => {
    if (document.body.classList.contains('overview-open')) return;
    const d = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
    if (innerCanScroll(d)) { wheelAcc = 0; return; }
    if (locked) return;

    wheelAcc += d;
    clearTimeout(wheelTimer);
    wheelTimer = window.setTimeout(() => { wheelAcc = 0; }, 180);

    if (Math.abs(wheelAcc) > 42) {
      wheelAcc > 0 ? nextSlide() : prevSlide();
      wheelAcc = 0;
    }
  }, { passive: true });

  /* Gestos táctiles */
  let tx = 0, ty = 0, tt = 0, tracking = false;
  deckEl.addEventListener('touchstart', (e) => {
    if (e.touches.length !== 1) { tracking = false; return; }
    tracking = true;
    tx = e.touches[0].clientX;
    ty = e.touches[0].clientY;
    tt = e.timeStamp;
  }, { passive: true });

  deckEl.addEventListener('touchend', (e) => {
    if (!tracking) return;
    tracking = false;
    const t = e.changedTouches[0];
    const dx = t.clientX - tx;
    const dy = t.clientY - ty;
    const fast = (e.timeStamp - tt) < 700;
    const H = Math.abs(dx), V = Math.abs(dy);

    if (H > V && H > 46 && fast) {
      dx < 0 ? nextSlide() : prevSlide();
    } else if (V > H && V > 62 && fast && !innerCanScroll(dy < 0 ? 1 : -1)) {
      dy < 0 ? nextSlide() : prevSlide();
    }
  }, { passive: true });

  /* Acordeón de preguntas (si alguna diapositiva lo usa) */
  document.addEventListener('click', (e) => {
    const q = e.target.closest('.faq__q');
    if (!q) return;
    const item = q.closest('.faq__item');
    const open = item.classList.toggle('is-open');
    q.setAttribute('aria-expanded', String(open));
  });

  /* Recalcular alto real en móviles (barra de direcciones) */
  const setVH = () => document.documentElement.style.setProperty('--vh', window.innerHeight * 0.01 + 'px');
  window.addEventListener('resize', setVH);
  window.addEventListener('orientationchange', () => window.setTimeout(setVH, 250));
  setVH();

  /* ── Arranque ────────────────────────────────────────────── */
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
