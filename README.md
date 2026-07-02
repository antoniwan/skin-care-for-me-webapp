# Skincare for You

A mobile-first web app that helps you track skin care products, build daily/weekly/monthly routines, flag ingredient conflicts, and optionally adjust advice around your menstrual cycle. Data stays in your browser. Nothing is sent to a server except product lookups (when you add a new product).

This is early-stage software (v0.1). It works, but many features are basic or missing. See [docs/KNOWN-LIMITATIONS.md](docs/KNOWN-LIMITATIONS.md) for an honest list of current gaps, and [docs/ROADMAP.md](docs/ROADMAP.md) for what we plan to build next.

## What works today

- **Product shelf** — 9 default products ship with the app (Clinique, Fresh, Medicube, CeraVe). You can add more via name search.
- **Routines** — Built automatically from your products: daily morning/evening, weekly, monthly. Order follows a fixed category sequence (cleanser → … → sunscreen).
- **Ingredient interactions** — A small hand-written rules list (retinol + BHA, vitamin C + niacinamide, etc.). Warnings show inline on routine steps, not as a long separate list.
- **Cycle tracking** (optional) — Enter cycle length and last period start. The app shows your phase and softens harsh actives during menstrual/luteal phases.
- **PDF guide** — Download products, routines, and interaction notes as a simple PDF.
- **Local storage** — Products and settings live in IndexedDB (Dexie). Routines are derived on read. No account, no cloud sync.

## What does not work (or is incomplete)

- No way to edit a product after adding it (only delete user-added ones).
- No offline/PWA install flow.
- Product lookup uses a fake mock when `OPENAI_API_KEY` is not set.
- Conflict rules cover ~10 ingredient pairs, not a full dermatology database.
- Weekly routines are scheduled for **Sunday only**. Monthly routines run on the **1st of the month only**.
- Not medical advice. Do not rely on this for safety decisions.

More detail: [docs/KNOWN-LIMITATIONS.md](docs/KNOWN-LIMITATIONS.md).

## Roadmap (summary)

| Phase | Target | Focus |
|-------|--------|--------|
| **v0.1** ✅ | Shipped | Shelf, routines, conflicts, cycle, PDF |
| **v0.2** | Daily driver | Edit products, weekly scheduling, backup/import, onboarding |
| **v0.3** | Trust & polish | More conflict rules, PWA, lookup cache, CI |
| **v0.4** | Habit loop | Check-offs, reminders, sensitivity modes |
| **v1.0** | Platform | Optional sync, barcode scan |

Full plan: [docs/ROADMAP.md](docs/ROADMAP.md) · Backlog: [docs/BACKLOG.md](docs/BACKLOG.md) · Vision: [docs/PRODUCT-VISION.md](docs/PRODUCT-VISION.md)

## Requirements

- Node.js 20+
- npm (or pnpm — lockfiles for both exist in the repo)

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The app is designed for phone-width viewports; desktop works but the layout is a centered column with bottom navigation.

### Optional: real AI product lookup

Create `.env.local`:

```env
OPENAI_API_KEY=sk-...
```

Without this key, adding a product still works but returns keyword-based placeholder data (sunscreen/retinol/generic serum). Env is validated in `lib/env.ts`.

### Optional: Amazon affiliate links

Add your [Amazon Associates](https://affiliate-program.amazon.com/) tag to `.env.local`:

```env
NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG=yourtag-20
```

Seed products on the shelf show **Manufacturer** and **Shop on Amazon** links when catalog metadata is present.

### Production build

```bash
npm run build
npm start
```

## Scripts

| Command        | Purpose                          |
|----------------|----------------------------------|
| `npm run dev`  | Development server (Turbopack)   |
| `npm run build`| Production build + typecheck     |
| `npm run start`| Serve production build           |
| `npm run lint` | ESLint |
| `npm test`     | Vitest unit tests (`lib/**/*.test.ts`) |
| `npm run test:watch` | Vitest watch mode |

## Project layout

```
app/                    Next.js App Router pages and API routes
  (app)/                Route group — app shell, pages, error boundary
    layout.tsx          Server layout → client AppLayoutClient
    loading.tsx         Route loading UI
    error.tsx           Error boundary with retry
    page.tsx            Server entry + metadata → client view
    products/
      page.tsx          Server entry + metadata
      actions.ts        lookupProductAction (Server Action)
  api/products/lookup/  POST — legacy/API lookup (same logic as action)

components/
  pages/                Client page views (HomePage, ProductsPage, …)
  conflicts/            Ingredient interaction UI (hints, sheets)
  layout/               Shell, bottom nav
  products/             Add-product sheet
  routines/             Routine cards
  ui/                   shadcn/ui primitives

lib/
  types/                Domain types (product, routine, cycle, settings, …)
  services/app-data.ts  Load + mutate shelf data; derive routines/conflicts
  db.ts                 IndexedDB (Dexie)
  seed/                 Default product data
  routines/generator.ts Routine building logic
  rules/                Ingredient conflict rules
  cycle/                Menstrual phase calculation
  conflicts/            Display helpers for warnings
  products/lookup.ts    OpenAI lookup + mock fallback
  env.ts                Validated server env (OPENAI_API_KEY)
  constants/metadata.ts Per-page metadata definitions
  pdf/guide.ts          PDF generation (jsPDF)

hooks/use-app-data.ts   Client data hook + React context
```

## Documentation

| Doc | Contents |
|-----|----------|
| [docs/PRODUCT-VISION.md](docs/PRODUCT-VISION.md) | North star, personas, and product principles |
| [docs/ROADMAP.md](docs/ROADMAP.md) | Phased delivery plan (v0.2 → v1.0) |
| [docs/BACKLOG.md](docs/BACKLOG.md) | Prioritized epics, user stories, and sprint candidates |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | How data flows, how routines and conflicts are computed |
| [docs/DATA-AND-STORAGE.md](docs/DATA-AND-STORAGE.md) | Database schema, seed products, privacy |
| [docs/KNOWN-LIMITATIONS.md](docs/KNOWN-LIMITATIONS.md) | Audit findings, gaps, and rough edges |

## Tech stack

- **Next.js 16** (App Router, React 19)
- **Tailwind CSS 4** + **shadcn/ui** (Radix)
- **Dexie** (IndexedDB) + **dexie-react-hooks** (`useLiveQuery`)
- **Vercel AI SDK** + OpenAI (optional product lookup)
- **jsPDF** (guide export)
- **Fontsource**: Fraunces (headings) + Source Sans 3 (body)

## License

Private project (`"private": true` in package.json). No license file is included.
