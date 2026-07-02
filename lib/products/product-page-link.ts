/** Human-readable label for an external product page button. */
export function getProductPageLabel(url: string, explicitLabel?: string): string {
  if (explicitLabel) return explicitLabel;

  try {
    const host = new URL(url).hostname.replace(/^www\./, "");
    const labels: Record<string, string> = {
      "clinique.com": "Clinique.com",
      "cerave.com": "CeraVe.com",
      "fresh.com": "Fresh.com",
      "medicube.us": "Medicube",
      "stylekorean.com": "StyleKorean",
      "ulta.com": "Ulta",
      "sephora.com": "Sephora",
    };

    return labels[host] ?? "Product page";
  } catch {
    return "Product page";
  }
}
