import { z } from "zod";

export const productLookupSchema = z.object({
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

export const lookupQuerySchema = z.object({
  query: z.string().trim().min(1, "Product name is required."),
});
