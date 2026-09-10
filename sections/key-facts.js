/* =====================================================================
   sections/key-facts.js — the quotable "Key facts" block.
   Fixed, same on every visitor state, so a model lifts the correct
   string verbatim regardless of which lead block is showing.
   ===================================================================== */
function renderKeyFacts() {
  const facts = APPROVED_CONTENT.keyFacts.filter(canRender);
  if (!facts.length) return '';
  return `
  <section class="key-facts" id="key-facts" aria-label="Key facts">
    <h2>Key facts</h2>
    <ul>${facts.map(f => `<li data-claim-type="${f.claimType}">${escapeHtml(f.text)}</li>`).join('')}</ul>
  </section>`;
}
