# Architecture

Next.js 16 (App Router) + TypeScript + Tailwind CSS v4. No real backend
— see [`DEMO-MODE.md`](./DEMO-MODE.md) and
[`AUTHENTICATION.md`](./AUTHENTICATION.md).

## Folder structure

```
src/
  app/                  routes (App Router)
  components/
    marketing/          landing page sections
    auth/                login/register/forgot-password building blocks
    onboarding/          3-step onboarding modal
    connection/          Instagram connect form/modal/progress
    dashboard/           dashboard shell + widgets
    ui/                  accessible primitives (button, input, dialog, ...)
  data/                  demo dataset, pricing, navigation, FAQ (single source of truth)
  lib/                   app-state context, storage, utils, validation schemas
  providers/             InstagramConnectionProvider / BillingProvider abstractions + implementations
  services/              app-facing functions that wire providers to storage (auth, instagram-connection, billing)
  types/                 shared TypeScript models
```

## State

There is one client-side context, `AppStateProvider`
(`src/lib/app-state.tsx`), holding: the signed-in user, the connected
Instagram account, the billing subscription, and a couple of
cross-cutting UI flags (onboarding modal open, connect modal open). It
hydrates from `localStorage` on mount via the `services/*` modules.

This is intentionally a single context rather than one context per
concern — the amount of state is small and several UI entry points
(sidebar, setup checklist, onboarding step 3, topbar) all need to open
the same connect modal, so a shared, flat state tree is simpler than
prop-drilling or an event bus.

## Provider pattern

Two integration points are built as swappable interfaces so a real
backend can replace the mock without touching UI code:

- `InstagramConnectionProvider` → `MockInstagramConnectionProvider`
  (used) / `MetaOAuthInstagramConnectionProvider` (reserved, throws).
  See [`INSTAGRAM-CONNECTION.md`](./INSTAGRAM-CONNECTION.md).
- `BillingProvider` → `MockBillingProvider` (used) /
  `StripeBillingProvider` (reserved, throws).

## Data

`src/data/demo-dashboard.ts` is the single source of demo data;
`src/data/pricing.ts` is the single source of plan pricing (never
hardcode a price elsewhere); `src/data/navigation.ts` and
`src/data/faq.ts` centralize nav items and FAQ copy.

## Rendering

Pages that don't need client interactivity (legal pages, most of the
landing page) are server components. Anything touching `useAppState`,
form state, or browser storage is a client component (`"use client"`
at the top of the file).
