import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DEMO_INTEREST_BREAKDOWN } from "@/data/demo-dashboard";

const SEGMENTS = [
  { key: "veryHigh", label: "Very high", color: "bg-accent-highlight" },
  { key: "high", label: "High", color: "bg-accent-primary" },
  { key: "medium", label: "Medium", color: "bg-accent-secondary" },
  { key: "lowData", label: "Low data", color: "bg-surface-2" },
] as const;

export function InterestBreakdownCard() {
  const total = Object.values(DEMO_INTEREST_BREAKDOWN).reduce((a, b) => a + b, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Interest breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex h-2.5 w-full overflow-hidden rounded-full">
          {SEGMENTS.map((segment) => {
            const value = DEMO_INTEREST_BREAKDOWN[segment.key];
            const pct = (value / total) * 100;
            return <div key={segment.key} className={segment.color} style={{ width: `${pct}%` }} />;
          })}
        </div>

        <ul className="mt-4 flex flex-col gap-2.5">
          {SEGMENTS.map((segment) => {
            const value = DEMO_INTEREST_BREAKDOWN[segment.key];
            const pct = Math.round((value / total) * 100);
            return (
              <li key={segment.key} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-text-secondary">
                  <span className={`h-2 w-2 rounded-full ${segment.color}`} />
                  {segment.label}
                </span>
                <span className="font-medium text-text-primary">{pct}%</span>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
