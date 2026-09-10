/* =====================================================================
   sections/virtual-tour.js — "Try our 360° virtual tour".
   -----------------------------------------------------------------
   Drag-to-pan strip through real concept photography (content/virtual-
   tour.js `panoramaImages`, same provenance as the gallery), one photo
   per segment — replacing the earlier CSS-shape illustration per
   feedback. If `panoramaImages` is ever emptied, this falls back to the
   drawn illustration (sections/illustrations.js) so the section still
   renders something rather than an empty strip.

   This is structural/experiential content, not a factual claim, so it
   isn't gated by canRender() the way price/timeline/warranty/
   serviceability/review blocks are — but its copy still lives in
   content.js like everything else on the page.
   ===================================================================== */
const TOUR_SEGMENT_WIDTH = 280; // must match .room-segment width in styles.css

function renderVirtualTour() {
  const vt = APPROVED_CONTENT.virtualTour;
  if (!vt) return '';
  const images = vt.panoramaImages && vt.panoramaImages.length ? vt.panoramaImages : [null, null, null, null];
  const segments = images.map(src =>
    `<div class="room-segment">${src
      ? `<img class="visual-photo" src="${escapeHtml(src)}" alt="" loading="lazy" draggable="false">`
      : roomShapes('living-room')}</div>`
  ).join('');
  return `
  <section class="virtual-tour" id="tour" aria-label="360 degree virtual tour">
    <h2>${escapeHtml(vt.heading)}</h2>
    <div class="tour-viewport" id="tour-viewport">
      <div class="tour-strip" id="tour-strip">${segments}</div>
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
   entirely. The segment count is read from the DOM each drag rather
   than a fixed constant, since it now follows however many photos
   content/virtual-tour.js lists. */
(function initVirtualTourDrag() {
  let dragging = false;
  let startX = 0;
  let startOffset = 0;
  let offset = 0;

  function loopWidth() {
    const strip = document.getElementById('tour-strip');
    const count = strip ? strip.children.length : 4;
    return TOUR_SEGMENT_WIDTH * count;
  }

  function wrap(x) {
    const width = loopWidth();
    let m = x % width;
    if (m > 0) m -= width;
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
