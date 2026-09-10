# HomeLane — AI PM Exercise: Write-up

*Sayan Samanta*

## The problem, restated

Search is going zero-click. A rising share of buyers now form their first
impression of HomeLane from an AI assistant's summary, not from our own
page. That changes the brief in two ways. First, the page has two readers
now — the human deciding on a ₹10L purchase, and the machine deciding what
to say about us. Both have to come away with the same, correct
understanding. Second, if the page composes itself per visitor, the
classic "page A vs page B for everyone" experiment quietly breaks. Most of
this write-up is about handling that second consequence honestly.

## What I built

A single mobile-first page that reads four signals from the URL —
`intent`, `source`, `city`, and connection speed — and recomposes its
headline, primary answer block, and CTA for that specific visitor. Four
states are demonstrable via query parameters: a 3BHK cost-seeker (leads
with a labelled price ballpark + Cost Calculator), a comparison shopper
(leads with what HomeLane commits to — fixed pricing, on-time delivery,
warranty — not a competitor teardown), a city serviceability check (leads
with a plain yes/no for that city), and an assistant-referred visitor
(skips the pitch, opens with a 15-second intent capture, since they
arrived pre-informed).

Crucially, every piece of copy is drawn from one human-approved content
library at the top of the file. The page selects and re-orders approved
blocks; it never writes new claims. That single design decision is what
makes the rest of this safe.

## If every visitor sees something different, what is a "variant"?

The visitor's context is a segment, not a treatment — so I don't
randomise on it. What I hold constant is the content library and the
composition logic; what I test is the ruleset within a segment. The
experiment is not "generic vs personalised for everyone," it's "for the
cost-seeker segment, does composition-rule v1 or v2 book more
consultations." This matches how segmented testing is actually meant to
work: you read results by segment, because a variant that loses on the
average can win decisively for one high-value segment — and you'd throw
that win away if you only looked at the blended number.

## The single number that tells me it worked

Not final booking. Two reasons it fails as the primary signal: the sales
cycle runs weeks, so it can't power fast iteration; and attribution has
collapsed — assistant-referred visitors often arrive looking like
branded-direct traffic, so the channel that did the work is invisible. So
the primary, leading metric is **qualified-consultation-booking rate per
segment** — a consultation booked with the visitor's intent captured.
It's the earliest signal that reliably carries downstream. Booked revenue
is reconciled later, on a cohort lag. I'd state plainly to stakeholders
that clean end-to-end page→revenue attribution is not available here,
rather than imply a precision we don't have.

A note on benchmarks: generic landing-page conversion benchmarks don't
transfer to a ₹10L, high-consideration, weeks-long purchase. That
mismatch is precisely why I instrument a leading proxy instead of quoting
an industry conversion figure that wouldn't mean anything here.

## What the system never does on its own

The guardrail is a hard line between selection and generation. The page
may freely recompose framing, ordering, and which approved block to show.
It may never generate a price, a delivery timeline, a warranty claim, or
a comparative claim about a named competitor unless a human has
pre-approved that exact string. On an anxiety purchase this size, a
hallucinated "₹4L for a 3BHK" or "cheaper than [competitor]" is a brand
and legal liability, not a bug. When intent is unrecognised or a required
approved string is missing, the page degrades gracefully toward the safe
generic version with a "book a free consultation for an exact quote"
CTA. Low confidence always degrades toward safe, never toward invented.

## The machine-readable layer — and an honest scoping of it

The page carries a structured layer (schema.org Organization / Service /
FAQ, plus claim-typed semantic markup and a quotable "Key facts" block)
so an assistant reading it lifts the correct strings. But I want to be
precise about what this layer does. Recent evidence — including Google's
May 2026 generative-search guidance and an accompanying citation study —
indicates that adding schema does not by itself measurably increase how
often AI engines cite you. So I treat the structured layer as a
correctness-and-disambiguation tool (a machine that does parse us gets
our prices and cities right), not as a citation lever.

The actual levers for AI visibility are strategic, not markup: brand
authority and positioning, content structured to answer directly (lead
with a 2–3 sentence answer, use specific numbers), freshness, and simply
not blocking AI crawlers. I'd keep the schema — other engines and the
emerging agent layer still read structured content, and "be selected by
an agent" is where this is heading — but I won't oversell it. I'd also
keep the page on HomeLane's own domain rather than a builder subdomain,
since splitting the domain would work against exactly the AI-authority
goal we're chasing.

## What I'd run next, in order

1. **Audit what the machine already says about HomeLane.** Before
   optimising our own page, I'd check how ChatGPT, Gemini, Perplexity and
   Claude currently describe us — pricing, cities, delivery. If the
   answer-engine verdict is wrong, on-site work is downstream of a battle
   we've already lost. This is the GEO muscle I built at IndiaMART, where
   AI-search traffic grew 5x once discovery content was restructured.
2. **Verify correct quoting.** Test whether the approved claims actually
   get lifted accurately by assistants — accuracy of the quote, before
   volume of the citation.
3. **Then run per-segment composition-rule tests on-site**, reading
   results by segment, starting with the highest-traffic intent.
4. **Close the attribution gap.** A "what brought you here / what were
   you told" micro-capture in the first 15 seconds is the only way to
   un-mask assistant-referred visits that currently hide inside
   branded-direct.

The through-line: the work has moved upstream of our own website.
Optimising the page while the answer engine mis-describes us is
polishing a room nobody walks into.

---

## Implementation note (added after this write-up, describing the build)

The guardrail described above — "never generate a price, a delivery
timeline, a warranty claim, or a comparative claim about a named
competitor unless a human has pre-approved that exact string" — is not
just a design principle in the shipped page; it's enforced mechanically.

At load time, every object inside the approved content library that
carries a `claimType` (`price` / `timeline` / `warranty` / `serviceability`
/ `review`) is registered **by object reference** into a `WeakSet`
(`APPROVED_BLOCK_REGISTRY`, in `core/guardrail.js`). A single function,
`canRender(block)`, is the only path any claim-bearing content takes to
reach the page, and it checks three things: the claim type is on an
allow-list (a `competitor` claim type isn't, so it's rejected outright
regardless of content); the object is actually a member of that `WeakSet`
(a lookalike object built anywhere else in the code — say, by a future
feature that assembles a comparison sentence on the fly — is not a member,
so it's rejected no matter how it's labelled); and the approved string the
block needs is present and non-empty. A missing or malformed required
field doesn't render a blank or a placeholder number — it fails closed to
the safe generic hero, per "low confidence always degrades toward safe,
never toward invented."

This is what makes the mechanism auditable rather than just
policy: a reviewer doesn't have to trust that every render path *happens*
to only use approved copy — they can point at `canRender` and see that no
other path exists.
