"use client";

import { useAppDataContext } from "@/components/providers/app-data-provider";
import { RoutineGuideSection } from "@/components/routines/routine-guide-section";
import { RoutineList } from "@/components/routines/routine-list";
import { RoutinesOverview } from "@/components/routines/routines-overview";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { PageLoading } from "@/components/layout/page-loading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getCurrentCyclePhase, getCycleDay } from "@/lib/cycle/phases";
import { getRoutineShelfExclusions } from "@/lib/routines/verification";
import { pluralize } from "@/lib/format";
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
  const exclusions = getRoutineShelfExclusions(products, conflicts);

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
        description="Layering order, ingredient safety, and timing — verified for every routine on your shelf."
      />

      <RoutinesOverview
        routines={routines}
        products={products}
        exclusions={exclusions}
      />

      <Tabs defaultValue="daily">
        <TabsList className="grid w-full grid-cols-3 lg:max-w-md">
          {FREQUENCIES.map((freq) => {
            const count = byFrequency[freq].length;
            return (
              <TabsTrigger key={freq} value={freq} className="capitalize">
                {freq}
                {count > 0 ? ` (${count})` : ""}
              </TabsTrigger>
            );
          })}
        </TabsList>
        {FREQUENCIES.map((freq) => (
          <TabsContent key={freq} value={freq} className="mt-4 space-y-3">
            {byFrequency[freq].length > 0 && (
              <p className="text-sm text-muted-foreground">
                {byFrequency[freq].length}{" "}
                {pluralize(byFrequency[freq].length, "routine")} ·{" "}
                {freq === "daily"
                  ? "use every day"
                  : freq === "weekly"
                    ? "scheduled Sundays"
                    : "scheduled on the 1st"}
              </p>
            )}
            <RoutineList
              routines={byFrequency[freq]}
              products={products}
              detailed
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
