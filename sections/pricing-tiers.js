/* =====================================================================
   sections/pricing-tiers.js — "Know the number before you commit."
   Four cards (1BHK/2BHK/3BHK/Villa), the 3BHK marked as the most-chosen
   configuration, all numbers from content/pricing.js.
   ===================================================================== */
function renderPricingTiers() {
  const tiers = APPROVED_CONTENT.priceTiers.filter(canRender);
  if (!tiers.length) return '';
  return `
  <section class="pricing-tiers" id="pricing-tiers">
    <p class="kicker">Indicative pricing</p>
    <h2>Know the number before you commit</h2>
    <p class="section-intro">${escapeHtml(APPROVED_CONTENT.priceDisclaimer)}</p>
    <div class="tier-cards">
      ${tiers.map(t => `
        <div class="tier-card${t.featured ? ' featured' : ''}" data-claim-type="${t.claimType}">
          ${t.featured ? '<span class="tier-badge">Most chosen</span>' : ''}
          <h3>${escapeHtml(t.label)}</h3>
          <p class="tier-blurb">${escapeHtml(t.blurb || '')}</p>
          <p class="tier-price">${escapeHtml(t.lowText)}<span class="tier-price-to">${t.openEnded ? ' onwards' : ' – ' + escapeHtml(t.highText)}</span></p>
          <ul class="tier-points">
            ${(t.points || []).map(pt => `<li>${escapeHtml(pt)}</li>`).join('')}
          </ul>
          <a class="btn ${t.featured ? 'btn-primary' : 'btn-outline'}" href="${APPROVED_CONTENT.ctas.calculate.href}">${escapeHtml(APPROVED_CONTENT.ctas.calculate.label)}</a>
        </div>`).join('')}
    </div>
  </section>`;
}
