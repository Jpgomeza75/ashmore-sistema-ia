import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { useState } from "react";

const PROMPT_COMPLETO = `Eres el equipo de Investor Relations de Ashmore Management Company Colombia SAS, preparando las respuestas al Due Diligence Questionnaire (DDQ) estándar de ILPA v1.2 para un LP institucional que está evaluando participar en el Fondo Ashmore Andino III.

INFORMACIÓN DE LA FIRMA DISPONIBLE:

FIRMA:
- Ashmore Management Company Colombia SAS, constituida en 2009, NIT 900.316.081-9, Bogotá
- Subsidiaria de Ashmore Group plc (LSE: ASHM, FTSE 250)
- Ashmore Group: fundada 1992, independiente desde 1999, IPO 2006
- USD 48.7 billion AUM global (Sept 2025)
- CEO global: Mark Coombs
- Oficinas: Londres (HQ), Bogotá, Lima, Jakarta, Mumbai, NY, Riyadh, Singapore, Tokyo, Dublin, Dubai, Qatar

FONDOS:
- Fondo I: USD 285M (USD 170M + USD 67.5M coinversiones), 15 años, desde 2010, Colombia
- Fondo Andino II: USD 248M, 10 años, Colombia y Perú
- Fondo Andino III: USD 420M, sobredemandado, Colombia/Perú/Panamá/Costa Rica/Guatemala/Rep. Dominicana, clima + social, ~10 inversiones, 3 compartimentos
- Administrador: Alianza Fiduciaria S.A.
- LP conocido Fondo III: SIFEM

PORTAFOLIO (11+ inversiones):
- TermoemCali: cogeneración gas 235 MW, Yumbo, desde 1999
- Ruta del Cacao: vía 4G, 191 km, Bucaramanga-Barrancabermeja-Yondó
- Transambiental: sistema de transporte urbano
- Líneas transmisión La Guajira: 110 kV (Riohacha-Maicao 74.8km, Riohacha-Cuestecitas 62km)
- Atlas Renewable Energy
- Bioena: pellets de madera, USD 100M
- Lógika: centro logístico
- Sohec: oncología
- CRdC/FERROCOL: ferrocarril
- Ática Andina Residuales, Creas, Siberia Carga

SECTORES: Transporte, Energía, Telecomunicaciones, Educación, Industria, Salud, Logística, Agua/residuos
ESG: Estándares IFC, planes de compensación biótica, gestión ambiental/social activa

INSTRUCCIONES:
1. Responde cada pregunta usando ÚNICAMENTE la información proporcionada arriba y conocimiento público verificable sobre Ashmore.
2. Para cada respuesta, clasifícala:
   - ✅ COMPLETA: elaborada completamente con información pública
   - 🟡 PARCIAL: borrador que requiere validación interna (indica qué falta)
   - 🔴 REQUIERE INPUT INTERNO: indica exactamente qué se necesita, quién lo tiene, dónde buscarlo
3. Tono profesional — como un GP institucional real.
4. Para Sí/No: responder y referenciar la respuesta detallada.
5. Si no aplica: "N/A" con explicación.

FORMATO por cada respuesta:
**[Número]. [Pregunta]**
[✅/🟡/🔴 CATEGORÍA]
[Respuesta]
[Si 🟡 o 🔴: "PARA COMPLETAR: [qué falta y dónde buscarlo]"]

Al final: RESUMEN DE COMPLETITUD con totales y lista priorizada de información interna faltante.

[El DDQ del LP está adjunto en este mensaje]`;

const s = {
  page: { background: '#F5F2EC', minHeight: '100vh', fontFamily: 'Inter, sans-serif' } as React.CSSProperties,
  container: { maxWidth: 960, margin: '0 auto', padding: '48px 64px 80px' } as React.CSSProperties,
};

const DdqPage = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(PROMPT_COMPLETO);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const steps = [
    {
      num: 1,
      tag: 'Preparación',
      title: 'Abre Claude',
      desc: 'Ve a claude.ai y crea una conversación nueva. Usa Claude Sonnet o superior para mejores resultados en documentos largos.',
      tip: 'También funciona con ChatGPT-4o. El prompt es el mismo — solo asegúrate de usar un modelo que acepte adjuntos PDF.',
      content: null,
    },
    {
      num: 2,
      tag: 'Input',
      title: 'Adjunta el DDQ del LP',
      desc: 'Sube el PDF o Word del cuestionario que te mandó el LP. Puedes adjuntar el documento completo — el modelo procesa hasta 200 páginas sin problema.',
      tip: 'Si el DDQ llega en múltiples archivos, combínalos primero en un solo PDF para que el modelo mantenga el contexto completo.',
      content: null,
    },
    {
      num: 3,
      tag: 'El prompt',
      title: 'Copia y pega este prompt',
      desc: 'Copia el prompt completo y pégalo en Claude junto con el DDQ adjunto. No modifiques nada — el prompt ya tiene toda la información de Ashmore necesaria.',
      tip: null,
      content: 'prompt',
    },
    {
      num: 4,
      tag: 'Ejecución',
      title: 'Ejecuta y espera 2-3 minutos',
      desc: 'Claude procesará el DDQ completo y generará las respuestas. Para un DDQ de 100 preguntas toma entre 2 y 4 minutos.',
      tip: 'Cada respuesta viene clasificada: ✅ Completa — lista para usar · 🟡 Parcial — requiere validación · 🔴 Input interno — necesitas información que solo Ashmore tiene.',
      content: null,
    },
    {
      num: 5,
      tag: 'Output',
      title: 'Así se ve el resultado',
      desc: 'Este es un ejemplo real generado con información pública de Ashmore. Descárgalo para ver el formato completo con las 14 secciones del ILPA v1.2.',
      tip: null,
      content: 'output',
    },
  ];

  return (
    <div style={s.page}>
      <Header />
      <div style={s.container}>

        {/* BACK */}
        <button
          onClick={() => navigate('/componente/levantar-capital')}
          style={{ fontSize: 13, color: '#8A8880', cursor: 'pointer', marginBottom: 40, background: 'none', border: 'none', padding: 0, display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'Inter, sans-serif' }}
        >
          ← Levantar el Capital
        </button>

        {/* HERO */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 10, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: '#B8860B', marginBottom: 16 }}>
          <div style={{ width: 6, height: 6, background: '#B8860B', borderRadius: '50%' }} />
          Superpoder · Nivel 1
        </div>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: 52, fontWeight: 700, color: '#0A2240', lineHeight: 1.05, marginBottom: 12, letterSpacing: -1 }}>
          Asistente de DDQs
        </div>
        <div style={{ fontSize: 16, color: '#5A6070', lineHeight: 1.7, maxWidth: 640, marginBottom: 48, paddingBottom: 40, borderBottom: '1px solid #E0DBD0' }}>
          De semanas a 30 minutos. Adjunta el cuestionario de cualquier LP y obtén un borrador completo con respuestas clasificadas — listo para que tu equipo revise y ajuste.
        </div>

        {/* SECTION LABEL */}
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: '#B8860B', marginBottom: 32 }}>
          — Cómo hacerlo hoy, paso a paso
        </div>

        {/* STEPS */}
        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 56 }}>
          {steps.map((step, idx) => (
            <div key={step.num} style={{ display: 'flex', gap: 0 }}>
              {/* Left — number + line */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 56, flexShrink: 0 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: '50%',
                  background: step.num === 5 ? '#B8860B' : '#0A2240',
                  color: '#F8F5F0',
                  fontFamily: 'Georgia, serif', fontSize: 18, fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, position: 'relative', zIndex: 1,
                }}>
                  {step.num}
                </div>
                {idx < steps.length - 1 && (
                  <div style={{ width: 2, background: '#E0DBD0', flex: 1, minHeight: 24 }} />
                )}
              </div>

              {/* Right — content */}
              <div style={{ flex: 1, padding: '0 0 40px 20px' }}>
                <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#B8860B', marginBottom: 6 }}>{step.tag}</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: '#0A2240', marginBottom: 8 }}>{step.title}</div>
                <div style={{ fontSize: 14, color: '#5A6070', lineHeight: 1.7, marginBottom: step.tip || step.content ? 16 : 0 }}>{step.desc}</div>

                {/* TIP */}
                {step.tip && (
                  <div style={{ background: '#F0EDE6', borderLeft: '3px solid #B8860B', padding: '14px 18px', marginBottom: step.content ? 16 : 0 }}>
                    <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: '#B8860B', marginBottom: 5 }}>Tip</div>
                    <div style={{ fontSize: 13, color: '#5A6070', lineHeight: 1.6 }}>{step.tip}</div>
                  </div>
                )}

                {/* PROMPT BOX */}
                {step.content === 'prompt' && (
                  <div style={{ background: '#0A2240', borderRadius: 6, padding: '20px 24px', position: 'relative' }}>
                    <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#B8860B', marginBottom: 12 }}>Prompt completo</div>
                    <div style={{
                      fontFamily: 'Courier New, monospace', fontSize: 11,
                      color: '#8AAABB', lineHeight: 1.7,
                      maxHeight: expanded ? 'none' : 120,
                      overflow: 'hidden',
                      whiteSpace: 'pre-wrap',
                      position: 'relative',
                    }}>
                      {PROMPT_COMPLETO}
                    </div>
                    {!expanded && (
                      <div style={{ position: 'absolute', bottom: 72, left: 0, right: 0, height: 40, background: 'linear-gradient(transparent, #0A2240)', pointerEvents: 'none' }} />
                    )}
                    <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
                      <button
                        onClick={handleCopy}
                        style={{ padding: '8px 20px', background: copied ? '#166534' : '#B8860B', border: 'none', borderRadius: 4, fontSize: 11, fontWeight: 700, color: '#0A2240', cursor: 'pointer', letterSpacing: 1, transition: 'background 0.2s', fontFamily: 'Inter, sans-serif' }}
                      >
                        {copied ? '✓ Copiado' : 'Copiar prompt completo'}
                      </button>
                      <button
                        onClick={() => setExpanded(!expanded)}
                        style={{ padding: '8px 16px', background: 'transparent', border: '1.5px solid #1E3A5A', borderRadius: 4, fontSize: 11, fontWeight: 600, color: '#6A8AAA', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}
                      >
                        {expanded ? 'Colapsar' : 'Ver completo'}
                      </button>
                    </div>
                  </div>
                )}

                {/* OUTPUT */}
                {step.content === 'output' && (
                  <div>
                    {/* Preview */}
                    <div style={{ background: 'white', border: '1px solid #E0DBD0', borderRadius: 6, overflow: 'hidden', marginBottom: 16 }}>
                      <div style={{ background: '#0A2240', padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: '#F8F5F0' }}>Ashmore DDQ — Fondo Andino III · ILPA v1.2</div>
                        <div style={{ display: 'flex', gap: 8 }}>
                          {[['✅ 50%','#DCFCE7','#166534'],['🟡 33%','#FEF9C3','#854D0E'],['🔴 17%','#FEE2E2','#991B1B']].map(([label, bg, color]) => (
                            <div key={String(label)} style={{ fontSize: 10, fontWeight: 600, padding: '3px 8px', borderRadius: 2, background: bg, color }}>{label}</div>
                          ))}
                        </div>
                      </div>
                      <div style={{ padding: '16px 20px' }}>
                        {[
                          { q: '1.1 Does the Firm have any existing business lines unrelated to the Fund\'s strategy?', badge: '✅ COMPLETA', badgeBg: '#DCFCE7', badgeColor: '#166534', a: 'No. Ashmore Management Company Colombia SAS operates exclusively as an infrastructure private equity fund manager. All activities are directly related to the Fund\'s investment strategy...', note: null },
                          { q: '1.4 Has any Team Member ever filed for bankruptcy?', badge: '🔴 REQUIERE INPUT INTERNO', badgeBg: '#FEE2E2', badgeColor: '#991B1B', a: 'Cannot be confirmed with publicly available information.', note: 'PARA COMPLETAR: Solicitar al equipo de Compliance/RRHH declaraciones individuales de todos los Principals sobre ausencia de procedimientos de quiebra personal.' },
                          { q: '3.1 Summarize the Fund\'s investment strategy.', badge: '✅ COMPLETA', badgeBg: '#DCFCE7', badgeColor: '#166534', a: 'Fondo Ashmore Andino III targets operational infrastructure assets in the Andean region (USD 420M, 6 countries, ~10 investments, USD 30–80M ticket)...', note: null },
                        ].map((item, i) => (
                          <div key={i} style={{ marginBottom: i < 2 ? 16 : 0, paddingBottom: i < 2 ? 16 : 0, borderBottom: i < 2 ? '1px solid #F0EDE6' : 'none' }}>
                            <div style={{ fontSize: 11, fontWeight: 700, color: '#0A2240', marginBottom: 4 }}>{item.q}</div>
                            <div style={{ display: 'inline-block', fontSize: 9, fontWeight: 700, padding: '2px 8px', borderRadius: 2, marginBottom: 6, background: item.badgeBg, color: item.badgeColor }}>{item.badge}</div>
                            <div style={{ fontSize: 11, color: '#444', lineHeight: 1.6 }}>{item.a}</div>
                            {item.note && (
                              <div style={{ fontSize: 10, color: '#854D0E', fontStyle: 'italic', marginTop: 6, padding: '6px 10px', background: '#FFFBEB', borderRadius: 2 }}>{item.note}</div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Download */}
                    <div style={{ background: 'white', border: '1px solid #E0DBD0', borderRadius: 6, padding: 24, display: 'flex', alignItems: 'center', gap: 20 }}>
                      <div style={{ width: 48, height: 48, background: '#E8E4DC', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontFamily: 'Georgia, serif', fontSize: 20, fontWeight: 700, color: '#0A2240' }}>W</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 14, fontWeight: 700, color: '#0A2240', marginBottom: 2 }}>Ashmore_DDQ_ILPA_Completo.docx</div>
                        <div style={{ fontSize: 12, color: '#8A8880' }}>52 preguntas · 14 secciones ILPA v1.2 · Generado con IA en 30 min</div>
                      </div>
                      <a
                        href="/downloads/Ashmore_DDQ_ILPA_Completo.docx"
                        download
                        style={{ padding: '10px 24px', background: '#0A2240', border: 'none', borderRadius: 4, fontSize: 12, fontWeight: 700, color: '#F8F5F0', cursor: 'pointer', textDecoration: 'none', display: 'inline-block' }}
                      >
                        Descargar ejemplo →
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* NIVEL 2 CTA */}
        <div style={{ background: '#0A2240', borderRadius: 8, padding: '32px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: '#B8860B', marginBottom: 10 }}>
              ¿Quieres que esto funcione automáticamente?
            </div>
            <div style={{ fontFamily: 'Georgia, serif', fontSize: 24, fontWeight: 700, color: '#F8F5F0', marginBottom: 8 }}>
              Nivel 2 — El sistema integrado
            </div>
            <div style={{ fontSize: 13, color: '#6A8AAA', lineHeight: 1.6 }}>
              Pre-llena el 80% de cualquier DDQ nuevo automáticamente, mantiene perfiles de cada LP, y actualiza todos los materiales cuando cambia un dato del fondo.
            </div>
          </div>
          <button
            onClick={() => navigate('/demo/nivel2-fundraising')}
            style={{ padding: '12px 28px', border: '1.5px solid #B8860B', borderRadius: 4, fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: '#B8860B', background: 'transparent', cursor: 'pointer', textTransform: 'uppercase', whiteSpace: 'nowrap', flexShrink: 0, fontFamily: 'Inter, sans-serif' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#B8860B'; e.currentTarget.style.color = '#0A2240'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#B8860B'; }}
          >
            Ver el sistema →
          </button>
        </div>

      </div>
    </div>
  );
};

export default DdqPage;
