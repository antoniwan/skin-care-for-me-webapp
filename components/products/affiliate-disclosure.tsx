"use client";

import { useTranslation } from "@/components/providers/locale-provider";

export function AffiliateDisclosure() {
  const { t } = useTranslation();

  return (
    <p className="text-xs leading-relaxed text-muted-foreground">
      {t("affiliate")}
    </p>
  );
}
