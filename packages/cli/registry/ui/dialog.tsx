import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * glass-orbit Dialog
 *
 * Mobile first: a bottom sheet on small screens (with a drag handle to swipe it
 * away), a centered modal from the md breakpoint (768px) up. Built on Radix Dialog.
 *
 * Handle and close button are parts too: hide them with showHandle={false} /
 * showCloseButton={false}, restyle them with className, or place your own
 * <DialogHandle /> and <DialogCloseButton /> (or any <DialogClose asChild>).
 * Needs the `motion` styles (added by `glass-orbit add dialog`).
 *
 * <Dialog>
 *   <DialogTrigger asChild><Button>Open</Button></DialogTrigger>
 *   <DialogContent>
 *     <DialogHeader>
 *       <DialogTitle>Title</DialogTitle>
 *       <DialogDescription>Description</DialogDescription>
 *     </DialogHeader>
 *     <DialogFooter>...</DialogFooter>
 *   </DialogContent>
 * </Dialog>
 *
 * @see https://orbitdesign.vercel.app/docs/components/dialog
 */

// ── Root: also gives the content a way to close itself after a swipe ──
const DialogCloseContext = React.createContext<() => void>(() => {});

type DialogProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Root>;

function Dialog({ open: openProp, defaultOpen = false, onOpenChange, ...props }: DialogProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const open = openProp ?? uncontrolledOpen;

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (openProp === undefined) setUncontrolledOpen(next);
      onOpenChange?.(next);
    },
    [openProp, onOpenChange]
  );
  const close = React.useCallback(() => setOpen(false), [setOpen]);

  return (
    <DialogCloseContext.Provider value={close}>
      <DialogPrimitive.Root open={open} onOpenChange={setOpen} {...props} />
    </DialogCloseContext.Provider>
  );
}
Dialog.displayName = "Dialog";

const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

// ── Overlay ──
const DialogOverlay = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "orbit-overlay fixed inset-0 z-50 bg-[color:var(--orbit-overlay,rgb(0_0_0/0.50))] backdrop-blur-sm",
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = "DialogOverlay";

// ── Content ──
const SHEET = [
  "inset-x-0 bottom-0 w-full",
  "max-h-[calc(100dvh-env(safe-area-inset-top)-1.5rem)]",
  "rounded-t-[calc(var(--orbit-radius)*2)] border-b-0",
  "px-5 pt-2 pb-[max(1.25rem,env(safe-area-inset-bottom))]",
];

const MODAL = [
  "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
  "w-[calc(100%-2rem)] max-h-[85dvh]",
  "rounded-[calc(var(--orbit-radius)*1.5)] p-6",
];

const dialogContentVariants = cva(
  [
    "orbit-surface fixed z-50 grid gap-4 overflow-y-auto overscroll-contain",
    "border border-[var(--orbit-border)] text-[var(--orbit-card-foreground)]",
    "shadow-[0_-8px_40px_-12px_color-mix(in_srgb,var(--orbit-shadow,#000)_35%,transparent),inset_0_1px_0_0_color-mix(in_srgb,var(--orbit-highlight)_calc(var(--orbit-highlight-opacity)*100%),transparent)]",
    "focus:outline-none",
  ].join(" "),
  {
    variants: {
      /** Where it sits: responsive (sheet on mobile, modal from md up), always a sheet, or always a modal */
      layout: {
        responsive: [
          ...SHEET,
          "md:inset-x-auto md:bottom-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2",
          "md:w-[calc(100%-2rem)] md:max-h-[85dvh] md:rounded-[calc(var(--orbit-radius)*1.5)] md:border-b md:p-6",
        ].join(" "),
        sheet: SHEET.join(" "),
        modal: MODAL.join(" "),
      },
      variant: {
        glass: [
          "bg-[color-mix(in_srgb,var(--orbit-card)_72%,transparent)]",
          "backdrop-blur-2xl backdrop-saturate-150",
        ].join(" "),
        solid: "bg-[var(--orbit-card)]",
      },
      /** Width of the modal (the sheet is always full width) */
      size: {
        sm: "md:max-w-sm",
        default: "md:max-w-lg",
        lg: "md:max-w-2xl",
      },
    },
    compoundVariants: [
      { layout: "modal", size: "sm", className: "max-w-sm" },
      { layout: "modal", size: "default", className: "max-w-lg" },
      { layout: "modal", size: "lg", className: "max-w-2xl" },
    ],
    defaultVariants: {
      layout: "responsive",
      variant: "glass",
      size: "default",
    },
  }
);

export interface DialogContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    VariantProps<typeof dialogContentVariants> {
  /** Render the default close (X) button. Set false to hide it or to place your own <DialogCloseButton> / <DialogClose>. */
  showCloseButton?: boolean;
  /** Render the default drag handle on the sheet. Set false to hide it or to place your own <DialogHandle>. */
  showHandle?: boolean;
  /** Let people swipe the sheet down by its handle to close it. Default: true */
  swipeToClose?: boolean;
}

/** Shared by DialogContent and the parts inside it (DialogHandle needs the sheet to move it). */
const DialogContentContext = React.createContext<{
  contentRef: React.RefObject<HTMLDivElement | null>;
  layout: "responsive" | "sheet" | "modal";
  swipeToClose: boolean;
}>({ contentRef: { current: null }, layout: "responsive", swipeToClose: false });

const DialogContent = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(
  (
    {
      className,
      children,
      layout = "responsive",
      variant,
      size,
      showCloseButton = true,
      showHandle = true,
      swipeToClose = true,
      ...props
    },
    forwardedRef
  ) => {
    const contentRef = React.useRef<HTMLDivElement | null>(null);
    const ref = React.useCallback(
      (node: HTMLDivElement | null) => {
        contentRef.current = node;
        if (typeof forwardedRef === "function") forwardedRef(node);
        else if (forwardedRef) forwardedRef.current = node;
      },
      [forwardedRef]
    );
    const context = React.useMemo(
      () => ({ contentRef, layout: layout ?? "responsive", swipeToClose }),
      [layout, swipeToClose]
    );

    return (
      <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Content
          ref={ref}
          data-layout={layout}
          className={cn(dialogContentVariants({ layout, variant, size }), className)}
          {...props}
        >
          <DialogContentContext.Provider value={context}>
            {showHandle && <DialogHandle />}
            {children}
            {showCloseButton && <DialogCloseButton />}
          </DialogContentContext.Provider>
        </DialogPrimitive.Content>
      </DialogPortal>
    );
  }
);
DialogContent.displayName = "DialogContent";

// ── Handle: the grab bar on top of the sheet (hidden where the dialog is a modal) ──
const DialogHandle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    const { contentRef, layout, swipeToClose } = React.useContext(DialogContentContext);
    const swipe = useSwipeToClose(contentRef, swipeToClose);
    if (layout === "modal") return null;
    return (
      <div
        ref={ref}
        aria-hidden
        data-slot="dialog-handle"
        {...swipe}
        className={cn(
          "-mx-5 -mt-2 flex h-7 shrink-0 touch-none items-center justify-center",
          swipeToClose && "cursor-grab active:cursor-grabbing",
          layout === "responsive" && "md:hidden",
          className
        )}
        {...props}
      >
        {children ?? (
          <div className="h-1.5 w-12 rounded-full bg-[color-mix(in_srgb,var(--orbit-foreground)_35%,transparent)]" />
        )}
      </div>
    );
  }
);
DialogHandle.displayName = "DialogHandle";

// ── Close button: a round glass button in the top corner (44px mobile, 36px desktop). Pass children to change the icon. ──
const DialogCloseButton = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Close>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Close> & { label?: string }
>(({ className, children, label = "Close", ...props }, ref) => {
  const { layout } = React.useContext(DialogContentContext);
  return (
    <DialogPrimitive.Close
      ref={ref}
      data-slot="dialog-close"
      className={cn(
        // Round, 44px on touch screens, 36px from md up
        "absolute right-3 top-3 inline-flex size-11 items-center justify-center rounded-full md:size-9",
        "border border-[var(--orbit-border)] text-[var(--orbit-foreground)]",
        "bg-[color-mix(in_srgb,var(--orbit-muted)_70%,transparent)] backdrop-blur-md",
        "shadow-[inset_0_1px_0_0_color-mix(in_srgb,var(--orbit-highlight)_calc(var(--orbit-highlight-opacity)*100%),transparent)]",
        "transition-[background-color,transform] hover:bg-[var(--orbit-muted)] active:scale-95",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--orbit-ring)]",
        "[&_svg]:size-5 md:[&_svg]:size-4",
        layout !== "modal" && "top-5",
        layout === "responsive" && "md:top-3",
        className
      )}
      {...props}
    >
      {children ?? <X />}
      <span className="sr-only">{label}</span>
    </DialogPrimitive.Close>
  );
});
DialogCloseButton.displayName = "DialogCloseButton";

/**
 * Pointer handlers for the drag handle: the sheet follows the finger and
 * closes when pulled down far or fast enough, otherwise it springs back.
 */
function useSwipeToClose(
  contentRef: React.RefObject<HTMLDivElement | null>,
  enabled: boolean
) {
  const close = React.useContext(DialogCloseContext);
  const drag = React.useRef<{ startY: number; startTime: number; dy: number } | null>(null);

  if (!enabled) return {};

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const node = contentRef.current;
    if (!node || event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = { startY: event.clientY, startTime: event.timeStamp, dy: 0 };
    node.style.transition = "none";
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const node = contentRef.current;
    if (!node || !drag.current) return;
    // Pulling up gives a little resistance, pulling down follows the finger.
    const raw = event.clientY - drag.current.startY;
    const dy = raw < 0 ? raw / 6 : raw;
    drag.current.dy = dy;
    node.style.transform = `translate3d(0, ${dy}px, 0)`;
  };

  const onPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    const node = contentRef.current;
    const state = drag.current;
    drag.current = null;
    if (!node || !state) return;
    const velocity = state.dy / Math.max(1, event.timeStamp - state.startTime);
    const shouldClose = state.dy > Math.min(140, node.offsetHeight * 0.3) || (state.dy > 20 && velocity > 0.5);

    if (shouldClose) {
      // The close animation starts from where the finger let go.
      node.style.setProperty("--orbit-sheet-drag", `${state.dy}px`);
      node.style.transform = "";
      node.style.transition = "";
      close();
    } else {
      node.style.transition = "transform 240ms cubic-bezier(0.32, 0.72, 0, 1)";
      node.style.transform = "translate3d(0, 0, 0)";
      window.setTimeout(() => {
        node.style.transform = "";
        node.style.transition = "";
      }, 260);
    }
  };

  return { onPointerDown, onPointerMove, onPointerUp, onPointerCancel: onPointerUp };
}

// ── Header ──
const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col gap-1.5 pr-10 text-left", className)}
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader";

// ── Footer: stacked full-width buttons on mobile, a right-aligned row from md up ──
const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse gap-2 pt-2 [&>*]:w-full",
      "md:flex-row md:justify-end md:[&>*]:w-auto",
      className
    )}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

// ── Title ──
const DialogTitle = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-tight tracking-tight text-[var(--orbit-foreground)]",
      className
    )}
    {...props}
  />
));
DialogTitle.displayName = "DialogTitle";

// ── Description ──
const DialogDescription = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-[var(--orbit-muted-foreground)]", className)}
    {...props}
  />
));
DialogDescription.displayName = "DialogDescription";

export {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogCloseButton,
  DialogHandle,
  dialogContentVariants,
};
