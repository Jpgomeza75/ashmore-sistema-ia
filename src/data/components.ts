export type ComponentType = "CONTINUA" | "EPISÓDICA" | "HABILITADORA";

export interface SystemComponent {
  id: string;
  name: string;
  shortName: string;
  type: ComponentType;
  row: number;
  description: string;
  problemToday?: string;
  level1?: {
    intro: string;
    cases: { title: string; description: string; prompt: string }[];
  };
  level2?: {
    intro: string;
    features: string[];
  };
  hasContent: boolean;
}

export interface Connection {
  from: string;
  to: string;
  label: string;
}

export interface PanelEntry {
  sourceId: string;
  label: string;
}

export interface PanelData {
  inputs: PanelEntry[];
  outputs: PanelEntry[];
  iaOpportunities: string[];
}

export const connections: Connection[] = [
  { from: "inteligencia", to: "desarrollo", label: "Señales y triggers" },
  { from: "inteligencia", to: "analisis", label: "Data de mercado" },
  { from: "inteligencia", to: "memoria", label: "Conocimiento sectorial" },
  { from: "inteligencia", to: "pitch", label: "Inteligencia competitiva" },
  { from: "memoria", to: "inteligencia", label: "Históricos y patrones" },
  { from: "ejecucion", to: "inteligencia", label: "Señales del mercado en deals activos" },
  { from: "desarrollo", to: "pitch", label: "Oportunidades calificadas" },
  { from: "desarrollo", to: "memoria", label: "Historial de relaciones" },
  { from: "memoria", to: "desarrollo", label: "Historial con clientes" },
  { from: "ejecucion", to: "desarrollo", label: "Track record" },
  { from: "pitch", to: "desarrollo", label: "Feedback ganado/perdido" },
  { from: "pitch", to: "analisis", label: "Brief de ejecución del mandato" },
  { from: "pitch", to: "memoria", label: "Propuestas y aprendizajes" },
  { from: "memoria", to: "pitch", label: "Track record y deals similares" },
  { from: "estructuracion", to: "pitch", label: "Tesis de valor preliminar" },
  { from: "analisis", to: "pitch", label: "Valoración preliminar" },
  { from: "analisis", to: "estructuracion", label: "Modelo financiero y hallazgos" },
  { from: "analisis", to: "narrativa", label: "Data para documentos" },
  { from: "analisis", to: "memoria", label: "Modelos y supuestos" },
  { from: "memoria", to: "analisis", label: "Modelos base históricos" },
  { from: "estructuracion", to: "analisis", label: "Requerimientos de recalibración" },
  { from: "ejecucion", to: "analisis", label: "Nueva info de due diligence" },
  { from: "estructuracion", to: "narrativa", label: "Tesis de valor para documentar" },
  { from: "estructuracion", to: "ejecucion", label: "Estructura y términos para negociación" },
  { from: "ejecucion", to: "estructuracion", label: "Feedback del mercado" },
  { from: "memoria", to: "estructuracion", label: "Estructuras precedentes" },
  { from: "narrativa", to: "ejecucion", label: "Documentos finales" },
  { from: "narrativa", to: "memoria", label: "Templates para reutilización" },
  { from: "control", to: "narrativa", label: "Validación de documentos" },
  { from: "memoria", to: "narrativa", label: "Templates anteriores" },
  { from: "ejecucion", to: "memoria", label: "Lecciones aprendidas" },
  { from: "control", to: "ejecucion", label: "Aprobaciones go/no-go" },
  { from: "control", to: "memoria", label: "Estándares actualizados" },
  { from: "analisis", to: "control", label: "Modelos para revisión" },
  { from: "narrativa", to: "control", label: "Documentos para validación" },
  { from: "estructuracion", to: "control", label: "Estructuras para aprobación" },
  { from: "memoria", to: "control", label: "Checklists y estándares" },
];

// Detailed panel data per component
export const panelData: Record<string, PanelData> = {
  inteligencia: {
    inputs: [
      { sourceId: "memoria", label: "Históricos y patrones previos" },
      { sourceId: "ejecucion", label: "Señales del mercado en deals activos" },
    ],
    outputs: [
      { sourceId: "desarrollo", label: "Señales y triggers de oportunidad" },
      { sourceId: "analisis", label: "Data de mercado y comparables" },
      { sourceId: "memoria", label: "Conocimiento sectorial acumulado" },
      { sourceId: "pitch", label: "Inteligencia competitiva para propuestas" },
    ],
    iaOpportunities: [
      "Screening automatizado de empresas por criterios",
      "Alertas inteligentes de triggers transaccionales",
      "Resúmenes de actividad sectorial",
      "Análisis de tendencias y patrones",
    ],
  },
  desarrollo: {
    inputs: [
      { sourceId: "inteligencia", label: "Señales y triggers de oportunidad" },
      { sourceId: "memoria", label: "Historial con clientes y contrapartes" },
      { sourceId: "ejecucion", label: "Track record y reputación (deals cerrados)" },
      { sourceId: "pitch", label: "Feedback de pitches ganados/perdidos" },
    ],
    outputs: [
      { sourceId: "pitch", label: "Oportunidades calificadas" },
      { sourceId: "memoria", label: "Historial de relaciones y contactos" },
    ],
    iaOpportunities: [
      "Scoring de oportunidades por probabilidad",
      "Briefs automáticos por prospecto",
      "Identificación de oportunidades de cross-selling",
      "Monitoreo de cambios en empresas target",
    ],
  },
  pitch: {
    inputs: [
      { sourceId: "desarrollo", label: "Oportunidad calificada" },
      { sourceId: "inteligencia", label: "Inteligencia competitiva y sectorial" },
      { sourceId: "memoria", label: "Track record, modelos base, deals similares" },
      { sourceId: "estructuracion", label: "Tesis de valor diferenciada preliminar" },
      { sourceId: "analisis", label: "Valoración y análisis preliminar" },
    ],
    outputs: [
      { sourceId: "analisis", label: "Mandato ganado — brief de ejecución" },
      { sourceId: "desarrollo", label: "Feedback ganado/perdido y por qué" },
      { sourceId: "memoria", label: "Propuestas y aprendizajes del proceso" },
    ],
    iaOpportunities: [
      "Generación de pitch books con data actualizada",
      "Análisis rápido de comparables",
      "Benchmark de fees de mercado",
      "Draft de estrategia del deal",
    ],
  },
  analisis: {
    inputs: [
      { sourceId: "pitch", label: "Brief del mandato y estrategia" },
      { sourceId: "inteligencia", label: "Data de mercado y comparables" },
      { sourceId: "memoria", label: "Modelos base y supuestos históricos" },
      { sourceId: "estructuracion", label: "Requerimientos de recalibración" },
      { sourceId: "ejecucion", label: "Nueva información de due diligence" },
    ],
    outputs: [
      { sourceId: "estructuracion", label: "Modelo financiero y hallazgos analíticos" },
      { sourceId: "narrativa", label: "Data y análisis para documentos" },
      { sourceId: "pitch", label: "Valoración preliminar para propuestas" },
      { sourceId: "memoria", label: "Modelos y supuestos para la librería" },
    ],
    iaOpportunities: [
      "Estructura de modelo a partir de inputs",
      "Chequeos automáticos de consistencia",
      "Generación de tablas de sensibilidad",
      "Identificación de inconsistencias en supuestos",
    ],
  },
  estructuracion: {
    inputs: [
      { sourceId: "analisis", label: "Modelo financiero y hallazgos" },
      { sourceId: "ejecucion", label: "Feedback del mercado y contrapartes" },
      { sourceId: "memoria", label: "Estructuras y términos de deals anteriores" },
    ],
    outputs: [
      { sourceId: "narrativa", label: "Tesis de valor y estructura para documentar" },
      { sourceId: "analisis", label: "Requerimientos de recalibración del modelo" },
      { sourceId: "ejecucion", label: "Estructura y términos para negociación" },
      { sourceId: "pitch", label: "Tesis de valor diferenciada para nuevos pitches" },
    ],
    iaOpportunities: [
      "Identificación de drivers y palancas accionables",
      "Draft de term sheets y covenants",
      "Benchmark de estructuras en deals similares",
      "Simulación de escenarios de estructura",
    ],
  },
  narrativa: {
    inputs: [
      { sourceId: "analisis", label: "Data, modelos y análisis" },
      { sourceId: "estructuracion", label: "Tesis de valor y estructura" },
      { sourceId: "control", label: "Validación de consistencia y compliance" },
      { sourceId: "memoria", label: "Templates y narrativas anteriores" },
    ],
    outputs: [
      { sourceId: "ejecucion", label: "Documentos finales para el proceso" },
      { sourceId: "memoria", label: "Templates y documentos para reutilización" },
    ],
    iaOpportunities: [
      "Drafts de secciones de documentos",
      "Verificación de consistencia narrativa vs. números",
      "Generación de executive summaries",
      "Traducción de modelos complejos a recomendaciones claras",
    ],
  },
  ejecucion: {
    inputs: [
      { sourceId: "narrativa", label: "Documentos finales" },
      { sourceId: "estructuracion", label: "Estructura y términos" },
      { sourceId: "control", label: "Aprobaciones y validaciones" },
    ],
    outputs: [
      { sourceId: "desarrollo", label: "Track record y reputación" },
      { sourceId: "memoria", label: "Lecciones aprendidas y resultados" },
      { sourceId: "analisis", label: "Nueva info de DD que requiere recalibración" },
      { sourceId: "estructuracion", label: "Feedback del mercado para reajustar" },
      { sourceId: "inteligencia", label: "Señales del mercado detectadas en proceso" },
    ],
    iaOpportunities: [
      "Gestión automatizada de Q&A en due diligence",
      "Tracking de hitos y alertas de timeline",
      "Comparación de ofertas recibidas",
      "Preparación de respuestas a preguntas frecuentes",
    ],
  },
  control: {
    inputs: [
      { sourceId: "analisis", label: "Modelos para revisión" },
      { sourceId: "narrativa", label: "Documentos para validación" },
      { sourceId: "estructuracion", label: "Estructuras para aprobación" },
      { sourceId: "memoria", label: "Checklists y estándares" },
    ],
    outputs: [
      { sourceId: "narrativa", label: "Validación y aprobación de documentos" },
      { sourceId: "ejecucion", label: "Aprobaciones de go/no-go" },
      { sourceId: "memoria", label: "Estándares y checklists actualizados" },
    ],
    iaOpportunities: [
      "Chequeos automáticos de consistencia en modelos",
      "Detección de errores de fórmula",
      "Verificación cruzada narrativa vs. números",
      "Auditoría de supuestos contra fuentes",
    ],
  },
  memoria: {
    inputs: [
      { sourceId: "inteligencia", label: "Conocimiento sectorial" },
      { sourceId: "desarrollo", label: "Relaciones y contactos" },
      { sourceId: "pitch", label: "Propuestas y resultados" },
      { sourceId: "analisis", label: "Modelos y supuestos" },
      { sourceId: "ejecucion", label: "Lecciones aprendidas y resultados" },
      { sourceId: "narrativa", label: "Documentos y templates" },
      { sourceId: "control", label: "Estándares actualizados" },
    ],
    outputs: [
      { sourceId: "inteligencia", label: "Históricos y patrones para monitoreo" },
      { sourceId: "desarrollo", label: "Historial con clientes y contrapartes" },
      { sourceId: "pitch", label: "Track record y deals similares" },
      { sourceId: "analisis", label: "Modelos base y supuestos históricos" },
      { sourceId: "estructuracion", label: "Estructuras y términos precedentes" },
      { sourceId: "narrativa", label: "Templates y narrativas de referencia" },
      { sourceId: "control", label: "Checklists y estándares" },
    ],
    iaOpportunities: [
      "Búsqueda inteligente en base de conocimiento",
      "Sugerencia de comparables relevantes",
      "Auto-catalogación de documentos y modelos",
      "Extracción de lecciones de deals pasados",
    ],
  },
};

export const systemComponents: SystemComponent[] = [
  {
    id: "inteligencia",
    name: "Inteligencia de Mercado",
    shortName: "Inteligencia",
    type: "CONTINUA",
    row: 1,
    description: "Monitoreo continuo del entorno competitivo, sectorial y macroeconómico para identificar oportunidades y amenazas relevantes.",
    hasContent: true,
    problemToday: "Los analistas dedican horas semanales a revisar manualmente noticias, reportes y bases de datos, generando un flujo de información fragmentado que depende de la memoria individual. Las señales críticas se pierden o llegan tarde.",
    level1: {
      intro: "Con herramientas de IA generativa, cada analista puede convertirse en un radar de mercado de alta frecuencia, procesando volúmenes de información que antes requerían equipos completos.",
      cases: [
        {
          title: "Resumen de Mercado Diario",
          description: "Genera un briefing ejecutivo de las noticias más relevantes para los sectores de interés de BANICOL.",
          prompt: "Actúa como analista senior de banca de inversión en Colombia. Resume las 5 noticias más relevantes de hoy para los sectores de infraestructura, energía y tecnología en Latinoamérica. Para cada noticia indica: (1) el hecho, (2) implicación para M&A, y (3) nivel de urgencia alto/medio/bajo."
        },
        {
          title: "Análisis de Competidores",
          description: "Mapea los movimientos recientes de firmas competidoras y bancos en un sector específico.",
          prompt: "Analiza los últimos 3 mandatos públicos de banca de inversión en el sector energético colombiano. Para cada uno identifica: firma asesora, tipo de transacción, tamaño estimado, y qué señal envía sobre la dirección del mercado."
        },
        {
          title: "Screening de Oportunidades",
          description: "Identifica empresas que podrían ser targets de M&A basándose en criterios específicos.",
          prompt: "Identifica 5 empresas medianas colombianas en el sector de tecnología financiera que podrían ser candidatas a una adquisición estratégica. Criterios: ingresos entre USD 5M-50M, crecimiento >20% anual, sin rondas recientes de financiamiento. Justifica cada selección."
        }
      ]
    },
    level2: {
      intro: "Un sistema institucional de inteligencia de mercado que captura, procesa y distribuye señales automáticamente, alimentando el pipeline comercial 24/7.",
      features: [
        "Monitor automatizado de noticias con filtros sectoriales y alertas en tiempo real",
        "Dashboard de actividad M&A por sector y geografía con actualización diaria",
        "Motor de screening que cruza criterios de inversión con bases de datos empresariales",
        "Generación automática de reportes semanales de inteligencia para el equipo"
      ]
    }
  },
  {
    id: "desarrollo",
    name: "Desarrollo Comercial",
    shortName: "Desarrollo",
    type: "CONTINUA",
    row: 1,
    description: "Gestión de relaciones con clientes actuales y potenciales, identificación de oportunidades y cultivo del pipeline comercial.",
    hasContent: true,
  },
  {
    id: "pitch",
    name: "Pitch y Captura de Mandato",
    shortName: "Pitch",
    type: "EPISÓDICA",
    row: 2,
    description: "Preparación de propuestas competitivas, presentaciones a clientes y cierre de mandatos de asesoría.",
    hasContent: true,
  },
  {
    id: "analisis",
    name: "Análisis y Modelación",
    shortName: "Análisis",
    type: "EPISÓDICA",
    row: 3,
    description: "Construcción de modelos financieros, valoraciones y análisis cuantitativos que sustentan las recomendaciones estratégicas.",
    hasContent: true,
    problemToday: "Los modelos financieros se construyen desde cero o se adaptan de versiones anteriores con riesgo de errores heredados. La validación de supuestos es manual y las sensibilidades se limitan a las que el analista tiene tiempo de correr.",
    level1: {
      intro: "La IA permite al analista acelerar dramáticamente la construcción y validación de modelos, pasando más tiempo en el análisis estratégico y menos en la mecánica del Excel.",
      cases: [
        {
          title: "Validación de Supuestos",
          description: "Compara los supuestos de un modelo con datos de mercado y transacciones comparables.",
          prompt: "Revisa estos supuestos para la valoración de una empresa de distribución eléctrica en Colombia: crecimiento de ingresos 8% anual, margen EBITDA 35%, WACC 12%, múltiplo de salida 7x EV/EBITDA. Compara con benchmarks del sector y sugiere ajustes con justificación."
        },
        {
          title: "Generación de Sensibilidades",
          description: "Crea matrices de sensibilidad para las variables clave de una valoración.",
          prompt: "Para un DCF de una empresa con valor terminal de USD 200M y equity value de USD 150M, genera una tabla de sensibilidad cruzando: (1) tasa de descuento de 10% a 14% en pasos de 0.5%, y (2) tasa de crecimiento perpetuo de 2% a 4% en pasos de 0.5%. Formatea como tabla clara."
        },
        {
          title: "Narrativa del Modelo",
          description: "Traduce los resultados del modelo financiero en una narrativa ejecutiva para el cliente.",
          prompt: "Tengo una valoración DCF que arroja un rango de USD 120M-160M para una empresa colombiana de logística. El EBITDA actual es USD 18M. Los comparables públicos cotizan a 8-10x EV/EBITDA. Escribe un párrafo ejecutivo de 5 líneas que presente esta valoración de forma persuasiva para el vendedor."
        }
      ]
    },
    level2: {
      intro: "Un entorno de modelación asistida que combina plantillas institucionales, validación automática y generación de escenarios, reduciendo errores y acelerando entregas.",
      features: [
        "Plantillas de modelos pre-construidas con mejores prácticas y validaciones automáticas",
        "Motor de comparables que cruza automáticamente con bases de datos de transacciones",
        "Generador de escenarios que corre miles de simulaciones Monte Carlo",
        "Asistente de documentación que convierte outputs del modelo en texto ejecutivo"
      ]
    }
  },
  {
    id: "estructuracion",
    name: "Estructuración y Diseño de Valor",
    shortName: "Estructuración",
    type: "EPISÓDICA",
    row: 3,
    description: "Diseño de la estructura óptima de la transacción y articulación de la tesis de valor que maximice el resultado para el cliente.",
    hasContent: true,
  },
  {
    id: "narrativa",
    name: "Narrativa y Documentación",
    shortName: "Narrativa",
    type: "EPISÓDICA",
    row: 3,
    description: "Creación de documentos de alta calidad: teasers, information memorandums, presentaciones al board y materiales de proceso.",
    hasContent: true,
  },
  {
    id: "ejecucion",
    name: "Ejecución y Gestión del Proceso",
    shortName: "Ejecución",
    type: "EPISÓDICA",
    row: 4,
    description: "Coordinación del proceso de la transacción: gestión de data rooms, negociaciones, due diligence y cierre.",
    hasContent: true,
  },
  {
    id: "control",
    name: "Control de Calidad y Gobernanza",
    shortName: "Control",
    type: "HABILITADORA",
    row: 5,
    description: "Revisión y aprobación de entregables, cumplimiento regulatorio y gobierno interno del proceso de asesoría.",
    hasContent: true,
  },
  {
    id: "memoria",
    name: "Memoria Corporativa",
    shortName: "Memoria",
    type: "HABILITADORA",
    row: 5,
    description: "Repositorio institucional de conocimiento: deals pasados, modelos, templates, lecciones aprendidas y mejores prácticas.",
    hasContent: true,
    problemToday: "El conocimiento institucional reside en las cabezas de las personas y en carpetas desordenadas de SharePoint. Cuando un analista necesita un precedente, depende de preguntar a colegas o buscar en archivos sin estructura. El conocimiento se pierde con la rotación de personal.",
    level1: {
      intro: "La IA puede convertir el caos de archivos en un asistente de conocimiento que encuentra, contextualiza y sirve la información correcta en el momento correcto.",
      cases: [
        {
          title: "Búsqueda de Precedentes",
          description: "Encuentra deals anteriores similares a una oportunidad actual para extraer lecciones y benchmarks.",
          prompt: "Actúa como el repositorio de conocimiento de BANICOL. Busca en nuestra base de deals anteriores: necesito precedentes de transacciones M&A en el sector salud en Colombia o Latam, rango USD 20-80M, de los últimos 5 años. Para cada precedente lista: tipo de transacción, múltiplo pagado, estructura, y una lección clave."
        },
        {
          title: "Generación de Templates",
          description: "Crea borradores de documentos basándose en templates y mejores prácticas internas.",
          prompt: "Genera un outline para un Information Memorandum para una empresa colombiana de manufactura de alimentos. Usa la estructura estándar de BANICOL: (1) Resumen Ejecutivo, (2) Tesis de Inversión, (3) Descripción del Negocio, (4) Análisis Financiero, (5) Oportunidades de Crecimiento, (6) Información de la Transacción. Para cada sección, incluye los 3 puntos clave a cubrir."
        },
        {
          title: "Extracción de Lecciones",
          description: "Sintetiza aprendizajes de deals cerrados para mejorar procesos futuros.",
          prompt: "Analiza este resumen post-mortem de un deal de venta de una empresa de energía: [pegar resumen]. Extrae: (1) las 3 decisiones que más valor generaron, (2) los 3 errores o retrasos evitables, (3) recomendaciones concretas para el próximo deal similar. Formato ejecutivo, máximo 1 página."
        }
      ]
    },
    level2: {
      intro: "Un sistema de gestión del conocimiento institucional que captura automáticamente el aprendizaje de cada deal y lo hace accesible de forma inteligente para todo el equipo.",
      features: [
        "Repositorio inteligente con búsqueda semántica sobre todos los documentos históricos",
        "Captura automática de metadata de cada deal al cierre",
        "Motor de recomendaciones que sugiere precedentes relevantes al iniciar un nuevo mandato",
        "Generador de templates que adapta formatos institucionales al contexto del deal"
      ]
    }
  }
];

export function getComponentById(id: string): SystemComponent | undefined {
  return systemComponents.find(c => c.id === id);
}

export function getOutputConnections(componentId: string): Connection[] {
  return connections.filter(c => c.from === componentId);
}

export function getInputConnections(componentId: string): Connection[] {
  return connections.filter(c => c.to === componentId);
}

export function getConnectedIds(componentId: string): string[] {
  const ids = new Set<string>();
  connections.forEach(c => {
    if (c.from === componentId) ids.add(c.to);
    if (c.to === componentId) ids.add(c.from);
  });
  return Array.from(ids);
}

const componentOrder = ["inteligencia", "desarrollo", "pitch", "analisis", "estructuracion", "narrativa", "ejecucion", "control", "memoria"];

export function getAdjacentComponents(id: string): { prev: SystemComponent | null; next: SystemComponent | null } {
  const idx = componentOrder.indexOf(id);
  return {
    prev: idx > 0 ? getComponentById(componentOrder[idx - 1])! : null,
    next: idx < componentOrder.length - 1 ? getComponentById(componentOrder[idx + 1])! : null,
  };
}
