"use client";

import { useState } from "react";
import { AlertTriangle, ChevronRight, Info } from "lucide-react";
import type { ConflictWarning } from "@/lib/types";
import {
  getOtherProductName,
  groupWarningsByProduct,
  highestSeverity,
  sortWarningsBySeverity,
  warningKey,
} from "@/lib/conflicts/display";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const SEVERITY_STYLES = {
  avoid: {
    chip: "border-destructive/25 bg-destructive/10 text-destructive",
    dot: "bg-destructive",
    label: "Avoid layering",
  },
  caution: {
    chip: "border-amber-500/30 bg-amber-500/10 text-amber-900",
    dot: "bg-amber-500",
    label: "Use with care",
  },
  separate: {
    chip: "border-border bg-muted/60 text-muted-foreground",
    dot: "bg-muted-foreground",
    label: "Separate timing",
  },
} as const;

function SeverityDot({
  severity,
}: {
  severity: ConflictWarning["conflict"]["severity"];
}) {
  return (
    <span
      className={cn("size-1.5 shrink-0 rounded-full", SEVERITY_STYLES[severity].dot)}
      aria-hidden
    />
  );
}

function InteractionDetail({ warning }: { warning: ConflictWarning }) {
  const style = SEVERITY_STYLES[warning.conflict.severity];

  return (
    <div className="space-y-2 rounded-xl border bg-card p-3">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="outline" className={cn("text-[10px] capitalize", style.chip)}>
          {warning.conflict.severity}
        </Badge>
        <span className="text-sm font-medium leading-snug">
          {warning.productA.name}
          <span className="font-normal text-muted-foreground"> + </span>
          {warning.productB.name}
        </span>
      </div>
      <p className="text-xs text-muted-foreground">{warning.conflict.reason}</p>
      <p className="text-xs leading-relaxed">{warning.conflict.guidance}</p>
    </div>
  );
}

export function InteractionDetailsSheet({
  open,
  onOpenChange,
  conflicts,
  title = "Ingredient interactions",
  description = "How these products interact when used in the same routine.",
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  conflicts: ConflictWarning[];
  title?: string;
  description?: string;
}) {
  const sorted = sortWarningsBySeverity(conflicts);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="max-h-[75dvh] overflow-y-auto rounded-t-2xl">
        <SheetHeader>
          <SheetTitle className="font-heading">{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        <div className="mt-4 space-y-3">
          {sorted.map((warning) => (
            <InteractionDetail key={warningKey(warning)} warning={warning} />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}

/** Compact chip on a routine step — tap for full detail. */
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
  const style = SEVERITY_STYLES[severity];
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

/** One-line summary in a routine card header. */
export function RoutineInteractionBadge({
  warnings,
}: {
  warnings: ConflictWarning[];
}) {
  const [open, setOpen] = useState(false);
  if (warnings.length === 0) return null;

  const severity = highestSeverity(warnings)!;
  const style = SEVERITY_STYLES[severity];

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

/** Shelf-wide compact bar — for Guide or Products, not Today. */
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
  const style = SEVERITY_STYLES[severity];

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

export { groupWarningsByProduct };
