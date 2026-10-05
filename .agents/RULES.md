# NFW — Development Rules

**Document:** `RULES.md`
**Scope:** Permanent rules for every developer / AI agent working on the Nisha Fashions Wear (NFW) codebase.
**Related:** `ARCHITECTURE.md` (system architecture), `PDO.md` (business + content outline), `DESIGN.md` (visual reference), `MEMORY.md` (current understanding), `TASK.md` (living checklist).

If a rule here conflicts with a one-off request, follow the request only if it is explicit, then document the deviation in `MEMORY.md`.

---

## 1. Stack

- Use **Next.js App Router**. No Pages Router.
- Use **TypeScript** (strict). Avoid `any` unless documented.
- Use **Tailwind CSS** for styling, driven by CSS variables / semantic tokens in `app/globals.css`.
- Use **shadcn/ui** as the primary UI component system.
- Use the official shadcn/ui components and their standard APIs whenever possible.
- Prefer existing shadcn components over custom components.
- Install only the shadcn components actually used. Do not bulk-install.
- Do **NOT** install another UI library unless explicitly required.
- Use **Lucide** icons where an icon is genuinely necessary.
- Use **`next/image`** for all website imagery.
- Use **`next/font`** for fonts (self-hosted, no layout shift).
- Do not add Framer Motion or any animation library unless absolutely necessary and documented.

## 2. shadcn/ui Philosophy

- Use shadcn/ui **default** components. Do not turn shadcn into a heavily customised library.
- Do **NOT** create custom UI primitives such as `FancyButton`, `PremiumButton`, `GlowButton`, `MagneticButton`, `LuxuryCard`, `GlassCard`, `GradientCard`, `FloatingCard`, etc.
- If a standard `Button` / `Card` works, use it as-is via `variant` / `size` / `className` composition.
- Theme changes go through CSS variables in `globals.css`, not by rewriting component internals.
- Edit files in `components/ui/` only when a real bug or accessibility issue requires it, and document why.

## 3. Visual Rules

- Keep the UI **compact, clean and restrained**. Premium = hierarchy + controlled whitespace, not empty space.
- No unnecessary gradients. (A photographic legibility scrim over an image is acceptable.)
- No glassmorphism / frosted panels.
- No excessive shadows. No glowing borders.
- No oversized rounded cards or huge pill buttons. Use subtle radius.
- No fancy animated backgrounds, particles, blobs, parallax, scroll-jacking.
- No decorative illustrations or random geometric shapes.
- No visual effects that reduce readability or performance.
- No emoji as UI icons. No decorative icons used to fill space.
- Neutral palette (off-white, charcoal, near-black, muted grey) + one restrained accent (deep burgundy). No purple, neon, blue-SaaS or rainbow colour.
- Maximum two font families: one display serif, one sans for body/UI.
- Photography provides the visual richness.
- Animation: only small hover/focus transitions and the mobile menu transition. Respect `prefers-reduced-motion`.

## 4. Code Rules

- Prefer **React Server Components** by default. Add `"use client"` only when interaction requires it.
- Keep components small and reusable. Avoid duplicated markup.
- Do not over-componentise — a section does not need its own abstraction just because it is a section.
- Do **not** hardcode business data inside reusable components. Repeatable content (categories, products, trust points, process steps, contact info, nav links, SEO) lives in typed modules under `lib/content/` until the CMS replaces it.
- Keep content easy to replace later (shape mirrors the planned DB tables in `ARCHITECTURE.md`).
- Use semantic HTML and correct heading hierarchy (exactly one `<h1>` per page).
- Remove unused imports, components, CSS and dependencies before finishing.
- Do not leave TODO comments for things you already know how to implement.
- Lint, typecheck and production build must pass before a task is marked complete.

## 5. Content / Business Truth Rules

- **Never claim NFW owns or operates a factory.** Avoid "our factory", "our manufacturing facility", "our production lines", etc.
- NFW works through **selected / trusted factory partners**, with NFW managing product development, sourcing, costing, production supervision, quality control and export coordination.
- **Never invent** certifications, statistics, capacities, MOQs, clients, logos, awards, testimonials, factories, offices or compliance claims.
- Do not add fake social proof.
- Imagery must not imply NFW factory ownership (no "our factory floor" framing).
- SEO keywords such as "clothing manufacturer Bangladesh" may appear in metadata/keywords, but visible copy must stay truthful.

## 6. Quality Rules

- **Performance matters.** Minimal client JS, responsive `sizes` on images, priority only for the LCP image.
- **Accessibility matters.** Visible focus states, keyboard support, alt text, sufficient contrast, skip link, accessible names on icon buttons.
- **Mobile is a first-class layout**, not a shrunk desktop. Check 320 → 1440px. No horizontal overflow.
- Keep SEO structure correct: metadata, canonical, Open Graph, `robots.ts`, `sitemap.ts`, Organization JSON-LD with real data only.

## 7. Security / Process Rules

- Never expose secrets. Only `NEXT_PUBLIC_*` values may reach the browser, and only when intentionally public.
- Never commit `.env*` files.
- Never modify architecture decisions without documenting the reason in `MEMORY.md` (and `ARCHITECTURE.md` if structural).
- Update `TASK.md` as work is completed. Only mark items done once implemented **and** verified.
