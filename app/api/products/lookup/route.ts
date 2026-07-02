import { lookupProduct } from "@/lib/products/lookup";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { query } = (await request.json()) as { query?: string };

    if (!query?.trim()) {
      return NextResponse.json(
        { error: "Product name is required." },
        { status: 400 },
      );
    }

    const result = await lookupProduct(query.trim());
    return NextResponse.json(result);
  } catch (error) {
    console.error("Product lookup failed:", error);
    return NextResponse.json(
      { error: "Could not look up product. Try again." },
      { status: 500 },
    );
  }
}
