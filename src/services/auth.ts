import type { User } from "@/types/user";
import { readStorage, writeStorage, clearStorage } from "@/lib/storage";

/**
 * Local mock auth service. In this prototype there is no real backend —
 * "sign in" simply creates a session record in localStorage. Passwords
 * are used only to satisfy the form flow and are never persisted here.
 *
 * This module is the seam for swapping in a real backend (e.g. Supabase
 * auth) later without changing calling code.
 */
const SESSION_KEY = "session_user";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function makeUser(fullName: string, email: string): User {
  return {
    id: `user_${Math.random().toString(36).slice(2, 10)}`,
    fullName,
    email,
    avatarUrl: null,
    emailVerified: false,
    onboardingCompleted: false,
    createdAt: new Date().toISOString(),
  };
}

export async function registerWithEmail(input: {
  fullName: string;
  email: string;
  password: string;
}): Promise<User> {
  await delay(500);
  const user = makeUser(input.fullName, input.email);
  writeStorage(SESSION_KEY, user);
  return user;
}

export async function loginWithEmail(input: { email: string; password: string }): Promise<User> {
  await delay(500);
  const existing = readStorage<User>(SESSION_KEY);
  if (existing && existing.email === input.email) {
    return existing;
  }
  const user = makeUser(input.email.split("@")[0] ?? "Member", input.email);
  writeStorage(SESSION_KEY, user);
  return user;
}

export async function continueWithGoogle(): Promise<User> {
  await delay(600);
  const user = makeUser("Google User", "member@gmail.com");
  user.emailVerified = true;
  writeStorage(SESSION_KEY, user);
  return user;
}

export function getSession(): User | null {
  return readStorage<User>(SESSION_KEY);
}

/**
 * Presentation/demo mode: the dashboard is reachable without a signup
 * step, so a guest session is auto-provisioned the first time someone
 * lands there. This never overwrites a real session already in storage.
 */
export function ensureGuestSession(): User {
  const existing = readStorage<User>(SESSION_KEY);
  if (existing) return existing;
  const guest = makeUser("Guest", "guest@orbit.app");
  writeStorage(SESSION_KEY, guest);
  return guest;
}

export function updateSession(patch: Partial<User>): User | null {
  const current = readStorage<User>(SESSION_KEY);
  if (!current) return null;
  const updated = { ...current, ...patch };
  writeStorage(SESSION_KEY, updated);
  return updated;
}

export function signOut(): void {
  clearStorage(SESSION_KEY);
}
