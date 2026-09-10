// content/pricing.js — the one place price numbers are typed.
// Every other file (hero, pricing tiers table, FAQ, key facts, JSON-LD)
// reads a tier via getPriceTier(id) in core/helpers.js rather than
// holding its own copy of the digits, so a number only ever needs
// changing here. Figures synced with the reference project's own
// updated price ballparks (1BHK/2BHK/3BHK/Villa) — see README.
//
// The hero's "Starting from just ₹3.5L" headline reads tier "2bhk"'s
// lowText directly (see sections/hero.js) rather than a separately typed
// number, specifically so it can never drift out of sync with the 2BHK
// row in the pricing table below it.
const CONTENT_PRICING = {
  priceTiers: [
    { id: "1bhk", claimType: "price", label: "1BHK", blurb: "Kitchen and a wardrobe for a 1BHK",
      lowText: "₹2.5L", highText: "₹4L", low: 250000, high: 400000, currency: "INR",
      points: ["Modular kitchen", "1 wardrobe", "Standard finishes", "Written warranty"] },
    { id: "2bhk", claimType: "price", label: "2BHK", blurb: "Kitchen and wardrobes for a 2BHK",
      lowText: "₹3.5L", highText: "₹6L", low: 350000, high: 600000, currency: "INR",
      points: ["Modular kitchen", "2 wardrobes", "Standard finishes", "Written warranty"] },
    { id: "3bhk", claimType: "price", label: "3BHK", blurb: "Full-home interiors for a 3BHK", featured: true,
      lowText: "₹6.5L", highText: "₹11L", low: 650000, high: 1100000, currency: "INR",
      points: ["Kitchen + 3 wardrobes", "Living room storage", "False ceiling & lighting", "Premium finishes"] },
    // Open-ended (no highText/high) — "₹12L onwards" per the reference's
    // own figure. No upper bound is invented; canRender() and every
    // renderer treat `openEnded` tiers as needing only lowText/low.
    { id: "villa", claimType: "price", label: "Villa", blurb: "Designer-led interiors for villas and larger homes",
      lowText: "₹12L", openEnded: true, low: 1200000, currency: "INR",
      points: ["Designer-led concept", "Premium finishes throughout", "Furniture & decor styling", "Dedicated project lead"] }
  ],
  priceDisclaimer: "Illustrative starting range for planning only — not a quote. Your exact price depends on city, carpet area, and finish level, and is confirmed for free before you sign anything.",
  // Replaces the standalone "How it works" section — the process now
  // shows as one line directly under the pricing heading instead of its
  // own section further down the page. Also feeds the HowTo JSON-LD
  // (core/jsonld.js) so the process stays in the machine-readable layer
  // even without a dedicated visual section for it.
  processFlow: [
    "Customize your requirement",
    "Get instant quotes",
    "Talk with our designers",
    "Lock the price",
    "We deliver within 45 days"
  ]
};
