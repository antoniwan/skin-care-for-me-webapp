export type ProductCategory =
  | "cleanser"
  | "toner"
  | "serum"
  | "moisturizer"
  | "sunscreen"
  | "exfoliant"
  | "mask"
  | "eye_cream"
  | "treatment"
  | "other";

export type RoutineFrequency = "daily" | "weekly" | "monthly";

export type TimeOfDay = "morning" | "evening" | "any";

export interface Product {
  id: string;
  name: string;
  brand?: string;
  category: ProductCategory;
  ingredients: string[];
  usageGuide: string;
  frequency: RoutineFrequency;
  timeOfDay: TimeOfDay;
  activeIngredients: string[];
  notes?: string;
  isSeed?: boolean;
  /** Local path or remote URL for product hero image */
  imageUrl?: string;
  /** Official brand product page */
  manufacturerUrl?: string;
  /** Button label for manufacturerUrl (defaults from hostname) */
  productPageLabel?: string;
  /** Amazon Standard Identification Number for affiliate links */
  amazonAsin?: string;
  size?: string;
  tagline?: string;
  highlights?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductLookupResult {
  name: string;
  brand?: string;
  category: ProductCategory;
  ingredients: string[];
  activeIngredients: string[];
  usageGuide: string;
  suggestedFrequency: RoutineFrequency;
  suggestedTimeOfDay: TimeOfDay;
}
