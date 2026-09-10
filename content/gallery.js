// content/gallery.js — "Every room, measured for your walls": category
// pills filter a horizontally-scrollable row of individual project
// cards (reverted to this layout per feedback — a prior pass had briefly
// changed it to one big card per room category). Each project can still
// carry multiple `images` for its own in-card carousel
// (sections/gallery.js) — that part of the newer work is kept.
// "Dining" has no real photo yet, so it falls back to a drawn
// illustration (sections/illustrations.js) — no code change needed
// later to add one, just set `images` on that project.
const CONTENT_GALLERY = {
  galleryCategories: [
    { id: "living-room", label: "Living Room" },
    { id: "kitchen",     label: "Kitchen" },
    { id: "dining",      label: "Dining" },
    { id: "bedroom",     label: "Bedroom" },
    { id: "wardrobe",    label: "Wardrobe" },
    { id: "study",       label: "Study & Storage" }
  ],
  projects: [
    { id: "p1", category: "living-room", title: "3BHK · Modern",        city: "Bengaluru", styleTag: "Warm modern",  images: ["assets/photos/hero-living.jpg"] },
    { id: "p2", category: "kitchen",     title: "Modular Kitchen",      city: "Mumbai",    styleTag: "Gold & ivory", images: ["assets/photos/kitchen.jpg", "assets/photos/kitchen-2.jpg", "assets/photos/kitchen-3.jpg"] },
    { id: "p3", category: "dining",      title: "Open-Plan Dining",     city: "Chennai",   styleTag: "Light oak",    images: [] },
    { id: "p4", category: "bedroom",     title: "Master Bedroom",       city: "Noida",     styleTag: "Walnut warm",  images: ["assets/photos/bedroom.jpg", "assets/photos/bedroom-2.jpg", "assets/photos/bedroom-3.jpg"] },
    { id: "p5", category: "wardrobe",    title: "Walk-in Wardrobe",     city: "Delhi",     styleTag: "Mirror-fit",   images: ["assets/photos/wardrobe.jpg", "assets/photos/wardrobe-2.jpg", "assets/photos/wardrobe-3.jpg"] },
    { id: "p6", category: "study",       title: "Study & Storage Wall", city: "Patna",     styleTag: "Corner-fit",   images: ["assets/photos/study.jpg", "assets/photos/study-2.jpg", "assets/photos/study-3.jpg"] },
    { id: "p7", category: "living-room", title: "2BHK · Compact",       city: "Pune",      styleTag: "Cosy",         images: ["assets/photos/hero-living.jpg"] }
  ]
};
