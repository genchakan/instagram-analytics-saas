"use client";

import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DEMO_VISITORS } from "@/data/demo-dashboard";
import { useLocale } from "@/lib/locale";
import { cn } from "@/lib/utils";

/**
 * A fast, above-the-fold "aha" moment: a stack of blurred visitor avatars
 * so a first-time visitor immediately grasps the core promise — real
 * people are viewing their profile, and this product reveals who —
 * before they scroll to the full dashboard preview.
 */
export function HeroVisitorTeaser() {
  const { t } = useLocale();
  const preview = DEMO_VISITORS.slice(0, 5);
  const first = preview[0];
  const extraCount = preview.length - 1;

  return (
    <div className="inline-flex items-center gap-3 rounded-full border border-border bg-surface-1/80 py-1.5 pr-4 pl-1.5 backdrop-blur">
      <div className="flex -space-x-2.5">
        {preview.map((visitor, index) => (
          <Avatar
            key={visitor.id}
            name={visitor.displayName}
            src={visitor.avatarUrl}
            size="sm"
            className={cn(
              "ring-2 ring-surface-1",
              index !== 0 && "blur-[1px] grayscale",
            )}
          />
        ))}
      </div>
      <p className="text-left text-xs text-text-secondary sm:text-sm">
        {t("mkt.teaserViewed", { username: `@${first.username}`, count: extraCount })}
      </p>
      <Badge variant="demo" className="hidden sm:inline-flex">
        {t("mkt.demoPreview")}
      </Badge>
    </div>
  );
}
