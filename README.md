# lyfie.org

Official website for Lyfie, built with Next.js App Router, TypeScript, CSS Modules, and Cloudflare-compatible Edge APIs.

## Stack

- Next.js (App Router)
- TypeScript (strict)
- CSS Modules
- Framer Motion
- Phosphor Icons
- React Hook Form + Zod
- Cloudflare Turnstile + fetch-based email API (Resend-compatible)

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Environment Variables

Copy `.env.example` to `.env.local` and set:

- `EMAIL_API_KEY`
- `EMAIL_FROM`
- `CONTACT_TO_EMAIL`
- `TURNSTILE_SECRET_KEY`
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`

## Quality Commands

```bash
npm run lint
npm run typecheck
npm run build
```

## Project Notes

- SEO routes: `app/robots.ts`, `app/sitemap.ts`, `app/manifest.ts`
- LLM discoverability docs: `public/llms.txt`, `public/llms-full.txt`
- Contact API route: `app/api/contact/route.ts`
- Implementation logs: `.docs/`
