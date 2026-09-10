// content/customize.js — a mid-page bridge into the intent-capture flow
// this page already has (see core/compose.js determineRule, 'capture').
// Its CTA re-enters the page with intent=unknown, which is exactly the
// signal that shows "What brought you here today?" — so a visitor who
// wants something more specific gets routed the same way an
// assistant-referred or explicitly-ambiguous visitor already would.
const CONTENT_CUSTOMIZE = {
  customize: {
    kicker: "Built around you",
    heading: "Customize as per your need",
    body: "Every home is different. Tell us what matters most — your budget, your city, or how Anvaya compares — and we'll lead with exactly that, not a generic pitch.",
    ctaLabel: "Ask our AI design assistant"
  }
};
