/* =====================================================================
   sections/city-strip.js — the persistent city strip: "We've detected
   your city: Delhi · Change city", shown at the top of every page state
   (the IKEA-style "set your location once, see it everywhere" pattern).
   -----------------------------------------------------------------
   Three states:
   - no `city` param → honest default-city wording (this static page has
     no IP geolocation, so it never claims a detection that didn't
     happen).
   - `city` present & serviceable → "detected" wording + "Change city"
     (re-enters the existing city-capture flow, intent=delivery_check).
   - `city` present & NOT serviceable → a warning variant asking for
     delivery cost or a callback instead, using the same serviceability
     boolean the delivery_check lead already uses (this page has no real
     geo-distance check, only the approved cities list).
   ===================================================================== */
function renderCityStrip() {
  const cs = APPROVED_CONTENT.cityStrip;
  if (!cs) return '';
  const params = getParams();

  function splitTemplate(template) {
    return template.replace('{city}', '%CITY%').split('%CITY%');
  }
  function buildChangeCta() {
    const sp = new URLSearchParams(window.location.search);
    sp.set('intent', 'delivery_check');
    sp.delete('city');
    return `<a class="city-strip-cta" href="?${sp.toString()}">${escapeHtml(cs.changeCtaLabel)} →</a>`;
  }

  if (params.city) {
    const result = checkServiceability(params.city);

    if (!result.isServiceable) {
      const deliveryCta = APPROVED_CONTENT.ctas.deliveryCost;
      const callCta = APPROVED_CONTENT.ctas.callback;
      const [before, after] = splitTemplate(cs.notServiceableTemplate);
      return `
      <div class="city-strip city-strip-warn" data-claim-type="serviceability">
        <span class="city-strip-text">${escapeHtml(before)}<strong>${escapeHtml(params.city)}</strong>${escapeHtml(after || '')}</span>
        <span class="city-strip-actions">
          <a class="city-strip-cta" href="${escapeHtml(deliveryCta.href)}">${escapeHtml(deliveryCta.label)}</a>
          <a class="city-strip-cta" href="${escapeHtml(callCta.href)}">${escapeHtml(callCta.label)}</a>
        </span>
      </div>`;
    }

    const [before, after] = splitTemplate(cs.detectedTemplate);
    return `
    <div class="city-strip" data-claim-type="serviceability">
      <span class="city-strip-text">${escapeHtml(before)}<strong>${escapeHtml(result.matchedCity || params.city)}</strong>${escapeHtml(after || '')}</span>
      ${buildChangeCta()}
    </div>`;
  }

  const [before, after] = splitTemplate(cs.defaultTemplate);
  return `
  <div class="city-strip" data-claim-type="serviceability">
    <span class="city-strip-text">${escapeHtml(before)}<strong>${escapeHtml(cs.defaultCity)}</strong>${escapeHtml(after || '')}</span>
    ${buildChangeCta()}
  </div>`;
}
