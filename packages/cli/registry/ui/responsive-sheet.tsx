import * as React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  type DialogContentProps,
} from "./dialog";

/**
 * glass-orbit ResponsiveSheet
 *
 * The old name for Dialog, kept so existing imports keep working.
 * Dialog already is a bottom sheet on phones and a centered modal from 768px up,
 * so new code should import from "./dialog" instead.
 */

type ResponsiveSheetContentProps = Omit<DialogContentProps, "variant"> & {
  /** "default" is the old name for "solid". */
  variant?: "default" | "glass" | "solid" | null;
};

const ResponsiveSheetContent = React.forwardRef<
  React.ComponentRef<typeof DialogContent>,
  ResponsiveSheetContentProps
>(({ variant = "default", ...props }, ref) => (
  <DialogContent ref={ref} variant={variant === "default" ? "solid" : variant} {...props} />
));
ResponsiveSheetContent.displayName = "ResponsiveSheetContent";

const ResponsiveSheet = Dialog;
const ResponsiveSheetTrigger = DialogTrigger;
const ResponsiveSheetHeader = DialogHeader;
const ResponsiveSheetFooter = DialogFooter;
const ResponsiveSheetTitle = DialogTitle;
const ResponsiveSheetDescription = DialogDescription;
const ResponsiveSheetClose = DialogClose;

export {
  ResponsiveSheet,
  ResponsiveSheetTrigger,
  ResponsiveSheetContent,
  ResponsiveSheetHeader,
  ResponsiveSheetFooter,
  ResponsiveSheetTitle,
  ResponsiveSheetDescription,
  ResponsiveSheetClose,
};
