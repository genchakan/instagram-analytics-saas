"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import { FOOTER_LINKS } from "@/data/navigation";
import { useLocale } from "@/lib/locale";

export function SiteFooter() {
  const { t } = useLocale();
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2 font-semibold text-text-primary">
              <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-gradient-to-br from-accent-primary-muted to-accent-secondary">
                <Sparkles className="h-4 w-4 text-white" aria-hidden="true" />
              </span>
              Orbit
            </Link>
            <p className="mt-3 max-w-xs text-sm text-text-secondary">{t("footer.tagline")}</p>
          </div>

          <FooterColumn title={t("footer.productCol")} links={FOOTER_LINKS.product} />
          <FooterColumn title={t("footer.companyCol")} links={FOOTER_LINKS.company} />
          <FooterColumn title={t("footer.legalCol")} links={FOOTER_LINKS.legal} />
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-border/60 pt-6 text-xs text-text-secondary sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Orbit. {t("footer.rights")}</p>
          <p>{t("footer.disclaimer")}</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { labelKey: string; href: string }[];
}) {
  const { t } = useLocale();
  return (
    <div>
      <p className="text-sm font-medium text-text-primary">{title}</p>
      <ul className="mt-3 space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-sm text-text-secondary hover:text-text-primary">
              {t(link.labelKey)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
