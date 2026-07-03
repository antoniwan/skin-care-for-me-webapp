import { describe, expect, it } from "vitest";
import { getMessages } from "@/lib/i18n/messages";
import { createTranslator } from "@/lib/i18n/translate";
import {
  localizeConflictRule,
  localizeExclusionReason,
  localizeVerification,
} from "@/lib/i18n/ui";
import type { Messages } from "@/lib/i18n/messages/en";
import { verifyRoutine } from "@/lib/routines/verification";
import { makeProduct } from "@/lib/test/fixtures";

function collectKeys(value: unknown, prefix = ""): string[] {
  if (typeof value === "string") {
    return prefix ? [prefix] : [];
  }
  if (!value || typeof value !== "object") return [];

  return Object.entries(value as Record<string, unknown>).flatMap(
    ([key, child]) => collectKeys(child, prefix ? `${prefix}.${key}` : key),
  );
}

describe("message catalogs", () => {
  it("es-419 includes every key from en", () => {
    const enKeys = collectKeys(getMessages("en")).sort();
    const esKeys = new Set(collectKeys(getMessages("es-419")));

    const missing = enKeys.filter((key) => !esKeys.has(key));
    expect(missing).toEqual([]);
  });
});

describe("localizeVerification", () => {
  const tEn = createTranslator(getMessages("en"));
  const tEs = createTranslator(getMessages("es-419"), getMessages("en"));

  it("localizes safety check labels instead of returning raw keys", () => {
    const products = [
      makeProduct({
        id: "cleanse",
        category: "cleanser",
        frequency: "daily",
        timeOfDay: "any",
      }),
      makeProduct({
        id: "moist",
        category: "moisturizer",
        frequency: "daily",
        timeOfDay: "any",
      }),
      makeProduct({
        id: "spf",
        category: "sunscreen",
        frequency: "daily",
        timeOfDay: "morning",
      }),
    ];

    const routine = {
      id: "morning",
      frequency: "daily" as const,
      timeOfDay: "morning" as const,
      steps: [
        {
          productId: "cleanse",
          productName: "Cleanser",
          category: "cleanser" as const,
          instructions: "Wash",
          order: 1,
        },
        {
          productId: "moist",
          productName: "Moisturizer",
          category: "moisturizer" as const,
          instructions: "Moisturize",
          order: 2,
        },
        {
          productId: "spf",
          productName: "SPF",
          category: "sunscreen" as const,
          instructions: "Protect",
          order: 3,
        },
      ],
      generatedAt: new Date().toISOString(),
    };

    const localized = localizeVerification(tEn, verifyRoutine(routine, products));
    expect(localized.checks[0]?.label).toBe("Layering order");
    expect(localized.checks[0]?.detail).toContain("cleanse");

    const localizedEs = localizeVerification(
      tEs,
      verifyRoutine(routine, products),
    );
    expect(localizedEs.checks[0]?.label).toBe("Orden de capas");
    expect(localizedEs.checks[0]?.detail).toContain("limpiar");
  });
});

describe("localizeConflictRule", () => {
  it("returns Spanish conflict copy for es-419", () => {
    const tEs = createTranslator(getMessages("es-419"), getMessages("en"));
    const localized = localizeConflictRule(tEs, {
      id: "retinol-bha",
      reason: "English reason",
      guidance: "English guidance",
    });

    expect(localized.reason).toContain("BHA");
    expect(localized.guidance).toContain("mañana");
    expect(localized.reason).not.toBe("English reason");
  });
});

describe("localizeExclusionReason", () => {
  it("localizes structured menstrual exclusions with phase label", () => {
    const tEs = createTranslator(getMessages("es-419"), getMessages("en"));
    const text = localizeExclusionReason(tEs, {
      kind: "menstrual",
      phase: "luteal",
    });

    expect(text).toContain("Lútea");
    expect(text).not.toContain("Held on");
  });
});

describe("createTranslator fallback", () => {
  it("falls back to English when a key is missing in the active locale", () => {
    const broken = {
      brand: { name: "Test" },
    } as Messages;
    const t = createTranslator(broken, getMessages("en"));
    expect(t("nav.today")).toBe("Today");
  });
});
