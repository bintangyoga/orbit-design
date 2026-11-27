import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * glass-orbit Input
 *
 * Mobile first: 44px tall with 16px text on small screens (so iOS Safari does
 * not zoom in on focus), a little more compact from the md breakpoint (768px) up.
 * Mark errors with aria-invalid.
 *
 * <Input type="email" placeholder="you@example.com" />
 *
 * @see https://orbitdesign.vercel.app/docs/components/input
 */

const inputVariants = cva(
  [
    "flex w-full min-w-0 rounded-[var(--orbit-radius)] border border-[var(--orbit-input)]",
    "text-[var(--orbit-foreground)] placeholder:text-[var(--orbit-muted-foreground)]",
    "transition-[border-color,box-shadow] duration-150 outline-none",
    "focus-visible:border-[var(--orbit-ring)] focus-visible:ring-[3px] focus-visible:ring-[color-mix(in_srgb,var(--orbit-ring)_30%,transparent)]",
    "aria-[invalid=true]:border-[var(--orbit-destructive)] aria-[invalid=true]:ring-[color-mix(in_srgb,var(--orbit-destructive)_25%,transparent)]",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "file:mr-3 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-[var(--orbit-foreground)]",
  ].join(" "),
  {
    variants: {
      variant: {
        glass: [
          "bg-[color-mix(in_srgb,var(--orbit-background)_45%,transparent)] backdrop-blur-md",
          "shadow-[inset_0_1px_2px_0_color-mix(in_srgb,var(--orbit-shadow,#000)_12%,transparent)]",
        ].join(" "),
        solid: "bg-[var(--orbit-background)]",
      },
      size: {
        sm: "h-10 px-3 text-base md:h-8 md:text-xs",
        default: "h-11 px-3.5 text-base md:h-10 md:text-sm",
        lg: "h-12 px-4 text-base",
      },
    },
    defaultVariants: {
      variant: "glass",
      size: "default",
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, size, type = "text", ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(inputVariants({ variant, size }), className)}
      {...props}
    />
  )
);
Input.displayName = "Input";

export { Input, inputVariants };
