# Security

## Scope of this document

This describes the security posture of the **prototype** in this
repository — not a production system. See
[`../README.md`](../README.md) and [`DEMO-MODE.md`](./DEMO-MODE.md) for
the broader "this is a prototype" context.

## Why this product will never claim real Instagram data

Instagram/Meta does not expose "who viewed my profile" data through any
official channel — not to end users, not to official API partners, not
through Meta OAuth. A product that promises this feature can only ever
be honest if it is explicit that the data is synthetic/demo (as this
one is) or if it drops the visitor-tracking claim entirely and instead
surfaces the account owner's own reach/engagement metrics via the real
Instagram Graph API. This is documented as a hard product-scope
decision — see the project's `DECISIONS.md`.

## Instagram credential handling

The Instagram connection flow in this app (`ConnectionForm` →
`connectInstagramAccount` → `MockInstagramConnectionProvider`) is a
**development-only simulator**. Concretely:

- The submitted password is passed directly from the form to
  `MockInstagramConnectionProvider.connect()` and nowhere else.
- The provider never writes the password to `localStorage`,
  `sessionStorage`, a cookie, a URL, or `console`.
- The provider discards the password after generating a mock response;
  the resolved result contains only `connectionStatus`, `mockUsername`,
  a mock `profile`, and a `timestamp`.
- No network request is made to Instagram, Meta, or any third party.
- The UI carries a visible "Development Mode" badge and helper text on
  the connection form.

See [`INSTAGRAM-CONNECTION.md`](./INSTAGRAM-CONNECTION.md) for the
provider abstraction and the migration path to a real integration.

## What is NOT implemented (by design, in this phase)

- Real authentication / session cookies — see
  [`AUTHENTICATION.md`](./AUTHENTICATION.md). Auth is a client-side
  mock backed by `localStorage`; do not treat it as secure session
  management.
- CSRF protection, rate limiting, and server-side input validation —
  there is no server in this prototype (no API routes handle
  sensitive operations), so these concerns don't yet apply. They
  become required once a real backend is introduced.
- Real payment processing — see the `BillingProvider` abstraction;
  only `MockBillingProvider` is implemented.
- Real Instagram/Meta OAuth — see
  `src/providers/meta-oauth-instagram-provider.ts`, which throws
  "not implemented" by design.

## Secrets

- No real secrets exist in this repository.
- `.env.example` lists placeholder variable names only for a future
  production integration — never commit real values to it or anywhere
  else in the repo.
