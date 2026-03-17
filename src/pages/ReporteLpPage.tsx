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
    num: '1',
    titulo: 'Carta del gestor',
    color: '#B8860B',
    texto: `Estimados representantes de CAF:

El primer trimestre de 2026 consolidó el despliegue del Fondo Andino III con siete inversiones activas por un total de USD 218M comprometidos (52% del fondo). Los activos del portafolio reportaron desempeño operativo en línea o por encima del plan, con excepción de Lógika donde ajustes en la demanda de logística de última milla en Bogotá requirieron revisión del plan de ocupación para el año.

El trimestre estuvo marcado por la expedición de la Resolución CREG 101 100 de 2026 (Mecanismo de Comercialización de Energía), cuyo análisis de impacto sobre los activos de energía del fondo está en curso. Anticipamos que esta regulación puede generar oportunidades de optimización de ingresos para los activos de generación, particularmente en el contexto de la transición energética que tanto CAF como Ashmore estamos comprometidos a apoyar en la región.

En materia de impacto de desarrollo — central para el mandato de CAF — el fondo generó en Q1 2026 más de 1,800 empleos directos sostenidos, desvió más de 89,000 toneladas de residuos de disposición inadecuada, y amplió la cobertura de servicios básicos a más de 89,000 hogares en Colombia.

Juan Carlos Pérez
Director de Inversiones — Ashmore Management Company Colombia S.A.S.`
  },
  {
    num: '2',
    titulo: 'Resumen ejecutivo del fondo',
    color: '#93C5FD',
    texto: `NAV del fondo: USD 234.8M (▲ +7.7% vs. capital desplegado de USD 218M)
Capital comprometido: USD 420M | Capital desplegado: USD 218M (52%)
TIR neta proyectada: 13.4% USD (▲ vs. 12.8% al cierre de Q4 2025)
Distribuciones Q1 2026: USD 0 — período de inversión activo
Próxima distribución proyectada: Q3 2027

KPIs consolidados del portafolio Q1 2026:
- Inversiones activas: 7 (Colombia)
- EBITDA consolidado: USD 12.4M (▲ +8% vs. Q1 2025)
- Deuda neta portafolio: USD 89M
- DSCR promedio ponderado: 1.38x
- Activos con calificación verde (en línea o mejor): 5 de 7
- Cobertura ESG bajo IFC PS: 100% de los activos`
  },
  {
    num: '3',
    titulo: 'Estado del portafolio — Q1 2026',
    color: '#86EFAC',
    texto: `🟢 Ática Andina Residuales | Agua/residuos · Colombia
Ingresos: USD 2.1M (+3% vs. plan) · EBITDA: USD 1.4M · DSCR: 1.52x
Nota: Expansión de cobertura a 2 municipios adicionales. Meta de empleos Q1 superada en 12%.

🟡 Lógika | Logística · Colombia
Ingresos: USD 3.2M (-8% vs. plan) · EBITDA: USD 2.1M · DSCR: 1.31x
Nota: Ajuste en demanda de logística última milla en Bogotá. Plan comercial en revisión — recuperación esperada en Q3.

🟢 Bioena | Industria · Colombia
Ingresos: USD 4.8M (+2% vs. plan) · EBITDA: USD 2.9M · DSCR: 1.44x
Nota: Demanda sostenida del mercado europeo de pellets. 340 empleos rurales en zonas de conflicto mantenidos.

🟢 Creas | Social · Colombia
Ingresos: USD 1.8M (en línea) · EBITDA: USD 1.2M · DSCR: 1.38x
Nota: Certificación IFC PS completada en Q1. Primer activo del fondo en completar 100% del ESAP.

🟢 Siberia Carga | Logística · Colombia
Ingresos: USD 1.1M (+5% vs. plan) · EBITDA: USD 0.7M · DSCR: 1.29x
Nota: Sin eventos materiales. Capacidad de almacenamiento expandida en 8%.

🟢 Puerta de Oro | Logística · Colombia
Ingresos: USD 0.9M (en línea) · EBITDA: USD 0.6M · DSCR: 1.33x
Nota: Primer trimestre completo de operación. Curva de rampa acorde con el plan.

🟡 ATICA | Agua/residuos · Colombia
Ingresos: USD 0.8M (-5% vs. plan) · EBITDA: USD 0.5M · DSCR: 1.22x
Nota: Retraso en ampliación de cobertura por trámites municipales. Resolución esperada Q2 2026.`
  },
  {
    num: '4',
    titulo: 'Eventos materiales del trimestre',
    color: '#FCA5A5',
    texto: `EVENTO 1: Resolución CREG 101 100 de 2026 — Mecanismo de Comercialización de Energía (MCE)
Qué pasó: La CREG expidió una nueva regulación que crea un mercado de contratos de corto plazo para energía eléctrica en Colombia, operado por Conexión Energética. La resolución busca reducir la volatilidad de la bolsa y generar señales de precio más estables para la transición energética.
Impacto en el fondo: Potencial oportunidad para los activos de energía del portafolio (incluidos en Fondos I y II, gestionados por la misma gestora). El MCE podría generar ingresos adicionales por energía no contratada en condiciones más favorables que la bolsa spot. También existe un riesgo regulatorio derivado de la cláusula de modificación unilateral del mecanismo (Art. 16, numeral v).
Acción: Análisis de impacto en curso con asesor legal especializado. Posición del fondo se definirá en Q2 2026 una vez verificadas las restricciones contractuales de cada activo. Actualizaremos a CAF en el reporte de Q2.

EVENTO 2: Retraso en ampliación de cobertura ATICA
Qué pasó: La ampliación de cobertura de ATICA a 3 municipios adicionales aprobada en enero demoró más de lo previsto en los permisos municipales. Resolución proyectada para Q2 2026.
Impacto en el fondo: Impacto de USD 0.04M en ingresos de Q1 — no material para el fondo. La demora retrasa el cumplimiento de la meta de cobertura de hogares del año en ~8 semanas.
Acción: Ashmore gestionando activamente con autoridades municipales. Contratación de gestor de trámites especializado aprobada por la junta de ATICA en marzo.`
  },
  {
    num: '5',
    titulo: 'Métricas ESG e impacto de desarrollo — Q1 2026',
    color: '#F9A8D4',
    texto: `MÉTRICAS DE IMPACTO (IRIS+):

Empleo y capital humano:
- Empleos directos sostenidos: 1,847 (▲ +124 vs. Q1 2025)
- Empleos en zonas de conflicto post-acuerdo (Bioena): 340
- % mujeres en fuerza laboral: 34% (meta 2027: 40%)
- Capacitaciones realizadas en el trimestre: 312 personas

Medio ambiente y clima:
- Residuos gestionados y desviados de rellenos: 89,420 toneladas
- Toneladas de CO2 evitadas (gestión eficiente de residuos): 48,200 ton CO2eq
- Incidentes ambientales: 0
- Auditorías ambientales completadas en el período: 3 de 7 activos

Acceso a servicios básicos:
- Hogares con acceso a gestión adecuada de residuos: 89,000+
- Municipios cubiertos: 14 en Colombia

AVANCE ESAP POR ACTIVO:
- Creas: 100% — Certificado en Q1 2026
- Lógika: 92% — En línea con cronograma
- Ática Andina: 78% — En línea
- Siberia Carga: 71% — En línea
- Bioena: 65% — Ampliación de plazo solicitada por ajuste del plan operativo
- Puerta de Oro: 48% — Por debajo del cronograma (activo reciente)
- ATICA: 41% — Por debajo del cronograma (retraso en ampliación municipal)`
  },
  {
    num: '6',
    titulo: 'Perspectivas y próximos pasos — Q2 2026',
    color: '#6EE7B7',
    texto: `Pipeline activo del Fondo III: Dos oportunidades en due diligence avanzado:
- Proyecto Solar Córdoba (Colombia, ~USD 55M, 80MW solar): IC preliminar esperado para abril 2026. Si se aprueba, el capital desplegado del fondo llegaría al 65% del total comprometido y se añadiría un activo de infraestructura climática que fortalece el mandato de impacto del fondo.
- Puerto Callao Logística (Perú, ~USD 40M): En fase de screening. Primera inversión en Perú del Fondo III — refuerza la estrategia de diversificación geográfica andina.

Eventos regulatorios a monitorear en Q2:
- Definición posición del portafolio frente al MCE (CREG 101 100): Mayo 2026
- Renovación tarifaria ATICA ante el regulador municipal: Q2 2026
- Próxima auditoría ANLA portafolio de energía (Fondos I y II): Junio 2026

Agenda ESG en Q2:
- Acelerar avance del ESAP de Puerta de Oro (48%) y ATICA (41%)
- Implementar programas de género en Bioena y Siberia Carga para avanzar hacia la meta del 40% de mujeres en la fuerza laboral para 2027

Distribuciones: No se proyectan distribuciones ordinarias en Q2 2026. La primera distribución de capital está proyectada para Q3 2027 cuando la madurez de los activos más antiguos del portafolio lo permita. Ashmore confirmará el cronograma en el reporte de Q3 2026.`
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
                  Fondo Andino III
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
                Output real generado con Claude
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
                  Ver reporte completo →
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
                    <div style={{ fontSize: 13,
                      lineHeight: 1.85, fontFamily: 'Inter, sans-serif' }}>
                      {sec.texto.split('\n').map((line, li) => (
                        <div key={li} style={{
                          marginBottom: line === '' ? 8 : 2,
                          fontWeight:
                            line.startsWith('🟢') ||
                            line.startsWith('🟡') ||
                            line.startsWith('EVENTO') ||
                            line.startsWith('MÉTRICAS') ||
                            line.startsWith('AVANCE ESAP') ||
                            line.startsWith('Pipeline') ||
                            line.startsWith('Eventos') ||
                            line.startsWith('Agenda ESG') ||
                            line.startsWith('Distribuciones')
                            ? 700 : 400,
                          color:
                            line.startsWith('🟢') ? '#166534' :
                            line.startsWith('🟡') ? '#854D0E' :
                            line.startsWith('EVENTO') ? '#0A2240' :
                            line.startsWith('MÉTRICAS') ||
                            line.startsWith('AVANCE ESAP') ? '#0A2240' :
                            '#444',
                          fontSize:
                            line.startsWith('🟢') ||
                            line.startsWith('🟡') ||
                            line.startsWith('EVENTO') ? 14 : 13,
                        }}>
                          {line}
                        </div>
                      ))}
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
                <div style={{ marginTop: 20, padding: '12px 16px',
                  background: '#F8F5F0', border: '1px solid #E0DBD0',
                  borderLeft: '3px solid #B8860B',
                  borderRadius: '0 4px 4px 0', fontSize: 12,
                  color: '#8A8880', lineHeight: 1.6,
                  fontStyle: 'italic' }}>
                  Reporte generado en 8 minutos consolidando
                  los reportes trimestrales de 7 activos del
                  portafolio del Fondo Andino III. Adaptado
                  al perfil de CAF como DFI internacional —
                  énfasis en métricas de impacto IRIS+ y
                  additionality. El mismo prompt genera
                  un reporte diferente para Porvenir o
                  BID Invest.
                </div>
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
