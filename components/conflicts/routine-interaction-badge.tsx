"use client";

import { useState } from "react";
import type { ConflictWarning } from "@/lib/types";
import { highestSeverity } from "@/lib/conflicts/display";
import { useTranslation } from "@/components/providers/locale-provider";
import { plural } from "@/lib/i18n/ui";
import { InteractionDetailsSheet } from "./interaction-details-sheet";
import { SeverityBadge } from "./interaction-primitives";

export function RoutineInteractionBadge({
  warnings,
}: {
  warnings: ConflictWarning[];
}) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  if (warnings.length === 0) return null;

  const severity = highestSeverity(warnings)!;
  const label = `${warnings.length} ${plural(
    t,
    warnings.length,
    "common.interaction",
    "common.interactions",
  )}`;

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="rounded-full">
        <SeverityBadge severity={severity} label={label} />
      </button>
      <InteractionDetailsSheet
        open={open}
        onOpenChange={setOpen}
        conflicts={warnings}
        title={t("conflicts.routineTitle")}
        description={t("conflicts.routineDescription")}
      />
    </>
  );
}
