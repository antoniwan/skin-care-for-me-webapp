# Architecture

This document explains how the app is put together and how data moves through it. Read this if you are changing routines, conflicts, or storage.

## High-level picture

```
Browser
  │
  ├─ React pages (client components)
  │     └─ useAppDataContext() ──► useAppData() hook
  │
  ├─ IndexedDB (Dexie)          products, routines, settings
  │
  └─ POST /api/products/lookup  only when adding a product
        └─ OpenAI (or mock)     returns structured JSON once; result saved locally
```

There is no backend database. The Next.js API route exists only for product lookup because that needs an API key on the server. Everything else runs in the browser.

## App shell

`app/layout.tsx` wraps all pages in `ClientAppShell`, which provides:

1. `AppDataProvider` — React context from `hooks/use-app-data.ts`
2. `AppShell` — max-width column + fixed bottom navigation

Bottom nav routes:

| Route | Page |
|-------|------|
| `/` | Today |
| `/products` | Product shelf |
| `/routines` | All routines by frequency |
| `/cycle` | Cycle tracking settings |
| `/guide` | PDF download + full routine list |

## Data loading

On mount, `useAppData.refresh()`:

1. Loads products from IndexedDB (and upserts seed products — see [DATA-AND-STORAGE.md](DATA-AND-STORAGE.md))
2. Loads settings (or defaults)
3. Calls `generateRoutines(products, settings)`
4. Saves generated routines back to IndexedDB
5. Runs `detectConflicts(products)` for shelf-wide warnings

Any change (add product, delete product, update cycle settings) calls `refresh()` again so routines stay in sync.

## Routine generation

File: `lib/routines/generator.ts`

### Inputs

- All products on the shelf
- App settings (mainly cycle phase)

### Steps

1. **Conflict pre-filter** — Products in `avoid`-severity pairs may be dropped from routines. If one product is sunscreen, the other product is removed instead of the sunscreen.

2. **Phase filter** — If cycle tracking is on and the phase is menstrual or luteal, daily products with harsh actives (retinol, AHA, BHA, benzoyl peroxide in `activeIngredients`) are excluded from daily routines. Weekly/monthly versions can still appear.

3. **Bucket by frequency and time** — Each product has `frequency` (`daily` | `weekly` | `monthly`) and `timeOfDay` (`morning` | `evening` | `any`). Products land in matching buckets (e.g. daily + morning).

4. **Sort steps** — Within a routine, products are ordered by category:

   ```
   cleanser → toner → serum → treatment → eye_cream → moisturizer → sunscreen → exfoliant → mask → other
   ```

5. **Output** — One `Routine` object per non-empty bucket, with step list and usage text copied from each product.

### “Today” filtering

`getTodaysRoutines()` picks which routines to show on the home page:

- **Daily** — always included
- **Weekly** — only when `dayOfWeek === 0` (Sunday)
- **Monthly** — only when `dayOfMonth === 1`

If cycle tracking is enabled, routines tagged with a `cyclePhase` must match the current phase.

## Ingredient conflicts

File: `lib/rules/ingredient-conflicts.ts`

### How detection works

1. Each product has `activeIngredients` and full `ingredients` lists.
2. Ingredient strings are normalized via alias map (e.g. “salicylic acid” → `bha`, “lactic acid” → `aha`).
3. Every product pair is checked against a static list of ~10 rules.
4. Each rule has severity: `avoid`, `caution`, or `separate`, plus reason and guidance text.

### Where warnings appear in the UI

File: `components/conflicts/ingredient-interactions.tsx`

| Component | When used |
|-----------|-----------|
| `StepInteractionHint` | Under a routine step, if that product conflicts with another product **in the same routine** |
| `RoutineInteractionBadge` | Pill on routine card header — count of conflicts in that routine |
| `InteractionSummaryBar` | Guide page only — shelf-wide count, opens a sheet |
| `InteractionDetailsSheet` | Bottom sheet with full text for a set of warnings |

Shelf-wide conflicts between products that never share a routine (e.g. weekly pad vs daily morning cleanser) do **not** show on Today. They appear on the Guide page summary and in the PDF.

## Cycle phases

File: `lib/cycle/phases.ts`

Phases are estimated from:

- `lastPeriodStart` (date string)
- `cycleLength` (default 28)
- `periodLength` (default 5)

Day-in-cycle is computed with modulo arithmetic. Phase boundaries are fixed ratios of cycle length (not medical-grade). The app shows short skin notes per phase and feeds phase into routine generation.

## Product lookup

File: `lib/products/lookup.ts` → `app/api/products/lookup/route.ts`

1. Client sends `{ query: "product name" }`.
2. If `OPENAI_API_KEY` is set, `gpt-4o-mini` returns structured data validated by Zod.
3. If not set, `mockLookup()` returns guessed data from keywords (sunscreen, retinol, or generic serum).
4. Client saves the result as a new `Product` in IndexedDB. The server does not store it.

## PDF export

File: `lib/pdf/guide.ts`

Runs entirely client-side with jsPDF. Uses Helvetica (not the web fonts). Includes products, all routines, cycle context, and all shelf-wide conflicts.

## UI stack

- **shadcn/ui** components in `components/ui/` (Button, Card, Sheet, Tabs, etc.)
- **Warm theme** in `app/globals.css` (cream background, terracotta primary)
- **Fonts** loaded via `@fontsource` in `app/layout.tsx`

## What is not architected yet

- Server-side persistence or sync
- Authentication
- Service worker / offline caching
- Automated tests or CI
- Product edit flow
- Database migrations beyond Dexie v1

See [KNOWN-LIMITATIONS.md](KNOWN-LIMITATIONS.md).
