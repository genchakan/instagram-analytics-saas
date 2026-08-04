import { Lock } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "./section-heading";
import { DEMO_VISITORS } from "@/data/demo-dashboard";

export function VisitorInsightsShowcase() {
  const visitors = DEMO_VISITORS.slice(0, 5);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <SectionHeading
          align="left"
          eyebrow="Visitor insights"
          title="Know who's engaging with your profile"
          description="Every visitor gets an interest score, a status and a recent activity signal — so you can see who's worth a closer look."
        />

        <div className="rounded-[var(--radius-lg)] border border-border bg-surface-1 p-3 sm:p-4">
          <div className="mb-2 flex items-center justify-between px-2">
            <p className="text-xs text-text-secondary">Recent visitors</p>
            <Badge variant="demo">Demo data</Badge>
          </div>
          <div className="space-y-1.5">
            {visitors.map((visitor, index) => (
              <div
                key={visitor.id}
                className="flex items-center gap-3 rounded-[var(--radius-md)] px-2 py-2.5 hover:bg-surface-2"
              >
                <Avatar name={visitor.displayName} src={visitor.avatarUrl} size="sm" />
                <div className="min-w-0 flex-1">
                  <p
                    className={
                      index === 0
                        ? "truncate text-sm font-medium text-text-primary"
                        : "truncate text-sm font-medium text-text-primary blur-[3px] select-none"
                    }
                  >
                    @{visitor.username}
                  </p>
                  <p className="text-xs text-text-secondary capitalize">
                    {visitor.status.replace(/-/g, " ")}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <span className="text-xs font-semibold text-text-primary">{visitor.interestScore}</span>
                  {index !== 0 && <Lock className="h-3.5 w-3.5 text-text-secondary" aria-hidden="true" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
