import { RegistryItem } from "../registry";
import { registryEntries } from "./items";
import { readRegistryFile } from "./paths";

/**
 * Build the full component registry from the source files in packages/cli/registry.
 * In production, this could fetch from a remote URL or GitHub raw instead.
 */
export async function getRegistry(): Promise<Map<string, RegistryItem>> {
  const registry = new Map<string, RegistryItem>();

  for (const entry of registryEntries) {
    registry.set(entry.name, {
      name: entry.name,
      type: entry.type,
      description: entry.description,
      dependencies: entry.dependencies,
      registryDependencies: entry.registryDependencies,
      files: entry.files.map((file) => ({
        path: file.path,
        content: readRegistryFile(file.source),
        type: file.type,
      })),
      tailwind: entry.css ? { css: readRegistryFile(entry.css) } : undefined,
    });
  }

  return registry;
}
