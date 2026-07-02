"use client";

import { useState } from "react";
import { Loader2, Plus, Search } from "lucide-react";
import type { ProductLookupResult } from "@/lib/types";
import { ProductMetaBadges } from "@/components/products/product-meta-badges";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface AddProductSheetProps {
  onAdd: (lookup: ProductLookupResult) => Promise<unknown>;
}

export function AddProductSheet({ onAdd }: AddProductSheetProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<ProductLookupResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleLookup() {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    setPreview(null);

    try {
      const res = await fetch("/api/products/lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: query.trim() }),
      });

      if (!res.ok) {
        throw new Error("Lookup failed");
      }

      const data = (await res.json()) as ProductLookupResult;
      setPreview(data);
    } catch {
      setError("Could not find product info. Try a more specific name.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    if (!preview) return;
    await onAdd(preview);
    setOpen(false);
    setQuery("");
    setPreview(null);
    setError(null);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="w-full gap-2" size="lg">
          <Plus className="size-4" />
          Add product
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="max-h-[90dvh] overflow-y-auto rounded-t-2xl">
        <SheetHeader>
          <SheetTitle className="font-heading">Add a product</SheetTitle>
          <SheetDescription>
            Search by name or brand. Info is looked up with AI and saved on your device.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="product-query">Product name</Label>
            <div className="flex gap-2">
              <Input
                id="product-query"
                placeholder="e.g. CeraVe Hydrating Cleanser"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && void handleLookup()}
              />
              <Button
                type="button"
                variant="secondary"
                onClick={() => void handleLookup()}
                disabled={loading || !query.trim()}
              >
                {loading ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Search className="size-4" />
                )}
              </Button>
            </div>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          {preview && (
            <div className="space-y-3 rounded-xl border bg-muted/40 p-4">
              <div>
                <p className="font-heading font-semibold">{preview.name}</p>
                {preview.brand && (
                  <p className="text-sm text-muted-foreground">{preview.brand}</p>
                )}
              </div>
              <ProductMetaBadges
                category={preview.category}
                frequency={preview.suggestedFrequency}
                timeOfDay={preview.suggestedTimeOfDay}
              />
              <p className="text-sm">{preview.usageGuide}</p>
              {preview.ingredients.length > 0 && (
                <p className="text-xs text-muted-foreground">
                  {preview.ingredients.slice(0, 8).join(", ")}
                  {preview.ingredients.length > 8 ? "…" : ""}
                </p>
              )}
              <Button className="w-full" onClick={() => void handleSave()}>
                Save to my shelf
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
