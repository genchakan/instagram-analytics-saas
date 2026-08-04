import { ShieldCheck, KeyRound, Unplug } from "lucide-react";
import { SectionHeading } from "./section-heading";

const POINTS = [
  {
    icon: KeyRound,
    title: "Prototype connection",
    description:
      "This build simulates account connection in development mode. Credentials are never stored or sent to Instagram.",
  },
  {
    icon: ShieldCheck,
    title: "Private dashboard",
    description: "Your dashboard and its data are visible only to you.",
  },
  {
    icon: Unplug,
    title: "Disconnect anytime",
    description: "Remove a connected profile whenever you want — no questions asked.",
  },
];

export function PrivacySection() {
  return (
    <section className="border-y border-border/60 bg-surface-1/40">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <SectionHeading
          eyebrow="Privacy & connection"
          title="Built with a careful, private connection flow"
          description="This application is not affiliated with Instagram or Meta."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {POINTS.map((point) => (
            <div key={point.title} className="rounded-[var(--radius-lg)] border border-border bg-surface-1 p-6">
              <point.icon className="mb-3 h-5 w-5 text-accent-secondary" aria-hidden="true" />
              <h3 className="mb-1.5 text-base font-semibold text-text-primary">{point.title}</h3>
              <p className="text-sm text-text-secondary">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
