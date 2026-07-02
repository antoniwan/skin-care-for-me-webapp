# Graph Report - skin-care-for-me-webapp  (2026-07-02)

## Corpus Check
- 105 files · ~46,958 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 595 nodes · 1471 edges · 25 communities (20 shown, 5 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `0e95496b`
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

## God Nodes (most connected - your core abstractions)
1. `cn()` - 69 edges
2. `useAppDataContext()` - 26 edges
3. `Product` - 22 edges
4. `getCurrentCyclePhase()` - 20 edges
5. `Product` - 18 edges
6. `getCycleDay()` - 17 edges
7. `ConflictWarning` - 17 edges
8. `compilerOptions` - 16 edges
9. `Routine` - 16 edges
10. `Button()` - 14 edges

## Surprising Connections (you probably didn't know these)
- `POST()` --calls--> `lookupProduct()`  [EXTRACTED]
  app/api/products/lookup/route.ts → lib/products/lookup.ts
- `SeverityDot()` --calls--> `cn()`  [EXTRACTED]
  components/conflicts/routine-interaction-badge.tsx → lib/utils.ts
- `EmptyState()` --calls--> `cn()`  [EXTRACTED]
  components/layout/empty-state.tsx → lib/utils.ts
- `PageContainer()` --calls--> `cn()`  [EXTRACTED]
  components/layout/page-container.tsx → lib/utils.ts
- `RoutineCardProps` --references--> `ConflictWarning`  [EXTRACTED]
  components/routines/routine-card.tsx → lib/types/conflicts.ts

## Communities (25 total, 5 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.07
Nodes (50): getOtherProductName(), groupWarningsByProduct(), highestSeverity(), SEVERITY_ORDER, sortWarningsBySeverity(), warningKey(), InteractionDetail(), InteractionDetailsSheet() (+42 more)

### Community 1 - "Community 1"
Cohesion: 0.06
Nodes (75): CyclePhaseBannerProps, db, DEFAULT_SETTINGS, deleteProduct(), ensureSeedProducts(), getAllProducts(), getRoutines(), getSettings() (+67 more)

### Community 2 - "Community 2"
Cohesion: 0.14
Nodes (17): SEVERITY_STYLES, formatCategory(), buildAmazonAffiliateUrl(), hasAmazonAffiliateTag(), ProductIngredients(), ProductIngredientsProps, ProductLinks(), ProductLinksProps (+9 more)

### Community 3 - "Community 3"
Cohesion: 0.04
Nodes (45): dependencies, ai, @ai-sdk/openai, class-variance-authority, clsx, dexie, dexie-react-hooks, @fontsource/fraunces (+37 more)

### Community 4 - "Community 4"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 5 - "Community 5"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 6 - "Community 6"
Cohesion: 0.09
Nodes (46): getGreeting(), HomePage(), ConflictList(), PAGE_METADATA, CyclePhaseBanner(), CyclePage(), CYCLE_PHASE_LABELS, CYCLE_SKIN_NOTES (+38 more)

### Community 7 - "Community 7"
Cohesion: 0.14
Nodes (13): metadata, viewport, ROOT_METADATA, APP_NAV_ITEMS, AppNavItem, isNavItemActive(), useAppData(), AppLayoutClient() (+5 more)

### Community 8 - "Community 8"
Cohesion: 0.18
Nodes (15): Env, envSchema, getEnv(), hasOpenAiKey(), ProductLookupResult, POST(), lookupProductAction(), LookupProductActionResult (+7 more)

### Community 9 - "Community 9"
Cohesion: 0.10
Nodes (22): code:bash (npm install), code:env (OPENAI_API_KEY=sk-...), code:env (NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG=yourtag-20), code:bash (npm run build), code:block5 (app/                    Next.js App Router pages and API rou), Deploy on Vercel, Documentation, Getting Started (+14 more)

### Community 15 - "Community 15"
Cohesion: 0.13
Nodes (16): grouped, makeWarning(), sorted, warning, bha, cleanser, evening, morning (+8 more)

### Community 16 - "Community 16"
Cohesion: 0.11
Nodes (18): App shell, Architecture, code:block1 (Browser), code:block2 (cleanser → toner → serum → treatment → eye_cream → moisturiz), Cycle phases, Data loading, High-level picture, How detection works (+10 more)

### Community 17 - "Community 17"
Cohesion: 0.12
Nodes (15): Backup and portability, Browser support, code:ts ({), code:ts ({), code:ts ({), Data and storage, Database, Future schema changes (+7 more)

### Community 18 - "Community 18"
Cohesion: 0.14
Nodes (13): Code quality (audit notes), Default seed shelf, Deployment notes, Features missing, Ingredient conflicts, Known limitations, Medical and safety, Product lookup (+5 more)

### Community 19 - "Community 19"
Cohesion: 0.50
Nodes (3): Documentation, Engineering, Product

### Community 21 - "Community 21"
Cohesion: 0.04
Nodes (44): Backlog hygiene, E1 — Shelf management, E2 — Scheduling & Today, E3 — Ingredient intelligence, E4 — Cycle & sensitivity, E5 — Data & privacy, E6 — Onboarding & UX, E7 — Habit & engagement (+36 more)

### Community 22 - "Community 22"
Cohesion: 0.18
Nodes (10): code:mermaid (gantt), How priorities are set, Overview, Phase 0 — Foundation ✅ (shipped v0.1), Phase 1 — Daily driver (target: v0.2), Phase 2 — Trust & polish (target: v0.3), Phase 3 — Habit loop (target: v0.4), Phase 4 — Platform (target: v1.0) (+2 more)

### Community 23 - "Community 23"
Cohesion: 0.22
Nodes (8): Non-goals (for now), North star, Problem, Product principles, Product vision, Related docs, Success metrics (v0.2+), Target users

## Knowledge Gaps
- **227 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+222 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Community 0` to `Community 2`, `Community 6`, `Community 7`?**
  _High betweenness centrality (0.062) - this node is a cross-community bridge._
- **Why does `Button()` connect `Community 2` to `Community 0`, `Community 6`?**
  _High betweenness centrality (0.010) - this node is a cross-community bridge._
- **Why does `Product` connect `Community 1` to `Community 0`, `Community 2`, `Community 15`?**
  _High betweenness centrality (0.008) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _227 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.07496194824961948 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.059932785660941 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.1431451612903226 - nodes in this community are weakly interconnected._