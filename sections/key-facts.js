/* =====================================================================
   sections/key-facts.js — the quotable "Key facts" block, demoted per
   the redesign feedback: it was doing too much visual work up top.
   Collapsed behind a <details> disclosure so a human sees a small,
   optional "Know us in detail" affordance rather than a wall of
   bullets, while the full standalone sentences stay present in the DOM
   (collapsed content still renders, so a crawler or quoting model still
   gets them verbatim) for the machine-readable layer.
   ===================================================================== */
function renderKeyFacts() {
  const facts = APPROVED_CONTENT.keyFacts.filter(canRender);
  if (!facts.length) return '';
  return `
  <section class="key-facts" id="key-facts" aria-label="Key facts">
    <details>
      <summary>Know us in detail</summary>
      <ul>${facts.map(f => `<li data-claim-type="${f.claimType}">${escapeHtml(f.text)}</li>`).join('')}</ul>
    </details>
  </section>`;
}
