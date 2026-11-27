import { Link } from "react-router";
import { CodeBlock, DocPage, DocSection } from "@/components/doc-page";

export default function ResponsiveSheetPage() {
  return (
    <DocPage
      title="ResponsiveSheet is now Dialog"
      description={
        <>
          <Link to="/docs/components/dialog" className="underline">Dialog</Link> already is a bottom
          sheet on phones and a centered modal on desktop, so there is one component to import
          instead of two.
        </>
      }
    >
      <DocSection
        title="Moving over"
        description="Existing ResponsiveSheet imports keep working: they use Dialog underneath. To switch, rename the parts."
      >
        <CodeBlock>{`// before
import { ResponsiveSheet, ResponsiveSheetContent } from "@/components/glass-orbit/responsive-sheet"

// after
import { Dialog, DialogContent } from "@/components/glass-orbit/dialog"`}</CodeBlock>
        <p className="text-sm text-[var(--orbit-muted-foreground)]">
          The old <code>variant="default"</code> is <code>variant="solid"</code> on Dialog. Dialog
          adds a swipe-down handle, a larger close button, and <code>layout</code> to keep it a sheet
          or a modal everywhere.
        </p>
      </DocSection>
    </DocPage>
  );
}
