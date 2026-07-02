export const SEED_PRODUCT_IDS = {
  cliniqueClarifyingLotion2: "seed-clinique-clarifying-lotion-2",
  cliniqueMoistureSurgeHydrator: "seed-clinique-moisture-surge-hydrator",
  cliniqueAllAboutCleanSoap: "seed-clinique-all-about-clean-soap",
  freshSugarFacePolish: "seed-fresh-sugar-face-polish",
  medicubeZeroPorePad: "seed-medicube-zero-pore-pad",
  cliniqueMoistureSurgeOvernight: "seed-clinique-moisture-surge-overnight",
  medicubePdrnEyeMask: "seed-medicube-pdrn-eye-mask",
  cliniqueDramaticallyDifferentLotion: "seed-clinique-ddml-plus",
  ceraveHydratingMineralSunscreen: "seed-cerave-hydrating-mineral-spf30",
} as const;

export function isSeedProductId(id: string): boolean {
  return id.startsWith("seed-");
}
