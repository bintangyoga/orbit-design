import { Input } from "@registry/input";
import { ComponentPreview } from "@/components/component-preview";
import { ApiReference, CodeBlock, DocPage, DocSection, InstallSection } from "@/components/doc-page";

export default function InputPage() {
  return (
    <DocPage
      title="Input"
      description="A glass text field. 44px tall with 16px text on phones, so iOS Safari doesn't zoom in when you tap it."
    >
      <DocSection title="Default">
        <ComponentPreview code={`<Input type="email" placeholder="you@example.com" />`}>
          <Input type="email" placeholder="you@example.com" className="max-w-sm" aria-label="Email" />
        </ComponentPreview>
      </DocSection>

      <DocSection title="With a label">
        <ComponentPreview
          code={`<label className="grid gap-1.5 text-sm font-medium">
  Name
  <Input placeholder="Your name" />
</label>`}
        >
          <label className="grid w-full max-w-sm gap-1.5 text-sm font-medium">
            Name
            <Input placeholder="Your name" />
          </label>
        </ComponentPreview>
      </DocSection>

      <DocSection title="States">
        <ComponentPreview
          code={`<Input aria-invalid="true" defaultValue="not-an-email" />
<Input disabled placeholder="Disabled" />
<Input variant="solid" placeholder="Solid" />`}
        >
          <div className="grid w-full max-w-sm gap-3">
            <Input aria-invalid="true" defaultValue="not-an-email" aria-label="Email with error" />
            <Input disabled placeholder="Disabled" aria-label="Disabled" />
            <Input variant="solid" placeholder="Solid" aria-label="Solid" />
          </div>
        </ComponentPreview>
      </DocSection>

      <DocSection title="Sizes">
        <ComponentPreview code={`<Input size="sm" />  <Input />  <Input size="lg" />`}>
          <div className="grid w-full max-w-sm gap-3">
            <Input size="sm" placeholder="Small" aria-label="Small" />
            <Input placeholder="Default" aria-label="Default" />
            <Input size="lg" placeholder="Large" aria-label="Large" />
          </div>
        </ComponentPreview>
      </DocSection>

      <InstallSection name="input" />

      <DocSection title="Usage">
        <CodeBlock>{`import { Input } from "@/components/glass-orbit/input"`}</CodeBlock>
      </DocSection>

      <ApiReference
        props={[
          { name: "variant", type: '"glass" | "solid"', description: "default glass" },
          { name: "size", type: '"sm" | "default" | "lg"', description: "small stays 16px text on phones to avoid zoom" },
          { name: "aria-invalid", type: "boolean", description: "shows the error style" },
        ]}
      />
    </DocPage>
  );
}
