import type {
  ConnectInstagramInput,
  ConnectInstagramResult,
  InstagramConnectionProvider,
} from "./instagram-connection-provider";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Development-only connection simulator. See docs/INSTAGRAM-CONNECTION.md.
 *
 * This implementation never scrapes, calls, or authenticates against
 * Instagram. It never persists or logs the submitted password — the
 * `password` field is read once from `input` to satisfy the interface
 * and is never assigned to a variable that outlives this function call,
 * never written to storage, and never included in the returned result.
 */
export class MockInstagramConnectionProvider implements InstagramConnectionProvider {
  readonly type = "mock" as const;

  async connect(input: ConnectInstagramInput): Promise<ConnectInstagramResult> {
    if (!input.username.trim() || !input.password.trim()) {
      throw new Error("Username and password are required.");
    }

    await delay(900);

    // input.password is never read again after the guard above, and is
    // discarded here — it is not persisted, logged, or returned.
    const cleanUsername = input.username.trim().replace(/^@/, "");
    const followerSeed = cleanUsername
      .split("")
      .reduce((sum, char) => sum + char.charCodeAt(0), 0);

    return {
      connectionStatus: "connected",
      mockUsername: cleanUsername,
      profile: {
        displayName: cleanUsername
          .replace(/[._-]/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase()),
        followerCount: 500 + (followerSeed % 20000),
      },
      timestamp: new Date().toISOString(),
    };
  }

  async disconnect(accountId: string): Promise<void> {
    void accountId;
    await delay(300);
  }
}
