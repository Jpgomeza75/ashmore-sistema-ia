import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";

const PROMPT_JUNTAS = `Eres el analista senior de asset management de Ashmore Management Company Colombia, preparando el brief de junta directiva para el representante de Ashmore en el directorio de una compañía del portafolio.

CONTEXTO DE ASHMORE:
- Ashmore Management Company Colombia SAS, gestora de fondos de PE en infraestructura
- Activos del portafolio: TermoemCali (235MW gas, Yumbo), Ruta del Cacao (4G 191km), Transambiental, Líneas transmisión La Guajira 110kV, Atlas Renewable Energy, Bioena (USD 100M pellets), Lógika, Sohec, CRdC/FERROCOL
- Estándares ESG: IFC Performance Standards (PS 1-8)
- El representante de Ashmore tiene obligación fiduciaria ante los LPs del fondo

DATOS DE LA JUNTA:
- Compañía: [Nombre del activo del portafolio]
- Fecha de la junta: [Fecha]
- Tipo de junta: [Ordinaria / Extraordinaria / Comité de Auditoría]
- Agenda enviada: [Pegar la agenda o describirla]
- Representante de Ashmore que asiste: [Nombre y cargo]

DOCUMENTOS DISPONIBLES:
[Adjuntar o describir: acta de la última junta, informe trimestral más reciente, estados financieros, cualquier otro documento relevante]

GENERA UN BRIEF DE JUNTA DIRECTIVA con exactamente estas 5 secciones:

**1. COMPROMISOS PENDIENTES DE LA ÚLTIMA JUNTA**
Lista de compromisos adquiridos en la última sesión con su estado actual. Para cada uno: qué se comprometió, quién era el responsable, si se cumplió o no, y qué acción tomar si está pendiente.

**2. RESUMEN EJECUTIVO DEL PERÍODO**
Qué pasó desde la última junta que el representante de Ashmore debe saber antes de entrar a la sala. KPIs financieros vs. plan (ingresos, EBITDA, caja), eventos operativos relevantes, novedades ESG, cambios en el entorno regulatorio que afecten el activo. Máximo 200 palabras.

**3. ANÁLISIS PUNTO POR PUNTO DE LA AGENDA**
Para cada punto de la agenda:
- Descripción del tema
- Contexto relevante para el representante de Ashmore
- Posición recomendada (aprobar / rechazar / pedir más información / abstenerse)
- Argumentos para defender la posición
- Riesgos si se aprueba o si no se aprueba

**4. PREGUNTAS QUE ASHMORE DEBERÍA HACER**
Las 5-7 preguntas más importantes que el representante de Ashmore debería plantear en la junta — con el propósito de cada pregunta y la respuesta que se espera del management.

**5. ALERTAS Y SEGUIMIENTO**
Temas que requieren monitoreo especial después de esta junta. Compromisos que Ashmore debe asegurarse de que queden en el acta. Señales de alerta que el representante debe detectar durante la sesión.

TONO: Brief interno de trabajo. Directo y sin adornos. El representante lo lee 30 minutos antes de entrar a la sala.

[ADJUNTAR: Acta de la última junta + Informe trimestral]`;

const OUTPUT_EJEMPLO_JUNTAS = [
  {
    num: '1',
    titulo: 'Compromisos pendientes',
    color: '#FCA5A5',
    texto: '• Plan de manejo de residuos Fase II — Responsable: Gerencia Técnica. Estado: INCUMPLIDO. Debía presentarse en esta sesión. Acción: exigir fecha comprometida antes de cerrar el punto de agenda correspondiente.\n\n• Actualización del modelo de valoración Q4 2025 — Responsable: CFO. Estado: CUMPLIDO. El modelo fue enviado a Ashmore el 28 de febrero.\n\n• Informe de auditoría ambiental ANLA — Responsable: Dirección ESG. Estado: PENDIENTE. Plazo original: marzo 15. Sin novedades del equipo.'
  },
  {
    num: '2',
    titulo: 'Resumen ejecutivo del período',
    color: '#93C5FD',
    texto: 'Q1 2026 cerró con ingresos de USD 8.4M, un 6% por debajo del plan (USD 8.9M) por menor despacho en enero debido a mantenimiento programado de la turbina 2. EBITDA: USD 5.6M (margen 67% vs. 71% plan). Caja operativa: USD 2.1M, en línea con plan.\n\nEvento material: Resolución CREG 101 100 de 2026 creó el MCE — oportunidad de optimizar ingresos de bolsa que requiere análisis legal antes de decidir participación.\n\nESG: Sin incidentes en el período. Plan de compensación biótica en ejecución (78% completado). Próxima auditoría ANLA: junio 2026.'
  },
  {
    num: '3',
    titulo: 'Análisis de agenda',
    color: '#B8860B',
    texto: 'PUNTO 3: Aprobación de capex extraordinario USD 2.3M — reparación turbina 2\nPosición Ashmore: SOLICITAR MÁS INFORMACIÓN antes de aprobar\nContexto: El presupuesto original no incluía este capex. El management argumenta que fue una falla no anticipada. Ashmore debe verificar si está cubierto por garantías del fabricante o por el contrato de O&M antes de comprometer capital adicional.\nRiesgo si se aprueba sin verificar: podría haber doble pago si la garantía aplica.'
  },
  {
    num: '4',
    titulo: 'Preguntas que Ashmore debería hacer',
    color: '#86EFAC',
    texto: '1. "¿El contrato de O&M con [operador] cubre la falla de la turbina 2? ¿Cuál es la posición del operador?" → Verifica si el capex extraordinario es realmente necesario o si hay responsabilidad del operador.\n\n2. "¿Cuál fue el impacto exacto en ingresos del mantenimiento de enero? ¿Está recuperado en el plan del año?" → Evalúa si el shortfall de Q1 se recupera o afecta el año completo.\n\n3. "¿En qué estado está el informe de auditoría ANLA? ¿Hay riesgo de observaciones?" → Monitorea el compromiso pendiente y detecta riesgo regulatorio.'
  },
  {
    num: '5',
    titulo: 'Alertas y seguimiento',
    color: '#F9A8D4',
    texto: 'ASEGURARSE QUE QUEDE EN ACTA: La aprobación del capex de USD 2.3M debe condicionarse a confirmación escrita del operador sobre si aplica la garantía del contrato O&M.\n\nSEÑAL DE ALERTA: Si el management no tiene respuesta sobre la garantía, sugiere que no la consultaron — debilidad en la gestión de contratos que Ashmore debe documentar.\n\nSEGUIMIENTO POST-JUNTA: (1) Solicitar confirmación escrita del plan de manejo de residuos Fase II en los 5 días hábiles siguientes. (2) Confirmar con equipo de Ashmore si se va a explorar participación en el MCE.'
  }
];

const PreparadorJuntasPage = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
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
          Preparador de Juntas
        </div>
        <div style={{ fontSize: 16, color: '#5A6070',
          lineHeight: 1.7, maxWidth: 640,
          marginBottom: 48, paddingBottom: 40,
          borderBottom: '1px solid #E0DBD0' }}>
          El representante de Ashmore va a 11 juntas
          distintas. En 5 minutos tiene el brief completo:
          compromisos pendientes, resumen del período,
          posición recomendada por punto de agenda,
          y las preguntas que debe hacer.
        </div>

        {/* QUÉS NECESITAS */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: 10, fontWeight: 700,
            letterSpacing: 3, textTransform: 'uppercase',
            color: copper, marginBottom: 24 }}>
            — Qué necesitas tener antes de correr el prompt
          </div>
          <div style={{ display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 12 }}>
            {[
              { num: '①', titulo: 'La agenda de la junta',
                desc: 'Los puntos a tratar. Mientras más detallada, más específica la posición recomendada por cada punto.' },
              { num: '②', titulo: 'El acta de la última junta',
                desc: 'Para extraer los compromisos pendientes. Si no hay acta, describir los compromisos que recuerdas.' },
              { num: '③', titulo: 'El informe trimestral',
                desc: 'El reporte más reciente de la compañía — financiero, operativo, ESG. Es la base del resumen del período.' },
              { num: '④', titulo: 'El nombre del representante',
                desc: 'Quién va de Ashmore — el cargo define el nivel de detalle técnico del brief.' },
            ].map((item, i) => (
              <div key={i} style={{ background: 'white',
                border: '1px solid #E0DBD0',
                borderTop: `3px solid ${navy}`,
                borderRadius: 6, padding: '20px 18px' }}>
                <div style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: 28, fontWeight: 700,
                  color: '#E8E4DC', lineHeight: 1,
                  marginBottom: 8 }}>{item.num}</div>
                <div style={{ fontSize: 13, fontWeight: 700,
                  color: navy, marginBottom: 6 }}>
                  {item.titulo}
                </div>
                <div style={{ fontSize: 12, color: '#6A7080',
                  lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* PROMPT */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: 10, fontWeight: 700,
            letterSpacing: 3, textTransform: 'uppercase',
            color: copper, marginBottom: 24 }}>
            — Copia el prompt y pégalo en Claude
          </div>
          <div style={{ background: navy, borderRadius: 6,
            padding: '24px 28px' }}>
            <div style={{ fontSize: 9, fontWeight: 700,
              letterSpacing: 2, textTransform: 'uppercase',
              color: copper, marginBottom: 16 }}>
              Prompt completo — Preparador de Juntas
            </div>
            <div style={{ fontFamily: 'Courier New, monospace',
              fontSize: 11, color: '#8AAABB', lineHeight: 1.8,
              whiteSpace: 'pre-wrap', maxHeight: 180,
              overflow: 'hidden', position: 'relative' }}>
              {PROMPT_JUNTAS.substring(0, 500)}...
              <div style={{ position: 'absolute', bottom: 0,
                left: 0, right: 0, height: 60,
                background: `linear-gradient(transparent, ${navy})`,
                pointerEvents: 'none' }} />
            </div>
            <div style={{ marginTop: 20 }}>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(PROMPT_JUNTAS);
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
              Demo construida con
            </div>
            <div style={{ fontSize: 13, color: '#5A6070',
              lineHeight: 1.6 }}>
              Junta directiva de TermoemCali I S.A. ESP —
              planta de cogeneración 235MW, Yumbo.
              Documentos: acta Q4 2025 + informe trimestral
              Q1 2026 + agenda marzo 2026.
            </div>
          </div>
        </div>

        {/* OUTPUT */}
        <div style={{ marginBottom: 56 }}>
          <div style={{ fontSize: 10, fontWeight: 700,
            letterSpacing: 3, textTransform: 'uppercase',
            color: copper, marginBottom: 24 }}>
            — Así se ve el brief generado
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
                  Brief de Junta — TermoemCali I S.A. ESP
                </div>
                <div style={{ fontSize: 10, color: '#4A6070',
                  marginTop: 2 }}>
                  Marzo 25, 2026 · Junta Ordinaria ·
                  5 secciones
                </div>
              </div>
              <div style={{ fontSize: 9, fontWeight: 600,
                padding: '3px 10px',
                background: 'rgba(184,134,11,0.15)',
                color: copper, borderRadius: 2,
                border: '1px solid rgba(184,134,11,0.3)' }}>
                Generado en 4 min
              </div>
            </div>
            {!showOutput ? (
              <div style={{ padding: '32px 24px',
                textAlign: 'center' }}>
                <div style={{ fontSize: 14, color: '#8A8880',
                  marginBottom: 20 }}>
                  Ver ejemplo de brief para junta de
                  TermoemCali — Marzo 2026
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
                {OUTPUT_EJEMPLO_JUNTAS.map((sec, i) => (
                  <div key={i} style={{
                    marginBottom: i < OUTPUT_EJEMPLO_JUNTAS.length - 1
                      ? 28 : 0,
                    paddingBottom: i < OUTPUT_EJEMPLO_JUNTAS.length - 1
                      ? 28 : 0,
                    borderBottom: i < OUTPUT_EJEMPLO_JUNTAS.length - 1
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
                    <div style={{ fontSize: 14,
                      color: '#444', lineHeight: 1.8,
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
              El sistema genera automáticamente el brief
              de cada junta cuando llegan los documentos,
              trackea los compromisos pendientes, y alerta
              cuando se acerca la próxima sesión.
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

export default PreparadorJuntasPage;
