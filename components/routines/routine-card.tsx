"use client";

import type { ConflictWarning, Product, Routine } from "@/lib/types";
import { groupWarningsByProduct } from "@/lib/conflicts/display";
import {
  RoutineInteractionBadge,
  StepInteractionHint,
} from "@/components/conflicts";
import { RoutineVerificationPanel } from "@/components/routines/routine-verification-panel";
import { useTranslation } from "@/components/providers/locale-provider";
import { useAppDataContext } from "@/components/providers/app-data-provider";
import {
  formatCategoryLabel,
  formatRoutineSchedule,
  formatRoutineTitle,
  getEnumLabel,
  plural,
} from "@/lib/i18n/ui";
import { verifyRoutine } from "@/lib/routines/verification";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
  const { t } = useTranslation();
  const { settings } = useAppDataContext();
  const byProduct = groupWarningsByProduct(warnings);
  const verification = verifyRoutine(routine, products);

  return (
    <Card className="h-full">
      <CardHeader className="space-y-3 pb-2">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="space-y-1">
            <CardTitle className="font-heading text-base">
              {formatRoutineTitle(t, routine.frequency, routine.timeOfDay)}
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              {formatRoutineSchedule(
                t,
                routine.frequency,
                settings?.routineSchedule,
              )}{" "}·{" "}
              {routine.steps.length}{" "}
              {plural(
                t,
                routine.steps.length,
                "common.step",
                "common.steps",
              )}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <RoutineInteractionBadge warnings={warnings} />
            {routine.cyclePhase && (
              <Badge variant="secondary">
                {getEnumLabel(t, "cyclePhase", routine.cyclePhase)}
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
                  <p className="text-xs text-muted-foreground">
                    {formatCategoryLabel(t, step.category)}
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
