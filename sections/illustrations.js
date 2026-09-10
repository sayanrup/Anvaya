/* =====================================================================
   sections/illustrations.js — small flat-design room illustrations,
   built entirely from CSS shapes (see styles.css .illus-*). No photo, no
   image file: this is a demo brand with no real project photography yet.
   -----------------------------------------------------------------
   Every call site (hero, gallery cards) accepts an optional `imageUrl`
   first and only falls back to these when it's absent — see
   sections/hero.js and sections/gallery.js. Drop in a real photo later
   by setting `imageUrl` in content/gallery.js or content/hero.js; no
   render code needs to change.
   ===================================================================== */
function renderVisual(imageUrl, alt, categoryId, sizeClass) {
  if (imageUrl) {
    return `<img class="visual-photo ${sizeClass}" src="${escapeHtml(imageUrl)}" alt="${escapeHtml(alt)}" loading="lazy">`;
  }
  return `<div class="visual-illustration ${sizeClass} illus-${categoryId}" role="img" aria-label="${escapeHtml(alt)}">${roomShapes(categoryId)}</div>`;
}

function roomShapes(categoryId) {
  switch (categoryId) {
    case 'kitchen':
      return `<div class="illus-window"></div><div class="illus-counter"></div><div class="illus-cabinet"></div>`;
    case 'bedroom':
      return `<div class="illus-window"></div><div class="illus-bed"><div class="illus-pillow"></div></div>`;
    case 'wardrobe':
      return `<div class="illus-wardrobe"><span></span><span></span></div>`;
    case 'full-home':
      return `<div class="illus-plan"><i></i><i></i><i></i><i></i></div>`;
    case 'living-room':
    default:
      return `<div class="illus-window"></div><div class="illus-sofa"></div><div class="illus-plant"></div>`;
  }
}
