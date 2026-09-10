/* =====================================================================
   sections/customize.js — "Customize as per your need": a mid-page
   bridge into the intent-capture flow. The CTA re-navigates with
   intent=unknown (preserving whatever other params are already on the
   URL), which is exactly the signal core/compose.js's determineRule()
   treats as genuinely ambiguous — so it shows the same "What brought you
   here today?" capture screen an assistant-referred visitor gets. This
   is today's small, working preview of "build variations as per
   intent": the mechanism already exists, this section just surfaces it.
   ===================================================================== */
function renderCustomize() {
  const c = APPROVED_CONTENT.customize;
  if (!c) return '';
  const sp = new URLSearchParams(window.location.search);
  sp.set('intent', 'unknown');
  return `
  <section class="customize">
    <p class="kicker">${escapeHtml(c.kicker)}</p>
    <h2>${escapeHtml(c.heading)}</h2>
    <p class="section-intro">${escapeHtml(c.body)}</p>
    <a class="btn btn-primary" href="?${sp.toString()}">${escapeHtml(c.ctaLabel)} →</a>
  </section>`;
}
