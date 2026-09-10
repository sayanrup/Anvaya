/* =====================================================================
   core/helpers.js — small utilities shared by every section file.
   ===================================================================== */

function escapeHtml(str) {
  return String(str == null ? '' : str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

// Looks up one price tier by id ("2bhk" | "3bhk" | "4bhk") so every
// caller reads the same object instead of holding its own copy of the
// numbers. See content/pricing.js.
function getPriceTier(id) {
  return APPROVED_CONTENT.priceTiers.find(t => t.id === id) || null;
}

// Resolves a visitor-typed city against the approved list, normalising
// common alternate/legacy names and typos first (content/serviceability.js
// → cityAliases) so "Bangalore" or "Bombay" don't wrongly read as
// unserviced just because they're not the name on our list.
function checkServiceability(cityInput) {
  if (!cityInput) return { isServiceable: false, matchedCity: null };
  const norm = cityInput.trim().toLowerCase();
  const aliased = APPROVED_CONTENT.cityAliases[norm];
  const target = (aliased || cityInput).trim().toLowerCase();
  const match = APPROVED_CONTENT.cities.find(c => c.toLowerCase() === target);
  return { isServiceable: !!match, matchedCity: match || cityInput };
}

function getParams() {
  const sp = new URLSearchParams(window.location.search);
  return {
    intent: (sp.get('intent') || '').trim().toLowerCase(),
    source: (sp.get('source') || '').trim().toLowerCase(),
    city:   (sp.get('city') || '').trim(),
    speed:  (sp.get('speed') || '').trim().toLowerCase(),
    visitor:(sp.get('visitor') || '').trim().toLowerCase(),
    debug:  sp.get('debug') === '1'
  };
}

function applySpeedMode(speed) {
  document.documentElement.setAttribute('data-speed', speed === 'slow' ? 'slow' : 'fast');
}
