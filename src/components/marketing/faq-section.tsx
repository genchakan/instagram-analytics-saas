"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { getFaqItems } from "@/data/faq";
import { useLocale } from "@/lib/locale";
import { cn } from "@/lib/utils";

export function FaqSection() {
  const { t } = useLocale();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const items = getFaqItems(t);

  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <SectionHeading eyebrow={t("mkt.faqEyebrow")} title={t("mkt.faqTitle")} />

      <div className="mt-10 divide-y divide-border rounded-[var(--radius-lg)] border border-border bg-surface-1">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          const panelId = `faq-panel-${index}`;
          return (
            <div key={item.question}>
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full min-h-14 items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-secondary sm:text-base"
                >
                  {item.question}
                  <ChevronDown
                    className={cn("h-4 w-4 shrink-0 text-text-secondary transition-transform", isOpen && "rotate-180")}
                    aria-hidden="true"
                  />
                </button>
              </h3>
              {isOpen && (
                <div id={panelId} className="px-5 pb-5 text-sm text-text-secondary">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
