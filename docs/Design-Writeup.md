# Anvaya landing page — write-up

*Sayan Samanta*

## What this page does, in short

- One mobile-first page that reads a few signals off the URL and
  rebuilds itself for that visitor — no backend, no build step.
- It never invents a fact. Every price, date, or claim is picked from a
  small pre-approved content list, not generated on the fly.
- The goal: whatever brought someone here, they should land on the
  answer to that, not a generic pitch they have to dig through.

## Parameter variants — intent and design response

| URL signal | Visitor's intent | How the design responds |
|---|---|---|
| *(no params — most traffic)* | Just browsing, no stated intent | Default hero: price, trust signals, one clear CTA |
| `intent=3bhk_cost` | "What will a 3BHK cost me?" | Same price-first hero, tuned FAQ priority |
| `intent=vs_competitor` | Comparing us to other options | Leads with what we commit to in writing (no named-brand claims), plus a Why-Us table before pricing |
| `intent=delivery_check&city=X` | "Do you even serve my city?" | Direct YES/NOT YET for that city |
| `intent=delivery_check` (no city) | Same, but didn't say which city | Asks "which city?" instead of guessing or showing a generic page |
| `city=<not on our list>` | Visiting from an unserved city | Top city strip flips to "not serviceable yet" + a delivery-cost CTA |
| `source=assistant` | Arrived pre-briefed by an AI assistant | Skips the pitch, asks one quick question instead of repeating what they already know |
| `intent=unknown` | Explicitly unsure why they're here | Same one-question capture screen |
| `visitor=returning` | Already has a quote from us | "Welcome back" lead with a shortlist of designs already shown, straight to finalizing |
| `speed=slow` | On a visibly slow connection | Lighter page (skips fonts/images) + a popup after 4s offering AI help or a callback |
| *(no param — 15s idle)* | Landed, then went quiet | A gentle "still there?" nudge back to designs/pricing |

## Assumptions

- Brand name ("Anvaya") and the colour palette are both my own choice —
  none was supplied, so I picked something that reads as calm/premium
  for a home-interiors buyer.

## What's deliberately out of scope

- Everything **after** a CTA click — the actual RFQ/lead form journey —
  is left out on purpose. That's a conversion-funnel-optimization
  problem in its own right, separate from the personalization logic
  this exercise is about.

## KPIs

- **Leading:** CTR on the CTA, tracked separately per intent journey
  (so a weak-converting journey doesn't hide inside a strong average).
- **Lagging:** experience-centre visit rate — the real-world signal that
  the online journey actually built enough trust to act on.

## Performance / crawlability

- Only the first two folds are meant to render server-side with CSS
  inlined — that's what a bot and a first paint both see immediately.
- Everything below that loads from a separate CSS file, so the initial
  payload stays small and crawlers aren't stalled on unrelated styling.

## Built for machines, too

- Content is written in plain `<li>` list markup where it lists facts,
  so a bot can parse it without needing to understand layout — kept
  functional, not over-engineered.
- **FAQ schema** — so an assistant can lift a direct question/answer.
- **Listing schema** — so cities, price tiers, and projects read as
  structured, citable data, not just prose.

## Sections — kept, reordered, new

- **Kept:** hero, trust bar, gallery, pricing tiers, reviews, FAQ,
  consult form.
- **Reordered:** city strip moved to right before pricing; "prefer to
  look around first" (360° tour) moved to right after pricing; "How it
  works" folded into a one-line flow under the price instead of its own
  section.
- **New:** persistent city strip, Why-Us comparison table, "ask AI /
  customize" bridge, returning-visitor lead, slow-network popup,
  inactivity popup, and a collapsed machine-readable "key facts" layer.

## Use of LLMs in building this

- Used an LLM to benchmark the page against home-interiors / high-
  consideration-purchase industry UX practice.
- Used **Lovable** to explore the initial UI direction.
- Used **Claude Code** to build out the full page and take it live.
