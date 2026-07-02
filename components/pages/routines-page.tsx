"use client";

import { useAppDataContext } from "@/components/providers/app-data-provider";
import { RoutineList } from "@/components/routines/routine-list";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { PageLoading } from "@/components/layout/page-loading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { RoutineFrequency } from "@/lib/types";

const FREQUENCIES: RoutineFrequency[] = ["daily", "weekly", "monthly"];

export function RoutinesPage() {
  const { routines, products, loading } = useAppDataContext();

  if (loading) {
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
        <TabsList className="grid w-full grid-cols-3">
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
    </PageContainer>
  );
}
