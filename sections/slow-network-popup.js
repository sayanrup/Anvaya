/* =====================================================================
   sections/slow-network-popup.js — ?speed=slow already tells this page
   the visitor is on a slow connection; after a short wait, offer a
   lighter path instead of asking them to keep waiting on the page.
   Uses sections/popups.js's shared modal + single-popup-per-tab gate so
   this and sections/inactivity-popup.js never both fire (they're also
   mutually exclusive by rule: the inactivity popup skips speed=slow).
   ===================================================================== */
(function () {
  const DELAY_MS = 4000;

  // Preserve whatever's already on the URL (city, intent, speed, ...)
  // rather than replacing the whole query string — same pattern
  // sections/customize.js uses for its "ask AI" link.
  function buildHref(baseHref) {
    if (!baseHref.startsWith('?')) return baseHref; // e.g. "#estimate" passes through untouched
    const sp = new URLSearchParams(window.location.search);
    const added = new URLSearchParams(baseHref.slice(1));
    added.forEach((v, k) => sp.set(k, v));
    return `?${sp.toString()}`;
  }

  document.addEventListener('anvaya:composed', (e) => {
    const params = (e.detail && e.detail.params) || getParams();
    if (params.speed !== 'slow') return;
    const copy = APPROVED_CONTENT.slowPopup;
    const askAi = APPROVED_CONTENT.ctas.askAi;
    const callback = APPROVED_CONTENT.ctas.callback;
    if (!copy || !askAi || !callback) return;

    setTimeout(() => {
      if (window.anyPopupShown && window.anyPopupShown()) return;
      window.showModalPopup({
        title: copy.title,
        body: copy.body,
        actions: [
          { label: askAi.label, href: buildHref(askAi.href) },
          { label: callback.label, href: buildHref(callback.href) }
        ]
      });
    }, DELAY_MS);
  });
})();
