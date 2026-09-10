/* =====================================================================
   core/compose.js — composition logic + top-level orchestration.
   -----------------------------------------------------------------
   This is the only place that decides WHICH approved block leads. It
   never touches copy directly — it picks a rule name, and the render
   functions in sections/*.js turn that rule into approved-content-only
   HTML. Must load after content.js, core/guardrail.js, core/helpers.js,
   core/jsonld.js, and every file in sections/.
   ===================================================================== */
const KNOWN_INTENTS = ['3bhk_cost', 'vs_competitor', 'delivery_check', 'unknown'];

function determineRule(p) {
  // Rule 1 — assistant-referred visitors arrive pre-informed: skip the
  // pitch entirely and go straight to intent capture, regardless of
  // whatever intent value also happens to be on the URL.
  if (p.source === 'assistant') {
    return { rule: 'capture', reason: 'source=assistant → skip pitch, capture intent' };
  }
  // Rule 2 — no usable intent: also capture.
  if (!p.intent || p.intent === 'unknown' || !KNOWN_INTENTS.includes(p.intent)) {
    const why = !p.intent ? 'intent missing'
      : p.intent === 'unknown' ? 'intent=unknown'
      : `intent unrecognised ("${p.intent}")`;
    return { rule: 'capture', reason: `${why} → capture (safe default)` };
  }
  // Rule 3 — delivery_check needs a city to answer anything. Missing it
  // is a required-parameter gap, so this degrades to the safe generic
  // block rather than guessing or asking again inside the capture flow.
  if (p.intent === 'delivery_check') {
    if (!p.city) return { rule: 'generic_safe', reason: 'delivery_check without city → required param missing, degrade to safe generic' };
    return { rule: 'delivery_check', reason: 'intent=delivery_check & city present' };
  }
  if (p.intent === '3bhk_cost')     return { rule: 'cost',    reason: 'intent=3bhk_cost' };
  if (p.intent === 'vs_competitor') return { rule: 'compare', reason: 'intent=vs_competitor' };
  // Unreachable given KNOWN_INTENTS above, kept as a last-resort guardrail.
  return { rule: 'generic_safe', reason: 'fallthrough → safe generic' };
}

function renderSecondary(context) {
  let out = renderKeyFacts();
  out += renderVirtualTour();
  if (context !== 'compare') out += renderCommitmentsStrip(); // avoid duplicating the compare lead
  out += renderFaq(context);
  out += renderReviews();
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
      leadHtml = renderCostLead(); faqContext = 'cost'; activeState = 'cost'; break;
    case 'compare':
      leadHtml = renderCompareLead(); faqContext = 'compare'; activeState = 'compare'; break;
    case 'delivery_check':
      leadHtml = renderDeliveryLead(params); faqContext = 'delivery'; activeState = 'delivery_check'; break;
    case 'capture':
      leadHtml = renderCapture(); faqContext = 'capture'; activeState = 'capture'; break;
    case 'generic_safe':
    default:
      leadHtml = renderGenericSafe(); faqContext = 'generic'; activeState = 'generic_safe'; break;
  }

  app.innerHTML = leadHtml + renderSecondary(faqContext);
  updateJsonLd(activeState, params);
  applySpeedMode(params.speed);
  if (params.debug) renderDebug(params, rule, reason);
}

document.addEventListener('DOMContentLoaded', composePage);
