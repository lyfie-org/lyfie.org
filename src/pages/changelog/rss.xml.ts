import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { DESCRIPTION, SITE_URL } from "../../data/site";

// RSS 2.0 for the org-wide changelog: readers, feed bots and assistants that
// watch for releases get them without scraping.
const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export const GET: APIRoute = async () => {
  const entries = (await getCollection("changelog")).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );
  const projects = new Map(
    (await getCollection("projects")).map((p) => [p.id, p] as const)
  );

  const items = entries.map((e) => {
    const project = e.data.project ? projects.get(e.data.project) : undefined;
    const link =
      e.data.link ??
      (project?.data.page
        ? `${SITE_URL}/projects/${project.id}/`
        : `${SITE_URL}/changelog/`);
    const body = e.body?.trim().replace(/\s+/g, " ");
    return [
      "    <item>",
      `      <title>${esc(e.data.title)}</title>`,
      `      <link>${esc(link)}</link>`,
      `      <guid isPermaLink="false">lyfie-changelog-${e.id}</guid>`,
      `      <pubDate>${e.data.date.toUTCString()}</pubDate>`,
      `      <category>${e.data.kind}</category>`,
      project ? `      <category>${esc(project.data.name)}</category>` : "",
      body ? `      <description>${esc(body)}</description>` : "",
      "    </item>"
    ]
      .filter(Boolean)
      .join("\n");
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Lyfie changelog</title>
    <link>${SITE_URL}/changelog/</link>
    <atom:link href="${SITE_URL}/changelog/rss.xml" rel="self" type="application/rss+xml" />
    <description>${esc(DESCRIPTION)}</description>
    <language>en-gb</language>
    <lastBuildDate>${(entries[0]?.data.date ?? new Date()).toUTCString()}</lastBuildDate>
${items.join("\n")}
  </channel>
</rss>
`;
  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" }
  });
};
