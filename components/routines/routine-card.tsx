"use client";

import type { ConflictWarning, Routine } from "@/lib/types";
import { formatCategory } from "@/lib/format";
import { groupWarningsByProduct } from "@/lib/conflicts/display";
import {
  RoutineInteractionBadge,
  StepInteractionHint,
} from "@/components/conflicts/ingredient-interactions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface RoutineCardProps {
  routine: Routine;
  warnings?: ConflictWarning[];
}

export function RoutineCard({ routine, warnings = [] }: RoutineCardProps) {
  const byProduct = groupWarningsByProduct(warnings);

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <CardTitle className="font-heading text-base capitalize">
            {routine.frequency} · {routine.timeOfDay}
          </CardTitle>
          <div className="flex flex-wrap items-center gap-2">
            <RoutineInteractionBadge warnings={warnings} />
            {routine.cyclePhase && (
              <Badge variant="secondary" className="capitalize">
                {routine.cyclePhase}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {routine.steps.map((step) => {
          const stepWarnings = byProduct.get(step.productId) ?? [];
          return (
            <div key={step.productId} className="flex gap-3">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                {step.order}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">{step.productName}</p>
                <p className="text-xs capitalize text-muted-foreground">
                  {formatCategory(step.category)}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {step.instructions}
                </p>
                <StepInteractionHint
                  productId={step.productId}
                  warnings={stepWarnings}
                />
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
