import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { SectionHeading } from "./section-heading";

const PLACEHOLDER_QUOTES = [
  {
    name: "Sample Creator",
    role: "Illustrative example",
    quote:
      "Placeholder quote — this space is reserved for real customer feedback once the product is live.",
  },
  {
    name: "Sample Studio",
    role: "Illustrative example",
    quote:
      "Placeholder quote — early product prototypes typically don't have verified testimonials yet.",
  },
  {
    name: "Sample Manager",
    role: "Illustrative example",
    quote: "Placeholder quote — replace with real, attributed feedback before launch.",
  },
];

export function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <SectionHeading eyebrow="What people say" title="Early feedback" />
      <div className="mt-6 flex justify-center">
        <Badge variant="warning">Placeholder content — not real testimonials</Badge>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-3">
        {PLACEHOLDER_QUOTES.map((item) => (
          <figure key={item.name} className="rounded-[var(--radius-lg)] border border-border bg-surface-1 p-6">
            <blockquote className="text-sm text-text-secondary">&ldquo;{item.quote}&rdquo;</blockquote>
            <figcaption className="mt-4 flex items-center gap-3">
              <Avatar name={item.name} size="sm" />
              <div>
                <p className="text-sm font-medium text-text-primary">{item.name}</p>
                <p className="text-xs text-text-secondary">{item.role}</p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
