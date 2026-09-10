/* =====================================================================
   sections/header.js — the header's quick-jump nav and CTA button.
   -----------------------------------------------------------------
   The header's logo/wordmark is static markup in index.html since it
   never varies; the nav links and the CTA label/href are rendered here
   from APPROVED_CONTENT so they can't drift out of sync with the rest of
   the page's copy. Runs immediately (not on DOMContentLoaded) since the
   script tag is placed after these elements in the document, so they
   already exist.
   ===================================================================== */
(function renderHeaderChrome() {
  const nav = document.getElementById('site-nav');
  if (nav) {
    nav.innerHTML = APPROVED_CONTENT.nav
      .map(item => `<a href="${escapeHtml(item.href)}">${escapeHtml(item.label)}</a>`)
      .join('');
  }
  const cta = document.getElementById('header-cta');
  if (cta) {
    cta.href = APPROVED_CONTENT.ctas.primary.href;
    cta.textContent = APPROVED_CONTENT.ctas.primary.label;
  }
})();
