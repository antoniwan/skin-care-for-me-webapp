import type { Locale } from "@/lib/i18n/locales";
import { en } from "./en";
import { es419 } from "./es-419";
import type { SeedCopyById, SeedProductCopy, SeedProductId } from "./types";

const copyByLocale: Record<Locale, SeedCopyById> = {
  en,
  "es-419": es419,
};

export function getSeedCopy(
  locale: Locale,
  productId: string,
): SeedProductCopy | undefined {
  const catalog = copyByLocale[locale];
  const fallback = copyByLocale.en;
  return (
    catalog[productId as SeedProductId] ??
    fallback[productId as SeedProductId]
  );
}

export function hasSeedCopy(productId: string): productId is SeedProductId {
  return productId in copyByLocale.en;
}
