# Graph Report - skin-care-for-me-webapp  (2026-07-02)

## Corpus Check
- 93 files · ~14,490 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 497 nodes · 1348 edges · 21 communities (16 shown, 5 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `5d2722db`
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

## God Nodes (most connected - your core abstractions)
1. `cn()` - 69 edges
2. `useAppDataContext()` - 26 edges
3. `Product` - 21 edges
4. `getCurrentCyclePhase()` - 20 edges
5. `Product` - 18 edges
6. `getCycleDay()` - 17 edges
7. `ConflictWarning` - 17 edges
8. `compilerOptions` - 16 edges
9. `Routine` - 16 edges
10. `highestSeverity()` - 13 edges

## Surprising Connections (you probably didn't know these)
- `POST()` --calls--> `lookupProduct()`  [EXTRACTED]
  app/api/products/lookup/route.ts → lib/products/lookup.ts
- `InteractionDetail()` --calls--> `cn()`  [EXTRACTED]
  components/conflicts/interaction-detail.tsx → lib/utils.ts
- `InteractionSummaryBar()` --calls--> `cn()`  [EXTRACTED]
  components/conflicts/interaction-summary-bar.tsx → lib/utils.ts
- `SeverityDot()` --calls--> `cn()`  [EXTRACTED]
  components/conflicts/routine-interaction-badge.tsx → lib/utils.ts
- `RoutineInteractionBadge()` --calls--> `cn()`  [EXTRACTED]
  components/conflicts/routine-interaction-badge.tsx → lib/utils.ts

## Communities (21 total, 5 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.07
Nodes (37): InteractionDetail(), SeverityDot(), SeverityDot(), cn(), Button(), buttonVariants, CardAction(), CardDescription() (+29 more)

### Community 1 - "Community 1"
Cohesion: 0.07
Nodes (66): CyclePhaseBannerProps, db, DEFAULT_SETTINGS, deleteProduct(), ensureSeedProducts(), getAllProducts(), getRoutines(), getSettings() (+58 more)

### Community 2 - "Community 2"
Cohesion: 0.16
Nodes (28): getOtherProductName(), groupWarningsByProduct(), highestSeverity(), SEVERITY_ORDER, sortWarningsBySeverity(), grouped, sorted, warning (+20 more)

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
Cohesion: 0.10
Nodes (44): getGreeting(), HomePage(), ConflictList(), SEVERITY_STYLES, PAGE_METADATA, CyclePhaseBanner(), CyclePage(), CYCLE_PHASE_LABELS (+36 more)

### Community 7 - "Community 7"
Cohesion: 0.14
Nodes (13): metadata, viewport, ROOT_METADATA, APP_NAV_ITEMS, AppNavItem, isNavItemActive(), useAppData(), AppLayoutClient() (+5 more)

### Community 8 - "Community 8"
Cohesion: 0.18
Nodes (15): Env, envSchema, getEnv(), hasOpenAiKey(), ProductLookupResult, POST(), lookupProductAction(), LookupProductActionResult (+7 more)

### Community 9 - "Community 9"
Cohesion: 0.11
Nodes (19): code:bash (npm install), code:env (OPENAI_API_KEY=sk-...), code:bash (npm run build), code:block4 (app/                    Next.js App Router pages and API rou), Deploy on Vercel, Documentation, Getting Started, Learn More (+11 more)

### Community 15 - "Community 15"
Cohesion: 0.15
Nodes (13): makeWarning(), bha, cleanser, evening, morning, products, retinol, routines (+5 more)

### Community 16 - "Community 16"
Cohesion: 0.11
Nodes (18): App shell, Architecture, code:block1 (Browser), code:block2 (cleanser → toner → serum → treatment → eye_cream → moisturiz), Cycle phases, Data loading, High-level picture, How detection works (+10 more)

### Community 17 - "Community 17"
Cohesion: 0.12
Nodes (15): Backup and portability, Browser support, code:ts ({), code:ts ({), code:ts ({), Data and storage, Database, Future schema changes (+7 more)

### Community 18 - "Community 18"
Cohesion: 0.14
Nodes (13): Code quality (audit notes), Default seed shelf, Deployment notes, Features missing, Ingredient conflicts, Known limitations, Medical and safety, Product lookup (+5 more)

## Knowledge Gaps
- **167 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+162 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Community 0` to `Community 2`, `Community 6`, `Community 7`?**
  _High betweenness centrality (0.082) - this node is a cross-community bridge._
- **Why does `Button()` connect `Community 0` to `Community 1`, `Community 6`?**
  _High betweenness centrality (0.008) - this node is a cross-community bridge._
- **Why does `useAppDataContext()` connect `Community 6` to `Community 0`?**
  _High betweenness centrality (0.008) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _167 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.06666666666666667 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.0688629604209563 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.043478260869565216 - nodes in this community are weakly interconnected._