// content/returning.js — the "welcome back" lead for a repeat visitor
// who already has a quote. Triggered by ?visitor=returning — a URL
// param, not a real cookie/analytics read (this is a static page with
// no backend or GA integration to read a real cookie from). In a real
// deployment this param would be set by whatever system already knows
// the visitor has a quote (a CRM link, an email campaign, a real GA-
// backed redirect) — the page itself only ever reads it from the URL,
// consistent with how every other signal on this page works.
const CONTENT_RETURNING = {
  returning: {
    kicker: "Welcome back",
    headline: "Welcome back — hope you liked what we put together.",
    body: "Your design and cost estimate are ready whenever you are. A few clicks and it's locked in.",
    primaryCtaLabel: "Let's finalize my design",
    secondaryCtaLabel: "Talk to my designer again"
  }
};
