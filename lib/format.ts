import type { ProductCategory, RoutineFrequency, TimeOfDay } from "@/lib/types";

export function formatCategory(category: ProductCategory): string {
  return category.replace("_", " ");
}

export function formatFrequency(frequency: RoutineFrequency): string {
  return frequency;
}

export function formatTimeOfDay(timeOfDay: TimeOfDay): string {
  return timeOfDay;
}

export function pluralize(
  count: number,
  singular: string,
  plural = `${singular}s`,
): string {
  return count === 1 ? singular : plural;
}
