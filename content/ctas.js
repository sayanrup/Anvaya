// content/ctas.js — every button label on the site. One primary
// proposition ("know your cost before you commit"), reused everywhere,
// plus a few section-specific variants of the same underlying action.
const CONTENT_CTAS = {
  ctas: {
    primary:      { label: "Get my exact estimate", href: "#estimate" },
    // The sticky header's compact pill button — same destination as
    // `primary`, distinct wording per the site owner's request. Kept as
    // its own entry (not reused text) since the header has less width
    // available at 360px; styles.css shrinks the pill's type slightly to
    // fit it rather than shortening the label.
    headerCta:    { label: "Get Free Estimates",     href: "#estimate" },
    secondary:    { label: "Talk to a designer",     href: "#estimate" },
    calculate:    { label: "Calculate my cost",      href: "#estimate" },
    consultation: { label: "Book a free design consultation", href: "#estimate" },
    notify:       { label: "Notify me when Anvaya launches here", href: "#estimate" },
    // Shown only if a visitor's own behaviour (dwelling on the price
    // block) elevates it — see sections/engagement-signals.js. Still an
    // approved string picked from this file, never generated on the fly.
    elevated:     { label: "See your exact 3BHK cost", href: "#pricing-tiers" }
  }
};
