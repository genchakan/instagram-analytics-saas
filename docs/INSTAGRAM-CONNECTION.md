# Instagram Connection

## The provider abstraction

All Instagram connection logic goes through the
`InstagramConnectionProvider` interface
(`src/providers/instagram-connection-provider.ts`):

```ts
interface InstagramConnectionProvider {
  readonly type: "mock" | "meta-oauth";
  connect(input: ConnectInstagramInput): Promise<ConnectInstagramResult>;
  disconnect(accountId: string): Promise<void>;
}
```

Two implementations exist:

- **`MockInstagramConnectionProvider`** (`mock-instagram-provider.ts`) —
  the one actually used in this app. Simulates a short delay, derives a
  deterministic mock profile from the submitted username, and never
  reads the password again after validating it is non-empty.
- **`MetaOAuthInstagramConnectionProvider`** (`meta-oauth-instagram-provider.ts`)
  — a reserved, unimplemented stub for a future production
  integration. Every method throws.

`src/services/instagram-connection.ts` is the seam calling code depends
on (`connectInstagramAccount`, `getStoredAccount`, `disconnectAccount`)
— it currently wires up the mock provider. Swapping providers means
changing this one file.

## Why the real feature can't exist as advertised

"Who visited my Instagram profile" is not exposed by Instagram/Meta to
anyone — not through the public app, not through the Graph API, not to
verified business partners. So `MetaOAuthInstagramConnectionProvider`
can never honestly power a visitor-tracking feature. A real Meta OAuth
integration could only power **account-owner analytics** (impressions,
reach, engagement on the connected user's own content) for
Business/Creator accounts — a materially different feature. This is a
known, intentional limitation — see the project's `DECISIONS.md`.

## UI requirements this flow must keep

- Visible "Development Mode" badge on the connection form.
- Helper text: "This prototype simulates account connection.
  Credentials are not stored or sent to Instagram."
- Disclaimer: "This application is not affiliated with Instagram or
  Meta."
- "Remember username" is offered; "remember password" is never offered.

## Data flow

1. `ConnectionForm` collects `{ username, password }`.
2. On submit, it calls `connectInstagramAccount(userId, { username, password })`.
3. That service calls `MockInstagramConnectionProvider.connect()`,
   which resolves `{ connectionStatus, mockUsername, profile, timestamp }`
   — no password anywhere in the result.
4. The service builds a `ConnectedAccount` from that result and stores
   it in `localStorage` (username/displayName/status only — never a
   password).
5. The UI navigates to `/dashboard/connect/progress`, a themed
   animation (the real "work" already finished in step 3).
