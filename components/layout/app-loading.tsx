"use client";

import { PageLoading } from "@/components/layout/page-loading";
import { useTranslation } from "@/components/providers/locale-provider";

export function AppLoading() {
  const { t } = useTranslation();
  return <PageLoading message={t("common.loading")} />;
}
