# Graph Report - skin-care-for-me-webapp  (2026-07-02)

## Corpus Check
- 45 files · ~8,667 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 264 nodes · 506 edges · 16 communities (12 shown, 4 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `267c61b3`
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

## God Nodes (most connected - your core abstractions)
1. `cn()` - 50 edges
2. `compilerOptions` - 16 edges
3. `useAppDataContext()` - 11 edges
4. `getCurrentCyclePhase()` - 10 edges
5. `Product` - 9 edges
6. `Button()` - 8 edges
7. `Routine` - 8 edges
8. `Badge()` - 7 edges
9. `Card()` - 7 edges
10. `CardContent()` - 7 edges

## Surprising Connections (you probably didn't know these)
- `RoutinesPage()` --calls--> `useAppDataContext()`  [EXTRACTED]
  app/routines/page.tsx → components/providers/app-data-provider.tsx
- `CardDescription()` --calls--> `cn()`  [EXTRACTED]
  components/ui/card.tsx → lib/utils.ts
- `CardAction()` --calls--> `cn()`  [EXTRACTED]
  components/ui/card.tsx → lib/utils.ts
- `CardFooter()` --calls--> `cn()`  [EXTRACTED]
  components/ui/card.tsx → lib/utils.ts
- `ProductsPage()` --calls--> `useAppDataContext()`  [EXTRACTED]
  app/products/page.tsx → components/providers/app-data-provider.tsx

## Communities (16 total, 4 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.08
Nodes (33): NAV_ITEMS, ProductLookupResult, cn(), AddProductSheet(), AddProductSheetProps, Button(), buttonVariants, DialogContent() (+25 more)

### Community 1 - "Community 1"
Cohesion: 0.09
Nodes (40): db, DEFAULT_SETTINGS, deleteProduct(), ensureSeedProducts(), getAllProducts(), getRoutines(), getSettings(), saveProduct() (+32 more)

### Community 2 - "Community 2"
Cohesion: 0.16
Nodes (25): getGreeting(), HomePage(), ConflictList(), SEVERITY_STYLES, CyclePage(), CYCLE_PHASE_LABELS, CYCLE_SKIN_NOTES, getCurrentCyclePhase() (+17 more)

### Community 3 - "Community 3"
Cohesion: 0.06
Nodes (32): dependencies, ai, @ai-sdk/openai, class-variance-authority, clsx, dexie, @fontsource/fraunces, @fontsource/source-sans-3 (+24 more)

### Community 4 - "Community 4"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 5 - "Community 5"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 6 - "Community 6"
Cohesion: 0.22
Nodes (9): devDependencies, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, @types/node, @types/react, @types/react-dom (+1 more)

### Community 7 - "Community 7"
Cohesion: 0.19
Nodes (9): metadata, viewport, useAppData(), AppShell(), BottomNav(), ClientAppShell(), AppDataContext, AppDataContextValue (+1 more)

### Community 8 - "Community 8"
Cohesion: 0.53
Nodes (4): POST(), lookupProduct(), lookupSchema, mockLookup()

### Community 9 - "Community 9"
Cohesion: 0.40
Nodes (4): code:bash (npm run dev), Deploy on Vercel, Getting Started, Learn More

### Community 15 - "Community 15"
Cohesion: 0.43
Nodes (6): RoutinesPage(), Tabs(), TabsContent(), TabsList(), tabsListVariants, TabsTrigger()

## Knowledge Gaps
- **94 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+89 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Community 0` to `Community 2`, `Community 15`?**
  _High betweenness centrality (0.112) - this node is a cross-community bridge._
- **Why does `Button()` connect `Community 0` to `Community 2`?**
  _High betweenness centrality (0.013) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _94 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.07767722473604827 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.08597285067873303 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.06060606060606061 - nodes in this community are weakly interconnected._
- **Should `Community 4` be split into smaller, more focused modules?**
  _Cohesion score 0.09090909090909091 - nodes in this community are weakly interconnected._