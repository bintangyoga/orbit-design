import { Button } from "@registry/button";
import { Badge } from "@registry/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@registry/card";
import { ComponentPreview } from "@/components/component-preview";
import { ApiReference, CodeBlock, DocPage, DocSection, InstallSection } from "@/components/doc-page";

export default function CardPage() {
  return (
    <DocPage
      title="Card"
      description="A glass surface for grouping content, with header, content and footer parts. Tighter padding on phones."
    >
      <DocSection title="Default">
        <ComponentPreview
          code={`<Card>
  <CardHeader>
    <CardTitle>Weekend in Bandung</CardTitle>
    <CardDescription>3 nights, 2 guests</CardDescription>
  </CardHeader>
  <CardContent>Check-in Friday from 2 PM.</CardContent>
  <CardFooter>
    <Button>View booking</Button>
  </CardFooter>
</Card>`}
        >
          <Card className="w-full max-w-sm">
            <CardHeader>
              <div className="flex items-center justify-between gap-2">
                <CardTitle>Weekend in Bandung</CardTitle>
                <Badge variant="glass">Confirmed</Badge>
              </div>
              <CardDescription>3 nights, 2 guests</CardDescription>
            </CardHeader>
            <CardContent className="text-sm">Check-in Friday from 2 PM.</CardContent>
            <CardFooter>
              <Button className="w-full sm:w-auto">View booking</Button>
            </CardFooter>
          </Card>
        </ComponentPreview>
      </DocSection>

      <DocSection title="Variants">
        <ComponentPreview code={`<Card variant="glass" />  <Card variant="solid" />  <Card variant="outline" />`}>
          {(["glass", "solid", "outline"] as const).map((variant) => (
            <Card key={variant} variant={variant} className="w-full sm:w-44">
              <CardHeader>
                <CardTitle className="capitalize">{variant}</CardTitle>
                <CardDescription>variant="{variant}"</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </ComponentPreview>
      </DocSection>

      <DocSection title="As a link" description="asChild renders the card as your own element; interactive adds hover and press feedback.">
        <ComponentPreview
          code={`<Card asChild interactive>
  <a href="/docs/components/dialog">…</a>
</Card>`}
        >
          <Card asChild interactive className="w-full max-w-sm">
            <a href="/docs/components/dialog">
              <CardHeader>
                <CardTitle>Dialog</CardTitle>
                <CardDescription>Bottom sheet on phones, modal on desktop.</CardDescription>
              </CardHeader>
            </a>
          </Card>
        </ComponentPreview>
      </DocSection>

      <InstallSection name="card" />

      <DocSection title="Usage">
        <CodeBlock>{`import {
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter,
} from "@/components/glass-orbit/card"`}</CodeBlock>
      </DocSection>

      <ApiReference
        props={[
          { name: "variant", type: '"glass" | "solid" | "outline"', description: "default glass" },
          { name: "interactive", type: "boolean", description: "hover and press feedback for clickable cards" },
          { name: "asChild", type: "boolean", description: "render as the child element via Radix Slot" },
        ]}
      />
    </DocPage>
  );
}
