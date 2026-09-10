/* =====================================================================
   sections/lead.js — the personalised top-of-page block.
   -----------------------------------------------------------------
   Five mutually-exclusive renderers, one per composition rule from
   core/compose.js. Grouped in one file because they are alternate
   renderings of the same section (only one ever shows at a time),
   unlike the other files in sections/ which are all secondary content
   shown together underneath whichever of these fires.
   ===================================================================== */

function renderCostLead() {
  const price = APPROVED_CONTENT.price3bhk;
  if (!canRender(price)) return renderGenericSafe(); // guardrail fallback
  return `
  <section class="lead lead-cost">
    <h1>What will your 3BHK actually cost?</h1>
    <div class="price-block" data-claim-type="price">
      <div class="price-range">${escapeHtml(price.lowText)} – ${escapeHtml(price.highText)}</div>
      <p class="price-label">${escapeHtml(price.label)}</p>
      <p class="price-disclaimer">${escapeHtml(price.disclaimer)}</p>
    </div>
    <a class="btn btn-primary" href="${APPROVED_CONTENT.ctas.calculator.href}">${escapeHtml(APPROVED_CONTENT.ctas.calculator.label)} →</a>
  </section>`;
}

function renderCompareLead() {
  const commitments = APPROVED_CONTENT.commitments.filter(canRender);
  if (!commitments.length) return renderGenericSafe();
  return `
  <section class="lead lead-compare">
    <h1>What Anvaya commits to — in writing</h1>
    <p class="sub">No named comparisons. Just what we guarantee, every project.</p>
    <ul class="commit-grid">
      ${commitments.map(c => `<li data-claim-type="${c.claimType}"><strong>${escapeHtml(c.title)}</strong><span>${escapeHtml(c.text)}</span></li>`).join('')}
    </ul>
    <a class="btn btn-primary" href="${APPROVED_CONTENT.ctas.consultation.href}">${escapeHtml(APPROVED_CONTENT.ctas.consultation.label)} →</a>
  </section>`;
}

function renderDeliveryLead(params) {
  const svc = APPROVED_CONTENT.serviceability;
  if (!canRender(svc)) return renderGenericSafe();
  const result = checkServiceability(params.city);
  const isYes = result.isServiceable;
  const template = isYes ? svc.yesTemplate : svc.noTemplate;
  const sentence = template.replace('{city}', escapeHtml(result.matchedCity || params.city));
  const cta = isYes ? APPROVED_CONTENT.ctas.consultation : APPROVED_CONTENT.ctas.notify;
  return `
  <section class="lead lead-delivery ${isYes ? 'yes' : 'no'}">
    <div class="big-answer" data-claim-type="serviceability">${isYes ? 'YES' : 'NOT YET'}</div>
    <p class="delivery-sentence" data-claim-type="serviceability">${sentence}</p>
    <a class="btn btn-primary" href="${cta.href}">${escapeHtml(cta.label)} →</a>
  </section>`;
}

function renderCapture() {
  const qc = APPROVED_CONTENT.questionCapture;
  const currentParams = new URLSearchParams(window.location.search);
  const options = qc.options.map(opt => {
    const sp = new URLSearchParams(currentParams);
    sp.set('intent', opt.routeIntent);
    return `<a class="tap-option" href="?${sp.toString()}">${escapeHtml(opt.label)}</a>`;
  }).join('');
  return `
  <section class="lead lead-capture">
    <h1>${escapeHtml(qc.prompt)}</h1>
    <div class="tap-options">${options}</div>
  </section>`;
}

function renderGenericSafe() {
  const g = APPROVED_CONTENT.generic;
  return `
  <section class="lead lead-generic">
    <h1>${escapeHtml(g.headline)}</h1>
    <p class="sub">${escapeHtml(g.sub)}</p>
    <a class="btn btn-primary" href="${APPROVED_CONTENT.ctas.exactQuote.href}">${escapeHtml(APPROVED_CONTENT.ctas.exactQuote.label)} →</a>
  </section>`;
}
