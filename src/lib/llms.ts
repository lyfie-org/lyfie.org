// Plain-text views of the site for AI assistants and crawlers, following the
// llms.txt convention (https://llmstxt.org):
//   /llms.txt               a short map of the site
//   /llms-full.txt          everything below in one file
//   /projects/<slug>.md     each project page as standalone Markdown
// Built from the same content as the pages (projects, changelog, FAQ), so they
// can never disagree.

import { getCollection, type CollectionEntry } from "astro:content";
import { FAQ } from "../data/about";
import { MEDIA } from "../data/media";
import {
  CREATOR_GITHUB_URL,
  CREATOR_NAME,
  CREATOR_URL,
  DESCRIPTION,
  GITHUB_ORG_URL,
  SITE_URL,
  SPONSORS_URL,
  TAGLINE
} from "../data/site";

type Project = CollectionEntry<"projects">;

const STATUS = {
  stable: "Stable",
  beta: "Beta",
  alpha: "Alpha",
  planned: "In development"
} as const;

export async function sortedProjects(): Promise<Project[]> {
  return (await getCollection("projects")).sort((a, b) => a.data.order - b.data.order);
}

const facts = (p: Project["data"]) =>
  [
    `- Type: ${p.type}`,
    `- Status: ${STATUS[p.status]}`,
    p.license && `- Licence: ${p.license} (free and open source)`,
    p.site && `- Website: ${p.site}`,
    p.docs && `- Documentation: ${p.docs}`,
    p.repo && `- Source code: ${p.repo}`,
    p.points.length > 0 && `- Highlights: ${p.points.join(", ")}`
  ].filter(Boolean) as string[];

/** One project as standalone Markdown: facts, install, the page body, what it does. */
export function projectMarkdown({ id, data: p, body }: Project): string {
  const clips = MEDIA[id] ?? [];
  return [
    `# ${p.name}`,
    "",
    `> ${p.tagline}`,
    "",
    `Source page: ${SITE_URL}/projects/${id}/`,
    `Made by Lyfie (${SITE_URL}), the open-source organisation founded by ${CREATOR_NAME}.`,
    "",
    ...facts(p),
    "",
    ...(p.install ? ["## Get started", "", "```bash", p.install.trim(), "```", ""] : []),
    (body ?? "").trim(),
    "",
    ...(clips.length > 0
      ? ["## What it does", "", ...clips.map((c) => `- **${c.title}** ${c.text}`), ""]
      : [])
  ].join("\n");
}

function intro(): string[] {
  return [
    "# Lyfie",
    "",
    `> ${DESCRIPTION}`,
    "",
    `Lyfie (${SITE_URL}) is an open-source organisation founded by ${CREATOR_NAME} (${CREATOR_URL}, GitHub ${CREATOR_GITHUB_URL}). Motto: “${TAGLINE}”`,
    "Everything it makes is free: no paid tier, no licence keys, no telemetry, no lock-in, and self-hosted wherever it can be. All work happens in public at " +
      `${GITHUB_ORG_URL}.`,
    ""
  ];
}

function projectLine({ id, data: p }: Project): string {
  const name = p.page ? `[${p.name}](${SITE_URL}/projects/${id}.md)` : p.name;
  const extra = [p.license, STATUS[p.status], p.site && `Site: ${p.site}`]
    .filter(Boolean)
    .join(". ");
  return `- ${name}: ${p.tagline} ${extra}.`;
}

const faq = () => FAQ.flatMap(({ q, a }) => [`### ${q}`, "", a, ""]);

export async function llmsIndex(): Promise<string> {
  const projects = await sortedProjects();
  return [
    ...intro(),
    "## Projects",
    "",
    ...projects.map(projectLine),
    "",
    "## Frequently asked questions",
    "",
    ...faq(),
    "## Organisation",
    "",
    `- [Manifesto](${SITE_URL}/manifesto/): why Lyfie exists and what it promises`,
    `- [Changelog](${SITE_URL}/changelog/): notable releases across projects (RSS: ${SITE_URL}/changelog/rss.xml)`,
    `- [Contribute](${SITE_URL}/contribute/): how to help, report bugs and sponsor`,
    `- [Sponsor](${SPONSORS_URL})`,
    "",
    "## Optional",
    "",
    `- [Everything above, plus every project page, in one file](${SITE_URL}/llms-full.txt)`,
    `- [Sitemap](${SITE_URL}/sitemap-index.xml)`,
    ""
  ].join("\n");
}

export async function llmsFull(): Promise<string> {
  const projects = await sortedProjects();
  const changelog = (await getCollection("changelog")).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );
  const day = (d: Date) => d.toISOString().slice(0, 10);
  return [
    ...intro(),
    "## Projects",
    "",
    ...projects.map(projectLine),
    "",
    ...projects
      .filter((p) => p.data.page)
      .map((p) => `---\n\n${projectMarkdown(p).replace(/^#/gm, "##")}`),
    "---",
    "",
    "## Frequently asked questions",
    "",
    ...faq(),
    "## Changelog",
    "",
    ...changelog.map(
      (e) =>
        `- ${day(e.data.date)} — ${e.data.title}${e.data.link ? ` (${e.data.link})` : ""}`
    ),
    ""
  ].join("\n");
}
