/* =====================================================================
   sections/reviews.js — "Homeowners, in their words": name + last
   initial, star row, and a project tag (home type · city).
   ===================================================================== */
function renderReviews() {
  const reviews = APPROVED_CONTENT.reviews.filter(canRender);
  if (!reviews.length) return '';
  return `
  <section class="reviews" id="reviews">
    <h2>Homeowners, in their words</h2>
    ${reviews.map(r => `
      <figure class="review-card" data-claim-type="review">
        <div class="review-stars">${renderIcon('star', 'star-icon').repeat(r.rating)}</div>
        <blockquote>"${escapeHtml(r.text)}"</blockquote>
        <figcaption>
          <span class="review-name">${escapeHtml(r.name)}</span>
          <span class="review-tag">${escapeHtml(r.tag)}</span>
        </figcaption>
      </figure>`).join('')}
  </section>`;
}
