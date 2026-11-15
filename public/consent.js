/* Groviadigi cookie consent.
   - Shows the banner once per browser. The choice is kept for 12 months (localStorage + first-party cookie),
     so the same visitor on the same device does not see it again.
   - Google Consent Mode v2: the default ("denied") is set inline in <head> before Google Tag Manager
     (Website_build/gtm.js). This file sends the update when the visitor chooses.
   - Microsoft Clarity loads only with analytics consent; the Meta Pixel only with marketing consent.
     Put the IDs below. While an ID is empty, that tool is not loaded.
   - Consent record: each choice gets a random ID, a version and a time. It is stored in the browser and,
     when LOG_CONSENT is true, sent to the Google Sheet ("Cookie Consent" tab, see google-sheet-code.gs).
     No name, email or IP address is sent.
   - "Cookie settings" link: added to every footer, reopens the banner. */
(() => {
  const CLARITY_ID = '';        // Microsoft Clarity project ID, e.g. 'abcd1234ef'
  const META_PIXEL_ID = '';     // Meta (Facebook) Pixel / dataset ID, e.g. '123456789012345'
  const LOG_CONSENT = false;    // true once the updated google-sheet-code.gs is deployed
  const LOG_ENDPOINT = 'https://script.google.com/macros/s/AKfycbzCIUT5LqECMmocvN1eSujFjjReNGRZJXP2tQfhYyxFXeCjtJZz2rqSmayCyKKRlAbi/exec';
  const SHEET_SECRET = 'grovia-forms-2026';
  const VERSION = '2026-11';    // change when the cookie list changes: everyone is asked again
  const KEY = 'gd_consent', DAYS = 365;

  const w = window, d = document;
  w.dataLayer = w.dataLayer || [];
  const gtag = w.gtag || function () { w.dataLayer.push(arguments); };

  function read() {
    let v = null;
    try { v = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) {}
    if (!v) { const m = d.cookie.match(/(?:^|; )gd_consent=([^;]+)/); if (m) try { v = JSON.parse(decodeURIComponent(m[1])); } catch (e) {} }
    if (!v || v.v !== VERSION || Date.now() - new Date(v.t).getTime() > DAYS * 864e5) return null;
    return v;
  }
  function save(c) {
    const s = JSON.stringify(c);
    try { localStorage.setItem(KEY, s); } catch (e) {}
    d.cookie = `${KEY}=${encodeURIComponent(s)}; max-age=${DAYS * 86400}; path=/; SameSite=Lax${location.protocol === 'https:' ? '; Secure' : ''}`;
  }
  const id = () => (w.crypto && crypto.randomUUID) ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).slice(2, 10);

  let clarityOn = false, pixelOn = false;
  function apply(c) {
    const a = c.analytics ? 'granted' : 'denied', m = c.marketing ? 'granted' : 'denied';
    gtag('consent', 'update', { analytics_storage: a, ad_storage: m, ad_user_data: m, ad_personalization: m });
    w.dataLayer.push({ event: 'consent_update', consent_analytics: a, consent_marketing: m });

    if (c.analytics && CLARITY_ID && !clarityOn) {
      clarityOn = true;
      (function (c, l, a, r, i, t, y) { c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); }; t = l.createElement(r); t.async = 1; t.src = 'https://www.clarity.ms/tag/' + i; y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y); })(w, d, 'clarity', 'script', CLARITY_ID);
    }
    if (w.clarity) w.clarity('consentv2', { ad_Storage: m, analytics_Storage: a });

    if (c.marketing && META_PIXEL_ID && !pixelOn) {
      pixelOn = true;
      !function (f, b, e, v, n, t, s) { if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); }; if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = []; t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s); }(w, d, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
      w.fbq('init', META_PIXEL_ID);
      w.fbq('track', 'PageView');
    }
    if (w.fbq) w.fbq('consent', c.marketing ? 'grant' : 'revoke');
  }

  function record(c) {
    if (!LOG_CONSENT || !LOG_ENDPOINT) return;
    const b = new URLSearchParams({ form_name: 'Cookie Consent', consent_id: c.id, choice: c.choice, analytics: c.analytics ? 'yes' : 'no', marketing: c.marketing ? 'yes' : 'no', consent_version: c.v, page_url: location.href.split('#')[0].split('?')[0], secret: SHEET_SECRET });
    try { fetch(LOG_ENDPOINT, { method: 'POST', mode: 'no-cors', body: b, keepalive: true }); } catch (e) {}
  }

  function choose(analytics, marketing, choice) {
    const old = read();
    const c = { v: VERSION, id: (old && old.id) || id(), t: new Date().toISOString(), analytics, marketing, choice };
    save(c); apply(c); record(c); close();
  }

  // ---------- banner ----------
  let box;
  const CSS = `#gd-cc{position:fixed;z-index:9999;left:16px;right:16px;bottom:max(16px,env(safe-area-inset-bottom));max-width:440px;margin-left:auto;background:#0D0B26;color:#E6E3FF;border:1px solid rgba(255,255,255,.12);border-radius:18px;padding:20px;box-shadow:0 24px 60px -20px rgba(13,11,38,.7);font:500 14px/1.55 Manrope,system-ui,sans-serif;opacity:0;transform:translateY(12px);transition:opacity .3s,transform .3s}
#gd-cc.on{opacity:1;transform:none}
#gd-cc h2{margin:0 0 6px;font-size:16px;font-weight:800;color:#fff;letter-spacing:-.01em}
#gd-cc p{margin:0 0 14px;color:#B9B6DA}
#gd-cc a{color:#fff;text-decoration:underline;text-underline-offset:2px}
#gd-cc .gd-row{display:flex;flex-wrap:wrap;gap:8px}
#gd-cc button{flex:1 1 auto;min-height:42px;padding:9px 14px;border-radius:99px;font:700 14px Manrope,system-ui,sans-serif;cursor:pointer;border:1px solid rgba(255,255,255,.22);background:transparent;color:#fff}
#gd-cc button.gd-yes{background:linear-gradient(135deg,#3478FF,#8A49EA);border-color:transparent}
#gd-cc button:focus-visible{outline:2px solid #FFAF57;outline-offset:2px}
#gd-cc .gd-opts{display:none;margin:0 0 14px;padding:12px;border-radius:12px;background:rgba(255,255,255,.05)}
#gd-cc.more .gd-opts{display:block}
#gd-cc label{display:flex;gap:10px;align-items:flex-start;padding:6px 0;cursor:pointer}
#gd-cc label input{margin-top:4px;accent-color:#8A49EA;width:16px;height:16px;flex:none}
#gd-cc label b{color:#fff;font-weight:700}
#gd-cc label small{display:block;color:#9B98BF;font-size:12.5px}
#gd-cc .gd-save{display:none}
#gd-cc.more .gd-save{display:inline-block}
@media (prefers-reduced-motion:reduce){#gd-cc{transition:none}}`;

  function open() {
    if (box) return;
    const cur = read();
    if (!d.getElementById('gd-cc-css')) { const s = d.createElement('style'); s.id = 'gd-cc-css'; s.textContent = CSS; d.head.appendChild(s); }
    box = d.createElement('section');
    box.id = 'gd-cc';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-labelledby', 'gd-cc-t');
    box.innerHTML = `<h2 id="gd-cc-t">Cookies on this site</h2>
<p>We use cookies to see which pages help visitors and to measure our ads. Necessary cookies keep the site and forms working. You can change your choice at any time from “Cookie settings” at the bottom of each page. <a href="/privacy/">Privacy and cookies</a></p>
<div class="gd-opts">
  <label><input type="checkbox" checked disabled><span><b>Necessary</b><small>Keep the site, forms and this choice working. Always on.</small></span></label>
  <label><input type="checkbox" id="gd-a"${cur && cur.analytics ? ' checked' : ''}><span><b>Analytics</b><small>Google Analytics and Microsoft Clarity: which pages are read and where people get stuck.</small></span></label>
  <label><input type="checkbox" id="gd-m"${cur && cur.marketing ? ' checked' : ''}><span><b>Marketing</b><small>Google Ads and Meta Pixel: measure our ads and show them to people who visited.</small></span></label>
</div>
<div class="gd-row">
  <button type="button" class="gd-yes" data-a="all">Accept all</button>
  <button type="button" data-a="none">Only necessary</button>
  <button type="button" data-a="more" class="gd-more">Choose</button>
  <button type="button" data-a="save" class="gd-save">Save my choice</button>
</div>`;
    d.body.appendChild(box);
    box.addEventListener('click', e => {
      const a = e.target.closest('button') && e.target.closest('button').dataset.a;
      if (a === 'all') choose(true, true, 'accept_all');
      else if (a === 'none') choose(false, false, 'necessary_only');
      else if (a === 'more') { box.classList.add('more'); e.target.style.display = 'none'; box.querySelector('#gd-a').focus(); }
      else if (a === 'save') { const an = box.querySelector('#gd-a').checked, mk = box.querySelector('#gd-m').checked; choose(an, mk, 'custom'); }
    });
    requestAnimationFrame(() => box.classList.add('on'));
  }
  function close() { if (!box) return; const b = box; box = null; b.classList.remove('on'); setTimeout(() => b.remove(), 300); }

  function footerLink() {
    d.querySelectorAll('footer nav').forEach(n => {
      if (n.querySelector('.gd-cc-link')) return;
      const a = d.createElement('a'); a.href = '#cookie-settings'; a.className = 'gd-cc-link'; a.textContent = 'Cookie settings';
      a.addEventListener('click', e => { e.preventDefault(); open(); });
      n.appendChild(a);
    });
  }

  w.gdConsent = { open, read };
  function start() {
    footerLink();
    const c = read();
    if (c) apply(c);
    else setTimeout(open, 1500);   // after the loader, so the banner never covers the brand intro
  }
  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', start); else start();
  if (location.hash === '#cookie-settings') addEventListener('load', open);
})();
