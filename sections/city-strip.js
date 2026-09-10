/* =====================================================================
   sections/city-strip.js — the persistent city strip: "We've detected
   your city: Delhi · Change city", shown at the top of every page state
   (the IKEA-style "set your location once, see it everywhere" pattern).
   -----------------------------------------------------------------
   Only says "detected" when a real `city` param is present — the same
   signal the delivery_check lead already treats as known. With no city
   param, it shows the honest default-city wording instead of claiming a
   detection this static page has no way to actually perform (no IP
   geolocation here). "Change city" re-enters the existing city-capture
   flow (intent=delivery_check) rather than building a second one.
   ===================================================================== */
function renderCityStrip() {
  const cs = APPROVED_CONTENT.cityStrip;
  if (!cs) return '';
  const params = getParams();

  let displayCity = cs.defaultCity;
  let template = cs.defaultTemplate;
  if (params.city) {
    const result = checkServiceability(params.city);
    displayCity = result.matchedCity || params.city;
    template = cs.detectedTemplate;
  }
  const text = template.replace('{city}', '%CITY%').split('%CITY%');

  const sp = new URLSearchParams(window.location.search);
  sp.set('intent', 'delivery_check');
  sp.delete('city');

  return `
  <div class="city-strip" data-claim-type="serviceability">
    <span class="city-strip-text">${escapeHtml(text[0])}<strong>${escapeHtml(displayCity)}</strong>${escapeHtml(text[1] || '')}</span>
    <a class="city-strip-cta" href="?${sp.toString()}">${escapeHtml(cs.changeCtaLabel)} →</a>
  </div>`;
}
