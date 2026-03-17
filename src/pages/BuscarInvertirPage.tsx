import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";

const BuscarInvertirPage = () => {
  const navigate = useNavigate();
  const navy = '#0A2240';
  const copper = '#B8860B';
  const cream = '#F5F2EC';

  const superpoderes = [
    {
      num: '01',
      titulo: 'Traductor de Mandato',
      desc: 'El reglamento del fondo es un documento legal de 80 páginas. La IA lo convierte en criterios operativos de búsqueda: qué sectores exactamente, qué perfil de activo, qué tamaño de ticket, qué restricciones geográficas, qué exclusiones. El equipo sale con una lista de verificación accionable en vez de un documento legal que nadie relee.'
    },
    {
      num: '02',
      titulo: 'Radar de Oportunidades',
      desc: 'Monitoreo continuo de fuentes públicas — ANI, UPME, SECOP, planes de desarrollo nacionales, publicaciones de BID y CAF, noticias del sector — filtrado automáticamente contra los parámetros del fondo. Cuando aparece algo que calza, el equipo lo sabe antes que la competencia.'
    },
    {
      num: '03',
      titulo: 'Investigador de Activos',
      desc: 'Dado el nombre de un proyecto o empresa, la IA construye en minutos un dossier con toda la información pública disponible: accionistas, historial, licencias ambientales en ANLA, contratos en SECOP, información financiera en Supersociedades, noticias, red flags. Lo que hoy toma días de un analista.'
    },
    {
      num: '04',
      titulo: 'Validador de Disponibilidad',
      desc: 'Antes de invertir recursos de due diligence, hay que saber si el activo está realmente disponible. La IA identifica señales públicas: ¿hay un proceso de venta activo? ¿Una licitación con cronograma? ¿Quién más podría estar mirando? ¿Hay condiciones previas que determinen si es invertible en el horizonte del fondo?'
    },
    {
      num: '05',
      titulo: 'Generador de Screening Memo',
      desc: 'Con la investigación preliminar lista, la IA genera el borrador del Investment Screening Memo en el formato estándar del fondo: descripción del activo, alineación con el mandato, estimación back-of-the-envelope de retorno, riesgos a primera vista, y recomendación de avanzar o no. El equipo revisa y ajusta en vez de escribir desde cero.'
    },
  ];

  const nivel2Items = [
    'Base de datos de oportunidades investigadas — dossiers indexados y reutilizables',
    'Scoring automático de cada oportunidad contra los parámetros del vehículo activo',
    'Monitor de licitaciones con alertas en tiempo real por geografía y sector',
    'Mapa competitivo actualizado: quién está mirando qué en el mercado',
    'Generación automática de Screening Memos desde los dossiers de investigación',
    'Dashboard de pipeline: oportunidades por etapa, geografía, sector y fondo',
    'Historial de oportunidades descartadas con razones — para no investigar lo mismo dos veces',
  ];

  return (
    <div style={{ background: cream, minHeight: '100vh',
      fontFamily: 'Inter, sans-serif' }}>
      <Header />
      <div style={{ maxWidth: 960, margin: '0 auto',
        padding: '48px 64px 80px' }}>

        {/* BACK */}
        <button
          onClick={() => navigate('/')}
          style={{ fontSize: 13, color: '#8A8880', cursor: 'pointer',
            marginBottom: 40, background: 'none', border: 'none',
            padding: 0, display: 'inline-flex', alignItems: 'center',
            gap: 6, fontFamily: 'Inter, sans-serif' }}
        >← Volver al mapa</button>

        {/* HERO */}
        <div style={{ display: 'inline-flex', alignItems: 'center',
          gap: 8, fontSize: 10, fontWeight: 700, letterSpacing: 3,
          textTransform: 'uppercase', color: copper, marginBottom: 16 }}>
          <div style={{ width: 6, height: 6, background: copper,
            borderRadius: '50%' }} />
          Journey · 02
        </div>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: 52,
          fontWeight: 700, color: navy, lineHeight: 1.05,
          marginBottom: 20, letterSpacing: -1 }}>
          Buscar dónde<br />Invertir
        </div>
        <div style={{ fontSize: 16, color: '#5A6070', lineHeight: 1.7,
          maxWidth: 680, marginBottom: 48, paddingBottom: 40,
          borderBottom: '1px solid #E0DBD0' }}>
          El Fondo Andino III tiene USD 420M para desplegar en
          infraestructura climática y social en 6 países. Encontrar
          los activos correctos — antes que la competencia, dentro
          del mandato, con la disponibilidad confirmada — es un
          proceso intensivo en tiempo e información. La IA no
          reemplaza el juicio del equipo. Sí comprime semanas
          de investigación a horas.
        </div>

        {/* EL RETO HOY */}
        <div style={{ marginBottom: 56 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3,
            textTransform: 'uppercase', color: copper, marginBottom: 24 }}>
            — El reto hoy
          </div>
          <div style={{ display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
            {[
              { num: '01', titulo: 'El mandato es amplio', desc: 'El reglamento define la cancha en términos legales. Traducirlo a criterios operativos de búsqueda — qué buscar exactamente y dónde — requiere interpretación y experiencia.' },
              { num: '02', titulo: 'El deal flow es disperso', desc: 'Las oportunidades llegan por múltiples canales: licitaciones públicas, red de contactos, banqueros, DFIs, noticias del sector. Sin un sistema, las señales se pierden o llegan tarde.' },
              { num: '03', titulo: 'La investigación toma días', desc: 'Antes de recomendar avanzar a DD, hay que saber quién está detrás del activo, si está realmente disponible, y si hay red flags. Hoy eso toma tiempo de analistas senior.' },
            ].map((item, i) => (
              <div key={i} style={{ background: 'white',
                border: '1px solid #E0DBD0',
                borderTop: `3px solid ${navy}`,
                borderRadius: 6, padding: '24px 20px' }}>
                <div style={{ fontFamily: 'Georgia, serif', fontSize: 36,
                  fontWeight: 700, color: '#E8E4DC', lineHeight: 1,
                  marginBottom: 12 }}>{item.num}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: navy,
                  marginBottom: 8 }}>{item.titulo}</div>
                <div style={{ fontSize: 13, color: '#6A7080',
                  lineHeight: 1.65 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* SUPERPODERES */}
        <div style={{ marginBottom: 56 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3,
            textTransform: 'uppercase', color: copper, marginBottom: 8 }}>
            — Lo que la IA puede hacer en este proceso
          </div>
          <div style={{ fontSize: 15, color: '#5A6070', lineHeight: 1.7,
            maxWidth: 640, marginBottom: 28 }}>
            Cinco capacidades que transforman cómo el equipo construye
            y gestiona el pipeline de oportunidades.
          </div>

          {superpoderes.map((sp, idx) => (
            <div key={sp.num} style={{
              display: 'flex', gap: 28,
              padding: '28px 0',
              borderTop: idx === 0 ? '1px solid #E0DBD0' : 'none',
              borderBottom: '1px solid #E0DBD0',
            }}>
              <div style={{ fontFamily: 'Georgia, serif', fontSize: 40,
                fontWeight: 700, color: '#E8E4DC', lineHeight: 1,
                flexShrink: 0, width: 56, paddingTop: 4 }}>
                {sp.num}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: navy,
                  marginBottom: 10 }}>{sp.titulo}</div>
                <div style={{ fontSize: 14, color: '#5A6070',
                  lineHeight: 1.75 }}>{sp.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* NIVEL 2 */}
        <div style={{ background: navy, borderRadius: 8,
          padding: '40px 48px' }}>
          <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3,
            textTransform: 'uppercase', color: copper, marginBottom: 12 }}>
            Nivel 2 · La visión institucional
          </div>
          <div style={{ fontFamily: 'Georgia, serif', fontSize: 32,
            fontWeight: 700, color: '#F8F5F0', lineHeight: 1.15,
            marginBottom: 12, maxWidth: 560 }}>
            De la búsqueda reactiva al pipeline proactivo
          </div>
          <div style={{ fontSize: 14, color: '#6A8AAA', lineHeight: 1.75,
            maxWidth: 600, marginBottom: 32 }}>
            Un sistema integrado de gestión de pipeline que convierte
            el sourcing de oportunidades de reactivo a proactivo —
            monitoreando el mercado automáticamente, construyendo el
            funnel, y priorizando el deal flow para que el equipo
            enfoque su tiempo en las oportunidades que realmente
            importan.
          </div>
          <div style={{ display: 'grid',
            gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {nivel2Items.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 10,
                alignItems: 'flex-start' }}>
                <div style={{ width: 4, height: 4, borderRadius: '50%',
                  background: copper, flexShrink: 0, marginTop: 8 }} />
                <div style={{ fontSize: 13, color: '#8AAABB',
                  lineHeight: 1.6 }}>{item}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default BuscarInvertirPage;
