import type { Product } from "../types";
import { SEED_PRODUCT_IDS } from "./product-ids";

/** Rich commerce + display metadata for curated seed products. */
export interface SeedProductCatalogEntry {
  imageUrl: string;
  manufacturerUrl: string;
  productPageLabel?: string;
  amazonAsin: string;
  size?: string;
  tagline?: string;
  highlights?: string[];
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
    tagline: "Step 1 — gentle liquid cleanser for dry combination skin.",
    highlights: [
      "Dermatologist-developed 3-Step System cleanser",
      "Soft, non-drying lather with sucrose",
      "Allergy tested and 100% fragrance free",
    ],
  },
  [SEED_PRODUCT_IDS.cliniqueClarifyingLotion2]: {
    imageUrl: "/products/clinique-clarifying-lotion-2.svg",
    manufacturerUrl:
      "https://www.ulta.com/p/clarifying-face-lotion-toner-2-dry-combination-xlsImpprod10791737",
    productPageLabel: "Ulta",
    amazonAsin: "B000VBMX4O",
    size: "6.7 fl oz / 200 ml",
    tagline: "Step 2 — daily liquid exfoliator with BHA for dry combination skin.",
    highlights: [
      "Sweeps away dulling flakes and debris",
      "Prepares skin for moisturizer absorption",
      "Skin Type 2 formula — not for very dry or oily types",
    ],
  },
  [SEED_PRODUCT_IDS.cliniqueDramaticallyDifferentLotion]: {
    imageUrl: "/products/clinique-ddml-plus.svg",
    manufacturerUrl:
      "https://www.ulta.com/p/dramatically-different-moisturizing-lotion-face-xlsImpprod10791743",
    productPageLabel: "Ulta",
    amazonAsin: "B00CVZ3NJ2",
    size: "4.2 fl oz / 125 ml",
    tagline: "Step 3 — barrier-strengthening lotion for very dry to dry-combination skin.",
    highlights: [
      "Strengthens skin's moisture barrier",
      "Slippery, fast-absorbing lotion texture",
      "Pairs with the Clinique 3-Step routine",
    ],
  },
  [SEED_PRODUCT_IDS.cliniqueMoistureSurgeHydrator]: {
    imageUrl: "/products/clinique-moisture-surge-100h.jpg",
    manufacturerUrl:
      "https://www.ulta.com/p/moisture-surge-100h-auto-replenishing-hydrator-gel-moisturizer-with-hyaluronic-acid-pimprod2021615?sku=2576545",
    productPageLabel: "Ulta",
    amazonAsin: "B08PDLD8JV",
    size: "1.7 fl oz / 50 ml",
    tagline: "Oil-free gel-cream hydrator with dual-weight hyaluronic acid.",
    highlights: [
      "100-hour auto-replenishing hydration claim",
      "Can be used as a 5-minute moisture mask",
      "Aloe bioferment + hyaluronic acid complex",
    ],
  },
  [SEED_PRODUCT_IDS.cliniqueMoistureSurgeOvernight]: {
    imageUrl: "/products/clinique-moisture-surge-overnight.svg",
    manufacturerUrl:
      "https://www.ulta.com/p/moisture-surge-overnight-face-mask-xlsImpprod10791821",
    productPageLabel: "Ulta",
    amazonAsin: "B00HSZRQQQ",
    size: "3.4 fl oz / 100 ml",
    tagline: "Leave-on overnight mask for intensive evening hydration.",
    highlights: [
      "Oil-free, non-comedogenic overnight formula",
      "Shea butter, mango seed butter, and panthenol",
      "Last step of evening routine — no rinse",
    ],
  },
  [SEED_PRODUCT_IDS.ceraveHydratingMineralSunscreen]: {
    imageUrl: "/products/cerave-hydrating-mineral-spf30.svg",
    manufacturerUrl:
      "https://www.cerave.com/sunscreen/face/hydrating-mineral-sunscreen-face-lotion-spf-30",
    productPageLabel: "CeraVe.com",
    amazonAsin: "B084V4L9H1",
    size: "2.5 fl oz / 75 ml",
    tagline: "100% mineral SPF 30 with ceramides, niacinamide, and hyaluronic acid.",
    highlights: [
      "Titanium dioxide 6% + zinc oxide 5%",
      "NEA Seal of Acceptance",
      "Hawaii-compliant mineral filters",
    ],
  },
  [SEED_PRODUCT_IDS.freshSugarFacePolish]: {
    imageUrl: "/products/fresh-sugar-face-polish.svg",
    manufacturerUrl:
      "https://www.ulta.com/p/sugar-face-polish-exfoliator-xlsImpprod10791731",
    productPageLabel: "Ulta",
    amazonAsin: "B0081IOGNU",
    size: "4.2 oz / 125 g",
    tagline: "Brown sugar scrub and mask with strawberry and plum seed oils.",
    highlights: [
      "2-in-1 exfoliator and mask",
      "Dissolving sugar crystals — gentler than salt scrubs",
      "Use 3–4× weekly on damp skin",
    ],
  },
  [SEED_PRODUCT_IDS.medicubeZeroPorePad]: {
    imageUrl: "/products/medicube-zero-pore-pad.svg",
    manufacturerUrl: "https://medicube.us/products/zero-pore-pad-1",
    productPageLabel: "Medicube",
    amazonAsin: "B09V7Z4TJG",
    size: "70 pads",
    tagline: "Dual-texture toner pads with 4.5% lactic acid and 0.45% salicylic acid.",
    highlights: [
      "Embossed side for texture; silky side to finish",
      "Centella and panthenol to soothe",
      "Start 2–3 nights weekly; always follow with SPF",
    ],
  },
  [SEED_PRODUCT_IDS.medicubePdrnEyeMask]: {
    imageUrl: "/products/medicube-pdrn-eye-mask.svg",
    manufacturerUrl:
      "https://www.stylekorean.com/shop/medicube-pdrn-pink-caffeine-collagen-eye-patch-60ea/1778132535",
    productPageLabel: "StyleKorean",
    amazonAsin: "B0G38FGSKL",
    size: "60 patches (30 pairs)",
    tagline: "Hydrogel under-eye patches with PDRN, collagen, and caffeine.",
    highlights: [
      "Depuffing caffeine + hydrating collagen",
      "PDRN (sodium DNA) for firming support",
      "Use 2–3× weekly for 20–30 minutes",
    ],
  },
};

export function getSeedCatalogEntry(
  productId: string,
): SeedProductCatalogEntry | undefined {
  return SEED_PRODUCT_CATALOG[productId];
}

export function enrichSeedProduct(product: Product): Product {
  const catalog = getSeedCatalogEntry(product.id);
  if (!catalog) return product;

  return {
    ...product,
    imageUrl: catalog.imageUrl,
    manufacturerUrl: catalog.manufacturerUrl,
    productPageLabel: catalog.productPageLabel,
    amazonAsin: catalog.amazonAsin,
    size: catalog.size,
    tagline: catalog.tagline,
    highlights: catalog.highlights,
  };
}
