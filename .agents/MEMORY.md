# NFW — Project Memory

**Document:** `MEMORY.md`
**Purpose:** Current, durable project understanding so future agents do not need to rediscover decisions.
**Update this file** whenever a business fact, design decision or architecture decision changes.

---

## Project

**Nisha Fashions Wear (NFW)** — corporate website + (future) Admin CMS.
Domain: `https://www.nishafashions.com` (preferred canonical host: `www`).

## Business

Bangladesh-based **apparel supplier, sourcing and export partner**.

### Core offer

- Knit
- Woven
- Denim
- Sweater

Footer range line (approved): Knitwear | Woven | Denim | Sweater | Sportswear | Outerwear.

### Business model

NFW receives buyer requirements and manages product development, sourcing, costing, production supervision, quality control and export support through **selected / trusted factory partners**, matched by product, quantity, quality requirement and target price.

> **IMPORTANT:** NFW must **NOT** be presented as owning or operating its own factory.

### Experience

- **20+ years** of garment business experience.
- International experience: **Greece, Europe, Canada, USA** and other international markets.
- PDO-approved copy also states long-term relationships in **Greece, Italy and Canada**, and that **references can be provided to serious buyers on request**. No client names or logos may be shown.

### Audience

International apparel buyers, importers, brands, retailers, wholesalers, private-label businesses and sourcing teams.

### CTAs

- Primary: **Get a Quote**
- Secondary: **WhatsApp Us** (opens `wa.me` with a pre-filled enquiry message)

### Approved contact data (single source: `lib/content/site.ts`)

- Email: info@nishafashions.com
- Phone / WhatsApp: +88 01715 645766 (`+8801715645766`)
- Website: www.nishafashions.com
- Registered office: 92, Moneswar Road, Zigatola, Dhaka-1209, Bangladesh (display exactly)

---

## Visual Direction

Premium · Editorial · Minimal · International B2B · Fashion industry · Photography-led · Apple-inspired restraint.

### How `DESIGN.md` (Apple reference) is translated — decided

| Apple reference | NFW translation | Reason |
|---|---|---|
| Single Action Blue accent | Near-black primary + restrained **burgundy** accent | Brief forbids blue SaaS accents |
| Pill CTAs | Standard shadcn `Button`, subtle radius (`--radius` ≈ 0.25rem) | Brief forbids huge pills / oversized rounding |
| SF Pro Display/Text | **Newsreader** (display serif) + **Inter** (sans body/UI) via `next/font` | Editorial apparel feel; Inter is DESIGN.md's documented SF substitute |
| Light ↔ dark tile alternation as divider | Off-white ↔ warm parchment ↔ near-black bands | Kept: colour change is the divider, fewer borders |
| Weight 600 headlines, tight tracking | Serif display at 400–500, slight negative tracking | Serif reads more refined at lighter weights |
| 17px body, 1.47 leading | ~16–17px body, ~1.6 leading | Kept for reading pace |
| 80px section padding, one viewport per tile | Compact: ~64–96px desktop, ~48–56px mobile | Brief: compact, no huge empty space |
| Frosted sub-nav (backdrop blur) | Solid header with hairline border | Brief forbids glassmorphism |
| Single product drop-shadow | No shadows | Photography is flat editorial, not product renders |

### Palette (tokens in `app/globals.css`)

Warm off-white background, near-black foreground, muted warm grey, hairline borders, near-black primary, deep burgundy accent. No gradients except a photographic legibility scrim on the hero image.

### shadcn philosophy

Use standard shadcn/ui components (new-york style, CSS variables) with minimal customisation. Do not turn shadcn into a fancy design system. The interface should look good because of **typography, spacing, photography, hierarchy, layout and restraint** — not effects.

---

## Architecture (summary — full detail in `ARCHITECTURE.md`)

- Single Next.js App Router repo → Vercel. Future: Supabase (Postgres/Auth/Storage) + Drizzle.
- Public website lives in `app/(website)/`. Admin will live in `app/admin/` (not built yet).
- Homepage content is currently typed local data in `lib/content/*`, shaped like the future DB tables (`categories`, `site_settings`, `pages`) so the CMS can replace it with minimal component changes.
- Imagery lives in `public/images/` and is referenced only through `lib/content/images.ts`.

## Content decisions log

- **H1 / positioning:** "Bangladesh Apparel Supplier & Sourcing Partner" (PDO §20 + brief). PDO §8 mentions "Manufacturer"; "Supplier" is used in visible copy to avoid implying factory ownership. "Manufacturer" terms remain only as SEO keywords.
- **About copy:** uses the brief's wording ("apparel supplier, sourcing and export company") rather than PDO's "apparel manufacturer…" for the same reason.
- **Interim imagery:** generated still-life apparel photography (garments, fabric, packing — **no people, no factory floors**) is used as placeholder art direction. Replace with real NFW photography when available; only `lib/content/images.ts` and `public/images/` need to change.
- **Explore Category links** point to `/products#<slug>` until product/category pages exist.
- **Get a Quote** points to `/contact` (future enquiry form). Until the contact page exists, links resolve to the on-page `#quote` section on the homepage.

## Phase status

Phase 1 = public homepage only. See `TASK.md`. Do **not** build admin, Supabase, Drizzle, auth, CMS, CRUD, media manager or enquiry DB until the homepage is signed off.
