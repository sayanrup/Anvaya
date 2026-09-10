/* =====================================================================
   sections/inactivity-popup.js — "see what we can do for you" after 15s
   of no interaction, independent of any URL param. Skipped for
   ?speed=slow (that visitor already gets sections/slow-network-popup.js's
   4s popup instead) and shares sections/popups.js's single-popup-per-tab
   gate so the two never both fire.
   ===================================================================== */
(function () {
  const IDLE_MS = 15000;
  const ACTIVITY_EVENTS = ['mousemove', 'keydown', 'touchstart', 'scroll', 'click'];
  let timer = null;

  function teardown() {
    if (timer) clearTimeout(timer);
    ACTIVITY_EVENTS.forEach(evt => document.removeEventListener(evt, reset));
  }

  function fire() {
    teardown();
    if (window.anyPopupShown && window.anyPopupShown()) return;
    const copy = APPROVED_CONTENT.inactivityPopup;
    const cta = APPROVED_CONTENT.ctas.seeDesigns;
    if (!copy || !cta) return;
    window.showModalPopup({
      title: copy.title,
      body: copy.body,
      actions: [{ label: cta.label, href: cta.href }]
    });
  }

  function reset() {
    if (timer) clearTimeout(timer);
    timer = setTimeout(fire, IDLE_MS);
  }

  document.addEventListener('anvaya:composed', (e) => {
    const params = (e.detail && e.detail.params) || getParams();
    if (params.speed === 'slow') return; // that visitor already gets the 4s slow-network popup
    if (window.anyPopupShown && window.anyPopupShown()) return;

    ACTIVITY_EVENTS.forEach(evt => document.addEventListener(evt, reset, { passive: true }));
    reset();
  });
})();
