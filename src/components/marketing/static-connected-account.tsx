"use client";

import { RefreshCw } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { formatRelativeTime } from "@/lib/utils";
import { useLocale } from "@/lib/locale";
import { DEMO_ACCOUNT } from "@/data/demo-dashboard";

/**
 * Presentational, marketing-only mirror of the dashboard's
 * ConnectedAccountCard — always shows the demo account and never reads
 * app state, since the landing page has no signed-in user.
 */
export function StaticConnectedAccount() {
  const { t } = useLocale();
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("dash.connectedAccount")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-3">
          <Avatar name={DEMO_ACCOUNT.displayName} src={DEMO_ACCOUNT.avatarUrl} size="md" className="h-11 w-11" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-text-primary">@{DEMO_ACCOUNT.username}</p>
            <p className="text-xs text-text-secondary">{DEMO_ACCOUNT.displayName}</p>
          </div>
          <Badge variant="success">{t("dash.connected")}</Badge>
        </div>

        <dl className="mt-4 grid grid-cols-2 gap-3 text-xs">
          <div>
            <dt className="text-text-secondary">{t("dash.followers")}</dt>
            <dd className="font-medium text-text-primary">
              <AnimatedNumber value={DEMO_ACCOUNT.followerCount.toLocaleString()} />
            </dd>
          </div>
          <div>
            <dt className="text-text-secondary">{t("dash.lastSync")}</dt>
            <dd className="font-medium text-text-primary">{formatRelativeTime(DEMO_ACCOUNT.lastSyncAt!)}</dd>
          </div>
        </dl>

        <div className="mt-5 flex flex-wrap gap-2" aria-hidden="true">
          <Button variant="secondary" size="sm" tabIndex={-1}>
            {t("dash.manageAccount")}
          </Button>
          <Button variant="ghost" size="sm" tabIndex={-1}>
            <RefreshCw className="h-3.5 w-3.5" />
            {t("dash.reconnect")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
