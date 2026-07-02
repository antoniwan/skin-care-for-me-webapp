# Localization

Skincare for You ships with **native UI localization** — not a third-party i18n SaaS. Strings live in the repo; locale is chosen in-app and persisted locally.

## Locales

| Code | Language | Default? |
|------|----------|----------|
| `es-419` | Spanish (Latin America) | Yes |
| `en` | English | |

Configuration: `lib/i18n/locales.ts`

```ts
DEFAULT_LOCALE = "es-419"
LOCALE_STORAGE_KEY = "skincare-for-you-locale"
```

Brand name **Skincare for You** is the same in all locales (`brand.name`).

## Architecture

```
LocaleProvider (components/providers/locale-provider.tsx)
  ├─ reads localStorage on init
  ├─ exposes { locale, setLocale, t }
  ├─ updates document.documentElement.lang
  └─ persists on change

getMessages(locale) → lib/i18n/messages/{en,es-419}.ts
createTranslator(messages) → t("key.path", { param })
```

### Provider tree

```
AppLayoutClient
  └─ LocaleProvider
       └─ AppDataProvider
            └─ AppShell
```

### Using translations in components

```tsx
import { useTranslation } from "@/components/providers/locale-provider";

const { t, locale, setLocale } = useTranslation();
t("pages.home.title");
t("common.removeProduct", { name: product.name });
```

### UI helpers

`lib/i18n/ui.ts` — locale-aware formatting:

- `formatRoutineTitle`, `formatRoutineSchedule`, `formatCategoryLabel`
- `localizeVerification` — safety check panel
- `localizeExclusionReason`, `getSeverityLabel`
- `buildBodyContextHeadline` — banner headline
- `getBodyContextSnapshot(settings, t)` — localized guidance

## Message files

| File | Purpose |
|------|---------|
| `lib/i18n/messages/en.ts` | English catalog (source of key structure) |
| `lib/i18n/messages/es-419.ts` | Spanish (Latin American) |
| `lib/i18n/messages/index.ts` | `getMessages(locale)` |

Keys are nested objects, e.g. `pages.home.title`, `safetyCheck.title`, `enums.category.cleanser`.

Type: `Messages` = deep string map derived from `en.ts` shape.

## Language toggle

`components/layout/language-toggle.tsx`

- Desktop: side nav footer
- Mobile: header next to logo
- Buttons: **Español** / **English**

## What is localized

| Area | Status |
|------|--------|
| Navigation, page titles, empty states | ✅ |
| Body & cycle settings + privacy notice | ✅ |
| Routines, safety check, exclusions | ✅ |
| Ingredient interaction UI (labels) | ✅ |
| Product add sheet, badges, affiliate copy | ✅ |
| Error/loading strings (client) | ✅ |

## What is not localized

| Content | Location | Notes |
|---------|----------|-------|
| Seed product usage guides | `lib/seed/` | English product copy |
| Conflict rule reason/guidance | `lib/rules/ingredient-conflicts.ts` | English; severity labels localized |
| PDF export body | `lib/pdf/guide.ts` | English |
| Page `<meta description>` | `lib/constants/metadata.ts` | English only |
| OpenAI lookup responses | Server | Language of query-dependent |

## HTML `lang`

- Server render: `<html lang="es-419">` in `app/layout.tsx` (`suppressHydrationWarning`)
- Client: `LocaleProvider` sets `document.documentElement.lang` to `es-419` or `en`

## Adding a new string

1. Add key to `lib/i18n/messages/en.ts`
2. Add translation to `lib/i18n/messages/es-419.ts`
3. Use `t("your.key")` in the component
4. For enum values, prefer `enums.{group}.{value}` pattern

## Adding a new locale

1. Add code to `LOCALES` in `lib/i18n/locales.ts`
2. Create `lib/i18n/messages/{code}.ts` satisfying `Messages` type
3. Register in `messages/index.ts`
4. Add label to `LOCALE_LABELS` and `language.*` message keys
5. Add toggle button in `LanguageToggle`

## Related docs

- [ARCHITECTURE.md](ARCHITECTURE.md) — app shell and provider tree
- [DATA-AND-STORAGE.md](DATA-AND-STORAGE.md) — locale vs IndexedDB
- [PRODUCTION-TRACKER.md](PRODUCTION-TRACKER.md) — i18n checklist items P-100–P-105
