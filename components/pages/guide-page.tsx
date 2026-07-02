"use client";

import { Download } from "lucide-react";
import { useAppDataContext } from "@/components/providers/app-data-provider";
import { InteractionSummaryBar } from "@/components/conflicts";
import { RoutineList } from "@/components/routines/routine-list";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { PageLoading } from "@/components/layout/page-loading";
import { Button } from "@/components/ui/button";
import { downloadGuidePdf } from "@/lib/pdf/guide";
import { getCurrentCyclePhase, getCycleDay } from "@/lib/cycle/phases";

export function GuidePage() {
  const { products, routines, conflicts, settings, loading } =
    useAppDataContext();

  if (loading || !settings) {
    return <PageLoading message="Loading guide…" />;
  }

  const phase = getCurrentCyclePhase(settings.cycle);
  const cycleDay = getCycleDay(settings.cycle);

  function handleDownload() {
    downloadGuidePdf({
      products,
      routines,
      conflicts,
      cyclePhase: phase,
      cycleDay,
    });
  }

  return (
    <PageContainer>
      <PageHeader
        title="Your guide"
        description="Products, routines, and interaction notes in one place."
        action={
          <Button className="w-full gap-2" size="lg" onClick={handleDownload}>
            <Download className="size-4" />
            Download as PDF
          </Button>
        }
      />

      <InteractionSummaryBar conflicts={conflicts} />

      <div className="space-y-4">
        <h2 className="font-heading text-sm font-semibold">All routines</h2>
        <RoutineList
          routines={routines}
          products={products}
          emptyMessage="Add products to generate your guide."
        />
      </div>
    </PageContainer>
  );
}
