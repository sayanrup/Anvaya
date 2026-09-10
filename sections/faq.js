/* =====================================================================
   sections/faq.js — "Frequently asked", reordered (not rewritten) per
   the active composition rule so the most relevant question floats to
   the top without changing any approved question/answer text.
   ===================================================================== */
const FAQ_PRIORITY_INDEX = { cost: 0, delivery: 1, compare: 4 };

function renderFaq(context) {
  const faqs = APPROVED_CONTENT.faqs.filter(canRender);
  if (!faqs.length) return '';
  let ordered = faqs.slice();
  if (context in FAQ_PRIORITY_INDEX) {
    const idx = FAQ_PRIORITY_INDEX[context];
    const item = ordered.splice(idx, 1)[0];
    if (item) ordered.unshift(item);
  }
  return `
  <section class="faq" id="faq">
    <h2>Frequently asked</h2>
    ${ordered.map(f => `
      <details>
        <summary>${escapeHtml(f.q)}</summary>
        <p data-claim-type="${f.claimType}">${escapeHtml(f.a)}</p>
      </details>`).join('')}
  </section>`;
}
