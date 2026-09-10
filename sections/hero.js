/* =====================================================================
   sections/hero.js — the default/organic first screen.
   -----------------------------------------------------------------
   Used for both the "no explicit intent" visitor and the explicit
   intent=3bhk_cost visitor (see core/compose.js determineRule) — they're
   asking the same question, so they get the same answer: a full-bleed
   photo, a kicker, the headline, the price, the trust line, and one
   dominant CTA, all inside the first viewport. renderGenericSafe() is
   the minimal last-resort fallback used here and by every other lead
   renderer in sections/lead.js when their own required content fails
   canRender().
   ===================================================================== */
function renderHero() {
  const hero = APPROVED_CONTENT.hero;
  if (!hero) return renderGenericSafe();

  const tier = getPriceTier('3bhk');
  const priceBlockHtml = canRender(tier) ? `
    <div class="price-block" data-claim-type="price">
      <span class="price-range">${escapeHtml(tier.lowText)} – ${escapeHtml(tier.highText)}</span>
      <span class="price-disclaimer">${escapeHtml(hero.disclaimer)}</span>
    </div>` : '';

  return `
  <section class="hero-photo" id="hero">
    ${renderVisual(hero.imageUrl, hero.imageAlt, 'living-room', 'visual-hero')}
    <div class="hero-scrim"></div>
    <div class="hero-copy">
      <p class="kicker">${escapeHtml(hero.kicker)}</p>
      <h1>${escapeHtml(hero.headline)}</h1>
      <p class="hero-trust-line">${escapeHtml(hero.trustLine)}</p>
      ${priceBlockHtml}
      <div class="hero-ctas">
        <a class="btn btn-primary" href="${APPROVED_CONTENT.ctas.primary.href}">${escapeHtml(APPROVED_CONTENT.ctas.primary.label)} →</a>
        <a class="btn btn-outline-light" href="${APPROVED_CONTENT.ctas.secondary.href}">${escapeHtml(APPROVED_CONTENT.ctas.secondary.label)}</a>
      </div>
    </div>
  </section>`;
}

function renderGenericSafe() {
  const g = APPROVED_CONTENT.generic;
  return `
  <section class="lead hero-minimal" id="hero">
    <h1>${escapeHtml(g.headline)}</h1>
    <p class="sub">${escapeHtml(g.sub)}</p>
    <a class="btn btn-primary" href="${APPROVED_CONTENT.ctas.primary.href}">${escapeHtml(APPROVED_CONTENT.ctas.primary.label)} →</a>
  </section>`;
}
