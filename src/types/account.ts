export type ConnectionStatus = "connected" | "connecting" | "disconnected" | "error";

export type ProviderType = "mock" | "meta-oauth";

export interface ConnectedAccount {
  id: string;
  userId: string;
  platform: "instagram";
  username: string;
  displayName: string;
  avatarUrl: string;
  connectionStatus: ConnectionStatus;
  connectedAt: string | null;
  lastSyncAt: string | null;
  providerType: ProviderType;
  followerCount: number;
  isDemo: boolean;
}
