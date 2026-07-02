"use client";

import type { ConflictWarning, Product, Routine } from "@/lib/types";
import { formatCategory } from "@/lib/format";
import { groupWarningsByProduct } from "@/lib/conflicts/display";
import {
  RoutineInteractionBadge,
  StepInteractionHint,
} from "@/components/conflicts";
import { RoutineVerificationPanel } from "@/components/routines/routine-verification-panel";
import {
  formatRoutineSchedule,
  formatRoutineTitle,
  verifyRoutine,
} from "@/lib/routines/verification";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";

interface RoutineCardProps {
  routine: Routine;
  products: Product[];
  warnings?: ConflictWarning[];
  detailed?: boolean;
}

export function RoutineCard({
  routine,
  products,
  warnings = [],
  detailed = false,
}: RoutineCardProps) {
  const byProduct = groupWarningsByProduct(warnings);
  const verification = verifyRoutine(routine, products);

  return (
    <Card className="h-full">
      <CardHeader className="space-y-3 pb-2">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="space-y-1">
            <CardTitle className="font-heading text-base">
              {formatRoutineTitle(routine.frequency, routine.timeOfDay)}
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              {formatRoutineSchedule(routine.frequency)} · {routine.steps.length}{" "}
              {routine.steps.length === 1 ? "step" : "steps"}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {verification.allPassed && (
              <Badge className="gap-1 border-transparent bg-primary text-primary-foreground">
                <CheckCircle2 className="size-3" />
                All clear
              </Badge>
            )}
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
        {detailed && <RoutineVerificationPanel verification={verification} />}

        <ol className="space-y-4">
          {routine.steps.map((step) => {
            const stepWarnings = byProduct.get(step.productId) ?? [];
            return (
              <li key={step.productId} className="flex gap-3">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground shadow-sm">
                  {step.order}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">{step.productName}</p>
                  <p className="text-xs capitalize text-muted-foreground">
                    {formatCategory(step.category)}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {step.instructions}
                  </p>
                  <StepInteractionHint
                    productId={step.productId}
                    warnings={stepWarnings}
                  />
                </div>
              </li>
            );
          })}
        </ol>
      </CardContent>
    </Card>
  );
}
