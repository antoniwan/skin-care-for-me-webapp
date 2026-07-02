"use client";

import { buildAmazonAffiliateUrl } from "@/lib/products/affiliate";
import { getProductPageLabel } from "@/lib/products/product-page-link";
import { useTranslation } from "@/components/providers/locale-provider";
import { ExternalLink, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductLinksProps {
  manufacturerUrl?: string;
  productPageLabel?: string;
  amazonAsin?: string;
}

export function ProductLinks({
  manufacturerUrl,
  productPageLabel,
  amazonAsin,
}: ProductLinksProps) {
  const { t } = useTranslation();

  if (!manufacturerUrl && !amazonAsin) return null;

  const pageLabel = manufacturerUrl
    ? getProductPageLabel(manufacturerUrl, productPageLabel)
    : null;

  return (
    <div className="flex flex-wrap gap-2">
      {manufacturerUrl && pageLabel && (
        <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs" asChild>
          <a
            href={manufacturerUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink className="size-3.5" />
            {pageLabel}
          </a>
        </Button>
      )}
      {amazonAsin && (
        <Button variant="secondary" size="sm" className="h-8 gap-1.5 text-xs" asChild>
          <a
            href={buildAmazonAffiliateUrl(amazonAsin)}
            target="_blank"
            rel="noopener noreferrer sponsored"
          >
            <ShoppingBag className="size-3.5" />
            {t("common.shopAmazon")}
          </a>
        </Button>
      )}
    </div>
  );
}
