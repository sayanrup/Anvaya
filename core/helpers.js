/* =====================================================================
   core/helpers.js — small utilities shared by every section file.
   ===================================================================== */

function escapeHtml(str) {
  return String(str == null ? '' : str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function checkServiceability(cityInput) {
  if (!cityInput) return { isServiceable: false, matchedCity: null };
  const norm = cityInput.trim().toLowerCase();
  const match = APPROVED_CONTENT.cities.find(c => c.toLowerCase() === norm);
  return { isServiceable: !!match, matchedCity: match || cityInput };
}

function getParams() {
  const sp = new URLSearchParams(window.location.search);
  return {
    intent: (sp.get('intent') || '').trim().toLowerCase(),
    source: (sp.get('source') || '').trim().toLowerCase(),
    city:   (sp.get('city') || '').trim(),
    speed:  (sp.get('speed') || '').trim().toLowerCase(),
    debug:  sp.get('debug') === '1'
  };
}

function applySpeedMode(speed) {
  document.documentElement.setAttribute('data-speed', speed === 'slow' ? 'slow' : 'fast');
}
