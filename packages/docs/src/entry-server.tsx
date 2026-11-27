import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import { App } from "@/App";
import { getPageMeta, pages, renderHead, notFoundMeta, SITE_URL } from "@/site";

export { pages, notFoundMeta, SITE_URL };

export function render(url: string) {
  const html = renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>
  );
  return { html, head: renderHead(getPageMeta(url)) };
}
