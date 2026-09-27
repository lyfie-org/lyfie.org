import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

// Everything Lyfie makes. This collection is the single source for the home
// page cards, the /projects directory and each project page, so they can never
// describe a project differently. Card copy lives in frontmatter; the long form
// is the Markdown body.
const projects = defineCollection({
  loader: glob({ base: "./src/content/projects", pattern: "**/*.md" }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      /** One sentence for cards and the page lede. */
      tagline: z.string(),
      type: z.enum(["library", "app", "game"]),
      /** Honest maturity label. "planned" projects have no repo or site yet. */
      status: z.enum(["stable", "beta", "alpha", "planned"]),
      license: z.string().optional(),
      repo: z.string().url().optional(),
      site: z.string().url().optional(),
      docs: z.string().url().optional(),
      /** The one command that gets you started, shown with a copy button. */
      install: z.string().optional(),
      installLabel: z.string().default("Terminal"),
      /** The product's own brand colour — a small dot only, never a fill. */
      accent: z.string().regex(/^#[0-9a-f]{6}$/i),
      logo: image().optional(),
      /** Short capability names for the card footer. */
      points: z.array(z.string()).max(4).default([]),
      order: z.number().int(),
      /** Shown on the home page. */
      featured: z.boolean().default(false)
    })
});

// Org-wide "shipped" log, newest first.
const changelog = defineCollection({
  loader: glob({ base: "./src/content/changelog", pattern: "**/*.md" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    kind: z.enum(["release", "feature", "fix", "news"]),
    /** Slug of the project this entry belongs to, if any. */
    project: z.string().optional(),
    link: z.string().url().optional()
  })
});

export const collections = { projects, changelog };
