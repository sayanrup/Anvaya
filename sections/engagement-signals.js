/* =====================================================================
   sections/engagement-signals.js — "whatever they do in the first
   fifteen seconds" as a personalisation signal, not just what they
   clicked. If a visitor on the default/organic hero scrolls to and
   pauses on the pricing-tiers block within the first 15 seconds, that's
   the same signal a tap on "How much will my home cost?" would be —
   so it gets the same treatment: a more direct cost CTA. It never
   changes any fact, only which already-approved CTA is offered.
   -----------------------------------------------------------------
   Listens for the 'anvaya:composed' event core/compose.js dispatches
   after each render, since #pricing-tiers doesn't exist until then.
   Skipped under speed=slow and prefers-reduced-motion (consistent with
   how the rest of the page treats both), and shown at most once per
   browser tab per visit.
   ===================================================================== */
(function () {
  const WINDOW_MS = 15000;
  const DWELL_THRESHOLD_MS = 2000;
  const POLL_MS = 250;
  const STORAGE_KEY = 'anvaya_cta_elevated';

  function alreadyShownThisSession() {
    try { return sessionStorage.getItem(STORAGE_KEY) === '1'; } catch (_) { return false; }
  }
  function markShown() {
    try { sessionStorage.setItem(STORAGE_KEY, '1'); } catch (_) { /* ignore */ }
  }

  function shouldRun(rule) {
    if (rule !== 'hero' && rule !== 'cost') return false; // only the default/organic first screen — other intents already got a tailored lead
    if (document.documentElement.getAttribute('data-speed') === 'slow') return false;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    if (alreadyShownThisSession()) return false;
    return true;
  }

  function elevateCostCta() {
    const cta = APPROVED_CONTENT.ctas.elevated;
    if (!cta) return;
    markShown();
    const bar = document.createElement('div');
    bar.className = 'engagement-nudge';
    bar.innerHTML =
      `<a class="btn btn-primary" href="${escapeHtml(cta.href)}">${escapeHtml(cta.label)} →</a>` +
      `<button type="button" class="engagement-dismiss" aria-label="Dismiss">×</button>`;
    document.body.appendChild(bar);
    bar.querySelector('.engagement-dismiss').addEventListener('click', () => bar.remove());
  }

  function watchPricingDwell() {
    const target = document.getElementById('pricing-tiers');
    if (!target || !('IntersectionObserver' in window)) return;

    let dwellMs = 0;
    let visible = false;
    const startedAt = Date.now();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => { visible = entry.isIntersecting && entry.intersectionRatio >= 0.5; });
    }, { threshold: [0, 0.5, 1] });
    observer.observe(target);

    const timer = setInterval(() => {
      const elapsed = Date.now() - startedAt;
      if (visible) dwellMs += POLL_MS;
      if (dwellMs >= DWELL_THRESHOLD_MS) {
        clearInterval(timer);
        observer.disconnect();
        elevateCostCta();
        return;
      }
      if (elapsed > WINDOW_MS) {
        clearInterval(timer);
        observer.disconnect();
      }
    }, POLL_MS);
  }

  document.addEventListener('anvaya:composed', (e) => {
    const rule = e.detail && e.detail.rule;
    if (shouldRun(rule)) watchPricingDwell();
  });
})();
