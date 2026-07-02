# Product vision

**Skincare for You** helps people build a routine they can actually follow — with ingredient awareness, optional body context, and no account required. Data stays on the device unless the user explicitly looks up a new product.

## Problem

Most skincare apps are either generic routine templates or overwhelming ingredient encyclopedias. People with real product shelves struggle to:

- See what to use **today** (not every product every day)
- Know when actives **should not be layered**
- Adjust gently when their skin, cycle, or life stage changes
- Keep their list **private** and portable

## North star

> *"Open the app in the morning and know exactly what to apply — with confidence that nothing on your shelf is fighting itself."*

## Target users

| Persona | Goal | How we win |
|---------|------|------------|
| **Routine builder** | Consistent AM/PM habits | Clear Today view, ordered steps, safety check |
| **Ingredient-conscious** | Avoid bad combinations | Inline warnings, guide summary, exportable PDF |
| **Body-aware** | Softer care on sensitive days | Optional menstrual, life-stage, weight context — local only |
| **Privacy-first** | No account, no cloud by default | IndexedDB + minimal server calls |
| **Spanish-first (LATAM)** | App in their language | `es-419` default; English toggle |

## Product principles

1. **Today over taxonomy** — Home answers "what now?" before "what do I own?"
2. **Warnings, not walls** — Flag conflicts; auto-remove only for `avoid` when justified.
3. **Local by default** — Sync and accounts are future opt-in work.
4. **Honest scope** — Not a medical device. Copy must say so clearly.
5. **Small shelf, real value** — Built for 5–20 products, not infinite catalogs.

## Success metrics (v0.2+)

Track qualitatively first; analytics only if privacy-preserving and opt-in.

| Metric | Definition | Why it matters |
|--------|------------|----------------|
| **Time-to-first-routine** | Minutes to non-empty Today | Onboarding + seed shelf |
| **Shelf completion** | Users with ≥1 added product | Lookup flow works |
| **Conflict awareness** | Open interaction details once | Rules are discoverable |
| **Return to Today** | Weekly home opens | Habit-forming |
| **Data portability** | Export/import without loss | Trust for local-only storage |

## Non-goals (for now)

- Telehealth, diagnosis, or prescriptions
- Social feeds or review marketplace
- Full INCI / concentration / pH modeling
- Mandatory accounts or paywall

## Related docs

- [ROADMAP.md](ROADMAP.md) — phased delivery
- [BACKLOG.md](BACKLOG.md) — prioritized work items
- [KNOWN-LIMITATIONS.md](KNOWN-LIMITATIONS.md) — current gaps
- [PRODUCTION-TRACKER.md](PRODUCTION-TRACKER.md) — launch checklist
