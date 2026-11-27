export default function NotFound() {
  return (
    <div className="p-8 max-w-3xl">
      <h1 className="text-4xl font-bold tracking-tight mb-4">Page not found</h1>
      <p className="text-lg text-[var(--orbit-muted-foreground)] mb-8">
        This page doesn&apos;t exist. Try the{" "}
        <a href="/docs" className="text-[var(--orbit-primary)] underline underline-offset-4">
          introduction
        </a>{" "}
        instead.
      </p>
    </div>
  );
}
