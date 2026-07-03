"use client";

import type { ConflictWarning } from "@/lib/types";
import { useTranslation } from "@/components/providers/locale-provider";
import { getSeverityLabel, localizeConflictRule } from "@/lib/i18n/ui";
import { cn } from "@/lib/utils";
import { SeverityBadge } from "./interaction-primitives";
import { getSeverityStyle } from "./severity-styles";

export function InteractionDetail({ warning }: { warning: ConflictWarning }) {
  const { t } = useTranslation();
  const { conflict, productA, productB } = warning;
  const style = getSeverityStyle(conflict.severity);
  const localized = localizeConflictRule(t, conflict);

  return (
    <article
      className={cn(
        "flex overflow-hidden rounded-xl",
        style.surface,
      )}
    >
      <div className={cn("w-1 shrink-0", style.accent)} aria-hidden />
      <div className="min-w-0 flex-1 space-y-3 p-3.5 sm:p-4">
        <div className="space-y-2">
          <SeverityBadge
            severity={conflict.severity}
            label={getSeverityLabel(t, conflict.severity)}
          />
          <div className="space-y-1">
            <p className="text-sm font-semibold leading-snug text-foreground">
              <span>{productA.name}</span>
              <span className="mx-1.5 font-normal text-muted-foreground">
                +
              </span>
              <span>{productB.name}</span>
            </p>
            <p className="text-xs text-muted-foreground">
              <span className="font-medium text-foreground/80">
                {t("conflicts.ingredients")}:
              </span>{" "}
              <span className="capitalize">{conflict.ingredientA}</span>
              <span className="text-muted-foreground/70"> · </span>
              <span className="capitalize">{conflict.ingredientB}</span>
            </p>
          </div>
        </div>

        <div className="space-y-3 border-t border-foreground/8 pt-3">
          <div className="space-y-1">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              {t("conflicts.why")}
            </p>
            <p className="text-sm leading-relaxed text-foreground/90">
              {localized.reason}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              {t("conflicts.whatToDo")}
            </p>
            <p className="text-sm leading-relaxed text-foreground">
              {localized.guidance}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
