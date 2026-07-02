export const en = {
  brand: {
    name: "Skincare for You",
  },
  nav: {
    today: "Today",
    products: "Products",
    routines: "Routines",
    body: "Body",
  },
  language: {
    label: "Language",
    es419: "Español",
    en: "English",
  },
  common: {
    loading: "Loading…",
    step: "step",
    steps: "steps",
    routine: "routine",
    routines: "routines",
    item: "item",
    items: "items",
    product: "product",
    products: "products",
    interaction: "interaction",
    interactions: "interactions",
    pairing: "pairing",
    pairings: "pairings",
    note: "note",
    notes: "notes",
    check: "check",
    checks: "checks",
    default: "Default",
    tryAgain: "Try again",
    saveToShelf: "Save to my shelf",
    shopAmazon: "Shop on Amazon",
    productPage: "Product page",
    downloadPdf: "Download PDF",
    addProduct: "Add product",
    allClear: "All clear",
    reviewSuggested: "Review suggested",
    noImage: "No image",
    removeProduct: "Remove {name}",
    fullIngredientList: "Full ingredient list ({count})",
    howToUse: "How to use",
    activeIngredients: "Active ingredients",
    todayPrefix: "Today · ",
  },
  enums: {
    frequency: {
      daily: "daily",
      weekly: "weekly",
      monthly: "monthly",
    },
    timeOfDay: {
      morning: "morning",
      evening: "evening",
      any: "any time",
    },
    category: {
      cleanser: "cleanser",
      toner: "toner",
      serum: "serum",
      treatment: "treatment",
      eye_cream: "eye cream",
      moisturizer: "moisturizer",
      sunscreen: "sunscreen",
      exfoliant: "exfoliant",
      mask: "mask",
      other: "other",
    },
    cyclePhase: {
      menstrual: "Menstrual",
      follicular: "Follicular",
      ovulation: "Ovulation",
      luteal: "Luteal",
      none: "Not tracking",
    },
    lifeStage: {
      none: "Not specified",
      pregnant: "Pregnant",
      postpartum: "Postpartum",
      breastfeeding: "Breastfeeding",
      perimenopause: "Perimenopause",
      menopause: "Menopause",
    },
    weightChange: {
      stable: "Mostly stable",
      gaining: "Gaining recently",
      losing: "Losing recently",
      prefer_not_to_say: "Prefer not to say",
    },
    severity: {
      avoid: "Avoid layering",
      caution: "Use with care",
      separate: "Separate timing",
    },
  },
  schedule: {
    everyDay: "every day",
    sundays: "Sundays",
    firstOfMonth: "1st of the month",
    morningRoutine: "Morning routine",
    eveningRoutine: "Evening routine",
    eveningFrequency: "Evening · {frequency}",
  },
  greeting: {
    morning: "Good morning",
    afternoon: "Good afternoon",
    evening: "Good evening",
  },
  pages: {
    home: {
      loading: "Loading your routine…",
      title: "Today's skin care",
      emptyTitle: "Start your shelf",
      emptyDescription:
        "Add products you own. Routines and conflict checks update automatically.",
      emptyRoutines:
        "No routines scheduled for today. Check weekly or monthly tabs.",
    },
    products: {
      loading: "Loading products…",
      title: "My products",
      description:
        "Your curated shelf with photos, brand links, and shop links. {count} {itemsLabel} stored locally on your device.",
    },
    routines: {
      loading: "Loading routines…",
      title: "Routines",
      emptyDescription:
        "Add products first — your daily, weekly, and monthly routines will appear here.",
      description:
        "What to use and when — open a routine for steps and safety checks.",
      emptyFrequency: "No {frequency} products yet.",
      routineCount: "{count} {routineLabel} · {schedule}",
    },
    body: {
      loading: "Loading body settings…",
      title: "Body & cycle",
      description:
        "Optional context for your skin — menstrual phase, life stage, and weight changes. Routines and tips adapt locally on your device.",
      masterToggle: "Body-aware routines",
      masterHelp: "Turn on to adjust routines and guidance from the settings below.",
      menstrualTitle: "Menstrual cycle",
      trackMenstrual: "Track menstrual phase",
      trackMenstrualHelp:
        "Gentle limits on harsh actives during menstrual and luteal days.",
      lastPeriod: "Last period start",
      cycleLength: "Cycle length (days)",
      periodLength: "Period length (days)",
      lifeStageTitle: "Life stage",
      lifeStageLabel: "Current life stage",
      lifeStagePlaceholder: "Choose life stage",
      postpartumWeeks: "Weeks since delivery",
      postpartumHelp:
        "Weeks 0–11 hold retinoids and daily strong acids; week 12+ gradually allows reintroduction.",
      weightTitle: "Weight changes",
      includeWeight: "Include weight context",
      includeWeightHelp:
        "Adds hydration and barrier tips — never sent off-device.",
      recentChange: "Recent change",
      heldProductsTitle: "Products held from routines",
    },
  },
  privacy: {
    title: "Private on this device only",
    body:
      "Cycle dates, life stage, and weight preferences are saved in your browser's local database (IndexedDB). They are never sent to our servers — we have no way to see them.",
  },
  bodyBanner: {
    fallback: "Body-aware routines are on",
    day: "day {day}",
    week: "week {week}",
    factorMenstrual: "Menstrual · {phase}",
    factorLifeStage: "Life stage · {stage}",
    factorLifeStageWeek: "Life stage · {stage} (week {week})",
    factorWeight: "Weight · {change}",
  },
  bodyGuidance: {
    pregnant1:
      "Pregnancy mode: retinoids and some daily acids are held from routines.",
    pregnant2: "Always confirm product use with your prenatal care team.",
    breastfeeding:
      "Breastfeeding mode: retinoids stay off routines unless your clinician approves.",
    postpartumNeedWeeks:
      "Postpartum mode: add weeks since delivery for tailored guidance.",
    postpartumEarly1:
      "Postpartum week {week}: gentle cleansing and barrier support first.",
    postpartumEarly2:
      "Strong actives and retinoids are held until your skin has recovered.",
    postpartumLate:
      "Postpartum week {week}: you can gradually reintroduce actives if tolerated.",
    perimenopause:
      "Perimenopause: skin may swing between dry and reactive — consistency helps.",
    menopause: "Menopause: prioritize ceramides, hydration, and daily SPF.",
    weightGaining:
      "Recent weight gain: stretch-prone areas benefit from regular moisturizer.",
    weightLosing:
      "Recent weight loss: keep barrier support steady to help skin adjust.",
    cycleMenstrual:
      "Skin may be more sensitive. Prioritize gentle cleansing and barrier support.",
    cycleFollicular:
      "Skin often tolerates actives well. Good phase for treatments and exfoliation.",
    cycleOvulation:
      "Oil production may increase. Lightweight hydration and consistent SPF help.",
    cycleLuteal:
      "Breakouts can flare. Consider BHA and avoid introducing harsh new actives.",
  },
  lifeStageDescription: {
    none: "No life-stage adjustments beyond your other settings.",
    pregnant:
      "Retinoids and some strong acids are held from routines. Barrier care is prioritized.",
    postpartum:
      "Early weeks favor gentle care; actives are reintroduced gradually as you heal.",
    breastfeeding:
      "Similar caution to pregnancy for retinoids until you and your clinician agree.",
    perimenopause: "Hydration and barrier support help as hormones shift.",
    menopause: "Focus on moisture retention and gentle, consistent actives.",
  },
  safetyCheck: {
    title: "Safety check",
    collapsed: "{passed} of {total} checks passed · tap to see details",
    layeringTips: "Layering tips",
    checks: {
      applicationOrder: {
        label: "Layering order",
        passed:
          "Products are ordered cleanse → treat → hydrate → protect.",
        failed:
          "The step order may not match how these products should be layered.",
      },
      ingredientSafety: {
        label: "Ingredient pairings",
        failed:
          "{count} pairing in this routine should not be used together.",
        failedPlural:
          "{count} pairings in this routine should not be used together.",
        passedCaution:
          "No serious conflicts; {count} note worth reading below.",
        passedCautionPlural:
          "No serious conflicts; {count} notes worth reading below.",
        passed: "Nothing in this routine conflicts on ingredients.",
      },
      shelfAlignment: {
        label: "Schedule match",
        passed:
          "Every product belongs in this routine's frequency and time of day.",
        failed:
          "{count} product doesn't quite match this routine's schedule.",
        failedPlural:
          "{count} products don't quite match this routine's schedule.",
      },
    },
    reviewDuplicate:
      "Multiple {categories} steps — confirm layering order with your skin goals.",
    reviewMenstrual:
      "Adjusted for your current menstrual phase — harsher actives may be limited on sensitive days.",
  },
  exclusions: {
    shelf:
      "{count} product held off routines due to ingredient conflicts.",
    shelfPlural:
      "{count} products held off routines due to ingredient conflicts.",
    shelfItem: "Kept with {name} instead.",
    routine:
      "{count} product held off routines",
    routinePlural: "{count} products held off routines",
    routineItem: "— {reason} Kept with {name} instead.",
  },
  exclusionReason: {
    pregnancy:
      "Held during pregnancy or breastfeeding — check with your clinician.",
    postpartum: "Held during early postpartum recovery — reintroduce when ready.",
    menstrual:
      "Held on {phase} phase days — save harsh actives for less sensitive times.",
    default: "Held based on your body settings.",
    ingredient: "{reason}",
  },
  guide: {
    title: "Routine guide",
    description:
      "Ingredient interactions and a printable PDF of your shelf and routines.",
  },
  conflicts: {
    summary: "{count} ingredient interaction",
    summaryPlural: "{count} ingredient interactions",
    tapReview: "Tap to review all notes",
    allTitle: "All ingredient interactions",
    allDescription: "Across your full product shelf.",
    routineTitle: "Routine interactions",
    routineDescription: "Products in this routine that may conflict.",
    stepTitle: "Step interaction",
    stepDescription: "Notes for this product in today's routine.",
    defaultTitle: "Ingredient interactions",
    defaultDescription:
      "How these products interact when used in the same routine.",
    more: "+{count} more",
    why: "Why",
    whatToDo: "What to do",
    ingredients: "Ingredients",
    severityCount: "{count} {label}",
  },
  addProduct: {
    title: "Add a product",
    description:
      "Search by name or brand. Info is looked up with AI and saved on your device.",
    nameLabel: "Product name",
    namePlaceholder: "e.g. CeraVe Hydrating Cleanser",
    notFound: "Could not find product info. Try a more specific name.",
  },
  affiliate:
    "Shop on Amazon links may earn a commission at no extra cost to you. Set NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG in your environment to use your Associates tag.",
} ;

type DeepString<T> =
  T extends string
    ? string
    : T extends readonly (infer U)[]
      ? DeepString<U>[]
      : T extends object
        ? { [K in keyof T]: DeepString<T[K]> }
        : T;

export type Messages = DeepString<typeof en>;
