// content/hero.js — the default/organic first-screen copy. Rendered for
// both the "no explicit intent" visitor and the "intent=3bhk_cost"
// visitor (see sections/hero.js) — they're asking the same question.
// The headline price itself is NOT typed here: sections/hero.js reads it
// from the "2bhk" price tier (content/pricing.js) via getPriceTier(),
// so the hero's "starting from" figure can never drift out of sync with
// the 2BHK row in the pricing table further down the page.
const CONTENT_HERO = {
  hero: {
    kicker: "Interiors, end to end",
    headline: "Homes that feel finished, not furnished.",
    trustLine: "Design, manufacture and installation under one roof.",
    startingPrefix: "Starting from just",
    disclaimer: "*Illustrative starting price. Exact cost confirmed before you commit.",
    imageUrl: "assets/photos/hero-living.jpg",
    imageAlt: "Warm modern living room concept in an Anvaya-designed home"
  }
};
