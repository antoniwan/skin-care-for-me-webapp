import type { SEED_PRODUCT_IDS } from "../product-ids";

export type SeedProductId =
  (typeof SEED_PRODUCT_IDS)[keyof typeof SEED_PRODUCT_IDS];

export interface SeedProductCopy {
  name: string;
  usageGuide: string;
  notes: string;
  tagline: string;
  highlights: string[];
}

export type SeedCopyById = Record<SeedProductId, SeedProductCopy>;
