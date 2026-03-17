import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";

const Nivel2PortafolioPage = () => {
  const navigate = useNavigate();
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
          Nivel 2 · Visión institucional
        </div>
        <div style={{ fontFamily: 'Georgia, serif',
          fontSize: 52, fontWeight: 700, color: navy,
          lineHeight: 1.05, marginBottom: 12,
          letterSpacing: -1 }}>
          Centro de Control<br />del Portafolio
        </div>
        <div style={{ fontSize: 16, color: '#5A6070',
          lineHeight: 1.7, maxWidth: 640,
          marginBottom: 48, paddingBottom: 40,
          borderBottom: '1px solid #E0DBD0' }}>
          Un sistema que centraliza la información de
          los 11+ activos del portafolio — regulaciones,
          juntas, KPIs operativos, ESG, y reportes —
          con alertas automáticas y generación de
          documentos desde una sola plataforma.
        </div>

        {/* Módulos */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: 10, fontWeight: 700,
            letterSpacing: 3, textTransform: 'uppercase',
            color: copper, marginBottom: 24 }}>
            — Módulos del sistema
          </div>
          <div style={{ display: 'grid',
            gridTemplateColumns: 'repeat(5,1fr)',
            gap: 12 }}>
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
                background: 'white',
                border: '1px solid #E0DBD0',
                borderTop: `3px solid ${tab.color}`,
                borderRadius: 6,
                padding: '20px 18px' }}>
                <div style={{ fontSize: 14,
                  fontWeight: 700, color: navy,
                  marginBottom: 8 }}>{tab.titulo}</div>
                <div style={{ fontSize: 13,
                  color: '#6A7080',
                  lineHeight: 1.6 }}>{tab.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* En construcción */}
        <div style={{ background: navy, borderRadius: 8,
          padding: '48px 56px', textAlign: 'center' }}>
          <div style={{ fontSize: 11, fontWeight: 700,
            letterSpacing: 3, textTransform: 'uppercase',
            color: copper, marginBottom: 16 }}>
            Próximamente
          </div>
          <div style={{ fontFamily: 'Georgia, serif',
            fontSize: 28, fontWeight: 700,
            color: '#F8F5F0', marginBottom: 12 }}>
            Sistema en desarrollo
          </div>
          <div style={{ fontSize: 14, color: '#6A8AAA',
            lineHeight: 1.7, maxWidth: 480,
            margin: '0 auto 24px' }}>
            El Centro de Control del Portafolio conectará
            el Traductor Regulatorio, el Preparador de Juntas
            y el Generador de Reportes LP en una sola
            plataforma con monitoreo automático y alertas.
          </div>
          <button
            onClick={() => navigate('/componente/gestionar-invertido')}
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
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = copper;
            }}>
            Volver a Gestionar lo Invertido
          </button>
        </div>

      </div>
    </div>
  );
};

export default Nivel2PortafolioPage;
