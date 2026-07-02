# Data and storage

All personal data is stored in the browser using IndexedDB. Clearing site data deletes user-added products; seed products are re-inserted on next load.

**Locale preference** is separate: stored in `localStorage` (`skincare-for-you-locale`), not IndexedDB. See [LOCALIZATION.md](LOCALIZATION.md).

## Database

- **Library:** [Dexie](https://dexie.org/) v4
- **Database name:** `SkinCareForMe`
- **Schema version:** 1
- **Definition:** `lib/db.ts`

### Tables

| Store | Key | Indexed fields | Contents |
|-------|-----|----------------|----------|
| `products` | `id` (string) | `name`, `category`, `frequency`, `createdAt` | User and seed products |
| `routines` | `id` (string) | `frequency`, `timeOfDay`, `generatedAt` | Legacy — **not used at runtime** |
| `settings` | `id` (always `"app"`) | — | `bodyContext` + `onboardingComplete` |

### Settings shape

```ts
{
  bodyContext: {
    enabled: boolean
    menstrual: {
      enabled: boolean
      cycleLength: number      // default 28
      periodLength: number     // default 5
      lastPeriodStart: string | null  // "YYYY-MM-DD"
    }
    lifeStage: "none" | "pregnant" | "postpartum" | "breastfeeding"
             | "perimenopause" | "menopause"
    postpartumWeeks: number | null   // 0–52 when postpartum
    weight: {
      enabled: boolean
      recentChange: "stable" | "gaining" | "losing" | "prefer_not_to_say"
    }
  }
  onboardingComplete: boolean  // exists in schema; no onboarding UI yet
}
```

Legacy installs may have a top-level `cycle` object; `normalizeAppSettings()` in `lib/body-context/migrate.ts` maps it on read. See [BODY-AND-CYCLE.md](BODY-AND-CYCLE.md).

### Product shape

```ts
{
  id: string
  name: string
  brand?: string
  category: ProductCategory
  ingredients: string[]
  activeIngredients: string[]   // conflict detection
  usageGuide: string
  frequency: "daily" | "weekly" | "monthly"
  timeOfDay: "morning" | "evening" | "any"
  notes?: string
  isSeed?: boolean
  imageUrl?: string
  manufacturerUrl?: string
  productPageLabel?: string
  amazonAsin?: string
  tagline?: string
  highlights?: string[]
  size?: string
  createdAt: string
  updatedAt: string
}
```

Seed products include catalog metadata from `lib/seed/product-catalog.ts` (images, shop links).

### Routine shape

```ts
{
  id: string
  frequency: "daily" | "weekly" | "monthly"
  timeOfDay: "morning" | "evening"
  steps: RoutineStep[]
  cyclePhase?: CyclePhase      // when menstrual tracking active
  generatedAt: string
}
```

Routines are **derived** in `lib/services/app-data.ts` via `generateRoutines()`. They are not written to IndexedDB during normal use.

## Seed products

Files: `lib/seed/default-products.ts`, `lib/seed/product-catalog.ts`

Nine products ship with stable `seed-*` IDs:

| Product | Brand |
|---------|-------|
| All About Clean Liquid Facial Soap Mild | Clinique |
| Clarifying Lotion 2 | Clinique |
| Dramatically Different Moisturizing Lotion+ | Clinique |
| Moisture Surge 100H Auto-Replenishing Hydrator | Clinique |
| Moisture Surge Overnight Mask | Clinique |
| Hydrating Mineral Sunscreen SPF 30 Face Lotion | CeraVe |
| Sugar Face Polish Exfoliator | Fresh |
| Zero Pore Pad 2.0 | Medicube |
| PDRN Pink Collagen Jelly Eye Mask | Medicube |

### Seed behavior

- `ensureSeedProducts()` runs on every `getAllProducts()` — `bulkPut` upserts seeds.
- `isSeed: true` — delete button disabled in UI.
- Catalog changes apply on next load (upsert by id).
- Ingredient text is for demo/testing; verify against your actual bottles.

## Privacy

| Data | Where | Sent to server? |
|------|-------|-----------------|
| Products (after add) | IndexedDB | No |
| Seed products | IndexedDB | No |
| Body context settings | IndexedDB | No |
| Locale preference | localStorage | No |
| Derived routines | Memory only | No |
| Product name during lookup | Request to `/api/products/lookup` | Yes, once per lookup |
| OpenAI processing | Server function | Yes, if `OPENAI_API_KEY` set |

No analytics, auth, or telemetry in the codebase.

## Backup and portability

- **PDF guide** — partial export (products, routines, conflicts, body notes).
- **No JSON export/import** — not implemented (backlog PROD-501/502).
- **No sync** — new device = fresh shelf + seeds.

## Browser support

IndexedDB required. Modern Chrome, Firefox, Safari, Edge. Private/incognito: data cleared when session ends (browser-dependent).

## Future schema changes

Add a new `version(n).stores(...)` block in `lib/db.ts`. Currently v1 only — no migration beyond legacy `cycle` → `bodyContext` on read.

## Related docs

- [BODY-AND-CYCLE.md](BODY-AND-CYCLE.md) — body context behavior
- [LOCALIZATION.md](LOCALIZATION.md) — locale storage
- [PRODUCTION-TRACKER.md](PRODUCTION-TRACKER.md) — privacy policy gap for launch
