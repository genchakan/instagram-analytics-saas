"use client";

import { Languages } from "lucide-react";
import { useLocale } from "@/lib/locale";
import type { Locale } from "@/lib/translations";
import { cn } from "@/lib/utils";

const OPTIONS: { value: Locale; label: string }[] = [
  { value: "en", label: "EN" },
  { value: "tr", label: "TR" },
  { value: "de", label: "DE" },
];

export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale } = useLocale();

  return (
    <div
      className={cn(
        "flex items-center gap-1 rounded-full border border-border bg-surface-2 p-0.5 text-xs font-medium",
        className,
      )}
      role="group"
      aria-label="Language"
    >
      <Languages className="ml-1.5 h-3.5 w-3.5 text-text-secondary" aria-hidden="true" />
      {OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => setLocale(option.value)}
          className={cn(
            "rounded-full px-2 py-1 transition-colors",
            locale === option.value ? "bg-surface-1 text-text-primary" : "text-text-secondary hover:text-text-primary",
          )}
          aria-pressed={locale === option.value}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
