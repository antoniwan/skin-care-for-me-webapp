"use client";

import { useAppDataContext } from "@/components/providers/app-data-provider";
import { AffiliateDisclosure } from "@/components/products/affiliate-disclosure";
import { AddProductSheet } from "@/components/products/add-product-sheet";
import { ProductCard } from "@/components/products/product-card";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { PageLoading } from "@/components/layout/page-loading";
import { pluralize } from "@/lib/format";

export function ProductsPage() {
  const { products, loading, addProductFromLookup, removeProduct } =
    useAppDataContext();

  if (loading) {
    return <PageLoading message="Loading products…" />;
  }

  return (
    <PageContainer>
      <PageHeader
        title="My products"
        description={`Your curated shelf with photos, brand links, and shop links. ${products.length} ${pluralize(products.length, "item")} stored locally on your device.`}
      />

      <AddProductSheet onAdd={addProductFromLookup} />

      <div className="space-y-3">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onRemove={removeProduct}
          />
        ))}
      </div>

      <AffiliateDisclosure />
    </PageContainer>
  );
}
