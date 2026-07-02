import { generateObject } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { z } from "zod";
import type { ProductLookupResult } from "@/lib/types";

const lookupSchema = z.object({
  name: z.string(),
  brand: z.string().optional(),
  category: z.enum([
    "cleanser",
    "toner",
    "serum",
    "moisturizer",
    "sunscreen",
    "exfoliant",
    "mask",
    "eye_cream",
    "treatment",
    "other",
  ]),
  ingredients: z.array(z.string()),
  activeIngredients: z.array(z.string()),
  usageGuide: z.string(),
  suggestedFrequency: z.enum(["daily", "weekly", "monthly"]),
  suggestedTimeOfDay: z.enum(["morning", "evening", "any"]),
});

function mockLookup(query: string): ProductLookupResult {
  const lower = query.toLowerCase();
  const isSunscreen = /spf|sunscreen|sun screen/.test(lower);
  const isRetinol = /retinol|retinoid/.test(lower);

  return {
    name: query,
    brand: undefined,
    category: isSunscreen
      ? "sunscreen"
      : isRetinol
        ? "treatment"
        : "serum",
    ingredients: isRetinol
      ? ["Aqua", "Retinol", "Squalane", "Tocopherol"]
      : isSunscreen
        ? ["Aqua", "Zinc Oxide", "Titanium Dioxide", "Glycerin"]
        : ["Aqua", "Niacinamide", "Hyaluronic Acid", "Panthenol"],
    activeIngredients: isRetinol
      ? ["retinol"]
      : isSunscreen
        ? ["zinc oxide"]
        : ["niacinamide", "hyaluronic acid"],
    usageGuide: isSunscreen
      ? "Apply as the last step every morning. Reapply every 2 hours in direct sun."
      : isRetinol
        ? "Apply a pea-sized amount to dry skin in the evening. Start 2–3 nights per week."
        : "Apply 2–3 drops to clean skin before moisturizer, morning or evening.",
    suggestedFrequency: isSunscreen || !isRetinol ? "daily" : "weekly",
    suggestedTimeOfDay: isSunscreen ? "morning" : isRetinol ? "evening" : "any",
  };
}

export async function lookupProduct(query: string): Promise<ProductLookupResult> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return mockLookup(query);
  }

  const openai = createOpenAI({ apiKey });

  const { object } = await generateObject({
    model: openai("gpt-4o-mini"),
    schema: lookupSchema,
    prompt: `You are a skincare product expert. Look up this product and return structured data: "${query}".
Include realistic ingredient lists, active ingredients (normalized names like retinol, vitamin c, aha, bha, niacinamide),
practical usage instructions, and sensible frequency/time-of-day suggestions.
If the product is unknown, infer from the name and category keywords.`,
  });

  return object;
}
