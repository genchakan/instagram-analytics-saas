# Authentication

This prototype has no real backend, so authentication is a client-side
mock (`src/services/auth.ts`) backed by `localStorage`. It exists to
make the product flow feel real end-to-end, not to demonstrate secure
session management.

## Methods

- **Continue with Google** (`continueWithGoogle`) — simulates an OAuth
  round trip and creates a mock, pre-verified user.
- **Register with email** (`registerWithEmail`) — full name, email,
  password. The account is created and the user is signed in
  immediately; there is no email-verification gate before reaching the
  dashboard. A dismissible-but-visible dashboard notice ("Verify your
  email to secure your account.") is shown instead — it never blocks
  access.
- **Log in with email** (`loginWithEmail`).
- **Forgot password** (`/forgot-password`) — simulates sending a reset
  link; no email is actually sent.

Passwords entered on these forms are used only to satisfy the
in-memory form submission and are never written to storage by
`services/auth.ts`.

## Session

`getSession()` / `updateSession()` / `signOut()` read and write a
single `User` record in `localStorage` under the app's namespaced key.
`AppStateProvider` (`src/lib/app-state.tsx`) loads this on mount and
exposes it via `useAppState()`; the `/dashboard` layout redirects to
`/login` if there's no session once the client has hydrated.

## Migration path

Swapping this for a real backend (e.g. Supabase Auth) means replacing
the implementations in `src/services/auth.ts` while keeping their
signatures — the rest of the app depends only on that module, not on
`localStorage` directly.
