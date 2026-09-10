// content/gallery.js — "Every room, measured for your walls". Synced
// with the reference project's own gallery update: four spaces, each
// with 3 real photos shown as a swipeable, infinite-looping carousel
// (sections/gallery.js) rather than one photo per card. See README "On
// the photography" for provenance — concept renders, not photographs of
// an actual completed Anvaya installation. Any `images` array can be
// emptied to fall back to the drawn illustration for that space's `id`
// (sections/illustrations.js) — no code change needed either way.
const CONTENT_GALLERY = {
  spaces: [
    { id: "kitchen",  title: "Modular Kitchens",   copy: "Soft-close hardware, moisture-proof cores, and layouts planned around how you actually cook.",
      images: ["assets/photos/kitchen.jpg", "assets/photos/kitchen-2.jpg", "assets/photos/kitchen-3.jpg"] },
    { id: "bedroom",  title: "Bedrooms",            copy: "Warm palettes, storage-first beds, and headboards made to your ceiling height.",
      images: ["assets/photos/bedroom.jpg", "assets/photos/bedroom-2.jpg", "assets/photos/bedroom-3.jpg"] },
    { id: "wardrobe", title: "Wardrobes",           copy: "Sliding, hinged or walk-in — fitted wall to wall with zero dead corners.",
      images: ["assets/photos/wardrobe.jpg", "assets/photos/wardrobe-2.jpg", "assets/photos/wardrobe-3.jpg"] },
    { id: "study",    title: "Studies & Storage",   copy: "Work nooks, crockery units and TV walls that borrow no floor space.",
      images: ["assets/photos/study.jpg", "assets/photos/study-2.jpg", "assets/photos/study-3.jpg"] }
  ]
};
