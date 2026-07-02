@AGENTS.md

# Tropella

Production Next.js build of the Tropella marketing site — a premium tropical
dried-fruit / dried-vegetable / natural-powder brand serving **two audiences**:
retail shoppers ("your table") and wholesale/export buyers ("your factory").

The original design lives at `./Tropella.html` (a bundled Claude Design export).
The real markup is JSON-encoded inside its `<script type="__bundler/template">`
tag — decode that if you need to re-check the source, don't read the raw file.

## Stack

- **Next.js 16** (App Router) — ⚠️ breaking changes vs. older versions; see `AGENTS.md`
- **React 19** · **TypeScript** (strict)
- **Tailwind CSS v4** — CSS-based config via `@theme` in `app/globals.css` (NO `tailwind.config.ts`)
- **shadcn/ui** (radix primitives, `radix-nova` style, CSS-variable theming) in `components/ui/`
- **Material Symbols** (icon font, loaded in `layout.tsx`) — icon names map 1:1 with the design
- **next/font** — Bricolage Grotesque (display) + Hanken Grotesk (body)
- **Resend** via **Server Actions** for the contact & newsletter forms
- **zod** for server-side validation

## Commands

- `npm run dev` — dev server
- `npm run build` — production build
- `npm run lint` — eslint

## Folder structure

```
app/
  layout.tsx           # fonts, Material Symbols, metadata, <body>
  page.tsx             # composes the section components
  globals.css          # design tokens (@theme), keyframes, base layer
  actions/             # "use server" — submitContact, subscribeNewsletter
components/
  ui/                  # shadcn primitives (restyled to tokens) — do not hand-edit lightly
  sections/            # one component per page section (hero, range, ...)
  <shared>.tsx         # site-header, site-footer, section-heading, product-card, etc.
lib/
  email.ts             # Resend wrapper (server-only) — the ONLY file importing the SDK
  utils.ts             # cn()
Tropella.html          # original design reference (do not ship)
```

## Design tokens (source of truth = `app/globals.css`)

Defined once as CSS vars / `@theme` colors. **Never hardcode hex values in JSX** —
use the token utilities.

| Token | Value | Use |
|---|---|---|
| `bg-canvas` | `#14110C` | page background (named `canvas`, not `base` — `base` clashes with the `text-base` font-size utility) |
| `bg-surface` | `#1A160F` | alternating section bg |
| `bg-surface-2` | `#211C14` | cards / feature tiles |
| `bg-field` | `#171309` | form inputs |
| `text-ink` | `#F5EFE3` | primary text |
| `text-ink-soft` | `#CFC6B5` | nav links / bright meta |
| `text-ink-muted` | `#BDB3A1` | body copy |
| `text-ink-dim` | `#A89E8C` | captions / meta / footer links |
| `text-ink-faint` | `#7A715F` | footer legal |

> The design uses ~9 near-identical muted cream shades; these were consolidated
> into the ramp above (lightness deltas <5%, imperceptible on the dark bg). Use
> the nearest token rather than introducing new hex values.
| `text/bg-brand` | `#F4A93C` | primary orange accent |
| `brand-deep` | `#E9663B` | gradient end / warm |
| `brand-soft` | `#F4C277` | orange text on dark |
| `text/bg-leaf` | `#86C03F` | green accent (wholesale/export) |
| `leaf-soft` | `#A7D26E` | green text on dark |

shadcn semantic tokens (`primary`, `card`, `border`, `input`, `ring`, …) are wired
to this palette in `:root` — the app is **always dark**, no light theme.

- **Fonts:** `font-display` (Bricolage Grotesque, headings/logo/numerals), `font-sans`/`font-body` (Hanken Grotesk, default).
- **Brand gradient:** `linear-gradient(135deg,#F4A93C,#E9663B)` — use for logo mark, CTA seals.
- **Animations:** `animate-float`, `animate-float2`, `animate-herofloat`, `animate-marquee`, `animate-spin-slow` (keyframes in `globals.css`).
- **Container:** `max-w-7xl` (=1280px) + `px-6 md:px-8`. Section vertical padding ~`py-16 md:py-[90px]`.
- **Radii:** pills use `rounded-full`; cards `rounded-2xl`/`rounded-3xl`.

## Conventions

- **Server Components by default.** Add `"use client"` ONLY where interactivity
  requires it. Client so far: `SiteHeader` (scroll bg + mobile menu), `Reveal`
  (scroll-in), `ContactForm`, `NewsletterForm`.
- **Mobile-first & responsive** — most traffic is mobile. Author base (phone)
  styles first, enhance up with `md:` (768) / `lg:` (1024). The design's original
  JS resize logic is replaced by Tailwind breakpoints. Verify every component at
  mobile / tablet / desktop. Tap targets ≥ 44px, no horizontal overflow.
- **Icons:** `<Icon name="spa" />` wrapper over `.material-symbols-outlined`.
  Use the exact Material Symbol names from the design.
- **Styling:** Tailwind utilities + tokens only. Variants via CVA + `cn()`.
  No inline `style={{}}` (except dynamic values like the icon `FILL` axis), no CSS Modules.
- **Buttons:** `components/ui/button.tsx` adds brand variants `brand` (orange pill),
  `leaf` (green pill), `brandOutline`, plus pill sizes `pill` (nav) / `pillLg` (hero).
  Use `asChild` to render a `<Link>`/`<a>` as a CTA.
- **Gradients:** Tailwind v4 uses `bg-linear-to-*` (NOT `bg-gradient-to-*`).
- **Components:** small, single-purpose, typed props. Repeated UI (eyebrow labels,
  section headings, cards) is extracted, not copy-pasted.
- **Images:** the design has no real assets — use the `ImagePlaceholder` component;
  swap for `next/image` when assets arrive.

## Forms & email

- Forms are client components using `useActionState` against Server Actions in
  `app/actions/`. Validation is **server-side** with zod (client checks are UX only).
- `lib/email.ts` is the single integration point for Resend and is `server-only`.
  With no `RESEND_API_KEY` set it logs the payload and returns success, so the app
  runs on a fresh clone with zero config. Copy `.env.example` → `.env.local` and add
  a key to actually deliver mail. **Never** put the key or SDK in client code.

## Build progress

- [x] Step 1 — scaffold: tokens, fonts, globals, layout, email infra, this doc
- [x] Step 2 — layout shell: SiteHeader + SiteFooter (+ Icon, Eyebrow, Logo, Button variants)
- [x] Reveal (scroll-in) + ImagePlaceholder shared components
- [x] Hero
- [x] Trust Marquee (+ reusable Marquee)
- [x] Dual Audience
- [ ] Sections: Range → Process → WaysToEnjoy →
      Wholesale → About → Testimonials → Newsletter → Contact

Build one component at a time; pause for review after each.
