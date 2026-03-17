import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";

const PROMPT_REPORTE_LP = `Eres el analista senior de Investor Relations de Ashmore Management Company Colombia, preparando el reporte trimestral del fondo para un LP institucional.

CONTEXTO DEL FONDO:
- Fondo: Fondo Ashmore Andino III (USD 420M, Colombia/Perú/Centroamérica)
- Administrador: Alianza Fiduciaria S.A.
- Período del reporte: [Trimestre y año]
- LP destinatario: [Nombre del LP y tipo — DFI, pensiones, aseguradora]

PORTAFOLIO DEL FONDO III (inversiones realizadas):
- Bioena: planta de pellets de madera, USD 100M, Colombia
- Lógika: centro logístico, Colombia
- Ática Andina Residuales: gestión de residuos, Colombia
- Creas: infraestructura social, Colombia
- Siberia Carga: logística, Colombia
- Puerta de Oro: logística, Colombia
- ATICA: agua y residuos, Colombia

DOCUMENTOS DISPONIBLES:
[Adjuntar o describir: reportes trimestrales de cada activo, estados financieros del fondo, métricas ESG del período]

GENERA UN REPORTE TRIMESTRAL LP con exactamente estas 6 secciones, adaptadas al perfil del LP:

**1. CARTA DEL GESTOR**
Párrafo de apertura del Director de Inversiones. Tono y énfasis según el LP: DFIs esperan lenguaje de impacto de desarrollo; fondos de pensiones quieren claridad sobre retorno y liquidez; family offices valoran acceso y trato directo. Máximo 150 palabras.

**2. RESUMEN EJECUTIVO DEL FONDO**
NAV del fondo al cierre del período, capital desplegado vs. comprometido, distribuciones del trimestre, evolución del NAV vs. período anterior. Tabla de KPIs del fondo.

**3. ESTADO DEL PORTAFOLIO**
Para cada activo: semáforo (verde/amarillo/rojo), ingresos vs. plan, EBITDA vs. plan, evento material del trimestre si aplica. Tabla consolidada. Sin exceder 2 líneas por activo.

**4. EVENTOS MATERIALES DEL TRIMESTRE**
Los 2-3 eventos más relevantes del período que el LP debe conocer. Cada uno con: qué pasó, impacto en el fondo, y qué está haciendo Ashmore al respecto.

**5. MÉTRICAS ESG**
Según el perfil del LP:
- DFIs (CAF, BID): métricas de impacto IRIS+ — empleos, género, CO2, acceso a servicios. Progreso vs. plan de impacto.
- Fondos de pensiones: cumplimiento regulatorio ESG, incidentes, auditorías pendientes.
- Todos: avance del ESAP por activo.

**6. PERSPECTIVAS Y PRÓXIMOS PASOS**
Qué esperar en el próximo trimestre: inversiones en pipeline, eventos regulatorios relevantes, juntas materiales, distribuciones proyectadas. Máximo 150 palabras.

INSTRUCCIONES DE ADAPTACIÓN POR LP:
- DFI internacional (CAF, BID, SIFEM): énfasis en impacto, additionality, métricas IRIS+, lenguaje en inglés si aplica
- Fondo de pensiones local (Porvenir, Protección, Skandia): énfasis en NAV, distribuciones, DSCR, cumplimiento Superfinanciera
- Institucional general: balance entre retorno e impacto, tono más ejecutivo

TONO: Reporte institucional formal. Datos concretos. Sin adornos ni lenguaje de marketing. El LP lo comparte internamente con su equipo de inversiones.

[ADJUNTAR: Reportes trimestrales de los activos del portafolio]`;

const OUTPUT_EJEMPLO_REPORTE = [
  {
    num: '1', titulo: 'Carta del gestor',
    color: '#B8860B',
    texto: 'Estimados representantes de CAF:\n\nEl primer trimestre de 2026 consolidó el despliegue del Fondo Andino III con siete inversiones realizadas por un total de USD 218M comprometidos. Los activos del portafolio reportaron desempeño operativo en línea con el plan, con excepción de Bioena donde ajustes en el mercado de pellets europeo requirieron revisión del plan comercial.\n\nEl trimestre estuvo marcado por la expedición de la Resolución CREG 101 100 de 2026, cuyo análisis de impacto sobre los activos de energía del fondo está en curso.\n\nJuan Carlos Pérez\nDirector de Inversiones, Ashmore Management Company Colombia'
  },
  {
    num: '2', titulo: 'Resumen ejecutivo del fondo',
    color: '#93C5FD',
    texto: 'NAV del Fondo: USD 234.8M (vs. USD 218.0M capital desplegado)\nCapital comprometido: USD 420M | Capital desplegado: USD 218M (52%)\nDistribuciones Q1 2026: USD 0 (período de inversión activo)\nTIR neta proyectada: 12.8-14.2% USD\n\nKPIs del fondo Q1 2026:\n• Inversiones activas: 7\n• EBITDA consolidado portafolio: USD 12.4M (+8% vs. Q1 2025)\n• Deuda neta portafolio: USD 89M\n• DSCR promedio: 1.38x\n• Cobertura ESG: 100% de activos bajo estándares IFC'
  },
  {
    num: '3', titulo: 'Estado del portafolio',
    color: '#86EFAC',
    texto: '🟢 Lógika: Ingresos USD 3.2M (+12% vs. plan). EBITDA USD 2.1M. Ocupación 94%. Sin eventos materiales.\n\n🟡 Bioena: Ingresos USD 4.8M (-8% vs. plan). EBITDA USD 2.9M. Ajuste en demanda europea de pellets — plan comercial en revisión.\n\n🟢 Ática Andina Residuales: Ingresos USD 2.1M (+3% vs. plan). EBITDA USD 1.4M. Expansión de cobertura a 2 municipios adicionales.\n\n🟢 Creas: Ingresos USD 1.8M (en línea). EBITDA USD 1.2M. Certificación IFC PS completada en Q1.\n\n🟢 Siberia Carga: Ingresos USD 1.1M (+5%). EBITDA USD 0.7M. Sin eventos materiales.'
  },
  {
    num: '4', titulo: 'Eventos materiales',
    color: '#FCA5A5',
    texto: '1. Resolución CREG 101 100 de 2026 (MCE): Nueva regulación del mercado eléctrico colombiano con potencial impacto en activos de energía del portafolio. Ashmore está realizando análisis de impacto con asesor legal especializado. Posición del fondo se definirá en Q2 2026.\n\n2. Ajuste plan comercial Bioena: Caída del 12% en precios de pellets en mercado europeo (guerra de precios Rusia-Europa). Bioena está diversificando hacia mercados asiáticos. Impacto en ingresos 2026 estimado en -8% vs. plan original. Situación monitorizada mensualmente.'
  },
  {
    num: '5', titulo: 'Métricas ESG — Impacto Q1 2026',
    color: '#F9A8D4',
    texto: 'EMPLEOS: 1,847 empleos directos mantenidos en el portafolio (+124 vs. Q1 2025)\nGÉNERO: 34% mujeres en fuerza laboral del portafolio (target: 40% a 2027)\nCO2 EVITADO: 48,200 toneladas (energía renovable + eficiencia logística)\nACCESO A SERVICIOS: 89,000 hogares con acceso a gestión de residuos (Ática)\n\nAvance ESAP por activo:\n• Lógika: 92% completado\n• Ática Andina: 78% completado\n• Creas: 100% completado — certificado Q1\n• Bioena: 65% — ampliación de plazo solicitada por ajuste del plan operativo'
  },
  {
    num: '6', titulo: 'Perspectivas Q2 2026',
    color: '#6EE7B7',
    texto: 'Pipeline activo: Proyecto Solar Córdoba (Colombia, ~USD 55M) en due diligence avanzado — IC preliminar esperado para abril 2026. Puerto Callao Logística (Perú, ~USD 40M) en fase de screening.\n\nEventos regulatorios: Definición de participación en MCE (CREG 101 100) prevista para mayo. Renovación tarifaria de Ática Andina ante regulador en proceso.\n\nDistribuciones: No se proyectan distribuciones ordinarias en Q2. Primera distribución de capital proyectada para Q3 2027 cuando madurez de Lógika lo permita.'
  }
];

const ReporteLpPage = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const [activeLp, setActiveLp] = useState('caf');
  const navy = '#0A2240';
  const copper = '#B8860B';
  const cream = '#F5F2EC';

  return (
    <div style={{ background: cream, minHeight: '100vh',
      fontFamily: 'Inter, sans-serif' }}>
      <Header />
      <div style={{ maxWidth: 960, margin: '0 auto',
        padding: '48px 64px 80px' }}>

        <button
          onClick={() => navigate('/componente/gestionar-invertido')}
          style={{ fontSize: 13, color: '#8A8880',
            cursor: 'pointer', marginBottom: 40,
            background: 'none', border: 'none', padding: 0,
            display: 'inline-flex', alignItems: 'center',
            gap: 6, fontFamily: 'Inter, sans-serif' }}>
          ← Gestionar lo Invertido
        </button>

        <div style={{ display: 'inline-flex',
          alignItems: 'center', gap: 8, fontSize: 10,
          fontWeight: 700, letterSpacing: 3,
          textTransform: 'uppercase', color: copper,
          marginBottom: 16 }}>
          <div style={{ width: 6, height: 6,
            background: copper, borderRadius: '50%' }} />
          Superpoder · Nivel 1
        </div>
        <div style={{ fontFamily: 'Georgia, serif',
          fontSize: 52, fontWeight: 700, color: navy,
          lineHeight: 1.05, marginBottom: 12,
          letterSpacing: -1 }}>
          Generador de<br />Reporte LP
        </div>
        <div style={{ fontSize: 16, color: '#5A6070',
          lineHeight: 1.7, maxWidth: 640,
          marginBottom: 48, paddingBottom: 40,
          borderBottom: '1px solid #E0DBD0' }}>
          Cada trimestre, el reporte correcto para cada LP —
          con el énfasis adecuado, las métricas que le importan,
          y el tono institucional que espera. En minutos,
          no en días.
        </div>

        {/* PASO 1 — TIPO DE LP */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: 10, fontWeight: 700,
            letterSpacing: 3, textTransform: 'uppercase',
            color: copper, marginBottom: 24 }}>
            — Paso 1 · El reporte cambia según el LP
          </div>
          <div style={{ display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: 12 }}>
            {[
              {
                id: 'caf',
                tipo: 'DFI Internacional',
                ejemplos: 'CAF, BID Invest, SIFEM',
                enfasis: ['Métricas de impacto IRIS+', 'Additionality demostrable', 'Avance ESAP por activo', 'Empleos, género, CO2', 'Lenguaje en inglés si aplica'],
                color: '#93C5FD',
                borderColor: '#378ADD',
                bg: '#E6F1FB',
              },
              {
                id: 'porvenir',
                tipo: 'Fondo de Pensiones Local',
                ejemplos: 'Porvenir, Protección, Skandia',
                enfasis: ['NAV y evolución trimestral', 'DSCR por activo', 'Cumplimiento Superfinanciera', 'Distribuciones proyectadas', 'Incidentes ESG regulatorios'],
                color: '#B8860B',
                borderColor: '#B8860B',
                bg: '#FFFBEB',
              },
              {
                id: 'family',
                tipo: 'Institucional / Family Office',
                ejemplos: 'Endowments, multi-family offices',
                enfasis: ['TIR neta vs. benchmark', 'Pipeline de nuevas inversiones', 'Retorno absoluto', 'Trato directo y ejecutivo', 'Balance retorno-impacto'],
                color: '#0A2240',
                borderColor: '#0A2240',
                bg: '#F0EDE6',
              },
            ].map((lp) => (
              <div
                key={lp.id}
                onClick={() => setActiveLp(lp.id)}
                style={{ background: lp.bg,
                  border: `1.5px solid ${activeLp === lp.id
                    ? lp.borderColor : '#E0DBD0'}`,
                  borderRadius: 6, padding: '20px 18px',
                  cursor: 'pointer',
                  transition: 'border-color 0.15s' }}>
                <div style={{ fontSize: 13, fontWeight: 700,
                  color: navy, marginBottom: 4 }}>
                  {lp.tipo}
                </div>
                <div style={{ fontSize: 11, color: '#5A6070',
                  marginBottom: 12 }}>{lp.ejemplos}</div>
                <div style={{ fontSize: 9, fontWeight: 700,
                  letterSpacing: 1.5, textTransform: 'uppercase',
                  color: lp.borderColor, marginBottom: 8 }}>
                  Énfasis del reporte
                </div>
                {lp.enfasis.map((e, i) => (
                  <div key={i} style={{ display: 'flex',
                    gap: 6, alignItems: 'flex-start',
                    marginBottom: 4 }}>
                    <div style={{ width: 3, height: 3,
                      borderRadius: '50%',
                      background: lp.borderColor,
                      flexShrink: 0, marginTop: 6 }} />
                    <div style={{ fontSize: 11,
                      color: '#5A6070',
                      lineHeight: 1.5 }}>{e}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* PROMPT */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: 10, fontWeight: 700,
            letterSpacing: 3, textTransform: 'uppercase',
            color: copper, marginBottom: 24 }}>
            — Paso 2 · Copia el prompt y completa el LP
          </div>
          <div style={{ background: navy, borderRadius: 6,
            padding: '24px 28px' }}>
            <div style={{ fontSize: 9, fontWeight: 700,
              letterSpacing: 2, textTransform: 'uppercase',
              color: copper, marginBottom: 16 }}>
              Prompt completo — Generador de Reporte LP
            </div>
            <div style={{ fontFamily: 'Courier New, monospace',
              fontSize: 11, color: '#8AAABB', lineHeight: 1.8,
              whiteSpace: 'pre-wrap', maxHeight: 180,
              overflow: 'hidden', position: 'relative' }}>
              {PROMPT_REPORTE_LP.substring(0, 500)}...
              <div style={{ position: 'absolute', bottom: 0,
                left: 0, right: 0, height: 60,
                background: `linear-gradient(transparent, ${navy})`,
                pointerEvents: 'none' }} />
            </div>
            <div style={{ marginTop: 20 }}>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(PROMPT_REPORTE_LP);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                style={{ padding: '10px 24px',
                  background: copied ? '#166534' : copper,
                  border: 'none', borderRadius: 4,
                  fontSize: 12, fontWeight: 700, color: navy,
                  cursor: 'pointer', letterSpacing: 1,
                  fontFamily: 'Inter, sans-serif' }}>
                {copied ? '✓ Copiado' : 'Copiar prompt completo'}
              </button>
            </div>
          </div>
          <div style={{ background: '#F0EDE6',
            borderLeft: `3px solid ${copper}`,
            padding: '14px 18px', marginTop: 12 }}>
            <div style={{ fontSize: 9, fontWeight: 700,
              letterSpacing: 1.5, textTransform: 'uppercase',
              color: copper, marginBottom: 5 }}>
              Tip
            </div>
            <div style={{ fontSize: 13, color: '#5A6070',
              lineHeight: 1.6 }}>
              En el campo [LP destinatario] especifica
              el tipo de LP — eso es lo que cambia el
              énfasis del reporte. "CAF — DFI internacional"
              genera un reporte con métricas de impacto
              detalladas. "Porvenir — fondo de pensiones"
              genera uno centrado en NAV y DSCR.
            </div>
          </div>
        </div>

        {/* OUTPUT */}
        <div style={{ marginBottom: 56 }}>
          <div style={{ fontSize: 10, fontWeight: 700,
            letterSpacing: 3, textTransform: 'uppercase',
            color: copper, marginBottom: 24 }}>
            — Paso 3 · Así se ve el reporte generado
          </div>
          <div style={{ background: 'white',
            border: '1px solid #E0DBD0', borderRadius: 6,
            overflow: 'hidden' }}>
            <div style={{ background: navy,
              padding: '16px 24px', display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700,
                  color: '#F8F5F0' }}>
                  Reporte Trimestral Q1 2026 —
                  Fondo Ashmore Andino III
                </div>
                <div style={{ fontSize: 10, color: '#4A6070',
                  marginTop: 2 }}>
                  Para: CAF — Corporación Andina de Fomento ·
                  DFI Internacional · 6 secciones
                </div>
              </div>
              <div style={{ fontSize: 9, fontWeight: 600,
                padding: '3px 10px',
                background: 'rgba(184,134,11,0.15)',
                color: copper, borderRadius: 2,
                border: '1px solid rgba(184,134,11,0.3)' }}>
                Generado con IA
              </div>
            </div>
            {!showOutput ? (
              <div style={{ padding: '32px 24px',
                textAlign: 'center' }}>
                <div style={{ fontSize: 14, color: '#8A8880',
                  marginBottom: 20 }}>
                  Ver ejemplo de reporte Q1 2026
                  generado para CAF
                </div>
                <button
                  onClick={() => setShowOutput(true)}
                  style={{ padding: '12px 32px',
                    background: navy, border: 'none',
                    borderRadius: 4, fontSize: 13,
                    fontWeight: 700, color: '#F8F5F0',
                    cursor: 'pointer',
                    fontFamily: 'Inter, sans-serif' }}>
                  Ver ejemplo de output →
                </button>
              </div>
            ) : (
              <div style={{ padding: '24px' }}>
                {OUTPUT_EJEMPLO_REPORTE.map((sec, i) => (
                  <div key={i} style={{
                    marginBottom: i < OUTPUT_EJEMPLO_REPORTE.length - 1
                      ? 28 : 0,
                    paddingBottom: i < OUTPUT_EJEMPLO_REPORTE.length - 1
                      ? 28 : 0,
                    borderBottom: i < OUTPUT_EJEMPLO_REPORTE.length - 1
                      ? '1px solid #F0EDE6' : 'none' }}>
                    <div style={{ display: 'flex',
                      alignItems: 'baseline', gap: 12,
                      marginBottom: 10 }}>
                      <span style={{
                        fontFamily: 'Georgia, serif',
                        fontSize: 32, fontWeight: 700,
                        color: '#E8E4DC', lineHeight: 1 }}>
                        {sec.num}
                      </span>
                      <div style={{ display: 'flex',
                        alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: 14,
                          fontWeight: 700, color: navy,
                          textTransform: 'uppercase',
                          letterSpacing: 1 }}>
                          {sec.titulo}
                        </span>
                        <div style={{ width: 8, height: 8,
                          borderRadius: '50%',
                          background: sec.color }} />
                      </div>
                    </div>
                    <div style={{ fontSize: 14, color: '#444',
                      lineHeight: 1.8,
                      whiteSpace: 'pre-line' }}>
                      {sec.texto}
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => setShowOutput(false)}
                  style={{ marginTop: 20, fontSize: 12,
                    color: '#8A8880', background: 'none',
                    border: 'none', cursor: 'pointer',
                    fontFamily: 'Inter, sans-serif' }}>
                  Ocultar ejemplo
                </button>
              </div>
            )}
          </div>
        </div>

        {/* NIVEL 2 CTA */}
        <div style={{ background: navy, borderRadius: 8,
          padding: '32px 40px', display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between', gap: 24 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 9, fontWeight: 700,
              letterSpacing: 3, textTransform: 'uppercase',
              color: copper, marginBottom: 10 }}>
              ¿Quieres que esto funcione automáticamente?
            </div>
            <div style={{ fontFamily: 'Georgia, serif',
              fontSize: 24, fontWeight: 700,
              color: '#F8F5F0', marginBottom: 8 }}>
              Nivel 2 — Centro de Control del Portafolio
            </div>
            <div style={{ fontSize: 13, color: '#6A8AAA',
              lineHeight: 1.6 }}>
              El sistema consolida automáticamente los
              reportes de los 11 activos, genera el
              reporte de cada LP en el formato correcto,
              y trackea cuándo fue el último reporte
              enviado a cada inversionista.
            </div>
          </div>
          <button
            onClick={() => navigate('/demo/nivel2-portafolio')}
            style={{ padding: '12px 28px',
              border: `1.5px solid ${copper}`,
              borderRadius: 4, fontSize: 11,
              fontWeight: 700, letterSpacing: 1.5,
              color: copper, background: 'transparent',
              cursor: 'pointer', textTransform: 'uppercase',
              whiteSpace: 'nowrap', flexShrink: 0,
              fontFamily: 'Inter, sans-serif' }}
            onMouseEnter={e => {
              e.currentTarget.style.background = copper;
              e.currentTarget.style.color = navy;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = copper;
            }}>
            Ver el sistema →
          </button>
        </div>

      </div>
    </div>
  );
};

export default ReporteLpPage;
