"use client";

import { useAppDataContext } from "@/components/providers/app-data-provider";
import { useTranslation } from "@/components/providers/locale-provider";
import { BodyContextBanner } from "@/components/cycle/body-context-banner";
import { BodyContextPrivacyNotice } from "@/components/cycle/body-context-privacy-notice";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { PageLoading } from "@/components/layout/page-loading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  getBodyContextProductExclusions,
  getBodyContextSnapshot,
} from "@/lib/body-context";
import { getLifeStageDescription, localizeExclusionReason } from "@/lib/i18n/ui";
import type {
  AppSettings,
  BodyContextSettings,
  LifeStage,
  WeightChange,
} from "@/lib/types";

const LIFE_STAGES: LifeStage[] = [
  "none",
  "pregnant",
  "postpartum",
  "breastfeeding",
  "perimenopause",
  "menopause",
];

const WEIGHT_OPTIONS: WeightChange[] = [
  "stable",
  "gaining",
  "losing",
  "prefer_not_to_say",
];

export function CyclePage() {
  const { settings, products, loading, updateSettings } = useAppDataContext();
  const { t } = useTranslation();

  if (loading || !settings) {
    return <PageLoading message={t("pages.body.loading")} />;
  }

  const bodyContext = settings.bodyContext;
  const snapshot = getBodyContextSnapshot(bodyContext, t);
  const heldProducts = getBodyContextProductExclusions(products, snapshot);

  const appSettings = settings;

  function updateBodyContext(patch: Partial<BodyContextSettings>) {
    const next: AppSettings = {
      onboardingComplete: appSettings.onboardingComplete,
      bodyContext: { ...bodyContext, ...patch },
    };
    void updateSettings(next);
  }

  function updateMenstrual(
    patch: Partial<BodyContextSettings["menstrual"]>,
  ) {
    updateBodyContext({
      menstrual: { ...bodyContext.menstrual, ...patch },
    });
  }

  function updateWeight(patch: Partial<BodyContextSettings["weight"]>) {
    updateBodyContext({
      weight: { ...bodyContext.weight, ...patch },
    });
  }

  return (
    <PageContainer>
      <PageHeader
        title={t("pages.body.title")}
        description={t("pages.body.description")}
      />

      <BodyContextPrivacyNotice />

      <Card>
        <CardContent className="flex items-center justify-between pt-6">
          <div>
            <p className="font-medium">{t("pages.body.masterToggle")}</p>
            <p className="text-sm text-muted-foreground">
              {t("pages.body.masterHelp")}
            </p>
          </div>
          <Switch
            checked={bodyContext.enabled}
            onCheckedChange={(checked) => updateBodyContext({ enabled: checked })}
          />
        </CardContent>
      </Card>

      {bodyContext.enabled && (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="font-heading text-base">
                {t("pages.body.menstrualTitle")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium">
                    {t("pages.body.trackMenstrual")}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {t("pages.body.trackMenstrualHelp")}
                  </p>
                </div>
                <Switch
                  checked={bodyContext.menstrual.enabled}
                  onCheckedChange={(checked) =>
                    updateMenstrual({ enabled: checked })
                  }
                />
              </div>

              {bodyContext.menstrual.enabled && (
                <div className="space-y-4 border-t border-border/80 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="last-period">{t("pages.body.lastPeriod")}</Label>
                    <Input
                      id="last-period"
                      type="date"
                      value={bodyContext.menstrual.lastPeriodStart ?? ""}
                      onChange={(e) =>
                        updateMenstrual({
                          lastPeriodStart: e.target.value || null,
                        })
                      }
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cycle-length">
                        {t("pages.body.cycleLength")}
                      </Label>
                      <Input
                        id="cycle-length"
                        type="number"
                        min={21}
                        max={40}
                        value={bodyContext.menstrual.cycleLength}
                        onChange={(e) =>
                          updateMenstrual({
                            cycleLength: Number(e.target.value) || 28,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="period-length">
                        {t("pages.body.periodLength")}
                      </Label>
                      <Input
                        id="period-length"
                        type="number"
                        min={2}
                        max={10}
                        value={bodyContext.menstrual.periodLength}
                        onChange={(e) =>
                          updateMenstrual({
                            periodLength: Number(e.target.value) || 5,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-heading text-base">
                {t("pages.body.lifeStageTitle")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="life-stage">{t("pages.body.lifeStageLabel")}</Label>
                <Select
                  value={bodyContext.lifeStage}
                  onValueChange={(value) =>
                    updateBodyContext({
                      lifeStage: value as LifeStage,
                      postpartumWeeks:
                        value === "postpartum"
                          ? bodyContext.postpartumWeeks
                          : null,
                    })
                  }
                >
                  <SelectTrigger id="life-stage" className="w-full">
                    <SelectValue placeholder={t("pages.body.lifeStagePlaceholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    {LIFE_STAGES.map((stage) => (
                      <SelectItem key={stage} value={stage}>
                        {t(`enums.lifeStage.${stage}`)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  {getLifeStageDescription(t, bodyContext.lifeStage)}
                </p>
              </div>

              {bodyContext.lifeStage === "postpartum" && (
                <div className="space-y-2">
                  <Label htmlFor="postpartum-weeks">
                    {t("pages.body.postpartumWeeks")}
                  </Label>
                  <Input
                    id="postpartum-weeks"
                    type="number"
                    min={0}
                    max={52}
                    value={bodyContext.postpartumWeeks ?? ""}
                    onChange={(e) =>
                      updateBodyContext({
                        postpartumWeeks:
                          e.target.value === ""
                            ? null
                            : Number(e.target.value),
                      })
                    }
                  />
                  <p className="text-xs text-muted-foreground">
                    {t("pages.body.postpartumHelp")}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-heading text-base">
                {t("pages.body.weightTitle")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium">
                    {t("pages.body.includeWeight")}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {t("pages.body.includeWeightHelp")}
                  </p>
                </div>
                <Switch
                  checked={bodyContext.weight.enabled}
                  onCheckedChange={(checked) =>
                    updateWeight({ enabled: checked })
                  }
                />
              </div>

              {bodyContext.weight.enabled && (
                <div className="space-y-2 border-t border-border/80 pt-4">
                  <Label htmlFor="weight-change">
                    {t("pages.body.recentChange")}
                  </Label>
                  <Select
                    value={bodyContext.weight.recentChange}
                    onValueChange={(value) =>
                      updateWeight({ recentChange: value as WeightChange })
                    }
                  >
                    <SelectTrigger id="weight-change" className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {WEIGHT_OPTIONS.map((option) => (
                        <SelectItem key={option} value={option}>
                          {t(`enums.weightChange.${option}`)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </CardContent>
          </Card>

          {(snapshot.activeFactors.length > 0 || heldProducts.length > 0) && (
            <div className="space-y-4">
              <BodyContextBanner snapshot={snapshot} />

              {heldProducts.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="font-heading text-base">
                      {t("pages.body.heldProductsTitle")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {heldProducts.map(({ product, reason }) => (
                        <li
                          key={product.id}
                          className="text-sm leading-relaxed text-muted-foreground"
                        >
                          <span className="font-medium text-foreground">
                            {product.name}
                          </span>{" "}
                          — {localizeExclusionReason(t, reason)}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </>
      )}
    </PageContainer>
  );
}
