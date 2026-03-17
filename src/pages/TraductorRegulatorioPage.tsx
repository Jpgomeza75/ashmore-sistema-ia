import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";

const PROMPT_ACTION_MEMO = `Eres un analista senior de asset management que trabaja para Ashmore Management Company Colombia, un fondo de private equity en infraestructura que gestiona más de USD 950M en compromisos a través de varios fondos (Fondo I, Fondo Andino II, Fondo Andino III).

El portafolio de infraestructura incluye:
- TermoemCali I S.A. ESP: planta de cogeneración a gas de 235 MW en Yumbo, Colombia, en operación desde 1999. Ingresos por venta de energía en el mercado mayorista (contratos bilaterales + bolsa) y cargo por confiabilidad (OEF).
- Atlas Renewable Energy: activos de energía renovable
- Líneas de transmisión 110 kV en La Guajira (Riohacha-Maicao, Riohacha-Cuestecitas)
- Ruta del Cacao: concesión vial 4G (Bucaramanga-Barrancabermeja-Yondó, 191 km)
- Transambiental: sistema de transporte
- Bioena: planta de pellets de madera
- Lógika: centro logístico
- Sohec: oncología

Genera un ANÁLISIS DE IMPACTO REGULATORIO con exactamente 3 secciones. Sin preámbulos, sin secciones adicionales.

SECCIÓN 1: QUÉ DICE LA RESOLUCIÓN
Traducción a lenguaje de inversión. ¿Qué se crea? ¿Cómo funciona? ¿Quién opera? ¿Quién puede participar? ¿Cómo se forman los precios? ¿Desde cuándo aplica? ¿Por qué existe? Máximo 1.5 páginas.

SECCIÓN 2: INFORMACIÓN REQUERIDA PARA DETERMINAR LA POSICIÓN DEL PORTAFOLIO

A. Información que Ashmore ya tiene o debería tener internamente
B. Información que se debe solicitar (a quién, qué exactamente, para qué decisión)

Lo suficientemente específico para escribir un correo pidiéndola.

SECCIÓN 3: OPORTUNIDADES Y AMENAZAS

Para cada oportunidad:
OPORTUNIDAD [#]: [Título]
- Descripción, Activo(s) afectado(s), Variables que la habilitan, Consideraciones

Para cada amenaza:
AMENAZA [#]: [Título]
- Descripción, Activo(s) afectado(s), Variables que la activan, Consideraciones

Al menos 3 oportunidades y 3 amenazas. Específicas al portafolio.

[ADJUNTAR: Resolución regulatoria en PDF]`;

const PROMPT_MEMO_LEGAL = `Eres el Director de Inversiones de Ashmore Management Company Colombia, responsable de la gestión de un portafolio de fondos de private equity en infraestructura con más de USD 950M en compromisos. Necesitas redactar un memorando interno de consulta al equipo jurídico del fondo.

CONTEXTO DEL PORTAFOLIO:
- Fondos: Fondo I (USD 285M), Fondo Andino II (USD 248M), Fondo Andino III (USD 420M)
- Activo más directamente afectado: TermoemCali I S.A. ESP, 235 MW, Yumbo, desde 1999
- También afectados: Atlas Renewable Energy, Líneas transmisión La Guajira 110 kV

GENERA UN MEMORANDO DE CONSULTA LEGAL con este formato:

ASHMORE MANAGEMENT COMPANY COLOMBIA S.A.S.
MEMORANDO INTERNO — CONFIDENCIAL

Para: Dirección Jurídica / Asesoría Legal Externa
De: Dirección de Inversiones — Equipo de Asset Management
Fecha: [fecha actual]
Asunto: [Nombre de la resolución] — Consulta jurídica e implicaciones para el portafolio
Prioridad: Alta
Plazo de respuesta sugerido: 10 días hábiles

I. CONTEXTO Y MOTIVO DE LA CONSULTA
II. RESUMEN DE LA RESOLUCIÓN
III. PREGUNTAS ESPECÍFICAS QUE REQUIEREN ANÁLISIS JURÍDICO
   A. Participación de activos del portafolio
   B. Interacción con obligaciones contractuales existentes
   C. Implicaciones regulatorias y de compliance
   D. Implicaciones para los fondos y los LPs
   E. Riesgos específicos identificados
IV. DOCUMENTOS ADJUNTOS
V. ENTREGABLE ESPERADO
VI. PLAZO Y COORDINACIÓN

Tono formal pero directo. Preguntas específicas y accionables. Referenciar artículos.

[ADJUNTAR: Resolución + documentos soporte]`;

const OUTPUT_EJEMPLO = [
  {
    num: '1',
    titulo: 'Qué dice la resolución',
    color: '#93C5FD',
    texto: `La Resolución CREG 101 100 de 2026 crea el Mecanismo de Comercialización de Energía (MCE) — un nuevo mercado de contratos de corto plazo para la compraventa de energía eléctrica en Colombia, operado por Conexión Energética (Art. 3).

¿Qué se crea? Un mercado de ruedas anónimas donde generadores y comercializadores negocian energía en bloques horarios con liquidación diaria, en paralelo al mercado mayorista existente. No lo reemplaza — lo complementa.

¿Cómo funciona? Las ruedas se realizan diariamente. Los vendedores (generadores) ofertan precio mínimo de venta y volumen disponible. Los compradores (comercializadores) ofertan precio máximo de compra y volumen requerido. Conexión Energética hace el calce al precio de equilibrio (Art. 4-5).

¿Cómo se forman los precios? Por subasta de doble cara con precio marginal. El precio que paga el último comprador que entra al calce es el precio de la rueda. Todos los vendedores reciben ese precio (Art. 6).

¿Cómo se trasladan a tarifa? El componente G de la tarifa al usuario final se calculará incorporando el precio promedio ponderado de las ruedas del MCE en la fórmula de liquidación de Conexión Energética (Arts. 6-8). Esto crea un mecanismo de traslado directo a usuarios regulados.

¿Qué controles tiene? Auditoría anual del sistema (Art. 14). Si el MCE obtiene calificación "No cumple" dos años consecutivos en los indicadores de desempeño, la CREG puede suspenderlo (Art. 9, numeral ii). La CREG puede modificar los parámetros del mecanismo sin necesidad de nueva resolución (Art. 16, numeral v) — riesgo regulatorio relevante para el portafolio.

¿Por qué existe? Implementa el mandato del Decreto 1072 de 2025 de reducir la exposición del mercado colombiano a la volatilidad de la bolsa de energía y generar señales de precio de largo plazo más estables para usuarios y generadores.

¿Desde cuándo aplica? Vigencia inmediata desde la expedición (Art. 17). La operación efectiva del MCE está sujeta al desarrollo de la infraestructura tecnológica de Conexión Energética — plazo no definido explícitamente en la resolución.`
  },
  {
    num: '2',
    titulo: 'Información requerida para determinar la posición del portafolio',
    color: '#FCD34D',
    texto: `A. INFORMACIÓN QUE ASHMORE YA TIENE O DEBERÍA TENER INTERNAMENTE:

1. Estructura de ingresos de TermoemCali por fuente (bolsa vs. contratos bilaterales vs. OEF): para determinar qué fracción de los ingresos está expuesta al precio de bolsa que el MCE busca complementar, y estimar el impacto potencial si TermoemCali participa o no como vendedor.

2. Contratos bilaterales vigentes de TermoemCali: fechas de vencimiento, precios pactados, cláusulas de exclusividad o restricciones de comercialización. Prerrequisito para evaluar si TermoemCali puede legalmente participar en el MCE como vendedor.

3. OEF vigente de TermoemCali: monto en $/kWh-día, período de vigencia, condiciones de entrega. El OEF es el ingreso de respaldo del activo — el MCE no lo afecta directamente, pero es parte del análisis integral de ingresos.

4. Costo variable de generación de TermoemCali ($/MWh): para determinar el precio mínimo al que puede ofertar en el MCE y seguir siendo rentable. Sin este dato no se puede evaluar si la participación genera valor o destruye margen.

5. Capacidad instalada y contratos vigentes de Atlas Renewable Energy: para evaluar si Atlas podría participar como vendedor en el MCE y en qué condiciones.

B. INFORMACIÓN QUE SE DEBE SOLICITAR:

6. A la gerencia de TermoemCali: ¿Los contratos bilaterales vigentes incluyen cláusulas de exclusividad que restrinjan la participación en nuevos mecanismos de comercialización? Solicitar copia de las cláusulas relevantes. Para la decisión: si hay exclusividad, la participación en el MCE requería renegociación contractual.

7. A Conexión Energética: cronograma de implementación técnica del MCE y requisitos de registro para participar como vendedor (volumen mínimo, infraestructura de medición, sistemas de comunicación). Para la decisión: establece si TermoemCali y Atlas pueden participar desde el inicio o requieren inversiones adicionales.

8. Al equipo jurídico de Ashmore: análisis de los Artículos 5 (parágrafo sobre subcuentas independientes), 9 (numeral ii sobre suspensión) y 16 (numeral v sobre modificaciones) en relación con los contratos vigentes y las obligaciones fiduciarias con los LPs. Prerrequisito para cualquier decisión de participación.

NOTA: Los puntos 2 (contratos bilaterales) y 8 (análisis legal) son prerrequisitos para los demás. Sin ellos, la evaluación de oportunidades y amenazas de la Sección 3 es especulativa.`
  },
  {
    num: '3',
    titulo: 'Oportunidades y amenazas',
    color: '#86EFAC',
    texto: `OPORTUNIDAD 1: Optimización de ingresos de TermoemCali en energía no contratada
El MCE permite a TermoemCali vender su energía disponible no comprometida en contratos bilaterales a un precio potencialmente superior al de bolsa, en un mecanismo más ordenado y con menor volatilidad.
Activos afectados: TermoemCali I S.A. ESP
Variables que la habilitan: (a) Que los contratos bilaterales vigentes no incluyan cláusula de exclusividad total; (b) Que el precio de equilibrio del MCE sea consistentemente superior al precio de bolsa para energía de respaldo; (c) Que el costo de implementación técnica sea inferior al diferencial de precio esperado.
Consideraciones: Discutir en la próxima junta directiva de TermoemCali una vez obtenida la información de los puntos 2 y 4 de la Sección 2.

OPORTUNIDAD 2: Posicionamiento estratégico de Atlas Renewable Energy
Los activos de energía renovable sin contratos de largo plazo (PPAs) se benefician del MCE como mecanismo de venta más estable y menos volátil que la bolsa spot.
Activos afectados: Atlas Renewable Energy
Variables que la habilitan: (a) Que Atlas tenga capacidad disponible sin contrato PPA; (b) Que el precio del MCE ofrezca prima sobre la bolsa para energía renovable; (c) Que los requisitos técnicos de Conexión Energética sean alcanzables por los activos de Atlas.
Consideraciones: Evaluar en el Investment Committee del Fondo III si esta oportunidad justifica acelerar el desarrollo de Atlas o mantener la estrategia actual.

OPORTUNIDAD 3: Hedge natural del portafolio de energía de Ashmore
Ashmore tiene simultáneamente activos de generación térmica (TermoemCali, en potencial desventaja) y renovable (Atlas, en potencial ventaja). El MCE crea una dinámica donde la gestión activa de ambos activos puede generar valor neto positivo a nivel de portafolio.
Activos afectados: TermoemCali + Atlas (combinado)
Variables que la habilitan: Que ambos activos puedan participar en el MCE simultáneamente y que Ashmore pueda coordinar sus estrategias de oferta.
Consideraciones: Analizar en el Investment Committee la estrategia de portafolio de energía. Involucrar al equipo de Londres dado el impacto en la valoración del Fondo I (TermoemCali) y del Fondo III (Atlas).

---

AMENAZA 1: Presión sobre los ingresos de bolsa de TermoemCali
Si el MCE capta volumen significativo de compradores, el mercado de bolsa spot podría reducirse, afectando la demanda y el precio de la energía que TermoemCali vende a bolsa.
Activos afectados: TermoemCali I S.A. ESP
Variables que la activan: (a) Alta adopción del MCE por comercializadores que hoy compran en bolsa; (b) Que TermoemCali no pueda o no quiera participar como vendedor en el MCE.
Consideraciones: Monitorear mensualmente el volumen transado en el MCE en las primeras ruedas. Evaluar umbral de impacto en el modelo financiero de TermoemCali.

AMENAZA 2: Riesgo regulatorio sobre el cargo por confiabilidad (OEF)
El MCE introduce señales de precio de largo plazo que podrían ser usadas por la CREG como argumento para revisar la metodología del cargo por confiabilidad en la próxima subasta de OEF.
Activos afectados: TermoemCali I S.A. ESP
Variables que la activan: (a) Que el MCE genere señales de precio consideradas "suficientes" por la CREG para el OEF; (b) Que la próxima subasta de OEF coincida con la maduración del MCE.
Consideraciones: Incluir escenario de reducción del OEF en el análisis de sensibilidad del modelo de TermoemCali. Seguimiento con equipo legal.

AMENAZA 3: Desplazamiento progresivo de las térmicas en la contratación base
El MCE, combinado con la agenda de renovables del gobierno, podría acelerar la migración de contratos hacia energía renovable, dejando a TermoemCali en un rol exclusivo de respaldo con menores ingresos de comercialización.
Activos afectados: TermoemCali I S.A. ESP
Variables que la activan: (a) Penetración masiva de renovables como vendedores en el MCE; (b) Diferencial de costo significativo entre renovables y térmicas.
Consideraciones: Esta amenaza es estructural, no coyuntural. Requiere discusión estratégica en el Investment Committee sobre el horizonte de inversión de TermoemCali y la estrategia de maximización de valor del Fondo I. Involucrar al equipo de Londres.`
  }
];

const TraductorRegulatorioPage = () => {
  const navigate = useNavigate();
  const [copiedAction, setCopiedAction] = useState(false);
  const [copiedLegal, setCopiedLegal] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const [activePrompt, setActivePrompt] = useState<'action'|'legal'>('action');

  const navy = '#0A2240';
  const copper = '#B8860B';
  const cream = '#F5F2EC';

  const handleCopy = (type: 'action'|'legal') => {
    const text = type === 'action'
      ? PROMPT_ACTION_MEMO : PROMPT_MEMO_LEGAL;
    navigator.clipboard.writeText(text);
    if (type === 'action') {
      setCopiedAction(true);
      setTimeout(() => setCopiedAction(false), 2000);
    } else {
      setCopiedLegal(true);
      setTimeout(() => setCopiedLegal(false), 2000);
    }
  };

  return (
    <div style={{ background: cream,
      minHeight: '100vh',
      fontFamily: 'Inter, sans-serif' }}>
      <Header />
      <div style={{ maxWidth: 960, margin: '0 auto',
        padding: '48px 64px 80px' }}>

        {/* BACK */}
        <button
          onClick={() => navigate('/componente/gestionar-invertido')}
          style={{ fontSize: 13, color: '#8A8880',
            cursor: 'pointer', marginBottom: 40,
            background: 'none', border: 'none', padding: 0,
            display: 'inline-flex', alignItems: 'center',
            gap: 6, fontFamily: 'Inter, sans-serif' }}>
          ← Gestionar lo Invertido
        </button>

        {/* HERO */}
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
          Traductor Regulatorio
        </div>
        <div style={{ fontSize: 16, color: '#5A6070',
          lineHeight: 1.7, maxWidth: 640,
          marginBottom: 48, paddingBottom: 40,
          borderBottom: '1px solid #E0DBD0' }}>
          Una resolución de 80 páginas llega un viernes.
          En 10 minutos tienes el análisis de impacto
          completo sobre cada activo del portafolio —
          qué cambió, qué hacer, y el memo legal
          listo para el abogado.
        </div>

        {/* CÓMO FUNCIONA */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: 10, fontWeight: 700,
            letterSpacing: 3, textTransform: 'uppercase',
            color: copper, marginBottom: 24 }}>
            — Cómo funciona
          </div>
          <div style={{ display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: 12 }}>
            {[
              { num: '1', titulo: 'Adjunta la resolución',
                desc: 'Ve a claude.ai, crea una conversación nueva y adjunta el PDF de la resolución regulatoria — CREG, ANI, CRA, MinTransporte.' },
              { num: '2', titulo: 'Copia el prompt',
                desc: 'Elige entre el Action Memo (análisis de impacto para el equipo de inversiones) o el Memo Legal (consulta al abogado). Cópialo y pégalo en Claude.' },
              { num: '3', titulo: 'Obtén el análisis',
                desc: 'Claude lee la resolución completa y genera el documento con las 3 secciones — en 3-5 minutos para una resolución de 80 páginas.' },
            ].map((step, i) => (
              <div key={i} style={{ background: 'white',
                border: '1px solid #E0DBD0',
                borderTop: `3px solid ${navy}`,
                borderRadius: 6, padding: '20px 18px' }}>
                <div style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: 32, fontWeight: 700,
                  color: '#E8E4DC', lineHeight: 1,
                  marginBottom: 10 }}>{step.num}</div>
                <div style={{ fontSize: 13,
                  fontWeight: 700, color: navy,
                  marginBottom: 6 }}>{step.titulo}</div>
                <div style={{ fontSize: 12,
                  color: '#6A7080',
                  lineHeight: 1.65 }}>{step.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* DOS PROMPTS */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: 10, fontWeight: 700,
            letterSpacing: 3, textTransform: 'uppercase',
            color: copper, marginBottom: 24 }}>
            — Elige el output que necesitas
          </div>

          {/* Selector */}
          <div style={{ display: 'flex', gap: 0,
            marginBottom: 16,
            border: `1px solid ${navy}`,
            borderRadius: 4, overflow: 'hidden',
            width: 'fit-content' }}>
            {[
              { id: 'action' as const,
                label: 'Action Memo — Para el equipo de inversiones' },
              { id: 'legal' as const,
                label: 'Memo Legal — Para el abogado' },
            ].map(opt => (
              <button key={opt.id}
                onClick={() => setActivePrompt(opt.id)}
                style={{ padding: '10px 20px',
                  background: activePrompt === opt.id
                    ? navy : 'transparent',
                  border: 'none', fontSize: 12,
                  fontWeight: 700,
                  color: activePrompt === opt.id
                    ? '#F8F5F0' : navy,
                  cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif' }}>
                {opt.label}
              </button>
            ))}
          </div>

          {/* Prompt box */}
          <div style={{ background: navy,
            borderRadius: 6, padding: '24px 28px' }}>
            <div style={{ fontSize: 9, fontWeight: 700,
              letterSpacing: 2, textTransform: 'uppercase',
              color: copper, marginBottom: 16 }}>
              {activePrompt === 'action'
                ? 'Prompt — Análisis de Impacto Regulatorio'
                : 'Prompt — Memo de Consulta Legal'}
            </div>
            <div style={{
              fontFamily: 'Courier New, monospace',
              fontSize: 11, color: '#8AAABB',
              lineHeight: 1.8, whiteSpace: 'pre-wrap',
              maxHeight: 180, overflow: 'hidden',
              position: 'relative' }}>
              {activePrompt === 'action'
                ? PROMPT_ACTION_MEMO.substring(0, 500)
                : PROMPT_MEMO_LEGAL.substring(0, 500)}...
              <div style={{ position: 'absolute',
                bottom: 0, left: 0, right: 0, height: 60,
                background: `linear-gradient(transparent, ${navy})`,
                pointerEvents: 'none' }} />
            </div>
            <div style={{ display: 'flex',
              gap: 8, marginTop: 20 }}>
              <button
                onClick={() => handleCopy(activePrompt)}
                style={{ padding: '10px 24px',
                  background: activePrompt === 'action'
                    ? (copiedAction ? '#166534' : copper)
                    : (copiedLegal ? '#166534' : copper),
                  border: 'none', borderRadius: 4,
                  fontSize: 12, fontWeight: 700,
                  color: navy, cursor: 'pointer',
                  letterSpacing: 1,
                  fontFamily: 'Inter, sans-serif' }}>
                {activePrompt === 'action'
                  ? (copiedAction ? '✓ Copiado' : 'Copiar prompt')
                  : (copiedLegal ? '✓ Copiado' : 'Copiar prompt')}
              </button>
            </div>
          </div>

          <div style={{ background: '#F0EDE6',
            borderLeft: `3px solid ${copper}`,
            padding: '14px 18px', marginTop: 12 }}>
            <div style={{ fontSize: 9, fontWeight: 700,
              letterSpacing: 1.5, textTransform: 'uppercase',
              color: copper, marginBottom: 5 }}>
              Demo construida con
            </div>
            <div style={{ fontSize: 13, color: '#5A6070',
              lineHeight: 1.6 }}>
              Resolución CREG 101 100 de 2026 —
              Mecanismo de Comercialización de Energía (MCE).
              Expedida el 19 de febrero de 2026.
              Impacto analizado específicamente sobre
              TermoemCali y el portafolio de Ashmore.
            </div>
          </div>
        </div>

        {/* OUTPUT EJEMPLO */}
        <div style={{ marginBottom: 56 }}>
          <div style={{ fontSize: 10, fontWeight: 700,
            letterSpacing: 3, textTransform: 'uppercase',
            color: copper, marginBottom: 24 }}>
            — Así se ve el output
          </div>

          <div style={{ background: 'white',
            border: '1px solid #E0DBD0',
            borderRadius: 6, overflow: 'hidden' }}>
            <div style={{ background: navy,
              padding: '16px 24px', display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 12,
                  fontWeight: 700, color: '#F8F5F0' }}>
                  Análisis de Impacto Regulatorio — CREG 101 100 de 2026
                </div>
                <div style={{ fontSize: 10,
                  color: '#4A6070', marginTop: 2 }}>
                  Mecanismo de Comercialización de Energía (MCE) · Portafolio Ashmore · 3 secciones
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
                <div style={{ fontSize: 14,
                  color: '#8A8880', marginBottom: 20 }}>
                  Este es el análisis real generado por
                  Claude al adjuntar la Resolución CREG 101 100
                  de 2026 y correr el prompt. Sin edición.
                </div>
                <button
                  onClick={() => setShowOutput(true)}
                  style={{ padding: '12px 32px',
                    background: navy, border: 'none',
                    borderRadius: 4, fontSize: 13,
                    fontWeight: 700, color: '#F8F5F0',
                    cursor: 'pointer',
                    fontFamily: 'Inter, sans-serif' }}>
                  Ver análisis completo →
                </button>
              </div>
            ) : (
              <div style={{ padding: '24px' }}>
                {OUTPUT_EJEMPLO.map((sec, i) => (
                  <div key={i} style={{
                    marginBottom: i < OUTPUT_EJEMPLO.length - 1
                      ? 28 : 0,
                    paddingBottom: i < OUTPUT_EJEMPLO.length - 1
                      ? 28 : 0,
                    borderBottom: i < OUTPUT_EJEMPLO.length - 1
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
                          fontWeight: line.startsWith('OPORTUNIDAD') ||
                            line.startsWith('AMENAZA') ? 700 : 400,
                          color: line.startsWith('OPORTUNIDAD')
                            ? '#166534'
                            : line.startsWith('AMENAZA')
                            ? '#991B1B'
                            : '#444',
                          fontSize: line.startsWith('OPORTUNIDAD') ||
                            line.startsWith('AMENAZA') ? 14 : 13,
                        }}>
                          {line}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                <div style={{ marginTop: 20, padding: '12px 16px',
                  background: '#F8F5F0', border: '1px solid #E0DBD0',
                  borderLeft: '3px solid #B8860B', borderRadius: '0 4px 4px 0',
                  fontSize: 12, color: '#8A8880', lineHeight: 1.6,
                  fontStyle: 'italic' }}>
                  Este análisis fue generado en 4 minutos con Claude
                  al adjuntar la Resolución CREG 101 100 de 2026
                  (24 páginas). Es un insumo para discusión interna —
                  no constituye una recomendación final de inversión.
                  Las oportunidades y amenazas deben validarse con
                  la información de la Sección 2 antes de tomar
                  decisiones.
                </div>
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
            <div style={{
              fontFamily: 'Georgia, serif', fontSize: 24,
              fontWeight: 700, color: '#F8F5F0',
              marginBottom: 8 }}>
              Nivel 2 — Centro de Control del Portafolio
            </div>
            <div style={{ fontSize: 13, color: '#6A8AAA',
              lineHeight: 1.6 }}>
              El sistema monitorea resoluciones regulatorias
              automáticamente y alerta cuando hay una que
              afecta activos del portafolio — antes de
              que alguien la lea.
            </div>
          </div>
          <button
            onClick={() => navigate('/demo/nivel2-portafolio')}
            style={{ padding: '12px 28px',
              border: `1.5px solid ${copper}`,
              borderRadius: 4, fontSize: 11,
              fontWeight: 700, letterSpacing: 1.5,
              color: copper, background: 'transparent',
              cursor: 'pointer',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap', flexShrink: 0,
              fontFamily: 'Inter, sans-serif' }}
            onMouseEnter={e => {
              e.currentTarget.style.background = copper;
              e.currentTarget.style.color = navy;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background =
                'transparent';
              e.currentTarget.style.color = copper;
            }}>
            Ver el sistema →
          </button>
        </div>

      </div>
    </div>
  );
};

export default TraductorRegulatorioPage;
