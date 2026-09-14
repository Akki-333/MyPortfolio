# Akshay S — Portfolio

My personal portfolio site. React + TypeScript + Tailwind, built with Vite and
deployed as a static site on Vercel.

**Live:** https://portfolio-by-akshay.vercel.app

## Running it

```bash
npm install
npm run dev      # dev server
npm run build    # production build into dist/
npm run check    # typecheck + smoke test + build
```

## Layout

```text
client/src
├── components/
│   ├── common/      # Button, Pill, Modal, Tabs
│   ├── layout/      # Footer, SectionWrapper
│   ├── navigation/  # Navbar
│   └── sections/    # hero, about, skills, projects, experience,
│                    # certifications, contact
├── data/            # all page content lives here
├── hooks/
├── lib/
├── styles/
└── types/
```

Content is kept out of the components. To add or edit a project, skill or job,
change the matching file in `client/src/data/` — the types in `types/index.ts`
will flag anything missing.

## Stack

React 18, TypeScript, Tailwind CSS, Vite, Framer Motion, Wouter, Lucide icons.
No backend — it's a static site.

## Deploy

Pushes to `main` deploy on Vercel. `vercel.json` holds the routing and the
response headers (CSP, HSTS, caching).

---

[GitHub](https://github.com/Akki-333) ·
[LinkedIn](https://www.linkedin.com/in/ak445) · akkies445@gmail.com
