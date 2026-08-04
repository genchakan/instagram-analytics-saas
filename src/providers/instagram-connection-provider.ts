/**
 * Provider abstraction for connecting an Instagram account.
 *
 * SECURITY CONTRACT (see docs/SECURITY.md, docs/INSTAGRAM-CONNECTION.md):
 * - Implementations MUST NOT persist `password` anywhere (no storage, no
 *   logs, no analytics, no error reporting).
 * - Implementations MUST NOT send `password` to Instagram or any other
 *   third-party service.
 * - Implementations MUST discard `password` immediately after the
 *   connection attempt completes (success or failure).
 * - The resolved result MUST NOT contain the password in any form.
 */
export interface ConnectInstagramInput {
  username: string;
  password: string;
}

export interface ConnectInstagramProfile {
  displayName: string;
  followerCount: number;
}

export interface ConnectInstagramResult {
  connectionStatus: "connected" | "error";
  mockUsername: string;
  profile: ConnectInstagramProfile;
  timestamp: string;
}

export type InstagramProviderType = "mock" | "meta-oauth";

export interface InstagramConnectionProvider {
  readonly type: InstagramProviderType;
  connect(input: ConnectInstagramInput): Promise<ConnectInstagramResult>;
  disconnect(accountId: string): Promise<void>;
}
