// content/hero.js — the default/organic first-screen copy. Rendered for
// both the "no explicit intent" visitor and the "intent=3bhk_cost"
// visitor (see sections/hero.js) — they're asking the same question.
// The headline price itself is NOT typed here: sections/hero.js reads it
// from the "1bhk" price tier (content/pricing.js) via getPriceTier(),
// so the hero's "starting from" figure can never drift out of sync with
// the 1BHK row in the pricing table further down the page. No separate
// "illustrative" disclaimer here (removed per feedback) — the fuller
// version (`priceDisclaimer`, content/pricing.js) already covers it just
// below, right under the pricing table this same figure feeds.
const CONTENT_HERO = {
  hero: {
    kicker: "Interiors, end to end",
    headline: "Homes that feel finished, not furnished.",
    trustLine: "Design, manufacture and installation under one roof.",
    startingPrefix: "Starting from just",
    imageUrl: "assets/photos/hero-living.jpg",
    imageAlt: "Warm modern living room concept in an Anvaya-designed home"
  }
};
