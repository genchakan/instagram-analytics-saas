import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow && (
        <span className="text-xs font-semibold uppercase tracking-wider text-accent-secondary">
          {eyebrow}
        </span>
      )}
      <h2 className="max-w-2xl text-2xl font-semibold tracking-tight text-text-primary sm:text-3xl">
        {title}
      </h2>
      {description && (
        <p className="max-w-xl text-sm text-text-secondary sm:text-base">{description}</p>
      )}
    </div>
  );
}
