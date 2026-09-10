/* =====================================================================
   sections/reviews.js — "What customers say".
   ===================================================================== */
function renderReviews() {
  const reviews = APPROVED_CONTENT.reviews.filter(canRender);
  if (!reviews.length) return '';
  return `
  <section class="reviews" id="reviews">
    <h2>What customers say</h2>
    ${reviews.map(r => `
      <blockquote data-claim-type="review">
        <p>"${escapeHtml(r.text)}"</p>
        <cite>${escapeHtml(r.author)} · ${'★'.repeat(r.rating)}</cite>
      </blockquote>`).join('')}
  </section>`;
}
