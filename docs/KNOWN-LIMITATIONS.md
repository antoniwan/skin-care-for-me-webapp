# Known limitations

Audit of the project as of **v0.1.0** (2026-07-02). Lists what is rough, missing, or intentional. Read before trusting the app for real skin care decisions.

## Medical and safety

- **Not medical advice.** Conflict rules are a small curated list, not a complete interaction database.
- **AI lookup can be wrong.** Ingredient lists from OpenAI or mock fallback may be inaccurate without verification.
- **Cycle logic is simplified.** Phase boundaries use fixed percentages of cycle length, not labs or ovulation data.
- **Life-stage rules are conservative defaults.** Pregnancy/postpartum holds are not a substitute for clinician guidance.
- **No allergy or patch-test modes.** Ingredient lists are informational only.

## Features missing

| Feature | Status |
|---------|--------|
| Edit product after add | Not built |
| Barcode / photo scan | Not built |
| User accounts / sync | Not built |
| JSON backup / restore | Not built |
| Onboarding flow | `onboardingComplete` in schema; no UI |
| Push reminders | Not built |
| PWA / offline install | Not built |
| E2E tests | Vitest unit tests only (38 tests in `lib/`) |
| CI pipeline | None |
| Privacy policy / terms pages | Not built |
| Product-page conflict banner | Shelf-wide summary on Routines `#guide` only (PROD-301) |

## Scheduling quirks

- **Weekly routines** only on **Sundays** (`getDay() === 0`).
- **Monthly routines** only on the **1st** of the month.
- No UI to pick weekly day (e.g. Wednesday).
- `weekly` + `evening` still means Sunday evening only.

## Routine generation

- Fixed category order — no user reordering.
- `separateConflictingProducts()` only auto-removes `avoid` pairs; `caution`/`separate` stay with UI warnings.
- Sunscreen kept when paired with `avoid` conflict — intentional.
- Body context holds daily harsh actives on menstrual/luteal; weekly/monthly harsh actives may still appear.
- Multiple moisturizers can coexist in one routine — no deduplication.

## Ingredient conflicts

- ~10 rules in `lib/rules/ingredient-conflicts.ts`.
- Substring alias matching — false positives/negatives possible.
- Step hints only when both products share a **routine bucket**. Cross-bucket conflicts: Routines guide + PDF only.
- No concentration or pH modeling.
- Rule reason/guidance text is English; UI chrome is localized.

## Product lookup

- **Without `OPENAI_API_KEY`:** mock data only.
- **With key:** one GPT-4o-mini call per lookup; no server cache; costs per request.
- No in-app correction without delete + re-add.
- No API rate limiting (production risk — see [PRODUCTION-TRACKER.md](PRODUCTION-TRACKER.md)).

## Storage

- Per-browser, per-origin. Clear site data → user products gone; seeds return.
- Seeds re-upserted every load — cannot permanently remove.
- No encryption beyond browser defaults.
- Routines derived in memory, not stored in IndexedDB.
- Locale in `localStorage` — cleared independently of IndexedDB.

## UI / UX

- Mobile-first; desktop has side nav + wider layout (`max-w-6xl`), not a phone-only column.
- No dark mode toggle (`.dark` tokens exist, unused).
- PDF uses Helvetica, not app fonts.
- Generic error boundary; no IndexedDB-specific failure UI.
- Add-product sheet: no cancel confirmation after preview fetch.
- Seed shelf shows many conflicts by design — can alarm new users.

## Localization

- UI fully localized (`es-419` default, `en` available).
- Seed product copy, conflict rule bodies, PDF, and HTML meta descriptions remain English.
- See [LOCALIZATION.md](LOCALIZATION.md).

## Code quality

- **`package-lock.json` and `pnpm-lock.yaml`** both present — pick one package manager.
- **`graphify-out/`** — generated tooling output; not required to run the app.
- **`shadcn`** listed as runtime dependency; normally a dev CLI.

## Deployment

- Standard Next.js on Vercel (or similar).
- **Env:** `OPENAI_API_KEY`, `NEXT_PUBLIC_SITE_URL`, optional `NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG`.
- **Planned URL:** `https://skincareforyou.builds.software`
- IndexedDB is client-only — SSR does not preload user data.
- Meta assets exist (`og.png`, `icon.svg`, `robots.ts`, `sitemap.ts`) — see [PRODUCTION-TRACKER.md](PRODUCTION-TRACKER.md) for remaining launch gaps.

## Suggested next work

Tracked in [BACKLOG.md](BACKLOG.md). v0.2 focus:

1. PROD-101 — Edit existing product
2. PROD-201 — Configurable weekly day
3. PROD-501 / PROD-502 — JSON export and import
4. PROD-601 — Onboarding flow
5. PROD-301 — Shelf-wide conflict banner on Products page

See [ROADMAP.md](ROADMAP.md) for phased plan.
