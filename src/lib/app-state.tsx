"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { User } from "@/types/user";
import type { ConnectedAccount } from "@/types/account";
import type { Subscription } from "@/types/billing";
import { ensureGuestSession, signOut as authSignOut } from "@/services/auth";
import { getStoredAccount } from "@/services/instagram-connection";
import { getStoredSubscription } from "@/services/billing";

interface AppStateValue {
  user: User | null;
  account: ConnectedAccount | null;
  subscription: Subscription | null;
  hydrated: boolean;
  setUser: (user: User | null) => void;
  setAccount: (account: ConnectedAccount | null) => void;
  setSubscription: (subscription: Subscription | null) => void;
  signOut: () => void;
  connectModalOpen: boolean;
  setConnectModalOpen: (open: boolean) => void;
}

const AppStateContext = createContext<AppStateValue | null>(null);

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [account, setAccount] = useState<ConnectedAccount | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [connectModalOpen, setConnectModalOpen] = useState(false);

  useEffect(() => {
    // localStorage is only readable client-side; hydrating it here (rather
    // than during render) avoids an SSR/CSR markup mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUser(ensureGuestSession());
    setAccount(getStoredAccount());
    setSubscription(getStoredSubscription());
    setHydrated(true);
  }, []);

  const signOut = useCallback(() => {
    authSignOut();
    setUser(null);
    setAccount(null);
    setSubscription(null);
  }, []);

  return (
    <AppStateContext.Provider
      value={{
        user,
        account,
        subscription,
        hydrated,
        setUser,
        setAccount,
        setSubscription,
        signOut,
        connectModalOpen,
        setConnectModalOpen,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState(): AppStateValue {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error("useAppState must be used within AppStateProvider");
  return ctx;
}
