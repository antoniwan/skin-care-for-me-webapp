import Image from "next/image";
import { Trash2 } from "lucide-react";
import type { Product } from "@/lib/types";
import { ProductIngredients } from "@/components/products/product-ingredients";
import { ProductLinks } from "@/components/products/product-links";
import { ProductMetaBadges } from "@/components/products/product-meta-badges";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProductCardProps {
  product: Product;
  onRemove: (id: string) => void;
}

export function ProductCard({ product, onRemove }: ProductCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="flex gap-4 p-4 pb-0">
        <ProductImage product={product} />
        <CardHeader className="min-w-0 flex-1 space-y-1 p-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 space-y-1">
              {product.brand && (
                <p className="text-xs font-medium uppercase tracking-wide text-primary">
                  {product.brand}
                </p>
              )}
              <CardTitle className="font-heading text-base leading-snug">
                {product.name}
              </CardTitle>
              {product.size && (
                <p className="text-xs text-muted-foreground">{product.size}</p>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon-sm"
              className="shrink-0"
              aria-label={`Remove ${product.name}`}
              disabled={product.isSeed}
              onClick={() => void onRemove(product.id)}
            >
              <Trash2
                className={
                  product.isSeed
                    ? "size-4 text-muted-foreground/40"
                    : "size-4 text-muted-foreground"
                }
              />
            </Button>
          </div>
        </CardHeader>
      </div>

      <CardContent className="space-y-3 pt-3">
        <ProductMetaBadges
          category={product.category}
          frequency={product.frequency}
          timeOfDay={product.timeOfDay}
          isSeed={product.isSeed}
        />

        {product.tagline && (
          <p className="text-sm font-medium text-foreground">{product.tagline}</p>
        )}

        <ProductLinks
          manufacturerUrl={product.manufacturerUrl}
          amazonAsin={product.amazonAsin}
        />

        {product.highlights && product.highlights.length > 0 && (
          <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            {product.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        )}

        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            How to use
          </p>
          <p className="text-sm text-muted-foreground">{product.usageGuide}</p>
        </div>

        {product.activeIngredients.length > 0 && (
          <div className="space-y-1">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Active ingredients
            </p>
            <p className="text-sm capitalize text-foreground">
              {product.activeIngredients.join(" · ")}
            </p>
          </div>
        )}

        {product.notes && (
          <p className="rounded-md bg-muted/50 px-3 py-2 text-sm text-muted-foreground">
            {product.notes}
          </p>
        )}

        <ProductIngredients ingredients={product.ingredients} />
      </CardContent>
    </Card>
  );
}

function ProductImage({ product }: { product: Product }) {
  if (product.imageUrl) {
    const isSvg = product.imageUrl.endsWith(".svg");

    if (isSvg) {
      return (
        <div className="relative size-24 shrink-0 overflow-hidden rounded-lg border bg-muted/30">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.imageUrl}
            alt={product.name}
            className="size-full object-contain p-1"
          />
        </div>
      );
    }

    return (
      <div className="relative size-24 shrink-0 overflow-hidden rounded-lg border bg-muted/30">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="96px"
          className="object-contain p-1"
        />
      </div>
    );
  }

  return (
    <div
      className="flex size-24 shrink-0 items-center justify-center rounded-lg border bg-muted/30 text-center text-[10px] font-medium uppercase tracking-wide text-muted-foreground"
      aria-hidden
    >
      No image
    </div>
  );
}
