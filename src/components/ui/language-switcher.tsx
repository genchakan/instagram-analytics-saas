"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Check, Languages } from "lucide-react";
import { useLocale } from "@/lib/locale";
import type { Locale } from "@/lib/translations";
import { cn } from "@/lib/utils";

const OPTIONS: { value: Locale; code: string; nativeName: string }[] = [
  { value: "en", code: "EN", nativeName: "English" },
  { value: "tr", code: "TR", nativeName: "Türkçe" },
  { value: "de", code: "DE", nativeName: "Deutsch" },
  { value: "es", code: "ES", nativeName: "Español" },
  { value: "it", code: "IT", nativeName: "Italiano" },
  { value: "ru", code: "RU", nativeName: "Русский" },
  { value: "fr", code: "FR", nativeName: "Français" },
  { value: "uk", code: "UK", nativeName: "Українська" },
  { value: "nl", code: "NL", nativeName: "Nederlands" },
  { value: "pl", code: "PL", nativeName: "Polski" },
];

export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale } = useLocale();
  const current = OPTIONS.find((option) => option.value === locale) ?? OPTIONS[0]!;

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          aria-label="Change language"
          className={cn(
            "flex items-center gap-1.5 rounded-full border border-border bg-surface-2 px-2.5 py-1.5 text-xs font-medium text-text-secondary transition-colors hover:text-text-primary data-[state=open]:text-text-primary",
            className,
          )}
        >
          <Languages className="h-3.5 w-3.5" aria-hidden="true" />
          {current.code}
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={6}
          className="z-50 max-h-72 w-44 overflow-y-auto rounded-[var(--radius-md)] border border-border bg-surface-1 p-1 shadow-2xl"
        >
          {OPTIONS.map((option) => (
            <DropdownMenu.Item
              key={option.value}
              onSelect={() => setLocale(option.value)}
              className={cn(
                "flex cursor-pointer items-center justify-between gap-2 rounded-[var(--radius-sm)] px-2.5 py-1.5 text-sm outline-none transition-colors",
                "text-text-secondary hover:bg-surface-2 hover:text-text-primary focus:bg-surface-2 focus:text-text-primary",
                option.value === locale && "text-text-primary",
              )}
            >
              {option.nativeName}
              {option.value === locale && <Check className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
