import fs from "fs";
import path from "path";

/**
 * Folder that holds the component sources (registry/ui, registry/lib, registry/styles).
 * Works from both src/registry (ts-node) and dist/registry (built CLI).
 */
export const REGISTRY_DIR = path.resolve(__dirname, "../../registry");

/** Reads a file from the registry folder, e.g. readRegistryFile("ui/button.tsx"). */
export function readRegistryFile(relativePath: string): string {
  return fs.readFileSync(path.join(REGISTRY_DIR, relativePath), "utf8");
}
