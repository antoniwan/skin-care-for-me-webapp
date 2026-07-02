# Graph Report - skin-care-for-me-webapp  (2026-07-02)

## Corpus Check
- 136 files · ~56,928 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 783 nodes · 2198 edges · 29 communities (24 shown, 5 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 39 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `e5b708b5`
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

## God Nodes (most connected - your core abstractions)
1. `cn()` - 82 edges
2. `useTranslation()` - 55 edges
3. `t` - 40 edges
4. `Product` - 32 edges
5. `useAppDataContext()` - 26 edges
6. `Routine` - 22 edges
7. `getCurrentCyclePhase()` - 22 edges
8. `ConflictWarning` - 21 edges
9. `getBodyContextSnapshot()` - 20 edges
10. `getCycleDay()` - 19 edges

## Surprising Connections (you probably didn't know these)
- `InteractionDetail()` --calls--> `t`  [INFERRED]
  components/conflicts/interaction-detail.tsx → lib/body-context/routine-rules.test.ts
- `InteractionDetailsSheet()` --calls--> `t`  [INFERRED]
  components/conflicts/interaction-details-sheet.tsx → lib/body-context/routine-rules.test.ts
- `InteractionSummaryBar()` --calls--> `t`  [INFERRED]
  components/conflicts/interaction-summary-bar.tsx → lib/body-context/routine-rules.test.ts
- `RoutineInteractionBadge()` --calls--> `t`  [INFERRED]
  components/conflicts/routine-interaction-badge.tsx → lib/body-context/routine-rules.test.ts
- `StepInteractionHint()` --calls--> `t`  [INFERRED]
  components/conflicts/step-interaction-hint.tsx → lib/body-context/routine-rules.test.ts

## Communities (29 total, 5 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.09
Nodes (54): getOtherProductName(), groupWarningsByProduct(), highestSeverity(), SEVERITY_ORDER, sortWarningsBySeverity(), grouped, sorted, warning (+46 more)

### Community 1 - "Community 1"
Cohesion: 0.07
Nodes (44): InteractionDetail(), InteractionDetailsSheet(), RoutineInteractionBadge(), SEVERITY_STYLES, SeverityDot(), SeverityDot(), BodyContextPrivacyNotice(), EmptyState() (+36 more)

### Community 2 - "Community 2"
Cohesion: 0.20
Nodes (9): buildAmazonAffiliateUrl(), hasAmazonAffiliateTag(), ProductCardProps, ProductImage(), ProductIngredients(), ProductIngredientsProps, ProductLinks(), ProductLinksProps (+1 more)

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
Cohesion: 0.09
Nodes (50): getGreeting(), HomePage(), ConflictList(), SEVERITY_STYLES, InteractionSummaryBar(), PAGE_METADATA, CyclePhaseBanner(), CyclePhaseBannerProps (+42 more)

### Community 7 - "Community 7"
Cohesion: 0.10
Nodes (21): metadata, viewport, ROOT_METADATA, APP_NAV_ITEMS, AppNavItem, isNavItemActive(), useAppData(), AppLayoutClient() (+13 more)

### Community 8 - "Community 8"
Cohesion: 0.21
Nodes (12): Env, envSchema, getEnv(), hasOpenAiKey(), POST(), lookupProductAction(), LookupProductActionResult, lookupProduct() (+4 more)

### Community 9 - "Community 9"
Cohesion: 0.13
Nodes (23): code:bash (npm install), code:env (OPENAI_API_KEY=sk-...), code:env (NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG=yourtag-20), code:bash (npm run build), code:block5 (app/                    Next.js App Router pages and API rou), Deploy on Vercel, Documentation, Getting Started (+15 more)

### Community 15 - "Community 15"
Cohesion: 0.12
Nodes (33): CYCLE_PHASE_LABELS, CYCLE_SKIN_NOTES, LIFE_STAGE_DESCRIPTIONS, LIFE_STAGE_LABELS, WEIGHT_CHANGE_LABELS, WEIGHT_CHANGE_NOTES, getBodyContextProductExclusions(), getProductExclusionReason() (+25 more)

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

### Community 25 - "Community 25"
Cohesion: 0.07
Nodes (62): getBodyContextCore(), db, DEFAULT_SETTINGS, deleteProduct(), ensureSeedProducts(), getAllProducts(), getRoutines(), getSettings() (+54 more)

### Community 26 - "Community 26"
Cohesion: 0.10
Nodes (37): formatCategory(), ProductCategory, TimeOfDay, GuideData, categoryRank(), ROUTINE_CATEGORY_ORDER, getRoutineWarnings(), RoutineCardProps (+29 more)

### Community 27 - "Community 27"
Cohesion: 0.09
Nodes (21): Body & cycle context, Code map, code:ts (bodyContext: {), code:block2 (products), Effect on routines, Effect on UI, Legacy migration, Life stage (+13 more)

### Community 28 - "Community 28"
Cohesion: 0.05
Nodes (40): DEFAULT_BODY_CONTEXT, LegacySettings, normalizeAppSettings(), normalizeBodyContext(), normalizeMenstrual(), settings, pad, retinol (+32 more)

## Knowledge Gaps
- **262 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+257 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Community 1` to `Community 0`, `Community 6`, `Community 7`?**
  _High betweenness centrality (0.047) - this node is a cross-community bridge._
- **Why does `useTranslation()` connect `Community 0` to `Community 1`, `Community 2`, `Community 6`, `Community 7`, `Community 15`, `Community 26`?**
  _High betweenness centrality (0.028) - this node is a cross-community bridge._
- **Why does `Product` connect `Community 26` to `Community 0`, `Community 2`, `Community 6`, `Community 15`, `Community 25`, `Community 28`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **Are the 39 inferred relationships involving `t` (e.g. with `InteractionDetail()` and `InteractionDetailsSheet()`) actually correct?**
  _`t` has 39 INFERRED edges - model-reasoned connections that need verification._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _262 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.08552388004442799 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.06806526806526807 - nodes in this community are weakly interconnected._