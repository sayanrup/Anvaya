# The logic behind this page

This page looks different depending on who's looking at it — the price
you see first, whether a popup appears, even whether the "why choose us"
table shows up before or after the pricing — none of that is random, and
none of it is hand-edited per visitor. It all comes from one small
decision engine reading a handful of signals off the URL. This is a plain
explanation of how that engine decides what to show, and — just as
important — what it refuses to do on its own.

## The one rule everything else follows

**This page never writes a new fact about itself.** Every price, delivery
promise, warranty line, and city on this page was typed once, by a
person, into a small content library. What changes per visitor is which
of those already-approved pieces gets shown, in what order, and how
they're framed — never their content. A returning visitor, a slow
connection, an unfamiliar city — each of those changes *which approved
block leads*, not what any block *says*.

That constraint is enforced in code, not just in intent: a single
gatekeeping function is the only path any price, timeline, warranty, or
serviceability claim takes to reach the screen, and it checks that the
exact object being rendered was one a person actually approved — not
something that merely looks similar. A comparison claim naming a specific
competing brand is rejected outright, unconditionally, regardless of what
it says — that category of claim was never put on the approved list in
the first place. If something required is missing, the page doesn't
guess a plausible-looking number to fill the gap; it falls back to a
minimal, safe version of itself and asks for a real conversation instead.

## What decides what you see

Five signals, read once from the page's own URL, decide the lead
section:

| You arrived... | The page shows... |
|---|---|
| already knowing what you want (e.g. asking about 3BHK cost) | the price, straight away |
| wanting to compare us to alternatives | what we commit to in writing — not a takedown of anyone else |
| asking "do you even work in my city?" | a direct yes or no for that city |
| referred by an assistant that already briefed you | one quick question, so we don't repeat what you already know |
| with no particular signal at all (most real visitors) | the default: price, trust, one clear next step |

A repeat visitor who already has a quote in hand gets a different
opening entirely — "welcome back," with a shortlist of the kind of
designs already shown to them, and a path straight to finalizing rather
than sitting through the pitch again.

Two more things run independently of which lead is showing:

- **A persistent city strip**, always visible, answers the "will you
  actually build in my city?" question honestly. If your city isn't yet
  on the covered list, it says so plainly and offers a next step, instead
  of quietly showing generic content and letting you find out later.
- **Two lightweight interruptions**, never both at once — one for a
  visibly slow connection (a quicker path than waiting out a heavy page),
  and one after a stretch of no interaction at all (a nudge back to the
  designs and pricing already on the page, not a new pitch).

## Where the "signals" actually come from

This is a self-contained page with no backend, no analytics pipeline, and
no server reading your cookies. So every one of the signals above — your
city, whether you're a returning visitor, your connection speed — is read
directly off the page's own URL. That's not a shortcut taken to save
time; it's the honest version of what a real system would do. A real
deployment would have an actual system (a CRM, an ad platform, a
geolocation service) compute these same signals and hand them to the page
the same way — as a parameter, not magic. Nothing here pretends to know
something it can't actually know: "we're not yet serviceable in your
area" means your city isn't on the approved list, not that a real
distance was measured; "welcome back" means the page was told you're
returning, not that it recognised you.

## Why it's built this way

A page selling something in the ₹2.5L–₹12L range is closer to a car
purchase than a checkout flow — long consideration window, real anxiety
about being misled, and a visitor who will absolutely notice if the
number they see today doesn't match the number they see tomorrow. In that
setting, the clever version of personalization — a page that improvises
based on what it thinks will convert — is the wrong tool. The trustworthy
version is a page that personalizes *only* what it's certain of (which
approved fact matters most to you, right now) and never touches what it
isn't certain of (an actual number, date, or claim). That's the trade this
page makes throughout: flexible in presentation, rigid about content.
