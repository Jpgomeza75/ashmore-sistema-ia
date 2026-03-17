import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";

const DecidirInvertirPage = () => {
  const navigate = useNavigate();
  const navy = '#0A2240';
  const copper = '#B8860B';
  const cream = '#F5F2EC';

  const momentos = [
    {
      num: '01',
      titulo: 'Antes del IC',
      sub: 'Preparar para ganar la sala',
      color: copper,
      desc: 'El equipo llega al IC con el memo finalizado, el modelo validado, y las preguntas del comité ya anticipadas. La preparación es la diferencia entre una aprobación limpia y una sesión que termina con más DD.',
      superpoderes: [
        {
          titulo: 'Preparador del Investment Memo',
          desc: 'Toma todos los hallazgos del DD — financiero, técnico, legal y ESG — y genera el Investment Memo final en el formato estándar del fondo. Secciones estructuradas, datos consistentes con el modelo, riesgos priorizados. El equipo revisa y ajusta, no escribe desde cero.',
        },
        {
          titulo: 'Simulador de preguntas del IC',
          desc: 'Dado el perfil del deal y la composición del comité, genera las preguntas más probables que cada miembro del IC va a hacer — con las respuestas preparadas y las referencias exactas al memo y al modelo. Si un miembro del comité es conocido por su énfasis en ESG, sus preguntas son diferentes a las de otro que prioriza estructura de salida.',
        },
        {
          titulo: 'Validador de consistencia',
          desc: 'Cruza el Investment Memo contra el modelo financiero y los hallazgos del DD para detectar inconsistencias antes de distribuir al comité. ¿El memo dice TIR 13.1% y el modelo dice 13.4%? ¿El memo menciona un riesgo que no está en la tabla de riesgos? El sistema lo detecta antes de que lo detecte el IC.',
        },
        {
          titulo: 'Comparador de términos',
          desc: 'Compara los términos del deal (ticket, estructura, retorno, múltiplo de entrada, governance) contra los deals anteriores del fondo. ¿Estamos pagando más caro que en Ruta del Cacao? ¿El SHA tiene menos protecciones que en TermoemCali? El contexto histórico fortalece la argumentación ante el IC.',
        },
      ]
    },
    {
      num: '02',
      titulo: 'Durante el IC',
      sub: 'Registrar lo que se decide',
      color: '#93C5FD',
      desc: 'El IC toma decisiones y establece condiciones. El riesgo es que los compromisos queden en el aire o mal documentados. La IA ayuda a registrar con precisión lo que se aprobó, lo que quedó condicionado, y lo que cada miembro del equipo se comprometió a resolver.',
      superpoderes: [
        {
          titulo: 'Registrador de decisiones',
          desc: 'Durante o inmediatamente después del IC, el equipo describe verbalmente lo que se decidió y el sistema genera el acta formal estructurada: deal aprobado/rechazado/condicionado, condiciones específicas con responsables, plazos acordados, compromisos del equipo.',
        },
        {
          titulo: 'Generador del acta del IC',
          desc: 'Convierte las notas de la sesión en un acta formal con el formato requerido por el fondo — lista para firmar por los miembros del comité. Incluye el resumen del deal, la votación, las condiciones, y los próximos pasos.',
        },
      ]
    },
    {
      num: '03',
      titulo: 'Después del IC',
      sub: 'Ejecutar hasta el cierre',
      color: '#86EFAC',
      desc: 'La aprobación del IC no es el cierre. Hay condiciones que cumplir, documentos que negociar, y LPs que notificar. El proceso entre el IC y el cierre puede tomar meses — y es fácil perder el hilo de qué falta.',
      superpoderes: [
        {
          titulo: 'Tracker de condiciones de cierre',
          desc: 'Convierte las condiciones aprobadas por el IC en un tracker operativo: cada condición con responsable, deadline, documentos requeridos, y estado. El sistema alerta cuando algo está vencido o en riesgo de retrasar el cierre.',
        },
        {
          titulo: 'Asistente de negociación del SHA',
          desc: 'El Shareholders Agreement es el documento más complejo del cierre. La IA ayuda a revisar borradores contra los términos aprobados por el IC, identificar cláusulas que se desvían de lo acordado, y comparar con SHAs de inversiones anteriores del fondo.',
        },
        {
          titulo: 'Notificador a LPs',
          desc: 'Genera la comunicación formal a LPs sobre la nueva inversión — en el formato y tono requerido por cada tipo de LP. DFIs internacionales requieren información ESG detallada; fondos de pensiones locales necesitan claridad sobre el impacto en el NAV del fondo.',
        },
      ]
    },
  ];

  const nivel2Tabs = [
    {
      titulo: 'Dashboard de IC',
      desc: 'Todos los deals en proceso de aprobación — etapa actual, fecha del próximo IC, condiciones pendientes, semáforo de readiness.',
      color: '#B8860B',
    },
    {
      titulo: 'Investment Memo',
      desc: 'El memo final construido desde los hallazgos del DD. Historial de versiones. Control de cambios. Distribución al comité con confirmación de lectura.',
      color: '#86EFAC',
    },
    {
      titulo: 'Simulador de IC',
      desc: 'Preguntas probables por miembro del comité, con respuestas preparadas y referencias exactas al memo. Modo de práctica para el equipo antes de la sesión.',
      color: '#93C5FD',
    },
    {
      titulo: 'Condiciones y Cierre',
      desc: 'Tracker de condiciones post-IC. SHA en revisión con diff contra términos aprobados. Timeline de cierre con alertas automáticas.',
      color: '#F9A8D4',
    },
  ];

  return (
    <div style={{ background: cream,
      minHeight: '100vh',
      fontFamily: 'Inter, sans-serif' }}>
      <Header />
      <div style={{ maxWidth: 960, margin: '0 auto',
        padding: '48px 64px 80px' }}>

        {/* BACK */}
        <button
          onClick={() => navigate('/')}
          style={{ fontSize: 13, color: '#8A8880',
            cursor: 'pointer', marginBottom: 40,
            background: 'none', border: 'none',
            padding: 0, display: 'inline-flex',
            alignItems: 'center', gap: 6,
            fontFamily: 'Inter, sans-serif' }}
        >← Volver al mapa</button>

        {/* HERO */}
        <div style={{ display: 'inline-flex',
          alignItems: 'center', gap: 8, fontSize: 10,
          fontWeight: 700, letterSpacing: 3,
          textTransform: 'uppercase', color: copper,
          marginBottom: 16 }}>
          <div style={{ width: 6, height: 6,
            background: copper,
            borderRadius: '50%' }} />
          Journey · 04
        </div>
        <div style={{ fontFamily: 'Georgia, serif',
          fontSize: 52, fontWeight: 700, color: navy,
          lineHeight: 1.05, marginBottom: 20,
          letterSpacing: -1 }}>
          Decidir Invertir
        </div>
        <div style={{ fontSize: 16, color: '#5A6070',
          lineHeight: 1.7, maxWidth: 680,
          marginBottom: 16 }}>
          El Investment Committee es el momento donde
          convergen meses de trabajo. El DD está hecho,
          el modelo está validado, el riesgo está
          entendido. Ahora hay que tomar la decisión
          correcta — y documentarla bien.
        </div>
        <div style={{ fontSize: 15, color: '#5A6070',
          lineHeight: 1.7, maxWidth: 680,
          marginBottom: 48, paddingBottom: 40,
          borderBottom: '1px solid #E0DBD0' }}>
          La IA no vota en el IC. Sí asegura que el
          equipo llega preparado, que nada queda mal
          documentado, y que las condiciones aprobadas
          se ejecutan hasta el cierre.
        </div>

        {/* 3 MOMENTOS */}
        <div style={{ fontSize: 10, fontWeight: 700,
          letterSpacing: 3, textTransform: 'uppercase',
          color: copper, marginBottom: 32 }}>
          — El proceso en 3 momentos
        </div>

        {momentos.map((momento, mi) => (
          <div key={mi} style={{
            marginBottom: 0,
            padding: '40px 0',
            borderTop: '1px solid #E0DBD0',
            borderBottom: mi === momentos.length - 1
              ? '1px solid #E0DBD0' : 'none',
          }}>
            {/* Header del momento */}
            <div style={{ display: 'flex',
              alignItems: 'flex-start', gap: 24,
              marginBottom: 28 }}>
              <div style={{ flexShrink: 0 }}>
                <div style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: 48, fontWeight: 700,
                  color: '#E8E4DC', lineHeight: 1,
                  marginBottom: 0 }}>
                  {momento.num}
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex',
                  alignItems: 'center', gap: 12,
                  marginBottom: 8 }}>
                  <div style={{
                    fontFamily: 'Georgia, serif',
                    fontSize: 26, fontWeight: 700,
                    color: navy }}>
                    {momento.titulo}
                  </div>
                  <div style={{ fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: 2,
                    textTransform: 'uppercase',
                    color: momento.color,
                    border: `1px solid ${momento.color}`,
                    padding: '3px 10px',
                    borderRadius: 2 }}>
                    {momento.sub}
                  </div>
                </div>
                <div style={{ fontSize: 14,
                  color: '#5A6070', lineHeight: 1.7,
                  maxWidth: 640 }}>
                  {momento.desc}
                </div>
              </div>
            </div>

            {/* Superpoderes */}
            <div style={{ display: 'grid',
              gridTemplateColumns:
                momento.superpoderes.length === 4
                  ? '1fr 1fr' : '1fr 1fr',
              gap: 12,
              paddingLeft: 72 }}>
              {momento.superpoderes.map((sp, si) => (
                <div key={si} style={{
                  background: 'white',
                  border: '1px solid #E0DBD0',
                  borderTop: `3px solid ${momento.color}`,
                  borderRadius: 6,
                  padding: '18px 20px' }}>
                  <div style={{ fontSize: 13,
                    fontWeight: 700, color: navy,
                    marginBottom: 8 }}>
                    {sp.titulo}
                  </div>
                  <div style={{ fontSize: 13,
                    color: '#6A7080', lineHeight: 1.7 }}>
                    {sp.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* NIVEL 2 */}
        <div style={{ marginTop: 56, background: navy,
          borderRadius: 8, padding: '40px 48px' }}>
          <div style={{ fontSize: 9, fontWeight: 700,
            letterSpacing: 3, textTransform: 'uppercase',
            color: copper, marginBottom: 12 }}>
            Nivel 2 · La visión institucional
          </div>
          <div style={{
            fontFamily: 'Georgia, serif', fontSize: 32,
            fontWeight: 700, color: '#F8F5F0',
            lineHeight: 1.15, marginBottom: 12,
            maxWidth: 560 }}>
            De la decisión al cierre sin perder el hilo
          </div>
          <div style={{ fontSize: 14, color: '#6A8AAA',
            lineHeight: 1.75, maxWidth: 600,
            marginBottom: 32 }}>
            Un sistema que conecta el Investment Memo
            con el acta del IC, las condiciones de cierre
            con el tracker de ejecución, y el cierre con
            la notificación a LPs — sin que nada quede
            en un correo o en una nota suelta.
          </div>

          {/* 4 tabs del Nivel 2 */}
          <div style={{ display: 'grid',
            gridTemplateColumns: 'repeat(4,1fr)',
            gap: 10, marginBottom: 32 }}>
            {nivel2Tabs.map((tab, ti) => (
              <div key={ti} style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid #1E3A5A',
                borderTop: `3px solid ${tab.color}`,
                borderRadius: 6, padding: '16px 14px' }}>
                <div style={{ fontSize: 12,
                  fontWeight: 700, color: '#F8F5F0',
                  marginBottom: 8 }}>
                  {tab.titulo}
                </div>
                <div style={{ fontSize: 12,
                  color: '#6A8AAA', lineHeight: 1.6 }}>
                  {tab.desc}
                </div>
              </div>
            ))}
          </div>

          {/* Items adicionales */}
          <div style={{ display: 'grid',
            gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[
              'Generación automática del acta del IC desde las notas de la sesión',
              'Diff del SHA contra términos aprobados — detecta desviaciones automáticamente',
              'Alertas de vencimiento de condiciones previas al cierre',
              'Notificaciones a LPs en el formato requerido por cada tipo de inversionista',
              'Historial de versiones del Investment Memo con control de cambios',
              'Comparador de términos contra deals históricos del fondo',
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex', gap: 10,
                alignItems: 'flex-start' }}>
                <div style={{ width: 4, height: 4,
                  borderRadius: '50%',
                  background: copper, flexShrink: 0,
                  marginTop: 8 }} />
                <div style={{ fontSize: 13,
                  color: '#8AAABB', lineHeight: 1.6 }}>
                  {item}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default DecidirInvertirPage;
