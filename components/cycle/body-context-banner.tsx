"use client";

import type { BodyContextSnapshot } from "@/lib/body-context";
import { useTranslation } from "@/components/providers/locale-provider";
import { buildBodyContextHeadline } from "@/lib/i18n/ui";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface BodyContextBannerProps {
  snapshot: BodyContextSnapshot;
  prefix?: string;
}

export function BodyContextBanner({
  snapshot,
  prefix,
}: BodyContextBannerProps) {
  const { t } = useTranslation();

  if (!snapshot.enabled) return null;

  const headline = buildBodyContextHeadline(t, snapshot);
  const displayPrefix = prefix ?? t("common.todayPrefix");

  return (
    <Card className="border-primary/25 bg-primary/10 shadow-sm">
      <CardContent className="space-y-3 pt-4">
        <div className="space-y-2">
          <p className="text-sm font-medium text-primary">
            {displayPrefix}
            {headline}
          </p>
          {snapshot.activeFactors.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {snapshot.activeFactors.map((factor) => (
                <Badge
                  key={factor}
                  variant="secondary"
                  className="text-[11px] font-medium"
                >
                  {factor}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {snapshot.guidanceNotes.length > 0 && (
          <ul className="space-y-1.5">
            {snapshot.guidanceNotes.map((note) => (
              <li
                key={note}
                className="text-sm leading-relaxed text-muted-foreground before:mr-1.5 before:content-['•']"
              >
                {note}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
