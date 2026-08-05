"use client";

import { useState } from "react";
import Link from "next/link";
import { RefreshCw } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { formatRelativeTime } from "@/lib/utils";
import { useAppState } from "@/lib/app-state";
import { useLocale } from "@/lib/locale";
import { disconnectAccount } from "@/services/instagram-connection";

export function ConnectedAccountCard() {
  const { account, setAccount, setConnectModalOpen } = useAppState();
  const { t } = useLocale();
  const [disconnecting, setDisconnecting] = useState(false);

  if (!account) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{t("dash.connectedAccount")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-text-secondary">{t("dash.noAccount")}</p>
          <Button onClick={() => setConnectModalOpen(true)}>{t("dash.connectInstagram")}</Button>
        </CardContent>
      </Card>
    );
  }

  async function handleDisconnect() {
    if (!account) return;
    setDisconnecting(true);
    await disconnectAccount(account.id);
    setAccount(null);
    setDisconnecting(false);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("dash.connectedAccount")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-3">
          <Avatar name={account.displayName} src={account.avatarUrl} size="md" className="h-11 w-11" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-text-primary">@{account.username}</p>
            <p className="text-xs text-text-secondary">{account.displayName}</p>
          </div>
          <Badge variant={account.connectionStatus === "connected" ? "success" : "danger"}>
            {account.connectionStatus === "connected" ? t("dash.connected") : t("dash.disconnected")}
          </Badge>
        </div>

        <dl className="mt-4 grid grid-cols-2 gap-3 text-xs">
          <div>
            <dt className="text-text-secondary">{t("dash.followers")}</dt>
            <dd className="font-medium text-text-primary">
              <AnimatedNumber value={account.followerCount.toLocaleString()} />
            </dd>
          </div>
          <div>
            <dt className="text-text-secondary">{t("dash.lastSync")}</dt>
            <dd className="font-medium text-text-primary">
              {account.lastSyncAt ? formatRelativeTime(account.lastSyncAt) : "—"}
            </dd>
          </div>
        </dl>

        <div className="mt-5 flex flex-wrap gap-2">
          <Button variant="secondary" size="sm" asChild>
            <Link href="/dashboard/accounts">{t("dash.manageAccount")}</Link>
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setConnectModalOpen(true)}>
            <RefreshCw className="h-3.5 w-3.5" />
            {t("dash.reconnect")}
          </Button>
          <Button variant="danger" size="sm" onClick={handleDisconnect} disabled={disconnecting}>
            {disconnecting ? t("dash.disconnecting") : t("dash.disconnect")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
