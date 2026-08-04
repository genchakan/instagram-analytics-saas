import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-md)] text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-50 min-h-11 px-4",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-r from-accent-primary-muted to-accent-primary text-white shadow-[0_1px_2px_rgba(0,0,0,0.4),0_8px_24px_-8px_rgba(109,94,247,0.45)] hover:brightness-110",
        secondary:
          "bg-surface-2 text-text-primary border border-border hover:bg-surface-1",
        ghost: "text-text-secondary hover:text-text-primary hover:bg-surface-1",
        outline: "border border-border text-text-primary hover:bg-surface-1",
        danger: "bg-danger/10 text-danger border border-danger/30 hover:bg-danger/20",
        link: "text-accent-secondary underline-offset-4 hover:underline min-h-0 px-0",
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 px-3.5 text-sm",
        lg: "h-12 px-6 text-base",
        icon: "h-11 w-11 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
