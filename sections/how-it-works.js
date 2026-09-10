/* =====================================================================
   sections/how-it-works.js — "Four steps from floor plan to
   housewarming": dark section, reducing perceived risk on an expensive,
   unfamiliar purchase.
   ===================================================================== */
function renderHowItWorks() {
  const steps = APPROVED_CONTENT.howItWorks;
  if (!steps || !steps.length) return '';
  return `
  <section class="how-it-works" id="how-it-works">
    <p class="kicker kicker-light">How it works</p>
    <h2>Four steps from floor plan to housewarming</h2>
    <ol class="steps">
      ${steps.map(s => `
        <li>
          <span class="step-number">${escapeHtml(s.step)}</span>
          <strong>${escapeHtml(s.title)}</strong>
          <p>${escapeHtml(s.text)}</p>
        </li>`).join('')}
    </ol>
  </section>`;
}
