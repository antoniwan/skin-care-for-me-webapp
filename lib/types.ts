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

export type CyclePhase =
  | "menstrual"
  | "follicular"
  | "ovulation"
  | "luteal"
  | "none";

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
  createdAt: string;
  updatedAt: string;
}

export interface CycleSettings {
  enabled: boolean;
  cycleLength: number;
  periodLength: number;
  lastPeriodStart: string | null;
}

export interface RoutineStep {
  productId: string;
  productName: string;
  category: ProductCategory;
  instructions: string;
  order: number;
}

export interface Routine {
  id: string;
  frequency: RoutineFrequency;
  timeOfDay: TimeOfDay;
  steps: RoutineStep[];
  cyclePhase?: CyclePhase;
  generatedAt: string;
}

export interface IngredientConflict {
  ingredientA: string;
  ingredientB: string;
  severity: "avoid" | "caution" | "separate";
  reason: string;
  guidance: string;
}

export interface ConflictWarning {
  productA: Product;
  productB: Product;
  conflict: IngredientConflict;
}

export interface AppSettings {
  cycle: CycleSettings;
  onboardingComplete: boolean;
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
