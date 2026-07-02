import type { IngredientConflict, Product, ConflictWarning } from "../types";

export const INGREDIENT_CONFLICTS: IngredientConflict[] = [
  {
    ingredientA: "retinol",
    ingredientB: "benzoyl peroxide",
    severity: "avoid",
    reason: "Benzoyl peroxide oxidizes retinol, reducing effectiveness.",
    guidance: "Use on alternate evenings, not in the same routine.",
  },
  {
    ingredientA: "retinol",
    ingredientB: "vitamin c",
    severity: "separate",
    reason: "Combined use can increase irritation without added benefit.",
    guidance: "Use vitamin C in the morning and retinol at night.",
  },
  {
    ingredientA: "retinol",
    ingredientB: "aha",
    severity: "caution",
    reason: "Both increase cell turnover and can over-exfoliate.",
    guidance: "Introduce slowly; avoid using strong AHA on retinol nights.",
  },
  {
    ingredientA: "retinol",
    ingredientB: "bha",
    severity: "caution",
    reason: "Layering retinoids with BHA raises irritation risk.",
    guidance: "Alternate nights or use BHA only in the morning.",
  },
  {
    ingredientA: "vitamin c",
    ingredientB: "niacinamide",
    severity: "caution",
    reason: "At low pH, vitamin C may reduce niacinamide efficacy for some users.",
    guidance: "Generally safe together; separate if you notice flushing.",
  },
  {
    ingredientA: "aha",
    ingredientB: "bha",
    severity: "caution",
    reason: "Combining multiple acids increases barrier stress.",
    guidance: "Use on different days or limit to one acid per routine.",
  },
  {
    ingredientA: "aha",
    ingredientB: "benzoyl peroxide",
    severity: "caution",
    reason: "Both are drying and can cause peeling when layered.",
    guidance: "Alternate application or use BP only as a spot treatment.",
  },
  {
    ingredientA: "benzoyl peroxide",
    ingredientB: "vitamin c",
    severity: "avoid",
    reason: "Benzoyl peroxide can destabilize L-ascorbic acid.",
    guidance: "Use vitamin C in the morning, BP in the evening.",
  },
  {
    ingredientA: "copper peptides",
    ingredientB: "vitamin c",
    severity: "caution",
    reason: "Copper peptides may interact with acidic vitamin C.",
    guidance: "Apply at different times of day.",
  },
  {
    ingredientA: "copper peptides",
    ingredientB: "aha",
    severity: "caution",
    reason: "Low pH acids may reduce peptide stability.",
    guidance: "Separate by at least 30 minutes or use at different times.",
  },
];

const ALIASES: Record<string, string[]> = {
  retinol: ["retinol", "retinal", "retinaldehyde", "tretinoin", "adapalene", "retinyl"],
  "vitamin c": ["ascorbic acid", "l-ascorbic acid", "vitamin c", "ascorbyl"],
  "benzoyl peroxide": ["benzoyl peroxide", "bpo"],
  aha: ["glycolic acid", "lactic acid", "mandelic acid", "aha", "alpha hydroxy"],
  bha: ["salicylic acid", "bha", "beta hydroxy"],
  niacinamide: ["niacinamide", "nicotinamide"],
  "copper peptides": ["copper peptide", "copper tripeptide", "ghk-cu"],
};

function normalizeIngredient(text: string): string {
  const lower = text.toLowerCase();
  for (const [canonical, aliases] of Object.entries(ALIASES)) {
    if (aliases.some((alias) => lower.includes(alias))) {
      return canonical;
    }
  }
  return lower;
}

function getCanonicalActives(product: Product): string[] {
  const sources = [...product.activeIngredients, ...product.ingredients];
  const canonical = new Set<string>();
  for (const item of sources) {
    canonical.add(normalizeIngredient(item));
  }
  return [...canonical];
}

function ingredientsConflict(a: string, b: string): IngredientConflict | null {
  for (const rule of INGREDIENT_CONFLICTS) {
    const pair = [rule.ingredientA, rule.ingredientB].sort().join("|");
    const check = [a, b].sort().join("|");
    if (pair === check) return rule;
  }
  return null;
}

export function detectConflicts(products: Product[]): ConflictWarning[] {
  const warnings: ConflictWarning[] = [];
  const seen = new Set<string>();

  for (let i = 0; i < products.length; i++) {
    for (let j = i + 1; j < products.length; j++) {
      const a = products[i];
      const b = products[j];
      const activesA = getCanonicalActives(a);
      const activesB = getCanonicalActives(b);

      for (const ingA of activesA) {
        for (const ingB of activesB) {
          if (ingA === ingB) continue;
          const conflict = ingredientsConflict(ingA, ingB);
          if (!conflict) continue;

          const key = [a.id, b.id, conflict.ingredientA, conflict.ingredientB]
            .sort()
            .join("|");
          if (seen.has(key)) continue;
          seen.add(key);

          warnings.push({ productA: a, productB: b, conflict });
        }
      }
    }
  }

  return warnings.sort((x, y) => {
    const order = { avoid: 0, caution: 1, separate: 2 };
    return order[x.conflict.severity] - order[y.conflict.severity];
  });
}

export function getConflictsForRoutine(
  steps: Product[],
  allWarnings: ConflictWarning[],
): ConflictWarning[] {
  const ids = new Set(steps.map((p) => p.id));
  return allWarnings.filter(
    (w) => ids.has(w.productA.id) && ids.has(w.productB.id),
  );
}
