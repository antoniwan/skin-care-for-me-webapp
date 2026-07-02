# Body & cycle context

Source of truth for **body-aware routines** in Skincare for You. Use when changing settings, UI, or routine generation.

## Purpose

Optional body context adapts routines and guidance for:

- **Menstrual cycle phase** (sensitivity windows)
- **Life stage** (pregnant, postpartum, breastfeeding, perimenopause, menopause)
- **Recent weight change** (barrier/hydration tips — no product removal)

All values stay in **IndexedDB** (`settings` store, key `app`). Nothing is transmitted to a server.

## Privacy guarantee

| Data | Stored | Transmitted |
|------|--------|-------------|
| Last period start | IndexedDB | Never |
| Cycle / period length | IndexedDB | Never |
| Life stage | IndexedDB | Never |
| Postpartum weeks | IndexedDB | Never |
| Weight preference | IndexedDB | Never |
| Derived phase / guidance | Browser memory | Never |

`/api/products/lookup` is unrelated — runs only when adding a product by name.

## Settings shape

```ts
bodyContext: {
  enabled: boolean
  menstrual: {
    enabled: boolean
    cycleLength: number               // default 28, range 21–40
    periodLength: number              // default 5, range 2–10
    lastPeriodStart: string | null    // "YYYY-MM-DD"
  }
  lifeStage: "none" | "pregnant" | "postpartum" | "breastfeeding"
           | "perimenopause" | "menopause"
  postpartumWeeks: number | null      // 0–52 when postpartum
  weight: {
    enabled: boolean
    recentChange: "stable" | "gaining" | "losing" | "prefer_not_to_say"
  }
}
```

### Legacy migration

`settings.cycle` → `bodyContext` via `normalizeAppSettings()` in `lib/body-context/migrate.ts` on read.

## Code map

| Concern | Location |
|---------|----------|
| Types | `lib/types/body-context.ts` |
| Defaults | `lib/body-context/defaults.ts` |
| Migration | `lib/body-context/migrate.ts` |
| Phase math | `lib/body-context/snapshot.ts` |
| Core snapshot (generation) | `getBodyContextCore()` — no localized strings |
| UI snapshot | `getBodyContextSnapshot(settings, t)` — localized factors + guidance |
| Routine rules | `lib/body-context/routine-rules.ts` |
| English labels (legacy) | `lib/body-context/labels.ts` |
| i18n UI strings | `lib/i18n/messages/` + `lib/i18n/ui.ts` |
| Settings UI | `components/pages/cycle-page.tsx` |
| Banner | `components/cycle/body-context-banner.tsx` |
| Privacy notice | `components/cycle/body-context-privacy-notice.tsx` |
| Generation | `lib/routines/generator.ts` → `applyBodyContextFilter()` |
| PDF | `lib/pdf/guide.ts` |
| Re-exports | `lib/cycle/phases.ts` → `lib/body-context` |

## Menstrual cycle

### Phase calculation

From `lastPeriodStart`, `cycleLength`, `periodLength`:

1. **Menstrual** — days 1 … `periodLength`
2. **Follicular** — until ~46% of cycle
3. **Ovulation** — until ~57%
4. **Luteal** — remainder

Requires `bodyContext.enabled`, `menstrual.enabled`, valid `lastPeriodStart`.

### Routine impact

On **menstrual** and **luteal** days, daily products with harsh actives (retinoids, BHA/AHA in exfoliant/treatment categories) are **held**. Weekly/monthly slots may still include them.

### UI

- **Today** — `BodyContextBanner` (sidebar on desktop when enabled)
- **Body page** — settings + live preview + held-products list
- **PDF** — phase section when active

## Life stage

| Stage | Routine impact | Guidance |
|-------|----------------|----------|
| `none` | None | — |
| `pregnant` | Holds retinoids; daily BHA/AHA in toner/treatment/exfoliant | Clinician reminder |
| `breastfeeding` | Same retinoid/daily acid caution as pregnancy | Clinician reminder |
| `postpartum` (0–11 wk) | Holds retinoids + daily harsh actives | Barrier-first messaging |
| `postpartum` (12+ wk) | No automatic holds | Gradual reintroduction note |
| `perimenopause` | No holds | Hydration tips |
| `menopause` | No holds | Ceramide / SPF tips |

Exclusion reasons are English internally; UI uses `localizeExclusionReason(t, reason)`.

## Weight context

Never removes products. When enabled with `gaining` or `losing`:

- Guidance in banner and PDF
- Routines unchanged

## Master switch

`bodyContext.enabled === false`:

- No body-based routine holds
- Banner hidden on Today
- Body page shows privacy notice + toggle only

## UI surfaces checklist

- [x] **Nav** — "Body" (`nav.body`), route `/cycle`
- [x] **Body page** — privacy, master switch, three sections, banner, held products
- [x] **Today** — banner when enabled
- [x] **Routines** — regenerates on settings change; guide PDF includes body notes
- [x] **Safety check** — menstrual adjustment in review notes when applicable
- [x] **IndexedDB** — `bodyContext` only; no network
- [x] **i18n** — all body UI strings in message catalogs

## Routine generation flow

```
products
  → separateConflictingProducts()     // ingredient "avoid" pairs
  → applyBodyContextFilter()          // getBodyContextCore + shouldIncludeProductInRoutine
  → bucket by frequency × timeOfDay
  → finalizeRoutineProductOrder()     // SPF last AM, masks last PM
```

## Limitations

- Not medical advice. Conservative pregnancy/postpartum defaults.
- Simplified calendar math — not ovulation kits or hormones.
- Weight is qualitative only — no BMI or weight numbers stored.
- No cross-device sync; clearing site data removes settings.

## Tests

| File | Covers |
|------|--------|
| `lib/body-context/migrate.test.ts` | Legacy `cycle` → `bodyContext` |
| `lib/body-context/routine-rules.test.ts` | Pregnancy, postpartum, menstrual holds |
| `lib/cycle/phases.test.ts` | Phase boundaries |
| `lib/routines/generator.test.ts` | Ordering + buckets |

Run: `npm test`

## Related docs

- [DATA-AND-STORAGE.md](DATA-AND-STORAGE.md) — IndexedDB schema
- [LOCALIZATION.md](LOCALIZATION.md) — body string keys
- [ARCHITECTURE.md](ARCHITECTURE.md) — data flow
- [KNOWN-LIMITATIONS.md](KNOWN-LIMITATIONS.md) — general caveats
