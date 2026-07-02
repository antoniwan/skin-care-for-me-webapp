"use client";

import { useAppDataContext } from "@/components/providers/app-data-provider";
import { useTranslation } from "@/components/providers/locale-provider";
import { AffiliateDisclosure } from "@/components/products/affiliate-disclosure";
import { AddProductSheet } from "@/components/products/add-product-sheet";
import { ProductCard } from "@/components/products/product-card";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { PageLoading } from "@/components/layout/page-loading";
import { plural } from "@/lib/i18n/ui";

export function ProductsPage() {
  const { products, loading, addProductFromLookup, removeProduct } =
    useAppDataContext();
  const { t } = useTranslation();

  if (loading) {
    return <PageLoading message={t("pages.products.loading")} />;
  }

  return (
    <PageContainer>
      <PageHeader
        title={t("pages.products.title")}
        description={t("pages.products.description", {
          count: products.length,
          itemsLabel: plural(
            t,
            products.length,
            "common.item",
            "common.items",
          ),
        })}
      />

      <AddProductSheet onAdd={addProductFromLookup} />

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
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
