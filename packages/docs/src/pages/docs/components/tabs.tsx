import { Tabs, TabsContent, TabsList, TabsTrigger } from "@registry/tabs";
import { ComponentPreview } from "@/components/component-preview";
import { ApiReference, CodeBlock, DocPage, DocSection, InstallSection } from "@/components/doc-page";

export default function TabsPage() {
  return (
    <DocPage
      title="Tabs"
      description="Glass segmented tabs. On phones the bar fills the width and scrolls sideways when the tabs don't fit, with 44px tap targets."
    >
      <DocSection title="Segmented">
        <ComponentPreview
          code={`<Tabs defaultValue="photos">
  <TabsList>
    <TabsTrigger value="photos">Photos</TabsTrigger>
    <TabsTrigger value="albums">Albums</TabsTrigger>
    <TabsTrigger value="shared">Shared</TabsTrigger>
  </TabsList>
  <TabsContent value="photos">…</TabsContent>
</Tabs>`}
        >
          <Tabs defaultValue="photos" className="w-full max-w-md">
            <TabsList>
              <TabsTrigger value="photos">Photos</TabsTrigger>
              <TabsTrigger value="albums">Albums</TabsTrigger>
              <TabsTrigger value="shared">Shared</TabsTrigger>
            </TabsList>
            <TabsContent value="photos" className="text-sm text-[var(--orbit-muted-foreground)]">
              248 photos from this month.
            </TabsContent>
            <TabsContent value="albums" className="text-sm text-[var(--orbit-muted-foreground)]">
              12 albums.
            </TabsContent>
            <TabsContent value="shared" className="text-sm text-[var(--orbit-muted-foreground)]">
              Nothing shared yet.
            </TabsContent>
          </Tabs>
        </ComponentPreview>
      </DocSection>

      <DocSection title="Underline" description="Plain text tabs with a gradient line under the active one.">
        <ComponentPreview code={`<TabsList variant="underline">…</TabsList>`}>
          <Tabs defaultValue="overview" className="w-full max-w-md">
            <TabsList variant="underline">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
          </Tabs>
        </ComponentPreview>
      </DocSection>

      <DocSection title="Many tabs" description="Swipe the bar sideways on a narrow screen. The tab you pick scrolls into view.">
        <ComponentPreview code={`<TabsList>{months.map((m) => <TabsTrigger key={m} value={m}>{m}</TabsTrigger>)}</TabsList>`}>
          <Tabs defaultValue="Jan" className="w-full max-w-sm">
            <TabsList>
              {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"].map((m) => (
                <TabsTrigger key={m} value={m}>
                  {m}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </ComponentPreview>
      </DocSection>

      <InstallSection name="tabs" />

      <DocSection title="Usage">
        <CodeBlock>{`import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/glass-orbit/tabs"`}</CodeBlock>
      </DocSection>

      <ApiReference
        props={[
          { name: "variant", type: '"segmented" | "underline"', description: "on TabsList (default segmented)" },
          { name: "defaultValue / value", type: "string", description: "on Tabs, as in Radix Tabs" },
        ]}
      />
    </DocPage>
  );
}
