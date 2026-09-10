// content/city-strip.js — the persistent "your city" strip at the top of
// every page state (see sections/city-strip.js). Three templates:
// `detectedTemplate` fires when `city` genuinely came in on the URL and
// resolves to a serviceable city (a real signal this page already treats
// as known everywhere else — same as the delivery_check yes/no);
// `notServiceableTemplate` fires when that same `city` param does NOT
// resolve to a serviceable city — same serviceability boolean the
// delivery_check lead already uses, not a real geo-distance check;
// `defaultTemplate` fires when there is no city signal at all and the
// strip is showing `defaultCity` as a plain placeholder default, worded
// so it never claims a detection that didn't happen.
const CONTENT_CITY_STRIP = {
  cityStrip: {
    detectedTemplate: "We've detected your city: {city}",
    notServiceableTemplate: "Looks like we're not serviceable in {city} yet",
    defaultTemplate: "Showing prices for: {city}",
    defaultCity: "Delhi",
    changeCtaLabel: "Change city"
  }
};
