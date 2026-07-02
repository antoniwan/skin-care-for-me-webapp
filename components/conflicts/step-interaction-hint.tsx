"use client";

import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import type { ConflictWarning } from "@/lib/types";
import {
  getOtherProductName,
  highestSeverity,
  sortWarningsBySeverity,
} from "@/lib/conflicts/display";
import { useTranslation } from "@/components/providers/locale-provider";
import { getSeverityLabel } from "@/lib/i18n/ui";
import { InteractionDetailsSheet } from "./interaction-details-sheet";
import { InteractionTrigger } from "./interaction-primitives";

export function StepInteractionHint({
  productId,
  warnings,
}: {
  productId: string;
  warnings: ConflictWarning[];
}) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const stepWarnings = sortWarningsBySeverity(warnings);
  if (stepWarnings.length === 0) return null;

  const top = stepWarnings[0];
  const severity = highestSeverity(stepWarnings)!;
  const otherName = getOtherProductName(top, productId);
  const moreCount = stepWarnings.length - 1;
  const subtitle =
    moreCount > 0
      ? `${otherName} · ${t("conflicts.more", { count: moreCount })}`
      : otherName;

  return (
    <>
      <InteractionTrigger
        severity={severity}
        icon={AlertTriangle}
        title={getSeverityLabel(t, severity)}
        subtitle={subtitle}
        onClick={() => setOpen(true)}
        className="mt-2"
        compact
      />
      <InteractionDetailsSheet
        open={open}
        onOpenChange={setOpen}
        conflicts={stepWarnings}
        title={t("conflicts.stepTitle")}
        description={t("conflicts.stepDescription")}
      />
    </>
  );
}
