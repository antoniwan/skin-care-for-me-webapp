"use client";

import { useState } from "react";
import { ChevronRight, Info } from "lucide-react";
import type { ConflictWarning } from "@/lib/types";
import { highestSeverity } from "@/lib/conflicts/display";
import { cn } from "@/lib/utils";
import { InteractionDetailsSheet } from "./interaction-details-sheet";
import { getSeverityStyle } from "./severity-styles";

export function InteractionSummaryBar({
  conflicts,
  className,
}: {
  conflicts: ConflictWarning[];
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  if (conflicts.length === 0) return null;

  const severity = highestSeverity(conflicts)!;
  const style = getSeverityStyle(severity);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-colors active:scale-[0.99]",
          style.chip,
          className,
        )}
      >
        <Info className="size-4 shrink-0 opacity-80" />
        <span className="min-w-0 flex-1 text-sm">
          <span className="font-medium">
            {conflicts.length} ingredient interaction
            {conflicts.length === 1 ? "" : "s"}
          </span>
          <span className="block text-xs opacity-80">Tap to review all notes</span>
        </span>
        <ChevronRight className="size-4 shrink-0 opacity-60" />
      </button>
      <InteractionDetailsSheet
        open={open}
        onOpenChange={setOpen}
        conflicts={conflicts}
        title="All ingredient interactions"
        description="Across your full product shelf."
      />
    </>
  );
}
