import type { ConnectedAccount } from "@/types/account";
import { MockInstagramConnectionProvider } from "@/providers/mock-instagram-provider";
import type { ConnectInstagramInput } from "@/providers/instagram-connection-provider";
import { readStorage, writeStorage, clearStorage } from "@/lib/storage";

const ACCOUNT_KEY = "connected_account";
const provider = new MockInstagramConnectionProvider();

/**
 * Orchestrates the mock connection flow. `input.password` is passed
 * straight through to the provider and is never written to storage,
 * never logged, and never included in the stored ConnectedAccount.
 */
export async function connectInstagramAccount(
  userId: string,
  input: ConnectInstagramInput,
): Promise<ConnectedAccount> {
  const result = await provider.connect(input);

  const account: ConnectedAccount = {
    id: `acc_${Math.random().toString(36).slice(2, 10)}`,
    userId,
    platform: "instagram",
    username: result.mockUsername,
    displayName: result.profile.displayName,
    avatarUrl: "",
    connectionStatus: result.connectionStatus,
    connectedAt: result.timestamp,
    lastSyncAt: result.timestamp,
    providerType: provider.type,
    followerCount: result.profile.followerCount,
    isDemo: true,
  };

  writeStorage(ACCOUNT_KEY, account);
  return account;
}

export function getStoredAccount(): ConnectedAccount | null {
  return readStorage<ConnectedAccount>(ACCOUNT_KEY);
}

export async function disconnectAccount(accountId: string): Promise<void> {
  await provider.disconnect(accountId);
  clearStorage(ACCOUNT_KEY);
}
