/* =====================================================================
   sections/why-us.js — "Why choose Anvaya": one comparison table (row
   per criterion, column per brand) instead of per-brand cards, so a
   visitor can scan a single row — e.g. "1BHK price" — straight across
   Anvaya / Other Brands / Local Shops without swiping between cards.
   The row-label column stays pinned (position:sticky) while the table
   scrolls horizontally on narrow screens. Anvaya's price cells resolve
   through getPriceTier() so they can't disagree with the pricing table
   right after this section; the other two columns are plain approved
   strings (see content/why-us.js for why they're qualitative, not
   invented numbers).
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
  function claimTypeAttr(column, key) {
    if (!column.featured) return '';
    if (key === 'price1bhk' || key === 'price2bhk') return ' data-claim-type="price"';
    if (key === 'delivery') return ' data-claim-type="timeline"';
    if (key === 'trust') return ' data-claim-type="warranty"';
    return '';
  }

  const headCells = wu.columns.map(col => `
    <th scope="col"${col.featured ? ' class="whyus-col-featured"' : ''}>
      ${escapeHtml(col.label)}${col.featured ? '<span class="whyus-badge">Us</span>' : ''}
    </th>`).join('');

  const bodyRows = rowKeys.map(key => {
    const cells = wu.columns.map(col => {
      const text = cellText(col, key);
      const cls = col.featured ? ' class="whyus-col-featured"' : '';
      return `<td${cls}${claimTypeAttr(col, key)}>${text ? escapeHtml(text) : '—'}</td>`;
    }).join('');
    return `<tr><th scope="row">${escapeHtml(wu.rowLabels[key])}</th>${cells}</tr>`;
  }).join('');

  return `
  <section class="why-us" id="why-us" aria-label="Why choose Anvaya">
    <p class="kicker">${escapeHtml(wu.kicker)}</p>
    <h2>${escapeHtml(wu.heading)}</h2>
    <div class="whyus-table-wrap">
      <table class="whyus-table">
        <thead><tr><th scope="col" class="whyus-row-head"></th>${headCells}</tr></thead>
        <tbody>${bodyRows}</tbody>
      </table>
    </div>
    <p class="section-note">${escapeHtml(wu.note)}</p>
  </section>`;
}
