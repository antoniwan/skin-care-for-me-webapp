# Skincare for You

A mobile-first web app that helps you track skin care products, build daily/weekly/monthly routines, flag ingredient conflicts, and optionally adapt routines to body context (menstrual phase, life stage, weight). Data stays in your browser. Nothing is sent to a server except product lookups (when you add a new product).

This is early-stage software (v0.1). It works, but many features are basic or missing. See [docs/KNOWN-LIMITATIONS.md](docs/KNOWN-LIMITATIONS.md) for an honest list of current gaps, [docs/ROADMAP.md](docs/ROADMAP.md) for planned features, and [docs/PRODUCTION-TRACKER.md](docs/PRODUCTION-TRACKER.md) for the launch checklist.

**Planned production URL:** `https://skincare.builds.software`

## What works today

- **Product shelf** — 9 default products ship with the app (Clinique, Fresh, Medicube, CeraVe). You can add more via name search.
- **Routines** — Built automatically from your products: daily morning/evening, weekly, monthly. Order follows a fixed category sequence (cleanser → … → sunscreen). **Safety check** panel verifies layering, ingredient pairings, and schedule match.
- **Ingredient interactions** — A small hand-written rules list (~10 pairs). Warnings appear inline on routine steps, as routine badges, and in a shelf-wide summary on the Routines guide section.
- **Body & cycle** (optional) — Menstrual phase, life stage (pregnant, postpartum, breastfeeding, perimenopause, menopause), and weight context. Routines and guidance adapt locally; nothing is sent to a server.
- **Localization** — Spanish (Latin American) default; English available. Toggle in nav; last choice persists in `localStorage`.
- **PDF guide** — Download products, routines, and interaction notes as a simple PDF (`/routines#guide`).
- **Local storage** — Products and settings live in IndexedDB (Dexie). Routines are derived on read. No account, no cloud sync.

## What does not work (or is incomplete)

- No way to edit a product after adding it (only delete user-added ones).
- No offline/PWA install flow.
- Product lookup uses mock data when `OPENAI_API_KEY` is not set.
- Conflict rules are curated, not a full dermatology database.
- Weekly routines appear on **Sundays only**; monthly on the **1st** only.
- Not medical advice. Do not rely on this for safety decisions.

More detail: [docs/KNOWN-LIMITATIONS.md](docs/KNOWN-LIMITATIONS.md).

## Roadmap (summary)

| Phase | Target | Focus |
|-------|--------|--------|
| **v0.1** ✅ | Shipped | Shelf, routines, conflicts, body context, i18n, PDF |
| **v0.2** | Daily driver | Edit products, weekly scheduling, backup/import, onboarding |
| **v0.3** | Trust & polish | More conflict rules, PWA, lookup cache, CI |
| **v0.4** | Habit loop | Check-offs, reminders, sensitivity modes |
| **v1.0** | Platform | Optional sync, barcode scan |

Full plan: [docs/ROADMAP.md](docs/ROADMAP.md) · Backlog: [docs/BACKLOG.md](docs/BACKLOG.md) · Vision: [docs/PRODUCT-VISION.md](docs/PRODUCT-VISION.md)

## Requirements

- Node.js 20+
- npm (or pnpm — lockfiles for both exist in the repo; pick one for your team)

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Mobile-first with bottom nav; desktop adds a side nav and wider content (`max-w-6xl`).

### Environment variables

Create `.env.local`:

```env
# Optional: real AI product lookup (server-side only)
OPENAI_API_KEY=sk-...

# Optional: Amazon Associates tag for seed product links
NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG=yourtag-20

# Production: canonical URL for sitemap, Open Graph, robots.txt
NEXT_PUBLIC_SITE_URL=https://skincare.builds.software
```

Without `OPENAI_API_KEY`, adding a product still works but returns keyword-based placeholder data. Env is validated in `lib/env.ts`.

### Production build

```bash
npm run build
npm start
```

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Development server (Turbopack) |
| `npm run build` | Production build + typecheck |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |
| `npm test` | Vitest unit tests (`lib/**/*.test.ts`) |
| `npm run test:watch` | Vitest watch mode |

## Project layout

```
app/
  layout.tsx              Root layout, fonts, metadata, viewport
  robots.ts / sitemap.ts  SEO routes
  icon.svg                Favicon (rose heart)
  (app)/                  Route group — app shell
    layout.tsx            → AppLayoutClient
    page.tsx              Today (home)
    products/             Shelf + lookupProductAction
    routines/             Routines + guide section (#guide)
    cycle/                Body & cycle settings
  api/products/lookup/    POST — product lookup API

components/
  pages/                  HomePage, ProductsPage, RoutinesPage, CyclePage
  conflicts/              Interaction triggers, detail sheet, severity UI
  cycle/                  BodyContextBanner, privacy notice
  layout/                 AppShell, side/bottom nav, language toggle
  products/               ProductCard, AddProductSheet
  routines/               RoutineCard, safety check, guide section
  providers/              LocaleProvider, AppDataProvider
  ui/                     shadcn/ui primitives

lib/
  types/                  Domain types (product, routine, body-context, …)
  services/app-data.ts    Load + mutate shelf; derive routines/conflicts
  db.ts                   IndexedDB (Dexie)
  body-context/           Snapshot, routine rules, migration
  i18n/                   Locales, messages (es-419, en), UI helpers
  seed/                   Default products + catalog metadata
  routines/               Generator, verification, category order
  rules/                  Ingredient conflict rules
  conflicts/              Display helpers for warnings
  products/lookup.ts      OpenAI lookup + mock fallback
  constants/              metadata.ts, site.ts, navigation.ts
  pdf/guide.ts            PDF generation (jsPDF)

hooks/use-app-data.ts     Dexie liveQuery hook
```

## Documentation

| Doc | Contents |
|-----|----------|
| [docs/PRODUCT-VISION.md](docs/PRODUCT-VISION.md) | North star, personas, principles |
| [docs/ROADMAP.md](docs/ROADMAP.md) | Phased delivery plan (v0.2 → v1.0) |
| [docs/BACKLOG.md](docs/BACKLOG.md) | Prioritized epics with acceptance criteria |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Data flow, routines, conflicts, i18n |
| [docs/DATA-AND-STORAGE.md](docs/DATA-AND-STORAGE.md) | IndexedDB schema, seed products, privacy |
| [docs/BODY-AND-CYCLE.md](docs/BODY-AND-CYCLE.md) | Body context settings and routine rules |
| [docs/LOCALIZATION.md](docs/LOCALIZATION.md) | i18n architecture and message catalogs |
| [docs/KNOWN-LIMITATIONS.md](docs/KNOWN-LIMITATIONS.md) | Honest audit of gaps and rough edges |
| [docs/PRODUCTION-TRACKER.md](docs/PRODUCTION-TRACKER.md) | Launch checklist (meta, deploy, legal, CI) |

## Tech stack

- **Next.js 16** (App Router, React 19, Turbopack)
- **Tailwind CSS 4** + **shadcn/ui** (Radix)
- **Dexie** (IndexedDB) + **dexie-react-hooks** (`useLiveQuery`)
- **Vercel AI SDK** + OpenAI (optional product lookup)
- **jsPDF** (guide export)
- **Fontsource:** Sora (headings) + DM Sans (body)

## License

Private project (`"private": true` in package.json). No license file is included.
