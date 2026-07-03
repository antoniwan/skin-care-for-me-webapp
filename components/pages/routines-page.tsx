"use client";

import { useAppDataContext } from "@/components/providers/app-data-provider";
import { useTranslation } from "@/components/providers/locale-provider";
import { RoutineExclusionsNotice } from "@/components/routines/routine-exclusions-notice";
import { RoutineGuideSection } from "@/components/routines/routine-guide-section";
import { RoutineList } from "@/components/routines/routine-list";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { PageLoading } from "@/components/layout/page-loading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getBodyContextSnapshot } from "@/lib/body-context";
import { getRoutineShelfExclusions } from "@/lib/routines/verification";
import {
  formatFrequencyLabel,
  formatRoutineSchedule,
  plural,
} from "@/lib/i18n/ui";
import type { RoutineFrequency } from "@/lib/types";

const FREQUENCIES: RoutineFrequency[] = ["daily", "weekly", "monthly"];

export function RoutinesPage() {
  const { routines, products, conflicts, settings, loading } =
    useAppDataContext();
  const { t } = useTranslation();

  if (loading || !settings) {
    return <PageLoading message={t("pages.routines.loading")} />;
  }

  if (products.length === 0) {
    return (
      <PageContainer>
        <PageHeader
          title={t("pages.routines.title")}
          description={t("pages.routines.emptyDescription")}
        />
      </PageContainer>
    );
  }

  const snapshot = getBodyContextSnapshot(settings.bodyContext, t);
  const exclusions = getRoutineShelfExclusions(products, conflicts);

  const byFrequency = Object.fromEntries(
    FREQUENCIES.map((freq) => [
      freq,
      routines.filter((r) => r.frequency === freq),
    ]),
  ) as Record<RoutineFrequency, typeof routines>;

  return (
    <PageContainer className="space-y-5">
      <PageHeader
        title={t("pages.routines.title")}
        description={t("pages.routines.description")}
      />

      <Tabs defaultValue="daily" className="gap-4">
        <TabsList className="grid w-full grid-cols-3 lg:max-w-md">
          {FREQUENCIES.map((freq) => {
            const count = byFrequency[freq].length;
            return (
              <TabsTrigger key={freq} value={freq} className="capitalize">
                {formatFrequencyLabel(t, freq)}
                {count > 0 ? ` (${count})` : ""}
              </TabsTrigger>
            );
          })}
        </TabsList>
        {FREQUENCIES.map((freq) => (
          <TabsContent key={freq} value={freq} className="mt-0 space-y-4">
            {byFrequency[freq].length > 0 ? (
              <>
                <p className="text-sm text-muted-foreground">
                  {t("pages.routines.routineCount", {
                    count: byFrequency[freq].length,
                    routineLabel: plural(
                      t,
                      byFrequency[freq].length,
                      "common.routine",
                      "common.routines",
                    ),
                    schedule: formatRoutineSchedule(
                      t,
                      freq,
                      settings.routineSchedule,
                    ),
                  })}
                </p>
                <RoutineList
                  routines={byFrequency[freq]}
                  products={products}
                  detailed
                  emptyMessage={t("pages.routines.emptyFrequency", {
                    frequency: formatFrequencyLabel(t, freq),
                  })}
                />
              </>
            ) : (
              <p className="text-sm text-muted-foreground">
                {t("pages.routines.emptyFrequency", {
                  frequency: formatFrequencyLabel(t, freq),
                })}
              </p>
            )}
          </TabsContent>
        ))}
      </Tabs>

      <RoutineExclusionsNotice exclusions={exclusions} />

      <RoutineGuideSection
        products={products}
        routines={routines}
        conflicts={conflicts}
        cyclePhase={snapshot.cyclePhase}
        cycleDay={snapshot.cycleDay}
        bodyContextNotes={snapshot.guidanceNotes}
      />
    </PageContainer>
  );
}
