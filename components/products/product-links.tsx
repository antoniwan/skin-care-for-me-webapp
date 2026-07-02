import { buildAmazonAffiliateUrl } from "@/lib/products/affiliate";
import { ExternalLink, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductLinksProps {
  manufacturerUrl?: string;
  amazonAsin?: string;
}

export function ProductLinks({
  manufacturerUrl,
  amazonAsin,
}: ProductLinksProps) {
  if (!manufacturerUrl && !amazonAsin) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {manufacturerUrl && (
        <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs" asChild>
          <a
            href={manufacturerUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink className="size-3.5" />
            Manufacturer
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
            Shop on Amazon
          </a>
        </Button>
      )}
    </div>
  );
}
