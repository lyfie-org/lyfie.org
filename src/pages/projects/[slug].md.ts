import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection, type CollectionEntry } from "astro:content";
import { projectMarkdown } from "../../lib/llms";

// Each project page as standalone Markdown: /projects/<slug>.md. Linked from the
// page as rel="alternate"; _headers points search engines back at the HTML.
export const getStaticPaths = (async () =>
  (await getCollection("projects", (p) => p.data.page)).map((project) => ({
    params: { slug: project.id },
    props: { project }
  }))) satisfies GetStaticPaths;

export const GET: APIRoute<{ project: CollectionEntry<"projects"> }> = ({ props }) =>
  new Response(projectMarkdown(props.project), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" }
  });
