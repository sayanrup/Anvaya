/* =====================================================================
   sections/gallery.js — "See what we build": a category filter + a
   horizontally-swipeable row of project cards. This is the page's #1
   improvement per the redesign feedback — real visual evidence, not
   just structured claims. See sections/illustrations.js for why these
   are drawn illustrations rather than photos, and how to swap in real
   photography later.
   -----------------------------------------------------------------
   The category pills double as the "visual category navigation" from
   the same feedback (Living Room / Kitchen / Bedroom / Wardrobe / Full
   Home) rather than a second, separate nav — one control, two jobs.
   ===================================================================== */
function renderGallery() {
  const categories = APPROVED_CONTENT.galleryCategories;
  const projects = APPROVED_CONTENT.projects;
  if (!categories.length || !projects.length) return '';

  const pills = categories.map((c, i) =>
    `<button type="button" class="category-pill${i === 0 ? ' active' : ''}" data-category="${escapeHtml(c.id)}">${escapeHtml(c.label)}</button>`
  ).join('');

  const cards = projects.map(p => `
    <li class="project-card" data-project-category="${escapeHtml(p.category)}">
      ${renderVisual(p.imageUrl, `${p.title} in ${p.city}`, p.category, 'visual-card')}
      <div class="project-card-body">
        <strong>${escapeHtml(p.title)}</strong>
        <span class="project-meta">${escapeHtml(p.styleTag)} · ${escapeHtml(p.city)}</span>
        <a class="project-link" href="${APPROVED_CONTENT.ctas.primary.href}">Get this look →</a>
      </div>
    </li>`).join('');

  return `
  <section class="gallery" id="gallery" aria-label="See what we build">
    <h2>See what we build</h2>
    <div class="category-pills" id="categories">${pills}</div>
    <ul class="project-row" id="project-row">${cards}</ul>
  </section>`;
}

// Filters project cards by category. Delegated on `document` (not bound
// directly to the pills) so it keeps working after composePage()
// rebuilds #app's innerHTML — see sections/virtual-tour.js for the same
// pattern applied to drag events.
(function initGalleryFilter() {
  document.addEventListener('click', (e) => {
    const pill = e.target.closest && e.target.closest('.category-pill');
    if (!pill) return;
    const pills = pill.parentElement.querySelectorAll('.category-pill');
    pills.forEach(p => p.classList.toggle('active', p === pill));
    const category = pill.dataset.category;
    const cards = document.querySelectorAll('#project-row .project-card');
    cards.forEach(card => {
      card.hidden = category && card.dataset.projectCategory !== category;
    });
  });
})();
