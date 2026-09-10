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

## Design direction (v3): a real visual language, copied and adapted

v2 (below) fixed the page's *information architecture* — what leads,
what's a claim, what degrades safely. It still looked like a text-heavy
demo. v3 copies its visual language from a reference UI the site owner
pointed this project at
([sayanrup/home-lane-hub](https://github.com/sayanrup/home-lane-hub)) and
refits every v2 component into it:

- **Palette & type** — a warm "quiet luxury" system (Fraunces display
  serif + Manrope sans, terracotta/gold on a warm ivory ground, sharp
  corners, uppercase-tracked kicker labels) replaces the earlier flat
  red/pill-button styling. All of it lives in `styles.css`'s `:root`
  custom properties — change the look by changing values there, not by
  touching any section file.
- **Real photography** — see "On the photography" below.
- **A full-bleed photo hero**, a dark "How it works" band, feature-style
  pricing cards with a "Most chosen" tier, and a real (client-side-only)
  consult form — all styled after the reference's structural rhythm,
  described section by section in the file table below.
- **Everything from v2 underneath is unchanged**: the intent-based
  composition, the approved-content library, `canRender()`, the city
  alias map, the city-capture flow, and the 15-second engagement signal
  all still work exactly as described below — this pass only changed the
  shell they render into.

### On the photography

The 13 photos in `assets/photos/` (1 hero + 3 per gallery space,
resized/compressed from the reference repo's originals) are concept
interior renders from that same author's other project — not photographs
of an actual completed Anvaya installation, since no such project exists
for this demo brand. They're
real, high-quality images (not the CSS illustrations v2 shipped with),
just not verified as "this specific home was built by Anvaya" — the
gallery's kicker copy ("Nothing here is off the shelf...") describes the
company's actual process, not a claim about these specific frames. The
photo-or-illustration fallback system from v2 is unchanged
(`sections/illustrations.js`): any `imageUrl` in `content/hero.js` or
`content/gallery.js` can be swapped for a real captured project photo
later with no code change, and any entry that *doesn't* set one still
renders the drawn illustration.

The type pairing pulls two Google Fonts (Fraunces, Manrope) — the one
external request this otherwise fully self-contained page makes. It's
injected from a small inline bootstrap script in `index.html`, not a
plain `<link>`, specifically so a `speed=slow` visitor never fires that
request at all (see "Speed handling" below) rather than merely not
waiting on it.

## Design direction (v7): hero headline price lowered to ₹2.5L

The hero's "Starting from just..." figure now reads the **1BHK** tier's
low end (`getPriceTier('1bhk')`, ₹2.5L) instead of the 2BHK tier's
(₹3.5L) — genuinely the lowest entry point across all tiers, and a
stronger headline number for that reason. Updated everywhere the old
figure was echoed in prose (`content/faq.js`, `content/key-facts.js`,
the static baseline JSON-LD in `index.html`) so nothing on the page still
quotes the old ₹3.5L "starting from" figure — the same one-fact-one-place
discipline `getPriceTier()` already enforces at the code level, applied
here to the hand-written sentences that mention it too.

## Design direction (v6): city strip repositioned, How it works folded in

- **City strip moved** from the very top of the page to directly above
  "Indicative pricing" (`core/compose.js` `renderSecondary()`) — the
  section file itself (`sections/city-strip.js`) is unchanged, only
  where its output gets inserted.
- **"How it works" removed as its own section.** `content/how-it-works.js`
  and `sections/how-it-works.js` are gone; the four-step process is
  folded into one line directly under "Know the number before you
  commit": *Customize your requirement → Get instant quotes → Talk with
  our designers → Lock the price → We deliver within 45 days*
  (`content/pricing.js` `processFlow`, rendered by
  `sections/pricing-tiers.js`). It still feeds a `HowTo` in the JSON-LD
  (`core/jsonld.js`) — removing the visual section didn't remove it from
  the machine-readable layer, just its dedicated on-page real estate.
  The original price disclaimer ("illustrative starting range... not a
  quote") is kept too, as a smaller caption below the tier cards, so
  replacing that paragraph with the process line doesn't drop that
  disclosure from the page.

## Design direction (v5): gallery revert + city strip + layout feedback

A quick round after v4 shipped:

- **Gallery reverted, carousel kept.** The "What we design" section's
  brief detour into one big card per room category (v4) is reverted back
  to the pill-filter + horizontally-scrolling row of individual project
  cards from before that — that layout tested better. What's kept from
  v4: each card can still carry multiple photos in its own swipeable
  carousel (`content/gallery.js` `images[]`, rendered by the same
  `initGalleryCarousels()` logic, just applied to project cards again
  instead of category cards). Added a "Dining" category/chip with no
  photo yet, so it uses the drawn illustration fallback
  (`sections/illustrations.js`) until one exists.
- **A persistent city strip** (`content/city-strip.js` /
  `sections/city-strip.js`), shown at the top of every page state — the
  IKEA-style "set your location once" pattern from the original B2B
  reference doc. It only says "We've detected your city: X" when `city`
  is genuinely present on the URL (the same signal the delivery_check
  lead already treats as known); with no such signal it says "Showing
  prices for: Delhi" instead — a plain default, not a claimed detection
  this static page has no way to actually perform. "Change city →"
  re-enters the existing city-capture flow (`intent=delivery_check`)
  rather than building a second one.
- **Pricing tiers are now horizontally scrollable** too, matching the
  gallery's card-row pattern, instead of a vertical stack.
- **The "Customize as per your need" (ask-AI) section moved** to
  directly after the pricing table, per feedback — the moment someone
  has just seen a number is also the moment "or tell us exactly what you
  need instead" lands best.
- **The 360° tour now drags through real photos** — four images from
  `content/virtual-tour.js` `panoramaImages` (same photo set as the
  gallery), one per segment, replacing the earlier CSS-shape room
  illustration. The drag/wrap mechanic is unchanged; segment count is
  now read from the DOM rather than a fixed constant, since it follows
  however many photos are listed. The caption still reads honestly ("a
  preview, not a live 360° capture of a specific Anvaya home") since
  these are the same concept-render photos as the gallery, not an actual
  360° capture of a real installation.
- **A Villa-tier review** added alongside the existing 3BHK and 2BHK
  ones, so the review section shows the package spread across tiers, not
  just two adjacent ones.

## Design direction (v4): sync + polish pass

A round of feedback on v3 plus a fresh sync with the reference repo
(which had, in the meantime, gained more photography, per-space image
carousels, and its own `content-library.ts`/`personalize.ts` — a parallel
build of this same idea, independently arriving at the same "one
approved content object, one guardrail" shape):

- **Real logo** — the header/favicon mark is now `assets/logo.png`,
  cropped and resized from the reference repo's own logo asset, replacing
  the earlier placeholder "A" monogram badge.
- **Gallery synced to per-space carousels** — `content/gallery.js` is now
  four spaces (Kitchen, Bedroom, Wardrobe, Studies & Storage), each with
  3 real photos in a swipeable, infinite-looping carousel with dot
  indicators (`sections/gallery.js`), ported from the reference's own
  "Instagram-style" `ImageCarousel` React component to plain DOM events.
  Under `speed=slow` no gallery image loads at all — matching the
  reference's own `{!lowBandwidth && <ImageCarousel/>}` behaviour — the
  space still shows its title and copy, just no photo weight. The
  earlier category-pill filter is gone; each space is now its own card.
- **New pricing figures, synced with the reference's own update** —
  `content/pricing.js` moved from a 2BHK/3BHK/4BHK set to 1BHK/2BHK/3BHK/
  Villa, matching the reference project's own revised price ballparks.
  The hero's headline price changed from a ₹7.5L–₹13.5L range to
  **"Starting from just ₹3.5L"** — reading the 2BHK tier's low end
  directly (`getPriceTier('2bhk')`) rather than a number typed in the
  hero's own content, specifically so the headline figure can never
  disagree with the 2BHK row in the pricing table below it. Villa is
  open-ended ("₹12L onwards," matching the reference's own figure exactly)
  — `canRender()` and every renderer treat an `openEnded` tier as needing
  only a lower bound; no upper figure is invented to complete a range
  that was never approved.
- **Reviews restyled with package info**, styled after a familiar
  Google-reviews card layout (circular initial avatar, star row, name) —
  plus which price-tier package the reviewer took, resolved via
  `getPriceTier()` rather than a second typed copy of the label. This is
  a layout choice, not a data-source claim: the section says plainly
  ("Illustrative reviews for this demo — swap in real Google Business
  Profile reviews once available") rather than asserting these are real
  Google-sourced reviews, which isn't true for a demo brand with no real
  transactions. Swap in a real Google Reviews widget/API once real
  reviews exist; nothing else on the page needs to change.
- **"Customize as per your need"** — a new mid-page section
  (`content/customize.js` / `sections/customize.js`) whose CTA re-enters
  the page with `intent=unknown`, the exact signal `determineRule()`
  already treats as genuinely ambiguous. It's a working preview of "build
  variations as per intent" (see below): the capture mechanism already
  exists, this section just gives a visitor already on the default page
  a way to opt into it.
- **A more concise "How it works"** — the four steps moved from a long
  vertical stack to a compact 2×2 grid with tighter type and spacing.
- **Header CTA** — "Get Free Estimates" (`ctas.headerCta`), a dedicated,
  shorter-styled label distinct from the primary CTA, sized to fit the
  compact header pill at 360px.
- **This page is the default/organic template.** Explicit per-intent
  *pages* (as opposed to the existing per-intent composition *within*
  this one page) are the next phase of work, not implemented here.

## Design direction (v2): information architecture

The very first version of this page led with a text-only headline and
price. It was rebuilt around one observation: **the page had a lot of
text and almost no visual evidence**, for a category (home interiors)
that sells almost entirely on visual trust. The rebuild, in order of what
changed:

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
   layer) still exist, just collapsed behind a small "Know us in detail"
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

### Photography (superseded by v3)

Point 2 of the redesign feedback — real project photography — was the
single highest-leverage change this page could make. v2 shipped small
flat-design CSS/SVG room illustrations instead, since no real photos
existed at the time; v3 (above) replaced the hero and gallery with real
photography while keeping the exact same illustration-fallback mechanism
this paragraph originally described. The 360° tour (below) still uses the
CSS illustrations, deliberately — see "The 15-second signal" and the
tour's own copy for why a drawn illustration is the right choice there.

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
| `assets/logo.png` | The Anvaya logo mark (from the reference repo's own logo asset). |
| `assets/photos/*.jpg` | Real interior photography, 3 per gallery space + 1 hero — see "On the photography." |
| `docs/AI-PM-Writeup.md` | The graded write-up for this exercise. |
| **`content/`** | | |
| `content/brand.js` | Who Anvaya is (name, legal name, URL, description). |
| `content/nav.js` | Header quick-jump links (Designs / Pricing / Testimonials / FAQs). |
| `content/city-strip.js` | The persistent "your city" strip copy (detected vs. default template + change-city label). |
| `content/ctas.js` | Every button label on the site — one primary proposition, reused, plus a shorter `headerCta` variant for the compact header pill. |
| `content/hero.js` | Default/organic first-screen copy + hero photo. |
| `content/pricing.js` | **The only place price numbers are typed** — 1BHK/2BHK/3BHK/Villa tiers (Villa open-ended), feature bullets, + the shared disclaimer. |
| `content/gallery.js` | Gallery categories + individual project cards, each optionally carrying multiple `images` for its own carousel. |
| `content/customize.js` | "Customize as per your need" copy — its CTA re-enters the intent-capture flow. |
| `content/commitments.js` | "What Anvaya commits to" (used by the compare lead and the trust-bar chips). |
| `content/serviceability.js` | The 40-city list, the city-alias map, and the yes/no templates. |
| `content/question-capture.js` | The "what brought you here" screen (assistant/unknown visitors). |
| `content/city-capture.js` | The "which city" screen (delivery_check without a city). |
| `content/virtual-tour.js` | The demoted 360° tour fallback — now drags through real photos (`panoramaImages`). |
| `content/consult.js` | The real enquiry-form copy (fields, labels, success/error messages). |
| `content/generic.js` | Last-resort copy if the hero's own content is somehow missing. |
| `content/key-facts.js` | Quotable declarative sentences for the machine-readable layer. |
| `content/faq.js` | FAQ entries. |
| `content/reviews.js` | Customer review quotes, each tagged with a `tier` id so the card can show which package they took. |
| `content/index.js` | Merges every fragment above into the one frozen `APPROVED_CONTENT`. Loads last among content files. |
| **`core/`** | | |
| `core/guardrail.js` | `canRender()` and the approved-block registry. |
| `core/helpers.js` | `escapeHtml`, `getPriceTier`, `checkServiceability` (alias-aware), `getParams`, `applySpeedMode`. |
| `core/jsonld.js` | Builds and injects the per-visitor JSON-LD. |
| `core/compose.js` | `determineRule()` and `composePage()` — loads last overall. |
| **`sections/`** | | |
| `sections/icons.js` | A handful of small inline-SVG line icons (rupee/clock/shield/star/pin), matching the reference UI's icon look without an icon-font dependency. |
| `sections/illustrations.js` | Shared CSS/SVG room illustrations + the photo-or-illustration fallback helper. |
| `sections/hero.js` | The default/cost full-bleed photo hero + the last-resort safe fallback. |
| `sections/lead.js` | The compare / delivery_check / capture / city-capture lead blocks. |
| `sections/trust-bar.js` | The icon + label + sub-label trust strip under the hero. |
| `sections/city-strip.js` | The persistent city strip, shown at the top of every page state. |
| `sections/gallery.js` | "Every room, measured for your walls" — category-pill filter over a horizontally-scrolling row of project cards, each with its own infinite-loop carousel when it has multiple photos. |
| `sections/customize.js` | The "Customize as per your need" bridge into the capture flow — shown right after pricing. |
| `sections/pricing-tiers.js` | The 1BHK/2BHK/3BHK/Villa feature-card pricing table (horizontally scrollable), with the 3BHK marked "Most chosen." |
| `sections/key-facts.js` | The collapsed "Know us in detail" quotable facts. |
| `sections/reviews.js` | Review cards — avatar, stars, package taken, styled after a Google-reviews look (not a real Google data source). |
| `sections/virtual-tour.js` | The demoted drag-to-pan tour, now through real photos. |
| `sections/faq.js` | The FAQ accordion. |
| `sections/consult-form.js` | The real (client-side-only) enquiry form. |
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
  present in the DOM (collapsed behind "Know us in detail," per the redesign) on
  every visitor state.

**Honest limitation:** personalised JSON-LD only exists once client-side
JS runs, since this is a static site with no server. A crawler that
doesn't execute JavaScript sees the hand-authored default-state snapshot
— always true, just not personalised.

## Speed handling (`speed=slow`)

`speed=slow`: skips the Google Fonts request entirely (an inline
bootstrap script in `index.html` only injects the `<link>` when
`speed !== 'slow'`, falling back to the system font stack instead — not
just "don't wait on it," the request never fires), skips every gallery
photo entirely (`sections/gallery.js` — the space still shows its title
and copy, just no image), disables all CSS transitions/animations, and
skips the 15-second engagement nudge. The hero photo and review avatars
still load (they're single, already-compressed images), but the
12-photo, 4-carousel gallery is the one genuinely heavy thing on this
page, so it's the one thing this mode actually removes rather than just
trims.

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
