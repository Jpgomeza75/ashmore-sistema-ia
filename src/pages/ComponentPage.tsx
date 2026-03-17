import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { getComponentById } from "@/data/components";
import BuscarInvertirPage from "@/pages/BuscarInvertirPage";

const LevantatCapitalPage = () => {
  const navigate = useNavigate();

  const s = {
    page: {
      background: '#F5F2EC' as const,
      minHeight: '100vh',
      fontFamily: 'Inter, sans-serif',
    } as React.CSSProperties,
    container: {
      maxWidth: 1400,
      margin: '0 auto',
      padding: '48px 64px 80px',
    } as React.CSSProperties,
    hero: {
      marginBottom: 56,
      paddingBottom: 48,
      borderBottom: '1px solid #E0DBD0',
    } as React.CSSProperties,
    heroTag: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: 3,
      textTransform: 'uppercase' as const,
      color: '#B8860B',
      marginBottom: 20,
    } as React.CSSProperties,
    heroTagDot: {
      width: 6, height: 6,
      background: '#B8860B',
      borderRadius: '50%',
    } as React.CSSProperties,
    heroTitle: {
      fontFamily: 'Georgia, serif',
      fontSize: 96,
      fontWeight: 700,
      color: '#0A2240',
      lineHeight: 1.05,
      marginBottom: 20,
      letterSpacing: -3,
    } as React.CSSProperties,
    heroDesc: {
      fontSize: 20,
      color: '#5A6070',
      lineHeight: 1.8,
      maxWidth: 800,
    } as React.CSSProperties,
    sectionLabel: {
      fontSize: 12,
      fontWeight: 700,
      letterSpacing: 4,
      textTransform: 'uppercase' as const,
      color: '#B8860B',
      marginBottom: 32,
    } as React.CSSProperties,
    backBtn: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      fontSize: 14,
      color: '#8A8880',
      cursor: 'pointer',
      marginBottom: 48,
      background: 'none',
      border: 'none',
      padding: 0,
      fontFamily: 'Inter, sans-serif',
    } as React.CSSProperties,
  };

  const problems = [
    {
      num: '01',
      title: 'DDQs que toman semanas',
      text: 'Cada LP manda 100–300 preguntas. Muchas se repiten entre fondos con formulaciones distintas. El equipo redacta desde cero cada vez.'
    },
    {
      num: '02',
      title: 'Tesis que se reescribe cada vez',
      text: 'La narrativa del fondo necesita adaptarse a cada LP — su perfil, sus prioridades, su regulación. Hoy ese proceso es completamente manual.'
    },
    {
      num: '03',
      title: 'Objeciones sin anticipar',
      text: 'Cada reunión con un LP tiene sus propias preguntas difíciles. El equipo llega preparado para las de la última reunión, no para las de la siguiente.'
    }
  ];

  const superpowers = [
    {
      num: '1',
      tag: 'Demo funcional',
      title: 'Respondedor de DDQs',
      desc: 'Adjunta el DDQ de cualquier LP y obtén un borrador completo en minutos — con respuestas clasificadas por completitud y una lista de lo que falta internamente.',
      hasDemo: true,
      demoId: 'ddq-respondedor'
    },
    {
      num: '2',
      tag: 'Prompt listo',
      title: 'Constructor de Tesis de Inversión',
      desc: 'Genera la narrativa de la tesis del Fondo III ajustada al perfil de cada LP — en inglés o español, con el énfasis correcto para cada audiencia.',
      hasDemo: false,
      demoId: 'tesis-inversion'
    },
    {
      num: '3',
      tag: 'Prompt listo',
      title: 'Briefing de LP',
      desc: 'Entra a cada reunión sabiendo exactamente qué va a preguntar el LP, cómo responderlo con datos de Ashmore, y qué no decir.',
      hasDemo: false,
      demoId: 'briefing-lp'
    }
  ];

  const n2features = [
    'Base de conocimiento de DDQs indexada por pregunta',
    'Perfiles de LPs con historial de interacciones y preferencias',
    'Alertas automáticas cuando cambia info del fondo',
    'Generador de materiales conectado a la misma fuente de datos',
  ];

  return (
    <div style={s.page}>
      <Header />
      <div style={s.container}>

        {/* BACK */}
        <button style={s.backBtn} onClick={() => navigate('/')}>
          ← Volver al mapa
        </button>

        {/* HERO */}
        <div style={s.hero}>
          <div style={s.heroTag}>
            <div style={s.heroTagDot} />
            Journey · 01
          </div>
          <div style={s.heroTitle}>
            Levantar<br />el Capital
          </div>
          <div style={s.heroDesc}>
            Ashmore acaba de cerrar el Fondo Andino III con USD 420M —
            sobredemandado. Pero cada cierre requiere meses de trabajo intensivo:
            materiales, DDQs, roadshows, negociaciones. La IA puede comprimir
            ese tiempo dramáticamente.
          </div>
        </div>

        {/* EL RETO */}
        <div style={{ marginBottom: 56 }}>
          <div style={s.sectionLabel}>— El reto hoy</div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: 16
          }}>
            {problems.map(p => (
              <div key={p.num} style={{
                background: 'white',
                border: '1px solid #E0DBD0',
                borderTop: '3px solid #0A2240',
                borderRadius: 6,
                padding: 24,
              }}>
                <div style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: 72,
                  fontWeight: 700,
                  color: '#E8E4DC',
                  lineHeight: 1,
                  marginBottom: 12,
                }}>{p.num}</div>
                <div style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: '#0A2240',
                  marginBottom: 8,
                }}>{p.title}</div>
                <div style={{
                  fontSize: 15,
                  color: '#6A7080',
                  lineHeight: 1.7,
                }}>{p.text}</div>
              </div>
            ))}
          </div>
        </div>

        {/* SUPERPODERES */}
        <div style={{ marginBottom: 56 }}>
          <div style={s.sectionLabel}>— Nivel 1 · Lo que puedes hacer hoy</div>
          {superpowers.map((sp, idx) => (
            <div
              key={sp.num}
              onClick={() => navigate(`/demo/${sp.demoId}`)}
              style={{
                display: 'flex',
                gap: 24,
                padding: '36px 0',
                borderTop: idx === 0 ? '1px solid #E0DBD0' : 'none',
                borderBottom: '1px solid #E0DBD0',
                cursor: 'pointer',
                transition: 'padding-left 0.15s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.paddingLeft = '8px';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.paddingLeft = '0px';
              }}
            >
              <div style={{
                fontFamily: 'Georgia, serif',
                fontSize: 56,
                fontWeight: 700,
                color: '#E8E4DC',
                lineHeight: 1,
                flexShrink: 0,
                width: 48,
              }}>{sp.num}</div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: 3,
                  textTransform: 'uppercase',
                  color: '#B8860B',
                  marginBottom: 6,
                }}>{sp.tag}</div>
                <div style={{
                  fontSize: 28,
                  fontWeight: 700,
                  color: '#0A2240',
                  marginBottom: 6,
                }}>{sp.title}</div>
                <div style={{
                  fontSize: 16,
                  color: '#6A7080',
                  lineHeight: 1.7,
                }}>{sp.desc}</div>
              </div>
              <div style={{
                fontSize: 20,
                color: '#D0CCC4',
                alignSelf: 'center',
                flexShrink: 0,
                transition: 'all 0.15s',
              }}>→</div>
            </div>
          ))}
        </div>

        {/* NIVEL 2 */}
        <div style={{
          background: '#0A2240',
          borderRadius: 8,
          padding: 56,
          display: 'flex',
          gap: 40,
          alignItems: 'flex-start',
        }}>
          <div style={{ flex: 1 }}>
            <div style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 3,
              textTransform: 'uppercase',
              color: '#B8860B',
              marginBottom: 16,
            }}>Nivel 2 · La visión institucional</div>
            <div style={{
              fontFamily: 'Georgia, serif',
              fontSize: 40,
              fontWeight: 700,
              color: '#F8F5F0',
              lineHeight: 1.2,
              marginBottom: 16,
            }}>Un sistema que aprende de cada interacción con LPs</div>
            <div style={{
              fontSize: 16,
              color: '#6A8AAA',
              lineHeight: 1.8,
              marginBottom: 24,
            }}>
              Cuando llega un DDQ nuevo, el sistema pre-llena el 80%
              automáticamente cruzando contra respuestas históricas. Cada
              reunión alimenta el perfil del LP. Cada cambio en el fondo
              actualiza todos los materiales.
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {n2features.map((f, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'flex-start', gap: 10,
                  fontSize: 15, color: '#8AAABB',
                }}>
                  <div style={{
                    width: 4, height: 4,
                    background: '#B8860B', borderRadius: '50%',
                    marginTop: 7, flexShrink: 0,
                  }} />
                  {f}
                </div>
              ))}
            </div>
            <button
              onClick={() => navigate('/demo/nivel2-fundraising')}
              style={{
                marginTop: 28,
                padding: '14px 32px',
                border: '1.5px solid #B8860B',
                borderRadius: 4,
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: 2,
                color: '#B8860B',
                background: 'transparent',
                cursor: 'pointer',
                textTransform: 'uppercase',
                fontFamily: 'Inter, sans-serif',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#B8860B';
                e.currentTarget.style.color = '#0A2240';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#B8860B';
              }}
            >
              Ver el sistema →
            </button>
          </div>

          {/* MOCKUP */}
          <div style={{
            flex: '0 0 320px',
            background: '#143050',
            borderRadius: 6,
            border: '1px solid #1E3A5A',
            overflow: 'hidden',
          }}>
            <div style={{
              background: '#0D2540',
              padding: '10px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              borderBottom: '1px solid #1E3A5A',
            }}>
              {['#B8860B', '#1E3A5A', '#1E3A5A'].map((c, i) => (
                <div key={i} style={{
                  width: 7, height: 7, borderRadius: '50%', background: c
                }} />
              ))}
              <span style={{
                fontSize: 9, color: '#4A6A8A', marginLeft: 6
              }}>DDQ Dashboard</span>
            </div>
            <div style={{ padding: 14 }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 6, marginBottom: 10
              }}>
                {[
                  { label: 'DDQs activos', value: '8', sub: '↑ 3 esta semana' },
                  { label: 'Completitud', value: '73%', sub: '↑ vs. 45% antes' }
                ].map((stat, i) => (
                  <div key={i} style={{
                    background: '#0A2240',
                    borderRadius: 4, padding: '10px 12px'
                  }}>
                    <div style={{
                      fontSize: 7, color: '#4A6A8A',
                      letterSpacing: 1, textTransform: 'uppercase',
                      marginBottom: 4
                    }}>{stat.label}</div>
                    <div style={{
                      fontSize: 20, fontWeight: 700,
                      color: '#F8F5F0',
                      fontFamily: 'Georgia, serif'
                    }}>{stat.value}</div>
                    <div style={{
                      fontSize: 8, color: '#B8860B', marginTop: 2
                    }}>{stat.sub}</div>
                  </div>
                ))}
              </div>
              <div style={{
                fontSize: 7, color: '#4A6A8A',
                letterSpacing: 1, marginBottom: 6,
                textTransform: 'uppercase'
              }}>Progreso por LP</div>
              {[
                { label: 'CAF — Fondo III', pct: 87 },
                { label: 'SIFEM — Fondo III', pct: 62 },
                { label: 'Porvenir — Fondo III', pct: 34 },
              ].map((bar, i) => (
                <div key={i} style={{ marginBottom: 8 }}>
                  <div style={{
                    fontSize: 8, color: '#6A8AAA', marginBottom: 3
                  }}>{bar.label}</div>
                  <div style={{
                    height: 4, background: '#1E3A5A',
                    borderRadius: 2, overflow: 'hidden'
                  }}>
                    <div style={{
                      height: '100%',
                      width: bar.pct + '%',
                      background: bar.pct > 50 ? '#B8860B' : '#4A6A8A',
                      borderRadius: 2
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

const ComponentPage = () => {
  const { id } = useParams();

  if (id === 'levantar-capital') return <LevantatCapitalPage />;
  if (id === 'buscar-invertir') return <BuscarInvertirPage />;

  const component = getComponentById(id || '');
  const navigate = useNavigate();

  return (
    <div style={{ background: '#F5F2EC', minHeight: '100vh' }}>
      <Header />
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '48px' }}>
        <button
          onClick={() => navigate('/')}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontSize: 12, color: '#8A8880', cursor: 'pointer',
            marginBottom: 40, background: 'none', border: 'none',
            padding: 0, fontFamily: 'Inter, sans-serif',
          }}
        >
          ← Volver al mapa
        </button>
        <div style={{
          fontFamily: 'Georgia, serif', fontSize: 48,
          fontWeight: 700, color: '#0A2240', marginBottom: 16,
        }}>
          {component?.name || 'Módulo'}
        </div>
        <div style={{
          fontSize: 16, color: '#5A6070', lineHeight: 1.7,
          marginBottom: 40,
        }}>
          {component?.description}
        </div>
        <div style={{
          display: 'inline-block',
          padding: '12px 24px',
          border: '1.5px solid #B8860B',
          borderRadius: 4,
          fontSize: 11, fontWeight: 700,
          letterSpacing: 2, color: '#B8860B',
          textTransform: 'uppercase',
        }}>
          En construcción
        </div>
      </div>
    </div>
  );
};

export default ComponentPage;
