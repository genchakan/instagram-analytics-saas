import { Lock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { DemoBadge } from "./demo-badge";
import { Avatar } from "@/components/ui/avatar";
import { DEMO_METRICS, DEMO_VISITORS } from "@/data/demo-dashboard";

export function EmptyStatePreview() {
  const visitors = DEMO_VISITORS.slice(0, 4);

  return (
    <div className="relative">
      <div className="mb-3 flex justify-end">
        <DemoBadge label="Demo data — preview" />
      </div>

      <div aria-hidden="true" className="pointer-events-none select-none opacity-60 blur-[1.5px]">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {DEMO_METRICS.map((metric) => (
            <Card key={metric.id}>
              <CardContent className="p-4">
                <p className="text-xs text-text-secondary">{metric.label}</p>
                <p className="mt-1.5 text-xl font-semibold text-text-primary">{metric.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-4">
          <CardContent className="flex flex-col gap-2.5 p-4 sm:p-5">
            {visitors.map((visitor) => (
              <div key={visitor.id} className="flex items-center gap-3 rounded-[var(--radius-md)] border border-border bg-surface-2 p-3">
                <Avatar name={visitor.displayName} src={visitor.avatarUrl} size="sm" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-text-primary">@{visitor.username}</p>
                  <p className="text-xs text-text-secondary">Interest score {visitor.interestScore}</p>
                </div>
                <Lock className="h-4 w-4 shrink-0 text-text-secondary" aria-hidden="true" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
