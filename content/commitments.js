// content/commitments.js — "What Anvaya commits to". Reused in three
// places: the vs_competitor lead, the trust-bar chips (icon + short +
// sub), and the pricing-tier bullets restate the same facts in different
// words.
const CONTENT_COMMITMENTS = {
  commitments: [
    { id: "fixed_pricing",     claimType: "price",    icon: "rupee", title: "Fixed pricing, in writing",   short: "Fixed pricing",    sub: "Quoted once, honoured always", text: "The price on your signed agreement is the price you pay — no surprise cost escalations once work begins." },
    { id: "on_time_delivery",  claimType: "timeline", icon: "clock", title: "On-time delivery",            short: "On-time delivery", sub: "Tracked stage by stage",       text: "Your project is delivered on the date committed in your agreement, tracked stage-by-stage so you always know where it stands." },
    { id: "warranty",          claimType: "warranty", icon: "shield",title: "Warranty on your interiors",  short: "Written warranty", sub: "On workmanship & materials",   text: "Every Anvaya project is backed by a written warranty covering workmanship and materials after handover." },
    { id: "cost_known_upfront",claimType: "price",    icon: "star",  title: "Cost known before you commit",short: "Cost known upfront", sub: "Free Cost Calculator",       text: "Anvaya's in-house Cost Calculator gives you a firm, itemised cost before you sign — not after." }
  ]
};
