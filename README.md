# Nisha Fashions Wear (NFW)

Corporate website for **Nisha Fashions Wear** — a Bangladesh-based apparel supplier, sourcing and export partner for international buyers.

Public website and a future Admin CMS live in a single Next.js App Router repository, deployed to Vercel. Content is currently typed local data (`lib/content/*`) shaped like the planned database tables, so a CMS can replace it with minimal component changes.

> **Business truth:** NFW does **not** own or operate a factory. It works through selected/trusted factory partners, managing product development, sourcing, costing, production supervision, quality control and export coordination. Copy, imagery and metadata must never imply factory ownership, and no certifications, statistics, awards, clients or testimonials may be invented.

---

## Stack

| Layer | Technology | Notes |
|---|---|---|
| Framework | Next.js `16.3.8` (App Router) | React Server Components by default |
| Language | TypeScript `^5` (strict) | `tsconfig.json`, `@/*` → repo root |
| UI | Tailwind CSS `^4` | CSS variables / semantic tokens in `app/globals.css`, PostCSS plugin `@tailwindcss/postcss` |
| Components | shadcn/ui (`new-york`, CSS variables) | Only components actually used are installed |
| Icons | Lucide React | |
| Animations | `motion` / `framer-motion` | Kept for interaction transitions; respect `prefers-reduced-motion` |
| WebGL | `ogl` + `d3` + `topojson-client` | Globe/map visuals in `components/ui`, `components/shadcnmaps` |
| Lint | ESLint `^9` + `eslint-config-next` | Flat config, `core-web-vitals` + `typescript` |
| Hosting | Vercel | `nishafashions.com` and `/admin` |
| Database (planned) | Supabase Postgres + Drizzle ORM + Supabase Auth/Storage | Not installed yet — see [Roadmap](#roadmap) |

Registry aliases configured in `components.json`: `@shadcnmaps`, `@scrollxui`, `@reactframe`.

### Node / npm

Node `20+` (developed on Node 24.15.0), npm 11+.

---

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build
npm run start      # serve production build
npm run lint       # eslint
npx tsc --noEmit  # typecheck
```

Editing files under `app/` hot-reloads the dev server.

---

## Project structure

```text
/
├── app/
│   ├── layout.tsx              # root layout, fonts (Inter + Newsreader), metadata
│   ├── globals.css             # Tailwind v4 theme + semantic tokens
│   ├── not-found.tsx
│   ├── favicon.ico
│   └── (website)/
│       ├── layout.tsx          # public site shell (header/footer)
│       ├── page.tsx            # homepage
│       ├── about/  awards/  contact/  products/  services/
├── components/
│   ├── ui/                     # shadcn/ui primitives + visual components
│   ├── website/                # homepage & page sections
│   ├── shadcnmaps/             # map components + world map data
│   └── header-simple.tsx
├── lib/
│   ├── content/                # site.ts (business data, nav, links), images.ts
│   ├── cn.ts  utils.ts  icons.tsx  motion.ts  use-controllable-state.ts
├── styles/stealth.css
├── public/images/              # photography assets (referenced via lib/content/images.ts)
├── .agents/                    # project docs: ARCHITECTURE, RULES, DESIGN, PDO, MEMORY, TASK
├── AGENTS.md  CLAUDE.md        # agent instructions
├── components.json  eslint.config.mjs  next.config.ts  postcss.config.mjs  tsconfig.json
```

`app/admin/` (Admin CMS) is **not** built yet.

---

## Routes

```text
/            homepage
/about       /products      /services      /awards      /contact
```

`/products` currently lists categories; product detail routes (`/products/[slug]`) are pending.

---

## Content & data

`lib/content/site.ts` is the single source for company name, contact details, address, nav links and quote/WhatsApp/email links. Never repeat those values inside components.

| Constant | Purpose |
|---|---|
| `site` | name, short name, tagline, categories line, experience, URL, email, phone (display + E.164), address |
| `links` | `quote`, `whatsapp` (pre-filled `wa.me`), `email`, `phone`, `quoteEmail` |
| `mainNav`, `footerNav` | navigation arrays (`NavLink`) |

`lib/content/images.ts` is the single source for imagery paths; files live in `public/images/`. Interim artwork is placeholder still-life apparel photography (garments, fabric, packing — no people, no factory floors). Replace by editing that module and `public/images/` only.

Content shape mirrors the future tables in `.agents/ARCHITECTURE.md` (`categories`, `site_settings`, `pages`, `enquiries`), so the CMS can replace local data without reshaping components.

---

## Environment variables

No `.env` file is required for the current public site. The only variable read today is optional:

```env
NEXT_PUBLIC_SITE_URL=https://www.nishafashions.com
```

Defaults to `https://www.nishafashions.com` when unset. `.env*` files are git-ignored; copy `.env.example` if you need a starting point.

When the backend lands (`.agents/ARCHITECTURE.md` §19):

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
DATABASE_URL=                       # server-only
SUPABASE_SERVICE_ROLE_KEY=          # server-only, never exposed to the browser
```

Secrets stay server-side and in Vercel environment variables — never in git, never in client bundles. Only `NEXT_PUBLIC_*` values may reach the browser.

---

## Conventions

From `.agents/RULES.md` (authoritative):

- App Router only, RSC by default; `"use client"` only when interaction requires it.
- TypeScript strict; avoid `any` without a documented reason.
- Tailwind tokens via CSS variables; theme changes belong in `globals.css`, not component internals.
- Standard shadcn/ui components used as-is via `variant`/`size`/`className`. No bespoke primitives (`PremiumButton`, `GlassCard`, …).
- Install only the shadcn components in use. No additional UI or animation libraries.
- `next/image` for imagery, `next/font` for fonts (self-hosted, no layout shift).
- Content in `lib/content/`; business data never hardcoded inside reusable components.
- Exactly one `<h1>` per page, semantic HTML, correct heading order, alt text, visible focus, keyboard support.
- Mobile-first, verify 320 → 1440px, no horizontal overflow.
- Visual direction: compact, editorial, photography-led. Neutral palette + one deep burgundy accent. No gradients (except a photographic scrim), glassmorphism, glow, particles, parallax or oversized pills.
- Lint, typecheck and production build must pass before a task is complete.

Agent-facing instruction files: `AGENTS.md` (re-added by `next dev`, keep it committed) and `CLAUDE.md`.

---

## Project documentation

| File | Contents |
|---|---|
| `.agents/ARCHITECTURE.md` | Final architecture: stack, routes, DB tables, Drizzle rules, auth, security, SEO, deployment |
| `.agents/RULES.md` | Permanent development rules |
| `.agents/DESIGN.md` | Visual reference and its translation to NFW tokens |
| `.agents/PDO.md` | Product/business + content outline |
| `.agents/MEMORY.md` | Current durable project understanding and decisions log |
| `.agents/TASK.md` | Living implementation checklist (Phase 1 = public homepage) |
| `.agents/skills/design-system-apple.md` | Design system reference |

Deviation from an architecture decision must be documented in `MEMORY.md` (and `ARCHITECTURE.md` if structural).

---

## Deployment

Vercel. Import the repository, set environment variables in the project settings, deploy. `nishafashions.com` (canonical `www`) serves both the public site and `/admin` — no separate frontend deployment.

---

## Roadmap

1. **Phase 1 — public homepage.** Sections, responsive/a11y/SEO/performance passes, production build.
2. **Phase 2 — public pages.** About, Products (+ category/product detail), Services, How We Work, Contact with enquiry form.
3. **Phase 3 — backend.** Supabase Postgres + Drizzle schema and migrations, Auth, Storage.
4. **Phase 4 — Admin CMS.** `/admin` (dashboard, pages, categories, products, media, enquiries, settings), protected server-side, Zod-validated Server Actions, `revalidatePath` on mutation.
5. **Phase 5 — SEO.** `app/sitemap.ts`, `app/robots.ts`, product metadata from database, Organization JSON-LD.

Do not start a later phase until the previous one is signed off (`.agents/TASK.md`).

---

## License

Private project. All rights reserved.