import { RefreshCw } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatRelativeTime } from "@/lib/utils";
import { DEMO_ACCOUNT } from "@/data/demo-dashboard";

/**
 * Presentational, marketing-only mirror of the dashboard's
 * ConnectedAccountCard — always shows the demo account and never reads
 * app state, since the landing page has no signed-in user.
 */
export function StaticConnectedAccount() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Connected account</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-3">
          <Avatar name={DEMO_ACCOUNT.displayName} src={DEMO_ACCOUNT.avatarUrl} size="md" className="h-11 w-11" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-text-primary">@{DEMO_ACCOUNT.username}</p>
            <p className="text-xs text-text-secondary">{DEMO_ACCOUNT.displayName}</p>
          </div>
          <Badge variant="success">Connected</Badge>
        </div>

        <dl className="mt-4 grid grid-cols-2 gap-3 text-xs">
          <div>
            <dt className="text-text-secondary">Followers</dt>
            <dd className="font-medium text-text-primary">{DEMO_ACCOUNT.followerCount.toLocaleString()}</dd>
          </div>
          <div>
            <dt className="text-text-secondary">Last sync</dt>
            <dd className="font-medium text-text-primary">{formatRelativeTime(DEMO_ACCOUNT.lastSyncAt!)}</dd>
          </div>
        </dl>

        <div className="mt-5 flex flex-wrap gap-2" aria-hidden="true">
          <Button variant="secondary" size="sm" tabIndex={-1}>
            Manage account
          </Button>
          <Button variant="ghost" size="sm" tabIndex={-1}>
            <RefreshCw className="h-3.5 w-3.5" />
            Reconnect
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
