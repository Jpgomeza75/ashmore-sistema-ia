import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";

const PROMPT_BRIEFING = `Eres el analista senior de Investor Relations de Ashmore Management Company Colombia. Necesitas preparar el briefing de reunión para el equipo antes de encontrarse con un LP institucional.

DATOS DE LA REUNIÓN:
- LP: [Nombre del LP y tipo — DFI, fondo de pensiones, aseguradora, family office]
- Fecha y lugar: [Cuándo y dónde]
- Objetivo de la reunión: [Qué se quiere lograr — primera presentación, revisión DDQ, cierre, seguimiento]
- Asistentes por parte del LP: [Nombres y cargos si los conoces]
- Asistentes por parte de Ashmore: [Quién va del equipo]
- Contexto previo: [Qué pasó en interacciones anteriores, qué preguntaron, qué les preocupó]

CONTEXTO DE ASHMORE Y EL FONDO:

LA FIRMA:
- Ashmore Management Company Colombia SAS, fundada 2009
- Subsidiaria de Ashmore Group plc (LSE: ASHM, FTSE 250)
- USD 48.7B AUM global. 15 años en infraestructura PE en los Andes

EL FONDO ANDINO III:
- USD 420M cerrado y sobredemandado
- 6 países: Colombia, Perú, Panamá, Costa Rica, Guatemala, Rep. Dominicana
- Foco: infraestructura climática + infraestructura social
- 7 inversiones realizadas: Bioena, Lógika, Ática Andina, Creas, Siberia Carga, Puerta de Oro, ATICA
- LP ancla: SIFEM

GENERA UN BRIEFING DE REUNIÓN con exactamente estas 4 secciones:

**1. CONTEXTO DEL LP**
Quiénes son, qué les importa, cuál es su mandato de inversión, qué objeciones típicas tienen los LP de este tipo, qué sabemos de interacciones anteriores. Máximo 120 palabras.

**2. NARRATIVA RECOMENDADA PARA ESTA REUNIÓN**
Qué enfatizar según el objetivo específico de esta reunión. No es la tesis genérica — es el ángulo correcto para este LP en este momento. Qué slide abrir primero, qué ejemplo del portafolio usar, cómo enmarcar la conversación. Máximo 150 palabras.

**3. PREGUNTAS DIFÍCILES ESPERADAS**
Las 5 preguntas más probables que este LP va a hacer en esta reunión, con:
- La pregunta exacta como la plantearía el LP
- La respuesta recomendada con datos de Ashmore
- Nivel de probabilidad: Alta / Media / Baja

**4. QUÉ NO HACER EN ESTA REUNIÓN**
3-4 errores típicos con este tipo de LP que el equipo debe evitar. Temas sensibles, framing equivocado, compromisos que no se deben hacer. Directo y honesto — este es un documento interno.

TONO: Briefing interno de equipo. Directo, sin adornos. Como si lo escribiera un analista senior para el socio que va a la reunión. No es un documento para compartir con el LP.`;

const OUTPUT_EJEMPLO = {
  lp: 'Porvenir S.A. — Fondo de Pensiones',
  fecha: 'Jueves 20 Mar 2026 · 3:00pm · Bogotá',
  objetivo: 'Presentación ante el Comité de Riesgos Alternos — decisión de inversión',
  secciones: [
    {
      num: '1',
      titulo: 'Contexto del LP',
      color: '#93C5FD',
      texto: 'Porvenir es el fondo de pensiones más grande de Colombia (~USD 35B AUM). Su Comité de Riesgos Alternos aprueba inversiones en activos alternativos bajo el marco regulatorio de la Superfinanciera. Tienen experiencia en PE local pero esta sería su primera inversión en infraestructura PE andina. Su foco principal: retorno ajustado por riesgo, liquidez del vehículo y elegibilidad regulatoria. Son conservadores en compromisos — prefieren hacer preguntas difíciles en la reunión antes de avanzar. El interlocutor principal es el Director de Inversiones Alternativas, quien tiene poder de recomendación al Comité.'
    },
    {
      num: '2',
      titulo: 'Narrativa recomendada',
      color: '#B8860B',
      texto: 'El objetivo de esta reunión es pasar el filtro del Comité de Riesgos — no cerrar el deal. Enmarca desde el inicio: "Venimos a responder sus preguntas, no a venderles." Eso baja la guardia. Abre con el perfil de riesgo de infraestructura vs. renta variable — Porvenir entiende de riesgo, no de infraestructura PE. Usa Ruta del Cacao como ejemplo central: concesión 4G con flujos contractuales del Estado colombiano, regulada por ANI, estructura que un comité de riesgos entiende. Evita el lenguaje de "impacto" — para Porvenir lo que importa es el retorno y la regulación. Termina con el timeline claro: si aprueban hoy, cuáles son los siguientes pasos.'
    },
    {
      num: '3',
      titulo: 'Preguntas difíciles esperadas',
      color: '#F9A8D4',
      preguntas: [
        {
          nivel: 'Alta',
          pregunta: '¿Cuáles son los términos económicos exactos? Management fee, carried interest, hurdle rate.',
          respuesta: 'Compartir el Reglamento del FCP bajo NDA para revisión detallada. Dar el rango de mercado: "Estamos en línea con el estándar de PE de infraestructura LatAm." No dar números específicos en la reunión sin que el equipo legal haya revisado qué se puede divulgar en esta etapa.',
          nivelColor: '#FCA5A5',
          nivelBg: 'rgba(239,68,68,0.1)'
        },
        {
          nivel: 'Alta',
          pregunta: '¿El Fondo es elegible bajo las normas de la Superfinanciera para fondos de pensiones?',
          respuesta: 'Sí — los FCPs administrados por fiduciarias vigiladas son elegibles. Ofrecer coordinar una sesión técnica entre el equipo legal de Porvenir y Alianza Fiduciaria para confirmar los límites específicos aplicables al portafolio de Porvenir.',
          nivelColor: '#FCA5A5',
          nivelBg: 'rgba(239,68,68,0.1)'
        },
        {
          nivel: 'Alta',
          pregunta: '¿Qué pasa si necesitamos salir del fondo antes del plazo de 10 años?',
          respuesta: 'Ser honesto: es un vehículo cerrado. No hay liquidez ordinaria. Hay mercado secundario de participaciones en fondos de calidad pero no debe asumirse como mecanismo de salida garantizado. No prometer lo que no se puede cumplir.',
          nivelColor: '#FCA5A5',
          nivelBg: 'rgba(239,68,68,0.1)'
        },
        {
          nivel: 'Media',
          pregunta: '¿Cuándo empiezan a ver retornos? ¿Cuál es el perfil de distribuciones?',
          respuesta: 'Curva en J típica de infraestructura PE: primeros 3-4 años de despliegue sin distribuciones significativas, distribuciones aceleradas años 6-10. Algunos activos del Fondo III ya están distribuyendo dividendos — mostrar el detalle del portafolio actual.',
          nivelColor: '#B8860B',
          nivelBg: 'rgba(184,134,11,0.15)'
        },
        {
          nivel: 'Baja',
          pregunta: '¿Por qué Centroamérica? ¿No es más riesgo político que Colombia?',
          respuesta: 'La diversificación geográfica es precisamente la respuesta al riesgo político concentrado en Colombia. Centroamérica tiene marcos regulatorios más simples en infraestructura y menor competencia de capital. Los activos tienen flujos contractuales que aíslan el retorno del ciclo político.',
          nivelColor: '#6A8AAA',
          nivelBg: 'rgba(74,96,112,0.15)'
        }
      ]
    },
    {
      num: '4',
      titulo: 'Qué NO hacer en esta reunión',
      color: '#FCA5A5',
      donts: [
        {
          titulo: 'No usar lenguaje de impacto o ESG como argumento principal',
          desc: 'Porvenir tiene mandato fiduciario de retorno — el ESG es requisito regulatorio, no argumento de venta. Si enfatizas impacto sobre retorno, pierdes credibilidad con el Comité de Riesgos.'
        },
        {
          titulo: 'No dar cifras de TIR sin contexto de riesgo',
          desc: 'Si dices "14-16% TIR neta" sin explicar la naturaleza de los flujos contractuales y la estructura de riesgo, el Comité va a comparar con renta fija y la reunión termina ahí.'
        },
        {
          titulo: 'No prometer liquidez que no existe',
          desc: 'Es tentador decir "hay mercado secundario" para manejar la objeción de liquidez. No lo hagas como garantía — dilo como posibilidad con todas las advertencias necesarias.'
        },
        {
          titulo: 'No ir a cerrar en la primera reunión',
          desc: 'Porvenir tiene un proceso de aprobación de múltiples etapas. El objetivo de hoy es pasar al siguiente nivel — no presionar por una decisión que no pueden tomar en esta reunión.'
        }
      ]
    }
  ]
};

const BriefingPage = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [showOutput, setShowOutput] = useState(false);

  const navy = '#0A2240';
  const copper = '#B8860B';
  const cream = '#F5F2EC';

  const handleCopy = () => {
    navigator.clipboard.writeText(PROMPT_BRIEFING);
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
          onClick={() => navigate('/componente/levantar-capital')}
          style={{ fontSize: 13, color: '#8A8880', cursor: 'pointer',
            marginBottom: 40, background: 'none', border: 'none',
            padding: 0, display: 'inline-flex', alignItems: 'center',
            gap: 6, fontFamily: 'Inter, sans-serif' }}
        >← Levantar el Capital</button>

        {/* HERO */}
        <div style={{ display: 'inline-flex', alignItems: 'center',
          gap: 8, fontSize: 10, fontWeight: 700, letterSpacing: 3,
          textTransform: 'uppercase', color: copper, marginBottom: 16 }}>
          <div style={{ width: 6, height: 6, background: copper,
            borderRadius: '50%' }} />
          Superpoder · Nivel 1
        </div>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: 52,
          fontWeight: 700, color: navy, lineHeight: 1.05,
          marginBottom: 12, letterSpacing: -1 }}>
          Briefing de LP
        </div>
        <div style={{ fontSize: 16, color: '#5A6070', lineHeight: 1.7,
          maxWidth: 640, marginBottom: 48, paddingBottom: 40,
          borderBottom: '1px solid #E0DBD0' }}>
          Entra a cada reunión sabiendo exactamente qué va a preguntar
          el LP, cómo responderlo con datos reales de Ashmore, y qué
          no decir. En 2 minutos tienes el briefing completo para todo
          el equipo.
        </div>

        {/* PASO 1 — Qué necesitas tener listo */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3,
            textTransform: 'uppercase', color: copper, marginBottom: 24 }}>
            — Paso 1 · Qué necesitas tener listo antes de copiar el prompt
          </div>
          <div style={{ display: 'grid',
            gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
            {[
              { icon: '①', titulo: 'Nombre y tipo del LP', desc: 'DFI internacional, fondo de pensiones local, aseguradora, family office. Mientras más específico, más útil el briefing.' },
              { icon: '②', titulo: 'Objetivo de la reunión', desc: 'Primera presentación, revisión del DDQ, respuesta a preguntas del Comité, pre-cierre, seguimiento post-reunión anterior.' },
              { icon: '③', titulo: 'Quién asiste por parte del LP', desc: 'El cargo del interlocutor define qué preguntas esperar — un Director de Riesgos pregunta diferente que un Director de Inversiones.' },
              { icon: '④', titulo: 'Contexto de interacciones previas', desc: 'Qué preguntaron antes, qué les preocupó, qué quedó pendiente. Si es primera reunión, describir lo que sabes del LP.' },
            ].map((item, i) => (
              <div key={i} style={{ background: 'white',
                border: '1px solid #E0DBD0', borderRadius: 6,
                padding: '20px 18px',
                borderTop: `3px solid ${navy}` }}>
                <div style={{ fontFamily: 'Georgia, serif',
                  fontSize: 28, fontWeight: 700, color: '#E8E4DC',
                  lineHeight: 1, marginBottom: 8 }}>{item.icon}</div>
                <div style={{ fontSize: 13, fontWeight: 700,
                  color: navy, marginBottom: 6 }}>{item.titulo}</div>
                <div style={{ fontSize: 12, color: '#6A7080',
                  lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* PASO 2 — El prompt */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3,
            textTransform: 'uppercase', color: copper, marginBottom: 24 }}>
            — Paso 2 · Copia el prompt y completa los datos de la reunión
          </div>
          <div style={{ background: navy, borderRadius: 6,
            padding: '24px 28px' }}>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 2,
              textTransform: 'uppercase', color: copper,
              marginBottom: 16 }}>Prompt completo — Briefing de LP</div>
            <div style={{ fontFamily: 'Courier New, monospace',
              fontSize: 11, color: '#8AAABB', lineHeight: 1.8,
              whiteSpace: 'pre-wrap', maxHeight: 180, overflow: 'hidden',
              position: 'relative' }}>
              {PROMPT_BRIEFING.substring(0, 500)}...
              <div style={{ position: 'absolute', bottom: 0, left: 0,
                right: 0, height: 60,
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
              Completa la sección <strong>DATOS DE LA REUNIÓN</strong>
              con la información específica antes de pegar en Claude.
              Mientras más detalle des sobre el LP y el contexto previo,
              más precisas serán las preguntas esperadas y las respuestas
              recomendadas.
            </div>
          </div>
        </div>

        {/* PASO 3 — Output ejemplo */}
        <div style={{ marginBottom: 56 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3,
            textTransform: 'uppercase', color: copper, marginBottom: 24 }}>
            — Paso 3 · Así se ve el briefing generado
          </div>
          <div style={{ background: 'white', border: '1px solid #E0DBD0',
            borderRadius: 6, overflow: 'hidden' }}>
            <div style={{ background: navy, padding: '16px 24px',
              display: 'flex', alignItems: 'center',
              justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700,
                  color: '#F8F5F0' }}>
                  Briefing — {OUTPUT_EJEMPLO.lp}
                </div>
                <div style={{ fontSize: 10, color: '#4A6070',
                  marginTop: 2 }}>
                  {OUTPUT_EJEMPLO.fecha} · {OUTPUT_EJEMPLO.objetivo}
                </div>
              </div>
              <div style={{ fontSize: 9, fontWeight: 600,
                padding: '3px 10px',
                background: 'rgba(184,134,11,0.15)', color: copper,
                borderRadius: 2,
                border: '1px solid rgba(184,134,11,0.3)' }}>
                4 secciones · Interno
              </div>
            </div>

            {!showOutput ? (
              <div style={{ padding: '32px 24px', textAlign: 'center' }}>
                <div style={{ fontSize: 14, color: '#8A8880',
                  marginBottom: 20 }}>
                  Ver ejemplo de briefing generado para reunión con
                  Porvenir — Comité de Riesgos Alternos
                </div>
                <button
                  onClick={() => setShowOutput(true)}
                  style={{ padding: '12px 32px', background: navy,
                    border: 'none', borderRadius: 4, fontSize: 13,
                    fontWeight: 700, color: '#F8F5F0', cursor: 'pointer',
                    fontFamily: 'Inter, sans-serif' }}
                >
                  Ver ejemplo de output →
                </button>
              </div>
            ) : (
              <div style={{ padding: '24px' }}>
                {OUTPUT_EJEMPLO.secciones.map((sec, i) => (
                  <div key={i} style={{
                    marginBottom: i < OUTPUT_EJEMPLO.secciones.length - 1
                      ? 28 : 0,
                    paddingBottom: i < OUTPUT_EJEMPLO.secciones.length - 1
                      ? 28 : 0,
                    borderBottom: i < OUTPUT_EJEMPLO.secciones.length - 1
                      ? '1px solid #F0EDE6' : 'none'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'baseline',
                      gap: 12, marginBottom: 14 }}>
                      <span style={{ fontFamily: 'Georgia, serif',
                        fontSize: 32, fontWeight: 700, color: '#E8E4DC',
                        lineHeight: 1 }}>{sec.num}</span>
                      <span style={{ fontSize: 14, fontWeight: 700,
                        color: navy, textTransform: 'uppercase',
                        letterSpacing: 1 }}>{sec.titulo}</span>
                      <div style={{ width: 8, height: 8,
                        borderRadius: '50%', background: sec.color,
                        marginLeft: 4 }} />
                    </div>

                    {/* Texto simple */}
                    {'texto' in sec && (
                      <div style={{ fontSize: 14, color: '#444',
                        lineHeight: 1.8 }}>{sec.texto}</div>
                    )}

                    {/* Preguntas */}
                    {'preguntas' in sec && sec.preguntas && (
                      <div style={{ display: 'flex',
                        flexDirection: 'column', gap: 10 }}>
                        {sec.preguntas.map((p, j) => (
                          <div key={j} style={{
                            borderLeft: `3px solid ${p.nivelColor}`,
                            padding: '14px 16px',
                            background: '#FAFAF8',
                            borderRadius: '0 6px 6px 0' }}>
                            <div style={{ display: 'flex',
                              alignItems: 'center', gap: 8,
                              marginBottom: 8 }}>
                              <span style={{ fontSize: 9,
                                fontWeight: 700, padding: '2px 8px',
                                borderRadius: 2,
                                background: p.nivelBg,
                                color: p.nivelColor }}>
                                {p.nivel} prob.
                              </span>
                              <span style={{ fontSize: 13,
                                fontWeight: 600, color: navy }}>
                                {p.pregunta}
                              </span>
                            </div>
                            <div style={{ fontSize: 13, color: '#5A6070',
                              lineHeight: 1.7 }}>{p.respuesta}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Don'ts */}
                    {'donts' in sec && sec.donts && (
                      <div style={{ display: 'flex',
                        flexDirection: 'column', gap: 10 }}>
                        {sec.donts.map((d, j) => (
                          <div key={j} style={{
                            display: 'flex', gap: 14,
                            padding: '14px 16px',
                            background: '#FFF5F5',
                            border: '1px solid #FEE2E2',
                            borderRadius: 6 }}>
                            <div style={{ width: 20, height: 20,
                              borderRadius: '50%',
                              background: '#FEE2E2',
                              display: 'flex', alignItems: 'center',
                              justifyContent: 'center', flexShrink: 0,
                              fontSize: 11, fontWeight: 700,
                              color: '#991B1B', marginTop: 1 }}>✕</div>
                            <div>
                              <div style={{ fontSize: 13,
                                fontWeight: 700, color: '#991B1B',
                                marginBottom: 4 }}>{d.titulo}</div>
                              <div style={{ fontSize: 13,
                                color: '#5A6070', lineHeight: 1.6 }}>
                                {d.desc}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <button
                  onClick={() => setShowOutput(false)}
                  style={{ marginTop: 20, fontSize: 12, color: '#8A8880',
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontFamily: 'Inter, sans-serif' }}
                >Ocultar ejemplo</button>
              </div>
            )}
          </div>
        </div>

        {/* NIVEL 2 CTA */}
        <div style={{ background: navy, borderRadius: 8,
          padding: '32px 40px', display: 'flex',
          alignItems: 'center', justifyContent: 'space-between',
          gap: 24 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3,
              textTransform: 'uppercase', color: copper,
              marginBottom: 10 }}>
              ¿Quieres que el sistema prepare esto automáticamente?
            </div>
            <div style={{ fontFamily: 'Georgia, serif', fontSize: 24,
              fontWeight: 700, color: '#F8F5F0', marginBottom: 8 }}>
              Nivel 2 — Sistema integrado
            </div>
            <div style={{ fontSize: 13, color: '#6A8AAA',
              lineHeight: 1.6 }}>
              El sistema genera el briefing automáticamente antes de cada
              reunión usando el historial completo del LP, el DDQ en curso,
              y la tesis personalizada — todo en un solo lugar.
            </div>
          </div>
          <button
            onClick={() => navigate('/demo/nivel2-fundraising')}
            style={{ padding: '12px 28px',
              border: `1.5px solid ${copper}`, borderRadius: 4,
              fontSize: 11, fontWeight: 700, letterSpacing: 1.5,
              color: copper, background: 'transparent', cursor: 'pointer',
              textTransform: 'uppercase', whiteSpace: 'nowrap',
              flexShrink: 0, fontFamily: 'Inter, sans-serif' }}
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

export default BriefingPage;
