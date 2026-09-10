/* =====================================================================
   sections/how-it-works.js — "How your home gets done": four steps,
   reducing perceived risk on an expensive, unfamiliar purchase.
   ===================================================================== */
function renderHowItWorks() {
  const steps = APPROVED_CONTENT.howItWorks;
  if (!steps || !steps.length) return '';
  return `
  <section class="how-it-works" id="how-it-works">
    <h2>How your home gets done</h2>
    <ol class="steps">
      ${steps.map(s => `
        <li>
          <span class="step-number">${escapeHtml(s.step)}</span>
          <div>
            <strong>${escapeHtml(s.title)}</strong>
            <p>${escapeHtml(s.text)}</p>
          </div>
        </li>`).join('')}
    </ol>
  </section>`;
}
