# User Flow

Landing → Registration → Empty Dashboard → 3-Step Onboarding →
Instagram Connection (mock) → Connection Progress → Populated Dashboard
→ Partial/Locked Visitor Results → Pricing → (mock) Upgrade.

## 1. Landing (`/`)

Hero communicates the product in one line, with a persistent "1 week
free trial · No credit card needed" note. Sections build credibility,
explain the product, and show a live-feeling (but demo) dashboard
preview before asking for a sign-up.

## 2. Registration (`/register`)

Google or email. No email verification gate — the account is created
and the user is redirected straight to `/dashboard`.

## 3. Empty dashboard (`/dashboard`, no connected account)

Welcome header, setup checklist ("Setup N% complete"), and a blurred
"Demo data" preview of what the dashboard will look like once
connected.

## 4. Onboarding modal

Opens automatically on first dashboard visit (persisted via
`user.onboardingCompleted`). Three steps: connect explainer → dashboard
preview → visitor insights preview. Skip/back/close are always
available; skipping does not mark onboarding complete, so it can
reopen later.

## 5. Instagram connection (`/dashboard/connect` or modal)

Development-mode form. See
[`INSTAGRAM-CONNECTION.md`](./INSTAGRAM-CONNECTION.md).

## 6. Connection progress (`/dashboard/connect/progress`)

Five sequential steps animate over ~4.5–6s, then auto-redirects to the
now-populated `/dashboard`. Respects `prefers-reduced-motion`.

## 7. Populated dashboard

Metric cards, activity chart, recent visitors (one unlocked, rest
blurred/locked), activity timeline, interest breakdown, connected
account card — all carrying a "Demo dataset" indicator.

## 8. Locked visitors → pricing

`/dashboard/visitors` shows the full list with locked rows blurred.
"Unlock All Visitors" and any locked-row click routes to `/pricing`,
which repeats the trial messaging and offers `MockBillingProvider`
upgrade.
