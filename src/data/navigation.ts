export const MARKETING_NAV = [
  { label: "Product", href: "/#product" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Features", href: "/#features" },
  { label: "Dashboard", href: "/#dashboard-preview" },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/#faq" },
];

export const FOOTER_LINKS = {
  product: [
    { label: "Features", href: "/#features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Dashboard preview", href: "/#dashboard-preview" },
  ],
  company: [
    { label: "Contact", href: "/contact" },
    { label: "FAQ", href: "/#faq" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Imprint", href: "/imprint" },
  ],
};

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
  label: string;
  href: string;
  icon: LucideIcon;
}

export const DASHBOARD_NAV: DashboardNavItem[] = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Visitors", href: "/dashboard/visitors", icon: Users },
  { label: "Activity", href: "/dashboard/activity", icon: Activity },
  { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { label: "Reports", href: "/dashboard/reports", icon: FileText },
  { label: "Connected Accounts", href: "/dashboard/accounts", icon: Link2 },
  { label: "Billing", href: "/dashboard/billing", icon: CreditCard },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];
