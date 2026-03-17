import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";

const Nivel2Page = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeLP, setActiveLP] = useState('caf');
  const [activeDeal, setActiveDeal] = useState('solar');

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', color: '#B8860B' },
    { id: 'lp', label: 'LP Relations', color: '#93C5FD' },
    { id: 'deal', label: 'Deal Due Diligence', color: '#86EFAC' },
    { id: 'kb', label: 'Base de Conocimiento', color: '#C4B5FD' },
  ];

  const lps = [
    { id: 'caf', name: 'CAF', meta: 'DFI · Inglés · ILPA', pct: 87, status: 'En revisión', statusColor: '#93C5FD', deadline: 'Mar 28' },
    { id: 'skandia', name: 'Skandia', meta: 'Aseguradora · Español', pct: 61, status: 'En proceso', statusColor: '#B8860B', deadline: 'Abr 5' },
    { id: 'porvenir', name: 'Porvenir ⚠', meta: 'Pensiones · Español', pct: 34, status: 'Input requerido', statusColor: '#FCA5A5', deadline: 'Mar 22' },
    { id: 'bid', name: 'BID Invest', meta: 'DFI · Inglés · ILPA', pct: 95, status: 'Listo para enviar', statusColor: '#86EFAC', deadline: 'Mar 20' },
    { id: 'proteccion', name: 'Protección', meta: 'Pensiones · Español', pct: 52, status: 'En proceso', statusColor: '#B8860B', deadline: 'Abr 12' },
  ];

  const deals = [
    { id: 'solar', name: 'Proyecto Solar Córdoba', meta: 'Colombia · ~USD 55M', sector: 'Energía renovable', sectorColor: '#FCD34D', sectorBg: 'rgba(250,204,21,0.1)' },
    { id: 'callao', name: 'Puerto Callao Logística', meta: 'Perú · ~USD 40M', sector: 'Logística', sectorColor: '#93C5FD', sectorBg: 'rgba(96,165,250,0.1)' },
    { id: 'agua', name: 'Agua Potable Guatemala', meta: 'Guatemala · ~USD 35M', sector: 'Agua y residuos', sectorColor: '#6EE7B7', sectorBg: 'rgba(52,211,153,0.1)' },
  ];

  const s = {
    page: { background: '#F5F2EC', minHeight: '100vh', fontFamily: 'Inter, sans-serif' } as React.CSSProperties,
    container: { maxWidth: 1200, margin: '0 auto', padding: '32px 48px 80px' } as React.CSSProperties,
    back: { fontSize: 13, color: '#8A8880', cursor: 'pointer', marginBottom: 32, background: 'none', border: 'none', padding: 0, display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'Inter, sans-serif' } as React.CSSProperties,
    system: { background: '#0A2240', borderRadius: 8, overflow: 'hidden', border: '1px solid #1E3A5A' } as React.CSSProperties,
    appHeader: { background: '#0A2240', borderBottom: '1px solid #1E3A5A', padding: '0 24px', display: 'flex', alignItems: 'center', height: 48, gap: 0 } as React.CSSProperties,
    tabsBar: { display: 'flex', background: '#071B33', borderBottom: '1px solid #1E3A5A', padding: '0 24px', gap: 0 } as React.CSSProperties,
    content: { minHeight: 520, overflow: 'auto' } as React.CSSProperties,
  };

  const kpiCard = (label: string, value: string, sub: string, subAlert = false) => (
    <div style={{ background: '#071B33', border: '1px solid #1E3A5A', borderRadius: 4, padding: '14px 16px' }}>
      <div style={{ fontSize: 9, color: '#4A6070', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 }}>{label}</div>
      <div style={{ fontFamily: 'Georgia, serif', fontSize: 28, fontWeight: 700, color: '#F8F5F0', lineHeight: 1, marginBottom: 4 }}>{value}</div>
      <div style={{ fontSize: 10, color: subAlert ? '#B8860B' : '#4A6070' }}>{sub}</div>
    </div>
  );

  const badge = (text: string, bg: string, color: string) => (
    <span style={{ display: 'inline-block', fontSize: 9, fontWeight: 600, padding: '2px 8px', borderRadius: 2, background: bg, color }}>{text}</span>
  );

  const progressBar = (pct: number) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <div style={{ width: 80, height: 4, background: '#1E3A5A', borderRadius: 2, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: pct > 80 ? '#86EFAC' : '#B8860B', borderRadius: 2 }} />
      </div>
      <span style={{ fontSize: 10, color: pct > 80 ? '#86EFAC' : '#B8860B', fontWeight: 600 }}>{pct}%</span>
    </div>
  );

  const sectionLabel = (text: string) => (
    <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#B8860B', marginBottom: 10 }}>{text}</div>
  );

  const ddqQuestion = (status: string, statusBg: string, statusColor: string, q: string, a: string, completar?: string) => (
    <div style={{ padding: '12px 0', borderBottom: '1px solid #0D2540' }}>
      <div style={{ display: 'inline-block', fontSize: 8, fontWeight: 700, padding: '2px 7px', borderRadius: 2, marginBottom: 6, background: statusBg, color: statusColor }}>{status}</div>
      <div style={{ fontSize: 11, fontWeight: 600, color: '#C8D8E8', marginBottom: 6 }}>{q}</div>
      <div style={{ fontSize: 11, color: '#6A8AAA', lineHeight: 1.6 }}>{a}</div>
      {completar && (
        <div style={{ fontSize: 10, color: '#854D0E', fontStyle: 'italic', marginTop: 6, padding: '5px 8px', background: 'rgba(133,77,14,0.1)', borderRadius: 2 }}>{completar}</div>
      )}
    </div>
  );

  const alertItem = (dotColor: string, text: string, time: string) => (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 12px', borderRadius: 4, background: '#071B33', border: '1px solid #1E3A5A', marginBottom: 6 }}>
      <div style={{ width: 6, height: 6, borderRadius: '50%', background: dotColor, flexShrink: 0, marginTop: 4 }} />
      <div>
        <div style={{ fontSize: 11, color: '#8AAABB', lineHeight: 1.5 }}>{text}</div>
        <div style={{ fontSize: 9, color: '#4A6070', marginTop: 2 }}>{time}</div>
      </div>
    </div>
  );

  const kbDoc = (icon: string, name: string, meta: string, statusText: string, statusBg: string, statusColor: string) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', background: '#071B33', border: '1px solid #1E3A5A', borderRadius: 4, marginBottom: 6 }}>
      <div style={{ width: 28, height: 28, background: '#1E3A5A', borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: '#B8860B', fontWeight: 700, flexShrink: 0 }}>{icon}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 11, color: '#C8D8E8' }}>{name}</div>
        <div style={{ fontSize: 9, color: '#4A6070' }}>{meta}</div>
      </div>
      <span style={{ fontSize: 8, fontWeight: 600, padding: '2px 6px', borderRadius: 2, background: statusBg, color: statusColor }}>{statusText}</span>
    </div>
  );

  const kbSection = (title: string, count: string, pct: number, desc: string) => (
    <div style={{ background: '#071B33', border: '1px solid #1E3A5A', borderRadius: 4, padding: '14px 16px', marginBottom: 8 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6, fontSize: 11, fontWeight: 600, color: '#F8F5F0' }}>
        {title}
        <span style={{ fontSize: 9, color: '#B8860B', fontWeight: 600 }}>{count}</span>
      </div>
      <div style={{ height: 3, background: '#1E3A5A', borderRadius: 2, overflow: 'hidden', marginBottom: 8 }}>
        <div style={{ height: '100%', width: `${pct}%`, background: pct > 80 ? '#86EFAC' : pct > 60 ? '#B8860B' : '#FCA5A5', borderRadius: 2 }} />
      </div>
      <div style={{ fontSize: 10, color: pct < 50 ? '#FCA5A5' : '#4A6070' }}>{desc}</div>
    </div>
  );

  // ── DASHBOARD ──
  const renderDashboard = () => (
    <div style={{ padding: '20px 24px', overflowY: 'auto' }}>
      {sectionLabel('Estado operacional · Hoy')}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 12, marginBottom: 20 }}>
        {kpiCard('DDQs de LPs activos', '5', '2 requieren atención esta semana', true)}
        {kpiCard('DDs a targets en curso', '3', 'Fondo Andino III — desplegando')}
        {kpiCard('Completitud media DDQs', '68%', 'Promedio histórico era 41%')}
        {kpiCard('Preguntas indexadas', '347', 'En base de conocimiento')}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 16 }}>
        <div>
          {sectionLabel('Pipeline LP Relations — Fondo Andino III')}
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['LP', 'Progreso', 'Estado', 'Deadline'].map(h => (
                  <th key={h} style={{ fontSize: 8, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: '#4A6070', padding: '8px 12px', textAlign: 'left', borderBottom: '1px solid #1E3A5A' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {lps.map(lp => (
                <tr key={lp.id} style={{ cursor: 'pointer' }} onClick={() => { setActiveLP(lp.id); setActiveTab('lp'); }}>
                  <td style={{ padding: '10px 12px', borderBottom: '1px solid #0D2540' }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: '#F8F5F0' }}>{lp.name}</div>
                    <div style={{ fontSize: 9, color: '#4A6070' }}>{lp.meta}</div>
                  </td>
                  <td style={{ padding: '10px 12px', borderBottom: '1px solid #0D2540' }}>{progressBar(lp.pct)}</td>
                  <td style={{ padding: '10px 12px', borderBottom: '1px solid #0D2540' }}>{badge(lp.status, `${lp.statusColor}22`, lp.statusColor)}</td>
                  <td style={{ padding: '10px 12px', borderBottom: '1px solid #0D2540', fontSize: 10, color: lp.id === 'porvenir' ? '#FCA5A5' : '#4A6070' }}>{lp.deadline}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ marginTop: 16 }}>
            {sectionLabel('Deal DD activos — Fondo Andino III')}
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {['Activo / Target', 'País', 'Sector', 'Estado'].map(h => (
                    <th key={h} style={{ fontSize: 8, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: '#4A6070', padding: '8px 12px', textAlign: 'left', borderBottom: '1px solid #1E3A5A' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Proyecto Solar Córdoba', meta: '~USD 55M · En DD', pais: '🇨🇴 Col', sector: 'Energía', sColor: '#FCD34D', sBg: 'rgba(250,204,21,0.1)', estado: 'DD técnico', eColor: '#B8860B' },
                  { name: 'Puerto Callao Logística', meta: '~USD 40M · Screening', pais: '🇵🇪 Per', sector: 'Logística', sColor: '#93C5FD', sBg: 'rgba(96,165,250,0.1)', estado: 'Screening', eColor: '#93C5FD' },
                  { name: 'Agua Potable Guatemala', meta: '~USD 35M · IC prelim.', pais: '🇬🇹 Gua', sector: 'Agua', sColor: '#6EE7B7', sBg: 'rgba(52,211,153,0.1)', estado: 'IC prelim.', eColor: '#86EFAC' },
                ].map((d, i) => (
                  <tr key={i} style={{ cursor: 'pointer' }} onClick={() => { setActiveDeal(deals[i].id); setActiveTab('deal'); }}>
                    <td style={{ padding: '10px 12px', borderBottom: '1px solid #0D2540' }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: '#F8F5F0' }}>{d.name}</div>
                      <div style={{ fontSize: 9, color: '#4A6070' }}>{d.meta}</div>
                    </td>
                    <td style={{ padding: '10px 12px', borderBottom: '1px solid #0D2540', fontSize: 12 }}>{d.pais}</td>
                    <td style={{ padding: '10px 12px', borderBottom: '1px solid #0D2540' }}>{badge(d.sector, d.sBg, d.sColor)}</td>
                    <td style={{ padding: '10px 12px', borderBottom: '1px solid #0D2540' }}>{badge(d.estado, `${d.eColor}22`, d.eColor)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          {sectionLabel('Alertas que requieren atención')}
          {alertItem('#FCA5A5', 'DDQ Porvenir vence en 6 días — faltan 8 respuestas de Compliance', 'Hoy · Alta prioridad')}
          {alertItem('#B8860B', 'Nueva inversión Lógika afecta 12 respuestas en 3 DDQs activos — actualización pendiente', 'Hace 2 días')}
          {alertItem('#93C5FD', 'CAF solicitó información adicional sobre métricas ESG del Fondo III', 'Hace 3 días')}
          {alertItem('#86EFAC', 'DDQ BID Invest listo para revisión final antes de envío', 'Hace 1 día')}
          {alertItem('#B8860B', 'Proyecto Solar Córdoba: informe técnico recibido — pendiente análisis CREG', 'Hoy')}
        </div>
      </div>
    </div>
  );

  // ── LP RELATIONS ──
  const renderLP = () => (
    <div style={{ display: 'flex', flex: 1, overflow: 'hidden', minHeight: 520 }}>
      <div style={{ width: 220, flexShrink: 0, borderRight: '1px solid #1E3A5A', overflowY: 'auto', padding: '12px 0' }}>
        <div style={{ padding: '8px 16px 12px', fontSize: 8, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#4A6070' }}>Fondo Andino III</div>
        {lps.map(lp => (
          <div
            key={lp.id}
            onClick={() => setActiveLP(lp.id)}
            style={{ padding: '10px 16px', cursor: 'pointer', borderLeft: `2px solid ${activeLP === lp.id ? '#B8860B' : 'transparent'}`, background: activeLP === lp.id ? '#071B33' : 'transparent' }}
          >
            <div style={{ fontSize: 12, fontWeight: 600, color: '#F8F5F0', marginBottom: 2 }}>{lp.name}</div>
            <div style={{ fontSize: 10, color: '#4A6070', marginBottom: 4 }}>{lp.meta}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ flex: 1, height: 3, background: '#1E3A5A', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${lp.pct}%`, background: '#B8860B', borderRadius: 2 }} />
              </div>
              <span style={{ fontSize: 9, color: '#B8860B', fontWeight: 600 }}>{lp.pct}%</span>
            </div>
          </div>
        ))}
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
        <div style={{ marginBottom: 20, paddingBottom: 16, borderBottom: '1px solid #1E3A5A' }}>
          <div style={{ fontFamily: 'Georgia, serif', fontSize: 22, fontWeight: 700, color: '#F8F5F0', marginBottom: 4 }}>
            {activeLP === 'caf' ? 'CAF — Corporación Andina de Fomento' :
             activeLP === 'skandia' ? 'Skandia Colombia' :
             activeLP === 'porvenir' ? 'Porvenir — Fondo de Pensiones' :
             activeLP === 'bid' ? 'BID Invest' : 'Protección — Fondo de Pensiones'}
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {badge(lps.find(l => l.id === activeLP)?.status || '', `${lps.find(l => l.id === activeLP)?.statusColor}22`, lps.find(l => l.id === activeLP)?.statusColor || '#B8860B')}
            <span style={{ fontSize: 10, color: '#4A6070' }}>ILPA v1.2 · Deadline: {lps.find(l => l.id === activeLP)?.deadline}</span>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, marginBottom: 20 }}>
          {[['Completas','45','#86EFAC'],['Parciales','6','#B8860B'],['Input requerido','1','#FCA5A5']].map(([label, val, color]) => (
            <div key={String(label)} style={{ background: '#071B33', border: '1px solid #1E3A5A', borderRadius: 4, padding: '10px 12px', textAlign: 'center' }}>
              <div style={{ fontSize: 8, color: '#4A6070', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 }}>{label}</div>
              <div style={{ fontFamily: 'Georgia, serif', fontSize: 22, fontWeight: 700, color }}>{val}</div>
            </div>
          ))}
        </div>
        {sectionLabel('Respuestas del DDQ')}
        {ddqQuestion('✅ COMPLETE', 'rgba(34,197,94,0.1)', '#86EFAC',
          "1.1 Does the Firm have any existing business lines unrelated to the Fund's investment strategy?",
          "No. Ashmore Management Company Colombia SAS operates exclusively as an infrastructure private equity fund manager. All activities are directly related to the Fund's strategy focused on infrastructure assets across Colombia, Peru, and Central America...")}
        {ddqQuestion('🟡 PARTIAL', 'rgba(133,77,14,0.15)', '#FCD34D',
          "5.1 Provide biographical information for all investment professionals.",
          "Ashmore Management Company Colombia SAS has not published detailed team biographies in publicly available sources. The team combines global EM expertise from Ashmore Group with deep local infrastructure knowledge...",
          "TO COMPLETE: Solicitar biographies completas del equipo a RRHH — nombre, cargo, años en Ashmore, experiencia previa.")}
        {ddqQuestion('✅ COMPLETE', 'rgba(34,197,94,0.1)', '#86EFAC',
          "10.3.3 Give 2-3 examples of how the Firm has contributed to portfolio companies' ESG management.",
          "1. TermoemCali: Biodiversity compensation plan, community liaison. 2. Transambiental: GHG fleet replacement, road safety plan. 3. Líneas La Guajira: Indigenous community consultation, environmental compliance...")}
      </div>
    </div>
  );

  // ── DEAL DD ──
  const renderDeal = () => (
    <div style={{ display: 'flex', flex: 1, overflow: 'hidden', minHeight: 520 }}>
      <div style={{ width: 220, flexShrink: 0, borderRight: '1px solid #1E3A5A', overflowY: 'auto', padding: '12px 0' }}>
        <div style={{ padding: '8px 16px 12px', fontSize: 8, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#4A6070' }}>Fondo Andino III</div>
        {deals.map(d => (
          <div
            key={d.id}
            onClick={() => setActiveDeal(d.id)}
            style={{ padding: '10px 16px', cursor: 'pointer', borderLeft: `2px solid ${activeDeal === d.id ? '#B8860B' : 'transparent'}`, background: activeDeal === d.id ? '#071B33' : 'transparent' }}
          >
            <div style={{ fontSize: 12, fontWeight: 600, color: '#F8F5F0', marginBottom: 2 }}>{d.name}</div>
            <div style={{ fontSize: 10, color: '#4A6070', marginBottom: 4 }}>{d.meta}</div>
            <span style={{ fontSize: 8, fontWeight: 600, padding: '1px 6px', borderRadius: 2, background: d.sectorBg, color: d.sectorColor }}>{d.sector}</span>
          </div>
        ))}
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
        <div style={{ marginBottom: 20, paddingBottom: 16, borderBottom: '1px solid #1E3A5A' }}>
          <div style={{ fontFamily: 'Georgia, serif', fontSize: 22, fontWeight: 700, color: '#F8F5F0', marginBottom: 4 }}>
            {deals.find(d => d.id === activeDeal)?.name}
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {badge('DD técnico en curso', 'rgba(184,134,11,0.15)', '#B8860B')}
            <span style={{ fontSize: 10, color: '#4A6070' }}>{deals.find(d => d.id === activeDeal)?.meta} · Compartimento A</span>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8, marginBottom: 20 }}>
          {[['Ticket','~55M','#F8F5F0'],['Capacidad','80 MW','#F8F5F0'],['TIR esperada','14-16%','#B8860B'],['Estado','Operando','#86EFAC']].map(([label, val, color]) => (
            <div key={String(label)} style={{ background: '#071B33', border: '1px solid #1E3A5A', borderRadius: 4, padding: '10px 12px', textAlign: 'center' }}>
              <div style={{ fontSize: 8, color: '#4A6070', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 }}>{label}</div>
              <div style={{ fontFamily: 'Georgia, serif', fontSize: 18, fontWeight: 700, color }}>{val}</div>
            </div>
          ))}
        </div>
        {sectionLabel('Cuestionario de DD enviado al target')}
        {ddqQuestion('✅ Respondida', 'rgba(34,197,94,0.1)', '#86EFAC',
          "F.1 Descripción del activo: capacidad instalada, tecnología, fecha COD, vida útil remanente",
          "Parque solar fotovoltaico 80 MW-dc / 72 MW-ac, tecnología bifacial monocristalina. COD: enero 2022. Vida útil remanente: 23 años. Ubicación: Montería, Córdoba. Conexión red 110 kV...")}
        {ddqQuestion('🟡 Incompleta', 'rgba(133,77,14,0.15)', '#FCD34D',
          "F.4 Contratos de venta de energía: contraparte, plazo, precio, indexación",
          "PPA con empresa minera colombiana (bajo NDA) por 40 MW a USD 42/MWh, indexado inflación USA, plazo 15 años (vence 2037). Energía restante en bolsa...",
          "PENDIENTE: Confirmación escrita de la contraparte del PPA. Solicitar copia del contrato bajo NDA.")}
        {ddqQuestion('🔴 Sin respuesta', 'rgba(239,68,68,0.1)', '#FCA5A5',
          "ESG.3 Plan de manejo ambiental: licencia ANLA, compensaciones, monitoreo",
          "Respuesta pendiente del target — plazo vencido hace 3 días")}
      </div>
    </div>
  );

  // ── BASE DE CONOCIMIENTO ──
  const renderKB = () => (
    <div style={{ padding: '20px 24px', overflowY: 'auto' }}>
      <input
        placeholder="Buscar en la base de conocimiento — ej: 'respuestas ESG anteriores' o 'template DD energía'"
        style={{ width: '100%', padding: '10px 16px', background: '#071B33', border: '1px solid #1E3A5A', borderRadius: 4, color: '#F8F5F0', fontSize: 12, marginBottom: 20, fontFamily: 'Inter, sans-serif', outline: 'none' }}
      />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
        <div>
          {sectionLabel('Contexto institucional de Ashmore')}
          {kbDoc('A', 'Perfil institucional Ashmore Colombia', 'Firma, fondos, portafolio, equipo · Mar 2026', 'Activo', 'rgba(34,197,94,0.1)', '#86EFAC')}
          {kbDoc('F', 'Reglamento Fondo Andino III', 'Mandato, restricciones, términos · Confidencial', 'Activo', 'rgba(34,197,94,0.1)', '#86EFAC')}
          {kbDoc('E', 'Política ESG — IFC Performance Standards', 'PS 1-8, ejemplos portafolio · 2025', 'Activo', 'rgba(34,197,94,0.1)', '#86EFAC')}
          {kbDoc('T', 'Track record Fondos I y II', 'TIR, MOIC, casos de éxito · Requiere actualización', 'Actualizar', 'rgba(133,77,14,0.15)', '#FCD34D')}
        </div>
        <div>
          {sectionLabel('Preguntas indexadas por sección')}
          {kbSection('Firm General Information', '47 preguntas', 94, '94% con respuesta lista · Actualizado automáticamente')}
          {kbSection('Investment Strategy', '38 preguntas', 87, '87% con respuesta lista')}
          {kbSection('ESG & Diversity', '52 preguntas', 71, '71% lista · Fondo III requiere métricas de impacto')}
          {kbSection('Team & Key Person', '31 preguntas', 45, '45% lista · Biographies pendientes de RRHH')}
        </div>
      </div>
      {sectionLabel('Templates de DD para targets por sector')}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8 }}>
        {[
          { icon: 'DD', name: 'Template DD Energía', meta: 'Solar, eólica, cogeneración · 94 preguntas' },
          { icon: 'DD', name: 'Template DD Transporte', meta: 'Vías, puertos, ferrocarril · 87 preguntas' },
          { icon: 'DD', name: 'Template DD Agua', meta: 'Acueducto, residuos · 76 preguntas' },
          { icon: 'DD', name: 'Template DD Social', meta: 'Salud, educación, logística · 68 preguntas' },
        ].map(t => (
          <div key={t.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '12px 14px', background: '#071B33', border: '1px solid #1E3A5A', borderRadius: 4, cursor: 'pointer' }}>
            <div style={{ width: 28, height: 28, background: '#1E3A5A', borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: '#B8860B', fontWeight: 700, marginBottom: 8 }}>{t.icon}</div>
            <div style={{ fontSize: 11, color: '#C8D8E8', marginBottom: 2 }}>{t.name}</div>
            <div style={{ fontSize: 9, color: '#4A6070' }}>{t.meta}</div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div style={s.page}>
      <Header />
      <div style={s.container}>
        <button style={s.back} onClick={() => navigate('/componente/levantar-capital')}>
          ← Levantar el Capital
        </button>

        <div style={{ marginBottom: 8, display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 10, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: '#B8860B' }}>
          <div style={{ width: 6, height: 6, background: '#B8860B', borderRadius: '50%' }} />
          Nivel 2 · Visión institucional
        </div>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: 40, fontWeight: 700, color: '#0A2240', lineHeight: 1.05, marginBottom: 8, letterSpacing: -1 }}>
          Sistema de Gestión de Due Diligence
        </div>
        <div style={{ fontSize: 15, color: '#5A6070', lineHeight: 1.7, maxWidth: 700, marginBottom: 32, paddingBottom: 32, borderBottom: '1px solid #E0DBD0' }}>
          Así funcionaría el sistema integrado — gestionando simultáneamente los DDQs de LPs que quieren invertir en Ashmore, y los DDQs a targets donde Ashmore quiere invertir, todo alimentado por una base de conocimiento compartida.
        </div>

        <div style={s.system}>
          <div style={s.appHeader}>
            <span style={{ fontFamily: 'Georgia, serif', fontSize: 14, fontWeight: 700, color: '#F8F5F0', marginRight: 8 }}>Ashmore</span>
            <span style={{ fontSize: 7, color: '#B8860B', letterSpacing: 2, textTransform: 'uppercase', marginRight: 20 }}>Colombia</span>
            <div style={{ width: 1, height: 20, background: '#1E3A5A', marginRight: 20 }} />
            <span style={{ fontSize: 10, color: '#4A6070', letterSpacing: 2, textTransform: 'uppercase', flex: 1 }}>Sistema de Gestión de Due Diligence · IA</span>
            <div style={{ fontSize: 9, fontWeight: 600, padding: '3px 10px', background: 'rgba(184,134,11,0.15)', color: '#B8860B', borderRadius: 2, border: '1px solid rgba(184,134,11,0.3)' }}>Nivel 2</div>
          </div>

          <div style={s.tabsBar}>
            {tabs.map(tab => (
              <div
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '12px 20px',
                  fontSize: 11,
                  fontWeight: 500,
                  color: activeTab === tab.id ? '#F8F5F0' : '#4A6070',
                  cursor: 'pointer',
                  borderBottom: `2px solid ${activeTab === tab.id ? '#B8860B' : 'transparent'}`,
                  transition: 'all 0.15s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: tab.color }} />
                {tab.label}
              </div>
            ))}
          </div>

          <div style={s.content}>
            {activeTab === 'dashboard' && renderDashboard()}
            {activeTab === 'lp' && renderLP()}
            {activeTab === 'deal' && renderDeal()}
            {activeTab === 'kb' && renderKB()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nivel2Page;
