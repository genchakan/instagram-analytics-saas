export const MARKETING_NAV = [
  { labelKey: "nav.product", href: "/#product" },
  { labelKey: "nav.howItWorks", href: "/#how-it-works" },
  { labelKey: "nav.features", href: "/#features" },
  { labelKey: "nav.dashboard", href: "/#dashboard-preview" },
  { labelKey: "nav.pricing", href: "/pricing" },
  { labelKey: "nav.faq", href: "/#faq" },
] as const;

export const FOOTER_LINKS = {
  product: [
    { labelKey: "nav.features", href: "/#features" },
    { labelKey: "nav.pricing", href: "/pricing" },
    { labelKey: "footer.dashboardPreview", href: "/#dashboard-preview" },
  ],
  company: [
    { labelKey: "footer.contact", href: "/contact" },
    { labelKey: "nav.faq", href: "/#faq" },
  ],
  legal: [
    { labelKey: "footer.privacyPolicy", href: "/privacy" },
    { labelKey: "footer.termsOfService", href: "/terms" },
    { labelKey: "footer.imprint", href: "/imprint" },
  ],
} as const;

import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  Users,
  Activity,
  BarChart3,
  FileText,
  Link2,
  CreditCard,
  Settings,
} from "lucide-react";

export interface DashboardNavItem {
  labelKey: string;
  href: string;
  icon: LucideIcon;
}

export const DASHBOARD_NAV: DashboardNavItem[] = [
  { labelKey: "nav.overview", href: "/dashboard", icon: LayoutDashboard },
  { labelKey: "nav.visitors", href: "/dashboard/visitors", icon: Users },
  { labelKey: "nav.activity", href: "/dashboard/activity", icon: Activity },
  { labelKey: "nav.analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { labelKey: "nav.reports", href: "/dashboard/reports", icon: FileText },
  { labelKey: "nav.connectedAccounts", href: "/dashboard/accounts", icon: Link2 },
  { labelKey: "nav.billing", href: "/dashboard/billing", icon: CreditCard },
  { labelKey: "nav.settings", href: "/dashboard/settings", icon: Settings },
];
