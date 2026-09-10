// content/gallery.js — "See what we build". No real project photography
// exists yet for this demo, so `imageUrl` is left unset on every project
// below and sections/gallery.js falls back to a drawn illustration
// (sections/illustrations.js) for the matching category. Add a real
// photo later by setting `imageUrl` on any entry — no code change needed,
// the fallback only applies when it's missing.
const CONTENT_GALLERY = {
  galleryCategories: [
    { id: "living-room", label: "Living Room" },
    { id: "kitchen",     label: "Kitchen" },
    { id: "bedroom",     label: "Bedroom" },
    { id: "wardrobe",    label: "Wardrobe" },
    { id: "full-home",   label: "Full Home" }
  ],
  projects: [
    { id: "p1", category: "living-room", title: "3BHK · Modern",    city: "Bengaluru", styleTag: "Modern",    imageUrl: null },
    { id: "p2", category: "kitchen",     title: "Modular Kitchen",  city: "Mumbai",    styleTag: "Compact",   imageUrl: null },
    { id: "p3", category: "bedroom",     title: "Master Bedroom",   city: "Noida",     styleTag: "Minimal",   imageUrl: null },
    { id: "p4", category: "wardrobe",    title: "Walk-in Wardrobe", city: "Delhi",     styleTag: "Classic",   imageUrl: null },
    { id: "p5", category: "full-home",   title: "4BHK · Full Home", city: "Patna",     styleTag: "Contemporary", imageUrl: null },
    { id: "p6", category: "living-room", title: "2BHK · Compact",   city: "Pune",      styleTag: "Cosy",      imageUrl: null }
  ]
};
