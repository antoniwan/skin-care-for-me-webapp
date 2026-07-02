"use client";

import { useState } from "react";
import { Loader2, Plus, Search, Sparkles } from "lucide-react";
import { lookupProductAction } from "@/app/(app)/products/actions";
import type { ProductLookupResult } from "@/lib/types";
import { ProductMetaBadges } from "@/components/products/product-meta-badges";
import { useTranslation } from "@/components/providers/locale-provider";
import { PRODUCT_LOOKUP_ENABLED } from "@/lib/constants/features";
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
import { cn } from "@/lib/utils";

interface AddProductSheetProps {
  onAdd?: (lookup: ProductLookupResult) => Promise<unknown>;
  className?: string;
}

export function AddProductSheet({ onAdd, className }: AddProductSheetProps) {
  if (!PRODUCT_LOOKUP_ENABLED) {
    return <AddProductUnavailable className={className} />;
  }

  return <AddProductSheetEnabled onAdd={onAdd} className={className} />;
}

function AddProductUnavailable({ className }: { className?: string }) {
  const { t } = useTranslation();

  return (
    <div
      className={cn(
        "flex w-full items-start gap-3 rounded-xl border border-border/70 bg-muted/25 px-4 py-3.5",
        className,
      )}
      role="status"
    >
      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-background shadow-sm ring-1 ring-border/60">
        <Plus className="size-4 text-muted-foreground" aria-hidden />
      </div>
      <div className="min-w-0 flex-1 pt-0.5">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <p className="text-sm font-medium text-foreground">
            {t("common.addProduct")}
          </p>
          <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
            <Sparkles className="size-3" aria-hidden />
            {t("addProduct.comingSoon")}
          </span>
        </div>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
          {t("addProduct.unavailable")}
        </p>
      </div>
    </div>
  );
}

function AddProductSheetEnabled({
  onAdd,
  className,
}: AddProductSheetProps) {
  const { t } = useTranslation();
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
      const result = await lookupProductAction(query.trim());

      if (!result.success) {
        setError(result.error);
        return;
      }

      setPreview(result.data);
    } catch {
      setError(t("addProduct.notFound"));
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    if (!preview || !onAdd) return;
    await onAdd(preview);
    setOpen(false);
    setQuery("");
    setPreview(null);
    setError(null);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className={cn("w-full gap-2", className)} size="lg">
          <Plus className="size-4" />
          {t("common.addProduct")}
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="max-h-[90dvh] overflow-y-auto rounded-t-2xl">
        <SheetHeader>
          <SheetTitle className="font-heading">{t("addProduct.title")}</SheetTitle>
          <SheetDescription>{t("addProduct.description")}</SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="product-query">{t("addProduct.nameLabel")}</Label>
            <div className="flex gap-2">
              <Input
                id="product-query"
                placeholder={t("addProduct.namePlaceholder")}
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
                {t("common.saveToShelf")}
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
