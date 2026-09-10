/* =====================================================================
   sections/lead.js — the personalised lead blocks for the three
   explicit, unambiguous intents. (The default/organic case lives in
   sections/hero.js; capture/city-capture below handle the two genuinely
   ambiguous cases.) Every renderer falls back to renderGenericSafe()
   (sections/hero.js) if its own required content fails canRender().
   ===================================================================== */

// ?visitor=returning: a repeat visitor who already has a quote — see
// content/returning.js for why this is a URL param, not a real cookie
// read. Takes priority over every other rule in determineRule().
function renderReturningLead() {
  const r = APPROVED_CONTENT.returning;
  if (!r) return renderGenericSafe();
  return `
  <section class="lead lead-returning" id="hero">
    <p class="kicker">${escapeHtml(r.kicker)}</p>
    <h1>${escapeHtml(r.headline)}</h1>
    <p class="sub">${escapeHtml(r.body)}</p>
    <a class="btn btn-primary" href="${APPROVED_CONTENT.ctas.primary.href}">${escapeHtml(r.primaryCtaLabel)} →</a>
    <a class="btn btn-outline" href="${APPROVED_CONTENT.ctas.secondary.href}">${escapeHtml(r.secondaryCtaLabel)}</a>
  </section>`;
}

function renderCompareLead() {
  const commitments = APPROVED_CONTENT.commitments.filter(canRender);
  if (!commitments.length) return renderGenericSafe();
  return `
  <section class="lead lead-compare" id="hero">
    <h1>What Anvaya commits to — in writing</h1>
    <p class="sub">No named comparisons. Just what we guarantee, every project.</p>
    <ul class="commit-grid">
      ${commitments.map(c => `<li data-claim-type="${c.claimType}"><strong>${escapeHtml(c.title)}</strong><span>${escapeHtml(c.text)}</span></li>`).join('')}
    </ul>
    <a class="btn btn-primary" href="${APPROVED_CONTENT.ctas.primary.href}">${escapeHtml(APPROVED_CONTENT.ctas.primary.label)} →</a>
  </section>`;
}

function renderDeliveryLead(params) {
  const svc = APPROVED_CONTENT.serviceability;
  if (!canRender(svc)) return renderGenericSafe();
  const result = checkServiceability(params.city);
  const isYes = result.isServiceable;
  const template = isYes ? svc.yesTemplate : svc.noTemplate;
  const sentence = template.replace('{city}', escapeHtml(result.matchedCity || params.city));
  const cta = isYes ? APPROVED_CONTENT.ctas.primary : APPROVED_CONTENT.ctas.notify;
  return `
  <section class="lead lead-delivery ${isYes ? 'yes' : 'no'}" id="hero">
    <div class="big-answer" data-claim-type="serviceability">${isYes ? 'YES' : 'NOT YET'}</div>
    <p class="delivery-sentence" data-claim-type="serviceability">${sentence}</p>
    <a class="btn btn-primary" href="${cta.href}">${escapeHtml(cta.label)} →</a>
  </section>`;
}

// Genuinely ambiguous visitor (source=assistant or intent=unknown): skip
// the pitch, ask once, re-route into whichever of the above then fires.
function renderCapture() {
  const qc = APPROVED_CONTENT.questionCapture;
  const currentParams = new URLSearchParams(window.location.search);
  const options = qc.options.map(opt => {
    const sp = new URLSearchParams(currentParams);
    sp.set('intent', opt.routeIntent);
    return `<a class="tap-option" href="?${sp.toString()}">${escapeHtml(opt.label)}</a>`;
  }).join('');
  return `
  <section class="lead lead-capture" id="hero">
    <h1>${escapeHtml(qc.prompt)}</h1>
    <div class="tap-options">${options}</div>
  </section>`;
}

// intent=delivery_check arrived without a city: the visitor already told
// us what they want to know, so ask the one missing thing instead of
// dropping them onto the generic hero — that would ignore stated intent.
function renderCityCapture() {
  const cc = APPROVED_CONTENT.cityCapture;
  const currentParams = new URLSearchParams(window.location.search);
  const chips = cc.quickCities.map(city => {
    const sp = new URLSearchParams(currentParams);
    sp.set('city', city);
    return `<a class="tap-option city-chip" href="?${sp.toString()}">${escapeHtml(city)}</a>`;
  }).join('');
  // Plain GET form: no backend needed, the browser builds the query
  // string itself. Hidden fields preserve every other param already set.
  const hidden = Array.from(currentParams.entries())
    .filter(([k]) => k !== 'city')
    .map(([k, v]) => `<input type="hidden" name="${escapeHtml(k)}" value="${escapeHtml(v)}">`)
    .join('');
  return `
  <section class="lead lead-city-capture" id="hero">
    <h1>${escapeHtml(cc.prompt)}</h1>
    <div class="tap-options">${chips}</div>
    <form class="city-form" method="GET" action="">
      ${hidden}
      <label class="city-form-label" for="city-input">${escapeHtml(cc.inputLabel)}</label>
      <div class="city-form-row">
        <input id="city-input" type="text" name="city" placeholder="${escapeHtml(cc.inputPlaceholder)}" autocomplete="address-level2">
        <button type="submit" class="btn btn-primary btn-inline">${escapeHtml(cc.submitLabel)}</button>
      </div>
    </form>
  </section>`;
}
