// content/pricing.js — the one place price numbers are typed.
// Every other file (hero, pricing tiers table, FAQ, key facts, JSON-LD)
// reads a tier via getPriceTier(id) in core/helpers.js rather than
// holding its own copy of the digits, so a number only ever needs
// changing here.
const CONTENT_PRICING = {
  priceTiers: [
    { id: "2bhk", claimType: "price", label: "2BHK", lowText: "₹5.5L", highText: "₹9.5L",  low: 550000,  high: 950000,  currency: "INR" },
    { id: "3bhk", claimType: "price", label: "3BHK", lowText: "₹7.5L", highText: "₹13.5L", low: 750000,  high: 1350000, currency: "INR" },
    { id: "4bhk", claimType: "price", label: "4BHK", lowText: "₹10L",  highText: "₹17L",   low: 1000000, high: 1700000, currency: "INR" }
  ],
  priceDisclaimer: "Illustrative starting range for planning only — not a quote. Your exact price depends on city, carpet area, and finish level, and is confirmed for free before you sign anything."
};
