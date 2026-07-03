# Graph Report - skin-care-for-me-webapp  (2026-07-02)

## Corpus Check
- 151 files · ~333,653 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 909 nodes · 2424 edges · 42 communities (37 shown, 5 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 41 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `972d351a`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 27|Community 27]]
- [[_COMMUNITY_Community 28|Community 28]]
- [[_COMMUNITY_Community 29|Community 29]]
- [[_COMMUNITY_Community 30|Community 30]]
- [[_COMMUNITY_Community 31|Community 31]]
- [[_COMMUNITY_Community 32|Community 32]]
- [[_COMMUNITY_Community 33|Community 33]]
- [[_COMMUNITY_Community 34|Community 34]]
- [[_COMMUNITY_Community 35|Community 35]]
- [[_COMMUNITY_Community 36|Community 36]]
- [[_COMMUNITY_Community 37|Community 37]]
- [[_COMMUNITY_Community 38|Community 38]]
- [[_COMMUNITY_Community 39|Community 39]]
- [[_COMMUNITY_Community 40|Community 40]]
- [[_COMMUNITY_Community 41|Community 41]]

## God Nodes (most connected - your core abstractions)
1. `cn()` - 85 edges
2. `useTranslation()` - 59 edges
3. `t` - 42 edges
4. `Product` - 33 edges
5. `useAppDataContext()` - 26 edges
6. `Routine` - 23 edges
7. `getCurrentCyclePhase()` - 22 edges
8. `ConflictWarning` - 21 edges
9. `getBodyContextSnapshot()` - 20 edges
10. `getCycleDay()` - 19 edges

## Surprising Connections (you probably didn't know these)
- `BodyContextBanner()` --calls--> `t`  [INFERRED]
  components/cycle/body-context-banner.tsx → lib/body-context/routine-rules.test.ts
- `AppLoading()` --calls--> `t`  [INFERRED]
  components/layout/app-loading.tsx → lib/body-context/routine-rules.test.ts
- `AppLogo()` --calls--> `t`  [INFERRED]
  components/layout/app-logo.tsx → lib/body-context/routine-rules.test.ts
- `LanguageToggle()` --calls--> `t`  [INFERRED]
  components/layout/language-toggle.tsx → lib/body-context/routine-rules.test.ts
- `CyclePage()` --calls--> `t`  [INFERRED]
  components/pages/cycle-page.tsx → lib/body-context/routine-rules.test.ts

## Communities (42 total, 5 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.09
Nodes (57): t, getOtherProductName(), groupWarningsByProduct(), highestSeverity(), SEVERITY_ORDER, sortWarningsBySeverity(), warningKey(), StepInteractionHint() (+49 more)

### Community 1 - "Community 1"
Cohesion: 0.06
Nodes (47): InteractionDetail(), InteractionDetailsSheet(), InteractionSummaryBar(), RoutineInteractionBadge(), SEVERITY_STYLES, SeverityDot(), SeverityDot(), EmptyState() (+39 more)

### Community 2 - "Community 2"
Cohesion: 0.20
Nodes (9): buildAmazonAffiliateUrl(), hasAmazonAffiliateTag(), ProductIngredients(), ProductIngredientsProps, ProductLinks(), ProductLinksProps, getProductPageLabel(), Button() (+1 more)

### Community 3 - "Community 3"
Cohesion: 0.04
Nodes (47): dependencies, ai, @ai-sdk/openai, class-variance-authority, clsx, dexie, dexie-react-hooks, @fontsource/dm-sans (+39 more)

### Community 4 - "Community 4"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 5 - "Community 5"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 6 - "Community 6"
Cohesion: 0.10
Nodes (44): getGreeting(), HomePage(), getBodyContextProductExclusions(), ConflictList(), SEVERITY_STYLES, PAGE_METADATA, CyclePhaseBanner(), CyclePage() (+36 more)

### Community 7 - "Community 7"
Cohesion: 0.13
Nodes (13): broken, enKeys, esKeys, localized, localizedEs, missing, products, routine (+5 more)

### Community 8 - "Community 8"
Cohesion: 0.21
Nodes (12): Env, envSchema, getEnv(), hasOpenAiKey(), POST(), lookupProductAction(), LookupProductActionResult, lookupProduct() (+4 more)

### Community 9 - "Community 9"
Cohesion: 0.13
Nodes (24): code:bash (npm install), code:env (# Optional: real AI product lookup (server-side only)), code:bash (npm run build), code:block4 (app/), code:block5 (app/                    Next.js App Router pages and API rou), Deploy on Vercel, Documentation, Environment variables (+16 more)

### Community 15 - "Community 15"
Cohesion: 0.14
Nodes (29): CYCLE_PHASE_LABELS, CYCLE_SKIN_NOTES, LIFE_STAGE_DESCRIPTIONS, LIFE_STAGE_LABELS, WEIGHT_CHANGE_LABELS, WEIGHT_CHANGE_NOTES, getProductExclusionReason(), hasActivePattern() (+21 more)

### Community 16 - "Community 16"
Cohesion: 0.08
Nodes (23): App shell, Architecture, Body context, code:block1 (Browser), code:block2 (cleanser → toner → serum → treatment → eye_cream → moisturiz), Cycle phases, Data loading, High-level picture (+15 more)

### Community 17 - "Community 17"
Cohesion: 0.12
Nodes (16): Backup and portability, Browser support, code:ts ({), code:ts ({), code:ts ({), Data and storage, Database, Future schema changes (+8 more)

### Community 18 - "Community 18"
Cohesion: 0.11
Nodes (17): Code quality, Code quality (audit notes), Default seed shelf, Deployment, Deployment notes, Features missing, Ingredient conflicts, Known limitations (+9 more)

### Community 19 - "Community 19"
Cohesion: 0.40
Nodes (4): Doc types, Documentation, Engineering, Product

### Community 21 - "Community 21"
Cohesion: 0.04
Nodes (44): Backlog hygiene, E1 — Shelf management, E2 — Scheduling & Today, E3 — Ingredient intelligence, E4 — Cycle & sensitivity, E5 — Data & privacy, E6 — Onboarding & UX, E7 — Habit & engagement (+36 more)

### Community 22 - "Community 22"
Cohesion: 0.18
Nodes (10): code:mermaid (gantt), How priorities are set, Overview, Phase 0 — Foundation ✅ (shipped v0.1), Phase 1 — Daily driver (target: v0.2), Phase 2 — Trust & polish (target: v0.3), Phase 3 — Habit loop (target: v0.4), Phase 4 — Platform (target: v1.0) (+2 more)

### Community 23 - "Community 23"
Cohesion: 0.22
Nodes (8): Non-goals (for now), North star, Problem, Product principles, Product vision, Related docs, Success metrics (v0.2+), Target users

### Community 25 - "Community 25"
Cohesion: 0.22
Nodes (21): db, DEFAULT_SETTINGS, deleteProduct(), ensureSeedProducts(), getAllProducts(), getRoutines(), getSettings(), listProducts() (+13 more)

### Community 26 - "Community 26"
Cohesion: 0.08
Nodes (23): 10. Internationalization (as shipped), 11. Feature completeness (production honesty), 12. Launch gates, 13. Suggested work order (next 2 weeks), 1. Build & runtime, 2. Meta, SEO & social, 3. Brand & copy, 4. Environment & deployment (+15 more)

### Community 27 - "Community 27"
Cohesion: 0.08
Nodes (25): Body & cycle context, Code map, code:ts (bodyContext: {), code:block2 (products), Effect on routines, Effect on UI, Legacy migration, Life stage (+17 more)

### Community 28 - "Community 28"
Cohesion: 0.20
Nodes (9): bha, cleanser, evening, morning, products, retinol, routines, warnings (+1 more)

### Community 29 - "Community 29"
Cohesion: 0.11
Nodes (29): en, es419, copyByLocale, getSeedCopy(), hasSeedCopy(), SeedCopyById, SeedProductCopy, SeedProductId (+21 more)

### Community 30 - "Community 30"
Cohesion: 0.11
Nodes (18): Adding a new locale, Adding a new string, Architecture, code:ts (DEFAULT_LOCALE = "es-419"), code:block2 (LocaleProvider (components/providers/locale-provider.tsx)), code:block3 (AppLayoutClient), code:tsx (import { useTranslation } from "@/components/providers/local), HTML `lang` (+10 more)

### Community 31 - "Community 31"
Cohesion: 0.07
Nodes (37): metadata, RootLayout(), viewport, ROUTES, buildSocialMetadata(), createPageMetadata(), OG_IMAGE, ROOT_METADATA (+29 more)

### Community 32 - "Community 32"
Cohesion: 0.14
Nodes (17): ProductCategory, RoutineFrequency, RoutineStep, TimeOfDay, categoryRank(), finalizeRoutineProductOrder(), ROUTINE_CATEGORY_ORDER, sortProductsByCategory() (+9 more)

### Community 33 - "Community 33"
Cohesion: 0.27
Nodes (8): pad, retinol, snapshot, toner, createTranslator(), interpolate(), resolveMessage(), getMessages()

### Community 34 - "Community 34"
Cohesion: 0.19
Nodes (12): pluralize(), FREQUENCIES, getRoutineWarnings(), RoutinesOverview(), RoutinesOverviewProps, checkApplicationOrder(), checkIngredientSafety(), checkShelfAlignment() (+4 more)

### Community 35 - "Community 35"
Cohesion: 0.21
Nodes (15): DEFAULT_BODY_CONTEXT, LegacySettings, normalizeAppSettings(), normalizeBodyContext(), normalizeMenstrual(), settings, BodyContextSettings, CycleSettings (+7 more)

### Community 36 - "Community 36"
Cohesion: 0.26
Nodes (19): CyclePhaseBannerProps, SkinCareDB, AppSettings, ConflictWarning, CyclePhase, Product, Routine, GuideData (+11 more)

### Community 37 - "Community 37"
Cohesion: 0.21
Nodes (9): grouped, makeWarning(), sorted, warning, ordered, products, products, warnings (+1 more)

### Community 38 - "Community 38"
Cohesion: 0.22
Nodes (8): IngredientConflict, ALIASES, getCanonicalActives(), getConflictsForRoutine(), INGREDIENT_CONFLICTS, ingredientsConflict(), normalizeIngredient(), IngredientConflict

### Community 39 - "Community 39"
Cohesion: 0.22
Nodes (8): bpo, morning, products, retinol, routine, routines, safety, verification

### Community 40 - "Community 40"
Cohesion: 0.43
Nodes (5): DeepString, en, Messages, es419, messagesByLocale

### Community 41 - "Community 41"
Cohesion: 0.36
Nodes (6): ProductLookupResult, AddProductSheetProps, productFromLookup(), lookup, product, ProductLookupResult

## Knowledge Gaps
- **331 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+326 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Community 1` to `Community 0`, `Community 2`, `Community 6`, `Community 31`?**
  _High betweenness centrality (0.040) - this node is a cross-community bridge._
- **Why does `useTranslation()` connect `Community 0` to `Community 1`, `Community 34`, `Community 2`, `Community 36`, `Community 6`, `Community 15`, `Community 31`?**
  _High betweenness centrality (0.023) - this node is a cross-community bridge._
- **Why does `Product` connect `Community 36` to `Community 32`, `Community 0`, `Community 2`, `Community 35`, `Community 34`, `Community 37`, `Community 38`, `Community 41`, `Community 15`, `Community 25`, `Community 29`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **Are the 41 inferred relationships involving `t` (e.g. with `InteractionDetail()` and `InteractionDetailsSheet()`) actually correct?**
  _`t` has 41 INFERRED edges - model-reasoned connections that need verification._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _331 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.0867579908675799 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.06247086247086247 - nodes in this community are weakly interconnected._