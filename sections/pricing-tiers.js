/* =====================================================================
   sections/pricing-tiers.js — "What will my home cost?" A row per
   configuration (2BHK/3BHK/4BHK), all from content/pricing.js.
   ===================================================================== */
function renderPricingTiers() {
  const tiers = APPROVED_CONTENT.priceTiers.filter(canRender);
  if (!tiers.length) return '';
  return `
  <section class="pricing-tiers" id="pricing-tiers">
    <h2>What will my home cost?</h2>
    <ul class="tier-list">
      ${tiers.map(t => `
        <li data-claim-type="${t.claimType}">
          <span class="tier-label">${escapeHtml(t.label)}</span>
          <span class="tier-range">${escapeHtml(t.lowText)} – ${escapeHtml(t.highText)}</span>
        </li>`).join('')}
    </ul>
    <p class="price-disclaimer">${escapeHtml(APPROVED_CONTENT.priceDisclaimer)}</p>
    <a class="btn btn-primary" href="${APPROVED_CONTENT.ctas.calculate.href}">${escapeHtml(APPROVED_CONTENT.ctas.calculate.label)} →</a>
  </section>`;
}
