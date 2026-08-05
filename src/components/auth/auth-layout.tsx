import Link from "next/link";
import { Sparkles } from "lucide-react";
import { LanguageSwitcher } from "@/components/ui/language-switcher";

export function AuthLayout({
  title,
  description,
  children,
  footer,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(60%_40%_at_50%_0%,rgba(139,92,246,0.15),transparent)]"
      />
      <header className="flex h-16 items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold text-text-primary">
          <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-gradient-to-br from-accent-primary-muted to-accent-secondary">
            <Sparkles className="h-4 w-4 text-white" aria-hidden="true" />
          </span>
          Orbit
        </Link>
        <LanguageSwitcher />
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-10 sm:px-6">
        <div className="w-full max-w-sm">
          <div className="mb-7 text-center">
            <h1 className="text-2xl font-semibold tracking-tight text-text-primary">{title}</h1>
            <p className="mt-2 text-sm text-text-secondary">{description}</p>
          </div>
          <div className="rounded-[var(--radius-lg)] border border-border bg-surface-1 p-6 shadow-[0_1px_2px_rgba(0,0,0,0.4)] sm:p-7">
            {children}
          </div>
          {footer && <div className="mt-6 text-center text-sm text-text-secondary">{footer}</div>}
        </div>
      </main>
    </div>
  );
}
