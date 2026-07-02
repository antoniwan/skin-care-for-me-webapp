# Graph Report - skin-care-for-me-webapp  (2026-07-02)

## Corpus Check
- 63 files · ~12,810 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 393 nodes · 863 edges · 19 communities (14 shown, 5 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `3faf2996`
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
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]

## God Nodes (most connected - your core abstractions)
1. `cn()` - 60 edges
2. `Product` - 18 edges
3. `compilerOptions` - 16 edges
4. `useAppDataContext()` - 16 edges
5. `Routine` - 13 edges
6. `getCurrentCyclePhase()` - 13 edges
7. `Known limitations` - 13 edges
8. `ConflictWarning` - 12 edges
9. `Architecture` - 11 edges
10. `Button()` - 10 edges

## Surprising Connections (you probably didn't know these)
- `SeverityDot()` --calls--> `cn()`  [EXTRACTED]
  components/conflicts/ingredient-interactions.tsx → lib/utils.ts
- `InteractionDetail()` --calls--> `cn()`  [EXTRACTED]
  components/conflicts/ingredient-interactions.tsx → lib/utils.ts
- `AddProductSheetProps` --references--> `ProductLookupResult`  [EXTRACTED]
  components/products/add-product-sheet.tsx → lib/types.ts
- `ProductCardProps` --references--> `Product`  [EXTRACTED]
  components/products/product-card.tsx → lib/types.ts
- `ProductMetaBadgesProps` --references--> `Product`  [EXTRACTED]
  components/products/product-meta-badges.tsx → lib/types.ts

## Communities (19 total, 5 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.09
Nodes (28): EmptyState(), cn(), FREQUENCIES, RoutinesPage(), CardAction(), CardDescription(), CardFooter(), DialogContent() (+20 more)

### Community 1 - "Community 1"
Cohesion: 0.08
Nodes (48): db, DEFAULT_SETTINGS, deleteProduct(), ensureSeedProducts(), getAllProducts(), getRoutines(), getSettings(), saveProduct() (+40 more)

### Community 2 - "Community 2"
Cohesion: 0.11
Nodes (37): getGreeting(), HomePage(), ConflictList(), SEVERITY_STYLES, CyclePhaseBanner(), CyclePhaseBannerProps, CyclePage(), CYCLE_PHASE_LABELS (+29 more)

### Community 3 - "Community 3"
Cohesion: 0.05
Nodes (41): dependencies, ai, @ai-sdk/openai, class-variance-authority, clsx, dexie, @fontsource/fraunces, @fontsource/source-sans-3 (+33 more)

### Community 4 - "Community 4"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 5 - "Community 5"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 6 - "Community 6"
Cohesion: 0.12
Nodes (27): getOtherProductName(), groupWarningsByProduct(), highestSeverity(), SEVERITY_ORDER, sortWarningsBySeverity(), warningKey(), InteractionDetail(), InteractionDetailsSheet() (+19 more)

### Community 7 - "Community 7"
Cohesion: 0.15
Nodes (11): metadata, viewport, APP_NAV_ITEMS, AppNavItem, isNavItemActive(), useAppData(), AppShell(), BottomNav() (+3 more)

### Community 8 - "Community 8"
Cohesion: 0.53
Nodes (4): POST(), lookupProduct(), lookupSchema, mockLookup()

### Community 9 - "Community 9"
Cohesion: 0.11
Nodes (19): code:bash (npm install), code:env (OPENAI_API_KEY=sk-...), code:bash (npm run build), code:block4 (app/                    Next.js App Router pages and API rou), Deploy on Vercel, Documentation, Getting Started, Learn More (+11 more)

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
- **142 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+137 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Community 0` to `Community 2`, `Community 6`, `Community 7`?**
  _High betweenness centrality (0.084) - this node is a cross-community bridge._
- **Why does `ConflictWarning` connect `Community 1` to `Community 2`, `Community 6`?**
  _High betweenness centrality (0.011) - this node is a cross-community bridge._
- **Why does `Product` connect `Community 1` to `Community 2`, `Community 6`?**
  _High betweenness centrality (0.011) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _142 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.08536585365853659 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.08365384615384615 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.10946589106292967 - nodes in this community are weakly interconnected._