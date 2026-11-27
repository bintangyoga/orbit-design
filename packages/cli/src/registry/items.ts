/**
 * glass-orbit registry index.
 *
 * Each entry points at real source files under packages/cli/registry, so the
 * components can be typechecked and previewed (the docs import them directly).
 * `glass-orbit add` copies those files into the user's project.
 */

export interface RegistryEntry {
  name: string;
  type: "registry:ui" | "registry:lib" | "registry:style";
  description: string;
  dependencies?: string[];
  registryDependencies?: string[];
  files: {
    /** Source file, relative to packages/cli/registry */
    source: string;
    /** Target path, relative to the components (or utils) directory */
    path: string;
    type: "registry:component" | "registry:lib" | "registry:style";
  }[];
  /** CSS file (relative to packages/cli/registry) appended once to the user's global CSS */
  css?: string;
}

export const registryEntries: RegistryEntry[] = [
  {
    name: "utils",
    type: "registry:lib",
    description: "cn() class merging helper",
    dependencies: ["clsx", "tailwind-merge"],
    files: [{ source: "lib/utils.ts", path: "utils.ts", type: "registry:lib" }],
  },
  {
    name: "motion",
    type: "registry:style",
    description: "Keyframes for sheets, modals and menus",
    files: [],
    css: "styles/motion.css",
  },
  {
    name: "button",
    type: "registry:ui",
    description: "Glass gradient button with asChild",
    dependencies: ["@radix-ui/react-slot", "class-variance-authority"],
    registryDependencies: ["utils"],
    files: [{ source: "ui/button.tsx", path: "button.tsx", type: "registry:component" }],
  },
  {
    name: "badge",
    type: "registry:ui",
    description: "Small glass status label",
    dependencies: ["@radix-ui/react-slot", "class-variance-authority"],
    registryDependencies: ["utils"],
    files: [{ source: "ui/badge.tsx", path: "badge.tsx", type: "registry:component" }],
  },
  {
    name: "card",
    type: "registry:ui",
    description: "Glass surface with header, content and footer parts",
    dependencies: ["@radix-ui/react-slot", "class-variance-authority"],
    registryDependencies: ["utils"],
    files: [{ source: "ui/card.tsx", path: "card.tsx", type: "registry:component" }],
  },
  {
    name: "input",
    type: "registry:ui",
    description: "Text field sized for touch, no zoom on iOS",
    dependencies: ["class-variance-authority"],
    registryDependencies: ["utils"],
    files: [{ source: "ui/input.tsx", path: "input.tsx", type: "registry:component" }],
  },
  {
    name: "dialog",
    type: "registry:ui",
    description: "Bottom sheet on mobile, modal on desktop, swipe down to close",
    dependencies: ["@radix-ui/react-dialog", "class-variance-authority", "lucide-react"],
    registryDependencies: ["utils", "motion"],
    files: [{ source: "ui/dialog.tsx", path: "dialog.tsx", type: "registry:component" }],
  },
  {
    name: "dropdown-menu",
    type: "registry:ui",
    description: "Action sheet on mobile, anchored menu on desktop",
    dependencies: [
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-dialog",
      "@radix-ui/react-slot",
      "lucide-react",
    ],
    registryDependencies: ["utils", "motion"],
    files: [
      { source: "ui/dropdown-menu.tsx", path: "dropdown-menu.tsx", type: "registry:component" },
    ],
  },
  {
    name: "tabs",
    type: "registry:ui",
    description: "Swipeable glass segmented tabs",
    dependencies: ["@radix-ui/react-tabs", "class-variance-authority"],
    registryDependencies: ["utils"],
    files: [{ source: "ui/tabs.tsx", path: "tabs.tsx", type: "registry:component" }],
  },
  {
    name: "responsive-sheet",
    type: "registry:ui",
    description: "Bottom drawer on mobile, centered dialog on desktop",
    dependencies: ["@radix-ui/react-dialog", "class-variance-authority", "lucide-react"],
    registryDependencies: ["utils"],
    files: [
      {
        source: "ui/responsive-sheet.tsx",
        path: "responsive-sheet.tsx",
        type: "registry:component",
      },
    ],
  },
];
