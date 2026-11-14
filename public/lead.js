/* Groviadigi lead capture: one handler for every form marked data-lead
   (the landing page, the home contact form and the "ask your own question" box).

   WHERE LEADS GO
   Set LEAD_ENDPOINT to the URL that should receive leads (a CRM web-to-lead URL, a webhook,
   an Apps Script for a Google Sheet, etc.). Each lead is POSTed there as JSON.
   While it is empty, the form opens a pre-filled email to hello@groviadigi.in instead. */
(() => {
  const LEAD_ENDPOINT = '';
  const EMAIL = 'hello@groviadigi.in';

  // remember where the visitor came from (ad, search, social) for the CRM
  const KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid'];
  const q = new URLSearchParams(location.search), src = {};
  KEYS.forEach(k => { const v = q.get(k); if (v) src[k] = v.slice(0, 200); });
  try {
    if (Object.keys(src).length) sessionStorage.setItem('gd_src', JSON.stringify(src));
    else Object.assign(src, JSON.parse(sessionStorage.getItem('gd_src') || '{}'));
    if (!sessionStorage.getItem('gd_ref')) sessionStorage.setItem('gd_ref', document.referrer || 'direct');
    src.referrer = sessionStorage.getItem('gd_ref');
  } catch (e) { src.referrer = document.referrer || 'direct'; }

  const LABELS = { name: 'Name', email: 'Email', phone: 'Phone / WhatsApp', company: 'Company', need: 'Looking for', budget: 'Budget', msg: 'Message', question: 'Question' };
  const isEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
  const isPhone = v => v.replace(/\D/g, '').length >= 8;

  function say(note, text, kind) { if (note) { note.textContent = text; note.className = 'form-note ' + kind; } }

  function emailDraft(form, data) {
    const subject = (form.dataset.subject || 'Website enquiry') + (data.name ? ': ' + data.name : '');
    const lines = Object.keys(LABELS).filter(k => data[k]).map(k => `${LABELS[k]}: ${data[k]}`);
    lines.push('', `Page: ${location.pathname}`);
    if (src.utm_source) lines.push(`Source: ${src.utm_source}${src.utm_campaign ? ' / ' + src.utm_campaign : ''}`);
    location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
  }

  document.querySelectorAll('form[data-lead]').forEach(form => {
    const note = form.querySelector('.form-note');
    const btn = form.querySelector('[type="submit"]');
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const data = {};
      new FormData(form).forEach((v, k) => { data[k] = String(v).trim(); });
      if (data.website) { form.reset(); say(note, form.dataset.ok || 'Thanks, we got it.', 'ok'); return; }   // bot trap
      delete data.website;

      // check the required fields in order and point at the first problem
      for (const el of form.querySelectorAll('[required]')) {
        const v = data[el.name] || '';
        const bad = !v || (el.type === 'email' && !isEmail(v)) || (el.type === 'tel' && !isPhone(v));
        el.setAttribute('aria-invalid', String(bad));
        if (bad) { el.focus(); say(note, el.dataset.err || 'Please fill in this field.', 'err'); return; }
      }

      const lead = Object.assign({}, data, src, { form: form.dataset.lead, page: location.href.split('#')[0], submitted_at: new Date().toISOString() });
      if (!LEAD_ENDPOINT) {
        emailDraft(form, data);
        say(note, 'Thanks. Your email app should open with the details filled in. If it doesn’t, write to ' + EMAIL + '.', 'ok');
        return;
      }
      btn && (btn.disabled = true);
      say(note, 'Sending…', '');
      try {
        const r = await fetch(LEAD_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(lead) });
        if (!r.ok) throw new Error(r.status);
        form.reset();
        say(note, form.dataset.ok || 'Thanks. We’ll reply within one working day.', 'ok');
      } catch (err) {
        emailDraft(form, data);                                   // never lose a lead: fall back to email
        say(note, 'We couldn’t send it just now, so your email app is opening with the details instead.', 'err');
      } finally { btn && (btn.disabled = false); }
    });
  });
})();
