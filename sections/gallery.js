/* =====================================================================
   sections/gallery.js — "Every room, measured for your walls": four
   space cards, each with its own swipeable, infinite-looping image
   carousel (3 real photos) and dot indicators — synced with the
   reference project's own "Instagram-style" gallery carousel. Under
   speed=slow no image loads at all for this section (matching the
   reference's own `{!lowBandwidth && <ImageCarousel/>}` behaviour) —
   the space still gets its title and copy, just no photo weight.
   ===================================================================== */
function renderGallery() {
  const spaces = APPROVED_CONTENT.spaces;
  if (!spaces || !spaces.length) return '';
  const isSlow = new URLSearchParams(window.location.search).get('speed') === 'slow';
  const cards = spaces.map(s => renderSpaceCard(s, isSlow)).join('');
  return `
  <section class="gallery" id="gallery" aria-label="See what we build">
    <p class="kicker">What we design</p>
    <h2>Every room, measured for your walls</h2>
    <p class="section-intro">Nothing here is off the shelf. Each unit is drawn to your floor plan, built in our factory and fitted on site by our own crew.</p>
    <div class="space-grid">${cards}</div>
  </section>`;
}

function renderSpaceCard(space, skipImages) {
  const images = skipImages ? [] : (space.images || []);
  let visualHtml;
  if (images.length > 1) {
    // [last, ...images, first] so swiping past either end wraps
    // seamlessly — see initSpaceCarousels() below.
    const slides = [images[images.length - 1]].concat(images, [images[0]]);
    visualHtml = `
      <div class="space-carousel visual-card" data-count="${images.length}">
        <div class="space-track">
          ${slides.map((src, i) => `<img class="space-slide" src="${escapeHtml(src)}" alt="${escapeHtml(space.title)} ${i}" loading="lazy" draggable="false">`).join('')}
        </div>
        <div class="space-dots">
          ${images.map((_, i) => `<button type="button" class="space-dot${i === 0 ? ' active' : ''}" aria-label="Show image ${i + 1} of ${images.length}"></button>`).join('')}
        </div>
      </div>`;
  } else {
    visualHtml = renderVisual(images[0] || null, space.title, space.id, 'visual-card');
  }
  return `
    <article class="space-card">
      ${visualHtml}
      <div class="space-card-body">
        <h3>${escapeHtml(space.title)}</h3>
        <p>${escapeHtml(space.copy)}</p>
      </div>
    </article>`;
}

/* ---- per-card infinite carousel ----
   Ported from the reference's React ImageCarousel hook to plain DOM
   events. Runs once per page load, triggered by the 'anvaya:composed'
   event core/compose.js dispatches after composePage() builds #app —
   the .space-carousel elements don't exist until then. */
document.addEventListener('anvaya:composed', function initSpaceCarousels() {
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
