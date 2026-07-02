"use client";

import { useState } from "react";
import { Info } from "lucide-react";
import type { ConflictWarning } from "@/lib/types";
import { highestSeverity } from "@/lib/conflicts/display";
import { useTranslation } from "@/components/providers/locale-provider";
import { localizeConflictSummary } from "@/lib/i18n/ui";
import { cn } from "@/lib/utils";
import { InteractionDetailsSheet } from "./interaction-details-sheet";
import { InteractionTrigger } from "./interaction-primitives";

export function InteractionSummaryBar({
  conflicts,
  className,
}: {
  conflicts: ConflictWarning[];
  className?: string;
}) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  if (conflicts.length === 0) return null;

  const severity = highestSeverity(conflicts)!;

  return (
    <>
      <InteractionTrigger
        severity={severity}
        icon={Info}
        title={localizeConflictSummary(t, conflicts.length)}
        subtitle={t("conflicts.tapReview")}
        onClick={() => setOpen(true)}
        className={cn(className)}
      />
      <InteractionDetailsSheet
        open={open}
        onOpenChange={setOpen}
        conflicts={conflicts}
        title={t("conflicts.allTitle")}
        description={t("conflicts.allDescription")}
      />
    </>
  );
}
