/* =====================================================================
   content/index.js — merges every content/*.js fragment into the one
   frozen APPROVED_CONTENT object.
   -----------------------------------------------------------------
   Splitting content into per-topic files (brand, hero, pricing, gallery,
   ...) makes each easy to find and edit on its own; merging them here
   keeps exactly ONE object for core/guardrail.js to build its approved-
   block registry from, so there is still a single fact store, not many.
   Every content/*.js fragment must load before this file; this file must
   load before core/guardrail.js and everything in sections/.
   ===================================================================== */
const APPROVED_CONTENT = Object.freeze(Object.assign(
  {},
  CONTENT_BRAND,
  CONTENT_NAV,
  CONTENT_CITY_STRIP,
  CONTENT_CTAS,
  CONTENT_HERO,
  CONTENT_PRICING,
  CONTENT_GALLERY,
  CONTENT_CUSTOMIZE,
  CONTENT_COMMITMENTS,
  CONTENT_SERVICEABILITY,
  CONTENT_QUESTION_CAPTURE,
  CONTENT_CITY_CAPTURE,
  CONTENT_VIRTUAL_TOUR,
  CONTENT_CONSULT,
  CONTENT_GENERIC,
  CONTENT_KEY_FACTS,
  CONTENT_FAQ,
  CONTENT_REVIEWS
));
