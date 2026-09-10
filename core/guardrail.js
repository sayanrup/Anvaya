/* =====================================================================
   core/guardrail.js — the single gate every claim-bearing piece of
   content must pass through before it reaches the DOM.
   -----------------------------------------------------------------
   APPROVED_BLOCK_REGISTRY is built once, by walking APPROVED_CONTENT
   (content/index.js, which must load before this file) and collecting
   every object that carries a claimType. canRender() then checks
   REFERENCE membership in that registry (not just "looks similar") — so
   only literal objects that live inside APPROVED_CONTENT can ever be
   rendered as a claim. Any code path that constructs its own object
   (e.g. a hypothetical "cheaper than a named competitor" string built
   on the fly) is *not* in the registry and canRender() rejects it, no
   matter how the block is labelled.
   ===================================================================== */
const APPROVED_BLOCK_REGISTRY = new WeakSet();
(function registerApprovedBlocks(node) {
  if (node && typeof node === 'object') {
    if (!Array.isArray(node) && node.claimType) APPROVED_BLOCK_REGISTRY.add(node);
    Object.values(node).forEach(registerApprovedBlocks);
  }
})(APPROVED_CONTENT);

const ALLOWED_CLAIM_TYPES = ['price', 'timeline', 'warranty', 'serviceability', 'review'];

// canRender(block): every claim-bearing block (price, timeline, warranty,
// serviceability, review) must pass this before it reaches the DOM.
// Structural/non-claim content (CTA labels, headings, nav links) is not
// gated — it carries no factual claim to police.
function canRender(block) {
  if (!block || typeof block !== 'object') return false;
  if (!block.claimType) return true;
  // 1) The claim type itself must be one we allow to exist at all. A
  //    "competitor" claimType, for instance, is not on this list, so it
  //    is blocked outright even before checking provenance.
  if (!ALLOWED_CLAIM_TYPES.includes(block.claimType)) return false;
  // 2) The object must be the literal one from APPROVED_CONTENT — not a
  //    lookalike built elsewhere in the code.
  if (!APPROVED_BLOCK_REGISTRY.has(block)) return false;
  // 3) The approved string(s) it needs to render must actually be
  //    present and non-empty. A required-but-missing string degrades
  //    gracefully (the caller falls back to the hero/safe block) rather
  //    than rendering a hole or inventing filler.
  //
  //    A range-shaped price claim (lowText/highText, e.g. a price tier)
  //    carries its number as a pair rather than a sentence — check that
  //    shape first, since neither end is named `text`/`disclaimer`/etc.
  if (block.lowText || block.highText) {
    return !!(block.lowText && block.highText);
  }
  const text = block.text || block.sentence || block.a || block.yesTemplate || block.noTemplate || block.disclaimer;
  return !!(text && typeof text === 'string' && text.trim());
}

// --- Guardrail demonstration (not on any real render path) -------------
// Simulates a hypothetical attempt to sneak in an unapproved, named-
// competitor comparison. It can never reach the page — this exists only
// so the block is visibly rejected in the ?debug=1 output for reviewers.
const GUARDRAIL_DEMO_ATTEMPT = { claimType: 'competitor', text: 'Cheaper than [Competitor X]' };
const guardrailBlockedCompetitorClaim = !canRender(GUARDRAIL_DEMO_ATTEMPT);
