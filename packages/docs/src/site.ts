export const SITE_NAME = "Glass Orbit";

/** Public URL of the docs, used for canonical links, Open Graph and the sitemap. */
export const SITE_URL = (
  import.meta.env.VITE_SITE_URL || "https://orbitdesign.vercel.app"
).replace(/\/$/, "");

export const OG_IMAGE = "/og.png";

export interface PageMeta {
  path: string;
  title: string;
  description: string;
}

export const pages: PageMeta[] = [
  {
    path: "/",
    title: "Glass Orbit — Glassmorphic React Components",
    description:
      "Beautiful glassmorphic React components with gradient depth effects. Mobile first, fully customizable themes, copy-paste like shadcn/ui.",
  },
  {
    path: "/docs",
    title: "Introduction — Glass Orbit",
    description:
      "Glass Orbit is a collection of glassmorphic React components you copy into your app. Glass gradient effects, JSON themes, dark mode, built on Radix UI and Tailwind CSS.",
  },
  {
    path: "/docs/installation",
    title: "Installation — Glass Orbit",
    description:
      "Set up Glass Orbit in your React project: run npx glass-orbit init, install the dependencies, add components and generate a custom theme.",
  },
  {
    path: "/docs/theming",
    title: "Theming — Glass Orbit",
    description:
      "Rebrand Glass Orbit with one CSS variable, or customize every color, gradient, depth and radius with a JSON theme file. Includes presets.",
  },
  {
    path: "/docs/components/button",
    title: "Button — Glass Orbit",
    description:
      "A Liquid Glass pill button for React with default, secondary, outline, ghost, destructive and glass variants, label and icon-only sizes.",
  },
  {
    path: "/docs/components/responsive-sheet",
    title: "ResponsiveSheet is now Dialog — Glass Orbit",
    description:
      "ResponsiveSheet is the old name for the Glass Orbit Dialog: one component that is a bottom sheet on mobile and a centered modal on desktop.",
  },
  {
    path: "/docs/components/badge",
    title: "Badge — Glass Orbit",
    description: "A small glass label for status, counts and tags in React, with default, secondary, outline, destructive and glass variants.",
  },
  {
    path: "/docs/components/card",
    title: "Card — Glass Orbit",
    description: "A glassmorphic React card with header, title, description, content and footer parts. Mobile first padding, link cards with asChild.",
  },
  {
    path: "/docs/components/dialog",
    title: "Dialog — Glass Orbit",
    description: "A mobile first React dialog: a bottom sheet you swipe down to close on phones, a centered modal on desktop. Built on Radix Dialog.",
  },
  {
    path: "/docs/components/dropdown-menu",
    title: "Dropdown Menu — Glass Orbit",
    description: "A React dropdown menu that becomes an action sheet on phones and a menu next to its button on desktop. Built on Radix.",
  },
  {
    path: "/docs/components/input",
    title: "Input — Glass Orbit",
    description: "A glass text input for React, 44px tall with 16px text on phones so iOS does not zoom, with error and disabled states.",
  },
  {
    path: "/docs/components/tabs",
    title: "Tabs — Glass Orbit",
    description: "Glass segmented and underline tabs for React. Full width and swipeable on phones with 44px tap targets. Built on Radix Tabs.",
  },
];

export const notFoundMeta: PageMeta = {
  path: "/404",
  title: "Page not found — Glass Orbit",
  description: "This page does not exist. Browse the Glass Orbit docs instead.",
};

export function getPageMeta(path: string): PageMeta {
  const clean = path.replace(/[?#].*$/, "").replace(/\/$/, "") || "/";
  return pages.find((p) => p.path === clean) ?? notFoundMeta;
}

const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** The <head> tags for one page, as an HTML string. */
export function renderHead(meta: PageMeta): string {
  const isNotFound = meta === notFoundMeta;
  const url = `${SITE_URL}${meta.path === "/" ? "/" : meta.path}`;
  const image = `${SITE_URL}${OG_IMAGE}`;
  const tags = [
    `<title>${escape(meta.title)}</title>`,
    `<meta name="description" content="${escape(meta.description)}" />`,
    isNotFound
      ? `<meta name="robots" content="noindex" />`
      : `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:title" content="${escape(meta.title)}" />`,
    `<meta property="og:description" content="${escape(meta.description)}" />`,
    isNotFound ? "" : `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escape(meta.title)}" />`,
    `<meta name="twitter:description" content="${escape(meta.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
  ];
  return tags.filter(Boolean).join("\n    ");
}
