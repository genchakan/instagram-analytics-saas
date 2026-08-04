import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, invalid, ...props }, ref) => {
    return (
      <input
        ref={ref}
        aria-invalid={invalid || undefined}
        className={cn(
          "flex h-11 w-full rounded-[var(--radius-md)] border border-border bg-surface-1 px-3.5 text-sm text-text-primary placeholder:text-text-secondary/70",
          "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-secondary focus-visible:border-accent-secondary",
          "disabled:cursor-not-allowed disabled:opacity-50",
          invalid && "border-danger focus-visible:ring-danger",
          className,
        )}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
