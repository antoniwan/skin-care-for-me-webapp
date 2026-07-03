import { describe, expect, it } from "vitest";
import {
  getBodyContextCore,
  getBodyContextSnapshot,
  shouldIncludeProductInRoutine,
} from "@/lib/body-context";
import { DEFAULT_BODY_CONTEXT, DEFAULT_LIFE_STAGE_FLAGS } from "@/lib/body-context/defaults";
import { getMessages } from "@/lib/i18n/messages";
import { createTranslator } from "@/lib/i18n/translate";
import { makeProduct } from "@/lib/test/fixtures";

const t = createTranslator(getMessages("en"));

describe("getBodyContextSnapshot", () => {
  it("returns empty guidance when disabled", () => {
    const snapshot = getBodyContextSnapshot(DEFAULT_BODY_CONTEXT, t);
    expect(snapshot.enabled).toBe(false);
    expect(snapshot.guidanceNotes).toEqual([]);
  });

  it("combines menstrual, life stage, and weight factors", () => {
    const snapshot = getBodyContextSnapshot(
      {
        ...DEFAULT_BODY_CONTEXT,
        enabled: true,
        menstrual: {
          enabled: true,
          cycleLength: 28,
          periodLength: 5,
          lastPeriodStart: "2024-06-01",
        },
        lifeStage: { ...DEFAULT_LIFE_STAGE_FLAGS, postpartum: true },
        postpartumWeeks: 4,
        weight: { enabled: true, recentChange: "gaining" },
      },
      t,
      new Date("2024-06-03"),
    );

    expect(snapshot.enabled).toBe(true);
    expect(snapshot.cyclePhase).toBe("menstrual");
    expect(snapshot.activeFactors.length).toBeGreaterThanOrEqual(3);
    expect(
      snapshot.guidanceNotes.some((n) =>
        n.includes("Postpartum week 4") || n.includes("Semana 4 posparto"),
      ),
    ).toBe(true);
  });
});

describe("shouldIncludeProductInRoutine", () => {
  it("holds retinoids during pregnancy", () => {
    const retinol = makeProduct({
      activeIngredients: ["retinol"],
      frequency: "daily",
      timeOfDay: "evening",
      category: "treatment",
    });

    const snapshot = getBodyContextCore({
      ...DEFAULT_BODY_CONTEXT,
      enabled: true,
      lifeStage: { ...DEFAULT_LIFE_STAGE_FLAGS, pregnant: true },
    });

    expect(shouldIncludeProductInRoutine(retinol, snapshot)).toBe(false);
  });

  it("holds retinoids while breastfeeding after week 12 postpartum", () => {
    const retinol = makeProduct({
      activeIngredients: ["retinol"],
      frequency: "daily",
      timeOfDay: "evening",
      category: "treatment",
    });

    const snapshot = getBodyContextCore({
      ...DEFAULT_BODY_CONTEXT,
      enabled: true,
      lifeStage: {
        ...DEFAULT_LIFE_STAGE_FLAGS,
        postpartum: true,
        breastfeeding: true,
      },
      postpartumWeeks: 16,
    });

    expect(shouldIncludeProductInRoutine(retinol, snapshot)).toBe(false);
  });

  it("holds daily BHA toner during early postpartum", () => {
    const toner = makeProduct({
      category: "toner",
      frequency: "daily",
      activeIngredients: ["salicylic acid"],
    });

    const snapshot = getBodyContextCore({
      ...DEFAULT_BODY_CONTEXT,
      enabled: true,
      lifeStage: { ...DEFAULT_LIFE_STAGE_FLAGS, postpartum: true },
      postpartumWeeks: 3,
    });

    expect(shouldIncludeProductInRoutine(toner, snapshot)).toBe(false);
  });

  it("limits harsh daily actives on menstrual days", () => {
    const pad = makeProduct({
      category: "exfoliant",
      frequency: "daily",
      activeIngredients: ["salicylic acid"],
    });

    const snapshot = getBodyContextCore(
      {
        ...DEFAULT_BODY_CONTEXT,
        enabled: true,
        menstrual: {
          enabled: true,
          cycleLength: 28,
          periodLength: 5,
          lastPeriodStart: "2024-06-01",
        },
      },
      new Date("2024-06-03"),
    );

    expect(snapshot.cyclePhase).toBe("menstrual");
    expect(shouldIncludeProductInRoutine(pad, snapshot)).toBe(false);
    expect(
      shouldIncludeProductInRoutine(
        { ...pad, frequency: "weekly" },
        snapshot,
      ),
    ).toBe(true);
  });

  it("holds daily retinoids when eczema is active", () => {
    const retinol = makeProduct({
      activeIngredients: ["retinol"],
      frequency: "daily",
      timeOfDay: "evening",
      category: "treatment",
    });

    const snapshot = getBodyContextCore({
      ...DEFAULT_BODY_CONTEXT,
      enabled: true,
      skinConditions: {
        psoriasis: false,
        eczema: true,
        rosacea: false,
        acneProne: false,
      },
    });

    expect(shouldIncludeProductInRoutine(retinol, snapshot)).toBe(false);
  });
});
