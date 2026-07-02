"use client";

import { Trash2 } from "lucide-react";
import { useAppDataContext } from "@/components/providers/app-data-provider";
import { AddProductSheet } from "@/components/products/add-product-sheet";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ProductsPage() {
  const { products, loading, addProductFromLookup, removeProduct } =
    useAppDataContext();

  if (loading) {
    return <p className="text-muted-foreground">Loading products…</p>;
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-heading text-2xl font-semibold">My products</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Stored locally on your device. {products.length} item
          {products.length === 1 ? "" : "s"} including default starter products.
        </p>
      </header>

      <AddProductSheet onAdd={addProductFromLookup} />

      <div className="space-y-3">
        {products.map((product) => (
          <Card key={product.id}>
            <CardHeader className="flex flex-row items-start justify-between gap-2 pb-2">
              <div>
                <CardTitle className="font-heading text-base">
                  {product.name}
                </CardTitle>
                {product.brand && (
                  <p className="text-sm text-muted-foreground">{product.brand}</p>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label={`Remove ${product.name}`}
                disabled={product.isSeed}
                onClick={() => void removeProduct(product.id)}
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
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="capitalize">
                  {product.category.replace("_", " ")}
                </Badge>
                <Badge variant="outline">{product.frequency}</Badge>
                <Badge variant="outline">{product.timeOfDay}</Badge>
                {product.isSeed && (
                  <Badge variant="outline" className="border-primary/30 text-primary">
                    Default
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{product.usageGuide}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
