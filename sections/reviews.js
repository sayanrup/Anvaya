/* =====================================================================
   sections/reviews.js — "Homeowners, in their words": styled after the
   familiar Google-reviews card layout (avatar initial, star row, name)
   per the redesign feedback, plus which package the reviewer took.
   -----------------------------------------------------------------
   This is a layout choice, not a data-source claim: these are the same
   illustrative demo quotes as before, not reviews pulled from a real
   Google Business Profile. Rather than label them "Google reviews" (a
   claim about where the data came from that isn't true), the section
   says plainly that they're illustrative — the same honesty pattern the
   360° tour and hero price already use elsewhere on this page. Swap in
   a real Google Reviews widget/API once real reviews exist; nothing
   else on the page needs to change.
   ===================================================================== */
function renderReviews() {
  const reviews = APPROVED_CONTENT.reviews.filter(canRender);
  if (!reviews.length) return '';
  return `
  <section class="reviews" id="reviews">
    <h2>Homeowners, in their words</h2>
    <p class="section-intro">Illustrative reviews for this demo — swap in real Google Business Profile reviews once available.</p>
    ${reviews.map(r => {
      const tier = getPriceTier(r.tier);
      const packageLabel = tier ? escapeHtml(tier.label) : '';
      return `
      <figure class="review-card" data-claim-type="review">
        <div class="review-head">
          <span class="review-avatar" aria-hidden="true">${escapeHtml(r.name.charAt(0))}</span>
          <div>
            <span class="review-name">${escapeHtml(r.name)}</span>
            <div class="review-stars">${renderIcon('star', 'star-icon').repeat(r.rating)}</div>
          </div>
        </div>
        <blockquote>"${escapeHtml(r.text)}"</blockquote>
        <figcaption>
          ${packageLabel ? `<span class="review-package">${packageLabel} package</span>` : ''}
          <span class="review-tag">${escapeHtml(r.city)}</span>
        </figcaption>
      </figure>`;
    }).join('')}
  </section>`;
}
