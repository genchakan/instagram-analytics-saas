import type { InstagramConnectionProvider } from "./instagram-connection-provider";

/**
 * Reserved for a future production integration using Meta OAuth and the
 * Instagram Graph API with secure server-side token handling. Not
 * implemented in this prototype — see docs/INSTAGRAM-CONNECTION.md for
 * the migration path from MockInstagramConnectionProvider.
 *
 * Note: Instagram/Meta does not expose "who viewed my profile" data
 * through any official API, so this provider can never honestly fulfill
 * a visitor-tracking feature — only account-owner analytics (reach,
 * impressions, engagement on the user's own content) are available via
 * the real Graph API for connected Business/Creator accounts.
 */
export class MetaOAuthInstagramConnectionProvider implements InstagramConnectionProvider {
  readonly type = "meta-oauth" as const;

  async connect(): Promise<never> {
    throw new Error("MetaOAuthInstagramConnectionProvider is not implemented in this prototype.");
  }

  async disconnect(): Promise<never> {
    throw new Error("MetaOAuthInstagramConnectionProvider is not implemented in this prototype.");
  }
}
