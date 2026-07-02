# Known limitations

This is an audit of the project as of v0.1. It lists what is rough, missing, or wrong on purpose. Use this before trusting the app for real skin care decisions.

## Medical and safety

- **Not medical advice.** Conflict rules are a small curated list, not a complete interaction database.
- **AI lookup can be wrong.** Without verification, ingredient lists from OpenAI or the mock fallback may be inaccurate.
- **Cycle logic is simplified.** Phase boundaries use fixed percentages of cycle length, not individual health data.
- **No patch testing, allergy, or pregnancy modes.**

## Features missing

| Feature | Status |
|---------|--------|
| Edit product after add | Not built |
| Barcode / photo scan | Not built |
| User accounts / sync | Not built |
| JSON backup / restore | Not built |
| Onboarding flow | `onboardingComplete` exists in types but no UI uses it |
| Push reminders | Not built |
| PWA / offline install | Not built |
| Automated tests | None |
| CI pipeline | None |

## Scheduling quirks

- **Weekly routines** only appear on **Sundays** (`getDay() === 0`).
- **Monthly routines** only appear on the **1st** of each month.
- There is no UI to pick “weekly on Wednesday” or similar.
- Products marked `weekly` with `timeOfDay: evening` still only show on Sunday evening, not on whatever day you actually use them.

## Routine generation

- Category order is fixed. The app does not know your personal preferences (e.g. oil before cream debates).
- `separateConflictingProducts` only auto-removes `avoid`-severity pairs. `caution` and `separate` products stay in the same routine; you only get UI warnings.
- When removing a product from an `avoid` pair, sunscreen is always kept if one side is sunscreen — arbitrary but intentional.
- Cycle phase filtering only downgrades **daily** harsh actives during menstrual/luteal. It does not remove them from weekly routines.
- Multiple moisturizers (e.g. DDML + Moisture Surge) can all appear in the same routine — no deduplication.

## Ingredient conflicts

- ~10 rules in `lib/rules/ingredient-conflicts.ts`.
- Matching uses substring alias normalization — false positives and false negatives are possible.
- Warnings on Today/Routines only show when **both** products are in the **same** routine bucket. Conflicts across different times/frequencies are hidden there (visible on Guide + PDF).
- No concentration or pH awareness (e.g. low-dose vs prescription strength).

## Product lookup

- **Without `OPENAI_API_KEY`:** mock data only. Good for dev, not for real product info.
- **With API key:** one-shot GPT-4o-mini call per lookup. No caching on server. Costs money per lookup.
- Lookup results cannot be corrected in the UI without deleting and re-adding.

## Storage

- Data is per-browser, per-origin. Clearing site data loses user-added products (seeds come back).
- Seed products are re-upserted every load — you cannot permanently remove them.
- No encryption at rest beyond what the browser provides.
- Routines are derived on each read, not stored in IndexedDB during normal use.

## UI / UX

- Mobile-first layout; desktop is a narrow column by design.
- No dark mode toggle (CSS has `.dark` tokens but nothing switches them).
- PDF uses Helvetica, not app fonts. Layout is plain text.
- No loading/error boundaries for failed IndexedDB or API errors beyond generic messages.
- Add-product sheet has no cancel confirmation if you already fetched a preview.

## Code quality (audit notes)

- **Both `package-lock.json` and `pnpm-lock.yaml`** exist — pick one package manager for team consistency.
- **`graphify-out/`** is generated architecture tooling output; not required to run the app.
- **Dependencies:** `shadcn` is listed as a runtime dependency though it is normally a dev CLI only.

## Default seed shelf

The 9 seed products create many real conflicts (multiple exfoliants, vitamin C sources, etc.). That is useful for testing warnings but can make first launch look alarming. This is expected with the current demo data.

## Deployment notes

- Standard Next.js deploy (e.g. Vercel). Set `OPENAI_API_KEY` in environment variables for production lookups.
- IndexedDB does not exist on the server — all DB code runs client-side only. SSR pages do not preload user data.

## Suggested next work (not committed)

If you continue development, these would address the biggest gaps:

1. Let users edit frequency, time of day, and ingredients on existing products.
2. Configurable weekly day (or “every N days”).
3. Expand or externalize conflict rules.
4. JSON export/import for backup.
5. Either remove unused `onboardingComplete` or build onboarding.
