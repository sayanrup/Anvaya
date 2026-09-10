/* =====================================================================
   sections/final-cta.js — closing CTA band before the footer.
   ===================================================================== */
function renderFinalCta() {
  return `
  <section class="final-cta">
    <h2>Ready to plan your home?</h2>
    <a class="btn btn-primary" href="${APPROVED_CONTENT.ctas.primary.href}">${escapeHtml(APPROVED_CONTENT.ctas.primary.label)} →</a>
  </section>`;
}
