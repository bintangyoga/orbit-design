import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * glass-orbit Tabs
 *
 * Mobile first: the tab bar fills the width and scrolls sideways when there are
 * more tabs than fit (the active tab scrolls into view), with 44px touch targets.
 * From the md breakpoint (768px) up it shrinks to fit its tabs.
 *
 * <Tabs defaultValue="account">
 *   <TabsList>
 *     <TabsTrigger value="account">Account</TabsTrigger>
 *     <TabsTrigger value="password">Password</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="account">...</TabsContent>
 * </Tabs>
 *
 * @see https://orbitdesign.vercel.app/docs/components/tabs
 */

const Tabs = TabsPrimitive.Root;

const tabsListVariants = cva(
  [
    "group/tabs-list relative flex w-full items-center gap-1 overflow-x-auto overscroll-x-contain",
    "snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
    "md:w-fit",
  ].join(" "),
  {
    variants: {
      variant: {
        // Glass track with a raised glass pill on the active tab
        segmented: [
          "rounded-[calc(var(--orbit-radius)+0.25rem)] p-1",
          "border border-[var(--orbit-border)]",
          "bg-[color-mix(in_srgb,var(--orbit-muted)_60%,transparent)] backdrop-blur-xl",
        ].join(" "),
        // Text tabs with a gradient line under the active one
        underline: "gap-0 border-b border-[var(--orbit-border)]",
      },
    },
    defaultVariants: {
      variant: "segmented",
    },
  }
);

const TabsList = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & VariantProps<typeof tabsListVariants>
>(({ className, variant = "segmented", ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    data-variant={variant}
    className={cn(tabsListVariants({ variant }), className)}
    {...props}
  />
));
TabsList.displayName = "TabsList";

const TabsTrigger = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, onFocus, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    onFocus={(event) => {
      onFocus?.(event);
      // Keyboard and tap focus both keep the active tab visible on narrow screens
      event.currentTarget.scrollIntoView({ block: "nearest", inline: "nearest" });
    }}
    className={cn(
      "relative inline-flex min-h-11 min-w-fit flex-1 shrink-0 snap-start items-center justify-center gap-2",
      "whitespace-nowrap px-4 text-sm font-medium transition-all duration-200",
      "text-[var(--orbit-muted-foreground)] hover:text-[var(--orbit-foreground)]",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--orbit-ring)]",
      "disabled:pointer-events-none disabled:opacity-50",
      "md:min-h-9 md:flex-none",
      "[&_svg]:size-4 [&_svg]:shrink-0",
      // segmented
      "group-data-[variant=segmented]/tabs-list:rounded-[var(--orbit-radius)]",
      "group-data-[variant=segmented]/tabs-list:data-[state=active]:text-[var(--orbit-foreground)]",
      "group-data-[variant=segmented]/tabs-list:data-[state=active]:bg-[color-mix(in_srgb,var(--orbit-card)_85%,transparent)]",
      "group-data-[variant=segmented]/tabs-list:data-[state=active]:shadow-[0_1px_8px_-2px_rgb(0_0_0/0.25),inset_0_1px_0_0_rgb(255_255_255/var(--orbit-highlight-opacity))]",
      // underline
      "group-data-[variant=underline]/tabs-list:after:absolute group-data-[variant=underline]/tabs-list:after:inset-x-3",
      "group-data-[variant=underline]/tabs-list:after:-bottom-px group-data-[variant=underline]/tabs-list:after:h-0.5",
      "group-data-[variant=underline]/tabs-list:after:rounded-full group-data-[variant=underline]/tabs-list:after:bg-transparent",
      "group-data-[variant=underline]/tabs-list:data-[state=active]:text-[var(--orbit-foreground)]",
      "group-data-[variant=underline]/tabs-list:data-[state=active]:after:bg-gradient-to-r",
      "group-data-[variant=underline]/tabs-list:data-[state=active]:after:from-[var(--orbit-gradient-highlight)]",
      "group-data-[variant=underline]/tabs-list:data-[state=active]:after:to-[var(--orbit-gradient)]",
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = "TabsTrigger";

const TabsContent = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--orbit-ring)] rounded-[var(--orbit-radius)]",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants };
