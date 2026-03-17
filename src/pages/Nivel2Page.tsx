import { useState } from "react";
import { useNavigate } from "react-router-dom";

const lpData: Record<string, {
  fullName: string;
  tipo: string;
  idioma: string;
  formato: string;
  deadline: string;
  status: string;
  statusColor: string;
  completas: number;
  parciales: number;
  input: number;
  notas: string;
  preguntas: { status: string; statusBg: string; statusColor: string; q: string; a: string; completar: string | null }[];
}> = {
  caf: {
    fullName: 'CAF — Corporación Andina de Fomento',
    tipo: 'DFI · Internacional',
    idioma: 'Inglés',
    formato: 'ILPA v1.2',
    deadline: 'Mar 28, 2026',
    status: 'En revisión interna',
    statusColor: '#93C5FD',
    completas: 45,
    parciales: 6,
    input: 1,
    notas: 'CAF tiene foco especial en métricas de impacto climático y social. Solicitan evidencia cuantitativa de empleos generados y toneladas de CO2 evitadas por el portafolio.',
    preguntas: [
      { status: '✅ COMPLETE', statusBg: 'rgba(34,197,94,0.1)', statusColor: '#86EFAC', q: "1.1 Does the Firm have any existing business lines unrelated to the Fund's investment strategy?", a: "No. Ashmore Management Company Colombia SAS operates exclusively as an infrastructure private equity fund manager. All activities are directly related to the Fund's strategy focused on infrastructure assets across Colombia, Peru, and Central America.", completar: null },
      { status: '🟡 PARTIAL', statusBg: 'rgba(133,77,14,0.15)', statusColor: '#FCD34D', q: "5.1 Provide biographical information for all investment professionals.", a: "Ashmore Management Company Colombia SAS has not published detailed team biographies publicly. The team combines global EM expertise from Ashmore Group with deep local infrastructure knowledge built over 15 years.", completar: "TO COMPLETE: Solicitar biographies completas a RRHH — nombre, cargo, años en Ashmore, experiencia previa, formación académica." },
      { status: '✅ COMPLETE', statusBg: 'rgba(34,197,94,0.1)', statusColor: '#86EFAC', q: "10.3.3 Give 2-3 examples of how the Firm contributed to portfolio companies' ESG management.", a: "1. TermoemCali: Biodiversity compensation plan, community liaison programs in Cauca Valley. 2. Transambiental: GHG fleet replacement program, road safety plan for drivers, passengers, pedestrians. 3. Líneas La Guajira: Indigenous community consultation (Wayuu), environmental compliance with ANLA license.", completar: null },
    ]
  },
  skandia: {
    fullName: 'Skandia Colombia S.A.',
    tipo: 'Aseguradora · Local',
    idioma: 'Español',
    formato: 'Formato propio Skandia',
    deadline: 'Abr 5, 2026',
    status: 'En proceso',
    statusColor: '#B8860B',
    completas: 31,
    parciales: 18,
    input: 12,
    notas: 'Skandia tiene restricciones regulatorias de la Superfinanciera sobre inversiones en activos alternativos. Requieren análisis de liquidez del fondo y garantías de valoración trimestral independiente.',
    preguntas: [
      { status: '✅ COMPLETA', statusBg: 'rgba(34,197,94,0.1)', statusColor: '#86EFAC', q: "1.1 ¿La firma tiene líneas de negocio no relacionadas con la estrategia del Fondo?", a: "No. Ashmore Management Company Colombia SAS opera exclusivamente como gestor de private equity en infraestructura. Todas las actividades están directamente relacionadas con la estrategia de inversión del Fondo Andino III.", completar: null },
      { status: '🔴 REQUIERE INPUT INTERNO', statusBg: 'rgba(239,68,68,0.1)', statusColor: '#FCA5A5', q: "4.3 ¿El Fondo cuenta con una política de valoración de activos aprobada por el Comité de Inversiones?", a: "Los FCPs colombianos están sujetos a las normas de valoración de la Superfinanciera y las metodologías de Alianza Fiduciaria como administrador.", completar: "PARA COMPLETAR: Solicitar a Alianza Fiduciaria el documento de metodología de valoración del Fondo Andino III. Confirmar frecuencia y metodología de valoración con el equipo de finanzas." },
      { status: '🟡 PARCIAL', statusBg: 'rgba(133,77,14,0.15)', statusColor: '#FCD34D', q: "7.2 Describa los mecanismos de liquidez disponibles para los inversionistas.", a: "El Fondo Andino III es un vehículo cerrado con plazo de 10 años. No existe ventana de liquidez durante el período de inversión. Las distribuciones se realizan a medida que se desinvierten los activos del portafolio.", completar: "PARA COMPLETAR: Confirmar si el reglamento del FCP incluye mecanismos de transferencia de participaciones entre LPs o cualquier provisión de liquidez extraordinaria." },
    ]
  },
  porvenir: {
    fullName: 'Porvenir S.A. — Fondo de Pensiones',
    tipo: 'Fondo de pensiones · Local',
    idioma: 'Español',
    formato: 'Formato propio Porvenir',
    deadline: 'Mar 22, 2026',
    status: 'Input requerido — urgente',
    statusColor: '#FCA5A5',
    completas: 18,
    parciales: 12,
    input: 31,
    notas: '⚠️ URGENTE — El deadline es en 6 días. Porvenir requiere aprobación del Comité de Riesgos Alternos de Asobancaria antes de comprometerse. Tienen restricciones de concentración: máximo 2% del portafolio total en un solo fondo de infraestructura.',
    preguntas: [
      { status: '✅ COMPLETA', statusBg: 'rgba(34,197,94,0.1)', statusColor: '#86EFAC', q: "2.1 ¿El Fondo ofrecerá oportunidades de co-inversión?", a: "Sí. Ashmore tiene un track record probado de co-inversiones. En el Fondo I, se realizaron co-inversiones por USD 67.5M junto al compromiso principal de USD 170M. El Fondo Andino III incluye Compartimentos B y C específicamente para co-inversión.", completar: null },
      { status: '🔴 REQUIERE INPUT INTERNO', statusBg: 'rgba(239,68,68,0.1)', statusColor: '#FCA5A5', q: "8.1 Proporcione un resumen de los términos económicos clave del Fondo (management fee, carried interest, hurdle rate).", a: "Los términos económicos están regulados por el Reglamento del FCP y el LPA. No están disponibles públicamente.", completar: "PARA COMPLETAR: Solicitar al equipo legal los términos económicos completos: management fee (%), período de cálculo, reducción post-inversión, carried interest (%), hurdle rate (%), catch-up, clawback. Porvenir los requiere para su Comité de Riesgos." },
      { status: '🔴 REQUIERE INPUT INTERNO', statusBg: 'rgba(239,68,68,0.1)', statusColor: '#FCA5A5', q: "11.1 Proporcione el track record detallado: TIR bruta y neta, MOIC por inversión.", a: "El track record completo con métricas financieras no está disponible públicamente.", completar: "PARA COMPLETAR: Solicitar al equipo de inversiones las métricas de track record: TIR bruta/neta, MOIC, DPI, RVPI por inversión y consolidado para Fondos I y II. Este es el principal driver de decisión para Porvenir." },
    ]
  },
  bid: {
    fullName: 'BID Invest — Banco Interamericano de Desarrollo',
    tipo: 'DFI · Internacional',
    idioma: 'Inglés',
    formato: 'ILPA v1.2 + Addendum BID',
    deadline: 'Mar 20, 2026',
    status: 'Listo para revisión final',
    statusColor: '#86EFAC',
    completas: 49,
    parciales: 3,
    input: 0,
    notas: 'BID Invest tiene enfoque especial en impacto de desarrollo y additionality. El DDQ incluye secciones adicionales sobre métricas de empleo, género y cambio climático no estándar en ILPA. Listo para revisión final del equipo antes del envío.',
    preguntas: [
      { status: '✅ COMPLETE', statusBg: 'rgba(34,197,94,0.1)', statusColor: '#86EFAC', q: "10.1.1 Does the Firm have a formal ESG policy aligned with IFC Performance Standards?", a: "Yes. Ashmore Management Company Colombia operates under ESG standards aligned with IFC Performance Standards (PS 1-8). The framework covers environmental and social assessment, labor conditions, resource efficiency, community health, land acquisition, biodiversity, indigenous peoples, and cultural heritage. Application is mandatory for all portfolio companies.", completar: null },
      { status: '🟡 PARTIAL', statusBg: 'rgba(133,77,14,0.15)', statusColor: '#FCD34D', q: "BID-S1. Describe the Fund's approach to measuring and reporting development impact (jobs, gender, climate).", a: "Fondo Andino III has an explicit mandate for climate infrastructure and social infrastructure investments with measurable outcomes. The fund tracks employment generation, gender diversity metrics, and GHG avoidance across the portfolio.", completar: "TO COMPLETE: Provide specific impact metrics from Fondo I and II track record — number of jobs created/maintained, % women in workforce, MWh of clean energy generated, tons CO2 avoided. BID Invest requires baseline and projected metrics for Fondo III." },
      { status: '✅ COMPLETE', statusBg: 'rgba(34,197,94,0.1)', statusColor: '#86EFAC', q: "3.1 Summarize the Fund's investment strategy and target criteria.", a: "Fondo Ashmore Andino III targets operational or advanced-construction infrastructure in Colombia, Peru, Panama, Costa Rica, Guatemala, and Dominican Republic. USD 420M, ~10 investments, USD 30-80M tickets. Dual focus: (i) climate infrastructure and (ii) social infrastructure with measurable impact.", completar: null },
    ]
  },
  proteccion: {
    fullName: 'Protección S.A. — Fondo de Pensiones',
    tipo: 'Fondo de pensiones · Local',
    idioma: 'Español',
    formato: 'Formato propio Protección',
    deadline: 'Abr 12, 2026',
    status: 'En proceso',
    statusColor: '#B8860B',
    completas: 27,
    parciales: 14,
    input: 20,
    notas: 'Protección tiene experiencia previa en fondos de infraestructura local. Han invertido en el Fondo Andino II. El DDQ es más corto que el de CAF pero requiere información más detallada sobre el portafolio actual y las desinversiones esperadas.',
    preguntas: [
      { status: '✅ COMPLETA', statusBg: 'rgba(34,197,94,0.1)', statusColor: '#86EFAC', q: "3.3 Describa la estrategia de diversificación del Fondo.", a: "El Fondo Andino III diversifica en seis geografías (Colombia ~50%, Perú ~25%, Centroamérica ~25%), múltiples sectores (energía, transporte, logística, agua, social), y mezcla de activos operativos y en construcción avanzada. Ningún activo puede representar más del 25% del NAV.", completar: null },
      { status: '🟡 PARCIAL', statusBg: 'rgba(133,77,14,0.15)', statusColor: '#FCD34D', q: "11.2 Proporcione el cronograma esperado de distribuciones del Fondo.", a: "Las distribuciones comenzarán una vez se complete el período de inversión (~5 años) y los activos maduren. El perfil de distribuciones es típico de infraestructura PE: curva en J los primeros 3-4 años, distribuciones aceleradas años 6-10.", completar: "PARA COMPLETAR: Confirmar con el equipo de inversiones el cronograma proyectado de distribuciones por compartimento y las políticas de reciclaje de capital del Fondo III." },
      { status: '🔴 REQUIERE INPUT INTERNO', statusBg: 'rgba(239,68,68,0.1)', statusColor: '#FCA5A5', q: "6.1 ¿Cuál es el compromiso del GP en el Fondo?", a: "El compromiso del GP no está disponible en fuentes públicas.", completar: "PARA COMPLETAR: Confirmar el monto del compromiso del GP en el Fondo Andino III. El estándar de mercado recomendado por ILPA es mínimo 1-2% del tamaño del fondo (USD 4.2M-8.4M). Revisar el LPA." },
    ]
  }
};

const dealData: Record<string, {
  name: string;
  pais: string;
  sector: string;
  sectorColor: string;
  sectorBg: string;
  ticket: string;
  capacidad: string;
  tir: string;
  estado: string;
  estadoColor: string;
  etapa: string;
  compartimento: string;
  notas: string;
  preguntas: { status: string; statusBg: string; statusColor: string; q: string; a: string; completar: string | null }[];
}> = {
  solar: {
    name: 'Proyecto Solar Córdoba',
    pais: '🇨🇴 Colombia',
    sector: 'Energía renovable',
    sectorColor: '#FCD34D',
    sectorBg: 'rgba(250,204,21,0.1)',
    ticket: '~USD 55M',
    capacidad: '80 MW',
    tir: '14-16%',
    estado: 'Operando desde 2022',
    estadoColor: '#86EFAC',
    etapa: 'DD técnico en curso',
    compartimento: 'Compartimento A',
    notas: 'Activo en operación con PPA de largo plazo. El DD técnico está avanzado — pendiente respuesta del target sobre el plan de manejo ambiental y confirmación de la contraparte del PPA bajo NDA.',
    preguntas: [
      { status: '✅ Respondida', statusBg: 'rgba(34,197,94,0.1)', statusColor: '#86EFAC', q: "F.1 Descripción del activo: capacidad instalada, tecnología, fecha COD, vida útil remanente", a: "Parque solar fotovoltaico de 80 MW-dc / 72 MW-ac, tecnología bifacial monocristalina. COD: enero 2022. Vida útil remanente: 23 años. Ubicación: municipio de Montería, Córdoba. Conexión a la red en 110 kV. O&M a cargo de operador local con contrato hasta 2030.", completar: null },
      { status: '🟡 Incompleta', statusBg: 'rgba(133,77,14,0.15)', statusColor: '#FCD34D', q: "F.4 Contratos de venta de energía: contraparte, plazo, precio, indexación", a: "PPA con empresa minera colombiana (nombre bajo NDA) por 40 MW a USD 42/MWh, indexado a inflación USA, plazo 15 años (vence 2037). Energía restante vendida en bolsa XM a precio spot.", completar: "PENDIENTE: Confirmación escrita de la contraparte del PPA para compartir con asesor legal. Solicitar copia del contrato bajo NDA para revisión interna." },
      { status: '🔴 Sin respuesta', statusBg: 'rgba(239,68,68,0.1)', statusColor: '#FCA5A5', q: "ESG.3 Plan de manejo ambiental: licencia ANLA, compromisos de compensación, monitoreo", a: "Respuesta pendiente del target — plazo vencido hace 3 días.", completar: "ACCIÓN REQUERIDA: Contactar directamente al gerente del proyecto. Si no hay respuesta en 48h, escalar a Ashmore para decidir si continúa el proceso." },
    ]
  },
  callao: {
    name: 'Puerto Callao Logística',
    pais: '🇵🇪 Perú',
    sector: 'Logística',
    sectorColor: '#93C5FD',
    sectorBg: 'rgba(96,165,250,0.1)',
    ticket: '~USD 40M',
    capacidad: '—',
    tir: '12-14%',
    estado: 'Screening',
    estadoColor: '#93C5FD',
    etapa: 'Screening',
    compartimento: 'Compartimento A',
    notas: 'Terminal logística en el puerto de Callao. El target está en fase de screening — se espera data room en las próximas 2 semanas. El DD financiero preliminar indica alineación con el mandato del fondo.',
    preguntas: [
      { status: '🟡 En evaluación', statusBg: 'rgba(133,77,14,0.15)', statusColor: '#FCD34D', q: "L.1 Descripción del activo: ubicación, capacidad, operador actual", a: "Terminal de carga general en el puerto de Callao, Lima. Capacidad estimada 500K TEU/año. Operador actual: APM Terminals (contrato vence 2027). Oportunidad de concesión o adquisición de participación.", completar: "PENDIENTE: Confirmar estructura de la transacción — concesión vs. adquisición de equity. Solicitar data room al promotor." },
      { status: '🔴 Sin respuesta', statusBg: 'rgba(239,68,68,0.1)', statusColor: '#FCA5A5', q: "L.2 Contratos de arrendamiento o concesión: contrapartes, plazos, rentas", a: "Información pendiente del target.", completar: null },
      { status: '🔴 Sin respuesta', statusBg: 'rgba(239,68,68,0.1)', statusColor: '#FCA5A5', q: "L.3 Proyecciones de tráfico y revenue: supuestos, sensibilidad", a: "Información pendiente del target.", completar: null },
    ]
  },
  agua: {
    name: 'Agua Potable Guatemala',
    pais: '🇬🇹 Guatemala',
    sector: 'Agua y residuos',
    sectorColor: '#6EE7B7',
    sectorBg: 'rgba(52,211,153,0.1)',
    ticket: '~USD 35M',
    capacidad: '—',
    tir: '13-15%',
    estado: 'IC prelim.',
    estadoColor: '#86EFAC',
    etapa: 'IC preliminar',
    compartimento: 'Compartimento A',
    notas: 'Proyecto de acueducto regional en Guatemala. El IC preliminar fue favorable. Pendiente visita a sitio y revisión de contratos con la autoridad reguladora (ANDE). El target tiene experiencia en proyectos similares en la región.',
    preguntas: [
      { status: '✅ Respondida', statusBg: 'rgba(34,197,94,0.1)', statusColor: '#86EFAC', q: "A.1 Descripción del proyecto: cobertura, población beneficiada, plazo de concesión", a: "Acueducto regional que abastecerá a 12 municipios en el altiplano guatemalteco. Población beneficiada: ~180.000 habitantes. Concesión de 25 años con ANDE. Inversión en ampliación de red y planta de tratamiento.", completar: null },
      { status: '🟡 Incompleta', statusBg: 'rgba(133,77,14,0.15)', statusColor: '#FCD34D', q: "A.2 Tarifas y mecanismo de ajuste: regulación, indexación", a: "Tarifas reguladas por ANDE con ajuste anual por inflación. El modelo incluye subsidios cruzados para usuarios de bajos ingresos.", completar: "PENDIENTE: Obtener histórico de ajustes tarifarios de los últimos 5 años. Confirmar mecanismo de rebalanceo si los costos operativos superan el techo tarifario." },
      { status: '🔴 Sin respuesta', statusBg: 'rgba(239,68,68,0.1)', statusColor: '#FCA5A5', q: "ESG.1 Plan de gestión social: consulta comunitaria, reasentamientos", a: "Información pendiente del target — requerida antes de IC formal.", completar: null },
    ]
  }
};

const Nivel2Page = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeLP, setActiveLP] = useState('caf');
  const [activeDeal, setActiveDeal] = useState('solar');

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', color: '#B8860B' },
    { id: 'lp', label: 'LP Relations', color: '#93C5FD' },
    { id: 'deal', label: 'Deal Due Diligence', color: '#86EFAC' },
    { id: 'kb', label: 'Base de Conocimiento', color: '#C4B5FD' },
  ];

  const lps = [
    { id: 'caf', name: 'CAF', meta: 'DFI · Inglés · ILPA', pct: 87, status: 'En revisión', statusColor: '#93C5FD', deadline: 'Mar 28' },
    { id: 'skandia', name: 'Skandia', meta: 'Aseguradora · Español', pct: 61, status: 'En proceso', statusColor: '#B8860B', deadline: 'Abr 5' },
    { id: 'porvenir', name: 'Porvenir ⚠', meta: 'Pensiones · Español', pct: 34, status: 'Input requerido', statusColor: '#FCA5A5', deadline: 'Mar 22' },
    { id: 'bid', name: 'BID Invest', meta: 'DFI · Inglés · ILPA', pct: 95, status: 'Listo para enviar', statusColor: '#86EFAC', deadline: 'Mar 20' },
    { id: 'proteccion', name: 'Protección', meta: 'Pensiones · Español', pct: 52, status: 'En proceso', statusColor: '#B8860B', deadline: 'Abr 12' },
  ];

  const deals = [
    { id: 'solar', name: 'Proyecto Solar Córdoba', meta: 'Colombia · ~USD 55M', sector: 'Energía renovable', sectorColor: '#FCD34D', sectorBg: 'rgba(250,204,21,0.1)' },
    { id: 'callao', name: 'Puerto Callao Logística', meta: 'Perú · ~USD 40M', sector: 'Logística', sectorColor: '#93C5FD', sectorBg: 'rgba(96,165,250,0.1)' },
    { id: 'agua', name: 'Agua Potable Guatemala', meta: 'Guatemala · ~USD 35M', sector: 'Agua y residuos', sectorColor: '#6EE7B7', sectorBg: 'rgba(52,211,153,0.1)' },
  ];

  const s = {
    page: { background: '#F5F2EC', minHeight: '100vh', fontFamily: 'Inter, sans-serif' } as React.CSSProperties,
    container: { maxWidth: 1200, margin: '0 auto', padding: '32px 48px 80px' } as React.CSSProperties,
    back: { fontSize: 18, color: '#8A8880', cursor: 'pointer', marginBottom: 32, background: 'none', border: 'none', padding: 0, display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'Inter, sans-serif' } as React.CSSProperties,
    system: { background: '#0A2240', borderRadius: 8, overflow: 'hidden', border: '1px solid #1E3A5A' } as React.CSSProperties,
    appHeader: { background: '#0A2240', borderBottom: '1px solid #1E3A5A', padding: '0 24px', display: 'flex', alignItems: 'center', height: 48, gap: 0 } as React.CSSProperties,
    tabsBar: { display: 'flex', background: '#071B33', borderBottom: '1px solid #1E3A5A', padding: '0 24px', gap: 0 } as React.CSSProperties,
    content: { minHeight: 520, overflow: 'auto' } as React.CSSProperties,
  };

  const kpiCard = (label: string, value: string, sub: string, subAlert = false) => (
    <div style={{ background: '#071B33', border: '1px solid #1E3A5A', borderRadius: 4, padding: '14px 16px' }}>
      <div style={{ fontSize: 13, color: '#4A6070', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 }}>{label}</div>
      <div style={{ fontFamily: 'Georgia, serif', fontSize: 39, fontWeight: 700, color: '#F8F5F0', lineHeight: 1, marginBottom: 4 }}>{value}</div>
      <div style={{ fontSize: 14, color: subAlert ? '#B8860B' : '#4A6070' }}>{sub}</div>
    </div>
  );

  const badge = (text: string, bg: string, color: string) => (
    <span style={{ display: 'inline-block', fontSize: 13, fontWeight: 600, padding: '2px 8px', borderRadius: 2, background: bg, color }}>{text}</span>
  );

  const progressBar = (pct: number) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <div style={{ width: 80, height: 4, background: '#1E3A5A', borderRadius: 2, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: pct > 80 ? '#86EFAC' : '#B8860B', borderRadius: 2 }} />
      </div>
      <span style={{ fontSize: 14, color: pct > 80 ? '#86EFAC' : '#B8860B', fontWeight: 600 }}>{pct}%</span>
    </div>
  );

  const sectionLabel = (text: string) => (
    <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#B8860B', marginBottom: 10 }}>{text}</div>
  );

  const ddqQuestion = (status: string, statusBg: string, statusColor: string, q: string, a: string, completar?: string) => (
    <div style={{ padding: '12px 0', borderBottom: '1px solid #0D2540' }}>
      <div style={{ display: 'inline-block', fontSize: 15, fontWeight: 700, padding: '2px 7px', borderRadius: 2, marginBottom: 6, background: statusBg, color: statusColor }}>{status}</div>
      <div style={{ fontSize: 15, fontWeight: 600, color: '#C8D8E8', marginBottom: 6 }}>{q}</div>
      <div style={{ fontSize: 15, color: '#6A8AAA', lineHeight: 1.6 }}>{a}</div>
      {completar && (
        <div style={{ fontSize: 14, color: '#854D0E', fontStyle: 'italic', marginTop: 6, padding: '5px 8px', background: 'rgba(133,77,14,0.1)', borderRadius: 2 }}>{completar}</div>
      )}
    </div>
  );

  const alertItem = (dotColor: string, text: string, time: string) => (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 12px', borderRadius: 4, background: '#071B33', border: '1px solid #1E3A5A', marginBottom: 6 }}>
      <div style={{ width: 6, height: 6, borderRadius: '50%', background: dotColor, flexShrink: 0, marginTop: 4 }} />
      <div>
        <div style={{ fontSize: 15, color: '#8AAABB', lineHeight: 1.5 }}>{text}</div>
        <div style={{ fontSize: 13, color: '#4A6070', marginTop: 2 }}>{time}</div>
      </div>
    </div>
  );

  const kbDoc = (icon: string, name: string, meta: string, statusText: string, statusBg: string, statusColor: string) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', background: '#071B33', border: '1px solid #1E3A5A', borderRadius: 4, marginBottom: 6 }}>
      <div style={{ width: 28, height: 28, background: '#1E3A5A', borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: '#B8860B', fontWeight: 700, flexShrink: 0 }}>{icon}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 15, color: '#C8D8E8' }}>{name}</div>
        <div style={{ fontSize: 13, color: '#4A6070' }}>{meta}</div>
      </div>
      <span style={{ fontSize: 15, fontWeight: 600, padding: '2px 6px', borderRadius: 2, background: statusBg, color: statusColor }}>{statusText}</span>
    </div>
  );

  const kbSection = (title: string, count: string, pct: number, desc: string) => (
    <div style={{ background: '#071B33', border: '1px solid #1E3A5A', borderRadius: 4, padding: '14px 16px', marginBottom: 8 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6, fontSize: 15, fontWeight: 600, color: '#F8F5F0' }}>
        {title}
        <span style={{ fontSize: 13, color: '#B8860B', fontWeight: 600 }}>{count}</span>
      </div>
      <div style={{ height: 3, background: '#1E3A5A', borderRadius: 2, overflow: 'hidden', marginBottom: 8 }}>
        <div style={{ height: '100%', width: `${pct}%`, background: pct > 80 ? '#86EFAC' : pct > 60 ? '#B8860B' : '#FCA5A5', borderRadius: 2 }} />
      </div>
      <div style={{ fontSize: 14, color: pct < 50 ? '#FCA5A5' : '#4A6070' }}>{desc}</div>
    </div>
  );

  // ── DASHBOARD ──
  const renderDashboard = () => (
    <div style={{ padding: '20px 24px', overflowY: 'auto', flex: 1, minHeight: 0 }}>
      {sectionLabel('Estado operacional · Hoy')}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 12, marginBottom: 20 }}>
        {kpiCard('DDQs de LPs activos', '5', '2 requieren atención esta semana', true)}
        {kpiCard('DDs a targets en curso', '3', 'Fondo Andino III — desplegando')}
        {kpiCard('Completitud media DDQs', '68%', 'Promedio histórico era 41%')}
        {kpiCard('Preguntas indexadas', '347', 'En base de conocimiento')}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 16 }}>
        <div>
          {sectionLabel('Pipeline LP Relations — Fondo Andino III')}
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['LP', 'Progreso', 'Estado', 'Deadline'].map(h => (
                  <th key={h} style={{ fontSize: 15, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: '#4A6070', padding: '8px 12px', textAlign: 'left', borderBottom: '1px solid #1E3A5A' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {lps.map(lp => (
                <tr key={lp.id} style={{ cursor: 'pointer' }} onClick={() => { setActiveLP(lp.id); setActiveTab('lp'); }}>
                  <td style={{ padding: '10px 12px', borderBottom: '1px solid #0D2540' }}>
                    <div style={{ fontSize: 17, fontWeight: 600, color: '#F8F5F0' }}>{lp.name}</div>
                    <div style={{ fontSize: 13, color: '#4A6070' }}>{lp.meta}</div>
                  </td>
                  <td style={{ padding: '10px 12px', borderBottom: '1px solid #0D2540' }}>{progressBar(lp.pct)}</td>
                  <td style={{ padding: '10px 12px', borderBottom: '1px solid #0D2540' }}>{badge(lp.status, `${lp.statusColor}22`, lp.statusColor)}</td>
                  <td style={{ padding: '10px 12px', borderBottom: '1px solid #0D2540', fontSize: 14, color: lp.id === 'porvenir' ? '#FCA5A5' : '#4A6070' }}>{lp.deadline}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ marginTop: 16 }}>
            {sectionLabel('Deal DD activos — Fondo Andino III')}
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {['Activo / Target', 'País', 'Sector', 'Estado'].map(h => (
                    <th key={h} style={{ fontSize: 15, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: '#4A6070', padding: '8px 12px', textAlign: 'left', borderBottom: '1px solid #1E3A5A' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Proyecto Solar Córdoba', meta: '~USD 55M · En DD', pais: '🇨🇴 Col', sector: 'Energía', sColor: '#FCD34D', sBg: 'rgba(250,204,21,0.1)', estado: 'DD técnico', eColor: '#B8860B' },
                  { name: 'Puerto Callao Logística', meta: '~USD 40M · Screening', pais: '🇵🇪 Per', sector: 'Logística', sColor: '#93C5FD', sBg: 'rgba(96,165,250,0.1)', estado: 'Screening', eColor: '#93C5FD' },
                  { name: 'Agua Potable Guatemala', meta: '~USD 35M · IC prelim.', pais: '🇬🇹 Gua', sector: 'Agua', sColor: '#6EE7B7', sBg: 'rgba(52,211,153,0.1)', estado: 'IC prelim.', eColor: '#86EFAC' },
                ].map((d, i) => (
                  <tr key={i} style={{ cursor: 'pointer' }} onClick={() => { setActiveDeal(deals[i].id); setActiveTab('deal'); }}>
                    <td style={{ padding: '10px 12px', borderBottom: '1px solid #0D2540' }}>
                      <div style={{ fontSize: 17, fontWeight: 600, color: '#F8F5F0' }}>{d.name}</div>
                      <div style={{ fontSize: 13, color: '#4A6070' }}>{d.meta}</div>
                    </td>
                    <td style={{ padding: '10px 12px', borderBottom: '1px solid #0D2540', fontSize: 17 }}>{d.pais}</td>
                    <td style={{ padding: '10px 12px', borderBottom: '1px solid #0D2540' }}>{badge(d.sector, d.sBg, d.sColor)}</td>
                    <td style={{ padding: '10px 12px', borderBottom: '1px solid #0D2540' }}>{badge(d.estado, `${d.eColor}22`, d.eColor)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          {sectionLabel('Alertas que requieren atención')}
          {alertItem('#FCA5A5', 'DDQ Porvenir vence en 6 días — faltan 8 respuestas de Compliance', 'Hoy · Alta prioridad')}
          {alertItem('#B8860B', 'Nueva inversión Lógika afecta 12 respuestas en 3 DDQs activos — actualización pendiente', 'Hace 2 días')}
          {alertItem('#93C5FD', 'CAF solicitó información adicional sobre métricas ESG del Fondo III', 'Hace 3 días')}
          {alertItem('#86EFAC', 'DDQ BID Invest listo para revisión final antes de envío', 'Hace 1 día')}
          {alertItem('#B8860B', 'Proyecto Solar Córdoba: informe técnico recibido — pendiente análisis CREG', 'Hoy')}
        </div>
      </div>
    </div>
  );

  // ── LP RELATIONS ──
  const renderLP = () => (
    <div style={{ display: 'flex', flex: 1, overflow: 'hidden', minHeight: 0 }}>
      <div style={{ width: 220, flexShrink: 0, borderRight: '1px solid #1E3A5A', overflowY: 'auto', padding: '12px 0' }}>
        <div style={{ padding: '8px 16px 12px', fontSize: 15, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#4A6070' }}>Fondo Andino III</div>
        {lps.map(lp => (
          <div
            key={lp.id}
            onClick={() => setActiveLP(lp.id)}
            style={{ padding: '10px 16px', cursor: 'pointer', borderLeft: `2px solid ${activeLP === lp.id ? '#B8860B' : 'transparent'}`, background: activeLP === lp.id ? '#071B33' : 'transparent' }}
          >
            <div style={{ fontSize: 17, fontWeight: 600, color: '#F8F5F0', marginBottom: 2 }}>{lp.name}</div>
            <div style={{ fontSize: 14, color: '#4A6070', marginBottom: 4 }}>{lp.meta}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ flex: 1, height: 3, background: '#1E3A5A', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${lp.pct}%`, background: '#B8860B', borderRadius: 2 }} />
              </div>
              <span style={{ fontSize: 13, color: '#B8860B', fontWeight: 600 }}>{lp.pct}%</span>
            </div>
          </div>
        ))}
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
        {lpData[activeLP] && (() => {
          const lp = lpData[activeLP];
          return (
            <>
              <div style={{ marginBottom: 20, paddingBottom: 16, borderBottom: '1px solid #1E3A5A' }}>
                <div style={{ fontFamily: 'Georgia, serif', fontSize: 31, fontWeight: 700, color: '#F8F5F0', marginBottom: 4 }}>{lp.fullName}</div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                  {badge(lp.status, `${lp.statusColor}22`, lp.statusColor)}
                  <span style={{ fontSize: 14, color: '#4A6070' }}>{lp.formato} · {lp.idioma} · Deadline: {lp.deadline}</span>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, marginBottom: 20 }}>
                <div style={{ background: '#071B33', border: '1px solid #1E3A5A', borderRadius: 4, padding: '10px 12px', textAlign: 'center' }}>
                  <div style={{ fontSize: 15, color: '#4A6070', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 }}>Completas</div>
                  <div style={{ fontFamily: 'Georgia, serif', fontSize: 31, fontWeight: 700, color: '#86EFAC' }}>{lp.completas}</div>
                </div>
                <div style={{ background: '#071B33', border: '1px solid #1E3A5A', borderRadius: 4, padding: '10px 12px', textAlign: 'center' }}>
                  <div style={{ fontSize: 15, color: '#4A6070', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 }}>Parciales</div>
                  <div style={{ fontFamily: 'Georgia, serif', fontSize: 31, fontWeight: 700, color: '#B8860B' }}>{lp.parciales}</div>
                </div>
                <div style={{ background: '#071B33', border: '1px solid #1E3A5A', borderRadius: 4, padding: '10px 12px', textAlign: 'center' }}>
                  <div style={{ fontSize: 15, color: '#4A6070', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 }}>Input requerido</div>
                  <div style={{ fontFamily: 'Georgia, serif', fontSize: 31, fontWeight: 700, color: '#FCA5A5' }}>{lp.input}</div>
                </div>
              </div>
              {lp.notas && (
                <div style={{ marginBottom: 20, padding: '12px 16px', background: '#071B33', border: '1px solid #1E3A5A', borderRadius: 4, borderLeft: '3px solid #B8860B' }}>
                  <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: '#B8860B', marginBottom: 6 }}>Notas</div>
                  <div style={{ fontSize: 17, color: '#8AAABB', lineHeight: 1.6 }}>{lp.notas}</div>
                </div>
              )}
              {sectionLabel('Respuestas del DDQ')}
              {lp.preguntas.map((p, i) => ddqQuestion(p.status, p.statusBg, p.statusColor, p.q, p.a, p.completar ?? undefined))}
            </>
          );
        })()}
      </div>
    </div>
  );

  // ── DEAL DD ──
  const renderDeal = () => (
    <div style={{ display: 'flex', flex: 1, overflow: 'hidden', minHeight: 0 }}>
      <div style={{ width: 220, flexShrink: 0, borderRight: '1px solid #1E3A5A', overflowY: 'auto', padding: '12px 0' }}>
        <div style={{ padding: '8px 16px 12px', fontSize: 15, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#4A6070' }}>Fondo Andino III</div>
        {deals.map(d => (
          <div
            key={d.id}
            onClick={() => setActiveDeal(d.id)}
            style={{ padding: '10px 16px', cursor: 'pointer', borderLeft: `2px solid ${activeDeal === d.id ? '#B8860B' : 'transparent'}`, background: activeDeal === d.id ? '#071B33' : 'transparent' }}
          >
            <div style={{ fontSize: 17, fontWeight: 600, color: '#F8F5F0', marginBottom: 2 }}>{d.name}</div>
            <div style={{ fontSize: 14, color: '#4A6070', marginBottom: 4 }}>{d.meta}</div>
            <span style={{ fontSize: 15, fontWeight: 600, padding: '1px 6px', borderRadius: 2, background: d.sectorBg, color: d.sectorColor }}>{d.sector}</span>
          </div>
        ))}
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
        {dealData[activeDeal] && (() => {
          const d = dealData[activeDeal];
          return (
            <>
              <div style={{ marginBottom: 20, paddingBottom: 16, borderBottom: '1px solid #1E3A5A' }}>
                <div style={{ fontFamily: 'Georgia, serif', fontSize: 31, fontWeight: 700, color: '#F8F5F0', marginBottom: 4 }}>{d.name}</div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                  {badge(d.etapa, 'rgba(184,134,11,0.15)', '#B8860B')}
                  <span style={{ fontSize: 14, color: '#4A6070' }}>{d.pais} · {d.ticket} · {d.compartimento}</span>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8, marginBottom: 20 }}>
                <div style={{ background: '#071B33', border: '1px solid #1E3A5A', borderRadius: 4, padding: '10px 12px', textAlign: 'center' }}>
                  <div style={{ fontSize: 15, color: '#4A6070', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 }}>Ticket</div>
                  <div style={{ fontFamily: 'Georgia, serif', fontSize: 25, fontWeight: 700, color: '#F8F5F0' }}>{d.ticket}</div>
                </div>
                <div style={{ background: '#071B33', border: '1px solid #1E3A5A', borderRadius: 4, padding: '10px 12px', textAlign: 'center' }}>
                  <div style={{ fontSize: 15, color: '#4A6070', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 }}>Capacidad</div>
                  <div style={{ fontFamily: 'Georgia, serif', fontSize: 25, fontWeight: 700, color: '#F8F5F0' }}>{d.capacidad}</div>
                </div>
                <div style={{ background: '#071B33', border: '1px solid #1E3A5A', borderRadius: 4, padding: '10px 12px', textAlign: 'center' }}>
                  <div style={{ fontSize: 15, color: '#4A6070', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 }}>TIR esperada</div>
                  <div style={{ fontFamily: 'Georgia, serif', fontSize: 25, fontWeight: 700, color: '#B8860B' }}>{d.tir}</div>
                </div>
                <div style={{ background: '#071B33', border: '1px solid #1E3A5A', borderRadius: 4, padding: '10px 12px', textAlign: 'center' }}>
                  <div style={{ fontSize: 15, color: '#4A6070', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 }}>Estado</div>
                  <div style={{ fontFamily: 'Georgia, serif', fontSize: 25, fontWeight: 700, color: d.estadoColor }}>{d.estado}</div>
                </div>
              </div>
              {d.notas && (
                <div style={{ marginBottom: 20, padding: '12px 16px', background: '#071B33', border: '1px solid #1E3A5A', borderRadius: 4, borderLeft: '3px solid #B8860B' }}>
                  <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: '#B8860B', marginBottom: 6 }}>Notas</div>
                  <div style={{ fontSize: 17, color: '#8AAABB', lineHeight: 1.6 }}>{d.notas}</div>
                </div>
              )}
              {sectionLabel('Cuestionario de DD enviado al target')}
              {d.preguntas.map((p, i) => ddqQuestion(p.status, p.statusBg, p.statusColor, p.q, p.a, p.completar ?? undefined))}
            </>
          );
        })()}
      </div>
    </div>
  );

  // ── BASE DE CONOCIMIENTO ──
  const renderKB = () => (
    <div style={{ padding: '20px 24px', overflowY: 'auto', flex: 1, minHeight: 0 }}>
      <input
        placeholder="Buscar en la base de conocimiento — ej: 'respuestas ESG anteriores' o 'template DD energía'"
        style={{ width: '100%', padding: '10px 16px', background: '#071B33', border: '1px solid #1E3A5A', borderRadius: 4, color: '#F8F5F0', fontSize: 17, marginBottom: 20, fontFamily: 'Inter, sans-serif', outline: 'none' }}
      />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
        <div>
          {sectionLabel('Contexto institucional de Ashmore')}
          {kbDoc('A', 'Perfil institucional Ashmore Colombia', 'Firma, fondos, portafolio, equipo · Mar 2026', 'Activo', 'rgba(34,197,94,0.1)', '#86EFAC')}
          {kbDoc('F', 'Reglamento Fondo Andino III', 'Mandato, restricciones, términos · Confidencial', 'Activo', 'rgba(34,197,94,0.1)', '#86EFAC')}
          {kbDoc('E', 'Política ESG — IFC Performance Standards', 'PS 1-8, ejemplos portafolio · 2025', 'Activo', 'rgba(34,197,94,0.1)', '#86EFAC')}
          {kbDoc('T', 'Track record Fondos I y II', 'TIR, MOIC, casos de éxito · Requiere actualización', 'Actualizar', 'rgba(133,77,14,0.15)', '#FCD34D')}
        </div>
        <div>
          {sectionLabel('Preguntas indexadas por sección')}
          {kbSection('Firm General Information', '47 preguntas', 94, '94% con respuesta lista · Actualizado automáticamente')}
          {kbSection('Investment Strategy', '38 preguntas', 87, '87% con respuesta lista')}
          {kbSection('ESG & Diversity', '52 preguntas', 71, '71% lista · Fondo III requiere métricas de impacto')}
          {kbSection('Team & Key Person', '31 preguntas', 45, '45% lista · Biographies pendientes de RRHH')}
        </div>
      </div>
      {sectionLabel('Templates de DD para targets por sector')}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8 }}>
        {[
          { icon: 'DD', name: 'Template DD Energía', meta: 'Solar, eólica, cogeneración · 94 preguntas' },
          { icon: 'DD', name: 'Template DD Transporte', meta: 'Vías, puertos, ferrocarril · 87 preguntas' },
          { icon: 'DD', name: 'Template DD Agua', meta: 'Acueducto, residuos · 76 preguntas' },
          { icon: 'DD', name: 'Template DD Social', meta: 'Salud, educación, logística · 68 preguntas' },
        ].map(t => (
          <div key={t.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '12px 14px', background: '#071B33', border: '1px solid #1E3A5A', borderRadius: 4, cursor: 'pointer' }}>
            <div style={{ width: 28, height: 28, background: '#1E3A5A', borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: '#B8860B', fontWeight: 700, marginBottom: 8 }}>{t.icon}</div>
            <div style={{ fontSize: 15, color: '#C8D8E8', marginBottom: 2 }}>{t.name}</div>
            <div style={{ fontSize: 13, color: '#4A6070' }}>{t.meta}</div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: '#0A2240',
      fontFamily: 'Inter, sans-serif',
      overflow: 'hidden'
    }}>
      {/* APP HEADER — reemplaza el Header del portal */}
      <div style={{
        height: 48,
        background: '#0A2240',
        borderBottom: '1px solid #1E3A5A',
        display: 'flex',
        alignItems: 'center',
        padding: '0 24px',
        flexShrink: 0,
        gap: 0
      }}>
        <button
          onClick={() => navigate('/componente/levantar-capital')}
          style={{
            fontSize: 15, color: '#4A6070', cursor: 'pointer',
            background: 'none', border: 'none', padding: 0,
            display: 'flex', alignItems: 'center', gap: 6,
            fontFamily: 'Inter, sans-serif', marginRight: 20,
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#8AAABB'}
          onMouseLeave={e => e.currentTarget.style.color = '#4A6070'}
        >
          ← Volver
        </button>
        <div style={{ width: 1, height: 20, background: '#1E3A5A', marginRight: 20 }} />
        <span style={{ fontFamily: 'Georgia, serif', fontSize: 20, fontWeight: 700, color: '#F8F5F0', marginRight: 8 }}>Ashmore</span>
        <span style={{ fontSize: 14, color: '#B8860B', letterSpacing: 2, textTransform: 'uppercase', marginRight: 24 }}>Colombia</span>
        <div style={{ width: 1, height: 20, background: '#1E3A5A', marginRight: 24 }} />
        <span style={{ fontSize: 14, color: '#4A6070', letterSpacing: 2, textTransform: 'uppercase', flex: 1 }}>
          Sistema de Gestión de Due Diligence · IA
        </span>
        <div style={{ fontSize: 13, fontWeight: 600, padding: '3px 10px', background: 'rgba(184,134,11,0.15)', color: '#B8860B', borderRadius: 2, border: '1px solid rgba(184,134,11,0.3)' }}>
          Nivel 2 — Demo
        </div>
      </div>

      {/* TABS */}
      <div style={{
        display: 'flex',
        background: '#071B33',
        borderBottom: '1px solid #1E3A5A',
        padding: '0 24px',
        flexShrink: 0,
      }}>
        {tabs.map(tab => (
          <div
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '12px 24px',
              fontSize: 17,
              fontWeight: 500,
              color: activeTab === tab.id ? '#F8F5F0' : '#4A6070',
              cursor: 'pointer',
              borderBottom: `2px solid ${activeTab === tab.id ? '#B8860B' : 'transparent'}`,
              transition: 'all 0.15s',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span style={{ display: 'inline-block', width: 7, height: 7, borderRadius: '50%', background: tab.color }} />
            {tab.label}
          </div>
        ))}
      </div>

      {/* CONTENT — ocupa todo el espacio restante */}
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'lp' && renderLP()}
        {activeTab === 'deal' && renderDeal()}
        {activeTab === 'kb' && renderKB()}
      </div>
    </div>
  );
};

export default Nivel2Page;
