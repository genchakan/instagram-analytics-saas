# Orbit — Instagram Analytics SaaS (Prototype)

A premium SaaS **prototype** for Instagram profile intelligence: profile
activity, visitor insight signals and engagement patterns in one
dashboard.

**This is a development prototype and is not intended for production
use or real users.** See [`docs/SECURITY.md`](./docs/SECURITY.md) and
[`docs/DEMO-MODE.md`](./docs/DEMO-MODE.md) for why, and what would need
to change before any real launch.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

No environment variables are required to run the app — everything runs
on local mock providers and browser `localStorage`. See
[`.env.example`](./.env.example) for the variables a future production
integration would need.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Run the production build |
| `npm run lint` | ESLint |
| `npx tsc --noEmit` | Type-check |

## Documentation

- [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md) — folder structure, data flow, provider pattern
- [`docs/AUTHENTICATION.md`](./docs/AUTHENTICATION.md) — mock auth flow
- [`docs/INSTAGRAM-CONNECTION.md`](./docs/INSTAGRAM-CONNECTION.md) — the mock connection simulator and the path to a real Meta OAuth integration
- [`docs/DEMO-MODE.md`](./docs/DEMO-MODE.md) — what data is real vs. demo
- [`docs/SECURITY.md`](./docs/SECURITY.md) — security posture and limitations of this prototype
- [`docs/USER-FLOW.md`](./docs/USER-FLOW.md) — the end-to-end user journey
- [`docs/DESIGN-SYSTEM.md`](./docs/DESIGN-SYSTEM.md) — tokens, typography, motion, accessibility

## Product scope

This prototype deliberately never claims to show real "who visited my
Instagram profile" data — Instagram/Meta does not expose that
information through any official channel, to anyone. Every dashboard,
chart and visitor list in this app is built from a clearly labeled demo
dataset (`src/data/demo-dashboard.ts`). See
[`docs/DEMO-MODE.md`](./docs/DEMO-MODE.md).
