/* =====================================================================
   sections/reviews.js — "Real customer homes" review cards: name + last
   initial, star row, and a project tag (home type · city), restyled for
   stronger proof per the redesign feedback.
   ===================================================================== */
function renderReviews() {
  const reviews = APPROVED_CONTENT.reviews.filter(canRender);
  if (!reviews.length) return '';
  return `
  <section class="reviews" id="reviews">
    <h2>Real customer homes</h2>
    ${reviews.map(r => `
      <blockquote data-claim-type="review">
        <div class="review-head">
          <span class="review-name">${escapeHtml(r.name)}</span>
          <span class="review-stars">${'★'.repeat(r.rating)}</span>
        </div>
        <span class="review-tag">${escapeHtml(r.tag)}</span>
        <p>"${escapeHtml(r.text)}"</p>
      </blockquote>`).join('')}
  </section>`;
}
