/* =====================================================================
   sections/hero.js — the default/organic first screen.
   -----------------------------------------------------------------
   Used for both the "no explicit intent" visitor and the explicit
   intent=3bhk_cost visitor (see core/compose.js determineRule) — they're
   asking the same question, so they get the same answer: a visual, the
   price, the trust line, and one dominant CTA, all inside the first
   viewport. renderGenericSafe() is the minimal last-resort fallback used
   here and by every other lead renderer in sections/lead.js when their
   own required content fails canRender().
   ===================================================================== */
function renderHero() {
  const hero = APPROVED_CONTENT.hero;
  if (!hero) return renderGenericSafe();

  const tier = getPriceTier('3bhk');
  const priceBlockHtml = canRender(tier) ? `
    <div class="price-block" data-claim-type="price">
      <div class="price-range">${escapeHtml(tier.lowText)} – ${escapeHtml(tier.highText)}</div>
      <p class="price-disclaimer">${escapeHtml(hero.disclaimer)}</p>
    </div>` : '';

  return `
  <section class="lead hero" id="hero">
    <div class="hero-visual">${renderVisual(null, hero.imageAlt, 'living-room', 'visual-hero')}</div>
    <h1>${escapeHtml(hero.headline)}</h1>
    ${priceBlockHtml}
    <p class="trust-line">${escapeHtml(hero.trustLine)}</p>
    <a class="btn btn-primary" href="${APPROVED_CONTENT.ctas.primary.href}">${escapeHtml(APPROVED_CONTENT.ctas.primary.label)} →</a>
    <a class="btn btn-outline" href="${APPROVED_CONTENT.ctas.secondary.href}">${escapeHtml(APPROVED_CONTENT.ctas.secondary.label)}</a>
  </section>`;
}

function renderGenericSafe() {
  const g = APPROVED_CONTENT.generic;
  return `
  <section class="lead hero hero-minimal" id="hero">
    <h1>${escapeHtml(g.headline)}</h1>
    <p class="sub">${escapeHtml(g.sub)}</p>
    <a class="btn btn-primary" href="${APPROVED_CONTENT.ctas.primary.href}">${escapeHtml(APPROVED_CONTENT.ctas.primary.label)} →</a>
  </section>`;
}
