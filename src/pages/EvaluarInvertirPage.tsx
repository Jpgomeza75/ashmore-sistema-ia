import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";

const EvaluarInvertirPage = () => {
  const navigate = useNavigate();
  const navy = '#0A2240';
  const copper = '#B8860B';
  const cream = '#F5F2EC';

  const frentes = [
    {
      num: '01',
      titulo: 'Financiero',
      tag: 'Add-in Claude en Excel',
      tagColor: copper,
      hasDemo: true,
      demoPath: '/demo/dd-financiero',
      dolor: 'El modelo financiero del target es una caja negra. Reciben un Excel de 15 tabs con miles de filas de supuestos enterrados en fórmulas. Encontrar los supuestos críticos, validarlos contra benchmarks del sector, y entender si la TIR es real o está inflada toma días de un analista senior.',
      iaItems: [
        'Extrae y mapea automáticamente los supuestos críticos del modelo',
        'Califica cada supuesto contra benchmarks de infraestructura PE en LatAm',
        'Identifica inconsistencias internas, errores de fórmula y valores hardcodeados',
        'Genera tablas de sensibilidad cruzando los supuestos más críticos',
        'Traduce los outputs del modelo a narrativa ejecutiva lista para el IC',
      ]
    },
    {
      num: '02',
      titulo: 'Técnico',
      tag: 'Análisis de documentos',
      tagColor: '#6A8AAA',
      hasDemo: false,
      demoPath: null,
      dolor: 'Los informes de interventoría, estudios de ingeniería y diagnósticos del estado del activo son documentos técnicos densos de 100+ páginas. El equipo necesita extraer los hallazgos críticos rápido — antes de decidir si contratar asesores técnicos externos.',
      iaItems: [
        'Resume informes técnicos densos en hallazgos ejecutivos accionables',
        'Identifica desviaciones del plan original de construcción u operación',
        'Extrae indicadores clave de desempeño técnico y los compara contra estándares del sector',
        'Genera la lista de preguntas técnicas para el due diligence con los asesores externos',
        'Identifica red flags técnicos que podrían afectar la valoración o la estructura del deal',
      ]
    },
    {
      num: '03',
      titulo: 'Legal',
      tag: 'Revisión de contratos',
      tagColor: '#6A8AAA',
      hasDemo: false,
      demoPath: null,
      dolor: 'Los contratos de concesión, PPAs, acuerdos de accionistas y licencias son documentos legales complejos. El equipo necesita entender rápido los términos clave antes de que el abogado externo haga la revisión formal — y saber qué preguntar.',
      iaItems: [
        'Extrae los términos clave de contratos: plazo, precio, indexación, causales de terminación',
        'Identifica cláusulas que podrían afectar la estructura del deal o la salida',
        'Compara los términos del contrato contra los supuestos del modelo financiero',
        'Genera el memo de consulta legal con preguntas específicas para el abogado externo',
        'Detecta inconsistencias entre contratos relacionados',
      ]
    },
    {
      num: '04',
      titulo: 'ESG',
      tag: 'Estándares IFC',
      tagColor: '#6A8AAA',
      hasDemo: false,
      demoPath: null,
      dolor: 'Cada inversión del Fondo Andino III debe cumplir los IFC Performance Standards (PS 1-8). Evaluar un activo contra estos estándares — identificar los riesgos ambientales y sociales, definir el ESAP — requiere experiencia específica y tiempo.',
      iaItems: [
        'Evalúa el activo contra los 8 Performance Standards del IFC',
        'Identifica brechas entre el estado actual y los requisitos IFC',
        'Genera el borrador del Environmental and Social Action Plan (ESAP)',
        'Mapea los riesgos ambientales y sociales por categoría y severidad',
        'Identifica requisitos de consulta comunitaria o con comunidades indígenas',
      ]
    },
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
          Journey · 03
        </div>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: 52,
          fontWeight: 700, color: navy, lineHeight: 1.05,
          marginBottom: 20, letterSpacing: -1 }}>
          Evaluar si Invertir
        </div>
        <div style={{ fontSize: 16, color: '#5A6070', lineHeight: 1.7,
          maxWidth: 680, marginBottom: 16, }}>
          El due diligence formal empieza cuando el Screening Memo
          obtiene el "go". Se abre el data room, se contratan asesores
          externos, se visita el activo en terreno. El DD de
          infraestructura PE tiene cuatro frentes simultáneos —
          cada uno intensivo en documentos, análisis y criterio.
        </div>
        <div style={{ fontSize: 15, color: '#5A6070', lineHeight: 1.7,
          maxWidth: 680, marginBottom: 48, paddingBottom: 40,
          borderBottom: '1px solid #E0DBD0' }}>
          La IA no reemplaza a los asesores técnicos, legales o
          financieros. Sí permite que el equipo de Ashmore llegue
          a cada conversación con criterio propio — habiendo leído,
          procesado y cuestionado el material antes que nadie.
        </div>

        {/* 4 FRENTES */}
        <div style={{ marginBottom: 56 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3,
            textTransform: 'uppercase', color: copper, marginBottom: 32 }}>
            — Los 4 frentes del DD y cómo la IA ayuda en cada uno
          </div>

          {frentes.map((frente, idx) => (
            <div key={frente.num} style={{
              marginBottom: 0,
              padding: '36px 0',
              borderTop: idx === 0 ? '1px solid #E0DBD0' : 'none',
              borderBottom: '1px solid #E0DBD0',
            }}>
              <div style={{ display: 'flex', gap: 32,
                alignItems: 'flex-start' }}>

                {/* Número */}
                <div style={{ fontFamily: 'Georgia, serif', fontSize: 48,
                  fontWeight: 700, color: '#E8E4DC', lineHeight: 1,
                  flexShrink: 0, width: 64, paddingTop: 4 }}>
                  {frente.num}
                </div>

                {/* Contenido */}
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center',
                    gap: 12, marginBottom: 12 }}>
                    <div style={{ fontFamily: 'Georgia, serif',
                      fontSize: 26, fontWeight: 700, color: navy }}>
                      {frente.titulo}
                    </div>
                    <div style={{ fontSize: 9, fontWeight: 700,
                      letterSpacing: 2, textTransform: 'uppercase',
                      color: frente.tagColor,
                      border: `1px solid ${frente.tagColor}`,
                      padding: '3px 10px', borderRadius: 2 }}>
                      {frente.tag}
                    </div>
                  </div>

                  {/* Dolor */}
                  <div style={{ fontSize: 14, color: '#5A6070',
                    lineHeight: 1.7, marginBottom: 16,
                    paddingBottom: 16,
                    borderBottom: '1px solid #F0EDE6' }}>
                    {frente.dolor}
                  </div>

                  {/* IA puede hacer */}
                  <div style={{ fontSize: 10, fontWeight: 700,
                    letterSpacing: 2, textTransform: 'uppercase',
                    color: copper, marginBottom: 12 }}>
                    Lo que la IA puede hacer
                  </div>
                  <div style={{ display: 'flex',
                    flexDirection: 'column', gap: 8,
                    marginBottom: frente.hasDemo ? 20 : 0 }}>
                    {frente.iaItems.map((item, i) => (
                      <div key={i} style={{ display: 'flex',
                        gap: 10, alignItems: 'flex-start' }}>
                        <div style={{ width: 4, height: 4,
                          borderRadius: '50%', background: copper,
                          flexShrink: 0, marginTop: 8 }} />
                        <div style={{ fontSize: 14, color: '#444',
                          lineHeight: 1.65 }}>{item}</div>
                      </div>
                    ))}
                  </div>

                  {/* CTA solo para financiero */}
                  {frente.hasDemo && (
                    <button
                      onClick={() => navigate(frente.demoPath!)}
                      style={{ marginTop: 8, padding: '11px 28px',
                        background: navy, border: 'none',
                        borderRadius: 4, fontSize: 13,
                        fontWeight: 700, color: '#F8F5F0',
                        cursor: 'pointer',
                        fontFamily: 'Inter, sans-serif',
                        display: 'inline-flex',
                        alignItems: 'center', gap: 8 }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = '#143050';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = navy;
                      }}
                    >
                      Ver prompt para el add-in de Excel →
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* NIVEL 2 */}
        <div style={{ background: navy, borderRadius: 8,
          padding: '40px 48px' }}>
          <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3,
            textTransform: 'uppercase', color: copper,
            marginBottom: 12 }}>
            Nivel 2 · La visión institucional
          </div>
          <div style={{ fontFamily: 'Georgia, serif', fontSize: 32,
            fontWeight: 700, color: '#F8F5F0', lineHeight: 1.15,
            marginBottom: 12, maxWidth: 560 }}>
            Un centro de control del due diligence
          </div>
          <div style={{ fontSize: 14, color: '#6A8AAA',
            lineHeight: 1.75, maxWidth: 600, marginBottom: 28 }}>
            Todos los documentos del data room indexados y
            disponibles para búsqueda semántica. El modelo financiero
            analizado automáticamente cuando llega. Los hallazgos de
            los 4 frentes consolidados en un dashboard de DD.
            El Investment Memo generado desde los hallazgos del proceso.
          </div>
          <div style={{ display: 'grid',
            gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[
              'Ingesta automática de documentos del data room con indexación semántica',
              'Análisis financiero automático al recibir el modelo del target',
              'Dashboard de DD: estado de cada frente, hallazgos, pendientes',
              'Tracker de preguntas al vendedor y respuestas recibidas',
              'Generador del Investment Memo desde los hallazgos del DD',
              'Comparador de supuestos contra base de datos de deals anteriores',
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 10,
                alignItems: 'flex-start' }}>
                <div style={{ width: 4, height: 4, borderRadius: '50%',
                  background: copper, flexShrink: 0, marginTop: 8 }} />
                <div style={{ fontSize: 13, color: '#8AAABB',
                  lineHeight: 1.6 }}>{item}</div>
              </div>
            ))}
          </div>
          <button
            onClick={() => navigate('/demo/nivel2-dd')}
            style={{ marginTop: 28, padding: '14px 32px',
              border: `1.5px solid ${copper}`, borderRadius: 4,
              fontSize: 13, fontWeight: 700, letterSpacing: 2,
              color: copper, background: 'transparent',
              cursor: 'pointer', textTransform: 'uppercase',
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

export default EvaluarInvertirPage;
