"use client";

import { Sparkles } from "lucide-react";
import { useAppDataContext } from "@/components/providers/app-data-provider";
import { useTranslation } from "@/components/providers/locale-provider";
import { AddProductSheet } from "@/components/products/add-product-sheet";
import { BodyContextBanner } from "@/components/cycle/body-context-banner";
import { EmptyState } from "@/components/layout/empty-state";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { PageLoading } from "@/components/layout/page-loading";
import { RoutineList } from "@/components/routines/routine-list";
import { getBodyContextSnapshot } from "@/lib/body-context";
import { getTodaysRoutines } from "@/lib/routines/generator";
import { cn } from "@/lib/utils";

export function HomePage() {
  const { products, routines, settings, loading, addProductFromLookup } =
    useAppDataContext();
  const { t } = useTranslation();

  if (loading || !settings) {
    return <PageLoading message={t("pages.home.loading")} />;
  }

  const snapshot = getBodyContextSnapshot(settings.bodyContext, t);
  const todaysRoutines = getTodaysRoutines(routines, settings);
  const showBodySidebar = snapshot.enabled;

  return (
    <PageContainer>
      <PageHeader
        eyebrow={t(`greeting.${getGreetingPeriod()}`)}
        title={t("pages.home.title")}
      />

      {products.length === 0 ? (
        <>
          {showBodySidebar && <BodyContextBanner snapshot={snapshot} />}
          <EmptyState
            icon={Sparkles}
            title={t("pages.home.emptyTitle")}
            description={t("pages.home.emptyDescription")}
          >
            <AddProductSheet onAdd={addProductFromLookup} />
          </EmptyState>
        </>
      ) : (
        <div
          className={cn(
            showBodySidebar &&
              "lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-8 lg:items-start",
          )}
        >
          {showBodySidebar ? (
            <aside className="mb-6 lg:mb-0">
              <BodyContextBanner snapshot={snapshot} />
            </aside>
          ) : null}
          <RoutineList
            routines={todaysRoutines}
            products={products}
            emptyMessage={t("pages.home.emptyRoutines")}
          />
        </div>
      )}
    </PageContainer>
  );
}

function getGreetingPeriod() {
  const hour = new Date().getHours();
  if (hour < 12) return "morning";
  if (hour < 17) return "afternoon";
  return "evening";
}
