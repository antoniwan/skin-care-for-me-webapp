"use client";

import { Sparkles } from "lucide-react";
import { useAppDataContext } from "@/components/providers/app-data-provider";
import { AddProductSheet } from "@/components/products/add-product-sheet";
import { CyclePhaseBanner } from "@/components/cycle/cycle-phase-banner";
import { EmptyState } from "@/components/layout/empty-state";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { PageLoading } from "@/components/layout/page-loading";
import { RoutineList } from "@/components/routines/routine-list";
import { getTodaysRoutines } from "@/lib/routines/generator";
import { getCurrentCyclePhase, getCycleDay } from "@/lib/cycle/phases";

export default function HomePage() {
  const { products, routines, settings, loading, addProductFromLookup } =
    useAppDataContext();

  if (loading || !settings) {
    return <PageLoading message="Loading your routine…" />;
  }

  const phase = getCurrentCyclePhase(settings.cycle);
  const cycleDay = getCycleDay(settings.cycle);
  const todaysRoutines = getTodaysRoutines(routines, settings);

  return (
    <PageContainer>
      <PageHeader
        eyebrow={`Good ${getGreeting()}`}
        title="Today's skin care"
      />

      {settings.cycle.enabled && (
        <CyclePhaseBanner phase={phase} cycleDay={cycleDay} />
      )}

      {products.length === 0 ? (
        <EmptyState
          icon={Sparkles}
          title="Start your shelf"
          description="Add products you own. Routines and conflict checks update automatically."
        >
          <AddProductSheet onAdd={addProductFromLookup} />
        </EmptyState>
      ) : (
        <RoutineList
          routines={todaysRoutines}
          products={products}
          emptyMessage="No routines scheduled for today. Check weekly or monthly tabs."
        />
      )}
    </PageContainer>
  );
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "morning";
  if (hour < 17) return "afternoon";
  return "evening";
}
