/* =====================================================================
   sections/commitments.js — "What Anvaya commits to" secondary strip.
   Shown on every state except vs_competitor, where the same commitments
   already lead the page (see sections/lead.js renderCompareLead) and
   don't need repeating.
   ===================================================================== */
function renderCommitmentsStrip() {
  const commitments = APPROVED_CONTENT.commitments.filter(canRender);
  if (!commitments.length) return '';
  return `
  <section class="commit-strip">
    <h2>What Anvaya commits to</h2>
    <ul>${commitments.map(c => `<li data-claim-type="${c.claimType}"><strong>${escapeHtml(c.title)}:</strong> ${escapeHtml(c.text)}</li>`).join('')}</ul>
  </section>`;
}
