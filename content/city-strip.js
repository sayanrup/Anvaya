// content/city-strip.js — the persistent "your city" strip at the top of
// every page state (see sections/city-strip.js). Two templates, not one:
// `detectedTemplate` only fires when `city` genuinely came in on the URL
// (a real signal this page already treats as known everywhere else —
// same as the delivery_check yes/no); `defaultTemplate` fires when there
// is no such signal and the strip is showing `defaultCity` as a plain
// placeholder default, worded so it never claims a detection that didn't
// happen.
const CONTENT_CITY_STRIP = {
  cityStrip: {
    detectedTemplate: "We've detected your city: {city}",
    defaultTemplate: "Showing prices for: {city}",
    defaultCity: "Delhi",
    changeCtaLabel: "Change city"
  }
};
