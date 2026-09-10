/* =====================================================================
   sections/commitments.js — "Why Anvaya" secondary strip. Shown on
   every lead state except vs_competitor, where the same commitments
   already lead the page (see sections/lead.js renderCompareLead) and
   don't need repeating.
   ===================================================================== */
function renderCommitmentsStrip() {
  const commitments = APPROVED_CONTENT.commitments.filter(canRender);
  if (!commitments.length) return '';
  return `
  <section class="commit-strip" id="why-anvaya">
    <h2>Why Anvaya</h2>
    <ul>${commitments.map(c => `<li data-claim-type="${c.claimType}"><strong>${escapeHtml(c.title)}:</strong> ${escapeHtml(c.text)}</li>`).join('')}</ul>
  </section>`;
}
