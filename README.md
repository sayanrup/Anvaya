# Anvaya — self-composing landing page

A mobile-first landing page (`index.html` + a large set of small, plain
JS/CSS files) that composes itself per visitor from URL query
parameters — no backend, no build step, no bundler, no external
requests. Works down to 360px width.

The graded write-up for this exercise — how personalisation and A/B
testing interact, the single leading metric, the guardrails, and next
steps — is at **[`docs/AI-PM-Writeup.md`](docs/AI-PM-Writeup.md)**.

## Run it

Serve the repo root with any static file server or GitHub Pages — e.g.
`python3 -m http.server` from this directory, then open `/index.html`.
Because the page is split across many files loaded via plain
`<script src>` / `<link>` tags, it must be served over `http(s)://`;
opening `index.html` directly via a `file://` URL will fail to load the
other files in most browsers.

## Design direction (v2)

The first version of this page led with a text-only headline and price.
It was rebuilt around one observation: **the page had a lot of text and
almost no visual evidence**, for a category (home interiors) that sells
almost entirely on visual trust. The rebuild, in order of what changed:

1. **A real first-screen hero** — a visual (an illustration, since no
   real project photography exists yet for this demo brand — see
   "Illustrations, not photos" below) occupying roughly half the first
   viewport, headline, price range, trust line, and one dominant CTA, all
   above the fold.
2. **"See what we build"** — a swipeable project gallery is now the
   primary visual section; the CSS-only 360° tour from v1 is demoted to
   an optional, clearly-labelled fallback further down the page.
3. **Trust moved up, key facts moved down** — a compact trust bar (cities
   count + each commitment, as short chips) sits directly under the hero;
   the fuller quotable "Key facts" sentences (for the machine-readable
   layer) still exist, just collapsed behind a small "In detail"
   disclosure lower on the page rather than dominating the first screen.
4. **One specific CTA** — "Get my exact estimate" (primary) / "Talk to a
   designer" (secondary), replacing the generic "Book a free design
   consultation" everywhere. It states the site's actual proposition:
   know your cost before you commit.
5. **The capture screen is no longer the default for ordinary
   visitors.** See "The capture-screen fix" below — this is a real logic
   change, not just a copy change.
6. **Reviews restyled** for stronger (but still honest) proof: first name
   + last initial, a star row, and a project tag, instead of an
   anonymised "Verified Anvaya customer, &lt;city&gt;" — see "On reviews"
   below for what was deliberately *not* added.
7. **"How your home gets done"** — a new four-step process section, to
   reduce perceived risk on an unfamiliar, expensive purchase.
8. **Visual category navigation** — Living Room / Kitchen / Bedroom /
   Wardrobe / Full Home pills filter the project gallery, replacing a
   purely textual jump-nav for that purpose.
9. **A calmer header** — logo, three nav links (Projects / Designs / How
   it works), one CTA ("Get estimate") — instead of a documentation-style
   pill row.
10. **A "what will my home cost?" tiers table** (2BHK / 3BHK / 4BHK), and
    a closing CTA band before the footer.
11. **The engineering underneath is unchanged in spirit** — the
    intent-based composition, the approved-content library, and the
    `canRender()` guardrail are all still exactly what decide what
    renders. This redesign only changed *what a human sees first*, not
    *what the system is allowed to say*.

### The capture-screen fix

v1 sent almost any visitor without a recognised `intent` — which is most
real organic/search/direct traffic, since intent usually isn't tagged in
a URL — to "What brought you here today?" before answering anything. For
someone who searched "3BHK interior cost" and landed here expecting an
answer, that's an unnecessary extra tap. `determineRule()` in
`core/compose.js` now only shows the capture screen for **genuinely**
ambiguous visitors — `source=assistant` (arrived pre-informed by an
assistant, so the normal pitch doesn't apply) or an explicit
`intent=unknown`. A missing or unrecognised `intent` now defaults to the
hero: answer first, with the same price + trust + CTA every visitor
would want to see anyway.

The one place this needed a matching fix: `intent=delivery_check` without
a `city` used to fall through to that same generic default, which
silently ignores intent the visitor already stated. It now shows a
focused "Which city are you looking to design a home in?" screen
(quick-tap chips for the five most common cities + a plain-text field for
any other), then re-enters the same serviceability check once a city is
known.

### Illustrations, not photos

Point 2 of the redesign feedback — real project photography — is the
single highest-leverage change this page could make, and this build
doesn't have real photos to use: no such project has actually been
built for a demo brand. Rather than fabricate stock photos and present
them as real Anvaya installations, the hero and gallery use small
flat-design CSS/SVG room illustrations (`sections/illustrations.js`),
honestly illustrative rather than passed off as real. Every illustration
call site accepts an optional `imageUrl` first (`content/gallery.js`,
`content/hero.js`) and only falls back to the drawn illustration when
it's absent — so dropping in real photography later is a content change,
not a rebuild: set `imageUrl` on a project or the hero and the matching
`<img>` renders automatically.

### On reviews

The redesign feedback asked for stronger proof: a name, a rating, a
project tag. That's implemented (`content/reviews.js`). What's
deliberately *not* added: a "Verified" badge, a third-party platform
reference (e.g. "via Google"), or an aggregate rating/review-count claim.
None of those are backed by anything real for this demo brand, and the
B2B reference doc this project also drew on is explicit that "seller
trust signals (GST-verified status, years active, review counts,
aggregate claims)" require a real, human-approved source before they
render — the same principle `canRender()` already enforces for prices,
timelines, and warranty terms.

### The 15-second signal

The brief allows personalising on "whatever a visitor does or tells us in
the first fifteen seconds," not just what they click.
`sections/engagement-signals.js` watches, only for the default/organic
hero (not for a visitor who already stated an intent), whether they
scroll to and dwell on the pricing-tiers section within the first 15
seconds. If they do, it surfaces one small, dismissible bar with a more
direct CTA — the same "See your exact 3BHK cost" proposition, just
offered earlier because the visitor's own behaviour already signalled
interest. It changes *which already-approved CTA is offered*, never any
fact, and is skipped under `speed=slow`, under
`prefers-reduced-motion`, and after it's shown once per tab.

## File layout

The page is split one-concern-per-file so a change to one part never
touches the rest. Content is further split into small per-topic
fragments (all merged into one `APPROVED_CONTENT` object by
`content/index.js`, so there is still exactly one fact store to audit,
just organised into files that are easy to find and edit individually).

| File | What it is |
|---|---|
| `index.html` | Page shell: `<head>`, static header markup, `<main id="app">` (filled by JS), footer, and the `<script>`/`<link>` includes, in load order. |
| `styles.css` | Every visual rule on the page. |
| `assets/logo.svg` | The Anvaya logo mark. |
| `docs/AI-PM-Writeup.md` | The graded write-up for this exercise. |
| **`content/`** | | |
| `content/brand.js` | Who Anvaya is (name, legal name, URL, description). |
| `content/nav.js` | Header quick-jump links. |
| `content/ctas.js` | Every button label on the site — one primary proposition, reused. |
| `content/hero.js` | Default/organic first-screen copy. |
| `content/pricing.js` | **The only place price numbers are typed** — 2BHK/3BHK/4BHK tiers + the shared disclaimer. |
| `content/gallery.js` | Gallery categories + project cards (photo-ready, illustration-backed). |
| `content/how-it-works.js` | The four-step process. |
| `content/commitments.js` | "What Anvaya commits to" (used as a lead, a strip, and trust-bar chips). |
| `content/serviceability.js` | The 40-city list, the city-alias map, and the yes/no templates. |
| `content/question-capture.js` | The "what brought you here" screen (assistant/unknown visitors). |
| `content/city-capture.js` | The "which city" screen (delivery_check without a city). |
| `content/virtual-tour.js` | The demoted 360° tour fallback. |
| `content/generic.js` | Last-resort copy if the hero's own content is somehow missing. |
| `content/key-facts.js` | Quotable declarative sentences for the machine-readable layer. |
| `content/faq.js` | FAQ entries. |
| `content/reviews.js` | Customer review quotes. |
| `content/index.js` | Merges every fragment above into the one frozen `APPROVED_CONTENT`. Loads last among content files. |
| **`core/`** | | |
| `core/guardrail.js` | `canRender()` and the approved-block registry. |
| `core/helpers.js` | `escapeHtml`, `getPriceTier`, `checkServiceability` (alias-aware), `getParams`, `applySpeedMode`. |
| `core/jsonld.js` | Builds and injects the per-visitor JSON-LD. |
| `core/compose.js` | `determineRule()` and `composePage()` — loads last overall. |
| **`sections/`** | | |
| `sections/illustrations.js` | Shared CSS/SVG room illustrations + the photo-or-illustration fallback helper. |
| `sections/hero.js` | The default/cost hero + the last-resort safe fallback. |
| `sections/lead.js` | The compare / delivery_check / capture / city-capture lead blocks. |
| `sections/trust-bar.js` | The compact trust strip under the hero. |
| `sections/gallery.js` | "See what we build" + the category filter. |
| `sections/pricing-tiers.js` | The 2BHK/3BHK/4BHK cost table. |
| `sections/how-it-works.js` | The four-step process section. |
| `sections/commitments.js` | The secondary "Why Anvaya" strip. |
| `sections/key-facts.js` | The collapsed "In detail" quotable facts. |
| `sections/reviews.js` | Review cards. |
| `sections/virtual-tour.js` | The demoted drag-to-pan tour. |
| `sections/faq.js` | The FAQ accordion. |
| `sections/final-cta.js` | The closing CTA band. |
| `sections/header.js` | Renders the header's nav links and CTA from approved content. |
| `sections/engagement-signals.js` | The 15-second dwell-based CTA elevation. |

These are plain, non-module scripts sharing one global scope, loaded in
dependency order by `index.html` — no bundler, so GitHub Pages can serve
the directory exactly as it is in the repo. All of `content/*.js` must
load first; `core/compose.js` must load last.

## How composition works

Four URL query parameters drive the page:

| Param    | Values                                              |
|----------|------------------------------------------------------|
| `intent` | `3bhk_cost`, `vs_competitor`, `delivery_check`, `unknown` |
| `source` | `assistant`, `search`, `paid`, `direct`               |
| `city`   | any string, e.g. `Bengaluru`, `Bangalore`, `Patna`    |
| `speed`  | `fast`, `slow`                                        |
| `debug`  | `1` to show a debug line at the bottom                |

`determineRule()` in `core/compose.js`, in precedence order:

1. `source=assistant` → **capture** — "What brought you here today?"
2. `intent=unknown` (explicit) → **capture**.
3. `intent=delivery_check` **with** `city` → **delivery_check** — a big
   YES / NOT YET, checked against the 40-city list (city names are
   normalised through an alias map first — see "The 'Bangalore' problem"
   below).
4. `intent=delivery_check` **without** `city` → **delivery_check_needs_city**
   — "Which city are you looking to design a home in?"
5. `intent=vs_competitor` → **compare** — "what we commit to," no named
   competitor claims anywhere in the content library.
6. `intent=3bhk_cost` → **cost** — same rendering as the default hero
   (see below), just a distinct debug label and FAQ-priority reason.
7. Missing or unrecognised `intent` → **hero** — the default first
   screen: visual, price, trust line, one CTA. Answers first.

### The "Bangalore" problem

`checkServiceability()` (`core/helpers.js`) used to do an exact,
case-insensitive match against the `cities` list — so `city=Bangalore` or
`city=Bombay` would incorrectly read as unserviced, even though
Bengaluru and Mumbai are both covered. It now resolves the input against
`content/serviceability.js`'s `cityAliases` map first (covering common
legacy names like Bangalore/Bombay/Gurgaon/Cochin/Calcutta/Mysore and a
few others) before the exact-match lookup. The alias data lives in
content (next to the city list it maps onto); the lookup logic stays in
`core/helpers.js`.

## The content library (`content/`)

Every word a visitor can see lives in the frozen `APPROVED_CONTENT`
object `content/index.js` assembles from the fragments above. The render
functions across `sections/*.js` only ever *select*, *reorder*, or (for a
visitor's own city name only — not a claim) *interpolate into an
approved template*. They never write a new price, date, warranty term, or
comparison. A price number is typed exactly once, in
`content/pricing.js`; everything else that needs it (hero, pricing table,
FAQ, key facts, JSON-LD) reads it via `getPriceTier(id)` rather than
holding its own copy.

## Guardrail layer

`canRender(block)` (in `core/guardrail.js`) is the single gate every
claim-bearing piece of content must pass before reaching the DOM:

1. **Allow-listed claim types only** — `price`, `timeline`, `warranty`,
   `serviceability`, `review`. A `competitor` claim type is not on the
   list and is rejected outright.
2. **Reference-checked provenance** — every object inside
   `APPROVED_CONTENT` that carries a `claimType` is registered (by object
   reference) into `APPROVED_BLOCK_REGISTRY`, a `WeakSet`, at load time.
   `canRender` checks *membership*, not similarity — an object built
   anywhere else in the code, however plausible-looking, is not a member
   and is rejected.
3. **Required string(s) present** — a prose block needs a non-empty
   `text`/`a`/`sentence`/etc.; a range-shaped price block (like a price
   tier) needs both `lowText` and `highText` — either way, a missing or
   malformed field fails the check.

A hardcoded, unreachable `GUARDRAIL_DEMO_ATTEMPT` (a fabricated "cheaper
than [Competitor X]" claim) exists purely so `?debug=1` reviewers can see
`canRender` reject it — proof the gate works, not a real code path.

When a required approved string is missing, or `intent` doesn't match a
known value, the page never invents a number — it falls back to
`renderGenericSafe()` (`sections/hero.js`): a minimal, safe headline plus
"Get my exact estimate."

## Machine-readable layer

- **JSON-LD** (`core/jsonld.js`) — `Organization` (as
  `HomeAndConstructionBusiness`, with individual approved `Review`
  entries — no `AggregateRating`, since there's no approved aggregate
  figure to back one), `Service` (with all three price tiers as
  `Offer`s), `FAQPage`, and a `HowTo` built from the "How it works" steps
  — all from `APPROVED_CONTENT`. A hand-authored static snapshot ships in
  the raw HTML for JS-disabled visitors/crawlers; `updateJsonLd()`
  rewrites the same tag to match the active state once JS runs (e.g.
  folding a `delivery_check` visitor's concrete yes/no into
  `Service.additionalProperty`).
- **Semantic markup** — every factual claim in the DOM carries
  `data-claim-type="price|timeline|warranty|serviceability|review"`.
- **Key facts** — five standalone, quotable declarative sentences,
  present in the DOM (collapsed behind "In detail," per the redesign) on
  every visitor state.

**Honest limitation:** personalised JSON-LD only exists once client-side
JS runs, since this is a static site with no server. A crawler that
doesn't execute JavaScript sees the hand-authored default-state snapshot
— always true, just not personalised.

## Speed handling (`speed=slow`)

No images, no web fonts, no external requests, regardless of `speed` —
nothing to defer or lazy-load either way. `speed=slow` disables all CSS
transitions/animations and skips the 15-second engagement nudge, trading
polish for lower paint/CPU cost on a constrained device.

## Debug line (`?debug=1`)

Shows exactly which params were read and which composition rule fired,
including the reason — e.g. distinguishing "intent missing → default
hero" from "intent=3bhk_cost" even though both render the same hero.

## Demo URLs

Replace `index.html` with the deployed path. Add `&debug=1` to see the
composition trace.

1. **Default/organic visitor** (no intent param — most real traffic) — the strong hero answers first
   `index.html`

2. **3BHK cost-seeker** — same hero, explicit intent
   `index.html?intent=3bhk_cost&source=search&city=Bengaluru`

3. **Comparison shopper** — "what we commit to," no named competitor
   `index.html?intent=vs_competitor&source=paid&city=Mumbai`

4. **City serviceability check**, including the alias fix
   `index.html?intent=delivery_check&source=direct&city=Bangalore` (resolves via alias → YES)
   `index.html?intent=delivery_check&city=Shillong` (uncovered city → NOT YET)
   `index.html?intent=delivery_check` (no city → "Which city?" capture)

5. **Assistant-referred / explicitly unknown** — the only cases that show the capture screen
   `index.html?source=assistant`
   `index.html?intent=unknown`

## Context

A separate, longer-horizon reference doc ("B2B Enquiry Website — Build
Reference") sketches a much larger future rebuild (an enquiry-led, B2B
marketplace-style site with per-listing serviceability, staged payment
schedules, AR previews, and a fact-store-backed guardrail) — that scope
is not implemented here; this page remains the small, mobile-first,
single-purpose demo described above.
