export type ComponentType = "JOURNEY" | "TRANSVERSAL";

export interface SystemComponent {
  id: string;
  name: string;
  shortName: string;
  type: ComponentType;
  order: number;
  description: string;
  hasContent: boolean;
  problemToday?: string;
  level1?: {
    intro: string;
    cases: { title: string; description: string }[];
  };
  level2?: {
    intro: string;
    features: string[];
  };
}

export const journeyComponents: SystemComponent[] = [
  {
    id: "levantar-capital",
    name: "Levantar el Capital",
    shortName: "Levantar",
    type: "JOURNEY",
    order: 1,
    description: "Convencer a institucionales y DFIs de invertir en el fondo. Preparar materiales, responder DDQs de LPs, negociar términos y cerrar compromisos.",
    hasContent: true,
    problemToday: "Responder un DDQ de un LP institucional toma semanas. Cada cuestionario tiene 100-300 preguntas, muchas repetidas entre LPs. El equipo redacta desde cero cada vez.",
    level1: {
      intro: "Con IA, el equipo de fundraising puede generar un primer borrador completo del DDQ en minutos.",
      cases: [
        { title: "Respondedor de DDQs", description: "Adjunta el DDQ y obtén un borrador con respuestas clasificadas por completitud." },
        { title: "Constructor de Tesis de Inversión", description: "Genera la narrativa de la tesis ajustada al momento de mercado." },
      ],
    },
    level2: {
      intro: "Sistema integrado de gestión de fundraising que acumula el conocimiento de cada interacción con LPs.",
      features: ["Base de conocimiento de DDQs", "Perfiles de LPs", "Generador de materiales"],
    },
  },
  {
    id: "buscar-invertir",
    name: "Buscar dónde Invertir",
    shortName: "Buscar",
    type: "JOURNEY",
    order: 2,
    description: "Construir el pipeline de oportunidades de infraestructura que calzan con el mandato del fondo.",
    hasContent: true,
    problemToday: "El sourcing es intensivo en tiempo y red. Validar si un activo está disponible puede tomar semanas.",
    level1: {
      intro: "La IA puede convertir el mandato del fondo en un mapa accionable del mercado en minutos.",
      cases: [
        { title: "Mapa de Oportunidades", description: "Segmentación por geografía × sector, pipeline público, white spaces." },
        { title: "Investigación Preliminar de Activo", description: "Dossier rápido con información pública disponible." },
      ],
    },
    level2: {
      intro: "Sistema de pipeline management que convierte el sourcing de reactivo a proactivo.",
      features: ["Monitor de licitaciones", "Base de activos investigados", "Scoring automático"],
    },
  },
  {
    id: "evaluar-invertir",
    name: "Evaluar si Invertir",
    shortName: "Evaluar",
    type: "JOURNEY",
    order: 3,
    description: "Due diligence formal del activo. Se abre el data room, se contratan asesores, se visita el proyecto.",
    hasContent: true,
  },
  {
    id: "decidir-invertir",
    name: "Decidir Invertir",
    shortName: "Decidir",
    type: "JOURNEY",
    order: 4,
    description: "Investment Committee, memo de inversión, aprobación del deal, estructuración final y cierre.",
    hasContent: false,
  },
  {
    id: "gestionar-invertido",
    name: "Gestionar lo Invertido",
    shortName: "Gestionar",
    type: "JOURNEY",
    order: 5,
    description: "Asset management activo del portafolio. Monitoreo operativo, gestión de riesgos, seguimiento regulatorio.",
    hasContent: true,
    problemToday: "El equipo recibe documentos densos que necesita convertir en decisiones en horas. Hoy toma días.",
    level1: {
      intro: "La IA puede traducir documentos regulatorios en análisis de impacto accionable en minutos.",
      cases: [
        { title: "Traductor Regulatorio", description: "Resolución PDF → análisis de impacto en portafolio." },
        { title: "Analista de Portafolio Instantáneo", description: "Informe de avance → semáforos y alertas." },
      ],
    },
    level2: {
      intro: "Centro de Control del Portafolio que centraliza la información y genera alertas automáticas.",
      features: ["Dashboard en tiempo real", "Traductor regulatorio automático", "Preparador de juntas"],
    },
  },
];

export const transversalComponents: SystemComponent[] = [
  {
    id: "entender-entorno",
    name: "Entender el Entorno",
    shortName: "Entorno",
    type: "TRANSVERSAL",
    order: 1,
    description: "Inteligencia continua sobre regulación, macroeconomía, política y mercados que afecta todas las etapas del ciclo de inversión.",
    hasContent: false,
  },
  {
    id: "comunicar",
    name: "Comunicar",
    shortName: "Comunicar",
    type: "TRANSVERSAL",
    order: 2,
    description: "Comunicación estratégica con LPs, con Londres, y con las juntas de los activos.",
    hasContent: false,
  },
  {
    id: "cumplir",
    name: "Cumplir",
    shortName: "Cumplir",
    type: "TRANSVERSAL",
    order: 3,
    description: "ESG bajo estándares IFC, regulación Superfinanciera, reportes a BID/CAF — compliance que cruza todas las etapas.",
    hasContent: false,
  },
  {
    id: "aprender",
    name: "Aprender",
    shortName: "Aprender",
    type: "TRANSVERSAL",
    order: 4,
    description: "Memoria institucional — preservar el conocimiento acumulado de cada deal para que no se pierda con la rotación.",
    hasContent: false,
  },
];

export const systemComponents: SystemComponent[] = [
  ...journeyComponents,
  ...transversalComponents,
];

export function getComponentById(id: string): SystemComponent | undefined {
  return systemComponents.find((c) => c.id === id);
}

const journeyOrder = ["levantar-capital", "buscar-invertir", "evaluar-invertir", "decidir-invertir", "gestionar-invertido"];
const transversalOrder = ["entender-entorno", "comunicar", "cumplir", "aprender"];

export function getAdjacentComponents(id: string): { prev: SystemComponent | null; next: SystemComponent | null } {
  const order = journeyOrder.includes(id) ? journeyOrder : transversalOrder;
  const idx = order.indexOf(id);
  return {
    prev: idx > 0 ? getComponentById(order[idx - 1])! : null,
    next: idx < order.length - 1 ? getComponentById(order[idx + 1])! : null,
  };
}
