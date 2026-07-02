const AMAZON_ASSOCIATE_TAG =
  process.env.NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG?.trim() || "";

/** Build an Amazon product URL, appending the associate tag when configured. */
export function buildAmazonAffiliateUrl(asin: string): string {
  const base = `https://www.amazon.com/dp/${asin}`;
  if (!AMAZON_ASSOCIATE_TAG) return base;
  return `${base}?tag=${encodeURIComponent(AMAZON_ASSOCIATE_TAG)}`;
}

export function hasAmazonAffiliateTag(): boolean {
  return AMAZON_ASSOCIATE_TAG.length > 0;
}
