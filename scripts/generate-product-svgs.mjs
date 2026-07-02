import { mkdirSync, writeFileSync } from "node:fs";

mkdirSync("public/products", { recursive: true });

const products = [
  {
    file: "clinique-all-about-clean-mild.svg",
    brand: "CLINIQUE",
    name: "All About Clean Mild",
    color: "#6B8F71",
  },
  {
    file: "clinique-clarifying-lotion-2.svg",
    brand: "CLINIQUE",
    name: "Clarifying Lotion 2",
    color: "#6B8F71",
  },
  {
    file: "clinique-ddml-plus.svg",
    brand: "CLINIQUE",
    name: "DDML+",
    color: "#6B8F71",
  },
  {
    file: "clinique-moisture-surge-overnight.svg",
    brand: "CLINIQUE",
    name: "Moisture Surge Overnight",
    color: "#6B8F71",
  },
  {
    file: "cerave-hydrating-mineral-spf30.svg",
    brand: "CERAVE",
    name: "Mineral SPF 30",
    color: "#005595",
  },
  {
    file: "fresh-sugar-face-polish.svg",
    brand: "FRESH",
    name: "Sugar Face Polish",
    color: "#B5651D",
  },
  {
    file: "medicube-zero-pore-pad.svg",
    brand: "MEDICUBE",
    name: "Zero Pore Pad 2.0",
    color: "#E91E8C",
  },
  {
    file: "medicube-pdrn-eye-mask.svg",
    brand: "MEDICUBE",
    name: "PDRN Eye Mask",
    color: "#E91E8C",
  },
];

for (const product of products) {
  const svg = [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" role="img" aria-label="${product.brand} ${product.name}">`,
    "<defs><linearGradient id=\"g\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop offset=\"0%\" stop-color=\"#faf8f5\"/><stop offset=\"100%\" stop-color=\"#efe9e0\"/></linearGradient></defs>",
    "<rect width=\"200\" height=\"200\" fill=\"url(#g)\" rx=\"16\"/>",
    `<rect x="72" y="42" width="56" height="96" rx="10" fill="#fff" stroke="${product.color}" stroke-width="2.5"/>`,
    `<rect x="80" y="32" width="40" height="16" rx="5" fill="${product.color}"/>`,
    `<ellipse cx="100" cy="118" rx="18" ry="8" fill="${product.color}" opacity="0.12"/>`,
    `<text x="100" y="162" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="${product.color}" font-weight="700">${product.brand}</text>`,
    `<text x="100" y="178" text-anchor="middle" font-family="system-ui,sans-serif" font-size="8" fill="#6b7280">${product.name}</text>`,
    "</svg>",
  ].join("");

  writeFileSync(`public/products/${product.file}`, svg);
}

console.log(`Generated ${products.length} product SVGs.`);
