/* =====================================================================
   sections/virtual-tour.js — "Try our 360° virtual tour".
   -----------------------------------------------------------------
   Drag-to-pan panorama built entirely from CSS shapes (window/sofa/
   plant) repeated across four identical segments — no photo, no image
   file, no external asset. That's a deliberate choice, not a shortcut:
   this page never renders a real photograph of an Anvaya interior it
   doesn't have, the same "never invent" rule the approved-content
   guardrail applies to numbers. The caption says so explicitly, the
   same way the price block labels itself "illustrative".

   This is structural/experiential content, not a factual claim, so it
   isn't gated by canRender() the way price/timeline/warranty/
   serviceability/review blocks are — but its copy still lives in
   content.js like everything else on the page.
   ===================================================================== */
const TOUR_SEGMENT_WIDTH = 280; // must match .room-segment width in styles.css
const TOUR_SEGMENT_COUNT = 4;

function renderVirtualTour() {
  const vt = APPROVED_CONTENT.virtualTour;
  if (!vt) return '';
  // Reuses the same room-shape markup as sections/illustrations.js
  // (the .illus-* classes) rather than a second, parallel set of shapes.
  const segment = `<div class="room-segment">${roomShapes('living-room')}</div>`;
  return `
  <section class="virtual-tour" id="tour" aria-label="360 degree virtual tour">
    <h2>${escapeHtml(vt.heading)}</h2>
    <div class="tour-viewport" id="tour-viewport">
      <div class="tour-strip" id="tour-strip">${segment.repeat(TOUR_SEGMENT_COUNT)}</div>
      <span class="tour-hint">${escapeHtml(vt.dragHint)}</span>
    </div>
    <p class="tour-caption">${escapeHtml(vt.caption)}</p>
    <a class="btn btn-primary" href="${vt.cta.href}">${escapeHtml(vt.cta.label)} →</a>
  </section>`;
}

/* ---- drag-to-pan, with seamless wraparound ----
   Delegated on `document` (not on #tour-strip directly) so it keeps
   working after composePage() rebuilds #app's innerHTML on every
   query-param change — there's no element to re-bind a listener to
   until the section is actually rendered, and delegation sidesteps that
   entirely. Because every segment is identical, wrapping the offset
   modulo one segment's width is seamless in either direction. */
(function initVirtualTourDrag() {
  const LOOP_WIDTH = TOUR_SEGMENT_WIDTH * TOUR_SEGMENT_COUNT;
  let dragging = false;
  let startX = 0;
  let startOffset = 0;
  let offset = 0;

  function wrap(x) {
    let m = x % LOOP_WIDTH;
    if (m > 0) m -= LOOP_WIDTH;
    return m;
  }

  function setOffset(x) {
    offset = wrap(x);
    const strip = document.getElementById('tour-strip');
    if (strip) strip.style.transform = `translateX(${offset}px)`;
  }

  document.addEventListener('pointerdown', (e) => {
    const vp = e.target.closest && e.target.closest('.tour-viewport');
    if (!vp) return;
    dragging = true;
    startX = e.clientX;
    startOffset = offset;
    if (vp.setPointerCapture) {
      try { vp.setPointerCapture(e.pointerId); } catch (_) { /* ignore */ }
    }
  });
  document.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    setOffset(startOffset + (e.clientX - startX));
  });
  ['pointerup', 'pointercancel', 'pointerleave'].forEach(evt =>
    document.addEventListener(evt, () => { dragging = false; })
  );
})();
