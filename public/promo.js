/* Promo video in "What we do".
   - Plays muted and looped only while it is on screen; pauses when scrolled away (saves battery and data).
   - Picks the 720p file (4.5 MB) for phones, low-memory devices and slow connections, 1080p (9.5 MB) otherwise.
   - Nothing downloads until the video is near the screen.
   - Data saver, 2G or "reduce motion": no autoplay, just the still frame and a play button.
   - Tap or click: restarts from the beginning with sound and player controls. */
(() => {
  const v = document.getElementById('promoVideo');
  const btn = document.querySelector('.promo-play');
  const frame = v && v.closest('.promo-frame');
  if (!v || !btn || !frame) return;

  const c = navigator.connection || {};
  const slow = c.saveData || /(^|-)2g$/.test(c.effectiveType || '');
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const small = Math.min(screen.width, innerWidth) < 1000 || (navigator.deviceMemory || 8) < 4 || (navigator.hardwareConcurrency || 8) < 4;
  const src = small || slow ? v.dataset.sd : v.dataset.hd;
  const autoplay = !slow && !calm;

  let loaded = false, withSound = false, visible = false;
  function load() { if (loaded) return; loaded = true; v.src = src; }

  function preview() {
    if (!autoplay || withSound || !visible) return;
    load();
    v.muted = true; v.loop = true;
    const p = v.play(); if (p && p.catch) p.catch(() => {});
  }

  frame.classList.toggle('is-still', !autoplay);

  function watch() {
    load();
    withSound = true;
    frame.classList.add('is-playing');
    v.loop = false; v.muted = false; v.controls = true;
    try { v.currentTime = 0; } catch (e) {}
    const p = v.play(); if (p && p.catch) p.catch(() => { v.muted = true; v.play().catch(() => {}); });
    (window.dataLayer = window.dataLayer || []).push({ event: 'promo_video_play' });
  }
  btn.addEventListener('click', watch);
  v.addEventListener('click', () => { if (!withSound) watch(); });
  v.addEventListener('ended', () => { withSound = false; v.controls = false; frame.classList.remove('is-playing'); preview(); });

  const io = new IntersectionObserver(es => es.forEach(e => {
    visible = e.isIntersecting;
    if (visible) preview(); else if (!v.paused) v.pause();
  }), { threshold: 0.25 });
  // a separate, tighter observer decides play/pause; the wide one only warms the download
  const warm = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting && autoplay) { load(); warm.disconnect(); } }), { rootMargin: '600px 0px' });
  io.observe(frame); warm.observe(frame);
  document.addEventListener('visibilitychange', () => { if (document.hidden && !v.paused) v.pause(); else if (!document.hidden) preview(); });
})();
