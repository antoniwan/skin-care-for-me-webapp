import { ShieldCheck } from "lucide-react";
import type { Product, Routine } from "@/lib/types";
import type { RoutineShelfExclusion } from "@/lib/routines/verification";
import { verifyRoutine } from "@/lib/routines/verification";
import { Card, CardContent } from "@/components/ui/card";
import { pluralize } from "@/lib/format";

interface RoutinesOverviewProps {
  routines: Routine[];
  products: Product[];
  exclusions: RoutineShelfExclusion[];
}

export function RoutinesOverview({
  routines,
  products,
  exclusions,
}: RoutinesOverviewProps) {
  const verifications = routines.map((routine) =>
    verifyRoutine(routine, products),
  );
  const verifiedCount = verifications.filter((v) => v.allPassed).length;
  const stepCount = routines.reduce((sum, r) => sum + r.steps.length, 0);

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-primary/8 via-card to-card shadow-sm">
      <CardContent className="pt-5">
        <div className="flex items-start gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <ShieldCheck className="size-5" />
          </div>
          <div className="min-w-0 flex-1 space-y-3">
            <div>
              <p className="font-heading text-base font-semibold">
                Built from your shelf, checked three ways
              </p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {routines.length} {pluralize(routines.length, "routine")} ·{" "}
                {stepCount} total steps · {verifiedCount} fully verified
              </p>
            </div>

            <div className="grid gap-2 sm:grid-cols-3">
              <OverviewPill
                title="Order"
                detail="Cleanse → treat → hydrate → protect"
              />
              <OverviewPill
                title="Ingredients"
                detail="Conflicts scanned per routine"
              />
              <OverviewPill
                title="Timing"
                detail="Frequency & AM/PM matched to each product"
              />
            </div>

            {exclusions.length > 0 && (
              <div className="rounded-lg border border-amber-500/30 bg-amber-500/8 px-3 py-2.5">
                <p className="text-sm font-medium text-foreground">
                  {exclusions.length} product
                  {exclusions.length === 1 ? "" : "s"} held off routines
                </p>
                <ul className="mt-1.5 space-y-1">
                  {exclusions.map(({ product, reason, pairedWith }) => (
                    <li
                      key={product.id}
                      className="text-xs leading-relaxed text-muted-foreground"
                    >
                      <span className="font-medium text-foreground">
                        {product.name}
                      </span>{" "}
                      — {reason} Kept with {pairedWith} instead.
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function OverviewPill({ title, detail }: { title: string; detail: string }) {
  return (
    <div className="rounded-lg border border-border/80 bg-card/80 px-3 py-2">
      <p className="text-xs font-semibold uppercase tracking-wide text-primary">
        {title}
      </p>
      <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
        {detail}
      </p>
    </div>
  );
}
