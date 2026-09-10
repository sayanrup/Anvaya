// content/serviceability.js — the only source of truth for whether
// Anvaya serves a city, plus the alias map that normalises common
// alternate/legacy names (e.g. "Bangalore") to the name on the list.
// checkServiceability() in core/helpers.js applies the alias map before
// matching against `cities` — the data lives here, the lookup logic there.
const CONTENT_SERVICEABILITY = {
  // 40 cities, incl. the ones named in the brief (Bengaluru, Mumbai,
  // Delhi, Noida, Patna).
  cities: [
    "Bengaluru","Mumbai","Delhi","Noida","Gurugram","Ghaziabad","Faridabad",
    "Pune","Hyderabad","Chennai","Kolkata","Ahmedabad","Surat","Vadodara",
    "Rajkot","Jaipur","Lucknow","Kanpur","Chandigarh","Mohali","Ludhiana",
    "Amritsar","Nagpur","Nashik","Indore","Bhopal","Coimbatore","Kochi",
    "Thiruvananthapuram","Mysuru","Mangaluru","Visakhapatnam","Vijayawada",
    "Guntur","Thane","Navi Mumbai","Dehradun","Bhubaneswar","Guwahati","Patna"
  ],

  // Lowercase alias → the exact spelling as it appears in `cities` above.
  // Covers common legacy/colonial names, spelling variants and typos a
  // real visitor might type — resolved before the exact-match lookup, so
  // "Bangalore" or "Bombay" don't wrongly read as unserviced.
  cityAliases: {
    "bangalore": "Bengaluru",
    "bengaluru": "Bengaluru",
    "bombay": "Mumbai",
    "gurgaon": "Gurugram",
    "cochin": "Kochi",
    "calcutta": "Kolkata",
    "trivandrum": "Thiruvananthapuram",
    "mysore": "Mysuru",
    "mangalore": "Mangaluru",
    "vizag": "Visakhapatnam",
    "new delhi": "Delhi",
    "gandhinagar": "Ahmedabad" // nearest serviced hub
  },

  // {city} is substituted with the visitor's own (escaped) query-param
  // value — a name echo, not a generated claim. The yes/no itself comes
  // only from a lookup against `cities` above.
  serviceability: {
    claimType: "serviceability",
    yesTemplate: "Yes — Anvaya is live in {city}, with a full design and installation team on the ground.",
    noTemplate: "Anvaya isn't operating in {city} yet. We're in 40 Indian cities today — book a free consultation and we'll notify you when we launch there."
  }
};
