export const LOCALES = ["es-419", "en"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "es-419";

export const LOCALE_STORAGE_KEY = "skincare-for-you-locale";

export const LOCALE_LABELS: Record<Locale, string> = {
  "es-419": "Español",
  en: "English",
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export function getHtmlLang(locale: Locale): string {
  return locale === "es-419" ? "es-419" : "en";
}
