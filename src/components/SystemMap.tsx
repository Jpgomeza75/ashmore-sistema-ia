import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { journeyComponents, transversalComponents } from "@/data/components";
import type { SystemComponent } from "@/data/components";

const SystemMap = () => {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = selectedId
    ? [...journeyComponents, ...transversalComponents]
        .find(c => c.id === selectedId) ?? null
    : null;

  const handleSelect = (c: SystemComponent) => {
    if (!c.hasContent) return;
    setSelectedId(prev => prev === c.id ? null : c.id);
  };

  return (
    <div style={{
      flex:1, display:'flex',
      minHeight:0, gap:0, overflow:'hidden'
    }}>
      {/* MAP */}
      <div style={{
        flex: selectedId ? '0 0 57%' : '1',
        display:'flex', flexDirection:'column',
        minHeight:0, overflow:'hidden',
        transition:'flex 0.3s ease',
        paddingRight: selectedId ? 16 : 0
      }}>

        {/* JOURNEY TITLE */}
        <div style={{
          fontFamily:'Georgia, serif',
          fontSize:'clamp(16px, 2vw, 22px)',
          fontWeight:700, color:'#0A2240',
          flexShrink:0, lineHeight:1,
          marginBottom:10
        }}>
          El <span style={{ color:'#B8860B' }}>Journey</span>
        </div>

        {/* JOURNEY CARDS */}
        <div style={{
          display:'flex', alignItems:'stretch',
          flex:1, minHeight:0, marginBottom:12
        }}>
          {journeyComponents.map((c, idx) => (
            <div key={c.id} style={{
              display:'flex', alignItems:'center',
              flex:1, minWidth:0
            }}>
              <div
                onClick={() => handleSelect(c)}
                style={{
                  flex:1, height:'100%',
                  borderRadius:4,
                  display:'flex', flexDirection:'column',
                  justifyContent:'flex-end',
                  padding:'16px 14px',
                  cursor: c.hasContent ? 'pointer' : 'default',
                  position:'relative',
                  background: c.hasContent
                    ? (selectedId === c.id ? '#143050' : '#0A2240')
                    : '#E8E5DE',
                  border: c.hasContent ? 'none' : '1px solid #CCC9C0',
                  transition:'background 0.15s',
                  userSelect:'none'
                }}
              >
                {c.hasContent && (
                  <div style={{
                    position:'absolute', bottom:0, left:0, right:0,
                    height:3, background:'#B8860B',
                    borderRadius:'0 0 4px 4px'
                  }} />
                )}
                <div style={{
                  display:'inline-block', fontSize:'6.5px',
                  letterSpacing:'1.5px', textTransform:'uppercase',
                  fontWeight:600, padding:'2px 6px', borderRadius:2,
                  marginBottom:8, width:'fit-content',
                  background: c.hasContent
                    ? 'rgba(184,134,11,0.15)' : 'rgba(0,0,0,0.05)',
                  color: c.hasContent ? '#B8860B' : '#C0BDB6',
                  fontFamily:'DM Sans, sans-serif'
                }}>
                  Journey · {String(c.order).padStart(2,'0')}
                </div>
                <div style={{
                  fontFamily:'Georgia, serif',
                  fontSize:'clamp(22px, 2.8vw, 38px)',
                  fontWeight:700, lineHeight:1, marginBottom:6,
                  color: c.hasContent ? '#B8860B' : '#C8C5BC'
                }}>
                  {String(c.order).padStart(2,'0')}
                </div>
                <div style={{
                  fontSize:'clamp(9px, 1vw, 12px)',
                  fontWeight:500, lineHeight:1.3,
                  color: c.hasContent ? '#E8E5DC' : '#B0ADA6',
                  fontFamily:'DM Sans, sans-serif'
                }}>
                  {c.name}
                </div>
              </div>

              {idx < journeyComponents.length - 1 && (
                <div style={{
                  width:18, flexShrink:0,
                  display:'flex', alignItems:'center',
                  justifyContent:'center', fontSize:12,
                  color: c.hasContent ? '#B8860B' : '#C8C5BC'
                }}>→</div>
              )}
            </div>
          ))}
        </div>

        {/* TRANSVERSALES TITLE */}
        <div style={{
          fontFamily:'Georgia, serif',
          fontSize:'clamp(16px, 2vw, 22px)',
          fontWeight:700, color:'#0A2240',
          flexShrink:0, lineHeight:1,
          marginBottom:10
        }}>
          Las <span style={{ color:'#B8860B' }}>Transversales</span>
        </div>

        {/* TRANSVERSALES CARDS — centradas */}
        <div style={{
          display:'flex', alignItems:'stretch',
          flex:1, minHeight:0, marginBottom:10
        }}>
          {/* Spacer izquierdo = media flecha */}
          <div style={{ width:9, flexShrink:0 }} />

          {transversalComponents.map((c, idx) => (
            <div key={c.id} style={{
              display:'flex', alignItems:'center',
              flex:1.25, minWidth:0
            }}>
              <div
                onClick={() => handleSelect(c)}
                style={{
                  flex:1, height:'100%',
                  borderRadius:4,
                  background: selectedId === c.id ? '#112840' : '#0A2240',
                  border:'1px solid #1E3A5A',
                  display:'flex', flexDirection:'column',
                  justifyContent:'flex-end',
                  padding:'16px 14px',
                  cursor:'pointer', position:'relative',
                  transition:'background 0.15s',
                  userSelect:'none'
                }}
              >
                <div style={{
                  position:'absolute', bottom:0, left:0, right:0,
                  height:3, background:'#B8860B', opacity:0.35,
                  borderRadius:'0 0 4px 4px'
                }} />
                <div style={{
                  display:'inline-block', fontSize:'6.5px',
                  letterSpacing:'1.5px', textTransform:'uppercase',
                  fontWeight:600, padding:'2px 6px', borderRadius:2,
                  marginBottom:8, width:'fit-content',
                  background:'rgba(184,134,11,0.12)', color:'#B8860B',
                  fontFamily:'DM Sans, sans-serif'
                }}>
                  Transversal · {String(c.order).padStart(2,'0')}
                </div>
                <div style={{
                  fontFamily:'Georgia, serif',
                  fontSize:'clamp(22px, 2.8vw, 38px)',
                  fontWeight:700, lineHeight:1, marginBottom:6,
                  color:'#1E3A5A'
                }}>
                  {String(c.order).padStart(2,'0')}
                </div>
                <div style={{
                  fontSize:'clamp(9px, 1vw, 12px)',
                  fontWeight:500, lineHeight:1.3, color:'#6A8AAA',
                  fontFamily:'DM Sans, sans-serif'
                }}>
                  {c.name}
                </div>
              </div>

              {idx < transversalComponents.length - 1 && (
                <div style={{ width:18, flexShrink:0 }} />
              )}
            </div>
          ))}

          {/* Spacer derecho = media flecha */}
          <div style={{ width:9, flexShrink:0 }} />
        </div>

        {/* FOOTER */}
        <div style={{
          fontSize:9, color:'#B8B5AE',
          fontStyle:'italic', textAlign:'center', flexShrink:0,
          fontFamily:'DM Sans, sans-serif'
        }}>
          Las transversales cruzan todas las etapas del ciclo de inversión
        </div>
      </div>

      {/* DETAIL PANEL */}
      {selectedId && selected && (
        <div style={{
          flex:'0 0 43%',
          borderLeft:'3px solid #B8860B',
          background:'white',
          display:'flex', flexDirection:'column',
          overflow:'hidden',
          borderRadius:'0 4px 4px 0'
        }}>
          <div style={{
            background:'#0A2240',
            padding:'20px 24px 16px',
            flexShrink:0, position:'relative'
          }}>
            <div style={{
              display:'inline-block', fontSize:8, fontWeight:700,
              letterSpacing:2, textTransform:'uppercase',
              color:'#B8860B', border:'1px solid #B8860B',
              padding:'3px 8px', borderRadius:2, marginBottom:10,
              fontFamily:'DM Sans, sans-serif'
            }}>
              {selected.type === 'JOURNEY'
                ? `Journey · ${String(selected.order).padStart(2,'0')}`
                : `Transversal · ${String(selected.order).padStart(2,'0')}`}
            </div>
            <div style={{
              fontFamily:'Georgia, serif', fontSize:20,
              fontWeight:700, color:'#F8F5F0',
              lineHeight:1.2, marginBottom:8
            }}>{selected.name}</div>
            <div style={{
              fontSize:11, color:'#6A8AAA',
              lineHeight:1.6, fontFamily:'DM Sans, sans-serif'
            }}>{selected.description}</div>
            <button
              onClick={() => setSelectedId(null)}
              style={{
                position:'absolute', top:16, right:16,
                width:28, height:28, background:'#143050',
                border:'none', borderRadius:4, cursor:'pointer',
                color:'#6A8AAA', fontSize:14,
                display:'flex', alignItems:'center', justifyContent:'center'
              }}
            >✕</button>
          </div>

          <div style={{ flex:1, overflowY:'auto', padding:'20px 24px' }}>
            {selected.hasContent ? (
              <>
                {selected.problemToday && (
                  <>
                    <div style={{
                      fontSize:8, fontWeight:700, letterSpacing:2,
                      textTransform:'uppercase', color:'#B8860B',
                      marginBottom:8, fontFamily:'DM Sans, sans-serif'
                    }}>El problema hoy</div>
                    <p style={{
                      fontSize:12, color:'#444', lineHeight:1.65,
                      marginBottom:18, fontFamily:'DM Sans, sans-serif'
                    }}>{selected.problemToday}</p>
                  </>
                )}
                {selected.level1 && selected.level1.cases.length > 0 && (
                  <>
                    <div style={{
                      fontSize:8, fontWeight:700, letterSpacing:2,
                      textTransform:'uppercase', color:'#B8860B',
                      marginBottom:8, fontFamily:'DM Sans, sans-serif'
                    }}>Nivel 1 — Superpoderes con IA</div>
                    <p style={{
                      fontSize:12, color:'#666', lineHeight:1.6,
                      marginBottom:12, fontFamily:'DM Sans, sans-serif'
                    }}>{selected.level1.intro}</p>
                    {selected.level1.cases.map((cas, i) => (
                      <div key={i} style={{
                        borderLeft:'2px solid #B8860B',
                        padding:'8px 12px', marginBottom:8,
                        background:'#FAFAF8',
                        borderRadius:'0 4px 4px 0'
                      }}>
                        <div style={{
                          fontSize:11, fontWeight:600,
                          color:'#0A2240', marginBottom:3,
                          fontFamily:'DM Sans, sans-serif'
                        }}>{cas.title}</div>
                        <div style={{
                          fontSize:10, color:'#777', lineHeight:1.5,
                          fontFamily:'DM Sans, sans-serif'
                        }}>{cas.description}</div>
                      </div>
                    ))}
                  </>
                )}
                {selected.level2 && selected.level2.features.length > 0 && (
                  <>
                    <div style={{
                      fontSize:8, fontWeight:700, letterSpacing:2,
                      textTransform:'uppercase', color:'#B8860B',
                      marginBottom:8, marginTop:18,
                      fontFamily:'DM Sans, sans-serif'
                    }}>Nivel 2 — Visión institucional</div>
                    <p style={{
                      fontSize:12, color:'#666', lineHeight:1.6,
                      marginBottom:10, fontFamily:'DM Sans, sans-serif'
                    }}>{selected.level2.intro}</p>
                    {selected.level2.features.map((f, i) => (
                      <div key={i} style={{
                        fontSize:11, color:'#555', lineHeight:1.5,
                        marginBottom:6, paddingLeft:12,
                        borderLeft:'1px solid #E0DBD0',
                        fontFamily:'DM Sans, sans-serif'
                      }}>• {f}</div>
                    ))}
                  </>
                )}
              </>
            ) : (
              <div style={{
                display:'flex', flexDirection:'column',
                alignItems:'center', justifyContent:'center',
                height:'100%', gap:12
              }}>
                <div style={{
                  fontSize:11, fontWeight:700, letterSpacing:2,
                  textTransform:'uppercase', color:'#B8860B',
                  border:'1px solid #B8860B', padding:'6px 16px',
                  borderRadius:2, fontFamily:'DM Sans, sans-serif'
                }}>Próximamente</div>
                <p style={{
                  fontSize:11, color:'#AAA', textAlign:'center',
                  fontFamily:'DM Sans, sans-serif'
                }}>Este módulo está en desarrollo</p>
              </div>
            )}
          </div>

          {selected.hasContent && (
            <div style={{
              padding:'14px 24px',
              borderTop:'1px solid #EEE', flexShrink:0
            }}>
              <button
                onClick={() => selected && navigate(`/componente/${selected.id}`)}
                style={{
                  display:'block', width:'100%', padding:11,
                  background:'transparent',
                  border:'1.5px solid #0A2240', borderRadius:4,
                  fontSize:11, fontWeight:600, letterSpacing:1,
                  color:'#0A2240', cursor:'pointer',
                  fontFamily:'DM Sans, sans-serif'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#0A2240';
                  e.currentTarget.style.color = '#F8F5F0';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#0A2240';
                }}
              >
                Explorar en detalle →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SystemMap;
