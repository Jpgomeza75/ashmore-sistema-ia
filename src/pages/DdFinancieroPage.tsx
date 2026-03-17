import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";

const PROMPT_DD_FINANCIERO = `Eres un analista senior de due diligence financiero especializado en infraestructura private equity en América Latina. Tienes abierto el modelo financiero del activo que estamos evaluando para el Fondo Ashmore Andino III.

CONTEXTO DE LA EVALUACIÓN:
- Gestor: Ashmore Management Company Colombia
- Fondo: Fondo Andino III (USD 420M, infraestructura climática y social)
- Ticket objetivo: USD 30-80M de equity
- TIR neta objetivo del fondo: 12-16% USD
- Horizonte: 10 años
- Estándares: IFC Performance Standards

ANALIZA EL MODELO FINANCIERO ABIERTO Y GENERA UN INFORME DE DD FINANCIERO con exactamente estas 5 secciones:

---

SECCIÓN 1: MAPA DE SUPUESTOS CRÍTICOS

Identifica los 12-15 supuestos que más impactan la TIR/retorno del modelo. Para cada uno:

| Supuesto | Valor en modelo | Tab/celda | Impacto en TIR | Calificación |

Calificación:
🟢 CONSERVADOR — por debajo del benchmark de mercado
🟡 EN LÍNEA — dentro del rango razonable para infraestructura LatAm
🔴 AGRESIVO — por encima del benchmark, requiere justificación

Benchmarks de referencia para infraestructura PE en Colombia/LatAm:
- Crecimiento de ingresos: 3-8% anual en términos reales
- Margen EBITDA infraestructura operativa: 45-75% según sector
- WACC activos regulados Colombia: 10-13% USD
- WACC activos contratados (PPA/concesión): 9-12% USD
- WACC activos de mercado: 12-15% USD
- Múltiplo de salida EV/EBITDA infraestructura: 7-10x
- Capex de mantenimiento: 2-5% de ingresos para activos maduros
- Días de cuentas por cobrar: 30-60 días para contratos con entidades públicas

---

SECCIÓN 2: ANÁLISIS DE CONSISTENCIA INTERNA

A. INCONSISTENCIAS ENTRE TABS
¿Los inputs de una tab se usan correctamente en las demás? ¿Hay valores hardcodeados donde deberían ser referencias?

B. ERRORES O ANOMALÍAS EN FÓRMULAS
Fórmulas circulares, errores #REF o #DIV/0, rangos que no cuadran.

C. INCONSISTENCIA TEMPORAL
¿Los supuestos son consistentes a lo largo del período de proyección? ¿Hay saltos abruptos sin justificación?

D. BALANCE SHEET / CASH FLOW CHECK
¿El balance cuadra? ¿El flujo de caja libre es consistente con EBITDA, capex y capital de trabajo?

Para cada hallazgo: descripción, ubicación en el modelo, materialidad (Alta / Media / Baja).

---

SECCIÓN 3: TABLA DE SENSIBILIDADES

Cruza los 3 supuestos más críticos en escenarios Pesimista / Base / Optimista.

Para cada combinación: TIR del equity, MOIC, y si supera el hurdle rate del fondo (12% USD neto).

¿En qué combinación de supuestos el activo deja de ser atractivo para el Fondo Andino III?

---

SECCIÓN 4: RED FLAGS PARA EL IC

Máximo 8 hallazgos que el Investment Committee debe conocer. Para cada uno:
- Descripción del hallazgo
- Por qué importa para la valoración o el riesgo
- Pregunta específica para el vendedor
- Información adicional requerida

Ordenar de mayor a menor materialidad.

---

SECCIÓN 5: NARRATIVA EJECUTIVA

Máximo 200 palabras que resume:
- Qué hace el activo y cómo genera caja
- La TIR que muestra el modelo y bajo qué supuestos clave
- Los 2-3 riesgos financieros más relevantes
- Recomendación: ¿los números justifican continuar el DD?

Tono: analista de DD escribiendo para el partner que va al IC. Directo, sin relleno, con criterio.

---

INSTRUCCIONES:
- Si el modelo no tiene sección de supuestos, extráelos de las fórmulas
- Si hay múltiples escenarios, analiza el caso base primero
- Referencia tabs y celdas específicas donde sea posible
- Si el modelo está en español, responde en español. Si en inglés, en inglés.`;

const OUTPUT_SECCIONES = [
  {
    num: '1',
    titulo: 'Mapa de supuestos críticos',
    desc: 'Tabla con los 12-15 supuestos que más impactan la TIR, con su valor en el modelo, ubicación en el Excel, y calificación 🟢/🟡/🔴 contra benchmarks de infraestructura PE en LatAm.',
    color: '#86EFAC'
  },
  {
    num: '2',
    titulo: 'Análisis de consistencia interna',
    desc: 'Inconsistencias entre tabs, errores de fórmula, valores hardcodeados, saltos abruptos en proyecciones, y verificación de que el balance y el flujo de caja cuadran.',
    color: '#FCD34D'
  },
  {
    num: '3',
    titulo: 'Tabla de sensibilidades',
    desc: 'Matriz cruzando los 3 supuestos más críticos en escenarios pesimista/base/optimista. TIR del equity y MOIC por escenario. El punto donde el activo deja de ser atractivo.',
    color: '#93C5FD'
  },
  {
    num: '4',
    titulo: 'Red flags para el IC',
    desc: 'Hasta 8 hallazgos ordenados por materialidad que el Investment Committee debe conocer antes de aprobar. Cada uno con la pregunta específica para hacerle al vendedor.',
    color: '#FCA5A5'
  },
  {
    num: '5',
    titulo: 'Narrativa ejecutiva',
    desc: 'Párrafo de 200 palabras listo para el IC: qué hace el activo, qué TIR muestra el modelo, los 2-3 riesgos financieros clave, y recomendación de continuar o no el DD.',
    color: '#C4B5FD'
  },
];

const DdFinancieroPage = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const navy = '#0A2240';
  const copper = '#B8860B';
  const cream = '#F5F2EC';

  const handleCopy = () => {
    navigator.clipboard.writeText(PROMPT_DD_FINANCIERO);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ background: cream, minHeight: '100vh',
      fontFamily: 'Inter, sans-serif' }}>
      <Header />
      <div style={{ maxWidth: 960, margin: '0 auto',
        padding: '48px 64px 80px' }}>

        {/* BACK */}
        <button
          onClick={() => navigate('/componente/evaluar-invertir')}
          style={{ fontSize: 13, color: '#8A8880', cursor: 'pointer',
            marginBottom: 40, background: 'none', border: 'none',
            padding: 0, display: 'inline-flex', alignItems: 'center',
            gap: 6, fontFamily: 'Inter, sans-serif' }}
        >← Evaluar si Invertir</button>

        {/* HERO */}
        <div style={{ display: 'inline-flex', alignItems: 'center',
          gap: 8, fontSize: 10, fontWeight: 700, letterSpacing: 3,
          textTransform: 'uppercase', color: copper, marginBottom: 16 }}>
          <div style={{ width: 6, height: 6, background: copper,
            borderRadius: '50%' }} />
          DD Financiero · Add-in Claude en Excel
        </div>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: 52,
          fontWeight: 700, color: navy, lineHeight: 1.05,
          marginBottom: 16, letterSpacing: -1 }}>
          Auditoría de Modelo<br />Financiero
        </div>
        <div style={{ fontSize: 16, color: '#5A6070', lineHeight: 1.7,
          maxWidth: 640, marginBottom: 48, paddingBottom: 40,
          borderBottom: '1px solid #E0DBD0' }}>
          El modelo financiero del target es una caja negra.
          Con el add-in de Claude en Excel, en minutos tienes
          un mapa completo de supuestos críticos, inconsistencias
          internas, sensibilidades y red flags — listo para
          el Investment Committee.
        </div>

        {/* CÓMO FUNCIONA */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3,
            textTransform: 'uppercase', color: copper, marginBottom: 24 }}>
            — Cómo funciona
          </div>
          <div style={{ display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
            {[
              { num: '1', titulo: 'Abre el modelo en Excel', desc: 'El modelo financiero del target — el que mandó el vendedor o el desarrollador. Cualquier estructura de Excel funciona.' },
              { num: '2', titulo: 'Abre el add-in de Claude', desc: 'En el panel lateral de Excel. Claude puede leer todo el archivo: todas las tabs, todas las fórmulas, todos los valores.' },
              { num: '3', titulo: 'Pega el prompt y ejecuta', desc: 'Claude procesa el modelo completo y genera el informe de DD financiero con las 5 secciones. Toma 2-3 minutos.' },
            ].map((step, i) => (
              <div key={i} style={{ background: 'white',
                border: '1px solid #E0DBD0',
                borderTop: `3px solid ${navy}`,
                borderRadius: 6, padding: '20px 18px' }}>
                <div style={{ fontFamily: 'Georgia, serif', fontSize: 32,
                  fontWeight: 700, color: '#E8E4DC', lineHeight: 1,
                  marginBottom: 10 }}>{step.num}</div>
                <div style={{ fontSize: 13, fontWeight: 700,
                  color: navy, marginBottom: 6 }}>{step.titulo}</div>
                <div style={{ fontSize: 12, color: '#6A7080',
                  lineHeight: 1.65 }}>{step.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* EL PROMPT */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3,
            textTransform: 'uppercase', color: copper, marginBottom: 24 }}>
            — El prompt — cópialo en el add-in
          </div>
          <div style={{ background: navy, borderRadius: 6,
            padding: '24px 28px' }}>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 2,
              textTransform: 'uppercase', color: copper,
              marginBottom: 16 }}>
              Prompt completo — DD Financiero · Infraestructura PE
            </div>
            <div style={{ fontFamily: 'Courier New, monospace',
              fontSize: 11, color: '#8AAABB', lineHeight: 1.8,
              whiteSpace: 'pre-wrap', maxHeight: 200,
              overflow: 'hidden', position: 'relative' }}>
              {PROMPT_DD_FINANCIERO.substring(0, 600)}...
              <div style={{ position: 'absolute', bottom: 0,
                left: 0, right: 0, height: 60,
                background: `linear-gradient(transparent, ${navy})`,
                pointerEvents: 'none' }} />
            </div>
            <div style={{ marginTop: 20 }}>
              <button
                onClick={handleCopy}
                style={{ padding: '10px 24px',
                  background: copied ? '#166534' : copper,
                  border: 'none', borderRadius: 4, fontSize: 12,
                  fontWeight: 700, color: navy, cursor: 'pointer',
                  letterSpacing: 1, transition: 'background 0.2s',
                  fontFamily: 'Inter, sans-serif' }}
              >
                {copied ? '✓ Copiado' : 'Copiar prompt completo'}
              </button>
            </div>
          </div>
          <div style={{ background: '#F0EDE6',
            borderLeft: `3px solid ${copper}`,
            padding: '14px 18px', marginTop: 12 }}>
            <div style={{ fontSize: 9, fontWeight: 700,
              letterSpacing: 1.5, textTransform: 'uppercase',
              color: copper, marginBottom: 5 }}>Tip</div>
            <div style={{ fontSize: 13, color: '#5A6070',
              lineHeight: 1.6 }}>
              El prompt funciona con cualquier estructura de modelo
              financiero — no necesitas adaptarlo. Claude identifica
              automáticamente la estructura del Excel y extrae los
              supuestos críticos sin importar cómo está organizado.
            </div>
          </div>
        </div>

        {/* LO QUE OBTIENES */}
        <div style={{ marginBottom: 56 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3,
            textTransform: 'uppercase', color: copper, marginBottom: 24 }}>
            — Lo que obtienes
          </div>
          {OUTPUT_SECCIONES.map((sec, idx) => (
            <div key={sec.num} style={{
              display: 'flex', gap: 20,
              padding: '24px 0',
              borderTop: idx === 0 ? '1px solid #E0DBD0' : 'none',
              borderBottom: '1px solid #E0DBD0',
              alignItems: 'flex-start'
            }}>
              <div style={{ width: 40, height: 40,
                borderRadius: '50%',
                background: `${sec.color}22`,
                border: `1.5px solid ${sec.color}`,
                display: 'flex', alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'Georgia, serif', fontSize: 16,
                fontWeight: 700, color: sec.color,
                flexShrink: 0 }}>
                {sec.num}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 16, fontWeight: 700,
                  color: navy, marginBottom: 6 }}>{sec.titulo}</div>
                <div style={{ fontSize: 14, color: '#5A6070',
                  lineHeight: 1.7 }}>{sec.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* NIVEL 2 CTA */}
        <div style={{ background: navy, borderRadius: 8,
          padding: '32px 40px', display: 'flex',
          alignItems: 'center', justifyContent: 'space-between',
          gap: 24 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 9, fontWeight: 700,
              letterSpacing: 3, textTransform: 'uppercase',
              color: copper, marginBottom: 10 }}>
              Nivel 2 · La visión institucional
            </div>
            <div style={{ fontFamily: 'Georgia, serif', fontSize: 24,
              fontWeight: 700, color: '#F8F5F0', marginBottom: 8 }}>
              Análisis automático al recibir el modelo
            </div>
            <div style={{ fontSize: 13, color: '#6A8AAA',
              lineHeight: 1.6 }}>
              El sistema recibe el modelo del data room,
              lo analiza automáticamente, y genera el informe
              de DD financiero antes de que el equipo lo abra —
              con los supuestos ya comparados contra la base
              histórica de deals de Ashmore.
            </div>
          </div>
          <button
            onClick={() => navigate('/demo/nivel2-dd')}
            style={{ padding: '12px 28px',
              border: `1.5px solid ${copper}`, borderRadius: 4,
              fontSize: 11, fontWeight: 700, letterSpacing: 1.5,
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
            }}
          >
            Ver el sistema →
          </button>
        </div>

      </div>
    </div>
  );
};

export default DdFinancieroPage;
