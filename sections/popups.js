/* =====================================================================
   sections/popups.js — one shared modal used by both the slow-network
   popup (sections/slow-network-popup.js) and the inactivity popup
   (sections/inactivity-popup.js), so the two can never stack on top of
   each other in the same tab. Content is passed in by the caller — this
   file only renders it, it holds no copy of its own.
   ===================================================================== */
(function () {
  const SHOWN_KEY = 'anvaya_popup_shown';

  function anyPopupShown() {
    try { return sessionStorage.getItem(SHOWN_KEY) === '1'; } catch (_) { return false; }
  }
  function markPopupShown() {
    try { sessionStorage.setItem(SHOWN_KEY, '1'); } catch (_) { /* ignore */ }
  }

  // opts: { title, body, actions: [{ label, href }, ...] }
  function showModalPopup(opts) {
    if (document.querySelector('.modal-overlay')) return; // one on screen at a time
    markPopupShown();

    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', opts.title || '');

    const actionsHtml = (opts.actions || []).map((a, i) =>
      `<a class="btn ${i === 0 ? 'btn-primary' : 'btn-outline'}" href="${escapeHtml(a.href)}">${escapeHtml(a.label)}</a>`
    ).join('');

    overlay.innerHTML = `
      <div class="modal-box">
        <button type="button" class="modal-close" aria-label="Close">×</button>
        <h3>${escapeHtml(opts.title || '')}</h3>
        <p>${escapeHtml(opts.body || '')}</p>
        <div class="modal-actions">${actionsHtml}</div>
      </div>`;

    function close() { overlay.remove(); }
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
    overlay.querySelector('.modal-close').addEventListener('click', close);

    document.body.appendChild(overlay);
  }

  window.anyPopupShown = anyPopupShown;
  window.markPopupShown = markPopupShown;
  window.showModalPopup = showModalPopup;
})();
