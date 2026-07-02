"use client";

import { useState } from "react";
import type { ConflictWarning } from "@/lib/types";
import { highestSeverity } from "@/lib/conflicts/display";
import { cn } from "@/lib/utils";
import { InteractionDetailsSheet } from "./interaction-details-sheet";
import { getSeverityStyle, SEVERITY_STYLES } from "./severity-styles";

function SeverityDot({
  severity,
}: {
  severity: keyof typeof SEVERITY_STYLES;
}) {
  return (
    <span
      className={cn("size-1.5 shrink-0 rounded-full", SEVERITY_STYLES[severity].dot)}
      aria-hidden
    />
  );
}

export function RoutineInteractionBadge({
  warnings,
}: {
  warnings: ConflictWarning[];
}) {
  const [open, setOpen] = useState(false);
  if (warnings.length === 0) return null;

  const severity = highestSeverity(warnings)!;
  const style = getSeverityStyle(severity);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium transition-colors",
          style.chip,
        )}
      >
        <SeverityDot severity={severity} />
        {warnings.length} interaction{warnings.length === 1 ? "" : "s"}
      </button>
      <InteractionDetailsSheet
        open={open}
        onOpenChange={setOpen}
        conflicts={warnings}
        title="Routine interactions"
        description="Products in this routine that may conflict."
      />
    </>
  );
}
