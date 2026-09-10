/* =====================================================================
   core/compose.js — composition logic + top-level orchestration.
   -----------------------------------------------------------------
   This is the only place that decides WHICH approved block leads. It
   never touches copy directly — it picks a rule name, and the render
   functions in sections/*.js turn that rule into approved-content-only
   HTML. Must load after content/index.js, core/guardrail.js,
   core/helpers.js, core/jsonld.js, and every file in sections/.
   ===================================================================== */
function determineRule(p) {
  // Rule 1 — assistant-referred visitors arrive pre-informed: skip the
  // pitch entirely and go straight to intent capture, regardless of
  // whatever intent value also happens to be on the URL.
  if (p.source === 'assistant') {
    return { rule: 'capture', reason: 'source=assistant → skip pitch, capture intent' };
  }
  // Rule 2 — intent explicitly unknown: also capture.
  //
  // A MISSING intent is deliberately handled differently (rule 6, below):
  // most real organic/search/direct traffic never carries an intent
  // param at all, and dropping that visitor onto "What brought you here
  // today?" instead of answering their likely question directly is an
  // unnecessary extra tap — the capture screen is for visitors who are
  // genuinely ambiguous, not merely untagged.
  if (p.intent === 'unknown') {
    return { rule: 'capture', reason: 'intent=unknown → capture' };
  }
  // Rule 3 — delivery_check needs a city to answer anything. The visitor
  // already told us their intent, so ask the one missing thing (which
  // city?) rather than dropping them onto the generic hero, which would
  // silently ignore what they asked for.
  if (p.intent === 'delivery_check') {
    if (!p.city) return { rule: 'delivery_check_needs_city', reason: 'delivery_check without city → ask which city, not the generic hero' };
    return { rule: 'delivery_check', reason: 'intent=delivery_check & city present' };
  }
  if (p.intent === 'vs_competitor') return { rule: 'compare', reason: 'intent=vs_competitor' };
  if (p.intent === '3bhk_cost')     return { rule: 'cost',    reason: 'intent=3bhk_cost' };
  // Rule 6 — missing or unrecognised intent: answer first with the
  // default hero (price + trust + one CTA) instead of asking a
  // clarifying question.
  const why = !p.intent ? 'intent missing' : `intent unrecognised ("${p.intent}")`;
  return { rule: 'hero', reason: `${why} → default hero (answer first)` };
}

function renderSecondary(faqContext) {
  let out = renderTrustBar();
  out += renderGallery();
  out += renderVirtualTour();   // demoted "prefer to look around first?" fallback, right after real photos
  out += renderHowItWorks();
  out += renderPricingTiers();
  out += renderCustomize();     // "ask AI" bridge into the intent-capture flow, right after price
  out += renderReviews();
  out += renderKeyFacts();      // collapsed "In detail" — machine-readable layer, not a human focal point
  out += renderFaq(faqContext);
  out += renderConsultForm();
  return out;
}

function renderDebug(params, rule, reason) {
  const el = document.getElementById('debug-line');
  if (!el) return;
  el.hidden = false;
  el.innerHTML =
    `<strong>debug</strong> — params read: intent=<code>${escapeHtml(params.intent) || '∅'}</code>, ` +
    `source=<code>${escapeHtml(params.source) || '∅'}</code>, ` +
    `city=<code>${escapeHtml(params.city) || '∅'}</code>, ` +
    `speed=<code>${escapeHtml(params.speed) || '∅'}</code><br>` +
    `composition rule fired: <code>${rule}</code> — ${escapeHtml(reason)}<br>` +
    `guardrail check — unapproved named-competitor claim blocked: <code>${guardrailBlockedCompetitorClaim}</code>`;
}

function composePage() {
  const params = getParams();
  const { rule, reason } = determineRule(params);
  const app = document.getElementById('app');

  let leadHtml, faqContext, activeState;
  switch (rule) {
    case 'cost':
      leadHtml = renderHero(); faqContext = 'cost'; activeState = 'cost'; break;
    case 'compare':
      leadHtml = renderCompareLead(); faqContext = 'compare'; activeState = 'compare'; break;
    case 'delivery_check':
      leadHtml = renderDeliveryLead(params); faqContext = 'delivery'; activeState = 'delivery_check'; break;
    case 'delivery_check_needs_city':
      leadHtml = renderCityCapture(); faqContext = 'delivery'; activeState = 'delivery_check_needs_city'; break;
    case 'capture':
      leadHtml = renderCapture(); faqContext = 'capture'; activeState = 'capture'; break;
    case 'hero':
    default:
      leadHtml = renderHero(); faqContext = 'generic'; activeState = 'hero'; break;
  }

  app.innerHTML = renderCityStrip() + leadHtml + renderSecondary(faqContext);
  updateJsonLd(activeState, params);
  applySpeedMode(params.speed);
  if (params.debug) renderDebug(params, rule, reason);

  // Lets sections/engagement-signals.js know the active rule and that
  // #pricing-tiers now exists in the DOM — see that file for why.
  document.dispatchEvent(new CustomEvent('anvaya:composed', { detail: { rule, activeState } }));
}

document.addEventListener('DOMContentLoaded', composePage);
