"use client";

import { Lock } from "lucide-react";
import { useTranslation } from "@/components/providers/locale-provider";
import { Card, CardContent } from "@/components/ui/card";

export function BodyContextPrivacyNotice() {
  const { t } = useTranslation();

  return (
    <Card className="border-border/80 bg-muted/30">
      <CardContent className="flex gap-3 pt-5">
        <Lock className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
        <div className="space-y-1">
          <p className="text-sm font-medium">{t("privacy.title")}</p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {t("privacy.body")}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
