const POINTS = [
  "Built for creators & small teams",
  "Private by default",
  "Prototype — development mode",
  "Not affiliated with Instagram or Meta",
];

export function CredibilityStrip() {
  return (
    <section className="border-y border-border/60 bg-surface-1/40">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4 py-5 text-center sm:px-6 lg:px-8">
        {POINTS.map((point) => (
          <span key={point} className="text-xs font-medium text-text-secondary sm:text-sm">
            {point}
          </span>
        ))}
      </div>
    </section>
  );
}
