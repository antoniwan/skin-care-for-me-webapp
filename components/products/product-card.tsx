import { Trash2 } from "lucide-react";
import type { Product } from "@/lib/types";
import { ProductMetaBadges } from "@/components/products/product-meta-badges";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProductCardProps {
  product: Product;
  onRemove: (id: string) => void;
}

export function ProductCard({ product, onRemove }: ProductCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-2 pb-2">
        <div>
          <CardTitle className="font-heading text-base">{product.name}</CardTitle>
          {product.brand && (
            <p className="text-sm text-muted-foreground">{product.brand}</p>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon-sm"
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
      </CardHeader>
      <CardContent className="space-y-2">
        <ProductMetaBadges
          category={product.category}
          frequency={product.frequency}
          timeOfDay={product.timeOfDay}
          isSeed={product.isSeed}
        />
        <p className="text-sm text-muted-foreground">{product.usageGuide}</p>
      </CardContent>
    </Card>
  );
}
