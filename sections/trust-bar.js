/* =====================================================================
   sections/trust-bar.js — compact trust strip directly under the hero.
   -----------------------------------------------------------------
   Short labels only (cities count + each commitment's `short` field),
   so a visitor gets "why should I trust Anvaya?" in one glance. The
   fuller sentences these summarise still exist, verbatim, in the Key
   Facts section further down (sections/key-facts.js) for the
   machine-readable layer — this bar is the human-first summary of them,
   not a replacement.
   ===================================================================== */
function renderTrustBar() {
  const commitments = APPROVED_CONTENT.commitments.filter(canRender);
  if (!commitments.length) return '';
  const cityChip = `<li data-claim-type="serviceability">${APPROVED_CONTENT.cities.length} cities</li>`;
  const commitmentChips = commitments.map(c => `<li data-claim-type="${c.claimType}">${escapeHtml(c.short || c.title)}</li>`).join('');
  return `
  <section class="trust-bar" aria-label="Why trust Anvaya">
    <ul>${cityChip}${commitmentChips}</ul>
  </section>`;
}
