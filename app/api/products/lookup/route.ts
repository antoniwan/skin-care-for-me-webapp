import { lookupProduct } from "@/lib/products/lookup";
import { lookupQuerySchema } from "@/lib/products/lookup-schema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { query?: string };
    const parsed = lookupQuerySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid request." },
        { status: 400 },
      );
    }

    const result = await lookupProduct(parsed.data.query);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Product lookup failed:", error);
    return NextResponse.json(
      { error: "Could not look up product. Try again." },
      { status: 500 },
    );
  }
}
