/* =====================================================================
   content.js — the one human-approved content library.
   -----------------------------------------------------------------
   Every string a visitor can ever see comes from this object. Every
   other file in this project only ever SELECTS, REORDERS, or (for a
   visitor's own city name only, which is not a claim) INTERPOLATES
   pieces of this object — nothing else may write a new sentence, price,
   date, or comparison. Treat this file as the thing a human signs off
   on: changing what the page can say means editing this file, and
   nothing else.

   Load order: this file must load before core/guardrail.js and every
   file in sections/, since they all read the global APPROVED_CONTENT
   defined here.
   ===================================================================== */
const APPROVED_CONTENT = Object.freeze({
  brand: {
    name: "Anvaya",
    legalName: "Anvaya Interiors Pvt Ltd",
    url: "https://sayanrup.github.io/Anvaya/",
    description: "Anvaya designs, manufactures and installs full home interiors across India, with fixed pricing confirmed before you commit, on-time delivery, and a written warranty on all work."
  },

  // Header quick-jump nav — anchors must match the `id` each section file
  // renders on its outermost <section>.
  nav: [
    { label: "Key facts", href: "#key-facts" },
    { label: "360° tour", href: "#tour" },
    { label: "FAQ", href: "#faq" },
    { label: "Reviews", href: "#reviews" }
  ],

  // Hardcoded serviceability list — the only source of truth for the
  // delivery_check composition rule. 40 cities, incl. the ones named in
  // the brief (Bengaluru, Mumbai, Delhi, Noida, Patna).
  cities: [
    "Bengaluru","Mumbai","Delhi","Noida","Gurugram","Ghaziabad","Faridabad",
    "Pune","Hyderabad","Chennai","Kolkata","Ahmedabad","Surat","Vadodara",
    "Rajkot","Jaipur","Lucknow","Kanpur","Chandigarh","Mohali","Ludhiana",
    "Amritsar","Nagpur","Nashik","Indore","Bhopal","Coimbatore","Kochi",
    "Thiruvananthapuram","Mysuru","Mangaluru","Visakhapatnam","Vijayawada",
    "Guntur","Thane","Navi Mumbai","Dehradun","Bhubaneswar","Guwahati","Patna"
  ],

  price3bhk: {
    claimType: "price",
    label: "3BHK full-home interiors — illustrative starting range",
    lowText: "₹7.5L", highText: "₹13.5L",
    low: 750000, high: 1350000, currency: "INR",
    disclaimer: "Illustrative starting range for planning only — not a quote. Your exact price depends on city, carpet area, and finish level, and is confirmed for free before you sign anything."
  },

  commitments: [
    { id:"fixed_pricing",    claimType:"price",    title:"Fixed pricing, in writing", text:"The price on your signed agreement is the price you pay — no surprise cost escalations once work begins." },
    { id:"on_time_delivery", claimType:"timeline", title:"On-time delivery",          text:"Your project is delivered on the date committed in your agreement, tracked stage-by-stage so you always know where it stands." },
    { id:"warranty",         claimType:"warranty", title:"Warranty on your interiors",text:"Every Anvaya project is backed by a written warranty covering workmanship and materials after handover." },
    { id:"cost_known_upfront",claimType:"price",   title:"Cost known before you commit", text:"Anvaya's in-house Cost Calculator gives you a firm, itemised cost before you sign — not after." }
  ],

  // {city} is substituted with the visitor's own (escaped) query-param
  // value — a name echo, not a generated claim. The yes/no itself comes
  // only from a lookup against `cities` above.
  serviceability: {
    claimType: "serviceability",
    yesTemplate: "Yes — Anvaya is live in {city}, with a full design and installation team on the ground.",
    noTemplate: "Anvaya isn't operating in {city} yet. We're in 40 Indian cities today — book a free consultation and we'll notify you when we launch there."
  },

  questionCapture: {
    prompt: "What brought you here today?",
    options: [
      { label:"How much will my home cost?", routeIntent:"3bhk_cost" },
      { label:"How is Anvaya different?",    routeIntent:"vs_competitor" },
      { label:"Is Anvaya in my city?",       routeIntent:"delivery_check" }
    ]
  },

  ctas: {
    calculator:   { label:"Try the free Cost Calculator", href:"#consultation" },
    consultation: { label:"Book a free design consultation", href:"#consultation" },
    exactQuote:   { label:"Book a free consultation for an exact quote", href:"#consultation" },
    notify:       { label:"Notify me when Anvaya launches here", href:"#consultation" }
  },

  keyFacts: [
    { id:"kf_price",    claimType:"price",         text:"A full 3BHK home interior with Anvaya typically starts in an illustrative ₹7.5L–₹13.5L range, confirmed exactly and for free before you commit." },
    { id:"kf_avg",      claimType:"price",         text:"The average Anvaya home-interiors project is valued at about ₹10 lakh." },
    { id:"kf_cities",   claimType:"serviceability",text:"Anvaya currently delivers full home interiors in 40 Indian cities, including Bengaluru, Mumbai, Delhi, Noida and Patna." },
    { id:"kf_timeline", claimType:"timeline",      text:"Anvaya commits to an on-time delivery date in writing at the start of every project." },
    { id:"kf_warranty", claimType:"warranty",      text:"Every Anvaya project carries a written warranty on workmanship and materials after handover." }
  ],

  faqs: [
    { claimType:"price",         q:"How much does a 3BHK home interior cost with Anvaya?", a:"An illustrative starting range is ₹7.5L–₹13.5L for a full 3BHK; your exact price is confirmed for free before you commit, using Anvaya's Cost Calculator." },
    { claimType:"serviceability",q:"Is Anvaya available in my city?", a:"Anvaya currently operates in 40 Indian cities, including Bengaluru, Mumbai, Delhi, Noida and Patna. Enter your city on this page for a direct yes/no." },
    { claimType:"timeline",      q:"Does Anvaya guarantee delivery dates?", a:"Yes. Anvaya commits to an on-time delivery date in writing at the start of every project." },
    { claimType:"warranty",      q:"Is there a warranty on Anvaya interiors?", a:"Yes. Every Anvaya project is backed by a written warranty covering workmanship and materials after handover." },
    { claimType:"price",         q:"How is Anvaya different from other interior providers?", a:"Anvaya commits to fixed pricing in writing, on-time delivery, and a written warranty, with your exact cost confirmed free before you commit — rather than making comparative claims about any named competitor." }
  ],

  reviews: [
    { claimType:"review", author:"Verified Anvaya customer, Bengaluru", rating:5, text:"Our 3BHK was delivered on the date they committed to, and the final bill matched the signed quote exactly." },
    { claimType:"review", author:"Verified Anvaya customer, Noida",     rating:5, text:"The Cost Calculator gave us a firm number before we signed anything — no surprises during the project." }
  ],

  generic: {
    headline: "Full home interiors, with the cost confirmed before you commit.",
    sub: "Fixed pricing in writing. On-time delivery. A written warranty. Available in 40 Indian cities."
  },

  // Not a factual claim (no price/timeline/warranty/serviceability/review
  // attached) — an experiential CTA, so canRender() lets it through freely
  // as structural content. Kept here anyway so the copy still lives in
  // one approved place rather than hardcoded inside a render function.
  virtualTour: {
    heading: "Try our 360° virtual tour",
    dragHint: "Drag to look around ↔",
    caption: "Illustrative sample tour — not a photograph of a real Anvaya home. Live 360° walkthroughs of finished projects are available at your nearest Experience Centre.",
    cta: { label: "Book a live tour at your nearest Experience Centre", href: "#consultation" }
  }
});
