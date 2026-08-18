# Intellix — Phase 1: Homepage & Design System

Real, working Next.js 14 (App Router) + TypeScript + Tailwind CSS frontend for the
Intellix homepage, built as the foundation for the full site described in the brief.

## What's included

- **Design system**: brand colors, Poppins/Inter/JetBrains Mono type scale, glassmorphic
  card style, gradient system — all defined in `tailwind.config.ts` and `app/globals.css`.
- **Signature visual**: `components/home/SignalGraph.tsx` — a canvas-based node graph in
  the hero that represents "data resolving into structure," reactive to the cursor.
- **Full homepage**: Hero, Trusted By, Tech Marquee, Stats counters, Divisions grid (all 8),
  tabbed Services, Process, Why Choose Us, Portfolio preview, Academy spotlight,
  Testimonials, FAQ accordion, and a combined Newsletter/Contact CTA.
- **Reusable components**: `Button`, `SectionHeading`, `Navbar`, `Footer`.
- **SEO**: full metadata, Open Graph, Twitter Card, JSON-LD Organization schema,
  `robots.ts`, and `sitemap.ts` (Next.js metadata routes — no manual XML needed).
- **Accessibility**: skip link, visible focus states, `prefers-reduced-motion` support,
  semantic headings.
- **Custom 404 page**.

## Run it locally

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

## Build for production

```bash
npm run build
npm run start
```

> Note: `next/font/google` fetches font files from Google at build time, so `npm run build`
> requires normal internet access (this is standard for any Next.js site and works out of
> the box on Vercel). No action needed unless your build environment blocks
> `fonts.googleapis.com`.

## Before deploying

1. Replace placeholder Unsplash images in `PortfolioPreview.tsx` and `AcademySpotlight.tsx`
   with real project/classroom photos.
2. Replace placeholder partner names in `TrustedBy.tsx` with real client names/logos.
3. Add `/public/og-image.jpg` (1200×630) and `/public/logo.png` for social sharing.
4. Update `siteUrl` in `app/layout.tsx` and the domain in `app/sitemap.ts` / `app/robots.ts`
   once the production domain is live.
5. Wire the newsletter form in `ContactCTA.tsx` to a real email provider (e.g. Resend,
   Mailchimp) or to the FastAPI backend once built.

## Next phases

This is phase 1 of the full build described in the project brief. Suggested next steps:

1. Inner pages: About, Services, Academy, Portfolio, Careers, Blog, Contact, etc.
2. FastAPI backend: auth, CRUD for courses/blogs/projects/jobs, PostgreSQL + SQLAlchemy.
3. Admin dashboard for managing content.
4. Docker, CI/CD, and deployment docs (Vercel + Render/Railway).

## Project structure

```
app/
  layout.tsx        Root layout, fonts, SEO metadata, JSON-LD
  page.tsx           Homepage composition
  globals.css        Design tokens & base styles
  robots.ts           robots.txt (metadata route)
  sitemap.ts          sitemap.xml (metadata route)
  not-found.tsx       Custom 404
components/
  layout/             Navbar, Footer
  home/               All homepage sections
  ui/                 Button, SectionHeading
lib/
  data.ts             Site content (divisions, services, stats, testimonials, FAQs)
```
