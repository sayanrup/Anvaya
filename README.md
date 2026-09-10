# HomeLane — self-composing landing page

A single, self-contained, mobile-first HTML file (`index.html`) that composes
itself per visitor from URL query parameters — no backend, no build step, no
external requests. Works down to 360px width.

## Run it

Open `index.html` directly in a browser, or serve the repo root with any
static file server / GitHub Pages. There is nothing to build or install.

## How composition works

Four URL query parameters drive the page:

| Param    | Values                                              |
|----------|------------------------------------------------------|
| `intent` | `3bhk_cost`, `vs_competitor`, `delivery_check`, `unknown` |
| `source` | `assistant`, `search`, `paid`, `direct`               |
| `city`   | any string, e.g. `Bengaluru`, `Patna`                 |
| `speed`  | `fast`, `slow`                                        |
| `debug`  | `1` to show a debug line at the bottom                |

`determineRule()` in `index.html` turns those params into one of five
composition rules, in this precedence order:

1. `source=assistant` → **capture** — skip the pitch, ask "What brought you
   here today?" with three tap options that re-route into the rules below.
2. `intent` missing / `unknown` / not recognised → **capture** (same as above).
3. `intent=delivery_check` **with** `city` → **delivery_check** — a big
   YES / NOT YET for that city, checked against a hardcoded 40-city list.
4. `intent=delivery_check` **without** `city` → a required parameter is
   missing, so the page degrades to the **safe generic** state rather than
   guessing.
5. `intent=3bhk_cost` → **cost** — an illustrative price-range block + Cost
   Calculator CTA.
6. `intent=vs_competitor` → **compare** — a "what we commit to" block
   (fixed pricing, on-time delivery, warranty). No named-competitor claims
   are ever made — there is no such string anywhere in the content library.

## The content library (`APPROVED_CONTENT`)

Every word a visitor can see lives in one `Object.freeze`d constant near the
top of the `<script>` block. The render functions only ever *select*,
*reorder*, or (for a visitor's own city name only — not a claim) *interpolate
into an approved template*. They never write a new price, date, warranty
term, or comparison. Treat `APPROVED_CONTENT` as the thing a human signs off
on; changing what the page can say means editing that object, not the logic
around it.

## Guardrail layer

`canRender(block)` is the single gate every claim-bearing piece of content
must pass before reaching the DOM:

1. **Allow-listed claim types only** — `price`, `timeline`, `warranty`,
   `serviceability`, `review`. A `competitor` claim type, for example, is not
   on the list and is rejected outright.
2. **Reference-checked provenance** — at load time, every object inside
   `APPROVED_CONTENT` that carries a `claimType` is registered (by object
   reference) into `APPROVED_BLOCK_REGISTRY`, a `WeakSet`. `canRender` checks
   *membership*, not similarity — an object built anywhere else in the code,
   however plausible-looking, is not in the registry and is rejected.
3. **Required string present** — if the approved string a block needs is
   missing or empty, `canRender` rejects it too.

A hardcoded, unreachable `GUARDRAIL_DEMO_ATTEMPT` (a fabricated "cheaper than
[Competitor X]" claim) exists purely so `?debug=1` can show that `canRender`
rejects it — proof the gate works, not a real code path.

When a required approved string is missing, or `intent` doesn't match a
known value, the page never invents a number — it falls back to the **safe
generic** state: a "Book a free consultation for an exact quote" CTA plus
the same Key Facts / commitments / FAQ / reviews sections shown everywhere
else.

## Machine-readable layer

- **JSON-LD** (`<script type="application/ld+json" id="ld-json">`) —
  `Organization` (as `HomeAndConstructionBusiness`), `Service` (with the
  approved price range as an `Offer`), and `FAQPage`, built only from
  `APPROVED_CONTENT`. A hand-authored static snapshot ships in the raw HTML
  for the safe-generic state (so a visitor or crawler with JavaScript
  disabled still gets correct structured data); `updateJsonLd()` rewrites
  the same tag to match the active per-visitor state once JS runs — e.g. for
  a `delivery_check` visitor it folds in the concrete yes/no for their city
  as `Service.additionalProperty`.
- **Semantic markup** — every factual claim in the DOM carries
  `data-claim-type="price|timeline|warranty|serviceability|review"`.
- **Key facts** — a fixed set of five standalone, quotable declarative
  sentences near the top of the page (same on every visitor state), so a
  model lifts the correct string verbatim regardless of which lead block
  is showing.

**Honest limitation:** because this is a single static file with no server,
personalised JSON-LD only exists once client-side JS runs. A crawler that
doesn't execute JavaScript sees the hand-authored generic-state snapshot —
which is always true, just not personalised. This mirrors a real finding
from the accompanying write-up: schema.org markup is a correctness and
disambiguation tool, not by itself a citation lever, so this is a reasonable
place to accept the trade-off rather than add server infrastructure to fix it.

## Speed handling (`speed=slow`)

The whole page is one file: inline CSS, no web fonts, no images, no external
requests — so there is nothing to defer or lazy-load either way. The one
concrete difference `speed=slow` makes is disabling all CSS transitions and
animations (`html[data-speed="slow"] * { transition: none; animation: none; }`),
trading a little polish for lower paint/CPU cost on a constrained device.

## Debug line (`?debug=1`)

Appends `&debug=1` to any URL to reveal a small line at the bottom of the
page showing exactly which params were read (`intent`, `source`, `city`,
`speed`) and which composition rule fired, including the reason — useful for
a reviewer confirming the logic without reading the source.

## Demo URLs

Replace `index.html` with the deployed path (e.g. your GitHub Pages URL).
Add `&debug=1` to any of these to see the composition trace.

1. **3BHK cost-seeker** — leads with the price-ballpark block + Cost Calculator CTA
   `index.html?intent=3bhk_cost&source=search&city=Bengaluru`

2. **Comparison shopper** — leads with the "what we commit to" block, no named competitor
   `index.html?intent=vs_competitor&source=paid&city=Mumbai`

3. **City serviceability check** — leads with a big YES for a covered city
   `index.html?intent=delivery_check&source=direct&city=Patna`

   (Try an uncovered city for the NOT YET path: `index.html?intent=delivery_check&city=Shillong`)

4. **Assistant-referred / unknown intent** — skips the pitch, opens with the 15-second question capture
   `index.html?source=assistant`

   (Equivalent: `index.html?intent=unknown`)

## Context

Built from a short AI-PM write-up on the same brief — the reasoning behind
treating visitor context as a segment (not an A/B variant), why
qualified-consultation-booking rate is the leading metric instead of booked
revenue, and why schema.org markup is scoped here as correctness/
disambiguation rather than a citation lever — lives in
`HomeLane_AI_PM_Writeup.docx` (shared alongside this repo, not included here).
