"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { translations, type Locale } from "./translations";

const LOCALE_KEY = "locale";
const SUPPORTED_LOCALES: Locale[] = ["en", "tr", "de"];

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

function lookup(locale: Locale, key: string): string | undefined {
  const parts = key.split(".");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let node: any = translations[locale];
  for (const part of parts) {
    if (node == null) return undefined;
    node = node[part];
  }
  return typeof node === "string" ? node : undefined;
}

/**
 * First-visit-only: infer a starting locale from the browser's language
 * list. Supported languages map directly (tr → tr, de → de); anything
 * else (e.g. it, fr, ja) falls back to English. Never runs again once a
 * preference (auto-detected or explicitly chosen) is stored.
 */
function detectBrowserLocale(): Locale {
  const candidates = window.navigator.languages?.length
    ? window.navigator.languages
    : [window.navigator.language];
  for (const candidate of candidates) {
    const primary = candidate.split("-")[0]?.toLowerCase();
    if (primary === "tr" || primary === "de") return primary;
  }
  return "en";
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem(LOCALE_KEY);
    const resolved =
      stored && SUPPORTED_LOCALES.includes(stored as Locale) ? (stored as Locale) : detectBrowserLocale();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLocaleState(resolved);
    if (!stored) window.localStorage.setItem(LOCALE_KEY, resolved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    window.localStorage.setItem(LOCALE_KEY, next);
  }, []);

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>) => {
      const raw = lookup(locale, key) ?? lookup("en", key) ?? key;
      if (!vars) return raw;
      return Object.entries(vars).reduce(
        (str, [name, value]) => str.replaceAll(`{${name}}`, String(value)),
        raw,
      );
    },
    [locale],
  );

  return <LocaleContext.Provider value={{ locale, setLocale, t }}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}
