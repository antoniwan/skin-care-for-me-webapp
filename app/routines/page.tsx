"use client";

import { useAppDataContext } from "@/components/providers/app-data-provider";
import { RoutineCard } from "@/components/routines/routine-card";
import { getRoutineWarnings } from "@/lib/routines/generator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function RoutinesPage() {
  const { routines, products, loading } = useAppDataContext();

  if (loading) {
    return <p className="text-muted-foreground">Loading routines…</p>;
  }

  if (products.length === 0) {
    return (
      <div className="space-y-2">
        <h1 className="font-heading text-2xl font-semibold">Routines</h1>
        <p className="text-sm text-muted-foreground">
          Add products first — your daily, weekly, and monthly routines will appear here.
        </p>
      </div>
    );
  }

  const byFrequency = {
    daily: routines.filter((r) => r.frequency === "daily"),
    weekly: routines.filter((r) => r.frequency === "weekly"),
    monthly: routines.filter((r) => r.frequency === "monthly"),
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-heading text-2xl font-semibold">Routines</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Auto-generated from your shelf. Updates when you add or remove products.
        </p>
      </header>

      <Tabs defaultValue="daily">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="daily">Daily</TabsTrigger>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
        </TabsList>
        {(["daily", "weekly", "monthly"] as const).map((freq) => (
          <TabsContent key={freq} value={freq} className="mt-4 space-y-4">
            {byFrequency[freq].length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No {freq} products yet.
              </p>
            ) : (
              byFrequency[freq].map((routine) => (
                <RoutineCard
                  key={routine.id}
                  routine={routine}
                  warnings={getRoutineWarnings(routine, products)}
                />
              ))
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
