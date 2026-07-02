"use client";

import type { ConflictWarning } from "@/lib/types";
import { sortWarningsBySeverity, warningKey } from "@/lib/conflicts/display";
import { useTranslation } from "@/components/providers/locale-provider";
import { getSeverityLabel } from "@/lib/i18n/ui";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { InteractionDetail } from "./interaction-detail";
import { SeveritySummary } from "./interaction-primitives";

export function InteractionDetailsSheet({
  open,
  onOpenChange,
  conflicts,
  title,
  description,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  conflicts: ConflictWarning[];
  title?: string;
  description?: string;
}) {
  const { t } = useTranslation();
  const sorted = sortWarningsBySeverity(conflicts);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="max-h-[85dvh] gap-0 overflow-hidden rounded-t-2xl p-0"
      >
        <SheetHeader className="border-b border-border/60 px-4 pb-4 pt-4">
          <SheetTitle className="font-heading text-lg">
            {title ?? t("conflicts.defaultTitle")}
          </SheetTitle>
          <SheetDescription>
            {description ?? t("conflicts.defaultDescription")}
          </SheetDescription>
          <SeveritySummary
            warnings={sorted}
            getLabel={(severity) => getSeverityLabel(t, severity)}
            className="pt-2"
          />
        </SheetHeader>
        <div className="space-y-2 overflow-y-auto px-4 py-4">
          {sorted.map((warning) => (
            <InteractionDetail key={warningKey(warning)} warning={warning} />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
