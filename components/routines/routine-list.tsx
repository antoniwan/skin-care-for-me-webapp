import type { Product, Routine } from "@/lib/types";
import { getRoutineWarnings } from "@/lib/routines/generator";
import { RoutineCard } from "@/components/routines/routine-card";

interface RoutineListProps {
  routines: Routine[];
  products: Product[];
  emptyMessage?: string;
}

export function RoutineList({
  routines,
  products,
  emptyMessage,
}: RoutineListProps) {
  if (routines.length === 0) {
    return emptyMessage ? (
      <p className="text-sm text-muted-foreground">{emptyMessage}</p>
    ) : null;
  }

  return (
    <div className="space-y-4">
      {routines.map((routine) => (
        <RoutineCard
          key={routine.id}
          routine={routine}
          warnings={getRoutineWarnings(routine, products)}
        />
      ))}
    </div>
  );
}
