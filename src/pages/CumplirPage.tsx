import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";

const CumplirPage = () => {
  const navigate = useNavigate();
  const navy = '#0A2240';
  const copper = '#B8860B';
  const cream = '#F5F2EC';

  return (
    <div style={{ background: cream,
      minHeight: '100vh',
      fontFamily: 'Inter, sans-serif' }}>
      <Header />
      <div style={{ maxWidth: 960,
        margin: '0 auto',
        padding: '48px 64px 80px' }}>

        <button onClick={() => navigate('/')}
          style={{ fontSize: 13, color: '#8A8880',
            cursor: 'pointer', marginBottom: 40,
            background: 'none', border: 'none',
            padding: 0, display: 'inline-flex',
            alignItems: 'center', gap: 6,
            fontFamily: 'Inter, sans-serif' }}>
          ← Volver al mapa
        </button>

        <div style={{ display: 'inline-flex',
          alignItems: 'center', gap: 8,
          fontSize: 10, fontWeight: 700,
          letterSpacing: 3,
          textTransform: 'uppercase',
          color: copper, marginBottom: 16 }}>
          <div style={{ width: 6, height: 6,
            background: copper,
            borderRadius: '50%' }} />
          Transversal · 08
        </div>

        <div style={{ fontFamily: 'Georgia, serif',
          fontSize: 52, fontWeight: 700,
          color: navy, lineHeight: 1.05,
          marginBottom: 20, letterSpacing: -1 }}>
          Cumplir
        </div>

        <div style={{ fontSize: 16,
          color: '#5A6070', lineHeight: 1.7,
          maxWidth: 680, marginBottom: 16 }}>
          Un fondo de private equity en
          infraestructura opera bajo múltiples
          capas de obligaciones simultáneas:
          regulación de la Superfinanciera,
          requerimientos de los LPs institucionales,
          estándares IFC, compromisos de los
          reglamentos de los FCPs, y las
          obligaciones ambientales y sociales
          de cada activo del portafolio.
        </div>
        <div style={{ fontSize: 15,
          color: '#5A6070', lineHeight: 1.7,
          maxWidth: 680, marginBottom: 48,
          paddingBottom: 40,
          borderBottom: '1px solid #E0DBD0' }}>
          El cumplimiento no es una función de
          back-office — es una condición de
          operación. Ashmore no puede levantar
          capital de DFIs sin los estándares IFC.
          No puede operar como gestor de FCPs
          sin el cumplimiento con la
          Superfinanciera. No puede mantener su
          licencia social en las comunidades donde
          opera sin cumplir sus compromisos
          ambientales. La IA no cumple por el
          equipo — ayuda a que el cumplimiento
          no sea el cuello de botella.
        </div>

        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: 10,
            fontWeight: 700, letterSpacing: 3,
            textTransform: 'uppercase',
            color: copper, marginBottom: 20 }}>
            — Por qué esta transversal importa
          </div>
          <div style={{ display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: 12 }}>
            {[
              {
                titulo: 'El costo del incumplimiento es asimétrico',
                desc: 'Una observación de la Superfinanciera puede paralizar el fundraising del siguiente fondo. Una multa de la ANLA puede convertirse en un evento material que hay que reportar a los LPs. Un incumplimiento de los estándares IFC puede costar el compromiso de un DFI en el siguiente cierre.',
              },
              {
                titulo: 'El volumen de obligaciones crece con el portafolio',
                desc: 'Con 11 activos en 6 países, el equipo gestiona obligaciones de reporte ante docenas de entidades: CREG, ANI, CRA, ANLA, Superfinanciera, y los reguladores locales de cada país. Cada una tiene su propio calendario, formato, y nivel de detalle requerido.',
              },
              {
                titulo: 'La carga administrativa consume capacidad estratégica',
                desc: 'El tiempo que el equipo invierte en preparar reportes de cumplimiento es tiempo que no invierte en analizar nuevas inversiones o gestionar activamente el portafolio. La IA no elimina el cumplimiento — reduce la fricción de cumplirlo.',
              },
            ].map((item, i) => (
              <div key={i} style={{
                background: 'white',
                border: '1px solid #E0DBD0',
                borderTop: `3px solid ${navy}`,
                borderRadius: 6,
                padding: '20px 18px' }}>
                <div style={{ fontSize: 13,
                  fontWeight: 700, color: navy,
                  marginBottom: 8 }}>
                  {item.titulo}
                </div>
                <div style={{ fontSize: 13,
                  color: '#6A7080',
                  lineHeight: 1.65 }}>
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 56 }}>
          <div style={{ fontSize: 10,
            fontWeight: 700, letterSpacing: 3,
            textTransform: 'uppercase',
            color: copper, marginBottom: 32 }}>
            — Lo que la IA puede hacer
          </div>
          {[
            {
              titulo: 'Generador de reportes regulatorios',
              cuando: 'Según el calendario de obligaciones de cada activo y cada fondo',
              desc: 'El sistema conoce el calendario de reportes de cada activo ante cada regulador — CREG, ANI, CRA, ANLA, Superfinanciera. Cuando se acerca un vencimiento, genera el borrador del reporte con la información disponible y señala exactamente qué información falta y quién la tiene. El equipo completa y envía — no empieza desde cero.',
              aplicacion: 'Permanente — todos los activos del portafolio',
            },
            {
              titulo: 'Verificador de cumplimiento IFC',
              cuando: 'Trimestral y antes de cada reporte a DFIs',
              desc: 'Los estándares IFC de Performance Standards (PS 1-8) establecen obligaciones específicas de gestión ambiental, social, y de salud y seguridad para cada activo. El sistema verifica el estado de cumplimiento de cada PS por activo, identifica los gaps, y genera el plan de acción para cerrarlos. Es el ESAP digital del portafolio.',
              aplicacion: 'Caja 5 (gestionar), Caja 1 (levantar con DFIs)',
            },
            {
              titulo: 'Analizador de nuevas obligaciones',
              cuando: 'Cada vez que llega una nueva regulación',
              desc: 'Cuando la CREG, la ANI, o la Superfinanciera expiden una nueva regulación, el sistema analiza automáticamente qué obligaciones nuevas genera para el portafolio — plazos, formatos, responsables. Conectado directamente con el Traductor Regulatorio de la Caja 5.',
              aplicacion: 'Caja 5 (gestionar), Transversal Entender el Entorno',
            },
            {
              titulo: 'Tracker de compromisos de reglamentos y LPAs',
              cuando: 'Permanente durante la vida del fondo',
              desc: 'Los reglamentos de los FCPs y los Limited Partnership Agreements con los LPs establecen compromisos específicos del gestor: límites de concentración, plazos de inversión, restricciones de leverage, obligaciones de reporte. El sistema trackea todos esos compromisos y alerta cuando alguno está en riesgo de incumplimiento antes de que sea un problema.',
              aplicacion: 'Permanente — gestión del fondo',
            },
          ].map((sp, i) => (
            <div key={i} style={{
              padding: '28px 0',
              borderTop: '1px solid #E0DBD0' }}>
              <div style={{ display: 'flex',
                gap: 24 }}>
                <div style={{ fontFamily:
                  'Georgia, serif', fontSize: 40,
                  fontWeight: 700, color: '#E8E4DC',
                  lineHeight: 1, flexShrink: 0,
                  width: 48 }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 18,
                    fontWeight: 700, color: navy,
                    marginBottom: 6 }}>
                    {sp.titulo}
                  </div>
                  <div style={{ fontSize: 11,
                    color: copper, fontWeight: 600,
                    marginBottom: 10,
                    textTransform: 'uppercase',
                    letterSpacing: 1 }}>
                    {sp.cuando}
                  </div>
                  <div style={{ fontSize: 14,
                    color: '#5A6070',
                    lineHeight: 1.75,
                    marginBottom: 10 }}>
                    {sp.desc}
                  </div>
                  <div style={{ fontSize: 11,
                    color: '#8A8880' }}>
                    Aplica en: {sp.aplicacion}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div style={{ borderTop:
            '1px solid #E0DBD0' }} />
        </div>

        <div style={{ background: navy,
          borderRadius: 8,
          padding: '40px 48px' }}>
          <div style={{ fontSize: 9,
            fontWeight: 700, letterSpacing: 3,
            textTransform: 'uppercase',
            color: copper, marginBottom: 12 }}>
            Nivel 2 · La visión institucional
          </div>
          <div style={{ fontFamily: 'Georgia, serif',
            fontSize: 28, fontWeight: 700,
            color: '#F8F5F0', lineHeight: 1.2,
            marginBottom: 12, maxWidth: 520 }}>
            El cumplimiento como ventaja
            competitiva — no como carga
          </div>
          <div style={{ fontSize: 14,
            color: '#6A8AAA', lineHeight: 1.75,
            maxWidth: 600 }}>
            En el Nivel 2, el sistema conoce el
            calendario completo de obligaciones
            de todos los activos y los fondos —
            y genera alertas antes de los
            vencimientos, no después. El equipo
            llega a cada reunión con reguladores
            y LPs con el cumplimiento al día,
            sin que eso haya consumido días de
            trabajo manual. En un mercado donde
            los DFIs eligen gestores por su
            track record de cumplimiento ESG,
            eso es una ventaja real.
          </div>
        </div>

      </div>
    </div>
  );
};

export default CumplirPage;
