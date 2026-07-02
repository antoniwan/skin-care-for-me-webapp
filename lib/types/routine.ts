import type { CyclePhase } from "./cycle";
import type { ProductCategory, RoutineFrequency, TimeOfDay } from "./product";

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
