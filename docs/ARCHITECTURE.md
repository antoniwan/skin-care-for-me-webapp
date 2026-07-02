# Architecture

This document explains how the app is put together and how data moves through it. Read this if you are changing routines, conflicts, storage, or localization.

## High-level picture

```
Browser
  │
  ├─ LocaleProvider          locale + t() from lib/i18n (localStorage)
  │     └─ AppDataProvider   useAppData() → IndexedDB liveQuery
  │           └─ AppShell    side nav (lg+) / bottom nav (mobile)
  │
  ├─ IndexedDB (Dexie)       products, settings (routines derived in memory)
  │
  └─ POST /api/products/lookup   only when adding a product
        └─ OpenAI (or mock)      structured JSON once; saved locally
```

There is no backend database. The API route exists only for product lookup (API key on server). Everything else runs in the browser.

## App shell

`app/(app)/layout.tsx` renders `AppLayoutClient` (`components/layout/app-layout-client.tsx`), which wraps:

1. **`LocaleProvider`** — `lib/i18n`, persists locale in `localStorage`, sets `document.documentElement.lang`
2. **`AppDataProvider`** — React context from `hooks/use-app-data.ts`
3. **`AppShell`** — responsive layout: `max-w-6xl` on desktop, side nav (`lg+`), bottom nav on mobile, language toggle

| Route | Page | Nav label (i18n key) |
|-------|------|----------------------|
| `/` | Today | `nav.today` |
| `/products` | Product shelf | `nav.products` |
| `/routines` | Routines by frequency + guide (`#guide`) | `nav.routines` |
| `/cycle` | Body & cycle settings | `nav.body` |

`/guide` redirects to `/routines#guide`.

Root `app/layout.tsx` sets global metadata (`lib/constants/metadata.ts`), fonts (Sora + DM Sans), viewport `theme-color`, and default `lang="es-419"`.

## Data loading

`useAppData()` uses Dexie's `useLiveQuery` to subscribe to IndexedDB. On each read it calls `refreshAppData()` in `lib/services/app-data.ts`, which:

1. Loads products (and upserts seed products — see [DATA-AND-STORAGE.md](DATA-AND-STORAGE.md))
2. Loads settings (or defaults; migrates legacy `cycle` → `bodyContext`)
3. Derives routines via `generateRoutines(products, settings)` — **not persisted**
4. Runs `detectConflicts(products)` for shelf-wide warnings

Mutations (`addProductFromLookup`, `removeProductById`, `updateAppSettings`) write to IndexedDB; `useLiveQuery` re-runs automatically.

## Routine generation

File: `lib/routines/generator.ts`

### Inputs

- All products on the shelf
- App settings (`bodyContext` via `getBodyContextCore()`)

### Steps

1. **`separateConflictingProducts()`** — Products in `avoid`-severity pairs may be dropped. If one is sunscreen, the other is removed.

2. **`applyBodyContextFilter()`** — Uses `shouldIncludeProductInRoutine()` from `lib/body-context/routine-rules.ts` (pregnancy, postpartum, menstrual/luteal holds). See [BODY-AND-CYCLE.md](BODY-AND-CYCLE.md).

3. **Bucket by frequency and time** — Each product has `frequency` and `timeOfDay`. Products land in matching buckets.

4. **`finalizeRoutineProductOrder()`** — Category order from `lib/routines/category-order.ts`:
   ```
   cleanser → toner → serum → treatment → eye_cream → moisturizer → sunscreen → exfoliant → mask → other
   ```
   SPF last in morning; masks last in evening.

5. **Output** — One `Routine` per non-empty bucket with steps and usage text.

### “Today” filtering

`getTodaysRoutines()`:

- **Daily** — always
- **Weekly** — `dayOfWeek === 0` (Sunday)
- **Monthly** — `dayOfMonth === 1`

## Routine verification (safety check)

File: `lib/routines/verification.ts`

On the Routines page (detailed cards), each routine runs three checks:

| Check | What it validates |
|-------|-------------------|
| Layering order | Category sequence; SPF last AM, mask last PM |
| Ingredient pairings | Conflicts among products in this routine |
| Schedule match | Product frequency/time fits the routine bucket |

UI: `RoutineVerificationPanel` — collapsed by default when all pass; labels localized via `lib/i18n/ui.ts` (`localizeVerification`).

## Ingredient conflicts

File: `lib/rules/ingredient-conflicts.ts`

1. Normalize ingredients via alias map (e.g. salicylic acid → `bha`).
2. Check every product pair against ~10 static rules.
3. Severity: `avoid` | `caution` | `separate`, with reason + guidance (English in rules file; UI labels localized).

### Where warnings appear

Folder: `components/conflicts/`

| Component | When used |
|-----------|-----------|
| `StepInteractionHint` | Under a routine step — conflicts with another product **in the same routine** |
| `RoutineInteractionBadge` | Routine card header — count for that routine |
| `InteractionSummaryBar` | Routines guide section (`#guide`) — shelf-wide count |
| `InteractionDetailsSheet` | Bottom sheet with `InteractionDetail` cards (severity, ingredients, why / what to do) |
| `InteractionTrigger` / `SeverityBadge` | Shared primitives for accent-bar trigger styling |

Conflicts across different routine buckets do **not** show on Today step hints. They appear in the guide summary and PDF.

## Body context

Files: `lib/body-context/*` (see [BODY-AND-CYCLE.md](BODY-AND-CYCLE.md))

- **`getBodyContextCore()`** — Phase/life-stage data for routine generation (no localized strings).
- **`getBodyContextSnapshot(settings, t)`** — Adds localized `activeFactors` and `guidanceNotes` for UI.
- **`lib/cycle/phases.ts`** — Re-exports body-context helpers for backward compatibility.

## Localization

File: `lib/i18n/` — see [LOCALIZATION.md](LOCALIZATION.md)

- Default locale: `es-419` (Spanish, Latin America)
- Also: `en`
- UI strings: `lib/i18n/messages/`
- Product seed copy and conflict rule text remain **English** (display-layer translation partial).

## Product lookup

Files: `lib/products/lookup.ts`, `app/(app)/products/actions.ts`, `app/api/products/lookup/route.ts`

1. Client sends product name query.
2. With `OPENAI_API_KEY`: `gpt-4o-mini` + Zod validation.
3. Without key: `mockLookup()` keyword fallback.
4. Result saved as new `Product` in IndexedDB. Server does not store it.

## PDF export

File: `lib/pdf/guide.ts`

Client-side jsPDF. Helvetica (not web fonts). Products, routines, body context notes, shelf-wide conflicts.

## UI stack

- **shadcn/ui** in `components/ui/`
- **Design tokens** in `app/globals.css` — rose/coral primary, cream background
- **Fonts** — Sora (headings), DM Sans (body) via `@fontsource` in `app/layout.tsx`
- **Brand** — `AppLogo` wordmark + heartbeat heart; name **Skincare for You** in all locales

## SEO & production meta

| Asset / route | Location |
|---------------|----------|
| Root metadata | `lib/constants/metadata.ts` |
| Site URL | `lib/constants/site.ts` → `NEXT_PUBLIC_SITE_URL` |
| OG image | `public/og.png` |
| Favicon | `app/icon.svg`, `public/icon.svg` |
| robots.txt | `app/robots.ts` |
| sitemap.xml | `app/sitemap.ts` |

Launch checklist: [PRODUCTION-TRACKER.md](PRODUCTION-TRACKER.md).

## What is not architected yet

- Server-side persistence or sync
- Authentication
- Service worker / PWA
- CI pipeline (unit tests exist — 38 Vitest tests)
- Product edit flow
- API rate limiting on lookup
- Dexie schema migrations beyond v1

See [KNOWN-LIMITATIONS.md](KNOWN-LIMITATIONS.md).
