"use client";

import { useAppDataContext } from "@/components/providers/app-data-provider";
import { RoutineGuideSection } from "@/components/routines/routine-guide-section";
import { RoutineList } from "@/components/routines/routine-list";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { PageLoading } from "@/components/layout/page-loading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getCurrentCyclePhase, getCycleDay } from "@/lib/cycle/phases";
import type { RoutineFrequency } from "@/lib/types";

const FREQUENCIES: RoutineFrequency[] = ["daily", "weekly", "monthly"];

export function RoutinesPage() {
  const { routines, products, conflicts, settings, loading } = useAppDataContext();

  if (loading || !settings) {
    return <PageLoading message="Loading routines…" />;
  }

  if (products.length === 0) {
    return (
      <PageContainer>
        <PageHeader
          title="Routines"
          description="Add products first — your daily, weekly, and monthly routines will appear here."
        />
      </PageContainer>
    );
  }

  const phase = getCurrentCyclePhase(settings.cycle);
  const cycleDay = getCycleDay(settings.cycle);

  const byFrequency = Object.fromEntries(
    FREQUENCIES.map((freq) => [
      freq,
      routines.filter((r) => r.frequency === freq),
    ]),
  ) as Record<RoutineFrequency, typeof routines>;

  return (
    <PageContainer>
      <PageHeader
        title="Routines"
        description="Auto-generated from your shelf. Updates when you add or remove products."
      />

      <Tabs defaultValue="daily">
        <TabsList className="grid w-full grid-cols-3 lg:max-w-md">
          {FREQUENCIES.map((freq) => (
            <TabsTrigger key={freq} value={freq} className="capitalize">
              {freq}
            </TabsTrigger>
          ))}
        </TabsList>
        {FREQUENCIES.map((freq) => (
          <TabsContent key={freq} value={freq} className="mt-4">
            <RoutineList
              routines={byFrequency[freq]}
              products={products}
              emptyMessage={`No ${freq} products yet.`}
            />
          </TabsContent>
        ))}
      </Tabs>

      <RoutineGuideSection
        products={products}
        routines={routines}
        conflicts={conflicts}
        cyclePhase={phase}
        cycleDay={cycleDay}
      />
    </PageContainer>
  );
}
