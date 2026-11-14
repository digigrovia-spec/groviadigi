/* Groviadigi — scroll motion. Only transform/opacity are animated; one rAF loop; layout read once per resize. */
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Lite mode for low-end devices: no WebGL strand, no blur filters, no cursor light, no smooth-scroll
  // library, a lighter ribbon. Turned on up front for weak hardware or Data Saver, and later by the
  // frame-rate watchdog in loop() if the page cannot keep up.
  const conn = navigator.connection || {};
  const cores = navigator.hardwareConcurrency || 8, mem = navigator.deviceMemory || 8;
  let lite = !!conn.saveData || mem <= 2 || cores <= 2 || (cores <= 4 && mem <= 4) || /[?&]lite(=|&|$)/.test(location.search);
  if (lite) document.documentElement.classList.add('lite');
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const ease = t => 1 - Math.pow(1 - t, 3);
  const lerpRange = (p, a, b) => clamp((p - a) / (b - a));

  /* ---------- smooth scroll (desktop; touch keeps native scrolling) ---------- */
  let lenis = null;
  if (!reduce && !lite && window.Lenis) {
    // a gentler lerp glides more, both down and back up
    lenis = new Lenis({ lerp: 0.075, wheelMultiplier: 0.9, smoothWheel: true });
  }
  // anchor links
  $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    const el = id.length > 1 ? $(id) : null;
    if (!el && id !== '#top') return;
    e.preventDefault();
    closeMenu();
    const target = id === '#top' ? 0 : el;
    if (lenis) lenis.scrollTo(target, { offset: 0, duration: 1.4 });
    else (target === 0 ? window.scrollTo({ top: 0, behavior: 'smooth' }) : el.scrollIntoView({ behavior: 'smooth' }));
  }));

  /* ---------- mobile menu ---------- */
  const burger = $('#burger');
  function closeMenu() { document.body.classList.remove('menu-open'); burger.setAttribute('aria-expanded', 'false'); lenis && lenis.start(); }
  burger.addEventListener('click', () => {
    const open = document.body.classList.toggle('menu-open');
    burger.setAttribute('aria-expanded', String(open));
    lenis && (open ? lenis.stop() : lenis.start());
  });
  addEventListener('keydown', e => e.key === 'Escape' && closeMenu());

  /* ---------- split headings into words ---------- */
  $$('.split').forEach(h => {
    const html = h.innerHTML;
    if (h.dataset.done) return;
    h.dataset.done = 1;
    h.setAttribute('aria-label', h.textContent);
    h.innerHTML = html.split(/(\s+)/).map((w, i) => /\s+/.test(w) ? w : `<span class="w" aria-hidden="true"><span style="transition-delay:${(i / 2) * 0.05}s">${w}</span></span>`).join('');
  });

  /* ---------- reveal on view ---------- */
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { rootMargin: '0px 0px -12% 0px', threshold: 0.01 });
  $$('.rv, .split, .indent').forEach(el => io.observe(el));

  /* ---------- letters ---------- */
  const WORD = 'groviadigi';
  const word = $('#word'), refl = $('#wordReflect');
  const seeds = [...WORD].map((c, i) => {
    const r = n => { const x = Math.sin((i + 1) * 9301 + n * 49297) * 233280; return x - Math.floor(x); };
    return { x: (r(1) - .5) * 70, y: (r(2) - .5) * 120 - 20, rot: (r(3) - .5) * 140, delay: r(4) * .35 };
  });
  const LAST = WORD.length - 1;                          // the last i: its dot is the glowing ball we dive into
  // every i is drawn dotless with a square dot of its own; the last one is the dot we dive into
  const mk = (el, main) => [...WORD].map((c, i) => {
    const s = document.createElement('span');
    s.textContent = c === 'i' ? 'ı' : c;
    if (i >= 6) s.className = 'v';
    if (c === 'i') { const d = document.createElement('i'); d.className = 'dot'; if (main && i === LAST) d.id = 'diveDot'; s.appendChild(d); }
    el.appendChild(s);
    return s;
  });
  const letters = mk(word, true), lettersR = mk(refl, false);

  /* ---------- counters ---------- */
  const counters = $$('.stat b[data-count]');
  let counted = false;
  function runCounters() {
    if (counted) return; counted = true;
    counters.forEach(b => {
      const to = +b.dataset.count, pre = b.dataset.prefix || '', suf = b.dataset.suffix || '';
      if (reduce) return;
      const t0 = performance.now();
      const step = t => { const p = clamp((t - t0) / 1400); b.textContent = pre + Math.round(ease(p) * to) + suf; if (p < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
    });
  }

  /* ---------- cached layout ---------- */
  const nav = $('#nav');
  const hero = $('.hero'), heroTitle = $('#heroHead'), heroBottom = $('#heroBottom');
  const sticky = $('.hero-sticky'), canvas = $('#ribbonCanvas');
  const rb = window.GroviaRibbon && canvas ? new window.GroviaRibbon(canvas, { reduce, lite }) : null;
  let heroP = 0;
  const intro = $('#intro'), introSticky = $('#introSticky'), introScene = $('#introScene');
  const stage = $('#stage'), horizon = $('#horizon'), wordWrap = $('#wordWrap');
  const offerWrap = $('#offer > .wrap');
  const work = $('#work'), cardsEl = $('#cards'), cards = $$('.card', cardsEl);
  const wTitle = $('#workTitleNow'), wType = $('#workType'), wCount = $('#workCount'), wBar = $('#workBar');
  const darkSecs = $$('.dark');
  let vh = innerHeight, vw = innerWidth, L = {};
  function measure() {
    vh = innerHeight; vw = innerWidth;
    const top = el => el.getBoundingClientRect().top + scrollY;
    L.hero = { t: top(hero), h: hero.offsetHeight };
    // the ribbon fits between the headline and the text below it, at any screen size
    if (rb) {
      const sr = sticky.getBoundingClientRect();
      // measure without the scroll transforms
      const ht = heroTitle.style.transform, hb = heroBottom.style.transform;
      heroTitle.style.transform = heroBottom.style.transform = 'none';
      const top = heroTitle.getBoundingClientRect().bottom - sr.top;
      // the loop stays under the headline; the straight run may pass behind the text below, as in the reference
      const bottomTop = heroBottom.getBoundingClientRect().top - sr.top;
      const bottom = bottomTop - 10;                     // the ribbon stays clear of the text below
      heroTitle.style.transform = ht; heroBottom.style.transform = hb;
      rb.layout({ w: sticky.clientWidth, h: sticky.clientHeight, top, bottom });
    }
    L.intro = { t: top(intro), h: intro.offsetHeight };
    // intro geometry, from offsets so the running animations don't skew it
    if (rb) introSticky.style.setProperty('--dive', rb.diveColour());
    L.sceneW = introScene.clientWidth; L.sceneH = introScene.clientHeight;
    L.horY = stage.offsetTop + horizon.offsetTop;
    const fs = parseFloat(getComputedStyle(word).fontSize);
    const lastI = letters[LAST];
    L.dot = { x: lastI.offsetLeft + .131 * fs, y: lastI.offsetTop + .204 * fs };
    wordWrap.style.transformOrigin = `${L.dot.x}px ${L.dot.y}px`;
    L.dotDx = L.sceneW / 2 - (stage.offsetLeft + wordWrap.offsetLeft + L.dot.x);
    L.dotDy = L.sceneH / 2 - (stage.offsetTop + wordWrap.offsetTop + L.dot.y);
    L.letters = letters.map(s => ({ x: wordWrap.offsetLeft + s.offsetLeft, y: wordWrap.offsetTop + s.offsetTop }));
    // the dot's place and size on screen at rest, for the pixel-sized dive square
    L.dotSize = .11 * fs;
    L.dotX = stage.offsetLeft + wordWrap.offsetLeft + L.dot.x;
    L.dotY = stage.offsetTop + wordWrap.offsetTop + L.dot.y;
    L.diveMax = 1.5 * Math.hypot(L.sceneW, L.sceneH) / L.dotSize;
    L.lightR = fs * 1.1;
    L.work = { t: top(work), h: work.offsetHeight };
    L.dark = darkSecs.map(s => ({ t: top(s), b: top(s) + s.offsetHeight }));
    // carousel geometry
    cardsEl.style.transform = 'none';
    L.cards = cards.map(c => c.offsetLeft + c.offsetWidth / 2);
    L.cw = cards[0].offsetWidth;
    L.trackShift = L.cards[L.cards.length - 1] - L.cards[0];
    L.cardsLeft = cardsEl.getBoundingClientRect().left;
    last = -1;
  }

  /* ---------- frame ---------- */
  let last = -1, lastY = 0, navHidden = false, current = -1;
  function frame() {
    const y = lenis ? lenis.scroll : scrollY;
    if (y === last) return;
    const dir = y > last ? 1 : -1;
    last = y;

    // nav: colour on dark sections, hide on scroll down
    const probe = y + 36;
    // once the dive has filled the screen with light, the intro no longer counts as dark
    const introLight = y > L.intro.t + (L.intro.h - vh) * .8 && y < L.intro.t + L.intro.h;
    const onDark = !introLight && (L.dark.some(d => probe >= d.t && probe < d.b) || (y > L.hero.t + (L.hero.h - vh) * .55 && y < L.intro.t));
    nav.classList.toggle('on-dark', onDark);
    nav.classList.toggle('scrolled', y > 10);
    if (Math.abs(y - lastY) > 8) {
      const hide = dir > 0 && y > vh * .8;
      if (hide !== navHidden) { navHidden = hide; nav.classList.toggle('hide', hide); }
      lastY = y;
    }

    if (reduce) return;

    // HERO: the camera dives into the ribbon (drawn by ribbon.js); text moves out of the way
    const hp = clamp((y - L.hero.t) / (L.hero.h - vh));
    heroP = hp;
    if (hp <= 1.001) {
      const tp = lerpRange(hp, 0, .45);
      heroTitle.style.transform = `translate3d(0,${(-tp * 18).toFixed(2)}vh,0)`;
      heroTitle.style.opacity = (1 - tp).toFixed(3);
      heroBottom.style.transform = `translate3d(0,${(tp * 8).toFixed(2)}vh,0)`;
      heroBottom.style.opacity = (1 - lerpRange(hp, 0, .3)).toFixed(3);
    }

    introUpdate(y);

  }

  /* ---------- INTRO: band opens, letters arrive, then the camera dives into the dot ---------- */
  let diving = false;
  function introUpdate(y) {
    const near = y > L.intro.t - vh * 1.2 && y < L.intro.t + L.intro.h;
    introSticky.classList.toggle('on', y >= L.intro.t - 1 && y < L.intro.t + L.intro.h);
    if (!near) {
      // past the intro (or jumped there): the offer must be fully visible
      if (y > L.intro.t && offerWrap.style.opacity !== '') { offerWrap.style.opacity = offerWrap.style.filter = offerWrap.style.transform = ''; }
      return;
    }
    const ip = clamp((y - L.intro.t) / (L.intro.h - vh));
    // 1. the night scene splits open along the horizon line
    const band = sstep(0, .14, ip);
    introScene.style.clipPath = band >= 1 ? 'none'
      : `inset(${(L.horY * (1 - band)).toFixed(1)}px 0 ${((L.sceneH - L.horY) * (1 - band)).toFixed(1)}px 0)`;
    // 2. letters drift in out of a blur and settle on the horizon
    letters.forEach((el, i) => {
      const sd = seeds[i];
      const p = ease(lerpRange(ip, .04 + sd.delay * .22, .36 + sd.delay * .22));
      const k = 1 - p;
      const tx = sd.x * .5 * k, ty = sd.y * .4 * k, r = sd.rot * .45 * k, sc = 1 + .35 * k;
      el.style.transform = `translate3d(${tx.toFixed(2)}vw,${ty.toFixed(2)}vh,0) rotate(${r.toFixed(1)}deg) scale(${sc.toFixed(3)})`;
      el.style.opacity = p.toFixed(3);
      el.style.filter = lite || p > .995 ? '' : `blur(${(k * 16).toFixed(1)}px)`;
      const er = lettersR[i];
      er.style.transform = `translate3d(${tx.toFixed(2)}vw,${(-ty).toFixed(2)}vh,0) rotate(${(-r).toFixed(1)}deg) scale(${sc.toFixed(3)})`;
      er.style.opacity = p.toFixed(3);
    });
    if (ip > .2) runCounters();
    // 3. the camera dives into the glowing dot; it fills the screen with light and the next page opens
    const d = sstep(.58, .86, ip), c = sstep(.58, .76, ip);
    const fade = 1 - sstep(.56, .66, ip);
    $('#stats').style.opacity = fade.toFixed(3);
    $('.intro-top').style.opacity = fade.toFixed(3);
    horizon.style.opacity = fade.toFixed(3);
    refl.style.opacity = (0.16 * fade).toFixed(3);
    diving = d > 0;
    const dotEl = $('#diveDot'), sq = $('#diveSquare');
    if (diving) {
      // the square grows in real pixels (width/height, not a scaled bitmap), so it never pixelates
      const s = Math.exp(Math.log(L.diveMax) * Math.pow(d, 2.2));
      const size = L.dotSize * s;
      const cx = L.dotX + (L.sceneW / 2 - L.dotX) * c, cy = L.dotY + (L.sceneH / 2 - L.dotY) * c;
      // its violet turns to the light page colour as it fills the screen
      const tint = sstep(.2, .8, d), a = [168, 132, 242], b = [245, 244, 250];
      sq.style.display = 'block';
      sq.style.width = sq.style.height = size.toFixed(1) + 'px';
      sq.style.left = (cx - size / 2).toFixed(1) + 'px';
      sq.style.top = (cy - size / 2).toFixed(1) + 'px';
      sq.style.borderRadius = (size * .11).toFixed(1) + 'px';
      sq.style.background = `rgb(${a.map((v, i) => Math.round(v + (b[i] - v) * tint)).join(',')})`;
      dotEl.style.visibility = 'hidden';
      // the letters move with the camera a little, then fade, so nothing is blown up into blur
      const ls = Math.min(s, 3.2);
      wordWrap.style.transform = `translate3d(${(L.dotDx * c).toFixed(1)}px,${(L.dotDy * c).toFixed(1)}px,0) scale(${ls.toFixed(3)})`;
      wordWrap.style.opacity = (1 - sstep(.05, .35, d)).toFixed(3);
      stage.classList.remove('lit');
    } else {
      if (sq.style.display !== 'none') sq.style.display = 'none';
      if (dotEl.style.visibility) dotEl.style.visibility = '';
      if (wordWrap.style.transform) { wordWrap.style.transform = ''; wordWrap.style.opacity = ''; }
    }
    // the next page's content arrives out of a blur while the square fills the screen
    const rv = sstep(.8, .96, ip);
    offerWrap.style.opacity = rv.toFixed(3);
    offerWrap.style.filter = lite || rv > .995 ? '' : `blur(${((1 - rv) * 14).toFixed(1)}px)`;
    offerWrap.style.transform = rv > .995 ? '' : `translate3d(0,${((1 - rv) * 40).toFixed(1)}px,0)`;
  }

  /* ---------- the cursor is a light: a glowing ball that lights the letters it passes ---------- */
  const light = $('#light');
  let lt = null, lp = null;
  stage.addEventListener('pointermove', e => {
    if (lite || e.pointerType === 'touch' || diving) return;
    const r = stage.getBoundingClientRect();
    lt = { x: e.clientX - r.left, y: e.clientY - r.top };
    if (!lp) lp = { ...lt };
    stage.classList.add('lit');
  }, { passive: true });
  stage.addEventListener('pointerleave', () => { stage.classList.remove('lit'); lt = null; });
  function animateLight() {
    if (lite || !lt || !lp) return;
    if (Math.abs(lt.x - lp.x) + Math.abs(lt.y - lp.y) < .2) return;   // settled: nothing to repaint
    lp.x += (lt.x - lp.x) * .14; lp.y += (lt.y - lp.y) * .14;
    light.style.transform = `translate3d(${lp.x.toFixed(1)}px,${lp.y.toFixed(1)}px,0)`;
    letters.forEach((el, i) => {
      const o = L.letters[i];
      el.style.setProperty('--lx', (lp.x - o.x).toFixed(1) + 'px');
      el.style.setProperty('--ly', (lp.y - o.y).toFixed(1) + 'px');
      el.style.setProperty('--lr', L.lightR.toFixed(0) + 'px');
    });
  }

  /* ---------- WORK: cards on an S-shaped strand that twists like DNA ----------
     The middle card swells towards you; cards bank the opposite way on each side;
     when you scroll fast the two sides wring further and the left side lifts.
     Runs every frame while the section is near, so the twist settles after you stop. */
  const sstep = (a, b, v) => { const t = clamp((v - a) / (b - a)); return t * t * (3 - 2 * t); };
  let wv = 0, wLastY = null, wIdle = 0;
  // card videos play only while the section is near the screen (never in lite mode, where posters show)
  let workVideosOn = false;
  const workVideos = $$('.card-video');
  if (workVideos.length && 'IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => {
      const on = e.isIntersecting && !lite && !reduce;
      if (on === workVideosOn) return;
      workVideosOn = on; wIdle = 0;
      workVideos.forEach(v => { if (on) { const p = v.play(); if (p) p.catch(() => {}); } else v.pause(); });
    }, { rootMargin: '200px 0px' }).observe($('#work'));
  }
  const strand = window.GroviaStrand ? new window.GroviaStrand($('.work-sticky'), cards) : null;
  function carousel(y) {
    // load the 3D strand a little before the section arrives
    if (strand && !reduce && !lite && !strand.ready && y > L.work.t - vh * 6) strand.init().then(() => { wIdle = 0; wLastY = null; });
    if (reduce || y < L.work.t - vh * 1.2 || y > L.work.t + L.work.h) { wLastY = y; return; }
    const dy = wLastY == null ? 0 : y - wLastY; wLastY = y;
    const want = clamp(Math.abs(dy) / 26);
    wv += (want - wv) * (want > wv ? .22 : .05);           // quick to wind up, slow to unwind
    if (Math.abs(dy) < .01 && wv < .002 && !workVideosOn) { if (++wIdle > 2) return; } else wIdle = 0;   // playing videos need every frame
    const wp = clamp((y - L.work.t) / (L.work.h - vh));
    const shift = wp * L.trackShift;
    const centre = L.cards[0] + shift;
    wShift = shift;
    let nearest = 0, nd = 1e9;
    if (strand && strand.ready && !lite) {
      // the WebGL strand draws the cards; the HTML cards only supply layout
      strand.update(shift, wv);
      for (let i = 0; i < cards.length; i++) { const ad = Math.abs(L.cards[i] - centre); if (ad < nd) { nd = ad; nearest = i; } }
    } else {
    cardsEl.style.transform = `translate3d(${(-shift).toFixed(1)}px,0,0)`;
    for (let i = 0; i < cards.length; i++) {
      const d = (L.cards[i] - centre) / (L.cw + 30);       // distance in cards
      const ad = Math.abs(d);
      if (ad < nd) { nd = ad; nearest = i; }
      const S = clamp(d / 1.6, -1.7, 1.7), aS = Math.abs(S), sg = Math.sign(S);
      const g = Math.exp(-S * S * 1.6);                   // the bulge in the middle
      const side = sstep(.25, .95, aS) * sg;              // 0 in the middle, ±1 at the sides
      const left = 1 - sstep(-1, .3, S);                  // 1 on the left side only
      const z = 110 * g - 170 * aS + 90 * wv * left;
      const ty = -0.05 * S * L.cw - 70 * wv * left;       // a slight rise to the right; the left lifts at speed
      const rotY = -S * 34;
      const rotX = 18 * Math.sin(Math.PI * S * .8) * (1 - .4 * g) + 30 * wv * side; // the twist
      const rotZ = -4 * Math.sin(Math.PI * S * .5) + 9 * wv * side;
      const sc = .84 + .1 * g;
      cards[i].style.transform = `translate3d(0,${ty.toFixed(1)}px,${z.toFixed(1)}px) rotateY(${rotY.toFixed(2)}deg) rotateX(${rotX.toFixed(2)}deg) rotateZ(${rotZ.toFixed(2)}deg) scale(${sc.toFixed(3)})`;
    }
    }
    wBar.style.transform = `scaleX(${wp.toFixed(4)})`;
    if (nearest !== current) {
      current = nearest;
      wTitle.textContent = cards[nearest].dataset.title;
      wType.textContent = cards[nearest].dataset.type;
      wCount.textContent = `${nearest + 1} of ${cards.length}`;
      if (cards[nearest].dataset.href) { wLink.href = cards[nearest].dataset.href; wLink.textContent = cards[nearest].dataset.cta || 'Read the case study →'; }
    }
    if (wPtr) workHover();                                 // cards slid under a still pointer
  }

  /* ---------- WORK: hover shows a short brief, click opens the case study ----------
     The front card (nearest the centre) is the one you can point at. Its flat footprint is used
     for hit-testing, so it works the same whether WebGL or the plain cards are drawing. */
  let wShift = 0, wPtr = null, tipFor = -1;
  const tip = $('#workTip'), wLink = $('#workLink'), carouselEl = $('#carousel'), workSticky = $('.work-sticky');
  function frontCardAt(x, y) {
    const i = current, c = cards[i];
    if (!c || !c.dataset.href) return -1;
    const r = carouselEl.getBoundingClientRect();
    const w = L.cw * .94, h = c.offsetHeight * .94;
    const cx = r.left + r.width / 2 + (L.cards[i] - (L.cards[0] + wShift)), cy = r.top + r.height / 2;
    return Math.abs(x - cx) <= w / 2 && Math.abs(y - cy) <= h / 2 ? i : -1;
  }
  function fillTip(c) {
    const d = c.dataset, st = tip.querySelectorAll('.work-tip-stats span');
    tip.querySelector('small').textContent = d.kicker + ' · ' + d.client;
    tip.querySelector('b').textContent = d.title;
    tip.querySelector('p').textContent = d.dek;
    st[0].querySelector('em').textContent = d.s1; st[0].querySelector('i').textContent = d.l1;
    st[1].querySelector('em').textContent = d.s2; st[1].querySelector('i').textContent = d.l2;
    tip.querySelector('u').textContent = d.cta ? 'Click to see the service →' : 'Click to read the case study →';
  }
  function workHover() {
    const i = frontCardAt(wPtr.x, wPtr.y);
    if (i < 0) { if (tipFor >= 0) { tip.classList.remove('on'); workSticky.classList.remove('pointing'); tipFor = -1; } return; }
    if (i !== tipFor) { fillTip(cards[i]); tipFor = i; tip.classList.add('on'); workSticky.classList.add('pointing'); }
    const r = workSticky.getBoundingClientRect(), tw = tip.offsetWidth, th = tip.offsetHeight;
    let x = wPtr.x - r.left + 20, y = wPtr.y - r.top + 20;
    if (x + tw > r.width - 12) x = wPtr.x - r.left - tw - 20;      // flip to the left near the right edge
    if (y + th > r.height - 12) y = r.height - th - 12;
    tip.style.transform = `translate3d(${Math.max(12, x).toFixed(0)}px,${Math.max(12, y).toFixed(0)}px,0)`;
  }
  workSticky.addEventListener('pointermove', e => {
    if (e.pointerType !== 'mouse') return;
    wPtr = { x: e.clientX, y: e.clientY }; workHover();
  }, { passive: true });
  workSticky.addEventListener('pointerleave', () => { wPtr = null; tip.classList.remove('on'); workSticky.classList.remove('pointing'); tipFor = -1; });
  workSticky.addEventListener('click', e => {
    if (e.target.closest('a, button')) return;
    const i = frontCardAt(e.clientX, e.clientY);
    if (i >= 0) location.href = cards[i].dataset.href;
  });

  /* ---------- the ribbon: drawn every frame while the hero is on screen ---------- */
  let rbLastStill = false;
  function animateRibbon(now) {
    if (!rb) return;
    const y = lenis ? lenis.scroll : scrollY;
    if (y > L.hero.t + L.hero.h) return;               // hero scrolled away: stop drawing
    if (reduce) { if (!rbLastStill) { rb.frame(now, 0); rbLastStill = true; } return; }
    rb.frame(now, heroP);
  }
  // the ribbon reacts to the pointer like a real piece of fabric
  let pm = null;
  sticky.addEventListener('pointermove', e => {
    if (!rb) return;
    const r = sticky.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top, t = performance.now();
    if (pm) { const dt = Math.max(8, t - pm.t); rb.nudge(x, y, (x - pm.x) / dt * 16, (y - pm.y) / dt * 16); }
    pm = { x, y, t };
  }, { passive: true });

  /* ---------- opening: wordmark rises, curtain lifts, ribbon springs into shape ---------- */
  const loader = $('#loader');
  function open() {
    document.documentElement.classList.add('ready');
    if (loader) { loader.classList.add('out'); setTimeout(() => loader.classList.add('gone'), 1100); }
    lenis && lenis.start();
    rb && rb.startIntro(performance.now() + 250);
  }

  // Frame-rate watchdog: if frames keep taking longer than ~33 ms (under 30 fps), switch to lite mode.
  // Frames while the page is hidden, during the opening, or while the strand captures its cards don't count.
  let wdLast = 0, wdSum = 0, wdN = 0, wdBad = 0;
  const wdStart = performance.now() + 3500;
  function watchdog(t) {
    const dt = t - wdLast; wdLast = t;
    if (lite || t < wdStart || document.hidden || dt > 250 || (strand && strand.busy)) return;
    wdSum += dt; wdN++;
    if (wdN < 60) return;
    const avg = wdSum / wdN; wdSum = 0; wdN = 0;
    wdBad = avg > 33 ? wdBad + 1 : 0;
    if (wdBad >= 2) goLite();
  }
  function goLite() {
    lite = true;
    document.documentElement.classList.add('lite');
    if (lenis) { const y = lenis.scroll; lenis.destroy(); lenis = null; window.scrollTo(0, y); }
    if (strand) strand.destroy();
    workVideos.forEach(v => v.pause()); workVideosOn = false;
    if (rb) rb.lite = true;
    letters.forEach(el => (el.style.filter = ''));
    offerWrap.style.filter = '';
    stage.classList.remove('lit');
    measure(); wIdle = 0; wLastY = null;
  }

  function loop(t) {
    watchdog(t);
    lenis && lenis.raf(t);
    frame();
    carousel(lenis ? lenis.scroll : scrollY);
    animateRibbon(t);
    animateLight();
    requestAnimationFrame(loop);
  }

  /* ---------- automation level picker ---------- */
  const lvls = $$('.lvl');
  lvls.forEach(b => b.addEventListener('click', () => {
    lvls.forEach(x => { x.classList.toggle('active', x === b); x.setAttribute('aria-checked', String(x === b)); });
  }));

  /* ---------- FAQ: one open at a time ---------- */
  const dets = $$('.faq details');
  dets.forEach(d => d.addEventListener('toggle', () => { if (d.open) dets.forEach(o => o !== d && (o.open = false)); }));

  /* ---------- clocks ---------- */
  function setClock(el, date, tz) {
    const parts = new Intl.DateTimeFormat('en-GB', { hour: 'numeric', minute: 'numeric', hour12: false, timeZone: tz }).formatToParts(date);
    const h = +parts.find(p => p.type === 'hour').value, m = +parts.find(p => p.type === 'minute').value;
    const svg = el.querySelector('svg');
    svg.querySelector('.hh').style.transform = `rotate(${(h % 12) * 30 + m * .5}deg)`;
    svg.querySelector('.mm').style.transform = `rotate(${m * 6}deg)`;
    svg.querySelectorAll('line').forEach(l => (l.style.transformOrigin = '28px 28px'));
    return new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', timeZone: tz }).format(date);
  }
  const clocks = $$('.clock');
  function tick() {
    const now = new Date();
    $('#tYou').textContent = setClock(clocks[0], now, undefined);
    $('#tUs').textContent = setClock(clocks[1], now, 'Asia/Kolkata');
  }
  tick(); setInterval(tick, 20000);

  /* ---------- offer CTA pre-selects the form ---------- */
  $$('[data-need]').forEach(a => a.addEventListener('click', () => {
    const sel = $('#need');
    if (sel) sel.value = a.dataset.need;
  }));

  /* ---------- forms: handled by lead.js ---------- */

  /* ---------- init ---------- */
  $('#yr').textContent = new Date().getFullYear();
  measure();
  let rt;
  // Phones and tablets fire "resize" whenever the address bar slides in or out while scrolling.
  // That only changes the height a little, and re-measuring then would make the page jump,
  // so only a real change (width, rotation, or a big height change) re-lays the page.
  let lastW = innerWidth, lastH = innerHeight;
  addEventListener('resize', () => {
    clearTimeout(rt);
    rt = setTimeout(() => {
      const wChanged = innerWidth !== lastW;
      if (!wChanged && Math.abs(innerHeight - lastH) < 160) return;
      lastW = innerWidth; lastH = innerHeight;
      measure();
      if (wChanged && strand) strand.resize().then(() => { wIdle = 0; wLastY = null; });
      wIdle = 0; wLastY = null;
    }, 200);
  }, { passive: true });
  addEventListener('load', measure);
  document.fonts && document.fonts.ready.then(measure);
  if (reduce) { runCounters(); letters.forEach(l => (l.style.opacity = 1)); }
  if (reduce || !loader) open();
  else {
    // always start at the top so the opening plays from the beginning
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    lenis && lenis.scrollTo(0, { immediate: true, force: true });
    lenis && lenis.stop();
    rb && rb.drop();                                    // the rope hangs out of sight until the curtain lifts
    setTimeout(open, 1350);
  }
  requestAnimationFrame(loop);
})();
