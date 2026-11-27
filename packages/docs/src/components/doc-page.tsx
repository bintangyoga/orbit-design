import type { ReactNode } from "react";

/** Shared layout for component pages: title, intro, sections, install and API. */
export function DocPage({
  title,
  description,
  children,
}: {
  title: string;
  description: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="p-8 max-w-3xl space-y-10">
      <div>
        <h1 className="text-4xl font-bold tracking-tight mb-2">{title}</h1>
        <p className="text-[var(--orbit-muted-foreground)]">{description}</p>
      </div>
      {children}
    </div>
  );
}

export function DocSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">{title}</h2>
      {description && (
        <p className="text-sm text-[var(--orbit-muted-foreground)]">{description}</p>
      )}
      {children}
    </section>
  );
}

export function CodeBlock({ children }: { children: string }) {
  return (
    <div className="bg-[var(--orbit-muted)] rounded-md p-4 text-sm font-mono overflow-x-auto">
      <pre>{children}</pre>
    </div>
  );
}

export function InstallSection({ name }: { name: string }) {
  return (
    <DocSection title="Installation">
      <CodeBlock>{`npx glass-orbit add ${name}`}</CodeBlock>
    </DocSection>
  );
}

export function ApiReference({
  props,
}: {
  props: { name: string; type: string; description?: string }[];
}) {
  return (
    <DocSection title="API Reference">
      <div className="text-sm text-[var(--orbit-muted-foreground)] space-y-3">
        {props.map((prop) => (
          <div key={prop.name}>
            <h3 className="font-medium text-[var(--orbit-foreground)] mb-1">{prop.name}</h3>
            <p>
              <code className="bg-[var(--orbit-muted)] px-1.5 py-0.5 rounded text-[var(--orbit-foreground)]">
                {prop.type}
              </code>
              {prop.description && <> — {prop.description}</>}
            </p>
          </div>
        ))}
      </div>
    </DocSection>
  );
}
