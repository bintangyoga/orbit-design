import { readRegistryFile } from "../registry/paths";

/**
 * Generate the cn utility file content (registry/lib/utils.ts).
 * This file gets installed into the user's project.
 */
export function generateCNUtil(): string {
  return readRegistryFile("lib/utils.ts");
}
