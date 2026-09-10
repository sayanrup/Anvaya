/* =====================================================================
   sections/why-us.js — "Why choose Anvaya": three cards (Anvaya /
   Other Brands / Local Shops) in a horizontally-scrolling row, matching
   the same card-row pattern used for the gallery and pricing tiers.
   Anvaya's price rows resolve through getPriceTier() so they can't
   disagree with the pricing table right after this section; the other
   two columns are plain approved strings (see content/why-us.js for why
   they're qualitative, not invented numbers).
   ===================================================================== */
function renderWhyUs() {
  const wu = APPROVED_CONTENT.whyUs;
  if (!wu) return '';
  const rowKeys = Object.keys(wu.rowLabels);

  function cellText(column, key) {
    const val = column.rows[key];
    if (val && typeof val === 'object' && val.tierRef) {
      const tier = getPriceTier(val.tierRef);
      return canRender(tier) ? `${tier.lowText} – ${tier.highText}` : null;
    }
    return val || null;
  }

  const cards = wu.columns.map(col => `
    <div class="whyus-card${col.featured ? ' featured' : ''}">
      ${col.featured ? '<span class="tier-badge">Us</span>' : ''}
      <h3>${escapeHtml(col.label)}</h3>
      <dl class="whyus-rows">
        ${rowKeys.map(key => {
          const text = cellText(col, key);
          if (!text) return '';
          const claimType = col.featured && (key === 'price1bhk' || key === 'price2bhk') ? ' data-claim-type="price"'
            : col.featured && key === 'delivery' ? ' data-claim-type="timeline"'
            : col.featured && key === 'trust' ? ' data-claim-type="warranty"'
            : '';
          return `<div class="whyus-row"><dt>${escapeHtml(wu.rowLabels[key])}</dt><dd${claimType}>${escapeHtml(text)}</dd></div>`;
        }).join('')}
      </dl>
    </div>`).join('');

  return `
  <section class="why-us" id="why-us" aria-label="Why choose Anvaya">
    <p class="kicker">${escapeHtml(wu.kicker)}</p>
    <h2>${escapeHtml(wu.heading)}</h2>
    <div class="whyus-cards">${cards}</div>
    <p class="section-note">${escapeHtml(wu.note)}</p>
  </section>`;
}
