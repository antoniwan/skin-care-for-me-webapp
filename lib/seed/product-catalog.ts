import type { Product } from "../types";
import { en } from "./copy/en";
import { SEED_PRODUCT_IDS } from "./product-ids";

/** Commerce metadata for curated seed products (non-translatable). */
export interface SeedProductCatalogEntry {
  imageUrl: string;
  manufacturerUrl: string;
  productPageLabel?: string;
  amazonAsin: string;
  size?: string;
}

/**
 * Verified product page URLs and Amazon ASINs (checked 2026-07).
 * Clinique and Fresh use Ulta PDPs — brand sites often block bots or 404.
 */
export const SEED_PRODUCT_CATALOG: Record<string, SeedProductCatalogEntry> = {
  [SEED_PRODUCT_IDS.cliniqueAllAboutCleanSoap]: {
    imageUrl: "/products/clinique-all-about-clean-mild.svg",
    manufacturerUrl:
      "https://www.ulta.com/p/all-about-clean-liquid-facial-soap-cleanser-mild-xlsImpprod10791729",
    productPageLabel: "Ulta",
    amazonAsin: "B002RBTB8C",
    size: "6.7 fl oz / 200 ml",
  },
  [SEED_PRODUCT_IDS.cliniqueClarifyingLotion2]: {
    imageUrl: "/products/clinique-clarifying-lotion-2.svg",
    manufacturerUrl:
      "https://www.ulta.com/p/clarifying-face-lotion-toner-2-dry-combination-xlsImpprod10791737",
    productPageLabel: "Ulta",
    amazonAsin: "B000VBMX4O",
    size: "6.7 fl oz / 200 ml",
  },
  [SEED_PRODUCT_IDS.cliniqueDramaticallyDifferentLotion]: {
    imageUrl: "/products/clinique-ddml-plus.svg",
    manufacturerUrl:
      "https://www.ulta.com/p/dramatically-different-moisturizing-lotion-face-xlsImpprod10791743",
    productPageLabel: "Ulta",
    amazonAsin: "B00CVZ3NJ2",
    size: "4.2 fl oz / 125 ml",
  },
  [SEED_PRODUCT_IDS.cliniqueMoistureSurgeHydrator]: {
    imageUrl: "/products/clinique-moisture-surge-100h.jpg",
    manufacturerUrl:
      "https://www.ulta.com/p/moisture-surge-100h-auto-replenishing-hydrator-gel-moisturizer-with-hyaluronic-acid-pimprod2021615?sku=2576545",
    productPageLabel: "Ulta",
    amazonAsin: "B08PDLD8JV",
    size: "1.7 fl oz / 50 ml",
  },
  [SEED_PRODUCT_IDS.cliniqueMoistureSurgeOvernight]: {
    imageUrl: "/products/clinique-moisture-surge-overnight.svg",
    manufacturerUrl:
      "https://www.ulta.com/p/moisture-surge-overnight-face-mask-xlsImpprod10791821",
    productPageLabel: "Ulta",
    amazonAsin: "B00HSZRQQQ",
    size: "3.4 fl oz / 100 ml",
  },
  [SEED_PRODUCT_IDS.ceraveHydratingMineralSunscreen]: {
    imageUrl: "/products/cerave-hydrating-mineral-spf30.svg",
    manufacturerUrl:
      "https://www.cerave.com/sunscreen/face/hydrating-mineral-sunscreen-face-lotion-spf-30",
    productPageLabel: "CeraVe.com",
    amazonAsin: "B084V4L9H1",
    size: "2.5 fl oz / 75 ml",
  },
  [SEED_PRODUCT_IDS.freshSugarFacePolish]: {
    imageUrl: "/products/fresh-sugar-face-polish.svg",
    manufacturerUrl:
      "https://www.ulta.com/p/sugar-face-polish-exfoliator-xlsImpprod10791731",
    productPageLabel: "Ulta",
    amazonAsin: "B0081IOGNU",
    size: "4.2 oz / 125 g",
  },
  [SEED_PRODUCT_IDS.medicubeZeroPorePad]: {
    imageUrl: "/products/medicube-zero-pore-pad.svg",
    manufacturerUrl: "https://medicube.us/products/zero-pore-pad-1",
    productPageLabel: "Medicube",
    amazonAsin: "B09V7Z4TJG",
    size: "70 pads",
  },
  [SEED_PRODUCT_IDS.medicubePdrnEyeMask]: {
    imageUrl: "/products/medicube-pdrn-eye-mask.svg",
    manufacturerUrl:
      "https://www.stylekorean.com/shop/medicube-pdrn-pink-caffeine-collagen-eye-patch-60ea/1778132535",
    productPageLabel: "StyleKorean",
    amazonAsin: "B0G38FGSKL",
    size: "60 patches (30 pairs)",
  },
};

export function getSeedCatalogEntry(
  productId: string,
): SeedProductCatalogEntry | undefined {
  return SEED_PRODUCT_CATALOG[productId];
}

export function enrichSeedProduct(product: Product): Product {
  const catalog = getSeedCatalogEntry(product.id);
  const copy = en[product.id as keyof typeof en];
  if (!catalog && !copy) return product;

  return {
    ...product,
    ...(copy
      ? {
          name: copy.name,
          usageGuide: copy.usageGuide,
          notes: copy.notes,
          tagline: copy.tagline,
          highlights: copy.highlights,
        }
      : {}),
    ...(catalog
      ? {
          imageUrl: catalog.imageUrl,
          manufacturerUrl: catalog.manufacturerUrl,
          productPageLabel: catalog.productPageLabel,
          amazonAsin: catalog.amazonAsin,
          size: catalog.size,
        }
      : {}),
  };
}
