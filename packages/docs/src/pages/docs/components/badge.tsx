import { Check } from "lucide-react";
import { Badge } from "@registry/badge";
import { ComponentPreview } from "@/components/component-preview";
import { ApiReference, CodeBlock, DocPage, DocSection, InstallSection } from "@/components/doc-page";

export default function BadgePage() {
  return (
    <DocPage title="Badge" description="A small label for status, counts and tags.">
      <DocSection title="Variants">
        <ComponentPreview
          code={`<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="glass">Glass</Badge>`}
        >
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="glass">Glass</Badge>
        </ComponentPreview>
      </DocSection>

      <DocSection title="With an icon">
        <ComponentPreview code={`<Badge variant="glass"><Check /> Verified</Badge>`}>
          <Badge variant="glass">
            <Check /> Verified
          </Badge>
        </ComponentPreview>
      </DocSection>

      <InstallSection name="badge" />

      <DocSection title="Usage">
        <CodeBlock>{`import { Badge } from "@/components/glass-orbit/badge"`}</CodeBlock>
      </DocSection>

      <ApiReference
        props={[
          { name: "variant", type: '"default" | "secondary" | "outline" | "destructive" | "glass"' },
          { name: "asChild", type: "boolean", description: "render as the child element, e.g. a link" },
        ]}
      />
    </DocPage>
  );
}
