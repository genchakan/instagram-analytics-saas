"use client";

import dynamic from "next/dynamic";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

/**
 * recharts measures its container via a ResizeObserver after mount.
 * Statically prerendering it (as `output: "export"` does) can leave the
 * chart stuck at its content-less server render if that first
 * measurement never fires post-hydration. Loading it client-only avoids
 * the SSR render entirely.
 */
export const ActivityChartCard = dynamic(
  () => import("./activity-chart-inner").then((mod) => mod.ActivityChartCardInner),
  {
    ssr: false,
    loading: () => (
      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <CardTitle>Visitor activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-56 w-full animate-pulse rounded-[var(--radius-md)] bg-surface-2 sm:h-64" />
        </CardContent>
      </Card>
    ),
  },
);
