"use client";

import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { SectionHeading } from "./section-heading";
import { useLocale } from "@/lib/locale";

export function Testimonials() {
  const { t } = useLocale();
  const PLACEHOLDER_QUOTES = [
    { nameKey: "mkt.quote1Name", roleKey: "mkt.illustrativeExample", quoteKey: "mkt.quote1" },
    { nameKey: "mkt.quote2Name", roleKey: "mkt.illustrativeExample", quoteKey: "mkt.quote2" },
    { nameKey: "mkt.quote3Name", roleKey: "mkt.illustrativeExample", quoteKey: "mkt.quote3" },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <SectionHeading eyebrow={t("mkt.testimonialsEyebrow")} title={t("mkt.testimonialsTitle")} />
      <div className="mt-6 flex justify-center">
        <Badge variant="warning">{t("mkt.placeholderContent")}</Badge>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-3">
        {PLACEHOLDER_QUOTES.map((item) => (
          <figure key={item.nameKey} className="rounded-[var(--radius-lg)] border border-border bg-surface-1 p-6">
            <blockquote className="text-sm text-text-secondary">&ldquo;{t(item.quoteKey)}&rdquo;</blockquote>
            <figcaption className="mt-4 flex items-center gap-3">
              <Avatar name={t(item.nameKey)} size="sm" />
              <div>
                <p className="text-sm font-medium text-text-primary">{t(item.nameKey)}</p>
                <p className="text-xs text-text-secondary">{t(item.roleKey)}</p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
