# Graph Report - skin-care-for-me-webapp  (2026-07-02)

## Corpus Check
- 167 files · ~341,208 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1029 nodes · 2715 edges · 52 communities (46 shown, 6 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 41 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `e2599082`
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
- [[_COMMUNITY_Community 42|Community 42]]
- [[_COMMUNITY_Community 43|Community 43]]
- [[_COMMUNITY_Community 44|Community 44]]
- [[_COMMUNITY_Community 45|Community 45]]
- [[_COMMUNITY_Community 46|Community 46]]
- [[_COMMUNITY_Community 47|Community 47]]
- [[_COMMUNITY_Community 48|Community 48]]
- [[_COMMUNITY_Community 49|Community 49]]
- [[_COMMUNITY_Community 50|Community 50]]
- [[_COMMUNITY_Community 51|Community 51]]

## God Nodes (most connected - your core abstractions)
1. `cn()` - 87 edges
2. `useTranslation()` - 61 edges
3. `t` - 42 edges
4. `Product` - 34 edges
5. `useAppDataContext()` - 28 edges
6. `getBodyContextSnapshot()` - 25 edges
7. `Routine` - 23 edges
8. `getCurrentCyclePhase()` - 22 edges
9. `ConflictWarning` - 21 edges
10. `getCycleDay()` - 19 edges

## Surprising Connections (you probably didn't know these)
- `InteractionDetail()` --calls--> `t`  [INFERRED]
  components/conflicts/interaction-detail.tsx → lib/body-context/routine-rules.test.ts
- `InteractionDetailsSheet()` --calls--> `t`  [INFERRED]
  components/conflicts/interaction-details-sheet.tsx → lib/body-context/routine-rules.test.ts
- `RoutineInteractionBadge()` --calls--> `t`  [INFERRED]
  components/conflicts/routine-interaction-badge.tsx → lib/body-context/routine-rules.test.ts
- `StepInteractionHint()` --calls--> `t`  [INFERRED]
  components/conflicts/step-interaction-hint.tsx → lib/body-context/routine-rules.test.ts
- `BodyContextBanner()` --calls--> `t`  [INFERRED]
  components/cycle/body-context-banner.tsx → lib/body-context/routine-rules.test.ts

## Communities (52 total, 6 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.11
Nodes (24): t, InteractionSummaryBar(), isLocale(), formatRoutineSchedule(), localizeCheck(), localizeConflictSummary(), localizeVerification(), AppLoading() (+16 more)

### Community 1 - "Community 1"
Cohesion: 0.11
Nodes (22): SeverityDot(), cn(), CardAction(), CardDescription(), CardFooter(), DialogContent(), DialogDescription(), DialogFooter() (+14 more)

### Community 2 - "Community 2"
Cohesion: 0.36
Nodes (5): buildAmazonAffiliateUrl(), hasAmazonAffiliateTag(), ProductLinks(), ProductLinksProps, getProductPageLabel()

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
Cohesion: 0.06
Nodes (66): getGreeting(), HomePage(), getBodyContextProductExclusions(), ConflictList(), SEVERITY_STYLES, InteractionSummaryBar(), buildSocialMetadata(), createPageMetadata() (+58 more)

### Community 7 - "Community 7"
Cohesion: 0.12
Nodes (18): broken, enKeys, esKeys, localized, localizedEs, missing, products, routine (+10 more)

### Community 8 - "Community 8"
Cohesion: 0.34
Nodes (11): InteractionDetail(), InteractionDetailsSheet(), InteractionTrigger(), InteractionTriggerProps, SeverityBadge(), SeveritySummary(), ConflictSeverity, getSeverityStyle() (+3 more)

### Community 9 - "Community 9"
Cohesion: 0.13
Nodes (24): code:bash (npm install), code:env (# Optional: real AI product lookup (server-side only)), code:bash (npm run build), code:block4 (app/), code:block5 (app/                    Next.js App Router pages and API rou), Deploy on Vercel, Documentation, Environment variables (+16 more)

### Community 15 - "Community 15"
Cohesion: 0.05
Nodes (79): DEFAULT_BODY_CONTEXT, CYCLE_PHASE_LABELS, CYCLE_SKIN_NOTES, LIFE_STAGE_DESCRIPTIONS, LIFE_STAGE_LABELS, WEIGHT_CHANGE_LABELS, WEIGHT_CHANGE_NOTES, DEFAULT_BODY_CONTEXT (+71 more)

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
Cohesion: 0.33
Nodes (6): E3 — Ingredient intelligence, PROD-301 · Shelf-wide conflict banner on Products, PROD-302 · Externalized conflict rules, PROD-303 · Expand rule set to 30+ pairs, PROD-304 · Cross-routine conflict hints, PROD-305 · "Why this warning?" explainer

### Community 22 - "Community 22"
Cohesion: 0.15
Nodes (12): Alternates (main nav tab), code:mermaid (gantt), How priorities are set, Overview, Partner profiles, Phase 0 — Foundation ✅ (shipped v0.1), Phase 1 — Daily driver (target: v0.2), Phase 2 — Trust & polish (target: v0.3) (+4 more)

### Community 23 - "Community 23"
Cohesion: 0.22
Nodes (8): Non-goals (for now), North star, Problem, Product principles, Product vision, Related docs, Success metrics (v0.2+), Target users

### Community 25 - "Community 25"
Cohesion: 0.05
Nodes (90): CyclePhaseBannerProps, db, DEFAULT_SETTINGS, deleteProduct(), ensureSeedProducts(), getAllProducts(), getRoutines(), getSettings() (+82 more)

### Community 26 - "Community 26"
Cohesion: 0.08
Nodes (23): 10. Internationalization (as shipped), 11. Feature completeness (production honesty), 12. Launch gates, 13. Suggested work order (next 2 weeks), 1. Build & runtime, 2. Meta, SEO & social, 3. Brand & copy, 4. Environment & deployment (+15 more)

### Community 27 - "Community 27"
Cohesion: 0.08
Nodes (25): Body & cycle context, Code map, code:ts (bodyContext: {), code:block2 (products), Effect on routines, Effect on UI, Legacy migration, Life stage (+17 more)

### Community 28 - "Community 28"
Cohesion: 0.10
Nodes (20): Acne-prone (Tier B — guidance only), Anxiety & depression, Breastfeeding / lactating, How deep can lifestyle context go?, How guidance works in the app, Ingredient families (quick reference), Layering order (baseline), Life stages (+12 more)

### Community 29 - "Community 29"
Cohesion: 0.10
Nodes (29): en, es419, copyByLocale, getSeedCopy(), hasSeedCopy(), SeedCopyById, SeedProductCopy, SeedProductId (+21 more)

### Community 30 - "Community 30"
Cohesion: 0.11
Nodes (18): Adding a new locale, Adding a new string, Architecture, code:ts (DEFAULT_LOCALE = "es-419"), code:block2 (LocaleProvider (components/providers/locale-provider.tsx)), code:block3 (AppLayoutClient), code:tsx (import { useTranslation } from "@/components/providers/local), HTML `lang` (+10 more)

### Community 31 - "Community 31"
Cohesion: 0.07
Nodes (36): metadata, RootLayout(), viewport, ROOT_METADATA, APP_NAV_ITEMS, AppNavItem, isNavItemActive(), useAppData() (+28 more)

### Community 32 - "Community 32"
Cohesion: 0.33
Nodes (7): categoryRank(), checkApplicationOrder(), checkIngredientSafety(), checkShelfAlignment(), collectReviewNotes(), RoutineCheck, verifyRoutine()

### Community 33 - "Community 33"
Cohesion: 0.22
Nodes (15): groupWarningsByProduct(), RoutineInteractionBadge(), formatCategoryLabel(), formatFrequencyLabel(), formatRoutineTitle(), formatTimeOfDayLabel(), getEnumLabel(), plural() (+7 more)

### Community 34 - "Community 34"
Cohesion: 0.14
Nodes (14): CHECK_MESSAGE_KEYS, formatDocumentTitle(), getLifeStageToggleHelp(), getPageTitleKey(), getSkinConditionToggleHelp(), getWellnessToggleHelp(), LocalizedRoutineCheck, LocalizedRoutineVerification (+6 more)

### Community 35 - "Community 35"
Cohesion: 0.21
Nodes (9): grouped, makeWarning(), sorted, warning, ordered, products, products, warnings (+1 more)

### Community 36 - "Community 36"
Cohesion: 0.25
Nodes (12): getOtherProductName(), highestSeverity(), SEVERITY_ORDER, sortWarningsBySeverity(), warningKey(), InteractionDetail(), InteractionDetailsSheet(), RoutineInteractionBadge() (+4 more)

### Community 37 - "Community 37"
Cohesion: 0.20
Nodes (9): bpo, morning, products, retinol, routine, routines, safety, verification (+1 more)

### Community 38 - "Community 38"
Cohesion: 0.26
Nodes (8): Sheet(), SheetContent(), SheetDescription(), SheetFooter(), SheetHeader(), SheetOverlay(), SheetTitle(), SheetTrigger()

### Community 39 - "Community 39"
Cohesion: 0.12
Nodes (16): bha, cleanser, evening, fifteenth, firstOnly, midMonth, midMonthSettings, morning (+8 more)

### Community 40 - "Community 40"
Cohesion: 0.44
Nodes (7): clampMonthlyAnchorDay(), clampWeeklyAnchorDay(), isMonthlyRoutineDay(), isWeeklyRoutineDay(), normalizeRoutineSchedule(), DEFAULT_ROUTINE_SCHEDULE, RoutineScheduleSettings

### Community 41 - "Community 41"
Cohesion: 0.29
Nodes (7): E9 — Alternates & discovery, PROD-901 · Alternates tab shell, PROD-902 · Comparable products per shelf item, PROD-903 · Comparative view, PROD-904 · Curated alternate notes (reviews), PROD-905 · Wishlist (save alternates), PROD-906 · Wishlist → add to shelf

### Community 42 - "Community 42"
Cohesion: 0.33
Nodes (6): E10 — Partner profiles, PROD-1001 · Partner profile creation, PROD-1002 · Profile switcher, PROD-1003 · Partner shelf and routines, PROD-1004 · Partner lifestyle context, PROD-1005 · Partner sync (own device)

### Community 43 - "Community 43"
Cohesion: 0.33
Nodes (6): E2 — Scheduling & Today, PROD-201 · Configurable weekly day, PROD-202 · Monthly cadence options, PROD-203 · Routine step reorder (per routine), PROD-204 · Hide product from routine (without delete), PROD-205 · Empty Today state improvements

### Community 44 - "Community 44"
Cohesion: 0.40
Nodes (4): Backlog hygiene, Epic summary, Product backlog, Suggested sprint 1 (v0.2 kickoff)

### Community 45 - "Community 45"
Cohesion: 0.40
Nodes (5): E1 — Shelf management, PROD-101 · Edit existing product, PROD-102 · Delete confirmation for user products, PROD-103 · Duplicate product detection, PROD-104 · Manual product entry (no AI)

### Community 46 - "Community 46"
Cohesion: 0.40
Nodes (5): E5 — Data & privacy, PROD-501 · JSON export, PROD-502 · JSON import with merge, PROD-503 · Clear all data, PROD-504 · Optional encrypted sync

### Community 47 - "Community 47"
Cohesion: 0.40
Nodes (5): E6 — Onboarding & UX, PROD-601 · First-run onboarding flow, PROD-602 · Seed shelf intro card, PROD-603 · Dark mode toggle, PROD-604 · Branded PDF guide

### Community 48 - "Community 48"
Cohesion: 0.40
Nodes (5): E8 — Platform & growth, PROD-801 · PWA install + offline shell, PROD-802 · Lookup result cache, PROD-803 · Barcode scan add, PROD-804 · CI pipeline

### Community 49 - "Community 49"
Cohesion: 0.50
Nodes (4): E4 — Cycle & sensitivity, PROD-401 · Cycle onboarding copy & validation, PROD-402 · Sensitivity mode (pregnancy / retinol newbie), PROD-403 · Weekly/monthly harsh active respect in luteal

### Community 50 - "Community 50"
Cohesion: 0.50
Nodes (4): E7 — Habit & engagement, PROD-701 · Mark routine steps complete, PROD-702 · AM/PM reminders, PROD-703 · Streak display (optional)

## Knowledge Gaps
- **378 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+373 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Community 1` to `Community 0`, `Community 33`, `Community 36`, `Community 6`, `Community 38`, `Community 8`, `Community 29`, `Community 31`?**
  _High betweenness centrality (0.029) - this node is a cross-community bridge._
- **Why does `useTranslation()` connect `Community 0` to `Community 33`, `Community 2`, `Community 34`, `Community 36`, `Community 6`, `Community 38`, `Community 8`, `Community 15`, `Community 25`, `Community 29`, `Community 31`?**
  _High betweenness centrality (0.027) - this node is a cross-community bridge._
- **Why does `Product` connect `Community 25` to `Community 32`, `Community 33`, `Community 35`, `Community 6`, `Community 15`, `Community 29`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **Are the 41 inferred relationships involving `t` (e.g. with `InteractionDetail()` and `InteractionDetailsSheet()`) actually correct?**
  _`t` has 41 INFERRED edges - model-reasoned connections that need verification._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _378 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.11088709677419355 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.10591133004926108 - nodes in this community are weakly interconnected._