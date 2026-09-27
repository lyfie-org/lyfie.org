// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://www.lyfie.org",
  // Fully static: every page is prebuilt HTML served from Cloudflare's edge as
  // Worker static assets. Nothing on this site needs a server.
  output: "static",
  integrations: [sitemap()],
  devToolbar: { enabled: false },
  build: { format: "directory" },
  vite: {
    build: {
      // Keep chunks whole; a site this small gains nothing from dozens of requests.
      assetsInlineLimit: 2048
    }
  }
});
