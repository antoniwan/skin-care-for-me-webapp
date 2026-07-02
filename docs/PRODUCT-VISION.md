# Product vision

**Skincare for You** helps people build a routine they can actually follow — with ingredient awareness, optional cycle context, and no account required. Data stays on the device unless the user explicitly looks up a new product.

## Problem

Most skincare apps are either generic routine templates or overwhelming ingredient encyclopedias. People with real product shelves struggle to:

- See what to use **today** (not every product every day)
- Know when actives **should not be layered**
- Adjust gently when their skin or cycle changes
- Keep their list **private** and portable

## North star

> *"Open the app in the morning and know exactly what to apply — with confidence that nothing on your shelf is fighting itself."*

## Target users

| Persona | Goal | How we win |
|---------|------|------------|
| **Routine builder** | Consistent AM/PM habits | Clear Today view, ordered steps, realistic scheduling |
| **Ingredient-conscious** | Avoid bad combinations | Inline warnings, shelf-wide summary, exportable guide |
| **Cycle-aware** | Softer skin on sensitive days | Optional phase tracking without medical claims |
| **Privacy-first** | No account, no cloud by default | Local IndexedDB, optional export, minimal server calls |

## Product principles

1. **Today over taxonomy** — The home screen answers "what now?" before "what do I own?"
2. **Warnings, not walls** — Flag conflicts; let users decide unless severity is `avoid` and auto-removal is justified.
3. **Local by default** — Sync and accounts are opt-in future work, not prerequisites.
4. **Honest scope** — We are not a medical device. Copy and features must say so clearly.
5. **Small shelf, real value** — A user with 5–20 products should feel the app was built for them.

## Success metrics (v0.2+)

Track qualitatively at first; add lightweight analytics only if privacy-preserving and opt-in.

| Metric | Definition | Why it matters |
|--------|------------|----------------|
| **Time-to-first-routine** | Minutes from first open to seeing a non-empty Today | Onboarding + seed shelf quality |
| **Shelf completion** | % users with ≥1 user-added product | Lookup + edit flow works |
| **Conflict awareness** | Users who open interaction details at least once | Rules are discoverable, not scary-noise |
| **Return to Today** | Weekly active opens of home route | Routine view is habit-forming |
| **Data portability** | Export/import used without data loss | Trust for local-only storage |

## Non-goals (for now)

- Telehealth, diagnosis, or prescription management
- Social feeds, reviews marketplace, or affiliate shopping
- Full INCI / concentration / pH modeling
- Mandatory accounts or subscription paywall

## Related docs

- [ROADMAP.md](ROADMAP.md) — phased delivery plan
- [BACKLOG.md](BACKLOG.md) — prioritized work items
- [KNOWN-LIMITATIONS.md](KNOWN-LIMITATIONS.md) — current gaps and caveats
