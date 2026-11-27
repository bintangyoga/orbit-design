import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * glass-orbit Card
 *
 * A glass surface for grouping content. Mobile first: tighter padding on small
 * screens, more room from the sm breakpoint (640px) up.
 *
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Title</CardTitle>
 *     <CardDescription>Description</CardDescription>
 *   </CardHeader>
 *   <CardContent>...</CardContent>
 *   <CardFooter>...</CardFooter>
 * </Card>
 *
 * Use `asChild` to make the whole card a link: <Card asChild interactive><a href="/x">...</a></Card>
 *
 * @see https://orbitdesign.vercel.app/docs/components/card
 */

const cardVariants = cva(
  [
    "relative flex flex-col gap-4 py-4 sm:gap-5 sm:py-6",
    "rounded-[calc(var(--orbit-radius)*1.5)] border border-[var(--orbit-border)]",
    "text-[var(--orbit-card-foreground)]",
  ].join(" "),
  {
    variants: {
      variant: {
        glass: [
          "bg-[color-mix(in_srgb,var(--orbit-card)_65%,transparent)]",
          "backdrop-blur-xl backdrop-saturate-150",
          "shadow-[0_8px_32px_-12px_rgb(0_0_0/0.25),inset_0_1px_0_0_rgb(255_255_255/var(--orbit-highlight-opacity))]",
        ].join(" "),
        solid: "bg-[var(--orbit-card)] shadow-sm",
        outline: "bg-transparent",
      },
      /** Hover and press feedback, for cards that are links or buttons */
      interactive: {
        true: [
          "cursor-pointer transition-[transform,border-color,box-shadow] duration-200",
          "hover:border-[color-mix(in_srgb,var(--orbit-accent)_40%,var(--orbit-border))]",
          "active:scale-[0.98]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--orbit-ring)]",
        ].join(" "),
        false: "",
      },
    },
    defaultVariants: {
      variant: "glass",
      interactive: false,
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  asChild?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, interactive, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return (
      <Comp
        ref={ref}
        className={cn(cardVariants({ variant, interactive }), className)}
        {...props}
      />
    );
  }
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col gap-1.5 px-4 sm:px-6", className)} {...props} />
  )
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("text-base font-semibold leading-tight tracking-tight sm:text-lg", className)}
      {...props}
    />
  )
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm text-[var(--orbit-muted-foreground)]", className)} {...props} />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("px-4 sm:px-6", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-wrap items-center gap-2 px-4 sm:px-6", className)}
      {...props}
    />
  )
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, cardVariants };
