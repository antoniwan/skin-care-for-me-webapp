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
import {
  LIFE_STAGE_TOGGLE_KEYS,
  reconcileLifeStageFlags,
  type LifeStageToggleKey,
} from "@/lib/body-context/life-stage";
import {
  SKIN_CONDITION_KEYS,
  WELLNESS_KEYS,
  type SkinConditionKey,
  type WellnessKey,
} from "@/lib/body-context/skin-wellness";
import {
  getLifeStageToggleHelp,
  getSkinConditionToggleHelp,
  getWellnessToggleHelp,
  localizeExclusionReason,
} from "@/lib/i18n/ui";
import type {
  AppSettings,
  BodyContextSettings,
  LifeStageFlags,
  SkinConditionFlags,
  WeightChange,
  WellnessFlags,
} from "@/lib/types";

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
    return <PageLoading message={t("pages.lifestyle.loading")} />;
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

  function updateLifeStage(patch: Partial<LifeStageFlags>) {
    const lifeStage = reconcileLifeStageFlags(bodyContext.lifeStage, patch);
    updateBodyContext({
      lifeStage,
      postpartumWeeks: lifeStage.postpartum ? bodyContext.postpartumWeeks : null,
    });
  }

  function toggleLifeStage(key: LifeStageToggleKey, checked: boolean) {
    updateLifeStage({ [key]: checked });
  }

  function updateSkinConditions(patch: Partial<SkinConditionFlags>) {
    updateBodyContext({
      skinConditions: { ...bodyContext.skinConditions, ...patch },
    });
  }

  function updateWellness(patch: Partial<WellnessFlags>) {
    updateBodyContext({
      wellness: { ...bodyContext.wellness, ...patch },
    });
  }

  function toggleSkinCondition(key: SkinConditionKey, checked: boolean) {
    updateSkinConditions({ [key]: checked });
  }

  function toggleWellness(key: WellnessKey, checked: boolean) {
    updateWellness({ [key]: checked });
  }

  return (
    <PageContainer>
      <PageHeader
        title={t("pages.lifestyle.title")}
        description={t("pages.lifestyle.description")}
      />

      <BodyContextPrivacyNotice />

      <Card>
        <CardContent className="flex items-center justify-between pt-6">
          <div>
            <p className="font-medium">{t("pages.lifestyle.masterToggle")}</p>
            <p className="text-sm text-muted-foreground">
              {t("pages.lifestyle.masterHelp")}
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
                {t("pages.lifestyle.menstrualTitle")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium">
                    {t("pages.lifestyle.trackMenstrual")}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {t("pages.lifestyle.trackMenstrualHelp")}
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
                    <Label htmlFor="last-period">{t("pages.lifestyle.lastPeriod")}</Label>
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
                        {t("pages.lifestyle.cycleLength")}
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
                        {t("pages.lifestyle.periodLength")}
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
                {t("pages.lifestyle.lifeStageTitle")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {t("pages.lifestyle.lifeStageHelp")}
              </p>

              <div className="space-y-4">
                {LIFE_STAGE_TOGGLE_KEYS.map((key) => (
                  <div
                    key={key}
                    className="flex items-start justify-between gap-4 border-b border-border/60 pb-4 last:border-0 last:pb-0"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium">
                        {t(`enums.lifeStage.${key}`)}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {getLifeStageToggleHelp(t, key)}
                      </p>
                    </div>
                    <Switch
                      checked={bodyContext.lifeStage[key]}
                      onCheckedChange={(checked) => toggleLifeStage(key, checked)}
                      aria-label={t(`enums.lifeStage.${key}`)}
                    />
                  </div>
                ))}
              </div>

              {bodyContext.lifeStage.postpartum && (
                <div className="space-y-2 border-t border-border/80 pt-4">
                  <Label htmlFor="postpartum-weeks">
                    {t("pages.lifestyle.postpartumWeeks")}
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
                    {t("pages.lifestyle.postpartumHelp")}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-heading text-base">
                {t("pages.lifestyle.skinConditionTitle")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {t("pages.lifestyle.skinConditionHelp")}
              </p>

              <div className="space-y-4">
                {SKIN_CONDITION_KEYS.map((key) => (
                  <div
                    key={key}
                    className="flex items-start justify-between gap-4 border-b border-border/60 pb-4 last:border-0 last:pb-0"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium">
                        {t(`enums.skinCondition.${key}`)}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {getSkinConditionToggleHelp(t, key)}
                      </p>
                    </div>
                    <Switch
                      checked={bodyContext.skinConditions[key]}
                      onCheckedChange={(checked) =>
                        toggleSkinCondition(key, checked)
                      }
                      aria-label={t(`enums.skinCondition.${key}`)}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-heading text-base">
                {t("pages.lifestyle.wellnessTitle")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {t("pages.lifestyle.wellnessHelp")}
              </p>

              <div className="space-y-4">
                {WELLNESS_KEYS.map((key) => (
                  <div
                    key={key}
                    className="flex items-start justify-between gap-4 border-b border-border/60 pb-4 last:border-0 last:pb-0"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium">
                        {t(`enums.wellness.${key}`)}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {getWellnessToggleHelp(t, key)}
                      </p>
                    </div>
                    <Switch
                      checked={bodyContext.wellness[key]}
                      onCheckedChange={(checked) => toggleWellness(key, checked)}
                      aria-label={t(`enums.wellness.${key}`)}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-heading text-base">
                {t("pages.lifestyle.weightTitle")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium">
                    {t("pages.lifestyle.includeWeight")}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {t("pages.lifestyle.includeWeightHelp")}
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
                    {t("pages.lifestyle.recentChange")}
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
                      {t("pages.lifestyle.heldProductsTitle")}
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
