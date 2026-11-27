import { useEffect, useState } from "react";
import { Badge } from "@registry/badge";
import { Button } from "@registry/button";
import { Tabs, TabsList, TabsTrigger } from "@registry/tabs";

const swatches = ["#0090fe", "#e11d48", "#16a34a", "#f97316", "#7c3aed"];

/** Sets --orbit-brand on the page root so every component re-derives its colors. */
export function BrandPicker() {
  const [brand, setBrand] = useState<string | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (brand) root.style.setProperty("--orbit-brand", brand);
    else root.style.removeProperty("--orbit-brand");
  }, [brand]);

  useEffect(() => () => {
    document.documentElement.style.removeProperty("--orbit-brand");
  }, []);

  return (
    <div className="rounded-[var(--orbit-radius)] border border-[var(--orbit-border)] bg-[var(--orbit-card)] p-4 space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        {swatches.map((color) => (
          <button
            key={color}
            type="button"
            aria-label={`Brand ${color}`}
            aria-pressed={(brand ?? swatches[0]) === color}
            onClick={() => setBrand(color === swatches[0] ? null : color)}
            className="size-11 rounded-full border-2 border-[var(--orbit-border)] aria-pressed:border-[var(--orbit-foreground)]"
            style={{ background: color }}
          />
        ))}
        <label className="flex items-center gap-2 text-sm text-[var(--orbit-muted-foreground)]">
          <input
            type="color"
            value={brand ?? swatches[0]}
            onChange={(e) => setBrand(e.target.value)}
            className="size-11 cursor-pointer rounded-full bg-transparent"
          />
          Pick any color
        </label>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button>Primary</Button>
        <Button variant="outline">Outline</Button>
        <Badge>Badge</Badge>
        <Tabs defaultValue="a">
          <TabsList variant="underline">
            <TabsTrigger value="a">Active</TabsTrigger>
            <TabsTrigger value="b">Other</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <code className="block text-sm text-[var(--orbit-foreground)]">
        {`:root { --orbit-brand: ${brand ?? swatches[0]}; }`}
      </code>
    </div>
  );
}
