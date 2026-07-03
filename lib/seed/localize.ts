import type { Locale } from "@/lib/i18n/locales";
import type { Product, Routine } from "@/lib/types";
import { getSeedCopy, hasSeedCopy } from "./copy";
import { isSeedProductId } from "./product-ids";

function isSeedProduct(product: Product): boolean {
  return Boolean(product.isSeed) || isSeedProductId(product.id);
}

export function localizeProduct(product: Product, locale: Locale): Product {
  if (!isSeedProduct(product) || !hasSeedCopy(product.id)) {
    return product;
  }

  const copy = getSeedCopy(locale, product.id);
  if (!copy) return product;

  return {
    ...product,
    name: copy.name,
    usageGuide: copy.usageGuide,
    notes: copy.notes,
    tagline: copy.tagline,
    highlights: copy.highlights,
  };
}

export function localizeProducts(
  products: Product[],
  locale: Locale,
): Product[] {
  return products.map((product) => localizeProduct(product, locale));
}

export function localizeRoutines(
  routines: Routine[],
  locale: Locale,
  localizedProducts: Product[],
): Routine[] {
  const byId = new Map(localizedProducts.map((p) => [p.id, p]));

  return routines.map((routine) => ({
    ...routine,
    steps: routine.steps.map((step) => {
      const product = byId.get(step.productId);
      if (!product) return step;

      return {
        ...step,
        productName: product.name,
        instructions: product.usageGuide,
      };
    }),
  }));
}
