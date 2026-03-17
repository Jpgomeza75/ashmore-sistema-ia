import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";

const PROMPT_TESIS = `Eres el Director de Investor Relations de Ashmore Management Company Colombia, preparando la tesis de inversión del Fondo Ashmore Andino III para una reunión con un LP institucional.

PERFIL DEL LP:
[Describir: tipo de institución, país, AUM aproximado, mandato de inversión, qué les importa más — retorno, impacto, diversificación, ESG]

CONTEXTO DE ASHMORE Y EL FONDO:

LA FIRMA:
- Ashmore Management Company Colombia SAS, fundada 2009
- Subsidiaria de Ashmore Group plc (LSE: ASHM, FTSE 250)
- USD 48.7B AUM global. Presencia en 12 países
- 15 años gestionando infraestructura PE en Colombia y los Andes

EL FONDO:
- Fondo Ashmore Andino III: USD 420M, cerrado y sobredemandado
- Geografías: Colombia, Perú, Panamá, Costa Rica, Guatemala, República Dominicana
- Sectores: energía, transporte, logística, agua, residuos, telecomunicaciones, salud, educación
- Temas: infraestructura climática + infraestructura social
- Target: ~10 inversiones, USD 30-80M por ticket
- LP ancla: SIFEM (Swiss Investment Fund for Emerging Markets)

TRACK RECORD:
- Fondo I (2010, USD 285M): TermoemCali 235MW, Líneas transmisión La Guajira 110kV
- Fondo Andino II (USD 248M): Ruta del Cacao 4G 191km, Transambiental
- Fondo III en despliegue: Bioena USD 100M, Lógika, Ática Andina, Creas, Siberia Carga

ESG: Estándares IFC Performance Standards (PS 1-8). Compensación biótica TermoemCali, plan vial Ruta del Cacao, reemplazo flota GHG Transambiental, consulta comunidades Wayuu La Guajira.

GENERA UNA TESIS DE INVERSIÓN con exactamente estas 5 secciones:

**1. EL MOMENTO**
Por qué invertir en infraestructura en los Andes y Centroamérica AHORA. Argumentos macro, regulatorios y de mercado. Específico con datos. Máximo 150 palabras.

**2. LA OPORTUNIDAD**
Qué ofrece este mercado que otros no: brecha de infraestructura, deal flow propietario, menor competencia vs. mercados desarrollados, marcos regulatorios en maduración. Máximo 150 palabras.

**3. POR QUÉ ASHMORE**
Por qué este equipo, con este track record, en este mercado, es el gestor correcto. Conectar con el historial de 3 fondos, la red local, el respaldo global. Adaptar al perfil del LP. Máximo 150 palabras.

**4. LA ESTRATEGIA**
Cómo se va a invertir: perfil de activos target, tesis de creación de valor, enfoque climático y social, diversificación. Máximo 150 palabras.

**5. POR QUÉ AHORA**
El argumento de urgencia y timing específico para este LP: ventana de co-inversión, pipeline visible, momento del ciclo. Máximo 100 palabras.

TONO: Institucional, directo, sin relleno. Como un GP sofisticado hablando con un LP sofisticado. Sin frases genéricas. Datos concretos donde sea posible. Adaptar el énfasis al perfil del LP descrito.`;

const OUTPUT_EJEMPLO = [
  {
    num: "1",
    titulo: "El Momento",
    texto: "América Latina enfrenta una brecha de infraestructura de USD 150B anuales según el BID — y la región acaba de iniciar el ciclo de inversión más ambicioso en dos décadas. Colombia lanzó su programa 5G de concesiones viales (USD 12B), Perú reactivó 23 proyectos de APP paralizados post-pandemia, y Centroamérica atrae capital climático como nunca antes por los compromisos COP28 de sus gobiernos. Al mismo tiempo, la normalización de tasas en mercados desarrollados está redirigiendo capital institucional hacia activos reales en mercados emergentes — exactamente el perfil del Fondo Andino III. El timing no es coincidencia: es el resultado de 15 años construyendo el pipeline y las relaciones necesarias para capturar este momento."
  },
  {
    num: "2",
    titulo: "La Oportunidad",
    texto: "Los mercados de infraestructura en los Andes y Centroamérica ofrecen algo cada vez más escaso en los mercados desarrollados: activos de calidad a valoraciones razonables con menor competencia de capital. El retorno esperado del Fondo III (TIR neta objetivo de 12-15% USD) es estructuralmente superior al de fondos de infraestructura en Europa o Norteamérica en el mismo rango de riesgo. El deal flow de Ashmore es mayoritariamente propietario — construido en 15 años de presencia continua en la región, no generado por procesos de banca de inversión donde todos compiten con el mismo precio. La brecha de infraestructura no es un riesgo: es la fuente de oportunidades. Cada km de vía, cada MW renovable, cada m³ de agua potable que falta es una inversión potencial."
  },
  {
    num: "3",
    titulo: "Por Qué Ashmore",
    texto: "Tres fondos. Quince años. USD 953M comprometidos. Once activos operando. Ese es el track record de Ashmore Colombia en infraestructura PE — construido ladrillo a ladrillo, sin prisa y sin atajos. No somos un fondo global que abrió una oficina en Bogotá. Somos un equipo local con el respaldo de un asset manager del FTSE 250 con USD 48.7B en AUM y presencia en 12 países. La combinación es difícil de replicar: conocimiento local que genera deal flow propietario + plataforma global que garantiza estándares institucionales, acceso a co-inversores internacionales y credibilidad con DFIs como BID, CAF y SIFEM — que ya han invertido en nuestros fondos anteriores."
  },
  {
    num: "4",
    titulo: "La Estrategia",
    texto: "El Fondo III invierte en activos de infraestructura operativos o en construcción avanzada — no en greenfield puro. Esto reduce el riesgo de construcción y acelera la curva de distribuciones. Los sectores prioritarios son energía (renovables, transmisión), transporte, logística, agua y residuos, con una capa temática explícita de infraestructura climática e infraestructura social. Cada inversión debe cumplir criterios ESG bajo estándares IFC PS 1-8, con planes de acción documentados desde el due diligence. La creación de valor viene de tres fuentes: mejoras operativas en los activos, optimización de la estructura de capital, y expansión de capacidad donde el mercado lo justifica. Ticket objetivo: USD 30-80M, ~10 inversiones, diversificadas en 6 países y 7 sectores."
  },
  {
    num: "5",
    titulo: "Por Qué Ahora",
    texto: "El Fondo III está en despliegue activo — 7 inversiones realizadas, USD 200M+ por comprometer. El pipeline visible para los próximos 18 meses incluye oportunidades en energía solar en Colombia, logística portuaria en Perú y concesiones de agua en Centroamérica. Los LPs que entren ahora tienen acceso a co-inversión en deals específicos antes del cierre del período de inversión. Esta ventana es limitada."
  }
];

const TesisPage = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [showOutput, setShowOutput] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(PROMPT_TESIS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const navy = '#0A2240';
  const copper = '#B8860B';
  const cream = '#F5F2EC';

  return (
    <div style={{ background: cream, minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      <Header />
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '48px 64px 80px' }}>

        {/* BACK */}
        <button
          onClick={() => navigate('/componente/levantar-capital')}
          style={{ fontSize: 13, color: '#8A8880', cursor: 'pointer', marginBottom: 40, background: 'none', border: 'none', padding: 0, display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'Inter, sans-serif' }}
        >← Levantar el Capital</button>

        {/* HERO */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 10, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: copper, marginBottom: 16 }}>
          <div style={{ width: 6, height: 6, background: copper, borderRadius: '50%' }} />
          Superpoder · Nivel 1
        </div>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: 52, fontWeight: 700, color: navy, lineHeight: 1.05, marginBottom: 12, letterSpacing: -1 }}>
          Constructor de<br />Tesis de Inversión
        </div>
        <div style={{ fontSize: 16, color: '#5A6070', lineHeight: 1.7, maxWidth: 640, marginBottom: 48, paddingBottom: 40, borderBottom: '1px solid #E0DBD0' }}>
          La narrativa que convence a un LP de invertir en el Fondo III no es la misma para CAF que para Porvenir que para un family office. Este superpoder genera la tesis correcta para cada audiencia — con datos reales, en 2 minutos.
        </div>

        {/* PASO 1 */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: copper, marginBottom: 24 }}>
            — Paso 1 · Define el perfil del LP
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 16 }}>
            {[
              { tipo: 'DFI Internacional', ejemplos: 'CAF, BID, SIFEM, IFC', foco: 'Impacto de desarrollo, ESG, additionality', color: '#E6F1FB', borderColor: '#378ADD' },
              { tipo: 'Fondo de Pensiones Local', ejemplos: 'Porvenir, Protección, Skandia', foco: 'Retorno ajustado por riesgo, regulación SFC, liquidez', color: '#FFFBEB', borderColor: copper },
              { tipo: 'Family Office / Institucional', ejemplos: 'Multi-family office, fundación, endowment', foco: 'Diversificación, retorno absoluto, co-inversión', color: '#F0EDE6', borderColor: navy },
            ].map((lp, i) => (
              <div key={i} style={{ background: lp.color, border: `1.5px solid ${lp.borderColor}`, borderRadius: 6, padding: '20px 18px' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: navy, marginBottom: 6 }}>{lp.tipo}</div>
                <div style={{ fontSize: 11, color: '#5A6070', marginBottom: 8 }}>{lp.ejemplos}</div>
                <div style={{ fontSize: 10, fontWeight: 600, color: lp.borderColor, textTransform: 'uppercase', letterSpacing: 1 }}>Foco</div>
                <div style={{ fontSize: 11, color: '#5A6070', lineHeight: 1.5 }}>{lp.foco}</div>
              </div>
            ))}
          </div>
          <div style={{ background: '#F0EDE6', borderLeft: '3px solid ' + copper, padding: '14px 18px' }}>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: copper, marginBottom: 5 }}>Cómo usar</div>
            <div style={{ fontSize: 13, color: '#5A6070', lineHeight: 1.6 }}>
              En el prompt, reemplaza la sección <strong>[PERFIL DEL LP]</strong> con una descripción del LP al que te vas a reunir. Mientras más específico seas — qué les importa, qué objeciones típicas tienen, qué han invertido antes — más relevante y personalizada saldrá la tesis.
            </div>
          </div>
        </div>

        {/* PASO 2 */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: copper, marginBottom: 24 }}>
            — Paso 2 · Copia el prompt y pégalo en Claude
          </div>
          <div style={{ background: navy, borderRadius: 6, padding: '24px 28px' }}>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: copper, marginBottom: 16 }}>
              Prompt completo — Constructor de Tesis
            </div>
            <div style={{ fontFamily: 'Courier New, monospace', fontSize: 11, color: '#8AAABB', lineHeight: 1.8, whiteSpace: 'pre-wrap', maxHeight: 200, overflow: 'hidden', position: 'relative' }}>
              {PROMPT_TESIS.substring(0, 600)}...
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 60, background: `linear-gradient(transparent, ${navy})`, pointerEvents: 'none' }} />
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
              <button
                onClick={handleCopy}
                style={{ padding: '10px 24px', background: copied ? '#166534' : copper, border: 'none', borderRadius: 4, fontSize: 12, fontWeight: 700, color: navy, cursor: 'pointer', letterSpacing: 1, transition: 'background 0.2s', fontFamily: 'Inter, sans-serif' }}
              >
                {copied ? '✓ Copiado' : 'Copiar prompt completo'}
              </button>
            </div>
          </div>
        </div>

        {/* PASO 3 */}
        <div style={{ marginBottom: 56 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: copper, marginBottom: 24 }}>
            — Paso 3 · Así se ve el output
          </div>
          <div style={{ background: 'white', border: '1px solid #E0DBD0', borderRadius: 6, overflow: 'hidden' }}>
            <div style={{ background: navy, padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#F8F5F0' }}>Tesis de Inversión — Fondo Ashmore Andino III</div>
                <div style={{ fontSize: 10, color: '#4A6070', marginTop: 2 }}>Generado para: CAF — Corporación Andina de Fomento · DFI Internacional</div>
              </div>
              <div style={{ fontSize: 9, fontWeight: 600, padding: '3px 10px', background: 'rgba(184,134,11,0.15)', color: copper, borderRadius: 2, border: `1px solid rgba(184,134,11,0.3)` }}>
                5 secciones · ~750 palabras
              </div>
            </div>

            {!showOutput ? (
              <div style={{ padding: '32px 24px', textAlign: 'center' }}>
                <div style={{ fontSize: 14, color: '#8A8880', marginBottom: 20 }}>
                  Ver ejemplo de tesis generada para un LP tipo DFI internacional
                </div>
                <button
                  onClick={() => setShowOutput(true)}
                  style={{ padding: '12px 32px', background: navy, border: 'none', borderRadius: 4, fontSize: 13, fontWeight: 700, color: '#F8F5F0', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}
                >
                  Ver ejemplo de output →
                </button>
              </div>
            ) : (
              <div style={{ padding: '24px' }}>
                {OUTPUT_EJEMPLO.map((section, i) => (
                  <div key={i} style={{ marginBottom: i < OUTPUT_EJEMPLO.length - 1 ? 28 : 0, paddingBottom: i < OUTPUT_EJEMPLO.length - 1 ? 28 : 0, borderBottom: i < OUTPUT_EJEMPLO.length - 1 ? '1px solid #F0EDE6' : 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 10 }}>
                      <span style={{ fontFamily: 'Georgia, serif', fontSize: 32, fontWeight: 700, color: '#E8E4DC', lineHeight: 1 }}>{section.num}</span>
                      <span style={{ fontSize: 14, fontWeight: 700, color: navy, textTransform: 'uppercase', letterSpacing: 1 }}>{section.titulo}</span>
                    </div>
                    <div style={{ fontSize: 14, color: '#444', lineHeight: 1.8 }}>{section.texto}</div>
                  </div>
                ))}
                <button
                  onClick={() => setShowOutput(false)}
                  style={{ marginTop: 20, fontSize: 12, color: '#8A8880', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}
                >
                  Ocultar ejemplo
                </button>
              </div>
            )}
          </div>
        </div>

        {/* NIVEL 2 CTA */}
        <div style={{ background: navy, borderRadius: 8, padding: '32px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: copper, marginBottom: 10 }}>
              ¿Quieres que esto funcione automáticamente?
            </div>
            <div style={{ fontFamily: 'Georgia, serif', fontSize: 24, fontWeight: 700, color: '#F8F5F0', marginBottom: 8 }}>
              Nivel 2 — Sistema integrado
            </div>
            <div style={{ fontSize: 13, color: '#6A8AAA', lineHeight: 1.6 }}>
              El sistema mantiene el perfil de cada LP actualizado, genera la tesis automáticamente antes de cada reunión, y actualiza los materiales cuando cambia información del fondo.
            </div>
          </div>
          <button
            onClick={() => navigate('/demo/nivel2-fundraising')}
            style={{ padding: '12px 28px', border: `1.5px solid ${copper}`, borderRadius: 4, fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: copper, background: 'transparent', cursor: 'pointer', textTransform: 'uppercase', whiteSpace: 'nowrap', flexShrink: 0, fontFamily: 'Inter, sans-serif' }}
            onMouseEnter={e => { e.currentTarget.style.background = copper; e.currentTarget.style.color = navy; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = copper; }}
          >
            Ver el sistema →
          </button>
        </div>

      </div>
    </div>
  );
};

export default TesisPage;
