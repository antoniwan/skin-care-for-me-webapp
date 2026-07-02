# Body & cycle context

This document is the source of truth for how **body-aware routines** work in Skincare for You. Use it to verify behavior when changing settings, UI, or routine generation.

## Purpose

Optional body context lets routines and guidance adapt to:

- **Menstrual cycle phase** (sensitivity windows)
- **Life stage** (pregnancy, postpartum, breastfeeding, perimenopause, menopause)
- **Recent weight change** (barrier and hydration tips — no products removed)

Nothing in this feature is sent to a server. All values live in **IndexedDB** on the user’s device (`settings` store, key `app`).

## Privacy guarantee

| Data | Stored | Transmitted |
|------|--------|-------------|
| Last period start | IndexedDB | Never |
| Cycle / period length | IndexedDB | Never |
| Life stage | IndexedDB | Never |
| Postpartum weeks | IndexedDB | Never |
| Weight preference | IndexedDB | Never |
| Derived phase / guidance | Computed in browser | Never |

The API route `/api/products/lookup` is unrelated — it only runs when adding a product by name.

## Settings shape

```ts
bodyContext: {
  enabled: boolean                    // master switch
  menstrual: {
    enabled: boolean
    cycleLength: number               // default 28, range 21–40
    periodLength: number              // default 5, range 2–10
    lastPeriodStart: string | null    // "YYYY-MM-DD"
  }
  lifeStage: "none" | "pregnant" | "postpartum" | "breastfeeding"
           | "perimenopause" | "menopause"
  postpartumWeeks: number | null      // 0–52 when lifeStage === "postpartum"
  weight: {
    enabled: boolean
    recentChange: "stable" | "gaining" | "losing" | "prefer_not_to_say"
  }
}
```

### Legacy migration

Older installs stored `settings.cycle`. On read, `normalizeAppSettings()` in `lib/body-context/migrate.ts` maps:

- `cycle.enabled` → `bodyContext.enabled` and menstrual tracking
- Other menstrual fields → `bodyContext.menstrual`

No server migration is required.

## Code map

| Concern | Location |
|---------|----------|
| Types | `lib/types/body-context.ts` |
| Defaults | `lib/body-context/defaults.ts` |
| Migration | `lib/body-context/migrate.ts` |
| Phase math | `lib/body-context/snapshot.ts` (`getCurrentCyclePhase`, `getCycleDay`) |
| Snapshot + guidance | `lib/body-context/snapshot.ts` (`getBodyContextSnapshot`) |
| Routine inclusion rules | `lib/body-context/routine-rules.ts` |
| User-facing labels | `lib/body-context/labels.ts` |
| Settings UI | `components/pages/cycle-page.tsx` |
| Banner | `components/cycle/body-context-banner.tsx` |
| Privacy notice | `components/cycle/body-context-privacy-notice.tsx` |
| Routine generation | `lib/routines/generator.ts` |
| PDF export | `lib/pdf/guide.ts` |

## Menstrual cycle

### Phase calculation

Given `lastPeriodStart`, `cycleLength`, and `periodLength`:

1. **Menstrual** — days 1 … `periodLength`
2. **Follicular** — until ~46% of cycle length
3. **Ovulation** — until ~57% of cycle length
4. **Luteal** — remainder of cycle

Requires `bodyContext.enabled` and `menstrual.enabled` with a valid `lastPeriodStart`.

### Effect on routines

On **menstrual** and **luteal** days, products that are:

- Category `exfoliant` or `treatment`, **and**
- Contain retinoids or strong acids (BHA/AHA patterns)

…are **held from daily routines** but still allowed in weekly/monthly slots.

### Effect on UI

- **Today** — `BodyContextBanner` with phase, day, and skin note
- **Body page** — menstrual fields + live preview banner
- **PDF** — menstrual phase section when active

## Life stage

| Stage | Routine impact | Guidance |
|-------|----------------|----------|
| `none` | None | — |
| `pregnant` | Holds retinoids; holds daily toner/treatment/exfoliant with BHA/AHA | Prenatal clinician reminder |
| `breastfeeding` | Same retinoid / daily acid rules as pregnancy | Clinician reminder |
| `postpartum` (weeks 0–11) | Holds retinoids and daily harsh actives | Gentle barrier-first messaging |
| `postpartum` (week 12+) | No automatic holds | Gradual reintroduction note |
| `perimenopause` | No product holds | Hydration / consistency tips |
| `menopause` | No product holds | Ceramide / SPF tips |

`postpartumWeeks` is only read when `lifeStage === "postpartum"`.

### Products held list

When any products are excluded, the **Body** page shows **Products held from routines** with per-product reasons from `getProductExclusionReason()`.

## Weight context

Weight settings **never remove products**. When `weight.enabled` is true and `recentChange` is `gaining` or `losing`:

- Guidance notes appear in `BodyContextBanner` and PDF
- Routines are unchanged

`prefer_not_to_say` and `stable` add no weight-specific notes.

## Master switch behavior

`bodyContext.enabled === false`:

- No phase calculation for routines
- No product holds from body rules
- Banner hidden on Today
- Body page shows only privacy notice + master toggle

Individual sub-toggles (menstrual, weight) only apply when master switch is on.

## UI surfaces checklist

Use this to triple-check implementations:

- [ ] **Nav** — label “Body”, route `/cycle`
- [ ] **Body page** — privacy notice, master switch, three setting sections, preview banner, held products list
- [ ] **Today** — banner when enabled (sidebar on desktop)
- [ ] **Routines** — routines regenerate when settings change; PDF includes body notes
- [ ] **Safety check** — layering notes mention menstrual adjustment when `routine.cyclePhase` set
- [ ] **IndexedDB** — `saveSettings` writes `bodyContext` only (no network)

## Routine generation flow

```
products
  → separateConflictingProducts()     // ingredient "avoid" pairs
  → applyBodyContextFilter()          // shouldIncludeProductInRoutine per snapshot
  → build routines by frequency × timeOfDay
  → finalizeRoutineProductOrder()     // SPF last AM, masks last PM
```

`getBodyContextSnapshot(settings.bodyContext)` is computed once per generation pass.

## Limitations & disclaimers

- Not medical advice. Pregnancy/postpartum rules are conservative defaults.
- Phase windows use simplified calendar math, not ovulation tests or hormonal labs.
- Weight context is qualitative only — no BMI, no body weight numbers stored.
- Users who do not menstruate can leave menstrual tracking off and use life stage alone.
- No sync between devices; clearing site data removes all body settings.

## Tests

| File | Covers |
|------|--------|
| `lib/body-context/migrate.test.ts` | Legacy `cycle` → `bodyContext` |
| `lib/body-context/routine-rules.test.ts` | Pregnancy, postpartum, menstrual holds |
| `lib/cycle/phases.test.ts` | Phase boundaries |
| `lib/routines/generator.test.ts` | Ordering + routine buckets |

Run: `npm test`

## Related docs

- [DATA-AND-STORAGE.md](DATA-AND-STORAGE.md) — IndexedDB schema
- [ARCHITECTURE.md](ARCHITECTURE.md) — app shell and data flow
- [KNOWN-LIMITATIONS.md](KNOWN-LIMITATIONS.md) — general product caveats
