/* =====================================================================
   sections/gallery.js — "Every room, measured for your walls": a
   category-pill filter over a horizontally-swipeable row of individual
   project cards (reverted to this layout per feedback), where each
   card carries its own swipeable, infinite-looping image carousel with
   dot indicators when it has more than one photo. Under speed=slow no
   gallery image loads at all — the card still shows its title and tag,
   just no photo weight.
   -----------------------------------------------------------------
   The category pills double as visual category navigation (Living Room
   / Kitchen / Dining / Bedroom / Wardrobe / Study) rather than a second,
   separate nav — one control, two jobs.
   ===================================================================== */
function renderGallery() {
  const categories = APPROVED_CONTENT.galleryCategories;
  const projects = APPROVED_CONTENT.projects;
  if (!categories.length || !projects.length) return '';
  const isSlow = new URLSearchParams(window.location.search).get('speed') === 'slow';

  const pills = categories.map((c, i) =>
    `<button type="button" class="category-pill${i === 0 ? ' active' : ''}" data-category="${escapeHtml(c.id)}">${escapeHtml(c.label)}</button>`
  ).join('');

  const cards = projects.map(p => renderProjectCard(p, isSlow)).join('');

  return `
  <section class="gallery" id="gallery" aria-label="See what we build">
    <p class="kicker">What we design</p>
    <h2>Every room, measured for your walls</h2>
    <p class="section-intro">Nothing here is off the shelf. Each unit is drawn to your floor plan, built in our factory and fitted on site by our own crew.</p>
    <div class="category-pills" id="categories">${pills}</div>
    <ul class="project-row" id="project-row">${cards}</ul>
  </section>`;
}

function renderProjectCard(p, skipImages) {
  const images = skipImages ? [] : (p.images || []);
  let visualHtml;
  if (images.length > 1) {
    // [last, ...images, first] so swiping past either end wraps
    // seamlessly — see initGalleryCarousels() below.
    const slides = [images[images.length - 1]].concat(images, [images[0]]);
    visualHtml = `
      <div class="space-carousel visual-card" data-count="${images.length}">
        <div class="space-track">
          ${slides.map((src, i) => `<img class="space-slide" src="${escapeHtml(src)}" alt="${escapeHtml(p.title)} ${i}" loading="lazy" draggable="false">`).join('')}
        </div>
        <div class="space-dots">
          ${images.map((_, i) => `<button type="button" class="space-dot${i === 0 ? ' active' : ''}" aria-label="Show image ${i + 1} of ${images.length}"></button>`).join('')}
        </div>
      </div>`;
  } else {
    visualHtml = renderVisual(images[0] || null, `${p.title} in ${p.city}`, p.category, 'visual-card');
  }
  return `
    <li class="project-card" data-project-category="${escapeHtml(p.category)}">
      ${visualHtml}
      <div class="project-card-body">
        <strong>${escapeHtml(p.title)}</strong>
        <span class="project-meta">${escapeHtml(p.styleTag)} · ${escapeHtml(p.city)}</span>
        <a class="project-link" href="${APPROVED_CONTENT.ctas.primary.href}">Get this look →</a>
      </div>
    </li>`;
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

/* ---- per-card infinite carousel ----
   Runs once per page load, triggered by the 'anvaya:composed' event
   core/compose.js dispatches after composePage() builds #app — the
   .space-carousel elements don't exist until then. */
document.addEventListener('anvaya:composed', function initGalleryCarousels() {
  document.querySelectorAll('.space-carousel').forEach(carousel => {
    const track = carousel.querySelector('.space-track');
    const dots = carousel.querySelectorAll('.space-dot');
    if (!track || track.dataset.initialized) return;
    track.dataset.initialized = '1';
    const count = Number(carousel.dataset.count) || dots.length;

    const place = () => { if (track.clientWidth) track.scrollLeft = track.clientWidth; };
    place();
    requestAnimationFrame(place);

    function setActiveDot(i) {
      dots.forEach((d, di) => d.classList.toggle('active', di === i));
    }

    let settleTimer = null;
    track.addEventListener('scroll', () => {
      const w = track.clientWidth;
      if (!w) return;
      clearTimeout(settleTimer);
      settleTimer = setTimeout(() => {
        const raw = Math.round(track.scrollLeft / w);
        if (raw <= 0) { track.scrollLeft = count * w; setActiveDot(count - 1); }
        else if (raw >= count + 1) { track.scrollLeft = w; setActiveDot(0); }
        else { setActiveDot(raw - 1); }
      }, 80);
    });

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        track.scrollTo({ left: (i + 1) * track.clientWidth, behavior: 'smooth' });
      });
    });
  });
});
