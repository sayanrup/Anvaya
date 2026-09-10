// content/virtual-tour.js — demoted to an optional, secondary section
// (see the point-2 feedback this page was redesigned around: real
// project visuals lead, not the CSS tour). Now drags through real
// concept photography (same provenance as the gallery — see README "On
// the photography") instead of the earlier CSS room illustration, per
// feedback; the caption is worded to match that honestly.
const CONTENT_VIRTUAL_TOUR = {
  virtualTour: {
    heading: "Prefer to look around first?",
    dragHint: "Drag to look around ↔",
    caption: "A preview, not a live 360° capture of a specific Anvaya home. Real 360° walkthroughs of finished projects are available at your nearest Experience Centre.",
    panoramaImages: ["assets/photos/hero-living.jpg", "assets/photos/kitchen.jpg", "assets/photos/bedroom.jpg", "assets/photos/wardrobe.jpg"],
    cta: { label: "Book a live tour at your nearest Experience Centre", href: "#estimate" }
  }
};
