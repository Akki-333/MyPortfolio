# Akshay S — Portfolio

Personal engineering portfolio. React 18, Vite, TypeScript and Tailwind CSS,
deployed as a static single-page application.

Live case studies for **ArchiveMind-AI** (GraphRAG document intelligence),
**PaperMint** (multi-format citation extraction), **Stay & Dine** (full-stack
reservation platform) and two data science builds, each opening into its
architecture, pipeline stages, key decisions and engineering invariants.

---

## Stack

| Layer      | Choice                                              |
| ---------- | --------------------------------------------------- |
| UI         | React 18, TypeScript strict, Tailwind CSS 3          |
| Build      | Vite 5, manual vendor chunk splitting                |
| Motion     | Framer Motion (grid layout transitions only)         |
| Routing    | Wouter                                              |
| Icons      | Lucide React                                        |
| Deployment | Vercel, static output with security headers          |

No backend. The site is content plus client-side interaction, so it ships as
static files rather than carrying a server it does not need.

---

## Getting started

```bash
npm install     # install dependencies
npm run dev     # vite dev server with HMR
npm run check   # typecheck, render smoke test, production build
npm run build   # production bundle into dist/
npm run preview # serve the built bundle locally
```

---

## Architecture

`client/src` is organised feature-first. A section owns its components; shared
primitives live in `common/`; content lives in `data/` and is typed by
`types/`.

```text
client/src
├── assets/images/projects/   # Cover diagrams, authored SVG
├── components/
│   ├── common/               # Button, Pill, Modal, Tabs
│   ├── layout/               # SectionWrapper, Footer
│   ├── navigation/           # Navbar with scroll-spy and drawer
│   └── sections/             # hero, about, skills, projects,
│                             # experience, certifications, contact
├── data/                     # Typed content: single source of truth
├── hooks/                    # useScrollSpy, useReveal, useDialog,
│                             # useProjectFilter, useRoleRotator, useMediaQuery
├── lib/                      # cn helper, presentation lookups
├── styles/                   # tokens, keyframes, glass utilities
└── types/                    # Domain models, zero `any`
```

**Content is data, not markup.** Adding a project means adding a typed record
to `data/projects.ts`. Every field it needs is declared in `types/index.ts`, so
an incomplete record fails `tsc` rather than rendering a blank card.

---

## Design system

A sky-blue and white glass palette defined once in `styles/tokens.css`.

Sky-600 measures **4.09:1** against white. That clears WCAG AA for large text
but not for body copy, so it is used only as a decorative accent — rings,
borders, icon fills — and **sky-700 (5.93:1)** carries every small label, link
and solid button. Metadata uses slate-600 rather than slate-500, which drops to
4.46:1 over the tinted section bands.

Every colour pair in use was checked numerically. None sits below AA.

---

## Performance notes

- **Reveal observers disconnect on first intersection.** A reveal animation can
  only run once; leaving its observer attached wakes the main thread for the
  rest of the session.
- **`backdrop-filter` appears on two surfaces**, the navbar and the modal
  scrim. Both are small, fixed and never animate their blur radius. Cards use a
  translucent background with no blur.
- **Animations move only `transform` and `opacity`**, so they stay on the
  compositor and off the main thread.
- **The page canvas is a fixed pseudo-element**, so the gradient and dot matrix
  never repaint during scroll.
- **Images declare intrinsic dimensions**; the hero portrait is preloaded as
  WebP. Cumulative layout shift is zero by construction.
- **The role rotator reserves a fixed-height box**, so the copy beneath it does
  not jump on each swap.

---

## Accessibility

- Skip link, one `<main>` landmark, labelled sections
- Full keyboard support: modal focus trap, Escape to close, focus restored to
  the trigger; tabs follow the ARIA pattern with arrow, Home and End keys
- Filter pills expose a radio group; results announce via a live region
- Interactive targets are at least 40px
- `prefers-reduced-motion` disables reveals, the role rotator and layout
  animation

---

## Verification

```bash
npm run check
```

Runs three gates:

1. `tsc --noEmit` under `strict`, `noUncheckedIndexedAccess`, `noUnusedLocals`
2. `scripts/smoke-render.mjs` — server-renders the page and asserts each
   section emits the content it owns, catching render-time faults that type
   checking cannot
3. `vite build` — must complete with no warnings

---

## Deployment

Vercel, from `dist/`. `vercel.json` sets a strict Content-Security-Policy
(`script-src 'self'`, `frame-ancestors 'none'`), HSTS, `nosniff`,
`Referrer-Policy`, a locked-down `Permissions-Policy`, and immutable caching
for fingerprinted assets.

---

Built by [Akshay S](https://github.com/Akki-333) ·
[LinkedIn](https://www.linkedin.com/in/ak445) · akkies445@gmail.com
