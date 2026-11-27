import { useState } from "react";
import { Copy, MoreHorizontal, Pencil, Share2, Trash2 } from "lucide-react";
import { Button } from "@registry/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@registry/dropdown-menu";
import { ComponentPreview } from "@/components/component-preview";
import { ApiReference, CodeBlock, DocPage, DocSection, InstallSection } from "@/components/doc-page";

const example = `<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="glass" size="icon" aria-label="More"><MoreHorizontal /></Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent title="Photo">
    <DropdownMenuItem><Pencil /> Edit <DropdownMenuShortcut>⌘E</DropdownMenuShortcut></DropdownMenuItem>
    <DropdownMenuItem><Copy /> Duplicate</DropdownMenuItem>
    <DropdownMenuItem><Share2 /> Share</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem variant="destructive"><Trash2 /> Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`;

export default function DropdownMenuPage() {
  const [grid, setGrid] = useState(true);
  const [captions, setCaptions] = useState(false);

  return (
    <DocPage
      title="Dropdown Menu"
      description="An action sheet that slides up from the bottom on phones, and a menu next to its button from 768px up. You write the items once."
    >
      <DocSection
        title="Default"
        description="On a phone the items become large touch rows with a separate Cancel button. Keyboard shortcuts only show in the desktop menu."
      >
        <ComponentPreview code={example}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="glass" size="icon" aria-label="More">
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent title="Photo">
              <DropdownMenuItem>
                <Pencil /> Edit <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Copy /> Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Share2 /> Share
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">
                <Trash2 /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </ComponentPreview>
      </DocSection>

      <DocSection title="Checkbox items and labels">
        <ComponentPreview
          code={`<DropdownMenuContent title="View">
  <DropdownMenuLabel>Show</DropdownMenuLabel>
  <DropdownMenuCheckboxItem checked={grid} onCheckedChange={setGrid}>Grid</DropdownMenuCheckboxItem>
  <DropdownMenuCheckboxItem checked={captions} onCheckedChange={setCaptions}>Captions</DropdownMenuCheckboxItem>
</DropdownMenuContent>`}
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">View options</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent title="View">
              <DropdownMenuLabel>Show</DropdownMenuLabel>
              <DropdownMenuCheckboxItem checked={grid} onCheckedChange={setGrid}>
                Grid
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked={captions} onCheckedChange={setCaptions}>
                Captions
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </ComponentPreview>
      </DocSection>

      <DocSection
        title="Layout"
        description={
          <>
            <code>layout="responsive"</code> is the default. Use <code>"menu"</code> or{" "}
            <code>"sheet"</code> to keep one form on every screen.
          </>
        }
      >
        <ComponentPreview code={`<DropdownMenu layout="sheet">…</DropdownMenu>`}>
          <DropdownMenu layout="sheet">
            <DropdownMenuTrigger asChild>
              <Button variant="secondary">Always a sheet</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent title="Sort by">
              <DropdownMenuItem>Newest</DropdownMenuItem>
              <DropdownMenuItem>Oldest</DropdownMenuItem>
              <DropdownMenuItem>Name</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </ComponentPreview>
      </DocSection>

      <InstallSection name="dropdown-menu" />

      <DocSection title="Usage">
        <CodeBlock>{`import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuSeparator,
} from "@/components/glass-orbit/dropdown-menu"`}</CodeBlock>
      </DocSection>

      <ApiReference
        props={[
          { name: "layout", type: '"responsive" | "menu" | "sheet"', description: "on DropdownMenu (default responsive)" },
          { name: "title", type: "string", description: "on DropdownMenuContent: the sheet heading, and the menu's label for screen readers" },
          { name: "cancelLabel", type: "string | null", description: "on DropdownMenuContent: text of the sheet's Cancel button, null hides it" },
          { name: "variant", type: '"default" | "destructive"', description: "on DropdownMenuItem" },
          { name: "onSelect", type: "(event: Event) => void", description: "on items; call event.preventDefault() to keep it open" },
        ]}
      />
    </DocPage>
  );
}
