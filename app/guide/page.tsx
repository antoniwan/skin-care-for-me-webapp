"use client";

import { Download } from "lucide-react";
import { useAppDataContext } from "@/components/providers/app-data-provider";
import { RoutineCard } from "@/components/routines/routine-card";
import { InteractionSummaryBar } from "@/components/conflicts/ingredient-interactions";
import { getRoutineWarnings } from "@/lib/routines/generator";
import { Button } from "@/components/ui/button";
import { downloadGuidePdf } from "@/lib/pdf/guide";
import {
  getCurrentCyclePhase,
  getCycleDay,
} from "@/lib/cycle/phases";

export default function GuidePage() {
  const { products, routines, conflicts, settings, loading } =
    useAppDataContext();

  if (loading || !settings) {
    return <p className="text-muted-foreground">Loading guide…</p>;
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
    <div className="space-y-6">
      <header className="space-y-3">
        <div>
          <h1 className="font-heading text-2xl font-semibold">Your guide</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Products, routines, and interaction notes in one place.
          </p>
        </div>
        <Button className="w-full gap-2" size="lg" onClick={handleDownload}>
          <Download className="size-4" />
          Download as PDF
        </Button>
      </header>

      <InteractionSummaryBar conflicts={conflicts} />

      <div className="space-y-4">
        <h2 className="font-heading text-sm font-semibold">All routines</h2>
        {routines.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Add products to generate your guide.
          </p>
        ) : (
          routines.map((routine) => (
            <RoutineCard
              key={routine.id}
              routine={routine}
              warnings={getRoutineWarnings(routine, products)}
            />
          ))
        )}
      </div>
    </div>
  );
}
