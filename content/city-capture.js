// content/city-capture.js — shown when intent=delivery_check arrives
// without a city. Asks the one missing thing instead of dropping the
// visitor onto the generic homepage, which would ignore intent they
// already told us plainly.
const CONTENT_CITY_CAPTURE = {
  cityCapture: {
    prompt: "Which city are you looking to design a home in?",
    quickCities: ["Bengaluru", "Mumbai", "Delhi", "Noida", "Patna"],
    inputLabel: "Or type your city",
    inputPlaceholder: "e.g. Coimbatore",
    submitLabel: "Check"
  }
};
