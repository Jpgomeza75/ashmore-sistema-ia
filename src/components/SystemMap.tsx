import { useNavigate } from "react-router-dom";
import { journeyComponents, transversalComponents } from "@/data/components";
import type { SystemComponent } from "@/data/components";

const SystemMap = () => {
  const navigate = useNavigate();

  const handleClick = (c: SystemComponent) => {
    if (!c.hasContent) return;
    navigate('/componente/' + c.id);
  };

  return (
    <div style={{
      flex:1, display:'flex',
      minHeight:0, gap:0, overflow:'hidden'
    }}>
      {/* MAP */}
      <div id="system-map-root" style={{
        flex:1,
        display:'flex', flexDirection:'column',
        minHeight:0, overflow:'hidden'
      }}>

        {/* JOURNEY TITLE */}
        <div style={{
          fontFamily:'Georgia, serif',
          fontSize:48,
          fontWeight:700, color:'#0A2240',
          flexShrink:0, lineHeight:1,
          marginBottom:16
        }}>
          El <span style={{ color:'#B8860B' }}>Journey</span>
        </div>

        {/* JOURNEY CARDS */}
        <div style={{
          display:'flex', alignItems:'stretch',
          flex:1, minHeight:0, marginBottom:12,
          containerType:'inline-size'
        }}>
          {journeyComponents.map((c, idx) => (
            <div key={c.id} style={{
              display:'flex', alignItems:'center',
              flex:1, minWidth:0
            }}>
              <div
                onClick={() => handleClick(c)}
                style={{
                  flex:1, height:'100%',
                  borderRadius:4,
                  display:'flex', flexDirection:'column',
                  justifyContent:'space-between',
                  padding:'24px 20px',
                  cursor: c.hasContent ? 'pointer' : 'default',
                  position:'relative',
                  background: c.hasContent ? '#0A2240' : '#E8E5DE',
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
                  fontSize:22,
                  fontWeight:600, lineHeight:1.2,
                  color: c.hasContent ? '#F8F5F0' : '#888480',
                  fontFamily:'DM Sans, sans-serif'
                }}>
                  {c.name}
                </div>
                <div style={{
                  fontFamily:'Georgia, serif',
                  fontSize:120,
                  fontWeight:700, lineHeight:1,
                  color: c.hasContent ? '#B8860B' : '#C8C5BC',
                  alignSelf:'flex-end'
                }}>
                  {String(c.order)}
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
          fontSize:48,
          fontWeight:700, color:'#0A2240',
          flexShrink:0, lineHeight:1,
          marginBottom:16
        }}>
          Las <span style={{ color:'#B8860B' }}>Transversales</span>
        </div>

        {/* TRANSVERSALES CARDS — centradas */}
        <div style={{
          display:'flex', alignItems:'stretch',
          flex:1, minHeight:0, marginBottom:10,
          containerType:'inline-size'
        }}>
          <div style={{ width:9, flexShrink:0 }} />

          {transversalComponents.map((c, idx) => (
            <div key={c.id} style={{
              display:'flex', alignItems:'center',
              flex:1.25, minWidth:0
            }}>
              <div
                onClick={() => handleClick(c)}
                onMouseEnter={e => e.currentTarget.style.background = '#E5E1D8'}
                onMouseLeave={e => e.currentTarget.style.background = '#F0EDE6'}
                style={{
                  flex:1, height:'100%',
                  borderRadius:4,
                  background:'#F0EDE6',
                  border:'1px solid #D5D0C8',
                  display:'flex', flexDirection:'column',
                  justifyContent:'space-between',
                  padding:'24px 20px',
                  cursor: c.hasContent ? 'pointer' : 'default',
                  position:'relative',
                  transition:'background 0.15s',
                  userSelect:'none'
                }}
              >
                <div style={{
                  position:'absolute', bottom:0, left:0, right:0,
                  height:3, background:'#B8860B', opacity:0.4,
                  borderRadius:'0 0 4px 4px'
                }} />
                <div style={{
                  fontSize:22,
                  fontWeight:600, lineHeight:1.2, color:'#0A2240',
                  fontFamily:'DM Sans, sans-serif'
                }}>
                  {c.name}
                </div>
                <div style={{
                  fontFamily:'Georgia, serif',
                  fontSize:120,
                  fontWeight:700, lineHeight:1,
                  color:'rgba(10,34,64,0.12)',
                  alignSelf:'flex-end'
                }}>
                  {String(c.order)}
                </div>
              </div>

              {idx < transversalComponents.length - 1 && (
                <div style={{ width:18, flexShrink:0 }} />
              )}
            </div>
          ))}

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
    </div>
  );
};

export default SystemMap;
