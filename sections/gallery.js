/* =====================================================================
   sections/gallery.js — "Every room, measured for your walls": a
   category filter + a horizontally-swipeable row of project cards. Real
   visual evidence, not just structured claims — see content/gallery.js
   for photo provenance and sections/illustrations.js for the fallback
   used whenever an entry's `imageUrl` is unset.
   -----------------------------------------------------------------
   The category pills double as visual category navigation (Living Room
   / Kitchen / Bedroom / Wardrobe / Study) rather than a second, separate
   nav — one control, two jobs.
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
    <p class="kicker">What we design</p>
    <h2>Every room, measured for your walls</h2>
    <p class="section-intro">Nothing here is off the shelf. Each unit is drawn to your floor plan, built in our factory and fitted on site by our own crew.</p>
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
