/* =====================================================================
   sections/trust-bar.js — compact trust strip directly under the hero,
   styled after the reference UI's icon + label + sub-label strip.
   -----------------------------------------------------------------
   The fuller sentences these summarise still exist, verbatim, in the Key
   Facts section further down (sections/key-facts.js) for the
   machine-readable layer — this bar is the human-first summary of them,
   not a replacement.
   ===================================================================== */
function renderTrustBar() {
  const commitments = APPROVED_CONTENT.commitments.filter(canRender);
  if (!commitments.length) return '';
  const compareCta = APPROVED_CONTENT.ctas.compare;
  const cityItem = `
    <div class="trust-item" data-claim-type="serviceability">
      ${renderIcon('pin', 'trust-icon')}
      <div><p class="trust-label">${APPROVED_CONTENT.cities.length} cities</p><p class="trust-sub">Delivered end to end</p></div>
    </div>`;
  const items = commitments.map(c => {
    // "Compare us with others" rides along next to the one commitment it
    // makes sense beside — cost known upfront — rather than floating
    // loose in the trust bar; it points at the why-us comparison table.
    const compareLink = (c.id === 'cost_known_upfront' && compareCta)
      ? `<a class="trust-cta" href="${escapeHtml(compareCta.href)}">${escapeHtml(compareCta.label)} →</a>`
      : '';
    return `
    <div class="trust-item" data-claim-type="${c.claimType}">
      ${renderIcon(c.icon, 'trust-icon')}
      <div><p class="trust-label">${escapeHtml(c.short || c.title)}</p><p class="trust-sub">${escapeHtml(c.sub || '')}</p>${compareLink}</div>
    </div>`;
  }).join('');
  return `
  <section class="trust-bar" aria-label="Why trust Anvaya">
    <div class="trust-grid">${cityItem}${items}</div>
  </section>`;
}
