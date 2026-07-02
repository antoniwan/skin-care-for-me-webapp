"use client";

import { useAppDataContext } from "@/components/providers/app-data-provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  CYCLE_PHASE_LABELS,
  CYCLE_SKIN_NOTES,
  getCurrentCyclePhase,
  getCycleDay,
} from "@/lib/cycle/phases";
import type { AppSettings, CycleSettings } from "@/lib/types";

export default function CyclePage() {
  const { settings, loading, updateSettings } = useAppDataContext();

  if (loading || !settings) {
    return <p className="text-muted-foreground">Loading cycle settings…</p>;
  }

  const appSettings = settings;
  const phase = getCurrentCyclePhase(appSettings.cycle);
  const cycleDay = getCycleDay(appSettings.cycle);

  function updateCycle<K extends keyof CycleSettings>(
    key: K,
    value: CycleSettings[K],
  ) {
    const next: AppSettings = {
      onboardingComplete: appSettings.onboardingComplete,
      cycle: { ...appSettings.cycle, [key]: value },
    };
    void updateSettings(next);
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-heading text-2xl font-semibold">Cycle tracking</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Optional. Routines adapt gently to your current phase.
        </p>
      </header>

      <Card>
        <CardContent className="flex items-center justify-between pt-6">
          <div>
            <p className="font-medium">Enable cycle-aware routines</p>
            <p className="text-sm text-muted-foreground">
              All data stays on this device.
            </p>
          </div>
          <Switch
            checked={appSettings.cycle.enabled}
            onCheckedChange={(checked) => updateCycle("enabled", checked)}
          />
        </CardContent>
      </Card>

      {appSettings.cycle.enabled && (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="font-heading text-base">Your cycle</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="last-period">Last period start</Label>
                <Input
                  id="last-period"
                  type="date"
                  value={appSettings.cycle.lastPeriodStart ?? ""}
                  onChange={(e) =>
                    updateCycle("lastPeriodStart", e.target.value || null)
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cycle-length">Cycle length (days)</Label>
                  <Input
                    id="cycle-length"
                    type="number"
                    min={21}
                    max={40}
                    value={appSettings.cycle.cycleLength}
                    onChange={(e) =>
                      updateCycle("cycleLength", Number(e.target.value) || 28)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="period-length">Period length (days)</Label>
                  <Input
                    id="period-length"
                    type="number"
                    min={2}
                    max={10}
                    value={appSettings.cycle.periodLength}
                    onChange={(e) =>
                      updateCycle("periodLength", Number(e.target.value) || 5)
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {appSettings.cycle.lastPeriodStart && (
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="pt-4">
                <p className="font-medium text-primary">
                  Current: {CYCLE_PHASE_LABELS[phase]}
                  {cycleDay ? ` (day ${cycleDay})` : ""}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {CYCLE_SKIN_NOTES[phase]}
                </p>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
