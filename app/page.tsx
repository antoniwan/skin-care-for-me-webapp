"use client";

import { Sparkles } from "lucide-react";
import { useAppDataContext } from "@/components/providers/app-data-provider";
import { RoutineCard } from "@/components/routines/routine-card";
import { AddProductSheet } from "@/components/products/add-product-sheet";
import { getRoutineWarnings, getTodaysRoutines } from "@/lib/routines/generator";
import {
  CYCLE_PHASE_LABELS,
  CYCLE_SKIN_NOTES,
  getCurrentCyclePhase,
  getCycleDay,
} from "@/lib/cycle/phases";
import { Card, CardContent } from "@/components/ui/card";

export default function HomePage() {
  const { products, routines, settings, loading, addProductFromLookup } =
    useAppDataContext();

  if (loading || !settings) {
    return (
      <div className="flex min-h-[50dvh] items-center justify-center text-muted-foreground">
        Loading your routine…
      </div>
    );
  }

  const phase = getCurrentCyclePhase(settings.cycle);
  const cycleDay = getCycleDay(settings.cycle);
  const todaysRoutines = getTodaysRoutines(routines, settings);

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <p className="text-sm text-muted-foreground">Good {getGreeting()}</p>
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          Today&apos;s skin care
        </h1>
      </header>

      {settings.cycle.enabled && phase !== "none" && (
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="pt-4">
            <p className="text-sm font-medium text-primary">
              {CYCLE_PHASE_LABELS[phase]}
              {cycleDay ? ` · Day ${cycleDay}` : ""}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {CYCLE_SKIN_NOTES[phase]}
            </p>
          </CardContent>
        </Card>
      )}

      {products.length === 0 ? (
        <div className="space-y-4 rounded-2xl border border-dashed p-6 text-center">
          <Sparkles className="mx-auto size-8 text-primary/70" />
          <div>
            <p className="font-heading font-medium">Start your shelf</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Add products you own. Routines and conflict checks update automatically.
            </p>
          </div>
          <AddProductSheet onAdd={addProductFromLookup} />
        </div>
      ) : (
        <>
          {todaysRoutines.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No routines scheduled for today. Check weekly or monthly tabs.
            </p>
          ) : (
            <div className="space-y-4">
              {todaysRoutines.map((routine) => (
                <RoutineCard
                  key={routine.id}
                  routine={routine}
                  warnings={getRoutineWarnings(routine, products)}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "morning";
  if (hour < 17) return "afternoon";
  return "evening";
}
