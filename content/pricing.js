// content/pricing.js — the one place price numbers are typed.
// Every other file (hero, pricing tiers table, FAQ, key facts, JSON-LD)
// reads a tier via getPriceTier(id) in core/helpers.js rather than
// holding its own copy of the digits, so a number only ever needs
// changing here. `points` are descriptive feature bullets, not
// individually-approved claims — the numbers and warranty/timeline
// facts they restate are already approved elsewhere (content/commitments.js).
const CONTENT_PRICING = {
  priceTiers: [
    { id: "2bhk", claimType: "price", label: "2BHK", blurb: "Kitchen and wardrobes for a 2BHK",
      lowText: "₹5.5L", highText: "₹9.5L",  low: 550000,  high: 950000,  currency: "INR",
      points: ["Modular kitchen", "2 wardrobes", "Standard finishes", "Written warranty"] },
    { id: "3bhk", claimType: "price", label: "3BHK", blurb: "Full-home interiors for a 3BHK", featured: true,
      lowText: "₹7.5L", highText: "₹13.5L", low: 750000,  high: 1350000, currency: "INR",
      points: ["Kitchen + 3 wardrobes", "TV & crockery units", "False ceiling & lighting", "Premium finishes"] },
    { id: "4bhk", claimType: "price", label: "4BHK", blurb: "Villas and larger homes",
      lowText: "₹10L",  highText: "₹17L",   low: 1000000, high: 1700000, currency: "INR",
      points: ["Designer-led concept", "Premium finishes throughout", "Furniture & decor styling", "Dedicated project lead"] }
  ],
  priceDisclaimer: "Illustrative starting range for planning only — not a quote. Your exact price depends on city, carpet area, and finish level, and is confirmed for free before you sign anything."
};
