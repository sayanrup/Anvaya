// content/reviews.js — "Homeowners, in their words." `tier` references a
// content/pricing.js price-tier id so the card can show which package
// the reviewer took (sections/reviews.js resolves it via getPriceTier()
// rather than a second typed copy of the label). Styled with a small nod
// to Google's review-card look (see sections/reviews.js) since that's a
// widely recognised visual pattern — but these are still the same
// illustrative demo quotes as before: no "Verified," no real Google
// integration, and no aggregate rating claim, since none of those are
// backed by anything real for this demo brand.
const CONTENT_REVIEWS = {
  reviews: [
    { claimType: "review", name: "Priya S.", tier: "3bhk", city: "Bengaluru", rating: 5, text: "Our 3BHK was delivered on the date they committed to, and the final bill matched the signed quote exactly." },
    { claimType: "review", name: "Arjun N.", tier: "2bhk", city: "Noida",     rating: 5, text: "The Cost Calculator gave us a firm number before we signed anything — no surprises during the project." }
  ]
};
