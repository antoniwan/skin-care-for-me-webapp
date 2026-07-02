"use client";

import type { ConflictWarning } from "@/lib/types";
import { sortWarningsBySeverity, warningKey } from "@/lib/conflicts/display";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { InteractionDetail } from "./interaction-detail";

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
