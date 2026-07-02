"use client";

import type { Product } from "@/lib/types";
import { useTranslation } from "@/components/providers/locale-provider";
import {
  formatCategoryLabel,
  formatFrequencyLabel,
  formatTimeOfDayLabel,
} from "@/lib/i18n/ui";
import { Badge } from "@/components/ui/badge";

interface ProductMetaBadgesProps {
  category: Product["category"];
  frequency: Product["frequency"];
  timeOfDay: Product["timeOfDay"];
  isSeed?: boolean;
}

export function ProductMetaBadges({
  category,
  frequency,
  timeOfDay,
  isSeed,
}: ProductMetaBadgesProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-wrap gap-2">
      <Badge variant="secondary">
        {formatCategoryLabel(t, category)}
      </Badge>
      <Badge variant="outline">{formatFrequencyLabel(t, frequency)}</Badge>
      <Badge variant="outline">{formatTimeOfDayLabel(t, timeOfDay)}</Badge>
      {isSeed && (
        <Badge variant="outline" className="border-primary/30 text-primary">
          {t("common.default")}
        </Badge>
      )}
    </div>
  );
}
