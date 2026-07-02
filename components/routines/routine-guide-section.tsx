"use client";

import { Download } from "lucide-react";
import { InteractionSummaryBar } from "@/components/conflicts";
import { useTranslation } from "@/components/providers/locale-provider";
import { Button } from "@/components/ui/button";
import { downloadGuidePdf } from "@/lib/pdf/guide";
import type { ConflictWarning, CyclePhase, Product, Routine } from "@/lib/types";

interface RoutineGuideSectionProps {
  products: Product[];
  routines: Routine[];
  conflicts: ConflictWarning[];
  cyclePhase: CyclePhase;
  cycleDay: number | null;
  bodyContextNotes?: string[];
}

export function RoutineGuideSection({
  products,
  routines,
  conflicts,
  cyclePhase,
  cycleDay,
  bodyContextNotes = [],
}: RoutineGuideSectionProps) {
  const { t } = useTranslation();

  function handleDownload() {
    downloadGuidePdf({
      products,
      routines,
      conflicts,
      cyclePhase,
      cycleDay,
      bodyContextNotes,
    });
  }

  return (
    <section id="guide" className="scroll-mt-6 space-y-4 border-t border-border pt-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-heading text-lg font-semibold tracking-tight">
            {t("guide.title")}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {t("guide.description")}
          </p>
        </div>
        <Button
          className="w-full shrink-0 gap-2 sm:w-auto"
          size="lg"
          onClick={handleDownload}
        >
          <Download className="size-4" />
          {t("common.downloadPdf")}
        </Button>
      </div>

      <InteractionSummaryBar conflicts={conflicts} />
    </section>
  );
}
