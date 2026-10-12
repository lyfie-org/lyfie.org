// What Lyfie is, said once — for the home page FAQ, its structured data and the
// plain-text summary for search engines and AI assistants (/llms.txt).
//
// Every line here must be true. If something changes, change it here and every
// surface follows.

import type { CollectionEntry } from "astro:content";
import {
  CREATOR_GITHUB_URL,
  CREATOR_NAME,
  CREATOR_URL,
  DESCRIPTION,
  GITHUB_ORG_URL,
  SITE_URL,
  X_URL
} from "./site";

export const FAQ: { q: string; a: string }[] = [
  {
    q: "Is it really free?",
    a: "Yes. Every Lyfie project is open source — Luthor under MIT, Papyra under GPL-3.0 — with no paid tier, no licence key and no account with us. Sponsorship keeps the work going; it never buys features others cannot have."
  },
  {
    q: "Do you track me?",
    a: "No. Our apps collect no telemetry, analytics or crash reports, and this site makes no third-party requests — even the fonts are served from lyfie.org."
  },
  {
    q: "Can I run the apps on my own hardware?",
    a: "Yes, that is the point. Papyra is one Docker container with one volume, on amd64 or arm64 — a NAS, a Raspberry Pi or a small VPS. Luthor is an npm package that runs inside your own app."
  },
  {
    q: "What is Rokada?",
    a: "A private, self-hosted personal finance app, in development now. Like everything Lyfie makes it will run on your own machine, keep your data there and be free. It is not public yet — watch lyfie-org on GitHub to see it the day it is."
  },
  {
    q: "Who makes Lyfie?",
    a: `Lyfie was founded by ${CREATOR_NAME} and is built in the open on GitHub. One person keeps the direction coherent; anyone can shape it with an issue, an idea or a pull request.`
  },
  {
    q: "How can I help?",
    a: "Star a repo, report a bug, pick up a good first issue, improve the docs, or sponsor the work. The contribute page has the details."
  }
];

/** The schema.org graph for the home page: who Lyfie is, and what it ships. */
export function homeGraph(
  projects: CollectionEntry<"projects">[],
  /** Absolute URLs of each project's cover screenshot, by project id. */
  covers: Record<string, string> = {}
) {
  const org = { "@id": `${SITE_URL}/#organization` };
  const person = { "@id": `${CREATOR_URL}/#person` };

  const software = projects
    .filter((p) => p.data.status !== "planned")
    .map(({ id, data: p }) => ({
      "@type": p.type === "library" ? "SoftwareSourceCode" : "SoftwareApplication",
      "@id": `${SITE_URL}/projects/${id}/#software`,
      name: p.name,
      description: p.tagline,
      mainEntityOfPage: `${SITE_URL}/projects/${id}/`,
      ...(covers[id] ? { image: covers[id], screenshot: covers[id] } : {}),
      ...(p.site ? { url: p.site } : {}),
      ...(p.repo ? { codeRepository: p.repo } : {}),
      ...(p.license ? { license: p.license } : {}),
      ...(p.type === "app"
        ? {
            applicationCategory: "ProductivityApplication",
            operatingSystem: "Linux, macOS, Windows (Docker); any modern browser",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }
          }
        : { programmingLanguage: "TypeScript" }),
      isAccessibleForFree: true,
      author: org,
      publisher: org
    }));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        ...org,
        name: "Lyfie",
        url: SITE_URL,
        logo: `${SITE_URL}/android-chrome-512x512.png`,
        description: DESCRIPTION,
        sameAs: [GITHUB_ORG_URL, X_URL],
        founder: person
      },
      {
        "@type": "Person",
        ...person,
        name: CREATOR_NAME,
        url: CREATOR_URL,
        sameAs: [CREATOR_GITHUB_URL],
        affiliation: org
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "Lyfie",
        description: DESCRIPTION,
        inLanguage: "en",
        publisher: org
      },
      ...software,
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: FAQ.map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a }
        }))
      }
    ]
  };
}
