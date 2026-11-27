// Renders every docs route to static HTML after `vite build`,
// then writes sitemap.xml and robots.txt next to it.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const clientDir = path.join(root, "dist/client");
const serverEntry = path.join(root, "dist/server/entry-server.js");

const template = fs.readFileSync(path.join(clientDir, "index.html"), "utf8");
const { render, pages, notFoundMeta, SITE_URL } = await import(pathToFileURL(serverEntry).href);

function write(route, file) {
  const { html, head } = render(route);
  const page = template.replace("<!--app-head-->", head).replace("<!--app-html-->", html);
  const out = path.join(clientDir, file);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, page);
  console.log(`  ${route.padEnd(36)} -> ${file}`);
}

console.log("Prerendering:");
for (const { path: route } of pages) {
  // "/docs/theming" -> docs/theming.html (served at /docs/theming via cleanUrls)
  write(route, route === "/" ? "index.html" : `${route.slice(1)}.html`);
}
write(notFoundMeta.path, "404.html");

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (p) => `  <url>
    <loc>${SITE_URL}${p.path}</loc>
    <lastmod>${today}</lastmod>
  </url>`
  )
  .join("\n")}
</urlset>
`;
fs.writeFileSync(path.join(clientDir, "sitemap.xml"), sitemap);
fs.writeFileSync(
  path.join(clientDir, "robots.txt"),
  `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`
);
console.log("  sitemap.xml, robots.txt");

fs.rmSync(path.join(root, "dist/server"), { recursive: true, force: true });
