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
    titulo: 'Compromisos pendientes de la última junta',
    color: '#FCA5A5',
    texto: `INCUMPLIDO — Plan de Manejo de Residuos Industriales Fase II
Responsable: Gerencia Técnica (Ing. Ramírez) · Plazo original: Dic 31, 2025 · Reprogramado: Mar 25, 2026
Estado: Segunda reprogramación consecutiva
Acción: Exigir fecha definitiva con penalidad contractual si no se cumple. No aprobar nuevos puntos que dependan de esta gestión ambiental. Ashmore debe documentar en el acta que el incumplimiento es reiterado.

PENDIENTE — Informe de auditoría ambiental ANLA (Compensación biótica)
Responsable: Dirección ESG (Dra. Vargas) · Plazo: Mar 15, 2026
Estado: 10 días vencido sin comunicación al directorio
Acción: Solicitar al inicio de la junta estado actual del informe. Si hay observaciones de la ANLA, Ashmore debe ser informado de inmediato — es un riesgo de licencia ambiental del activo.

CUMPLIDO — Actualización modelo de valoración Q4 2025 con nueva estructura de costos
Responsable: CFO (Sr. Montenegro) · Plazo: Feb 28, 2026
Estado: Modelo recibido por Ashmore el 28 de febrero. En revisión por equipo de inversiones.
Sin acción requerida en la junta. El equipo de Ashmore enviará comentarios al CFO antes del 10 de abril.

PENDIENTE — Contratación nuevo gerente de operaciones
Responsable: Gerencia General · Plazo: Mar 1, 2026
Estado: Proceso de selección en curso, dos candidatos finalistas
Acción: Solicitar actualización del proceso. Ashmore debe asegurarse de que el nuevo gerente cumpla con el perfil aprobado por la junta en diciembre 2025.`
  },
  {
    num: '2',
    titulo: 'Resumen ejecutivo del período Q1 2026',
    color: '#93C5FD',
    texto: `KPIs del período:
- Ingresos Q1: USD 8.4M — 6% por debajo del plan (USD 8.9M)
- EBITDA: USD 5.6M — Margen 67% vs. 71% en el plan
- Caja operativa: USD 2.1M — En línea con el plan
- Disponibilidad de planta: 91.2% vs. 95% garantizado contractualmente

Causa del shortfall de ingresos: Mantenimiento no programado de la turbina 2 durante 18 días en enero por falla en el sistema de enfriamiento. El management reportó que la falla fue cubierta parcialmente por el contrato de O&M, pero el impacto neto en producción fue de ~42 GWh dejados de generar. ASHMORE AÚN NO HA RECIBIDO CONFIRMACIÓN ESCRITA DE QUÉ CUBRIÓ EL OPERADOR — esto es crítico para el Punto 3 de la agenda.

Evento regulatorio relevante: Resolución CREG 101 100 de 2026 (MCE) expedida el 19 de febrero. El equipo de asset management de Ashmore está realizando análisis de impacto sobre el portafolio de energía — ver Punto 4 de la agenda.

ESG: Sin incidentes ambientales o laborales en el período. Plan de compensación biótica: 78% completado, en línea con cronograma. Próxima auditoría ANLA programada para junio 2026 — ver compromiso pendiente sobre el informe de marzo.`
  },
  {
    num: '3',
    titulo: 'Análisis punto por punto de la agenda',
    color: '#B8860B',
    texto: `PUNTO 2: Aprobación estados financieros Q1 2026 y gestión presupuestal
Posición Ashmore: SOLICITAR ACLARACIÓN antes de aprobar
Contexto: Los estados financieros muestran ingresos 6% bajo plan. Antes de aprobarlos, Ashmore debe entender cómo se contabilizó el impacto de la falla de la turbina 2 y si la recuperación por el contrato O&M fue registrada correctamente.
Argumentos: El diferencial de USD 0.5M vs. plan requiere explicación que permita evaluar si es recuperable en Q2-Q4 o si afecta el pronóstico del año.
Riesgo si se aprueba sin aclaración: Ashmore pierde la oportunidad de documentar que el shortfall fue por un evento no recurrente — relevante para la valoración del activo.

PUNTO 3: Aprobación capex extraordinario USD 2.3M — reparación definitiva turbina 2
Posición Ashmore: SOLICITAR MÁS INFORMACIÓN. No aprobar en esta sesión.
Contexto: El presupuesto 2026 aprobado en diciembre no incluía este capex. Ashmore debe verificar PRIMERO si la reparación está cubierta por: (a) garantía del fabricante, (b) contrato de O&M, (c) póliza de seguro del activo.
Argumentos: Si alguna cobertura aplica, TermoemCali no debería asumir este capex. Este monto equivale al 41% del EBITDA del trimestre.
Riesgo si se aprueba sin verificar: Doble pago si la garantía o el seguro responden.

PUNTO 4: Presentación impacto Resolución CREG 101 100 de 2026 (MCE)
Posición Ashmore: ESCUCHAR E INFORMAR. No revelar aún la posición de Ashmore.
Contexto: El management presentará su análisis del MCE. Ashmore tiene análisis propio en curso — escuchar primero la perspectiva del management antes de tomar posición pública.
Pregunta clave que Ashmore debe hacer: ¿Ha revisado el management los contratos bilaterales vigentes para determinar si hay cláusulas de exclusividad que restrinjan la participación en el MCE?

PUNTO 5: Aprobación plan de ventas Q2 2026 y estrategia de comercialización
Posición Ashmore: CONDICIONAR aprobación a resolución del MCE.
Contexto: El plan de ventas Q2 debería incorporar el análisis del MCE antes de aprobarse. Si TermoemCali puede participar en el MCE como vendedor, la estrategia de comercialización cambia materialmente.
Propuesta: Que el plan de ventas incluya un escenario con MCE y otro sin MCE, y que la decisión de participar se tome en sesión extraordinaria antes del 30 de abril.`
  },
  {
    num: '4',
    titulo: 'Preguntas que Ashmore debería hacer',
    color: '#86EFAC',
    texto: `1. "¿El contrato de O&M con el operador cubre la falla de la turbina 2? ¿Cuál fue la posición formal del operador cuando se notificó la falla?"
Propósito: Determinar si el capex de USD 2.3M del Punto 3 es una obligación de TermoemCali o del operador.
Respuesta esperada: El management debe tener documentada la comunicación con el operador. Si no la tiene, eso es una señal de alerta sobre la gestión del contrato O&M.

2. "¿Cuál fue el impacto exacto en ingresos del mantenimiento de enero? ¿Cuántos GWh dejaron de generarse y a qué precio promedio de bolsa?"
Propósito: Entender si el shortfall de USD 0.5M vs. plan es recuperable en los próximos trimestres o hay que ajustar el pronóstico del año completo.

3. "¿Los contratos bilaterales vigentes de TermoemCali incluyen cláusulas de exclusividad que restrinjan la participación en el MCE?"
Propósito: Es la información prerrequisito para evaluar la oportunidad del MCE. Si no lo han revisado, Ashmore debe exigir que se haga antes de la próxima sesión.

4. "¿En qué estado está el informe de auditoría ANLA? ¿Hay observaciones pendientes de respuesta?"
Propósito: El informe estaba comprometido para el 15 de marzo y no llegó. Si hay observaciones sobre el plan de compensación biótica, es un riesgo de licencia ambiental que Ashmore debe conocer de inmediato.

5. "¿Cuándo se espera que el nuevo gerente de operaciones entre en funciones? ¿El gerente saliente permanece hasta el empalme?"
Propósito: La vacante en operaciones es un riesgo, especialmente con la reparación de la turbina 2 en curso y el análisis del MCE simultáneos.`
  },
  {
    num: '5',
    titulo: 'Alertas y seguimiento post-junta',
    color: '#F9A8D4',
    texto: `ASEGURARSE QUE QUEDE EN ACTA: La aprobación del capex de USD 2.3M (Punto 3) debe quedar condicionada a la confirmación escrita de que no existe cobertura por garantía del fabricante, contrato O&M o seguro. Si la junta aprueba sin esta condición, Ashmore debe votar en contra y documentar la razón.

SEÑAL DE ALERTA: Si el management no tiene documentada la comunicación formal con el operador sobre la falla de la turbina 2, eso indica debilidad en la gestión del contrato O&M. Ashmore debe solicitar acceso a toda la documentación del incidente para revisión interna.

SEGUIMIENTO SEMANA SIGUIENTE: Confirmar con el equipo jurídico de Ashmore que recibieron la tarea de revisar los contratos bilaterales de TermoemCali frente al MCE. Solicitar concepto preliminar antes del 10 de abril.

SEGUIMIENTO 5 DÍAS HÁBILES: Si el Plan de Manejo de Residuos Fase II no tiene fecha definitiva aprobada en la junta, escalar al Director de Inversiones para evaluar si se requiere una sesión extraordinaria o una notificación formal a la gerencia general.

DOCUMENTAR: La posición de Ashmore sobre el MCE debe quedar registrada en el acta como "en análisis — decisión pendiente de información contractual". Esto protege a Ashmore en caso de que el management tome decisiones unilaterales sobre la participación en el MCE antes de la próxima junta.`
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
                  Junta Ordinaria · Marzo 25, 2026 · 5 secciones
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
                  Ver brief completo →
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
                    <div style={{ fontSize: 13,
                      lineHeight: 1.85, fontFamily: 'Inter, sans-serif' }}>
                      {sec.texto.split('\n').map((line, li) => (
                        <div key={li} style={{
                          marginBottom: line === '' ? 8 : 2,
                          fontWeight:
                            line.startsWith('INCUMPLIDO') ||
                            line.startsWith('PENDIENTE') ||
                            line.startsWith('CUMPLIDO') ||
                            line.startsWith('PUNTO') ||
                            line.startsWith('Posición Ashmore') ||
                            line.startsWith('ASEGURARSE') ||
                            line.startsWith('SEÑAL') ||
                            line.startsWith('SEGUIMIENTO') ||
                            line.startsWith('DOCUMENTAR')
                            ? 700 : 400,
                          color:
                            line.startsWith('INCUMPLIDO') ? '#991B1B' :
                            line.startsWith('PENDIENTE') ? '#854D0E' :
                            line.startsWith('CUMPLIDO') ? '#166534' :
                            line.startsWith('PUNTO') ? '#0A2240' :
                            line.startsWith('Posición Ashmore') ? '#B8860B' :
                            line.startsWith('ASEGURARSE') ||
                            line.startsWith('SEÑAL') ? '#991B1B' :
                            line.startsWith('SEGUIMIENTO') ||
                            line.startsWith('DOCUMENTAR') ? '#854D0E' :
                            '#444',
                          fontSize:
                            line.startsWith('PUNTO') ||
                            line.startsWith('INCUMPLIDO') ||
                            line.startsWith('PENDIENTE') ||
                            line.startsWith('CUMPLIDO') ? 14 : 13,
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
                  Brief generado en 5 minutos a partir del acta
                  de la junta de diciembre 2025, el informe
                  trimestral Q1 2026 y la agenda enviada por
                  la gerencia de TermoemCali. Documento de
                  trabajo interno — no compartir con la
                  compañía del portafolio.
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
