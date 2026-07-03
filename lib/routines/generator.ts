import type {
  AppSettings,
  CyclePhase,
  Product,
  Routine,
  RoutineFrequency,
  RoutineStep,
  TimeOfDay,
} from "../types";
import {
  getBodyContextCore,
  shouldIncludeProductInRoutine,
} from "../body-context";
import {
  isMonthlyRoutineDay,
  isWeeklyRoutineDay,
  normalizeRoutineSchedule,
} from "../schedule";
import { finalizeRoutineProductOrder } from "./category-order";
import { detectConflicts, getConflictsForRoutine } from "../rules/ingredient-conflicts";

function matchesTime(product: Product, time: TimeOfDay): boolean {
  return product.timeOfDay === "any" || product.timeOfDay === time;
}

function buildSteps(products: Product[], timeOfDay: TimeOfDay): RoutineStep[] {
  return finalizeRoutineProductOrder(products, timeOfDay).map(
    (product, index) => ({
      productId: product.id,
      productName: product.name,
      category: product.category,
      instructions: product.usageGuide,
      order: index + 1,
    }),
  );
}

function buildRoutine(
  frequency: RoutineFrequency,
  timeOfDay: TimeOfDay,
  products: Product[],
  cyclePhase: CyclePhase,
): Routine | null {
  const filtered = products.filter(
    (p) => p.frequency === frequency && matchesTime(p, timeOfDay),
  );

  if (filtered.length === 0) return null;

  return {
    id: `${frequency}-${timeOfDay}-${cyclePhase}`,
    frequency,
    timeOfDay,
    steps: buildSteps(filtered, timeOfDay),
    cyclePhase: cyclePhase !== "none" ? cyclePhase : undefined,
    generatedAt: new Date().toISOString(),
  };
}

function separateConflictingProducts(products: Product[]): Product[] {
  const warnings = detectConflicts(products);
  if (warnings.length === 0) return products;

  const avoidPairs = warnings.filter((w) => w.conflict.severity === "avoid");
  const removed = new Set<string>();

  for (const warning of avoidPairs) {
    const keepA = warning.productA.category === "sunscreen";
    const target = keepA ? warning.productB.id : warning.productA.id;
    removed.add(target);
  }

  return products.filter((p) => !removed.has(p.id));
}

function applyBodyContextFilter(
  products: Product[],
  settings: AppSettings,
): Product[] {
  const snapshot = getBodyContextCore(settings.bodyContext);
  if (!snapshot.enabled) return products;

  return products.filter((product) =>
    shouldIncludeProductInRoutine(product, snapshot),
  );
}

export function generateRoutines(
  products: Product[],
  settings: AppSettings,
): Routine[] {
  const snapshot = getBodyContextCore(settings.bodyContext);
  const safeProducts = separateConflictingProducts(products);
  const contextualProducts = applyBodyContextFilter(safeProducts, settings);
  const routines: Routine[] = [];

  const frequencies: RoutineFrequency[] = ["daily", "weekly", "monthly"];
  const times: TimeOfDay[] = ["morning", "evening"];

  for (const frequency of frequencies) {
    for (const time of times) {
      const routine = buildRoutine(
        frequency,
        time,
        contextualProducts,
        snapshot.cyclePhase,
      );
      if (routine) routines.push(routine);
    }
  }

  return routines;
}

export function getRoutineWarnings(
  routine: Routine,
  products: Product[],
) {
  const stepProducts = routine.steps
    .map((s) => products.find((p) => p.id === s.productId))
    .filter((p): p is Product => Boolean(p));

  const allWarnings = detectConflicts(products);
  return getConflictsForRoutine(stepProducts, allWarnings);
}

export function getTodaysRoutines(
  routines: Routine[],
  settings: AppSettings,
  date = new Date(),
): Routine[] {
  const snapshot = getBodyContextCore(settings.bodyContext);
  const schedule = normalizeRoutineSchedule(settings.routineSchedule);
  const dayOfMonth = date.getDate();
  const dayOfWeek = date.getDay();

  return routines
    .filter((r) => {
      if (r.frequency === "daily") return true;
      if (r.frequency === "weekly") {
        return isWeeklyRoutineDay(dayOfWeek, schedule);
      }
      if (r.frequency === "monthly") {
        return isMonthlyRoutineDay(dayOfMonth, schedule);
      }
      return false;
    })
    .filter(
      (r) =>
        !r.cyclePhase ||
        r.cyclePhase === snapshot.cyclePhase ||
        r.cyclePhase === "none",
    );
}
