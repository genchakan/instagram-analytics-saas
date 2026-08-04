import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { MetricSummary } from "@/types/analytics";

const TREND_ICON = { up: TrendingUp, down: TrendingDown, flat: Minus };

export function MetricCard({ metric }: { metric: MetricSummary }) {
  const TrendIcon = TREND_ICON[metric.trend];
  const trendColor =
    metric.trend === "up" ? "text-success" : metric.trend === "down" ? "text-danger" : "text-text-secondary";

  return (
    <Card>
      <CardContent className="p-4 sm:p-5">
        <p className="text-xs text-text-secondary">{metric.label}</p>
        <p className="mt-1.5 text-xl font-semibold text-text-primary sm:text-2xl">{metric.value}</p>
        <p className={cn("mt-1.5 flex items-center gap-1 text-xs font-medium", trendColor)}>
          <TrendIcon className="h-3 w-3" aria-hidden="true" />
          {metric.change > 0 ? "+" : ""}
          {metric.change}% <span className="font-normal text-text-secondary">{metric.changeLabel}</span>
        </p>
      </CardContent>
    </Card>
  );
}
