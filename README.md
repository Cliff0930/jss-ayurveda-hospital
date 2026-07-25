# JSS Ayurveda Hospital, Mysuru — Website

A modern, fully responsive marketing and information site for **JSS Ayurveda
Hospital, Mysuru**, built with **Next.js (App Router)** and **Tailwind CSS**,
running on a **headless WordPress** backend.

The frontend is decoupled from the CMS: editors update content in WordPress and
it appears on the site automatically (ISR), with an option for instant
publishing via an on-demand revalidation webhook.

## Tech stack

- **Next.js 16** (App Router, React 19, Turbopack)
- **Tailwind CSS 4**
- **TypeScript**
- Headless **WordPress** REST API as the content source

## Headless CMS

Live data is read from the hospital's WordPress install and rendered on the
following pages:

| Page | Source in WordPress |
| --- | --- |
| Doctors | `doctor` CPT / `[jssdoc]` shortcode payload |
| Staff | Staff page table |
| Bio-Medical Waste Data | Waste page table (grouped by year) |
| Attendance Analysis | Attendance page tables (one per month) |
| Gallery | Gallery page image groups |
| Department Packages | Packages page posters |
| Privacy / Terms | Respective WordPress pages |

Marketing copy (hero, services, treatments, packages, FAQs, etc.) lives in
`src/content/` and is shaped so it can later be moved to ACF field groups —
see `getPageAcf()` in `src/lib/wp/queries.ts`.

The data adapter and its rationale are documented in `src/lib/wp/parse.ts`.

## Getting started

```bash
npm install
cp .env.example .env.local   # then edit values
npm run dev                  # http://localhost:3000
```

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Lint |
| `npm run typecheck` | Type-check without emitting |

## Environment

Copy `.env.example` to `.env.local` and set:

- `NEXT_PUBLIC_WP_URL` / `NEXT_PUBLIC_WP_HOSTNAME` — the WordPress source
- `WP_REVALIDATE_SECONDS` — ISR window (default 300s)
- `REVALIDATE_SECRET` — shared secret for `POST /api/revalidate`
- `ENQUIRY_WEBHOOK_URL` / `ENQUIRY_TO_EMAIL` — where the contact form forwards

### Instant publishing (optional)

Add to the WordPress theme's `functions.php` to purge the cache on every save —
the snippet is in `src/app/api/revalidate/route.ts`.

## Images

Real hospital photography is mapped in `src/lib/media.ts`. Slots that still need
a generated image are listed at `/image-brief` (each with exact dimensions and a
prompt); drop a file into `public/ai/` and register its `src` in
`src/lib/image-prompts.ts`.

## Project structure

```
src/
  app/            # routes (App Router) + API routes
  components/     # UI, layout, home, data, doctors, gallery, …
  content/        # editorial copy (transcribed from the source site)
  lib/
    wp/           # headless WordPress client, parsers and queries
    media.ts      # image references
    site.ts       # identity, contact, navigation
```
