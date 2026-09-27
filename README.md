# lyfie.org

The home of the Lyfie open-source organisation. It is a static [Astro](https://astro.build) site served from a Cloudflare Worker's static assets at www.lyfie.org.

The design system is shared with [papyra.app](https://papyra.app): paper and ink neutrals, Marcellus, Sora and Roboto Mono, with Lyfie's sakura pink as the accent. All tokens live in `src/styles/tokens.css`.

## Quick start

```bash
pnpm install
pnpm dev          # http://localhost:4321
```

## Adding content

- **A project:** add `src/content/projects/<slug>.md`. The frontmatter schema is in `src/content.config.ts`. The project then appears on the home page (if `featured: true`), in `/projects/`, at `/projects/<slug>/`, and in the footer.
- **A changelog entry:** add `src/content/changelog/<date>-<slug>.md`.
- **A logo:** put it in `src/assets/logos/` and reference it from the project's frontmatter.

## Quality gates

`pnpm validate` runs everything CI runs:

| Command                              | Checks                                                                                                               |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| `pnpm format` / `lint` / `typecheck` | Prettier, ESLint, `astro check`                                                                                      |
| `pnpm build`                         | Static build into `dist/`                                                                                            |
| `pnpm check:fonts`                   | No third-party font origin in the built HTML or CSS                                                                  |
| `pnpm cf:check`                      | `wrangler deploy --dry-run`                                                                                          |
| `pnpm smoke`                         | Serves `dist/` with `wrangler dev` (workerd) and checks the pages, assets, `_headers` and the 404                    |
| `pnpm check:layout`                  | No page scrolls horizontally at 320px or 1440px (Playwright; run `pnpm exec playwright install chromium` once first) |

Other scripts:

- `pnpm fonts`: re-downloads the self-hosted fonts.
- `pnpm og`: re-renders `public/og.png`.

## Deploy

`.github/workflows/site.yml` runs on push only:

- `development` uploads a preview version, served at `development-lyfie-org.<subdomain>.workers.dev`.
- `main` deploys to production.

It needs two repository secrets: `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`.
