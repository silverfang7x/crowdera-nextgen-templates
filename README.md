# Crowdera Next-Gen Nonprofit Templates
 
**A production-ready, reusable website template system for Registered Non-Profit Organizations — built for the Crowdera Next.js UI/UX Hackathon 2026.**
 
🔗 **Live demo:** [crowdera-nextgen-templates.vercel.app](https://crowdera-nextgen-templates.vercel.app)
📧 **Contact:** suryanshpandey603@gmail.com
 
---
 
## Overview
 
Crowdera's brief asked for the next generation of website templates for its no-code Website Builder — templates any RNPO could pick up, customize, and launch with, regardless of cause, size, or geography.
 
Instead of designing one nonprofit website and calling it a template, this project builds a **single, deeply reusable template engine** and uses it to generate **10 distinct, production-ready templates** — one for each major cause area Crowdera's platform needs to serve. Every template shares the same design token system, component library, and layout engine, and differs through real structural variation: section order, layout modes, color and typography, not just a palette swap.
 
This mirrors how Crowdera's actual builder would need to work under the hood — a small number of well-engineered primitives, composed differently per organization.
 
## The 10 templates
 
| # | Template | Cause Area | What's structurally different |
|---|---|---|---|
| 1 | Clearwater Relief Trust | Humanitarian | Video hero, masonry gallery, featured testimonial |
| 2 | Rapid Response Network | Disaster Relief | Carousel hero + urgency banner, CTA promoted right after hero, grid gallery |
| 3 | Sunrise Health Initiative | Healthcare | Image hero with stat overlay, text-image About layout, carousel gallery |
| 4 | Paws & Refuge | Animal Welfare | Image carousel hero, Programs section promoted before About (adoption-first) |
| 5 | Rootline Conservancy | Environment | Video hero, Impact Journey timeline promoted to homepage, grid gallery |
| 6 | Brightpath Learning Trust | Education | Course-framed Programs, testimonial rail (no single featured quote) |
| 7 | Sacred Grove Fellowship | Faith-Based | Image hero with quote overlay, About promoted earlier in page order |
| 8 | Groundwork Community Collective | Community Development | Programs before Impact Stats, FlexibleSection-driven neighborhood storytelling |
| 9 | Openframe Arts Trust | Arts & Culture | Gallery promoted near the hero, distinct expressive font pairing |
| 10 | Common Ground Foundation | Social Impact (general) | The balanced default — neutral preset, standard section order, safe starting point |
 
Browse all 10 at [`/templates`](https://crowdera-nextgen-templates.vercel.app/templates).
 
## The template recipe engine (the actual differentiator)
 
Every template is defined as a single **`TemplateRecipe`** object — not a separate page or codebase. A recipe declares:
 
- Organization identity (name, cause category, tagline, mission)
- A **color preset** (theme tokens, light + dark mode variants)
- A **font pairing** (display + body face, swappable via CSS custom properties)
- A **section order** — which sections appear and in what sequence
- **Per-section variant config** — e.g. `hero.variant: "video" | "image" | "carousel"`, `gallery.view: "masonry" | "grid" | "carousel"`, `about.layout` (one of 4 content scaffolding modes), `testimonial.style: "featured" | "rail-only"`
A single dynamic route (`/t/[templateId]`) reads a recipe and composes the page from it. Adding an 11th template for a new cause area is a data change, not a rebuild — which is the whole point of a template *repository*.
 
## Features
 
### Core sections (all 10 required by the brief, present in every template)
Hero Banner (image/video/carousel variants, overlay, auto-play controls, mobile-optimized) · Navigation Header (sticky, responsive, Donate/Volunteer CTAs) · About Organization · Impact Statistics (animated counters) · Programs (card grid, auto-switches to carousel above 3 items) · Testimonials (featured + rail) · Gallery (masonry/grid/carousel view modes, lightbox) · Latest News & Updates · Call-to-Action · Footer
 
### Flexible content system
A generic `FlexibleSection` component supports four content scaffolds (text-only, text+image, text+video, text+image+video) so new sections can be added to any template without new code — directly satisfying the brief's requirement that templates "allow any number of new sections to be added" with configurable scaffolding.
 
### Design system
Full token architecture (typography scale, spacing scale, semantic color tokens, breakpoints) documented at [`/style-guide`](https://crowdera-nextgen-templates.vercel.app/style-guide), covering every component in every theme preset, light and dark.
 
### Bonus features implemented
- **Live Theme Customizer** — switch cause preset and light/dark mode in real time with smooth token cross-fade transitions
- **Dark mode** across all 10 templates
- **Micro-interactions & motion design** — scroll-triggered reveals, animated counters, hover states, all respecting `prefers-reduced-motion`
- **Accessibility-first design** — see [`ACCESSIBILITY.md`](./ACCESSIBILITY.md)
- **SEO-friendly layouts** — per-page metadata, Open Graph tags, sitemap
- **AI-assisted content placeholders** — inline "AI Content Assist" suggestions for editable copy (demo mode)
- **Interactive storytelling** — scroll-driven Impact Journey timeline on About pages
- **Donation-focused engagement patterns** — live impact ticker, campaign progress bar, recurring-gift nudge, matching-gift banner on Donate pages
## Tech stack
 
- **Framework:** Next.js 14 (App Router), TypeScript
- **Styling:** Tailwind CSS with a fully custom token system (no default palette/type-scale left untouched)
- **Animation:** Framer Motion (scroll-linked reveals, `useInView` counters, reduced-motion fallbacks)
- **Icons:** lucide-react
- **Theming:** next-themes (dark mode) + a custom CSS-variable-based cause-preset system
- **Deployment:** Vercel
## Project structure
 
```
src/
├── app/
│   ├── t/[templateId]/          # dynamic template routes (homepage + internal pages)
│   │   ├── page.tsx
│   │   ├── about/
│   │   ├── programs/
│   │   │   └── [slug]/
│   │   ├── volunteer/
│   │   ├── donate/
│   │   ├── contact/
│   │   └── news/
│   │       └── [slug]/
│   ├── templates/               # template gallery / repository picker
│   └── style-guide/             # full component + token showcase
├── components/
│   ├── ui/                      # Button, Card, Input, Badge, AnimatedCounter, etc.
│   ├── sections/                # Hero, About, Programs, Gallery, FlexibleSection, ImpactJourney, etc.
│   ├── layout/                  # Header, Footer
│   ├── theme/                   # ThemeCustomizerDrawer
│   └── editor/                  # AIContentSuggest (demo mode)
├── lib/
│   └── templates/
│       ├── types.ts             # TemplateRecipe type
│       └── registry.ts          # all 10 template recipe definitions
└── styles/
    └── tokens.css                # documented design token reference
docs/
├── planning.md                  # information architecture + personas
└── ACCESSIBILITY.md             # accessibility audit notes
```
 
## Getting started
 
```bash
git clone https://github.com/<your-username>/crowdera-nextgen-templates.git
cd crowdera-nextgen-templates
npm install
npm run dev
```
 
Open [http://localhost:3000/templates](http://localhost:3000/templates) to browse all 10 templates.
 
Production build check:
 
```bash
npm run build
```
 
## Design rationale
 
Full accessibility audit notes are in [`ACCESSIBILITY.md`](./ACCESSIBILITY.md), covering focus states, semantic structure, heading hierarchy, WCAG AA contrast verification across all color presets in both light and dark mode, and reduced-motion coverage.
 
Information architecture and user personas that shaped section priority and page structure are documented in [`docs/planning.md`](./docs/planning.md).
 
## Judging criteria coverage
 
| Criteria | How this project addresses it |
|---|---|
| Visual Appeal (20%) | Custom editorial type system, asymmetric layouts, distinct font pairings per template |
| User Experience (20%) | Persona-driven IA, donation flow design, consistent navigation patterns |
| Responsiveness (15%) | Verified at 375px / 768px / 1024px / 1440px across all templates |
| Creativity & Innovation (15%) | Template recipe engine, live Theme Customizer, interactive storytelling |
| Accessibility & Inclusivity (10%) | WCAG AA contrast, keyboard navigation, reduced-motion support, semantic HTML |
| Reusability & Scalability (10%) | 10 templates from one component library and recipe system — adding an 11th is a data change |
| Production Readiness (10%) | Clean TypeScript build, deployed on Vercel, documented token system |
 
## Team
 
Built by **Suryansh Pandey** for team **InnoVentures**.
📧 suryanshpandey603@gmail.com
 
---
 
*Submitted for the Crowdera Next.js UI/UX Hackathon 2026.*
