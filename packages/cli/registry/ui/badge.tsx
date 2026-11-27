import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * glass-orbit Badge
 *
 * A small label for status, counts and tags. Use `asChild` to render it as a link.
 *
 * <Badge variant="glass">New</Badge>
 *
 * @see https://orbitdesign.vercel.app/docs/components/badge
 */

const badgeVariants = cva(
  [
    "relative inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap",
    "rounded-full border px-2.5 py-0.5 text-xs font-medium",
    "transition-colors [&>svg]:pointer-events-none [&>svg]:size-3",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--orbit-ring)]",
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "border-transparent bg-[var(--orbit-primary)] text-[var(--orbit-primary-foreground)]",
          "shadow-[inset_0_1px_0_0_color-mix(in_srgb,var(--orbit-highlight)_25%,transparent)]",
        ].join(" "),
        secondary:
          "border-transparent bg-[var(--orbit-secondary)] text-[var(--orbit-secondary-foreground)]",
        outline: "border-[var(--orbit-border)] text-[var(--orbit-foreground)]",
        destructive:
          "border-transparent bg-[var(--orbit-destructive)] text-[var(--orbit-destructive-foreground)]",
        glass: [
          "border-[var(--orbit-border)] text-[var(--orbit-foreground)]",
          "bg-[color-mix(in_srgb,var(--orbit-card)_55%,transparent)] backdrop-blur-md",
          "shadow-[inset_0_1px_0_0_color-mix(in_srgb,var(--orbit-highlight)_calc(var(--orbit-highlight-opacity)*100%),transparent)]",
        ].join(" "),
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "span";
    return <Comp ref={ref} className={cn(badgeVariants({ variant }), className)} {...props} />;
  }
);
Badge.displayName = "Badge";

export { Badge, badgeVariants };
