"use client";

import { useState } from "react";
import { AlertTriangle, ChevronRight } from "lucide-react";
import type { ConflictWarning } from "@/lib/types";
import {
  getOtherProductName,
  highestSeverity,
  sortWarningsBySeverity,
} from "@/lib/conflicts/display";
import { cn } from "@/lib/utils";
import { InteractionDetailsSheet } from "./interaction-details-sheet";
import { getSeverityStyle } from "./severity-styles";

export function StepInteractionHint({
  productId,
  warnings,
}: {
  productId: string;
  warnings: ConflictWarning[];
}) {
  const [open, setOpen] = useState(false);
  const stepWarnings = sortWarningsBySeverity(warnings);
  if (stepWarnings.length === 0) return null;

  const top = stepWarnings[0];
  const severity = highestSeverity(stepWarnings)!;
  const style = getSeverityStyle(severity);
  const otherName = getOtherProductName(top, productId);
  const moreCount = stepWarnings.length - 1;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "mt-2 flex w-full items-center gap-2 rounded-lg border px-2.5 py-1.5 text-left text-xs transition-colors active:scale-[0.99]",
          style.chip,
        )}
      >
        <AlertTriangle className="size-3.5 shrink-0 opacity-80" />
        <span className="min-w-0 flex-1 leading-snug">
          <span className="font-medium">{style.label}</span>
          <span className="text-[11px] opacity-90">
            {" "}
            — {otherName}
            {moreCount > 0 ? ` +${moreCount} more` : ""}
          </span>
        </span>
        <ChevronRight className="size-3.5 shrink-0 opacity-60" />
      </button>
      <InteractionDetailsSheet
        open={open}
        onOpenChange={setOpen}
        conflicts={stepWarnings}
        title="Step interaction"
        description="Notes for this product in today's routine."
      />
    </>
  );
}
