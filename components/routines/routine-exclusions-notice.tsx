"use client";

import type { RoutineShelfExclusion } from "@/lib/routines/verification";
import { useTranslation } from "@/components/providers/locale-provider";
import { localizeExclusionReason } from "@/lib/i18n/ui";

export function RoutineExclusionsNotice({
  exclusions,
}: {
  exclusions: RoutineShelfExclusion[];
}) {
  const { t } = useTranslation();

  if (exclusions.length === 0) return null;

  return (
    <div className="rounded-lg border border-amber-500/30 bg-amber-500/8 px-3 py-2.5">
      <p className="text-sm font-medium text-foreground">
        {exclusions.length === 1
          ? t("exclusions.routine", { count: exclusions.length })
          : t("exclusions.routinePlural", { count: exclusions.length })}
      </p>
      <ul className="mt-1.5 space-y-1">
        {exclusions.map(({ product, reason, pairedWith }) => (
          <li
            key={product.id}
            className="text-xs leading-relaxed text-muted-foreground"
          >
            <span className="font-medium text-foreground">{product.name}</span>{" "}
            {t("exclusions.routineItem", {
              reason: localizeExclusionReason(t, reason),
              name: pairedWith,
            })}
          </li>
        ))}
      </ul>
    </div>
  );
}
