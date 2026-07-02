"use server";

import { lookupProduct } from "@/lib/products/lookup";
import { lookupQuerySchema } from "@/lib/products/lookup-schema";
import type { ProductLookupResult } from "@/lib/types";

export type LookupProductActionResult =
  | { success: true; data: ProductLookupResult }
  | { success: false; error: string };

export async function lookupProductAction(
  query: string,
): Promise<LookupProductActionResult> {
  const parsed = lookupQuerySchema.safeParse({ query });

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Product name is required.",
    };
  }

  try {
    const data = await lookupProduct(parsed.data.query);
    return { success: true, data };
  } catch (error) {
    console.error("Product lookup failed:", error);
    return { success: false, error: "Could not look up product. Try again." };
  }
}
