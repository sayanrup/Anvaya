// content/consult.js — the real enquiry form at the bottom of the page.
// Client-side only (see sections/consult-form.js): there is no backend
// in this project, so submitting shows an inline confirmation rather
// than actually sending anything anywhere — the same honest simulation
// the UI reference this page's look is based on uses.
const CONTENT_CONSULT = {
  consult: {
    heading: "Book a free design session",
    sub: "Tell us a little about your home. A designer calls you within 24 hours.",
    fields: {
      name: "Your name",
      phone: "Phone number",
      city: "City",
      message: "2BHK, possession in March, looking at kitchen + wardrobes…"
    },
    submitLabel: "Request my free session",
    note: "No spam, no site visit required for the first conversation.",
    successMessage: "Thanks! An Anvaya designer will call you within 24 hours.",
    errorMessage: "Please add your name and phone number."
  }
};
