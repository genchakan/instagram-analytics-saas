import { UserPlus, Link2, LayoutDashboard } from "lucide-react";
import { SectionHeading } from "./section-heading";

const STEPS = [
  {
    icon: UserPlus,
    title: "Create your account",
    description: "Sign up in seconds with Google or email — no verification wait, no setup calls.",
  },
  {
    icon: Link2,
    title: "Connect your profile",
    description:
      "Link your Instagram profile through our private connection flow. Disconnect anytime.",
  },
  {
    icon: LayoutDashboard,
    title: "Explore your dashboard",
    description: "See profile activity, visitor insights and engagement patterns in one place.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <SectionHeading
        eyebrow="How it works"
        title="From sign-up to insight in minutes"
        description="Three steps, no technical setup required."
      />

      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        {STEPS.map((step, index) => (
          <div key={step.title} className="relative rounded-[var(--radius-lg)] border border-border bg-surface-1 p-6">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] bg-gradient-to-br from-accent-primary-muted to-accent-secondary">
              <step.icon className="h-5 w-5 text-white" aria-hidden="true" />
            </div>
            <p className="mb-1 text-xs font-semibold text-accent-secondary">Step {index + 1}</p>
            <h3 className="mb-1.5 text-base font-semibold text-text-primary">{step.title}</h3>
            <p className="text-sm text-text-secondary">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
