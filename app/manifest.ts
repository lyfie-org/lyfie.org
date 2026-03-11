import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Lyfie",
    short_name: "Lyfie",
    description:
      "Lyfie builds polished open-source products for self-hosted, Docker-first workflows.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#f4a7b9",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml"
      }
    ]
  };
}
