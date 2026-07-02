import type { Product, Routine } from "@/lib/types";
import { getRoutineWarnings } from "@/lib/routines/generator";
import { RoutineCard } from "@/components/routines/routine-card";

interface RoutineListProps {
  routines: Routine[];
  products: Product[];
  emptyMessage?: string;
  detailed?: boolean;
}

export function RoutineList({
  routines,
  products,
  emptyMessage,
  detailed = false,
}: RoutineListProps) {
  if (routines.length === 0) {
    return emptyMessage ? (
      <p className="text-sm text-muted-foreground">{emptyMessage}</p>
    ) : null;
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {routines.map((routine) => (
        <RoutineCard
          key={routine.id}
          routine={routine}
          products={products}
          warnings={getRoutineWarnings(routine, products)}
          detailed={detailed}
        />
      ))}
    </div>
  );
}
