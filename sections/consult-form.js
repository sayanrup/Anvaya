/* =====================================================================
   sections/consult-form.js — "Book a free design session": a real
   enquiry form (name, phone, city, message).
   -----------------------------------------------------------------
   There is no backend anywhere in this project. Submitting shows an
   inline confirmation instead of sending anything anywhere — the same
   honest client-side simulation used by the UI reference this section's
   look is based on. A real backend/email integration would replace only
   handleConsultSubmit(); the form's markup and validation don't change.
   ===================================================================== */
function renderConsultForm() {
  const c = APPROVED_CONTENT.consult;
  if (!c) return '';
  return `
  <section class="consult-card" id="estimate">
    <h2>${escapeHtml(c.heading)}</h2>
    <p class="section-intro">${escapeHtml(c.sub)}</p>
    <form class="consult-form" id="consult-form" novalidate>
      <div class="consult-row">
        <input type="text" name="name" placeholder="${escapeHtml(c.fields.name)}" aria-label="${escapeHtml(c.fields.name)}">
        <input type="tel" name="phone" placeholder="${escapeHtml(c.fields.phone)}" aria-label="${escapeHtml(c.fields.phone)}">
      </div>
      <input type="text" name="city" placeholder="${escapeHtml(c.fields.city)}" aria-label="${escapeHtml(c.fields.city)}">
      <textarea name="message" rows="3" placeholder="${escapeHtml(c.fields.message)}" aria-label="Message"></textarea>
      <button type="submit" class="btn btn-primary">${escapeHtml(c.submitLabel)}</button>
      <p class="consult-note">${escapeHtml(c.note)}</p>
      <p class="consult-feedback" id="consult-feedback" role="status" hidden></p>
    </form>
  </section>`;
}

// Delegated on `document` so it keeps working after composePage()
// rebuilds #app's innerHTML — same pattern as the gallery filter and the
// virtual-tour drag handler.
(function initConsultForm() {
  document.addEventListener('submit', (e) => {
    const form = e.target.closest && e.target.closest('#consult-form');
    if (!form) return;
    e.preventDefault();
    const c = APPROVED_CONTENT.consult;
    const feedback = form.querySelector('#consult-feedback');
    const name = form.elements.name.value.trim();
    const phone = form.elements.phone.value.trim();
    if (!feedback) return;
    feedback.hidden = false;
    feedback.classList.remove('is-error');
    if (!name || !phone) {
      feedback.textContent = c.errorMessage;
      feedback.classList.add('is-error');
      return;
    }
    feedback.textContent = c.successMessage;
    form.reset();
  });
})();
