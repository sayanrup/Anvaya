# UX benchmark: Anvaya vs. home-interiors / high-consideration-purchase best practice

A cross-check of the current page against patterns established by the
category's real players (Livspace, HomeLane, DesignCafe and similar
"full-home interiors, quoted online" businesses) and by high-consideration
e-commerce more broadly (a ₹2.5L–₹12L purchase behaves more like a car or
a renovation than an impulse buy — long consideration window, high trust
bar, multiple return visits before conversion). Organised as what already
matches the category's playbook, what's a deliberate and defensible
departure, and what's a real gap worth flagging.

## Where this page already matches the category

- **Answer the price question before asking for anything.** The default
  hero leads with a real number ("Starting from just ₹2.5L") instead of
  gating price behind a form — this is the single biggest lever in this
  category's conversion research (Livspace and HomeLane both lead with an
  indicative price band on the homepage, not "get a quote" as the first
  ask), and this page does it correctly for the default/organic and
  3bhk_cost states.
- **A persistent city/serviceability signal.** The category treats
  "is this even available where I live" as a qualifying question that
  must be answered before anything else is trusted — same instinct behind
  every "enter your pincode" gate on Urban Company, Livspace, etc. The
  city strip being persistent (not just a one-time question) and now
  three-state (detected / default / not-serviceable) matches that.
- **Trust triad near the price, not buried in an About page.** Fixed
  pricing in writing, on-time delivery, written warranty — shown directly
  under the hero, not three scrolls down. This is the correct placement:
  the category's research consistently shows trust signals convert best
  adjacent to the price, not adjacent to the footer.
- **A comparison table that avoids naming a competitor.** Every real
  player in this category runs comparison content ("us vs. traditional
  contractors," "us vs. carpenters") and every one of them avoids naming
  a specific competing brand by name in it — for the same reason this
  page's guardrail forbids it: an unverifiable, legally exposed claim
  about a specific company. Anvaya's "Why choose Anvaya" table (vs. "Other
  Brands" / "Local Shops" as categories, not names) is the industry-
  standard shape for this content, not a workaround.
- **A short first form.** Four fields, two required (name, phone) is
  correctly short for a first-touch lead form in this category — the
  category's own convention is "collect just enough to call back," with
  the long intake questionnaire (room count, budget, timeline, style
  preference) coming after the first human conversation, not before it.
  This page's form matches that; a longer form here would be a regression.
- **Speed-adaptive delivery.** Skipping the web-font request and every
  gallery photo under `speed=slow` is ahead of the category's median —
  most competitors' sites are unusably heavy on a throttled connection
  (large hero video, uncompressed galleries), and a visitor on a slow
  network in this category is disproportionately a visitor from a smaller
  city the business is trying to expand into, i.e. exactly the visitor
  worth not losing to a blank white screen.

## Deliberate departures worth naming explicitly

- **No interactive cost configurator.** Livspace and HomeLane both offer
  a "select your BHK, city, and finish level" calculator that returns a
  personalised number. This page shows fixed tiers instead of a
  calculator, and its own commitments copy *references* "Anvaya's Cost
  Calculator" as if one exists. That's the one place approved copy
  slightly outruns what this static demo actually builds — worth flagging
  rather than fixing silently, since building a real configurator is a
  scope decision, not a content fix.
- **No named-competitor comparison.** As above, this is correct for this
  category (legal exposure, unverifiable numbers) — but it does mean the
  comparison table is less persuasive than it could be for a visitor
  who's actively cross-shopping two or three specific brands by name,
  which is a real and common behaviour at this price point. The honest
  trade-off: more defensible, somewhat less sharp.

## Real gaps against category convention

- **No persistent bottom CTA bar.** Every major player in this category
  (Livspace, HomeLane, DesignCafe) keeps a sticky "Get free quote" bar
  pinned to the bottom of the screen through the entire scroll, on every
  page state. This page only surfaces a bottom bar situationally — the
  15-second pricing-dwell nudge (`sections/engagement-signals.js`) and the
  two new popups — and each dismisses/fires once per tab. A visitor who
  scrolls past the pricing table without dwelling on it, ignores both
  popups, and keeps browsing has no persistent path back to the CTA
  without scrolling to find one. This is the single highest-leverage
  category-standard element genuinely missing here.
- **No visible photo/video proof of a completed, named project.** The
  gallery photos are real interior renders but are explicitly not tied to
  a specific delivered Anvaya project (documented in the README's "On the
  photography" section) — correctly not oversold as such, but the
  category's strongest converters (Livspace's "real home tours," HomeLane's
  before/after site-visit photos) lean hard on verified project proof.
  This is a content gap the guardrail is right to prevent this demo from
  faking, but it's worth naming as the thing a real launch would need to
  source before this page's trust story is complete.
- **Reviews aren't independently verifiable.** Styled after a
  Google-reviews look but explicitly not sourced from a real Google Business
  Profile (documented in the README). Category leaders link out to a
  live, click-through-verifiable review platform (Google, or their own
  review aggregator with dates and photo proof). A real launch should
  either wire this to an actual review source or visibly disclose that
  these are illustrative, the same honesty standard already applied to
  the photography.
- **Single review can't carry a comparison table's proof burden.** The
  new "Why Us" table's own qualitative claims about Anvaya ("Written
  warranty on every project," "Milestone-based, itemised upfront") would
  land harder next to a visible count — "1,200+ homes delivered,"
  "average delivery: 43 days" — the kind of aggregate figure the category
  leans on constantly. This page correctly refuses to invent one (no
  approved aggregate exists in the content library), but it's the reason
  the comparison table reads slightly thinner than a real competitor's
  equivalent section would.
- **No visible progress/status for an in-flight project** (only relevant
  post-purchase, so out of scope for a landing page, but worth naming
  since "on-time delivery, tracked stage-by-stage" is an explicit
  commitment on this page — the category's leaders increasingly show a
  sample project-tracking screenshot on the marketing site itself as
  proof of that specific claim, not just an assertion of it).

## On the two new interruption popups specifically

Both the 4-second slow-network popup and the 15-second inactivity popup
follow the category's actual convention for on-page popups (fire on a
*behavioural* signal — a stalled load, an idle visitor — not on a timer
alone or on exit-intent, which reads as more aggressive and converts
worse in this category's own A/B literature). The choice to make them
mutually exclusive and single-per-tab (`sections/popups.js`) avoids the
most common failure mode of this pattern: two lead-gen vendors' popups
firing on top of each other, which is a frequent, visible complaint on
real interior-design sites that bolt on multiple third-party tools
without coordinating them. That coordination is a small thing this demo
gets right that a lot of real production sites, running several
uncoordinated marketing scripts, do not.
