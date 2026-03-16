import { useState } from "react";
import { journeyComponents, transversalComponents } from "@/data/components";
import DetailPanel from "@/components/DetailPanel";

const SystemMap = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = selectedId 
    ? [...journeyComponents, ...transversalComponents].find(c => c.id === selectedId) 
    : null;

  return (
    <div style={{ 
      flex: 1, 
      display: 'flex', 
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      <div style={{ display: 'flex', flex: 1, gap: 0, overflow: 'hidden' }}>
        
        {/* MAP SIDE */}
        <div style={{ 
          flex: selectedId ? '0 0 58%' : '0 0 100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'flex 0.3s ease',
          overflow: 'hidden'
        }}>
          {/* Journey label */}
          <div style={{
            fontSize: 9,
            fontWeight: 600,
            letterSpacing: 3,
            textTransform: 'uppercase',
            color: '#B8860B',
            marginBottom: 14,
            fontFamily: 'DM Sans, sans-serif'
          }}>
            — El Journey
          </div>

          {/* Journey cards */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'stretch',
            marginBottom: 20,
            flex: '0 0 auto'
          }}>
            {journeyComponents.map((c, idx) => (
              <div key={c.id} style={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: 0 }}>
                <div
                  onClick={() => c.hasContent ? setSelectedId(c.id === selectedId ? null : c.id) : null}
                  style={{
                    flex: 1,
                    minWidth: 0,
                    height: 120,
                    borderRadius: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: 16,
                    cursor: c.hasContent ? 'pointer' : 'default',
                    position: 'relative',
                    background: c.hasContent ? (selectedId === c.id ? '#143050' : '#0A2240') : '#EAE7E0',
                    border: c.hasContent ? 'none' : '1px solid #D5D2CA',
                    transition: 'background 0.15s'
                  }}
                >
                  {/* Copper bar bottom for active */}
                  {c.hasContent && (
                    <div style={{
                      position: 'absolute',
                      bottom: 0, left: 0, right: 0,
                      height: 3,
                      background: '#B8860B',
                      borderRadius: '0 0 4px 4px'
                    }} />
                  )}
                  <div style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: 22,
                    fontWeight: 700,
                    lineHeight: 1,
                    marginBottom: 6,
                    color: c.hasContent ? '#B8860B' : '#C0BDB6'
                  }}>
                    {String(c.order).padStart(2, '0')}
                  </div>
                  <div style={{
                    fontSize: 12,
                    fontWeight: 500,
                    lineHeight: 1.3,
                    color: c.hasContent ? '#F8F5F0' : '#AAAAAA',
                    fontFamily: 'DM Sans, sans-serif'
                  }}>
                    {c.name}
                  </div>
                </div>
                {/* Arrow */}
                {idx < journeyComponents.length - 1 && (
                  <div style={{
                    width: 28,
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: c.hasContent ? '#B8860B' : '#C0BDB6',
                    fontSize: 16
                  }}>→</div>
                )}
              </div>
            ))}
          </div>

          {/* Transversales */}
          <div style={{
            background: '#0A2240',
            borderRadius: 4,
            height: 48,
            display: 'flex',
            alignItems: 'center',
            paddingLeft: 20,
            paddingRight: 20,
            flexShrink: 0
          }}>
            <div style={{
              fontSize: 7,
              fontWeight: 600,
              letterSpacing: 2,
              textTransform: 'uppercase',
              color: '#B8860B',
              whiteSpace: 'nowrap',
              paddingRight: 16,
              borderRight: '1px solid #1E3A5A',
              fontFamily: 'DM Sans, sans-serif'
            }}>
              Base transversal
            </div>
            {transversalComponents.map((c, idx) => (
              <div
                key={c.id}
                onClick={() => setSelectedId(c.id === selectedId ? null : c.id)}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  borderRight: idx < transversalComponents.length - 1 
                    ? '1px solid #1E3A5A' : 'none',
                  fontSize: 9,
                  fontWeight: 500,
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                  color: selectedId === c.id ? '#F8F5F0' : '#6A8AAA',
                  cursor: 'pointer',
                  fontFamily: 'DM Sans, sans-serif',
                  transition: 'color 0.15s'
                }}
              >
                {c.name}
              </div>
            ))}
          </div>

          {/* Footer note */}
          <div style={{
            marginTop: 16,
            fontSize: 10,
            color: '#AAAAAA',
            fontStyle: 'italic',
            textAlign: 'center',
            fontFamily: 'DM Sans, sans-serif'
          }}>
            Las transversales cruzan todas las etapas del ciclo de inversión
          </div>
        </div>

        {/* DETAIL PANEL */}
        {selectedId && selected && (
          <div style={{
            flex: '0 0 42%',
            borderLeft: '3px solid #B8860B',
            background: 'white',
            overflowY: 'auto',
            transition: 'flex 0.3s ease'
          }}>
            <DetailPanel
              component={selected}
              onClose={() => setSelectedId(null)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SystemMap;
