# Demo Mode

Everything meaningful in this dashboard — metrics, charts, visitors,
activity, reports — is **synthetic demo data**. This document is the
single source of truth for what's real vs. demo in this prototype.

## What's demo data

- `src/data/demo-dashboard.ts` — the account, metrics, activity series,
  visitors, activity events and interest breakdown shown once a
  profile is "connected." Every record has `isDemo: true` where the
  type supports it, and values are deterministic (fixed dates/seeds) so
  screenshots stay stable across runs.
- The mock Instagram connection (`MockInstagramConnectionProvider`)
  returns a synthetic profile derived from whatever username was typed
  — it is not a real Instagram profile lookup.
- Billing (`MockBillingProvider`) simulates subscribe/cancel without a
  real payment processor.
- Reports on `/dashboard/reports` are static placeholder entries.

## What's real (functionally, within the prototype)

- The registration/login forms create a real client-side session
  (`localStorage`), and the onboarding, connect, and pricing flows
  respond to real user interaction and real component state — none of
  it is a static screenshot.
- Form validation (Zod + React Hook Form) is real.

## UI labeling rules this app follows

- Any card, chart, or table built from `demo-dashboard.ts` shows a
  "Demo data" / "Demo dataset" badge (`DemoBadge` component) somewhere
  in its container.
- The onboarding modal explicitly labels its dashboard/visitor previews
  as "Example dashboard preview" / "Demo data."
- Testimonials on the landing page are explicitly labeled as
  placeholder content, not real customer quotes.

## Why this matters

Instagram does not provide "who visited my profile" data through any
official channel. This product can only be honest by being explicit,
everywhere, that what's on screen is a demonstration — never real
visitor data. See [`SECURITY.md`](./SECURITY.md) for the full
reasoning and the project's `DECISIONS.md` for how this constraint was
decided.
