import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";

const GestionarInvertidoPage = () => {
  const navigate = useNavigate();
  const navy = '#0A2240';
  const copper = '#B8860B';
  const cream = '#F5F2EC';

  const superpoderes = [
    {
      num: '01',
      titulo: 'Traductor Regulatorio',
      tag: 'Demo funcional',
      tagColor: copper,
      hasDemo: true,
      demoPath: '/demo/traductor-regulatorio',
      demoLabel: 'Ver demo con CREG 101 100 de 2026',
      dolor: 'Una resolución regulatoria de 80 páginas llega un viernes. El lunes hay una llamada con la compañía del portafolio. El equipo necesita entender en horas qué cambió, cómo afecta a TermoemCali o a Atlas, y qué tiene que hacer — sin leer 80 páginas de lenguaje jurídico.',
      iaItems: [
        'Traduce la resolución a lenguaje de inversión — qué cambió, cómo funciona, quién puede participar',
        'Identifica qué información interna se necesita para determinar el impacto en el portafolio',
        'Mapea oportunidades y amenazas específicas para cada activo afectado',
        'Genera el memo de consulta legal con preguntas específicas para el abogado externo',
        'Aplica automáticamente a todos los activos del portafolio simultáneamente',
      ]
    },
    {
      num: '02',
      titulo: 'Preparador de Juntas',
      tag: 'Demo funcional',
      tagColor: copper,
      hasDemo: true,
      demoPath: '/demo/preparador-juntas',
      demoLabel: 'Ver demo con junta TermoemCali',
      dolor: 'El representante de Ashmore va a 11 juntas directivas distintas. Antes de cada una necesita saber qué pasó desde la última junta, qué temas van en la agenda, qué posición tomar en cada decisión, y qué compromisos quedaron pendientes de la sesión anterior. Hoy eso toma medio día por junta.',
      iaItems: [
        'Lee el acta de la última junta y extrae los compromisos pendientes con responsables',
        'Resume el informe trimestral de la compañía en los hallazgos clave para el directivo de Ashmore',
        'Genera la posición recomendada para cada punto de la agenda',
        'Anticipa los temas que otros directivos probablemente van a plantear',
        'Genera el brief completo en el formato interno de Ashmore listo para imprimir o compartir',
      ]
    },
    {
      num: '03',
      titulo: 'Generador de Reporte LP',
      tag: 'Demo funcional',
      tagColor: copper,
      hasDemo: true,
      demoPath: '/demo/reporte-lp',
      demoLabel: 'Ver demo con reporte Fondo Andino III',
      dolor: 'Cada trimestre el equipo consolida el estado de 11 activos en reportes para múltiples LPs. CAF requiere métricas de impacto detalladas. Porvenir necesita claridad sobre el NAV y las distribuciones. BID Invest quiere KPIs ESG con comparación contra el plan. Hoy cada reporte toma días de trabajo manual.',
      iaItems: [
        'Consolida los reportes individuales de cada activo en un reporte de fondo coherente',
        'Adapta el contenido y el tono según el perfil del LP — DFI, pensiones, o institucional',
        'Genera la sección de ESG con métricas de impacto en el formato requerido por cada LP',
        'Identifica los eventos materiales del trimestre que deben mencionarse explícitamente',
        'Mantiene consistencia con los reportes anteriores — mismo formato, misma estructura',
      ]
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
            fontFamily: 'Inter, sans-serif' }}>
          ← Volver al mapa
        </button>

        {/* HERO */}
        <div style={{ display: 'inline-flex',
          alignItems: 'center', gap: 8, fontSize: 10,
          fontWeight: 700, letterSpacing: 3,
          textTransform: 'uppercase', color: copper,
          marginBottom: 16 }}>
          <div style={{ width: 6, height: 6,
            background: copper,
            borderRadius: '50%' }} />
          Journey · 05
        </div>
        <div style={{ fontFamily: 'Georgia, serif',
          fontSize: 52, fontWeight: 700, color: navy,
          lineHeight: 1.05, marginBottom: 20,
          letterSpacing: -1 }}>
          Gestionar lo Invertido
        </div>
        <div style={{ fontSize: 16, color: '#5A6070',
          lineHeight: 1.7, maxWidth: 680,
          marginBottom: 16 }}>
          La inversión se cierra y empieza el trabajo
          real — 10 a 15 años de asset management
          activo sobre 11+ proyectos simultáneos.
          Juntas directivas, regulaciones que cambian,
          reportes trimestrales a LPs, eventos
          operativos, compromisos ESG.
        </div>
        <div style={{ fontSize: 15, color: '#5A6070',
          lineHeight: 1.7, maxWidth: 680,
          marginBottom: 48, paddingBottom: 40,
          borderBottom: '1px solid #E0DBD0' }}>
          El equipo de asset management de Ashmore
          gestiona más información por activo que
          cualquier otra etapa del ciclo. La IA no
          gestiona los activos — libera al equipo
          de la carga documental para que pueda
          enfocarse en las decisiones que importan.
        </div>

        {/* RETO HOY */}
        <div style={{ marginBottom: 56 }}>
          <div style={{ fontSize: 10, fontWeight: 700,
            letterSpacing: 3, textTransform: 'uppercase',
            color: copper, marginBottom: 24 }}>
            — El reto hoy
          </div>
          <div style={{ display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: 12 }}>
            {[
              { num: '11+', titulo: 'Activos simultáneos',
                desc: 'Cada uno con su junta, sus reguladores, sus reportes, y sus eventos operativos. El equipo de asset management de Ashmore los gestiona todos al mismo tiempo.' },
              { num: '4×', titulo: 'Reportes trimestrales',
                desc: 'Por año, por LP, por fondo. CAF, BID, Porvenir, Skandia, Protección — cada uno con requerimientos distintos de formato, métricas e idioma.' },
              { num: '80+', titulo: 'Páginas por resolución',
                desc: 'El promedio de una resolución regulatoria de la CREG o la ANI. Llegan varios al mes. Alguien tiene que leerlas, entenderlas, y decidir si hay algo que hacer.' },
            ].map((item, i) => (
              <div key={i} style={{ background: 'white',
                border: '1px solid #E0DBD0',
                borderTop: `3px solid ${navy}`,
                borderRadius: 6,
                padding: '24px 20px' }}>
                <div style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: 48, fontWeight: 700,
                  color: copper, lineHeight: 1,
                  marginBottom: 8 }}>{item.num}</div>
                <div style={{ fontSize: 14,
                  fontWeight: 700, color: navy,
                  marginBottom: 8 }}>{item.titulo}</div>
                <div style={{ fontSize: 13,
                  color: '#6A7080',
                  lineHeight: 1.65 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* SUPERPODERES */}
        <div style={{ marginBottom: 56 }}>
          <div style={{ fontSize: 10, fontWeight: 700,
            letterSpacing: 3, textTransform: 'uppercase',
            color: copper, marginBottom: 32 }}>
            — Los superpoderes de esta caja
          </div>

          {superpoderes.map((sp, idx) => (
            <div key={sp.num} style={{
              padding: '36px 0',
              borderTop: '1px solid #E0DBD0',
              borderBottom: idx === superpoderes.length - 1
                ? '1px solid #E0DBD0' : 'none',
            }}>
              <div style={{ display: 'flex',
                gap: 32, alignItems: 'flex-start' }}>

                {/* Número */}
                <div style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: 48, fontWeight: 700,
                  color: '#E8E4DC', lineHeight: 1,
                  flexShrink: 0, width: 64,
                  paddingTop: 4 }}>
                  {sp.num}
                </div>

                {/* Contenido */}
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex',
                    alignItems: 'center', gap: 12,
                    marginBottom: 12 }}>
                    <div style={{
                      fontFamily: 'Georgia, serif',
                      fontSize: 26, fontWeight: 700,
                      color: navy }}>
                      {sp.titulo}
                    </div>
                    <div style={{ fontSize: 9,
                      fontWeight: 700, letterSpacing: 2,
                      textTransform: 'uppercase',
                      color: sp.tagColor,
                      border: `1px solid ${sp.tagColor}`,
                      padding: '3px 10px',
                      borderRadius: 2 }}>
                      {sp.tag}
                    </div>
                  </div>

                  {/* Dolor */}
                  <div style={{ fontSize: 14,
                    color: '#5A6070', lineHeight: 1.7,
                    marginBottom: 16, paddingBottom: 16,
                    borderBottom: '1px solid #F0EDE6' }}>
                    {sp.dolor}
                  </div>

                  {/* IA puede hacer */}
                  <div style={{ fontSize: 10,
                    fontWeight: 700, letterSpacing: 2,
                    textTransform: 'uppercase',
                    color: copper, marginBottom: 12 }}>
                    Lo que la IA puede hacer
                  </div>
                  <div style={{ display: 'flex',
                    flexDirection: 'column', gap: 8,
                    marginBottom: 20 }}>
                    {sp.iaItems.map((item, i) => (
                      <div key={i} style={{
                        display: 'flex', gap: 10,
                        alignItems: 'flex-start' }}>
                        <div style={{ width: 4,
                          height: 4, borderRadius: '50%',
                          background: copper,
                          flexShrink: 0, marginTop: 8 }} />
                        <div style={{ fontSize: 14,
                          color: '#444',
                          lineHeight: 1.65 }}>{item}</div>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <button
                    onClick={() => navigate(sp.demoPath)}
                    style={{ padding: '11px 28px',
                      background: navy, border: 'none',
                      borderRadius: 4, fontSize: 13,
                      fontWeight: 700, color: '#F8F5F0',
                      cursor: 'pointer',
                      fontFamily: 'Inter, sans-serif',
                      display: 'inline-flex',
                      alignItems: 'center', gap: 8 }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background =
                        '#143050';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background =
                        navy;
                    }}>
                    {sp.demoLabel} →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* NIVEL 2 */}
        <div style={{ background: navy,
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
            Centro de Control del Portafolio
          </div>
          <div style={{ fontSize: 14, color: '#6A8AAA',
            lineHeight: 1.75, maxWidth: 600,
            marginBottom: 32 }}>
            Un sistema que centraliza la información de
            los 11+ activos del portafolio — regulaciones,
            juntas, KPIs operativos, ESG, y reportes —
            con alertas automáticas y generación de
            documentos desde una sola plataforma.
          </div>
          <div style={{ display: 'grid',
            gridTemplateColumns: 'repeat(5,1fr)',
            gap: 10, marginBottom: 28 }}>
            {[
              { titulo: 'Dashboard', color: '#B8860B',
                desc: 'Estado de los 11 activos con semáforos, alertas y próximas juntas' },
              { titulo: 'Activos', color: '#86EFAC',
                desc: 'Ficha de cada activo con KPIs financieros, operativos y ESG' },
              { titulo: 'Regulatorio', color: '#93C5FD',
                desc: 'Resoluciones recibidas, análisis de impacto por activo' },
              { titulo: 'Juntas', color: '#FCD34D',
                desc: 'Próximas juntas, briefs generados, compromisos pendientes' },
              { titulo: 'Reporting LP', color: '#F9A8D4',
                desc: 'Reportes trimestrales por fondo y LP, historial' },
            ].map((tab, ti) => (
              <div key={ti} style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid #1E3A5A',
                borderTop: `3px solid ${tab.color}`,
                borderRadius: 6,
                padding: '14px 12px' }}>
                <div style={{ fontSize: 12,
                  fontWeight: 700, color: '#F8F5F0',
                  marginBottom: 6 }}>{tab.titulo}</div>
                <div style={{ fontSize: 11,
                  color: '#6A8AAA',
                  lineHeight: 1.6 }}>{tab.desc}</div>
              </div>
            ))}
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

export default GestionarInvertidoPage;
