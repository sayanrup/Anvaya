// content/gallery.js — "See what we build". Real photography (resized/
// compressed into assets/photos/) replaces the earlier CSS illustration
// placeholders — see README "On the photography" for provenance: these
// are concept interior photos from the same author's design-reference
// project, not photographs of an actual completed Anvaya installation.
// Any entry can drop `imageUrl` back to null/undefined to fall back to
// the drawn illustration in sections/illustrations.js — no code change
// needed either way.
const CONTENT_GALLERY = {
  galleryCategories: [
    { id: "living-room", label: "Living Room" },
    { id: "kitchen",     label: "Kitchen" },
    { id: "bedroom",     label: "Bedroom" },
    { id: "wardrobe",    label: "Wardrobe" },
    { id: "study",       label: "Study & Storage" }
  ],
  projects: [
    { id: "p1", category: "living-room", title: "3BHK · Modern",       city: "Bengaluru", styleTag: "Warm modern", imageUrl: "assets/photos/hero-living.jpg" },
    { id: "p2", category: "kitchen",     title: "Modular Kitchen",     city: "Mumbai",    styleTag: "Gold & ivory", imageUrl: "assets/photos/kitchen.jpg" },
    { id: "p3", category: "bedroom",     title: "Master Bedroom",      city: "Noida",     styleTag: "Walnut warm", imageUrl: "assets/photos/bedroom.jpg" },
    { id: "p4", category: "wardrobe",    title: "Walk-in Wardrobe",    city: "Delhi",     styleTag: "Mirror-fit", imageUrl: "assets/photos/wardrobe.jpg" },
    { id: "p5", category: "study",       title: "Study & Storage Wall",city: "Patna",     styleTag: "Corner-fit", imageUrl: "assets/photos/study.jpg" },
    { id: "p6", category: "living-room", title: "2BHK · Compact",      city: "Pune",      styleTag: "Cosy",       imageUrl: "assets/photos/hero-living.jpg" }
  ]
};
