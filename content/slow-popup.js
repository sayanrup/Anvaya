// content/slow-popup.js — shown ~4s in for a ?speed=slow visitor. Their
// connection is already the signal (see core/helpers.js applySpeedMode
// and index.html's font-load skip), so this offers a lighter path —
// an assistant, or a real person — instead of asking them to keep
// waiting on the page. See sections/slow-network-popup.js.
const CONTENT_SLOW_POPUP = {
  slowPopup: {
    title: "Looks like you're on a slow connection",
    body: "Tell us what you need and skip waiting on the page — an assistant or a real person can help right now."
  }
};
