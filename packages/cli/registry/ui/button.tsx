import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * glass-orbit Button
 * 
 * A beautiful button with glass gradient effect and inner depth.
 * Fully themeable via CSS variables defined in your glass-orbit theme.
 *
 * @see https://orbitdesign.vercel.app
 */

const buttonVariants = cva(
  // ── Base styles: glass gradient + depth ──
  [
    "relative inline-flex items-center justify-center gap-2",
    "whitespace-nowrap font-medium transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    // Border (shape comes from the `shape` variant below)
    "border border-[var(--orbit-border)]",
    // Inner depth gradient (top-to-bottom shading)
    "bg-gradient-to-b from-[color-mix(in_srgb,var(--orbit-highlight)_calc(var(--orbit-highlight-opacity)*100%),transparent)] to-transparent",
  ].join(" "),
  {
    variants: {
      variant: {
        // ── Default: glass gradient with inner glow ──
        default: [
          "text-[var(--orbit-primary-foreground)]",
          "bg-[var(--orbit-primary)]",
          // Glass gradient overlay — creates the signature shine line
          "before:absolute before:inset-0 before:rounded-[inherit]",
          "before:bg-gradient-to-b before:from-transparent before:via-[color-mix(in_srgb,var(--orbit-gradient-highlight)_12%,transparent)] before:to-transparent",
          "before:pointer-events-none",
          // Shine line along the top edge (replaces the old mid-button band, which read as a stray block)
          "after:absolute after:inset-x-[12%] after:top-0 after:h-px",
          "after:bg-gradient-to-r after:from-transparent after:via-[color-mix(in_srgb,var(--orbit-highlight)_60%,transparent)] after:to-transparent",
          "after:pointer-events-none",
          // Glow effect
          "shadow-[0_0_calc(var(--orbit-glow-intensity)*40px)_calc(var(--orbit-glow-intensity)*8px)_color-mix(in_srgb,var(--orbit-gradient-shadow)_30%,transparent)]",
          // Hover: brighter glow
          "hover:shadow-[0_0_calc(var(--orbit-glow-intensity)*60px)_calc(var(--orbit-glow-intensity)*12px)_color-mix(in_srgb,var(--orbit-gradient-shadow)_45%,transparent)]",
          "hover:brightness-110",
          // Active: press effect
          "active:scale-[0.98] active:brightness-95",
          // Focus ring
          "focus-visible:ring-[var(--orbit-ring)]",
          // Border becomes gradient on this variant
          "border-transparent",
          "shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--orbit-gradient-shadow)_30%,transparent),0_0_calc(var(--orbit-glow-intensity)*40px)_calc(var(--orbit-glow-intensity)*8px)_color-mix(in_srgb,var(--orbit-gradient-shadow)_30%,transparent)]",
        ].join(" "),

        // ── Secondary: subtle glass ──
        secondary: [
          "text-[var(--orbit-secondary-foreground)]",
          "bg-[var(--orbit-secondary)]",
          "before:absolute before:inset-0 before:rounded-[inherit]",
          "before:bg-gradient-to-b before:from-[color-mix(in_srgb,var(--orbit-highlight)_4%,transparent)] before:to-transparent",
          "before:pointer-events-none",
          "hover:bg-[color-mix(in_srgb,var(--orbit-secondary)_80%,transparent)]",
          "focus-visible:ring-[var(--orbit-ring)]",
        ].join(" "),

        // ── Outline: bordered glass ──
        outline: [
          "text-[var(--orbit-foreground)]",
          "bg-transparent",
          "border-[var(--orbit-border)]",
          "before:absolute before:inset-0 before:rounded-[inherit]",
          "before:bg-gradient-to-b before:from-[color-mix(in_srgb,var(--orbit-highlight)_3%,transparent)] before:to-transparent",
          "before:pointer-events-none",
          "hover:bg-[color-mix(in_srgb,var(--orbit-accent)_10%,transparent)]",
          "hover:text-[var(--orbit-accent)]",
          "hover:border-[color-mix(in_srgb,var(--orbit-accent)_40%,transparent)]",
          "focus-visible:ring-[var(--orbit-ring)]",
        ].join(" "),

        // ── Ghost: invisible until hover ──
        ghost: [
          "text-[var(--orbit-foreground)]",
          "bg-transparent",
          "hover:bg-[color-mix(in_srgb,var(--orbit-accent)_10%,transparent)]",
          "hover:text-[var(--orbit-accent-foreground)]",
          "focus-visible:ring-[var(--orbit-ring)]",
        ].join(" "),

        // ── Destructive: red glass gradient ──
        destructive: [
          "text-[var(--orbit-destructive-foreground)]",
          "bg-[var(--orbit-destructive)]",
          "before:absolute before:inset-0 before:rounded-[inherit]",
          "before:bg-gradient-to-b before:from-[color-mix(in_srgb,var(--orbit-highlight)_10%,transparent)] before:to-transparent",
          "before:pointer-events-none",
          "hover:bg-[color-mix(in_srgb,var(--orbit-destructive)_90%,transparent)]",
          "focus-visible:ring-[var(--orbit-destructive)]",
        ].join(" "),

        // ── Glass: frosted glass effect ──
        glass: [
          "text-[var(--orbit-foreground)]",
          "bg-[color-mix(in_srgb,var(--orbit-background)_40%,transparent)]",
          "backdrop-blur-md",
          "border-[color-mix(in_srgb,var(--orbit-border)_50%,transparent)]",
          "before:absolute before:inset-0 before:rounded-[inherit]",
          "before:bg-gradient-to-b before:from-[color-mix(in_srgb,var(--orbit-highlight)_calc(var(--orbit-highlight-opacity)*100%),transparent)] before:to-transparent",
          "before:pointer-events-none",
          // Shine line along the top edge
          "after:absolute after:inset-x-[12%] after:top-0 after:h-px",
          "after:bg-gradient-to-r after:from-transparent after:via-[color-mix(in_srgb,var(--orbit-highlight)_40%,transparent)] after:to-transparent",
          "after:pointer-events-none",
          "hover:bg-[color-mix(in_srgb,var(--orbit-background)_60%,transparent)]",
          "hover:border-[color-mix(in_srgb,var(--orbit-accent)_30%,transparent)]",
          "focus-visible:ring-[var(--orbit-ring)]",
        ].join(" "),
      },

      // Mobile first: 44px touch targets on small screens, compact from md (768px) up
      size: {
        sm: "h-9 px-3 text-xs md:h-8",
        default: "h-11 px-5 py-2 text-sm md:h-10 md:px-4",
        lg: "h-12 px-6 text-base",
        icon: "h-11 w-11 md:h-10 md:w-10",
      },

      // Corner shape. Change the default below to switch every button at once.
      shape: {
        rounded: "rounded-[var(--orbit-radius)]",
        pill: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      shape: "rounded",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, shape, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, shape, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
