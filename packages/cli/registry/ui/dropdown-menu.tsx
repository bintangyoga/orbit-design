import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Slot } from "@radix-ui/react-slot";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * glass-orbit DropdownMenu
 *
 * Mobile first: an action sheet that slides up from the bottom on small screens,
 * a menu anchored to its trigger from the md breakpoint (768px) up.
 * Same parts in both, so you write the menu once:
 *
 * <DropdownMenu>
 *   <DropdownMenuTrigger asChild><Button>Options</Button></DropdownMenuTrigger>
 *   <DropdownMenuContent title="Options">
 *     <DropdownMenuItem onSelect={...}>Edit</DropdownMenuItem>
 *     <DropdownMenuSeparator />
 *     <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
 *   </DropdownMenuContent>
 * </DropdownMenu>
 *
 * Needs the `motion` styles (added by `glass-orbit add dropdown-menu`).
 *
 * @see https://orbitdesign.vercel.app/docs/components/dropdown-menu
 */

const DESKTOP_QUERY = "(min-width: 768px)";

function subscribe(onChange: () => void) {
  const query = window.matchMedia(DESKTOP_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/** True from the md breakpoint up. Server render (and first paint) is mobile. */
function useIsDesktop() {
  return React.useSyncExternalStore(
    subscribe,
    () => window.matchMedia(DESKTOP_QUERY).matches,
    () => false
  );
}

interface MenuContextValue {
  asSheet: boolean;
  close: () => void;
}
const MenuContext = React.createContext<MenuContextValue>({ asSheet: false, close: () => {} });
const useMenu = () => React.useContext(MenuContext);

// ── Root ──
export interface DropdownMenuProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Root> {
  /** responsive (sheet on mobile, menu from md up), always a menu, or always a sheet */
  layout?: "responsive" | "menu" | "sheet";
}

function DropdownMenu({
  layout = "responsive",
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  children,
  ...props
}: DropdownMenuProps) {
  const isDesktop = useIsDesktop();
  const asSheet = layout === "sheet" || (layout === "responsive" && !isDesktop);

  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const open = openProp ?? uncontrolledOpen;
  const setOpen = React.useCallback(
    (next: boolean) => {
      if (openProp === undefined) setUncontrolledOpen(next);
      onOpenChange?.(next);
    },
    [openProp, onOpenChange]
  );
  const value = React.useMemo(
    () => ({ asSheet, close: () => setOpen(false) }),
    [asSheet, setOpen]
  );

  return (
    <MenuContext.Provider value={value}>
      {asSheet ? (
        <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
          {children}
        </DialogPrimitive.Root>
      ) : (
        <DropdownMenuPrimitive.Root open={open} onOpenChange={setOpen} {...props}>
          {children}
        </DropdownMenuPrimitive.Root>
      )}
    </MenuContext.Provider>
  );
}
DropdownMenu.displayName = "DropdownMenu";

// ── Trigger ──
const DropdownMenuTrigger = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Trigger>
>((props, ref) => {
  const { asSheet } = useMenu();
  return asSheet ? (
    <DialogPrimitive.Trigger ref={ref} aria-haspopup="menu" {...props} />
  ) : (
    <DropdownMenuPrimitive.Trigger ref={ref} {...props} />
  );
});
DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

// ── Content ──
const GLASS = [
  "border border-[var(--orbit-border)]",
  "bg-[color-mix(in_srgb,var(--orbit-popover)_75%,transparent)]",
  "backdrop-blur-2xl backdrop-saturate-150",
  "text-[var(--orbit-popover-foreground)]",
  "shadow-[0_12px_40px_-12px_rgb(0_0_0/0.4),inset_0_1px_0_0_rgb(255_255_255/var(--orbit-highlight-opacity))]",
].join(" ");

export interface DropdownMenuContentProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content> {
  /** Heading of the action sheet on mobile. Read by screen readers in both layouts. */
  title?: string;
  /** Text of the separate cancel button under the action sheet. Set to null to hide it. */
  cancelLabel?: string | null;
}

const DropdownMenuContent = React.forwardRef<HTMLDivElement, DropdownMenuContentProps>(
  (
    { className, children, sideOffset = 6, title = "Menu", cancelLabel = "Cancel", ...props },
    ref
  ) => {
    const { asSheet } = useMenu();

    if (asSheet) {
      return (
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="orbit-overlay fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px]" />
          <DialogPrimitive.Content
            ref={ref}
            data-layout="sheet"
            aria-describedby={undefined}
            className="orbit-surface fixed inset-x-0 bottom-0 z-50 flex flex-col gap-2 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] focus:outline-none"
          >
            <div
              role="menu"
              aria-label={title}
              className={cn(
                GLASS,
                "max-h-[70dvh] overflow-y-auto overscroll-contain rounded-[calc(var(--orbit-radius)*1.5)] p-1.5",
                className
              )}
            >
              <DialogPrimitive.Title className="px-3 pb-1 pt-2 text-center text-xs font-medium text-[var(--orbit-muted-foreground)]">
                {title}
              </DialogPrimitive.Title>
              {children}
            </div>
            {cancelLabel !== null && (
              <DialogPrimitive.Close
                className={cn(
                  GLASS,
                  "min-h-12 rounded-[calc(var(--orbit-radius)*1.5)] text-base font-semibold",
                  "active:bg-[var(--orbit-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--orbit-ring)]"
                )}
              >
                {cancelLabel}
              </DialogPrimitive.Close>
            )}
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      );
    }

    return (
      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          ref={ref}
          sideOffset={sideOffset}
          aria-label={title}
          className={cn(
            GLASS,
            "orbit-popover z-50 min-w-[12rem] overflow-hidden rounded-[var(--orbit-radius)] p-1",
            "max-h-[var(--radix-dropdown-menu-content-available-height)] overflow-y-auto",
            className
          )}
          {...props}
        >
          {children}
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    );
  }
);
DropdownMenuContent.displayName = "DropdownMenuContent";

// ── Item ──
const itemClasses = (asSheet: boolean, inset?: boolean, destructive?: boolean) =>
  cn(
    "relative flex w-full cursor-default select-none items-center gap-3 text-left outline-none transition-colors",
    "disabled:pointer-events-none disabled:opacity-50 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
    asSheet
      ? "min-h-12 rounded-[var(--orbit-radius)] px-4 text-base active:bg-[var(--orbit-muted)] focus-visible:bg-[var(--orbit-muted)] [&_svg]:size-5"
      : "min-h-9 rounded-[calc(var(--orbit-radius)*0.6)] px-2.5 py-1.5 text-sm data-[highlighted]:bg-[var(--orbit-accent)]/15 [&_svg]:size-4",
    inset && (asSheet ? "pl-12" : "pl-8"),
    destructive && "text-[var(--orbit-destructive)]"
  );

/** Calls onSelect like Radix does, and closes the sheet unless it was prevented. */
function useSheetSelect(onSelect?: (event: Event) => void) {
  const { close } = useMenu();
  return () => {
    const event = new Event("select", { cancelable: true });
    onSelect?.(event);
    if (!event.defaultPrevented) close();
  };
}

export interface DropdownMenuItemProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> {
  inset?: boolean;
  variant?: "default" | "destructive";
}

const DropdownMenuItem = React.forwardRef<HTMLDivElement, DropdownMenuItemProps>(
  ({ className, inset, variant, onSelect, textValue, asChild, disabled, ...props }, ref) => {
    const { asSheet } = useMenu();
    const select = useSheetSelect(onSelect);
    const destructive = variant === "destructive";

    if (asSheet) {
      const Comp = asChild ? Slot : "button";
      return (
        <Comp
          ref={ref as React.Ref<never>}
          role="menuitem"
          type={asChild ? undefined : "button"}
          disabled={disabled}
          className={cn(itemClasses(true, inset, destructive), className)}
          {...(props as React.HTMLAttributes<HTMLElement>)}
          onClick={(event: React.MouseEvent<HTMLElement>) => {
            props.onClick?.(event as React.MouseEvent<HTMLDivElement>);
            if (!event.defaultPrevented) select();
          }}
        />
      );
    }

    return (
      <DropdownMenuPrimitive.Item
        ref={ref}
        onSelect={onSelect}
        textValue={textValue}
        asChild={asChild}
        disabled={disabled}
        className={cn(itemClasses(false, inset, destructive), className)}
        {...props}
      />
    );
  }
);
DropdownMenuItem.displayName = "DropdownMenuItem";

// ── Checkbox item ──
const DropdownMenuCheckboxItem = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, onCheckedChange, onSelect, disabled, ...props }, ref) => {
  const { asSheet } = useMenu();
  const select = useSheetSelect(onSelect);
  const isChecked = checked === true;

  if (asSheet) {
    return (
      <button
        ref={ref as React.Ref<never>}
        type="button"
        role="menuitemcheckbox"
        aria-checked={checked === "indeterminate" ? "mixed" : isChecked}
        disabled={disabled}
        className={cn(itemClasses(true, true), className)}
        onClick={() => {
          onCheckedChange?.(!isChecked);
          select();
        }}
      >
        <span className="absolute left-4 flex size-5 items-center justify-center">
          {isChecked && <Check className="text-[var(--orbit-primary)]" />}
        </span>
        {children}
      </button>
    );
  }

  return (
    <DropdownMenuPrimitive.CheckboxItem
      ref={ref}
      checked={checked}
      onCheckedChange={onCheckedChange}
      onSelect={onSelect}
      disabled={disabled}
      className={cn(itemClasses(false, true), className)}
      {...props}
    >
      <span className="absolute left-2 flex size-4 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <Check className="text-[var(--orbit-primary)]" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  );
});
DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem";

// ── Label ──
const DropdownMenuLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & { inset?: boolean }
>(({ className, inset, asChild, ...props }, ref) => {
  const { asSheet } = useMenu();
  const classes = cn(
    "font-medium text-[var(--orbit-muted-foreground)]",
    asSheet ? "px-4 pb-1 pt-3 text-xs uppercase tracking-wide" : "px-2.5 py-1.5 text-xs",
    inset && (asSheet ? "pl-12" : "pl-8"),
    className
  );
  if (asSheet) {
    const Comp = asChild ? Slot : "div";
    return <Comp ref={ref} className={classes} {...props} />;
  }
  return <DropdownMenuPrimitive.Label ref={ref} asChild={asChild} className={classes} {...props} />;
});
DropdownMenuLabel.displayName = "DropdownMenuLabel";

// ── Separator ──
const DropdownMenuSeparator = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, asChild: _asChild, ...props }, ref) => {
  const { asSheet } = useMenu();
  const classes = cn("-mx-1 my-1 h-px bg-[var(--orbit-border)]", className);
  return asSheet ? (
    <div ref={ref} role="separator" className={classes} {...props} />
  ) : (
    <DropdownMenuPrimitive.Separator ref={ref} className={classes} {...props} />
  );
});
DropdownMenuSeparator.displayName = "DropdownMenuSeparator";

// ── Group ──
const DropdownMenuGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Group>
>(({ asChild: _asChild, ...props }, ref) => {
  const { asSheet } = useMenu();
  return asSheet ? (
    <div ref={ref} role="group" {...props} />
  ) : (
    <DropdownMenuPrimitive.Group ref={ref} {...props} />
  );
});
DropdownMenuGroup.displayName = "DropdownMenuGroup";

// ── Shortcut: keyboard hints only make sense in the desktop menu ──
const DropdownMenuShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  const { asSheet } = useMenu();
  if (asSheet) return null;
  return (
    <span
      className={cn("ml-auto pl-4 text-xs tracking-widest text-[var(--orbit-muted-foreground)]", className)}
      {...props}
    />
  );
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuShortcut,
  useIsDesktop,
};
