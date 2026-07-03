# Product backlog

Prioritized work items for Skincare for You. IDs are stable references for issues and PRs.

**Priority key:** P0 = must ship in phase · P1 = should ship · P2 = nice to have · P3 = future/explore  
**Effort key:** S (&lt;3 days) · M (3–7 days) · L (1–2 weeks) · XL (2+ weeks)

**Roadmap phases:** [ROADMAP.md](ROADMAP.md) · **Vision:** [PRODUCT-VISION.md](PRODUCT-VISION.md)

---

## Epic summary

| Epic | Phase | P0 items | Theme |
|------|-------|----------|-------|
| [E1 — Shelf management](#e1--shelf-management) | 1 | 3 | Own your product list |
| [E2 — Scheduling & Today](#e2--scheduling--today) | 1–3 | 2 | Right routine, right day |
| [E3 — Ingredient intelligence](#e3--ingredient-intelligence) | 1–2 | 2 | Trustworthy warnings |
| [E4 — Cycle & sensitivity](#e4--cycle--sensitivity) | 1–3 | 1 | Body context (v0.1) + refinements |
| [E5 — Data & privacy](#e5--data--privacy) | 1–4 | 2 | Portable, local-first |
| [E6 — Onboarding & UX](#e6--onboarding--ux) | 1–2 | 2 | First-run clarity |
| [E7 — Habit & engagement](#e7--habit--engagement) | 3 | 0 | Follow-through |
| [E8 — Platform & growth](#e8--platform--growth) | 4 | 0 | Optional scale |
| [E9 — Alternates & discovery](#e9--alternates--discovery) | 3 | 0 | Comparables, wishlist |
| [E10 — Partner profiles](#e10--partner-profiles) | 3–4 | 0 | Household, partner shelf |

---

## E1 — Shelf management

*Users can curate an accurate shelf without workarounds.*

### PROD-101 · Edit existing product
| Field | Value |
|-------|-------|
| Priority | **P0** |
| Effort | M |
| Phase | 1 (v0.2) |
| Status | Not started |

**User story:** As a user, I want to edit a product's frequency, time of day, category, and ingredients so my routines match how I actually use it.

**Acceptance criteria:**
- Edit sheet from product card (seed products: frequency/time/category only; ingredients read-only or editable with warning)
- Changes persist to IndexedDB and routines re-derive via liveQuery
- Validation matches add-product schema
- Undo via revert or explicit save/cancel

**Dependencies:** None

---

### PROD-102 · Delete confirmation for user products
| Field | Value |
|-------|-------|
| Priority | P1 |
| Effort | S |
| Phase | 1 |
| Status | Not started |

**User story:** As a user, I want a confirmation before deleting a product so I don't remove something by accident.

**Acceptance criteria:** Confirm dialog; seed products show no delete action (current behavior preserved).

---

### PROD-103 · Duplicate product detection
| Field | Value |
|-------|-------|
| Priority | P2 |
| Effort | S |
| Phase | 2 |
| Status | Not started |

**User story:** As a user adding a product, I want a warning if a similar name already exists on my shelf.

**Acceptance criteria:** Fuzzy match on name/brand; dismissible warning; does not block add.

---

### PROD-104 · Manual product entry (no AI)
| Field | Value |
|-------|-------|
| Priority | P1 |
| Effort | M |
| Phase | 1 |
| Status | Not started |

**User story:** As a user without API access, I want to add a product manually so I am not dependent on lookup.

**Acceptance criteria:** Form with required fields; same persistence path as lookup add.

---

## E2 — Scheduling & Today

*Today shows what matters on the day the user actually uses it.*

### PROD-201 · Configurable weekly day
| Field | Value |
|-------|-------|
| Priority | **P0** |
| Effort | M |
| Phase | 1 |
| Status | Not started |

**User story:** As a user with weekly treatments, I want to pick which day they appear on Today (not only Sunday).

**Acceptance criteria:**
- Setting: weekly anchor day (0–6) in app settings
- `getTodaysRoutines()` respects setting
- UI copy explains weekly cadence
- Unit tests for day logic

**Dependencies:** None

---

### PROD-202 · Monthly cadence options
| Field | Value |
|-------|-------|
| Priority | P1 |
| Effort | M |
| Phase | 1 |
| Status | Not started |

**User story:** As a user, I want monthly products to appear on a day I choose (e.g. last Sunday, day 15) not only the 1st.

**Acceptance criteria:** Setting for monthly trigger; documented in Guide; tests updated.

---

### PROD-203 · Routine step reorder (per routine)
| Field | Value |
|-------|-------|
| Priority | P2 |
| Effort | L |
| Phase | 3 |
| Status | Not started |

**User story:** As a user, I want to override category sort order for a specific routine when my dermatologist's order differs.

**Acceptance criteria:** Drag-and-drop or move up/down; overrides stored in settings; generator respects overrides.

---

### PROD-204 · Hide product from routine (without delete)
| Field | Value |
|-------|-------|
| Priority | P2 |
| Effort | M |
| Phase | 3 |
| Status | Not started |

**User story:** As a user on a rest week, I want to pause a product in routines without removing it from my shelf.

**Acceptance criteria:** Per-product "paused" flag; excluded from generation; visible on shelf with badge.

---

### PROD-205 · Empty Today state improvements
| Field | Value |
|-------|-------|
| Priority | P1 |
| Effort | S |
| Phase | 1 |
| Status | Not started |

**User story:** As a new user, I want Today to explain why nothing is scheduled (e.g. wrong day for weekly items).

**Acceptance criteria:** Contextual empty state: no products vs nothing scheduled today vs cycle filter active.

---

## E3 — Ingredient intelligence

*Warnings are helpful, visible, and grounded.*

### PROD-301 · Shelf-wide conflict banner on Products
| Field | Value |
|-------|-------|
| Priority | **P0** |
| Effort | S |
| Phase | 1 |
| Status | Not started |

**User story:** As a user, I want to see shelf-wide ingredient conflicts on the Products page, not only on Guide.

**Acceptance criteria:** Reuse `InteractionSummaryBar`; tap opens details sheet; count matches Guide.

---

### PROD-302 · Externalized conflict rules
| Field | Value |
|-------|-------|
| Priority | P1 |
| Effort | M |
| Phase | 2 |
| Status | Not started |

**User story:** As a maintainer, I want conflict rules in a data file so we can expand without code changes.

**Acceptance criteria:** JSON/YAML rule source; loader + tests; migration path from current TS array.

---

### PROD-303 · Expand rule set to 30+ pairs
| Field | Value |
|-------|-------|
| Priority | P1 |
| Effort | L |
| Phase | 2 |
| Status | Not started |

**User story:** As an ingredient-conscious user, I want broader coverage of common actives (AHA+BHA, copper peptides, etc.).

**Acceptance criteria:** Curated rules with source notes in comments; false positive review checklist.

**Dependencies:** PROD-302

---

### PROD-304 · Cross-routine conflict hints
| Field | Value |
|-------|-------|
| Priority | P2 |
| Effort | M |
| Phase | 2 |
| Status | Not started |

**User story:** As a user, I want to know if my morning and evening products conflict even when they are not in the same routine card.

**Acceptance criteria:** "Same day" conflict strip on Today when AM+PM products conflict; link to details.

---

### PROD-305 · "Why this warning?" explainer
| Field | Value |
|-------|-------|
| Priority | P2 |
| Effort | S |
| Phase | 2 |
| Status | Not started |

**User story:** As a user, I want plain-language guidance on each conflict so I can decide what to do.

**Acceptance criteria:** Each rule has short `why` + `whatToDo`; shown in interaction sheet (extend existing copy).

---

## E4 — Cycle & sensitivity

*Optional body context without medical claims.*

**Shipped in v0.1:** Body page (`/cycle`), menstrual + life stage + weight settings, routine holds, `BodyContextBanner`, privacy notice, i18n. See [BODY-AND-CYCLE.md](BODY-AND-CYCLE.md).

### PROD-401 · Cycle onboarding copy & validation
| Field | Value |
|-------|-------|
| Priority | P1 |
| Effort | S |
| Phase | 1 |
| Status | Not started |

**User story:** As a user enabling cycle tracking, I want clear disclaimers and date validation so I trust the phase display.

**Acceptance criteria:** Future dates rejected; disclaimer visible; phase updates when settings change.

---

### PROD-402 · Sensitivity mode (pregnancy / retinol newbie)
| Field | Value |
|-------|-------|
| Priority | P2 |
| Effort | M |
| Phase | 3 |
| Status | Partial — life-stage holds exist; no standalone "retinol newbie" toggle |

**User story:** As a user in a sensitive period, I want a toggle that further limits harsh actives across all frequencies.

**Acceptance criteria:** Setting in cycle or general settings; generator filter; PDF reflects mode.

**Note:** `pregnant` / `postpartum` / `breastfeeding` life stages already hold retinoids and daily acids. This item covers additional modes beyond life stage.

---

### PROD-403 · Weekly/monthly harsh active respect in luteal
| Field | Value |
|-------|-------|
| Priority | P3 |
| Effort | S |
| Phase | 3 |
| Status | Not started |

**User story:** As a cycle-aware user, I want optional filtering of weekly peels during luteal phase.

**Acceptance criteria:** Opt-in setting; default off to preserve current behavior.

---

## E5 — Data & privacy

*Users own their data.*

### PROD-501 · JSON export
| Field | Value |
|-------|-------|
| Priority | **P0** |
| Effort | M |
| Phase | 1 |
| Status | Not started |

**User story:** As a user, I want to export my shelf and settings so I have a backup.

**Acceptance criteria:** Download `.json` with schema version, export date, products, settings; excludes derived routines.

---

### PROD-502 · JSON import with merge
| Field | Value |
|-------|-------|
| Priority | **P0** |
| Effort | M |
| Phase | 1 |
| Status | Not started |

**User story:** As a user, I want to restore or merge a backup on a new device.

**Acceptance criteria:** File picker; validate schema; merge strategy documented (replace vs merge); error messages for corrupt files.

**Dependencies:** PROD-501

---

### PROD-503 · Clear all data
| Field | Value |
|-------|-------|
| Priority | P1 |
| Effort | S |
| Phase | 1 |
| Status | Not started |

**User story:** As a user, I want to reset the app to factory state.

**Acceptance criteria:** Settings action; double confirm; seeds re-apply on next load.

---

### PROD-504 · Optional encrypted sync
| Field | Value |
|-------|-------|
| Priority | P3 |
| Effort | XL |
| Phase | 4 |
| Status | Not started |

**User story:** As a user with multiple devices, I want optional sync without giving up local-first defaults.

**Dependencies:** Auth provider, backend, privacy review

---

## E6 — Onboarding & UX

*First run is calm and clear.*

### PROD-601 · First-run onboarding flow
| Field | Value |
|-------|-------|
| Priority | **P0** |
| Effort | M |
| Phase | 1 |
| Status | Not started |

**User story:** As a first-time user, I want a short tour of Today, Products, and conflicts so the seed shelf does not feel alarming.

**Acceptance criteria:** 3–4 steps; sets `onboardingComplete`; skippable; does not show again unless reset.

---

### PROD-602 · Seed shelf intro card
| Field | Value |
|-------|-------|
| Priority | P1 |
| Effort | S |
| Phase | 1 |
| Status | Not started |

**User story:** As a new user, I want to understand that demo products are intentional examples.

**Acceptance criteria:** Dismissible banner on Products; explains seeds are non-deletable demos.

---

### PROD-603 · Dark mode toggle
| Field | Value |
|-------|-------|
| Priority | P2 |
| Effort | S |
| Phase | 2 |
| Status | Not started |

**User story:** As a user, I want dark mode for evening routine check.

**Acceptance criteria:** Toggle in settings; respects system preference option; persists in settings.

---

### PROD-604 · Branded PDF guide
| Field | Value |
|-------|-------|
| Priority | P2 |
| Effort | M |
| Phase | 2 |
| Status | Not started |

**User story:** As a user exporting my guide, I want it to look like the app, not plain Helvetica.

**Acceptance criteria:** App colors/logo; readable on print; conflict section preserved.

---

## E7 — Habit & engagement

*Support follow-through without dark patterns.*

### PROD-701 · Mark routine steps complete
| Field | Value |
|-------|-------|
| Priority | P1 |
| Effort | M |
| Phase | 3 |
| Status | Not started |

**User story:** As a user, I want to check off steps I finished today.

**Acceptance criteria:** Local log by date; resets daily; no account required.

---

### PROD-702 · AM/PM reminders
| Field | Value |
|-------|-------|
| Priority | P2 |
| Effort | L |
| Phase | 3 |
| Status | Not started |

**User story:** As a user, I want optional notifications for routine times.

**Acceptance criteria:** Permission prompt; configurable times; works when PWA installed (Phase 2).

**Dependencies:** PROD-801 (PWA)

---

### PROD-703 · Streak display (optional)
| Field | Value |
|-------|-------|
| Priority | P3 |
| Effort | S |
| Phase | 3 |
| Status | Not started |

**User story:** As a motivated user, I want to see consecutive days I completed my routine.

**Acceptance criteria:** Opt-in; no guilt copy; based on PROD-701 log.

---

## E8 — Platform & growth

*Scale only when core loop is proven.*

### PROD-801 · PWA install + offline shell
| Field | Value |
|-------|-------|
| Priority | P1 |
| Effort | L |
| Phase | 2 |
| Status | Not started |

**User story:** As a mobile user, I want to install the app and open it offline.

**Acceptance criteria:** Web manifest; service worker; install prompt; core pages work offline after first load.

---

### PROD-802 · Lookup result cache
| Field | Value |
|-------|-------|
| Priority | P1 |
| Effort | M |
| Phase | 2 |
| Status | Not started |

**User story:** As a user, I want repeat lookups to be fast and consistent.

**Acceptance criteria:** Server-side cache keyed by normalized query; TTL documented; mock path unchanged.

---

### PROD-803 · Barcode scan add
| Field | Value |
|-------|-------|
| Priority | P3 |
| Effort | XL |
| Phase | 4 |
| Status | Not started |

**User story:** As a user, I want to scan a barcode to add a product.

**Dependencies:** Product database API evaluation

---

### PROD-804 · CI pipeline
| Field | Value |
|-------|-------|
| Priority | P1 |
| Effort | S |
| Phase | 2 |
| Status | Not started |

**User story:** As a developer, I want PR checks for test, lint, and build.

**Acceptance criteria:** GitHub Actions (or Vercel CI); required checks documented in README.

---

## E9 — Alternates & discovery

*Help users find comparable products and save options to try — without a social marketplace.*

**Main nav:** Fifth tab — **Alternates** (`/alternates`).

### PROD-901 · Alternates tab shell
| Field | Value |
|-------|-------|
| Priority | P1 |
| Effort | M |
| Phase | 3 (v0.4) |
| Status | Not started |

**User story:** As a user, I want a dedicated Alternates section in the app so I can explore options beyond my current shelf.

**Acceptance criteria:**
- New nav item and route `/alternates` (desktop side nav + mobile bottom nav)
- Empty state when shelf is empty — link to Products
- i18n keys for `nav.alternates` and page copy (`es-419` + `en`)
- Sitemap + page metadata

**Dependencies:** Phase 1 shelf management (meaningful comparables need real products)

---

### PROD-902 · Comparable products per shelf item
| Field | Value |
|-------|-------|
| Priority | P1 |
| Effort | L |
| Phase | 3 |
| Status | Not started |

**User story:** As a user, I want to see products comparable to what I already own so I can consider swaps or upgrades.

**Acceptance criteria:**
- Group alternates by shelf product (or category + active family)
- Matching uses category, active ingredients, and frequency — documented rules in `lib/`
- Seed catalog or static alternate map for demo shelf; extensible for lookup-backed catalog later
- Surfaces conflict risk if alternate would clash with another shelf product

**Dependencies:** PROD-901; E3 conflict rules

---

### PROD-903 · Comparative view
| Field | Value |
|-------|-------|
| Priority | P1 |
| Effort | M |
| Phase | 3 |
| Status | Not started |

**User story:** As a user, I want a side-by-side comparison so I can decide between my product and an alternate.

**Acceptance criteria:**
- Compare: name, brand, category, key actives, frequency, rough price tier (when available)
- Highlight differences (e.g. stronger/weaker active, AM vs PM fit)
- Link out to brand / shop URLs when present — same pattern as product cards
- Printable or shareable comparison deferred (P2)

**Dependencies:** PROD-902

---

### PROD-904 · Curated alternate notes (reviews)
| Field | Value |
|-------|-------|
| Priority | P2 |
| Effort | M |
| Phase | 3 |
| Status | Not started |

**User story:** As a user, I want short notes on why an alternate might suit me — without wading through a review site.

**Acceptance criteria:**
- Editorial copy per alternate (localized `es-419` / `en`) — who it's for, tradeoffs, barrier-friendly flag
- **Not** user-generated reviews or star ratings in v0.4
- Copy lives in seed/static files or CMS-ready structure for later

**Dependencies:** PROD-902

---

### PROD-905 · Wishlist (save alternates)
| Field | Value |
|-------|-------|
| Priority | P1 |
| Effort | M |
| Phase | 3 |
| Status | Not started |

**User story:** As a user, I want to save alternates to a wishlist so I can try them later without adding them to my shelf yet.

**Acceptance criteria:**
- `wishlist` store in IndexedDB (separate from products shelf)
- Save / remove from alternate cards; wishlist sub-view on Alternates tab
- Optional note or "try next" tag per item
- Included in JSON export/import (E5) when backup ships

**Dependencies:** PROD-901; PROD-502 (import) for full portability

---

### PROD-906 · Wishlist → add to shelf
| Field | Value |
|-------|-------|
| Priority | P2 |
| Effort | S |
| Phase | 3 |
| Status | Not started |

**User story:** As a user, I want to promote a wishlist item to my shelf when I'm ready to buy or try it.

**Acceptance criteria:**
- "Add to shelf" flows through existing lookup/add product path
- Removes from wishlist on successful add (or asks user)
- Routines re-derive after add

**Dependencies:** PROD-905; PROD-101 (edit flow helpful but not blocking)

---

## E10 — Partner profiles

*One person often runs skincare for two — support partner shelves without accounts or stereotypes.*

**Product insight:** Many partners (any gender) won't install or maintain a skincare app themselves. The primary user still wants conflict-safe routines and a clear Today view **for them** on the same phone.

### PROD-1001 · Partner profile creation
| Field | Value |
|-------|-------|
| Priority | P1 |
| Effort | M |
| Phase | 3 (v0.4) |
| Status | Not started |

**User story:** As a user, I want to add my partner so I can manage their products and routine alongside mine.

**Acceptance criteria:**
- "Add partner" flow — display name only (e.g. "Alex", "Partner"); no gender field required
- Second profile stored in IndexedDB with isolated `products`, `routines`, `settings`
- Remove partner profile with confirmation (does not affect primary profile)
- Copy is inclusive — "partner", not gendered relationship labels

**Dependencies:** Phase 1 backup schema design (multi-profile export)

---

### PROD-1002 · Profile switcher
| Field | Value |
|-------|-------|
| Priority | P1 |
| Effort | S |
| Phase | 3 |
| Status | Not started |

**User story:** As a user, I want to switch between my shelf and my partner's so Today always shows the right person.

**Acceptance criteria:**
- Switcher in app chrome (header or nav footer); persists last-selected profile in localStorage
- All routes (Today, Products, Routines, Lifestyle) scoped to active profile
- Visual indicator of whose profile is active (name or avatar initial)

**Dependencies:** PROD-1001

---

### PROD-1003 · Partner shelf and routines
| Field | Value |
|-------|-------|
| Priority | P1 |
| Effort | L |
| Phase | 3 |
| Status | Not started |

**User story:** As a user managing my partner's care, I want their products and routines fully separate from mine.

**Acceptance criteria:**
- Add/edit products on partner profile uses same flows as primary
- Routines auto-generate per profile; no cross-profile ingredient conflict checks unless we explicitly add "shared bathroom" mode (out of scope)
- PDF export per profile

**Dependencies:** PROD-1002; PROD-101

---

### PROD-1004 · Partner lifestyle context
| Field | Value |
|-------|-------|
| Priority | P2 |
| Effort | S |
| Phase | 3 |
| Status | Not started |

**User story:** As a user, I want lifestyle settings per person so my partner's cycle or skin conditions don't mix with mine.

**Acceptance criteria:**
- `bodyContext` (Lifestyle tab) scoped to active profile
- Same toggle model as primary user — no "male/female" mode; menstrual tracking optional per profile

**Dependencies:** PROD-1002

---

### PROD-1005 · Partner sync (own device)
| Field | Value |
|-------|-------|
| Priority | P2 |
| Effort | XL |
| Phase | 4 (v1.0) |
| Status | Not started |

**User story:** As a partner, I want to see my routine on my own phone without rebuilding my shelf.

**Acceptance criteria:**
- Optional account links partner profile to a second device
- Partner can view Today + routines read-only or full edit (TBD)
- Conflict resolution documented

**Dependencies:** Phase 4 auth + sync; PROD-1001–1003

---

## Suggested sprint 1 (v0.2 kickoff)

Ship the highest leverage P0 bundle:

| Order | ID | Item | Effort |
|-------|-----|------|--------|
| 1 | PROD-101 | Edit existing product | M |
| 2 | PROD-201 | Configurable weekly day | M |
| 3 | PROD-501 | JSON export | M |
| 4 | PROD-502 | JSON import | M |
| 5 | PROD-601 | Onboarding flow | M |
| 6 | PROD-301 | Conflict banner on Products | S |

**Sprint 1 goal:** A user can onboard, fix a product, back up data, and pick their weekly day.

---

## Backlog hygiene

- New items get the next ID in their epic (e.g. PROD-105)
- Move status to **In progress** / **Done** when work starts/merges
- Link PRs: `PROD-101: edit product sheet`
- Defer anything that does not serve the current phase goal
