/**
 * glass-orbit Config — stored in user's project as glass-orbit.json
 */

import fs from "fs-extra";

/** Config file written by `glass-orbit init` */
export const CONFIG_FILE = "glass-orbit.json";
/** Config file name used before the rename to glass-orbit (still read) */
export const LEGACY_CONFIG_FILE = "orbit-ui.json";

export interface OrbitUIConfig {
  /** $schema for IDE autocomplete */
  $schema?: string;
  /** Style preset */
  style: "default" | "minimal";
  /** Whether to use TypeScript */
  typescript: boolean;
  /** Tailwind CSS config path */
  tailwind: {
    /** Path to tailwind config */
    config: string;
    /** Path to global CSS file */
    css: string;
    /** Base color variable prefix */
    baseColor: string;
  };
  /** Component aliases — where components get installed */
  aliases: {
    /** UI component directory */
    components: string;
    /** Utility directory (cn helper, etc.) */
    utils: string;
  };
  /** Custom theme overrides */
  theme?: {
    /** Path to custom theme file (glass-orbit-theme.json) */
    file?: string;
  };
}

export const defaultConfig: OrbitUIConfig = {
  style: "default",
  typescript: true,
  tailwind: {
    config: "tailwind.config.ts",
    css: "src/app/globals.css",
    baseColor: "slate",
  },
  aliases: {
    components: "@/components/glass-orbit",
    utils: "@/lib/utils",
  },
};

export function validateConfig(config: Partial<OrbitUIConfig>): config is OrbitUIConfig {
  return !!(
    config.style &&
    config.tailwind &&
    config.tailwind.config &&
    config.tailwind.css &&
    config.aliases &&
    config.aliases.components &&
    config.aliases.utils
  );
}

/**
 * Reads glass-orbit.json, falling back to orbit-ui.json for projects
 * set up with the old orbit-design CLI. Throws if neither exists.
 */
export async function readConfig(): Promise<OrbitUIConfig> {
  if (await fs.pathExists(CONFIG_FILE)) {
    return fs.readJSON(CONFIG_FILE);
  }
  return fs.readJSON(LEGACY_CONFIG_FILE);
}
