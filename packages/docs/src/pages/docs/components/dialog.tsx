import { Button } from "@registry/button";
import { Input } from "@registry/input";
import {
  Dialog,
  DialogClose,
  DialogCloseButton,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHandle,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@registry/dialog";
import { ComponentPreview } from "@/components/component-preview";
import { ApiReference, CodeBlock, DocPage, DocSection, InstallSection } from "@/components/doc-page";

const example = `<Dialog>
  <DialogTrigger asChild>
    <Button>Edit profile</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit profile</DialogTitle>
      <DialogDescription>Changes are saved to your account.</DialogDescription>
    </DialogHeader>
    <Input defaultValue="Rani Pratiwi" aria-label="Name" />
    <DialogFooter>
      <DialogClose asChild><Button variant="secondary">Cancel</Button></DialogClose>
      <Button>Save changes</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`;

export default function DialogPage() {
  return (
    <DocPage
      title="Dialog"
      description="One component for both screens. Import Dialog once: it is a bottom sheet on phones that you can swipe down to close, and a centered modal from 768px up, with the same parts and the same code."
    >
      <DocSection
        title="Default"
        description="Open it on a phone, or make the window narrower than 768px, to see the sheet."
      >
        <ComponentPreview code={example}>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Edit profile</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>Changes are saved to your account.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-3">
                <label className="grid gap-1.5 text-sm font-medium">
                  Name
                  <Input defaultValue="Rani Pratiwi" />
                </label>
                <label className="grid gap-1.5 text-sm font-medium">
                  Username
                  <Input defaultValue="@rani" />
                </label>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="secondary">Cancel</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button>Save changes</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </ComponentPreview>
      </DocSection>

      <DocSection
        title="Layout"
        description={
          <>
            <code>layout="responsive"</code> is the default. Use <code>"sheet"</code> to keep the
            bottom sheet on every screen, or <code>"modal"</code> for a centered modal everywhere.
          </>
        }
      >
        <ComponentPreview
          code={`<DialogContent layout="sheet">…</DialogContent>
<DialogContent layout="modal">…</DialogContent>`}
        >
          {(["sheet", "modal"] as const).map((layout) => (
            <Dialog key={layout}>
              <DialogTrigger asChild>
                <Button variant="glass">Always {layout}</Button>
              </DialogTrigger>
              <DialogContent layout={layout}>
                <DialogHeader>
                  <DialogTitle>Always a {layout}</DialogTitle>
                  <DialogDescription>
                    This one stays a {layout} at every screen size.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button>Done</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ))}
        </ComponentPreview>
      </DocSection>

      <DocSection
        title="Custom handle and close button"
        description="The handle and close button are parts. Restyle them, hide them, or put your own in their place."
      >
        <ComponentPreview
          code={`<DialogContent showCloseButton={false} showHandle={false}>
  <DialogHandle className="h-9">
    <div className="h-2 w-16 rounded-full bg-[var(--orbit-primary)]" />
  </DialogHandle>
  …
  <DialogCloseButton label="Dismiss" className="bg-[var(--orbit-primary)] text-white" />
</DialogContent>`}
        >
          <CustomPartsDemo />
        </ComponentPreview>
      </DocSection>

      <InstallSection name="dialog" />

      <DocSection title="Usage">
        <CodeBlock>{`import { Button } from "@/components/glass-orbit/button"
import {
  Dialog, DialogTrigger, DialogContent, DialogHeader,
  DialogTitle, DialogDescription, DialogFooter, DialogClose,
} from "@/components/glass-orbit/dialog"`}</CodeBlock>
      </DocSection>

      <ApiReference
        props={[
          { name: "layout", type: '"responsive" | "sheet" | "modal"', description: "where the content sits (default responsive)" },
          { name: "variant", type: '"glass" | "solid"', description: "surface style (default glass)" },
          { name: "size", type: '"sm" | "default" | "lg"', description: "modal width; the sheet is always full width" },
          { name: "showHandle", type: "boolean", description: "render the default drag handle (default true)" },
          { name: "showCloseButton", type: "boolean", description: "render the default close button (default true)" },
          { name: "swipeToClose", type: "boolean", description: "swipe the sheet down by its handle to close it (default true)" },
          { name: "DialogHandle", type: "part", description: "the grab bar; pass className or children to change it" },
          { name: "DialogCloseButton", type: "part", description: "round close button (44px mobile, 36px desktop); pass className, label or an icon as children" },
        ]}
      />
    </DocPage>
  );
}

function CustomPartsDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Custom parts</Button>
      </DialogTrigger>
      <DialogContent showCloseButton={false} showHandle={false}>
        <DialogHandle className="h-9">
          <div className="h-2 w-16 rounded-full bg-[var(--orbit-primary)]" />
        </DialogHandle>
        <DialogHeader>
          <DialogTitle>Your own handle</DialogTitle>
          <DialogDescription>Both parts here are restyled with className.</DialogDescription>
        </DialogHeader>
        <DialogCloseButton
          label="Dismiss"
          className="border-transparent bg-[var(--orbit-primary)] text-[var(--orbit-primary-foreground)] hover:bg-[var(--orbit-primary)]"
        />
      </DialogContent>
    </Dialog>
  );
}
