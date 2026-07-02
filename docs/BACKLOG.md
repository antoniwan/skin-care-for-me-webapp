# Product backlog

Prioritized work items for Skin Care For Me. IDs are stable references for issues and PRs.

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
| [E4 — Cycle & sensitivity](#e4--cycle--sensitivity) | 1–3 | 1 | Context-aware routines |
| [E5 — Data & privacy](#e5--data--privacy) | 1–4 | 2 | Portable, local-first |
| [E6 — Onboarding & UX](#e6--onboarding--ux) | 1–2 | 2 | First-run clarity |
| [E7 — Habit & engagement](#e7--habit--engagement) | 3 | 0 | Follow-through |
| [E8 — Platform & growth](#e8--platform--growth) | 4 | 0 | Optional scale |

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

*Optional body-context without medical claims.*

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
| Status | Not started |

**User story:** As a user in a sensitive period, I want a toggle that further limits harsh actives across all frequencies.

**Acceptance criteria:** Setting in cycle or general settings; generator filter; PDF reflects mode.

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
