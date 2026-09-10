/* =====================================================================
   sections/pricing-tiers.js — "Know the number before you commit."
   Four cards (1BHK/2BHK/3BHK/Villa), the 3BHK marked as the most-chosen
   configuration, all numbers from content/pricing.js. The process flow
   line replaces the standalone "How it works" section that used to sit
   lower on the page — same content/pricing.js.processFlow also feeds
   the HowTo JSON-LD (core/jsonld.js). It's marked timeline-claim-bearing
   (the "45 days" figure) for the machine-readable layer even though, like
   the section it replaced, it isn't individually canRender()-gated —
   process-step copy has never gone through that gate, only price/
   timeline/warranty/serviceability/review *facts* do.
   ===================================================================== */
function renderPricingTiers() {
  const tiers = APPROVED_CONTENT.priceTiers.filter(canRender);
  if (!tiers.length) return '';
  const flow = APPROVED_CONTENT.processFlow || [];
  return `
  <section class="pricing-tiers" id="pricing-tiers">
    <p class="kicker">Indicative pricing</p>
    <h2>Know the number before you commit</h2>
    ${flow.length ? `<p class="tier-flow" data-claim-type="timeline">${flow.map(escapeHtml).join(' <span class="tier-flow-arrow">→</span> ')}</p>` : ''}
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
    <p class="price-disclaimer-note">${escapeHtml(APPROVED_CONTENT.priceDisclaimer)}</p>
  </section>`;
}
