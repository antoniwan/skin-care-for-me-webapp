# Skincare insights knowledge base

Foundational, evidence-informed notes that power body-aware guidance in Skincare for You. Written for humans first; structured so we can later derive FAQs, in-app copy, and educational content.

**Not medical advice.** Always defer to a dermatologist or OB/midwife for pregnancy, postpartum, and lactation decisions.

**Last updated:** 2026-07-02

---

## How guidance works in the app

1. **User selects all contexts that apply** — life-stage, skin, and wellness toggles stack (e.g. postpartum + breastfeeding + eczema).
2. **Each active context adds a guidance layer** — base notes first, then combined insights when multiple contexts overlap.
3. **Routine holds are conservative** — when in doubt, products are held from daily routines rather than risk irritation or systemic exposure.
4. **Progressive timelines** — postpartum rules use weeks since delivery; breastfeeding can extend retinoid caution beyond week 12.

Code: `collectLifeStageGuidance()`, `collectSkinConditionGuidance()`, `collectWellnessGuidance()` in `lib/body-context/`

---

## How deep can lifestyle context go?

We model context in **tiers** so the app stays helpful without pretending to be a clinic.

| Tier | What users can toggle | What the app does | Examples |
|------|----------------------|-------------------|----------|
| **A — Routine holds** | Dermatology-relevant skin flags | Holds daily retinoids / strong acids; accumulative guidance | Psoriasis, eczema, rosacea |
| **B — Guidance only** | Wellness + low-risk skin notes | Tips and copy only — **never** holds products | Anxiety, depression, acne-prone |
| **C — Cycle & life stage** | Menstrual phase, pregnancy, postpartum, weight | Holds + guidance (existing behavior) | Pregnant, luteal phase |
| **D — Out of scope** | Diagnosis, meds, severity scores | Not in app — link to professionals | Prescriptions, PHQ-9, telehealth |

**Naming:** The nav tab is **Lifestyle** (`/lifestyle`) — broader than “Body” but distinct from theme/language settings. Internal storage key stays `bodyContext` for migration stability.

**Adding a new toggle:** Pick a tier → add flag + `bodyGuidance.*` copy → if Tier A, extend `shouldExcludeForBarrierFirstSkin()` or a dedicated rule → document here.

---

## Life stages

### Pregnancy

**Skin changes:** Hormones can increase sensitivity, melasma risk, and oiliness or dryness swings.

**Ingredient caution (app holds):**
- **Retinoids** (retinol, retinal, tretinoin, adapalene) — avoided in routines; systemic absorption concerns.
- **Daily strong acids** (BHA/AHA in toners, exfoliants, treatments) — held when used daily; spot or weekly use may still be clinician-dependent.

**Barrier-first approach:** Gentle cleanser, moisturizer, mineral SPF. Confirm any active with prenatal care.

**FAQ seeds:**
- *Can I use retinol while pregnant?* — Generally no; app holds retinoids until pregnancy ends.
- *Is vitamin C safe in pregnancy?* — Often tolerated; not automatically held unless paired with conflicting products.

---

### Postpartum (weeks 0–11)

**Skin changes:** Hormone drop, sleep disruption, and barrier stress. Skin may be drier, reactive, or inflamed.

**Ingredient caution (app holds weeks 0–11):**
- Retinoids
- Daily harsh actives (strong BHA/AHA, frequent exfoliation)

**Care focus:** Gentle cleansing, ceramide-rich moisturizer, mineral SPF when outdoors.

**Progressive note (week 12+):** If **not breastfeeding**, app allows gradual reintroduction of actives when tolerated. If **still breastfeeding**, retinoid caution from lactation continues to apply.

**FAQ seeds:**
- *When can I restart retinol after birth?* — Depends on breastfeeding and healing; week 12+ is a common reintroduction window only when not nursing.
- *Why is my skin so dry postpartum?* — Hormone shift + barrier disruption; prioritize hydration and avoid over-exfoliating.

---

### Breastfeeding / lactating

**Can combine with postpartum.** Many users are both in the first months after delivery.

**Ingredient caution (app holds while toggle is on):**
- Retinoids — same conservative stance as pregnancy until clinician clears.
- Daily strong acids in leave-on products — aligned with pregnancy-style caution.

**How it differs from postpartum-only:**
- **Postpartum-only (week 12+, not nursing):** retinoid holds may lift; guidance encourages gradual reintroduction.
- **Postpartum + breastfeeding:** barrier recovery **and** lactation transfer caution stack. Retinoids stay held while nursing even after week 12.
- **Combined guidance copy:** emphasizes barrier first + extended retinoid pause while lactating.

**FAQ seeds:**
- *Can I use retinol while breastfeeding?* — Discuss with your clinician; app keeps retinoids off routines until you turn breastfeeding off or get clinical clearance.
- *Is postpartum skin care different if I'm nursing?* — Yes — timeline for actives is longer when lactating.

---

### Perimenopause

**Skin changes:** Estrogen decline → thinner skin, reduced ceramides, more dryness and reactivity.

**Routine impact:** No automatic product holds.

**Care focus:** Consistent hydration, barrier lipids, daily SPF, gentle actives introduced slowly.

---

### Menopause

**Skin changes:** Continued collagen and lipid loss; increased dryness and sensitivity.

**Routine impact:** No automatic holds.

**Care focus:** Ceramides, humectants, occlusives as needed, daily mineral SPF.

---

## Menstrual cycle phases (summary)

| Phase | Typical skin behavior | App tendency |
|-------|----------------------|--------------|
| Menstrual | More sensitive, drier | Hold daily harsh actives |
| Follicular | Often tolerates actives | Fewer holds |
| Ovulation | May be oilier | Hydration + SPF tips |
| Luteal | Breakout-prone | Hold daily harsh actives; BHA may help some users |

Full rules: [BODY-AND-CYCLE.md](BODY-AND-CYCLE.md)

---

## Weight change context

Qualitative only (no weight numbers stored).

- **Gaining:** Stretch-prone areas benefit from regular moisturizer; barrier support.
- **Losing:** Skin may need time to adapt; steady hydration and barrier care.

Never removes products from routines.

---

## Skin conditions (Tier A & B)

### Psoriasis, eczema, rosacea (Tier A — holds)

**App holds while toggle is on:** daily retinoids and daily strong acids (BHA/AHA in leave-on products).

**Care focus:** fragrance-free cleanser, rich moisturizer, mineral SPF; avoid over-exfoliating inflamed areas.

### Acne-prone (Tier B — guidance only)

**No automatic holds.** Guidance encourages consistent BHA or benzoyl peroxide and introducing one active at a time.

---

## Wellness (Tier B — guidance only)

### Anxiety & depression

**Never holds products.** Copy supports short, predictable routines and “minimum viable” care on low-energy days.

**Important:** Not mental health treatment. Combined anxiety + depression adds a note to seek professional support.

---

## Ingredient families (quick reference)

| Family | Examples | Common cautions |
|--------|----------|-----------------|
| Retinoids | Retinol, tretinoin, adapalene | Pregnancy, breastfeeding, early postpartum, sensitive cycle days |
| BHA | Salicylic acid | Layering with retinol; daily use in sensitive contexts |
| AHA | Glycolic, lactic acid | Over-exfoliation; pregnancy/postpartum daily use |
| Vitamin C | L-ascorbic acid | Layering with niacinamide (usually fine); BP destabilization |
| Benzoyl peroxide | BPO | Drying; conflicts with retinol and vitamin C |

Conflict rules: `lib/rules/ingredient-conflicts.ts` · Localized copy: `lib/i18n/messages/*/conflictRules`

---

## Layering order (baseline)

Cleanse → treat (serums/actives) → hydrate → protect (SPF AM).

Morning: sunscreen last. Evening: masks/occlusives last when used.

---

## Using this doc

| Future use | Suggestion |
|------------|------------|
| FAQ page | One H2 per section → Q&A bullets under FAQ seeds |
| In-app education | Pull paragraphs into `bodyGuidance.*` message keys |
| Clinician review | Tag sections needing medical sign-off |
| New life-stage toggle | Add row here + `lifeStageToggle.*` + `collectLifeStageGuidance` branch |

## Related docs

- [BODY-AND-CYCLE.md](BODY-AND-CYCLE.md) — settings shape and code map
- [KNOWN-LIMITATIONS.md](KNOWN-LIMITATIONS.md) — what we do not model
- [LOCALIZATION.md](LOCALIZATION.md) — translating guidance strings
