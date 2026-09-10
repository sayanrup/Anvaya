/* =====================================================================
   sections/header.js — the quick-jump nav row inside the sticky header.
   -----------------------------------------------------------------
   The rest of the header (logo, wordmark, CTA) is static markup in
   index.html since it never varies by visitor — only this nav strip is
   generated, from APPROVED_CONTENT.nav, so its links always match the
   `id` attributes the other section files actually render. Runs
   immediately (not on DOMContentLoaded) since the script tag is placed
   after #site-nav in the document, so the element already exists.
   ===================================================================== */
(function renderHeaderNav() {
  const nav = document.getElementById('site-nav');
  if (!nav) return;
  nav.innerHTML = APPROVED_CONTENT.nav
    .map(item => `<a href="${escapeHtml(item.href)}">${escapeHtml(item.label)}</a>`)
    .join('');
})();
