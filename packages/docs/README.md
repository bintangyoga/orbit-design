# Glass Orbit docs

The docs site for Glass Orbit, built with Vite + React and prerendered to static HTML.

```bash
npm run dev      # dev server at http://localhost:5173
npm run build    # client build, SSR build, then prerender every route
npm run preview  # serve the built site from dist/client
```

`npm run build` writes one HTML file per route to `dist/client` (for example
`docs/theming.html`, served at `/docs/theming`), plus `404.html`, `sitemap.xml`
and `robots.txt`.

- Routes and their `<title>`, description and Open Graph tags live in `src/site.ts`.
  A new page needs an entry there and a `<Route>` in `src/App.tsx`.
- Canonical URLs and the sitemap use `https://orbitdesign.vercel.app` unless the
  `VITE_SITE_URL` environment variable is set at build time.
- `vercel.json` sets the Vite framework, the build command and `dist/client` as output.
