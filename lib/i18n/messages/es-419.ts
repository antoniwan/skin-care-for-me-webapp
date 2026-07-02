import type { Messages } from "./en";

export const es419: Messages = {
  brand: {
    name: "Skincare for You",
  },
  nav: {
    today: "Hoy",
    products: "Productos",
    routines: "Rutinas",
    body: "Cuerpo",
  },
  language: {
    label: "Idioma",
    es419: "Español",
    en: "English",
  },
  common: {
    loading: "Cargando…",
    step: "paso",
    steps: "pasos",
    routine: "rutina",
    routines: "rutinas",
    item: "producto",
    items: "productos",
    product: "producto",
    products: "productos",
    interaction: "interacción",
    interactions: "interacciones",
    pairing: "combinación",
    pairings: "combinaciones",
    note: "nota",
    notes: "notas",
    check: "revisión",
    checks: "revisiones",
    default: "Predeterminado",
    tryAgain: "Intentar de nuevo",
    saveToShelf: "Guardar en mi estante",
    shopAmazon: "Comprar en Amazon",
    productPage: "Página del producto",
    downloadPdf: "Descargar PDF",
    addProduct: "Agregar producto",
    allClear: "Todo bien",
    reviewSuggested: "Revisar",
    noImage: "Sin imagen",
    removeProduct: "Quitar {name}",
    fullIngredientList: "Lista completa de ingredientes ({count})",
    howToUse: "Cómo usar",
    activeIngredients: "Ingredientes activos",
    todayPrefix: "Hoy · ",
  },
  enums: {
    frequency: {
      daily: "diario",
      weekly: "semanal",
      monthly: "mensual",
    },
    timeOfDay: {
      morning: "mañana",
      evening: "noche",
      any: "cualquier momento",
    },
    category: {
      cleanser: "limpiador",
      toner: "tónico",
      serum: "suero",
      treatment: "tratamiento",
      eye_cream: "contorno de ojos",
      moisturizer: "hidratante",
      sunscreen: "protector solar",
      exfoliant: "exfoliante",
      mask: "mascarilla",
      other: "otro",
    },
    cyclePhase: {
      menstrual: "Menstrual",
      follicular: "Folicular",
      ovulation: "Ovulación",
      luteal: "Lútea",
      none: "Sin seguimiento",
    },
    lifeStage: {
      none: "Sin especificar",
      pregnant: "Embarazo",
      postpartum: "Posparto",
      breastfeeding: "Lactancia",
      perimenopause: "Perimenopausia",
      menopause: "Menopausia",
    },
    weightChange: {
      stable: "Estable",
      gaining: "Subiendo de peso",
      losing: "Bajando de peso",
      prefer_not_to_say: "Prefiero no decir",
    },
    severity: {
      avoid: "Evitar juntar",
      caution: "Usar con cuidado",
      separate: "Separar horarios",
    },
  },
  schedule: {
    everyDay: "todos los días",
    sundays: "los domingos",
    firstOfMonth: "el día 1 de cada mes",
    morningRoutine: "Rutina de la mañana",
    eveningRoutine: "Rutina de la noche",
    eveningFrequency: "Noche · {frequency}",
  },
  greeting: {
    morning: "Buenos días",
    afternoon: "Buenas tardes",
    evening: "Buenas noches",
  },
  pages: {
    home: {
      loading: "Cargando tu rutina…",
      title: "Tu cuidado de hoy",
      emptyTitle: "Empieza tu estante",
      emptyDescription:
        "Tu estante incluye productos de demostración. Agregar los tuyos llegará pronto.",
      emptyRoutines:
        "No hay rutinas para hoy. Revisa las pestañas semanal o mensual.",
    },
    products: {
      loading: "Cargando productos…",
      title: "Mis productos",
      description:
        "Tu estante con fotos, enlaces de marca y tienda. {count} {itemsLabel} guardados solo en este dispositivo.",
    },
    routines: {
      loading: "Cargando rutinas…",
      title: "Rutinas",
      emptyDescription:
        "Agrega productos primero — aquí aparecerán tus rutinas diarias, semanales y mensuales.",
      description:
        "Qué usar y cuándo — abre una rutina para ver los pasos y las revisiones de seguridad.",
      emptyFrequency: "Aún no hay productos {frequency}.",
      routineCount: "{count} {routineLabel} · {schedule}",
    },
    body: {
      loading: "Cargando ajustes del cuerpo…",
      title: "Cuerpo y ciclo",
      description:
        "Contexto opcional para tu piel — ciclo menstrual, etapa de vida y cambios de peso. Las rutinas y consejos se adaptan solo en tu dispositivo.",
      masterToggle: "Rutinas según tu cuerpo",
      masterHelp:
        "Actívalo para ajustar rutinas y consejos con la configuración de abajo.",
      menstrualTitle: "Ciclo menstrual",
      trackMenstrual: "Seguir fase menstrual",
      trackMenstrualHelp:
        "Límites suaves en activos fuertes durante menstruación y fase lútea.",
      lastPeriod: "Inicio del último periodo",
      cycleLength: "Duración del ciclo (días)",
      periodLength: "Duración del periodo (días)",
      lifeStageTitle: "Etapa de vida",
      lifeStageLabel: "Etapa actual",
      lifeStagePlaceholder: "Elige una etapa",
      postpartumWeeks: "Semanas desde el parto",
      postpartumHelp:
        "Semanas 0–11: se apartan retinoides y ácidos fuertes diarios; desde la semana 12 se reintroducen gradualmente.",
      weightTitle: "Cambios de peso",
      includeWeight: "Incluir contexto de peso",
      includeWeightHelp:
        "Agrega consejos de hidratación y barrera — nunca sale del dispositivo.",
      recentChange: "Cambio reciente",
      heldProductsTitle: "Productos apartados de las rutinas",
    },
  },
  privacy: {
    title: "Privado solo en este dispositivo",
    body:
      "Fechas del ciclo, etapa de vida y preferencias de peso se guardan en la base de datos local del navegador (IndexedDB). Nunca se envían a nuestros servidores — no tenemos forma de verlos.",
  },
  bodyBanner: {
    fallback: "Rutinas según tu cuerpo activadas",
    day: "día {day}",
    week: "semana {week}",
    factorMenstrual: "Menstrual · {phase}",
    factorLifeStage: "Etapa · {stage}",
    factorLifeStageWeek: "Etapa · {stage} (semana {week})",
    factorWeight: "Peso · {change}",
  },
  bodyGuidance: {
    pregnant1:
      "Modo embarazo: se apartan retinoides y algunos ácidos diarios de las rutinas.",
    pregnant2:
      "Confirma siempre el uso de productos con tu equipo de cuidado prenatal.",
    breastfeeding:
      "Modo lactancia: los retinoides siguen fuera de las rutinas salvo que tu médico lo apruebe.",
    postpartumNeedWeeks:
      "Modo posparto: agrega las semanas desde el parto para consejos más precisos.",
    postpartumEarly1:
      "Semana {week} posparto: primero limpieza suave y refuerzo de barrera.",
    postpartumEarly2:
      "Activos fuertes y retinoides se apartan hasta que tu piel se recupere.",
    postpartumLate:
      "Semana {week} posparto: puedes reintroducir activos gradualmente si los toleras.",
    perimenopause:
      "Perimenopausia: la piel puede alternar entre seca y reactiva — la constancia ayuda.",
    menopause:
      "Menopausia: prioriza ceramidas, hidratación y protector solar diario.",
    weightGaining:
      "Subida de peso reciente: las zonas propensas a estrías se benefician de hidratante regular.",
    weightLosing:
      "Bajada de peso reciente: mantén hidratación y barrera para que la piel se adapte.",
    cycleMenstrual:
      "La piel puede estar más sensible. Prioriza limpieza suave y refuerzo de barrera.",
    cycleFollicular:
      "La piel suele tolerar bien los activos. Buena fase para tratamientos y exfoliación.",
    cycleOvulation:
      "Puede aumentar la grasa. Hidratación ligera y protector solar constante ayudan.",
    cycleLuteal:
      "Pueden aparecer brotes. Considera BHA y evita activos fuertes nuevos.",
  },
  lifeStageDescription: {
    none: "Sin ajustes por etapa de vida además de tus otros ajustes.",
    pregnant:
      "Se apartan retinoides y algunos ácidos fuertes. Se prioriza el cuidado de barrera.",
    postpartum:
      "Las primeras semanas favorecen cuidado suave; los activos se reintroducen poco a poco.",
    breastfeeding:
      "Precaución similar al embarazo con retinoides hasta que tú y tu médico lo acuerden.",
    perimenopause: "Hidratación y barrera ayudan cuando cambian las hormonas.",
    menopause: "Enfócate en retener humedad y usar activos suaves con constancia.",
  },
  safetyCheck: {
    title: "Revisión de seguridad",
    collapsed: "{passed} de {total} revisiones OK · toca para ver detalles",
    layeringTips: "Consejos de capas",
    checks: {
      applicationOrder: {
        label: "Orden de capas",
        passed:
          "Los productos van en orden limpiar → tratar → hidratar → proteger.",
        failed:
          "El orden puede no coincidir con cómo deben aplicarse estos productos.",
      },
      ingredientSafety: {
        label: "Combinación de ingredientes",
        failed:
          "{count} combinación en esta rutina no debería usarse junta.",
        failedPlural:
          "{count} combinaciones en esta rutina no deberían usarse juntas.",
        passedCaution:
          "Sin conflictos graves; {count} nota para leer abajo.",
        passedCautionPlural:
          "Sin conflictos graves; {count} notas para leer abajo.",
        passed: "Nada en esta rutina choca por ingredientes.",
      },
      shelfAlignment: {
        label: "Horario correcto",
        passed:
          "Cada producto encaja en la frecuencia y el momento de esta rutina.",
        failed:
          "{count} producto no encaja del todo con el horario de esta rutina.",
        failedPlural:
          "{count} productos no encajan del todo con el horario de esta rutina.",
      },
    },
    reviewDuplicate:
      "Varios pasos de {categories} — confirma el orden según tus objetivos de piel.",
    reviewMenstrual:
      "Ajustado a tu fase menstrual — los activos fuertes pueden limitarse en días sensibles.",
  },
  exclusions: {
    shelf:
      "{count} producto apartado de rutinas por conflictos de ingredientes.",
    shelfPlural:
      "{count} productos apartados de rutinas por conflictos de ingredientes.",
    shelfItem: "Se mantuvo {name} en su lugar.",
    routine: "{count} producto apartado de las rutinas",
    routinePlural: "{count} productos apartados de las rutinas",
    routineItem: "— {reason} Se mantuvo {name} en su lugar.",
  },
  exclusionReason: {
    pregnancy:
      "Apartado en embarazo o lactancia — consulta con tu médico.",
    postpartum:
      "Apartado en recuperación posparto temprana — reintroduce cuando estés lista.",
    menstrual:
      "Apartado en fase {phase} — guarda activos fuertes para días menos sensibles.",
    default: "Apartado según tu configuración corporal.",
    ingredient: "{reason}",
  },
  guide: {
    title: "Guía de rutinas",
    description:
      "Interacciones de ingredientes y un PDF imprimible de tu estante y rutinas.",
  },
  conflicts: {
    summary: "{count} interacción de ingredientes",
    summaryPlural: "{count} interacciones de ingredientes",
    tapReview: "Toca para ver todas las notas",
    allTitle: "Todas las interacciones de ingredientes",
    allDescription: "En todo tu estante de productos.",
    routineTitle: "Interacciones en la rutina",
    routineDescription: "Productos en esta rutina que pueden chocar.",
    stepTitle: "Interacción en el paso",
    stepDescription: "Notas para este producto en la rutina de hoy.",
    defaultTitle: "Interacciones de ingredientes",
    defaultDescription:
      "Cómo interactúan estos productos si se usan en la misma rutina.",
    more: "+{count} más",
    why: "Por qué",
    whatToDo: "Qué hacer",
    ingredients: "Ingredientes",
    severityCount: "{count} {label}",
  },
  addProduct: {
    title: "Agregar un producto",
    description:
      "Busca por nombre o marca. La información se consulta con IA y se guarda en tu dispositivo.",
    nameLabel: "Nombre del producto",
    namePlaceholder: "ej. CeraVe Limpiador Hidratante",
    notFound:
      "No encontramos información del producto. Prueba un nombre más específico.",
    comingSoon: "Próximamente",
    unavailable:
      "Buscar y guardar tus productos aún no está listo. El estante de demostración sí funciona.",
  },
  affiliate:
    "Los enlaces de Amazon pueden generar comisión sin costo extra para ti. Configura NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG en tu entorno para usar tu etiqueta de Associates.",
};
