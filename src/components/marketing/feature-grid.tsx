import { Activity, Users, LineChart, Bell, FileDown, ShieldCheck } from "lucide-react";
import { SectionHeading } from "./section-heading";

const FEATURES = [
  {
    icon: Users,
    title: "Visitor insights",
    description: "See who's showing interest in your profile with clear activity signals.",
  },
  {
    icon: Activity,
    title: "Activity timeline",
    description: "A running log of profile activity, engagement signals and returning visitors.",
  },
  {
    icon: LineChart,
    title: "Interest scoring",
    description: "Every visitor gets an interest indicator so you know where to focus.",
  },
  {
    icon: Bell,
    title: "Real-time alerts",
    description: "Get notified the moment meaningful activity happens on your profile.",
  },
  {
    icon: FileDown,
    title: "Exportable reports",
    description: "Download PDF and CSV reports to share or archive your insights.",
  },
  {
    icon: ShieldCheck,
    title: "Private by design",
    description: "Your dashboard is private to you. Disconnect your profile at any time.",
  },
];

export function FeatureGrid() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <SectionHeading
        eyebrow="Features"
        title="Everything you need in one workspace"
        description="A focused toolkit for understanding what happens around your profile."
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature) => (
          <div
            key={feature.title}
            className="rounded-[var(--radius-lg)] border border-border bg-surface-1 p-6 transition-colors hover:border-accent-primary/40"
          >
            <feature.icon className="mb-3 h-5 w-5 text-accent-secondary" aria-hidden="true" />
            <h3 className="mb-1.5 text-base font-semibold text-text-primary">{feature.title}</h3>
            <p className="text-sm text-text-secondary">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
