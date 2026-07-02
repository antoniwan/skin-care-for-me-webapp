# Data and storage

All personal data is stored in the browser using IndexedDB. Clearing site data in your browser deletes everything except the seed products (they are re-inserted on next load).

## Database

- **Library:** [Dexie](https://dexie.org/) v4
- **Database name:** `SkinCareForMe`
- **Schema version:** 1
- **Definition:** `lib/db.ts`

### Tables

| Store | Key | Indexed fields | Contents |
|-------|-----|----------------|----------|
| `products` | `id` (string) | `name`, `category`, `frequency`, `createdAt` | User and seed products |
| `routines` | `id` (string) | `frequency`, `timeOfDay`, `generatedAt` | Auto-generated; overwritten on each refresh |
| `settings` | `id` (always `"app"`) | — | Cycle settings + `onboardingComplete` flag |

### Settings shape

```ts
{
  cycle: {
    enabled: boolean
    cycleLength: number      // default 28
    periodLength: number       // default 5
    lastPeriodStart: string | null  // ISO date "YYYY-MM-DD"
  }
  onboardingComplete: boolean  // currently unused in UI
}
```

### Product shape

```ts
{
  id: string
  name: string
  brand?: string
  category: "cleanser" | "toner" | "serum" | "moisturizer" | "sunscreen"
          | "exfoliant" | "mask" | "eye_cream" | "treatment" | "other"
  ingredients: string[]
  activeIngredients: string[]   // used for conflict detection
  usageGuide: string
  frequency: "daily" | "weekly" | "monthly"
  timeOfDay: "morning" | "evening" | "any"
  notes?: string
  isSeed?: boolean             // true for built-in products
  createdAt: string            // ISO timestamp
  updatedAt: string
}
```

### Routine shape

```ts
{
  id: string                   // e.g. "daily-morning-follicular"
  frequency: "daily" | "weekly" | "monthly"
  timeOfDay: "morning" | "evening"
  steps: {
    productId: string
    productName: string
    category: ProductCategory
    instructions: string
    order: number
  }[]
  cyclePhase?: CyclePhase      // set when cycle tracking is on
  generatedAt: string
}
```

Routines are derived data. They are regenerated whenever products or settings change. Do not treat stored routines as the source of truth.

## Seed products

File: `lib/seed/default-products.ts`

Nine products are hardcoded for development and demo. They use stable IDs prefixed with `seed-`.

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

- On every `getAllProducts()` call, `ensureSeedProducts()` runs `bulkPut` for all seed products.
- Seed products have `isSeed: true`.
- They cannot be deleted from the UI (`removeProduct` ignores seed IDs; delete button is disabled).
- If you edit `default-products.ts`, changes apply on next load (upsert by id).
- Ingredient and usage text were researched from public product pages but may be incomplete or outdated. Verify against your actual bottles.

## Privacy

| Data | Where it lives | Sent to server? |
|------|----------------|-----------------|
| Products (after add) | IndexedDB | No |
| Seed products | IndexedDB | No |
| Routines | IndexedDB | No |
| Cycle settings | IndexedDB | No |
| Product name during lookup | Request body to `/api/products/lookup` | Yes, once per lookup |
| OpenAI processing | Vercel/server function | Yes, if API key is set |

There is no analytics, auth, or telemetry in the codebase today.

## Backup and portability

- **PDF guide** — partial export (products, routines, conflicts, cycle note).
- **No JSON export/import** — not implemented.
- **No sync** — opening the app on another device starts fresh (plus seed products).

## Browser support

IndexedDB is required. The app expects a modern browser (Chrome, Firefox, Safari, Edge). Private/incognito modes work but data is cleared when the session ends (browser-dependent).

## Future schema changes

Dexie migrations would add a new `version(n).stores(...)` block in `lib/db.ts`. There is no migration code yet — you are on v1 only.
