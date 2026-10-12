// @ts-check
import { defineConfig } from "astro/config";
import sitemap, { ChangeFreqEnum } from "@astrojs/sitemap";

export default defineConfig({
  site: "https://www.lyfie.org",
  // Fully static: every page is prebuilt HTML served from Cloudflare's edge as
  // Worker static assets. Nothing on this site needs a server.
  output: "static",
  integrations: [
    sitemap({
      // HTML pages only: the 404 and the plain-text twins (/llms.txt,
      // /projects/*.md, the RSS feed) are linked from the pages themselves.
      filter: (page) => !/\/404\/?$|\.(txt|md|xml)\/?$/.test(page),
      // Home and products first; every build is a fresh look at the content.
      serialize: (item) => {
        const path = new URL(item.url).pathname;
        const priority =
          path === "/"
            ? 1
            : path.startsWith("/projects/")
              ? 0.9
              : path === "/changelog/"
                ? 0.6
                : 0.7;
        return {
          ...item,
          lastmod: new Date().toISOString(),
          changefreq:
            path === "/changelog/" ? ChangeFreqEnum.WEEKLY : ChangeFreqEnum.MONTHLY,
          priority
        };
      }
    })
  ],
  devToolbar: { enabled: false },
  build: { format: "directory" },
  vite: {
    build: {
      // Keep chunks whole; a site this small gains nothing from dozens of requests.
      assetsInlineLimit: 2048
    }
  }
});
