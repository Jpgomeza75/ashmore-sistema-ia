import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, BarElement,
  RadialLinearScale, PointElement, LineElement,
  Filler, Tooltip, Legend
} from 'chart.js';
import { Bar, Radar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale, LinearScale, BarElement,
  RadialLinearScale, PointElement, LineElement,
  Filler, Tooltip, Legend
);

const navy = '#0A2240';
const copper = '#B8860B';
const dark = '#071B33';
const border = '#1E3A5A';

const TABS = [
  { id: 'dashboard', label: 'Dashboard', color: '#B8860B' },
  { id: 'financiero', label: 'Financiero', color: '#86EFAC' },
  { id: 'dataroom', label: 'Data Room', color: '#93C5FD' },
  { id: 'preguntas', label: 'Preguntas al Vendedor', color: '#FCD34D' },
  { id: 'memo', label: 'Investment Memo', color: '#F9A8D4' },
];

// ─── HEATMAP DATA ───────────────────────────────
const CRECIMIENTOS = ['4%','6%','8%','10%','12%'];
const MULTIPLES = ['3x','6x','8x','10x','12.5x'];
const HEATMAP = [
  [7.1, 9.1, 11.2, 12.8, 14.2],
  [8.2, 10.4, 12.3, 13.9, 15.8],
  [9.4, 11.8, 13.5, 15.1, 17.2],
  [10.6, 13.1, 14.8, 16.4, 18.4],
  [11.9, 14.5, 16.2, 17.8, 20.1],
];

function getHeatColor(tir: number) {
  if (tir < 10) return { bg: '#7F1D1D', text: '#FCA5A5' };
  if (tir < 12) return { bg: '#991B1B', text: '#FCA5A5' };
  if (tir < 14) return { bg: '#854F0B', text: '#FCD34D' };
  if (tir < 16) return { bg: '#166534', text: '#86EFAC' };
  return { bg: '#14532D', text: '#6EE7B7' };
}

// ─── WATERFALL DATA ──────────────────────────────
const WATERFALL_LABELS = [
  'Ingresos','OpEx / O&M','EBITDA',
  'Servicio deuda','FCLE','Capex mant.','FCL neto'
];
const WATERFALL_VALUES = [8.2,-2.1,6.1,-1.8,4.3,-0.4,3.9];
const WATERFALL_COLORS = WATERFALL_VALUES.map(v =>
  v >= 0 ? 'rgba(134,239,172,0.85)' : 'rgba(252,165,165,0.85)'
);

// ─── RADAR DATA ───────────────────────────────────
const RADAR_LABELS = [
  'Crecimiento\ningresos','Múltiplo\nsalida',
  'Factor\nde planta','Margen\nEBITDA',
  'WACC','Capex\nmant.'
];

// ─── IMPACTO DATA ─────────────────────────────────
const IMPACTO_LABELS = [
  'Múltiplo de salida','Crecimiento ingresos',
  'Factor de planta','Capex mantenimiento',
  'Margen EBITDA','WACC'
];
const IMPACTO_VALUES = [3.2, 2.8, 1.6, 0.2, 0.4, -0.2];
const IMPACTO_COLORS = IMPACTO_VALUES.map(v =>
  v > 0.5 ? 'rgba(184,134,11,0.85)'
  : v < 0 ? 'rgba(147,197,253,0.85)'
  : 'rgba(74,96,112,0.85)'
);

const chartDefaults = {
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#0A2240',
      titleColor: '#F8F5F0',
      bodyColor: '#8AAABB',
      borderColor: '#1E3A5A',
      borderWidth: 1,
    }
  },
  scales: {
    x: {
      ticks: { color: '#8AAABB', font: { size: 11 } },
      grid: { color: '#1E3A5A' },
      border: { color: '#1E3A5A' }
    },
    y: {
      ticks: { color: '#8AAABB', font: { size: 11 } },
      grid: { color: '#1E3A5A' },
      border: { color: '#1E3A5A' }
    }
  }
};

const Nivel2DDPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeDeal, setActiveDeal] = useState('solar');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<null|{titulo:string,frag:string,tag:string}>(null);

  const handleSearch = (queryOverride?: string) => {
    const q = (queryOverride ?? searchQuery).toLowerCase();
    if (q.includes('ppa') || q.includes('contrato')) {
      setSearchResult({
        titulo: 'Contrato_PPA_REDACTED.pdf · Página 12',
        tag: 'Legal',
        frag: '...el vendedor de energía se compromete a vender el 100% de la energía generada por el Proyecto al comprador durante el término del contrato (15 años), con exclusividad geográfica en el departamento de Córdoba. El precio base es USD 42/MWh indexado al CPI de Estados Unidos...'
      });
    } else if (q.includes('factor') || q.includes('planta')) {
      setSearchResult({
        titulo: 'Informe_Interventoria_Tecnica_2024.pdf · Página 34',
        tag: 'Técnico',
        frag: '...el factor de planta registrado durante enero-diciembre 2024 fue de 22.3%, consistente con las mediciones de irradiación solar NASA POWER para Córdoba (rango histórico 20.1%-23.8%). El modelo financiero del vendedor asume 26%, un 16% por encima del histórico registrado...'
      });
    } else if (q.includes('anla') || q.includes('licencia')) {
      setSearchResult({
        titulo: 'Licencia_Ambiental_ANLA_2021.pdf · Página 3',
        tag: 'ESG',
        frag: '...la Autoridad Nacional de Licencias Ambientales otorga licencia ambiental al Proyecto Solar Córdoba por un período de 25 años a partir del 15 de marzo de 2021, sujeto al cumplimiento del Plan de Manejo Ambiental establecido en el Anexo 2 de la presente resolución...'
      });
    } else {
      setSearchResult(null);
    }
  };

  const sLabel = (text: string) => (
    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2,
      textTransform: 'uppercase', color: copper, marginBottom: 12 }}>
      {text}
    </div>
  );

  const kpi = (label: string, value: string, sub: string,
    valueColor = '#F8F5F0') => (
    <div style={{ background: dark, border: `1px solid ${border}`,
      borderRadius: 4, padding: '14px 16px' }}>
      <div style={{ fontSize: 11, color: '#4A6070',
        textTransform: 'uppercase', letterSpacing: 1,
        marginBottom: 6 }}>{label}</div>
      <div style={{ fontFamily: 'Georgia, serif', fontSize: 30,
        fontWeight: 700, color: valueColor, lineHeight: 1,
        marginBottom: 4 }}>{value}</div>
      <div style={{ fontSize: 11, color: '#4A6070' }}>{sub}</div>
    </div>
  );

  const badge = (text: string, bg: string, color: string) => (
    <span style={{ display: 'inline-block', fontSize: 10,
      fontWeight: 700, padding: '2px 8px', borderRadius: 2,
      background: bg, color }}>{text}</span>
  );

  // ── DASHBOARD ────────────────────────────────────
  const renderDashboard = () => (
    <div style={{ padding: '20px 24px', overflowY: 'auto', flex: 1 }}>
      <div style={{ display: 'grid',
        gridTemplateColumns: 'repeat(4,1fr)', gap: 12,
        marginBottom: 20 }}>
        {kpi('Deals en DD activo', '3', 'Fondo Andino III')}
        {kpi('Documentos procesados', '147', 'Data room indexado')}
        {kpi('Preguntas abiertas', '23', '8 vencidas hoy', '#FCA5A5')}
        {kpi('Memos generados', '1', 'Solar Córdoba · Borrador')}
      </div>

      {sLabel('Deals activos — Estado por frente')}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {[
          {
            name: 'Proyecto Solar Córdoba', sub: 'Colombia · ~USD 55M · Energía renovable',
            status: 'DD en curso', statusBg: 'rgba(184,134,11,0.15)', statusColor: '#B8860B',
            frentes: [
              { label: 'Financiero', status: 'En revisión', color: '#FCD34D', note: '3 supuestos agresivos' },
              { label: 'Técnico', status: 'Completo', color: '#86EFAC', note: 'Sin hallazgos críticos' },
              { label: 'Legal', status: 'Pendiente', color: '#FCA5A5', note: 'PPA bajo NDA' },
              { label: 'ESG', status: 'Sin respuesta', color: '#FCA5A5', note: 'ANLA vencida 3 días' },
            ]
          },
          {
            name: 'Puerto Callao Logística', sub: 'Perú · ~USD 40M · Logística',
            status: 'Screening', statusBg: 'rgba(147,197,253,0.1)', statusColor: '#93C5FD',
            frentes: [
              { label: 'Financiero', status: 'No iniciado', color: '#4A6070', note: '' },
              { label: 'Técnico', status: 'No iniciado', color: '#4A6070', note: '' },
              { label: 'Legal', status: 'En revisión', color: '#FCD34D', note: 'Estructura propiedad' },
              { label: 'ESG', status: 'No iniciado', color: '#4A6070', note: '' },
            ]
          },
        ].map((deal, i) => (
          <div key={i} style={{ background: dark,
            border: `1px solid ${border}`, borderRadius: 4,
            padding: 16, cursor: 'pointer' }}
            onClick={() => { setActiveDeal('solar'); setActiveTab('financiero'); }}>
            <div style={{ display: 'flex', alignItems: 'center',
              justifyContent: 'space-between', marginBottom: 12 }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600,
                  color: '#F8F5F0', marginBottom: 3 }}>{deal.name}</div>
                <div style={{ fontSize: 11, color: '#4A6070' }}>{deal.sub}</div>
              </div>
              {badge(deal.status, deal.statusBg, deal.statusColor)}
            </div>
            <div style={{ display: 'grid',
              gridTemplateColumns: 'repeat(4,1fr)', gap: 8 }}>
              {deal.frentes.map((f, j) => (
                <div key={j} style={{ background: navy,
                  borderRadius: 3, padding: '10px 12px' }}>
                  <div style={{ fontSize: 9, color: '#4A6070',
                    textTransform: 'uppercase', letterSpacing: 1,
                    marginBottom: 5 }}>{f.label}</div>
                  <div style={{ display: 'flex', alignItems: 'center',
                    gap: 6 }}>
                    <div style={{ width: 8, height: 8,
                      borderRadius: '50%', background: f.color,
                      flexShrink: 0 }} />
                    <div style={{ fontSize: 11, color: f.color,
                      fontWeight: 600 }}>{f.status}</div>
                  </div>
                  {f.note && (
                    <div style={{ fontSize: 10, color: '#4A6070',
                      marginTop: 3 }}>{f.note}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // ── FINANCIERO ───────────────────────────────────
  const renderFinanciero = () => (
    <div style={{ padding: '20px 24px', overflowY: 'auto', flex: 1 }}>

      {/* KPIs */}
      <div style={{ display: 'grid',
        gridTemplateColumns: 'repeat(4,1fr)', gap: 12,
        marginBottom: 24 }}>
        {kpi('TIR modelo vendedor', '18.4%',
          'Sobre objetivo del fondo', '#FCA5A5')}
        {kpi('TIR caso base ajustado', '13.1%',
          'Con supuestos de mercado', '#FCD34D')}
        {kpi('TIR caso pesimista', '9.1%',
          'Bajo hurdle rate', '#FCA5A5')}
        {kpi('Hurdle rate fondo', '12.0%',
          'Mínimo requerido', '#6A8AAA')}
      </div>

      <div style={{ display: 'grid',
        gridTemplateColumns: '1fr 1fr', gap: 16,
        marginBottom: 20 }}>

        {/* WATERFALL */}
        <div style={{ background: dark,
          border: `1px solid ${border}`,
          borderRadius: 4, padding: 16 }}>
          {sLabel('Cascada de valor — Año 5 (USD M)')}
          <div style={{ height: 220 }}>
            <Bar
              data={{
                labels: WATERFALL_LABELS,
                datasets: [{
                  data: WATERFALL_VALUES,
                  backgroundColor: WATERFALL_COLORS,
                  borderRadius: 2,
                }]
              }}
              options={{
                ...chartDefaults,
                indexAxis: 'y' as const,
                plugins: {
                  ...chartDefaults.plugins,
                  tooltip: {
                    ...chartDefaults.plugins.tooltip,
                    callbacks: {
                      label: (ctx: { raw: number }) =>
                        ` USD ${ctx.raw}M`
                    }
                  }
                },
                scales: {
                  x: {
                    ...chartDefaults.scales.x,
                    ticks: {
                      ...chartDefaults.scales.x.ticks,
                      callback: (v: number) => `$${v}M`
                    }
                  },
                  y: { ...chartDefaults.scales.y }
                }
              }}
            />
          </div>
        </div>

        {/* RADAR */}
        <div style={{ background: dark,
          border: `1px solid ${border}`,
          borderRadius: 4, padding: 16 }}>
          {sLabel('Supuestos vs benchmark LatAm')}
          <div style={{ height: 220 }}>
            <Radar
              data={{
                labels: RADAR_LABELS,
                datasets: [
                  {
                    label: 'Modelo vendedor',
                    data: [90, 95, 85, 65, 40, 55],
                    borderColor: copper,
                    backgroundColor: `${copper}22`,
                    pointBackgroundColor: copper,
                    borderWidth: 2,
                  },
                  {
                    label: 'Benchmark LatAm',
                    data: [50, 50, 50, 60, 50, 50],
                    borderColor: '#6A8AAA',
                    backgroundColor: 'rgba(106,138,170,0.1)',
                    pointBackgroundColor: '#6A8AAA',
                    borderWidth: 1.5,
                  }
                ]
              }}
              options={{
                plugins: {
                  legend: {
                    display: true,
                    labels: {
                      color: '#8AAABB',
                      font: { size: 11 },
                      boxWidth: 12,
                    }
                  },
                  tooltip: chartDefaults.plugins.tooltip,
                },
                scales: {
                  r: {
                    ticks: { display: false },
                    grid: { color: border },
                    angleLines: { color: border },
                    pointLabels: {
                      color: '#8AAABB',
                      font: { size: 10 }
                    },
                    suggestedMin: 0,
                    suggestedMax: 100,
                  }
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* HEATMAP */}
      <div style={{ background: dark, border: `1px solid ${border}`,
        borderRadius: 4, padding: 16, marginBottom: 16 }}>
        {sLabel('Heatmap de sensibilidades — TIR del equity (%)')}
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', gap: 8,
              marginBottom: 4, paddingLeft: 80 }}>
              {MULTIPLES.map(m => (
                <div key={m} style={{ flex: 1, textAlign: 'center',
                  fontSize: 10, color: '#4A6070',
                  textTransform: 'uppercase' }}>
                  {m}
                </div>
              ))}
            </div>
            <div style={{ fontSize: 9, color: '#4A6070',
              textTransform: 'uppercase', letterSpacing: 1,
              marginBottom: 6, paddingLeft: 80 }}>
              ← Múltiplo de salida EV/EBITDA
            </div>
            {HEATMAP.map((row, ri) => (
              <div key={ri} style={{ display: 'flex',
                alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <div style={{ width: 72, textAlign: 'right',
                  fontSize: 11, color: '#6A8AAA', flexShrink: 0,
                  paddingRight: 8 }}>
                  {CRECIMIENTOS[ri]}
                </div>
                {row.map((tir, ci) => {
                  const { bg, text } = getHeatColor(tir);
                  const isVendedor = ri === 3 && ci === 4;
                  const enRango = tir >= 12 && tir <= 16;
                  return (
                    <div key={ci} style={{
                      flex: 1, height: 44,
                      background: bg,
                      borderRadius: 3,
                      display: 'flex', alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'column',
                      border: isVendedor
                        ? '2px solid #F8F5F0'
                        : enRango
                        ? `2px solid ${copper}`
                        : '2px solid transparent',
                      position: 'relative',
                    }}>
                      <div style={{ fontSize: 13, fontWeight: 700,
                        color: text }}>{tir}%</div>
                      {isVendedor && (
                        <div style={{ fontSize: 8, color: '#F8F5F0',
                          opacity: 0.8 }}>vendedor</div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
            <div style={{ paddingLeft: 80, marginTop: 8,
              fontSize: 9, color: '#4A6070',
              textTransform: 'uppercase', letterSpacing: 1 }}>
              Crecimiento de ingresos ↑
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column',
            gap: 6, flexShrink: 0, paddingTop: 28 }}>
            {[
              { bg: '#7F1D1D', text: '#FCA5A5', label: '< 10% — Bajo hurdle' },
              { bg: '#991B1B', text: '#FCA5A5', label: '10-12% — Bajo hurdle' },
              { bg: '#854F0B', text: '#FCD34D', label: '12-14% — En rango' },
              { bg: '#166534', text: '#86EFAC', label: '14-16% — Sobre obj.' },
              { bg: '#14532D', text: '#6EE7B7', label: '> 16% — Irreal' },
            ].map((l, i) => (
              <div key={i} style={{ display: 'flex',
                alignItems: 'center', gap: 6 }}>
                <div style={{ width: 16, height: 16,
                  background: l.bg, borderRadius: 2,
                  flexShrink: 0 }} />
                <div style={{ fontSize: 10, color: l.text,
                  whiteSpace: 'nowrap' }}>{l.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* IMPACTO */}
      <div style={{ background: dark, border: `1px solid ${border}`,
        borderRadius: 4, padding: 16 }}>
        {sLabel('Descomposición del exceso de TIR vs benchmark (+6.4pp)')}
        <div style={{ height: 200 }}>
          <Bar
            data={{
              labels: IMPACTO_LABELS,
              datasets: [{
                data: IMPACTO_VALUES,
                backgroundColor: IMPACTO_COLORS,
                borderRadius: 2,
              }]
            }}
            options={{
              ...chartDefaults,
              indexAxis: 'y' as const,
              plugins: {
                ...chartDefaults.plugins,
                tooltip: {
                  ...chartDefaults.plugins.tooltip,
                  callbacks: {
                    label: (ctx: { raw: number }) =>
                      ` ${ctx.raw > 0 ? '+' : ''}${ctx.raw}pp`
                  }
                }
              },
              scales: {
                x: {
                  ...chartDefaults.scales.x,
                  ticks: {
                    ...chartDefaults.scales.x.ticks,
                    callback: (v: number) =>
                      `${Number(v) > 0 ? '+' : ''}${v}pp`
                  }
                },
                y: { ...chartDefaults.scales.y }
              }
            }}
          />
        </div>
        <div style={{ marginTop: 10, padding: '10px 14px',
          background: 'rgba(184,134,11,0.08)',
          border: '1px solid rgba(184,134,11,0.2)',
          borderRadius: 4, fontSize: 12, color: copper,
          lineHeight: 1.6 }}>
          El exceso de TIR del modelo del vendedor (18.4% vs.
          hurdle 12%) se explica en un 98% por tres supuestos:
          múltiplo de salida agresivo (+3.2pp), crecimiento de
          ingresos sin soporte contractual (+2.8pp), y factor
          de planta sin verificación histórica (+1.6pp).
        </div>
      </div>
    </div>
  );

  // ── DATA ROOM ─────────────────────────────────────
  const renderDataRoom = () => (
    <div style={{ padding: '20px 24px', overflowY: 'auto', flex: 1 }}>
      <div style={{ position: 'relative', marginBottom: 16 }}>
        <input
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSearch()}
          placeholder='Busca en los 147 documentos — ej: "¿qué dice el PPA sobre exclusividad?" o "factor de planta histórico"'
          style={{ width: '100%', padding: '12px 140px 12px 16px',
            background: dark, border: `1px solid ${border}`,
            borderRadius: 4, color: '#F8F5F0', fontSize: 13,
            fontFamily: 'Inter, sans-serif', outline: 'none' }}
          onFocus={e => { e.target.style.borderColor = copper; }}
          onBlur={e => { e.target.style.borderColor = border; }}
        />
        <button
          onClick={() => handleSearch()}
          style={{ position: 'absolute', right: 8,
            top: '50%', transform: 'translateY(-50%)',
            padding: '7px 16px', background: copper,
            border: 'none', borderRadius: 3, fontSize: 12,
            fontWeight: 700, color: navy, cursor: 'pointer',
            fontFamily: 'Inter, sans-serif' }}>
          Buscar
        </button>
      </div>

      {searchResult ? (
        <div style={{ marginBottom: 16 }}>
          {sLabel('Resultado más relevante')}
          <div style={{ background: dark,
            border: `1px solid ${copper}`,
            borderRadius: 4, padding: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center',
              gap: 8, marginBottom: 10 }}>
              <span style={{ fontSize: 9, fontWeight: 700,
                padding: '2px 6px',
                background: 'rgba(250,204,21,0.1)',
                color: '#FCD34D', borderRadius: 2 }}>
                {searchResult.tag}
              </span>
              <span style={{ fontSize: 13, fontWeight: 600,
                color: '#C8D8E8' }}>{searchResult.titulo}</span>
            </div>
            <div style={{ fontSize: 13, color: '#6A8AAA',
              lineHeight: 1.75, fontStyle: 'italic' }}>
              "{searchResult.frag}"
            </div>
          </div>
        </div>
      ) : (
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 10, color: '#4A6070',
            textTransform: 'uppercase', letterSpacing: 1,
            marginBottom: 8 }}>
            Sugerencias de búsqueda
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {['PPA exclusividad', 'factor de planta histórico',
              'licencia ANLA', 'O&M garantías',
              'cláusula reversión'].map(s => (
              <button key={s}
                onClick={() => {
                  setSearchQuery(s);
                  handleSearch(s);
                }}
                style={{ padding: '5px 12px',
                  background: dark,
                  border: `1px solid ${border}`,
                  borderRadius: 3, fontSize: 11,
                  color: '#6A8AAA', cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif' }}>
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {sLabel('Documentos en el data room')}
      <div style={{ display: 'flex', flexDirection: 'column',
        gap: 6 }}>
        {[
          { icon: 'XLS', name: 'ModeloFinanciero_SC_v3.xlsx',
            meta: 'Financiero · 15 tabs · Analizado automáticamente',
            tag: 'Analizado', tagBg: 'rgba(134,239,172,0.1)',
            tagColor: '#86EFAC' },
          { icon: 'PDF', name: 'Informe_Interventoria_Tecnica_2024.pdf',
            meta: 'Técnico · 84 páginas · Indexado',
            tag: 'Indexado', tagBg: 'rgba(147,197,253,0.1)',
            tagColor: '#93C5FD' },
          { icon: 'PDF', name: 'Contrato_PPA_REDACTED.pdf',
            meta: 'Legal · Bajo NDA · Acceso restringido',
            tag: 'Restringido', tagBg: 'rgba(250,204,21,0.1)',
            tagColor: '#FCD34D' },
          { icon: 'PDF', name: 'Licencia_Ambiental_ANLA_2021.pdf',
            meta: 'ESG · Vigente hasta 2031 · Indexado',
            tag: 'Indexado', tagBg: 'rgba(249,168,212,0.1)',
            tagColor: '#F9A8D4' },
          { icon: 'PDF', name: 'Contrato_OyM_Operador_Local.pdf',
            meta: 'Legal · Firmado · Indexado · Respondida',
            tag: 'Indexado', tagBg: 'rgba(147,197,253,0.1)',
            tagColor: '#93C5FD' },
        ].map((doc, i) => (
          <div key={i} style={{ display: 'flex',
            alignItems: 'center', gap: 10, padding: '10px 12px',
            background: dark, border: `1px solid ${border}`,
            borderRadius: 4 }}>
            <div style={{ width: 32, height: 32, background: border,
              borderRadius: 3, display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              fontSize: 9, color: copper, fontWeight: 700,
              flexShrink: 0 }}>{doc.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, color: '#C8D8E8' }}>
                {doc.name}
              </div>
              <div style={{ fontSize: 10, color: '#4A6070' }}>
                {doc.meta}
              </div>
            </div>
            <span style={{ fontSize: 9, fontWeight: 700,
              padding: '2px 7px', borderRadius: 2,
              background: doc.tagBg, color: doc.tagColor,
              flexShrink: 0 }}>{doc.tag}</span>
          </div>
        ))}
      </div>
    </div>
  );

  // ── PREGUNTAS ─────────────────────────────────────
  const renderPreguntas = () => (
    <div style={{ padding: '20px 24px', overflowY: 'auto', flex: 1 }}>
      <div style={{ display: 'grid',
        gridTemplateColumns: 'repeat(3,1fr)', gap: 10,
        marginBottom: 20 }}>
        {kpi('Vencidas', '8', 'Sin respuesta del vendedor', '#FCA5A5')}
        {kpi('Pendientes', '11', 'Dentro del plazo', '#FCD34D')}
        {kpi('Respondidas', '24', 'Satisfactorias', '#86EFAC')}
      </div>
      {sLabel('Tracker de preguntas al vendedor')}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {[
          {
            q: '¿Puede confirmar por escrito la identidad de la contraparte del PPA y compartir el contrato completo bajo NDA?',
            frente: 'Legal', enviada: 'Mar 10',
            limite: 'Mar 13', estado: 'Vencida',
            estadoColor: '#FCA5A5', note: 'Sin respuesta · 3 días vencida',
            borderColor: '#FCA5A5'
          },
          {
            q: 'Adjuntar el Plan de Manejo Ambiental vigente y el último informe de cumplimiento ante ANLA.',
            frente: 'ESG', enviada: 'Mar 11',
            limite: 'Mar 14', estado: 'Vencida',
            estadoColor: '#FCA5A5', note: 'Sin respuesta · 2 días vencida',
            borderColor: '#FCA5A5'
          },
          {
            q: '¿En qué se basa el crecimiento de ingresos del 9.8% real anual? ¿Hay contratos firmados o es proyección de mercado?',
            frente: 'Financiero', enviada: 'Mar 13',
            limite: 'Mar 17', estado: 'Pendiente',
            estadoColor: '#FCD34D', note: 'Plazo: 1 día',
            borderColor: '#FCD34D'
          },
          {
            q: '¿Cuál es el factor de planta histórico de los últimos 3 años? El modelo asume 26% — ¿hay mediciones de irradiación que lo soporten?',
            frente: 'Técnico', enviada: 'Mar 14',
            limite: 'Mar 18', estado: 'Pendiente',
            estadoColor: '#FCD34D', note: 'Plazo: 2 días',
            borderColor: '#FCD34D'
          },
          {
            q: '¿Cuál es el contrato de O&M vigente? ¿Incluye garantías de disponibilidad y penalidades al operador?',
            frente: 'Legal', enviada: 'Mar 9',
            limite: 'Mar 12', estado: 'Respondida',
            estadoColor: '#86EFAC',
            note: 'Respuesta recibida Mar 12 · Satisfactoria',
            borderColor: '#86EFAC'
          },
        ].map((item, i) => (
          <div key={i} style={{ background: dark,
            border: `1px solid ${border}`,
            borderLeft: `3px solid ${item.borderColor}`,
            borderRadius: '0 4px 4px 0', padding: '14px 16px' }}>
            <div style={{ display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between', marginBottom: 8 }}>
              <div style={{ fontSize: 13, fontWeight: 600,
                color: '#C8D8E8', flex: 1, marginRight: 12,
                lineHeight: 1.5 }}>{item.q}</div>
              {badge(item.estado,
                `${item.estadoColor}22`, item.estadoColor)}
            </div>
            <div style={{ display: 'flex', gap: 16,
              fontSize: 10, color: '#4A6070' }}>
              <span>Frente: {item.frente}</span>
              <span>Enviada: {item.enviada}</span>
              <span>Límite: {item.limite}</span>
              <span style={{ color: item.estadoColor }}>
                {item.note}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // ── MEMO ──────────────────────────────────────────
  const renderMemo = () => (
    <div style={{ padding: '20px 24px', overflowY: 'auto', flex: 1 }}>
      <div style={{ display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', marginBottom: 16 }}>
        {sLabel('Investment Memo — Borrador para IC')}
        <div style={{ display: 'flex', gap: 8 }}>
          {badge('Generado por IA · Requiere revisión del equipo',
            'rgba(249,168,212,0.1)', '#F9A8D4')}
        </div>
      </div>
      <div style={{ display: 'grid',
        gridTemplateColumns: '1fr 1fr', gap: 10,
        marginBottom: 16 }}>
        {kpi('Deal', 'Solar Córdoba', 'Colombia · Energía renovable')}
        {kpi('Ticket Ashmore', '~USD 55M', 'Participación de control')}
        {kpi('TIR ajustada', '13.1%', 'Con supuestos de mercado', '#FCD34D')}
        {kpi('IC recomendado', 'Condicional', '2 condiciones previas', '#FCD34D')}
      </div>
      {[
        {
          num: '1', titulo: 'Resumen ejecutivo',
          texto: 'Proyecto Solar Córdoba es un parque solar fotovoltaico de 80 MW-dc en Montería, Colombia, en operación desde enero 2022. El activo tiene un PPA de 40 MW con contraparte no divulgada (bajo NDA) a USD 42/MWh indexado a inflación USA por 15 años. La energía restante se vende en la bolsa XM a precio spot. Ashmore evalúa un ticket de ~USD 55M por una participación de control.'
        },
        {
          num: '2', titulo: 'Análisis financiero',
          texto: 'El modelo del vendedor muestra una TIR del equity de 18.4% USD — materialmente por encima del objetivo del Fondo III (12-16%). El análisis de supuestos identifica tres variables agresivas: crecimiento de ingresos de 9.8% real (benchmark: 3-8%), múltiplo de salida de 12.5x EV/EBITDA (benchmark: 7-10x), y factor de planta de 26% sin soporte histórico. Ajustando las tres variables al caso base razonable, la TIR converge a 11.2-13.1% dependiendo del escenario de salida.'
        },
        {
          num: '3', titulo: 'Riesgos principales',
          texto: 'Cuatro riesgos requieren resolución antes del IC: (1) Identidad de la contraparte del PPA — el 50% de los ingresos depende de un contrato cuya contraparte permanece bajo NDA. (2) Factor de planta no verificado — el supuesto del 26% no tiene soporte histórico de irradiación. (3) Plan de manejo ambiental — ANLA no ha sido confirmada para el período post-2024. (4) Múltiplo de salida — la valoración requiere un mercado de compradores a 2034 a múltiplos de 12.5x.'
        },
        {
          num: '4', titulo: 'Recomendación',
          texto: 'CONTINUAR EL DD CON CONDICIÓN: el vendedor debe (1) revelar la identidad de la contraparte del PPA bajo NDA extendido y (2) proporcionar el historial de factor de planta de los últimos 3 años con soporte de mediciones de irradiación, antes de la sesión del IC. Sin esta información, la valoración no puede confirmarse.',
          highlight: true
        },
      ].map((sec, i) => (
        <div key={i} style={{
          background: dark,
          border: `1px solid ${border}`,
          borderLeft: `3px solid ${copper}`,
          borderRadius: '0 4px 4px 0',
          padding: '14px 16px', marginBottom: 10,
          ...(sec.highlight ? {
            background: 'rgba(184,134,11,0.06)',
            borderLeft: `3px solid ${copper}`
          } : {})
        }}>
          <div style={{ fontSize: 10, color: copper,
            textTransform: 'uppercase', letterSpacing: 1,
            marginBottom: 8 }}>
            {sec.num}. {sec.titulo}
          </div>
          <div style={{ fontSize: 13,
            color: sec.highlight ? '#FCD34D' : '#8AAABB',
            lineHeight: 1.75,
            fontWeight: sec.highlight ? 600 : 400 }}>
            {sec.texto}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div style={{ height: '100vh', display: 'flex',
      flexDirection: 'column', background: navy,
      fontFamily: 'Inter, sans-serif', overflow: 'hidden' }}>

      {/* HEADER */}
      <div style={{ height: 48, background: navy,
        borderBottom: `1px solid ${border}`,
        display: 'flex', alignItems: 'center',
        padding: '0 24px', flexShrink: 0, gap: 0 }}>
        <button
          onClick={() => navigate('/componente/evaluar-invertir')}
          style={{ fontSize: 12, color: '#4A6070',
            background: 'none', border: 'none',
            cursor: 'pointer', marginRight: 16,
            fontFamily: 'Inter, sans-serif' }}
          onMouseEnter={e => { e.currentTarget.style.color = '#8AAABB'; }}
          onMouseLeave={e => { e.currentTarget.style.color = '#4A6070'; }}>
          ← Volver
        </button>
        <div style={{ width: 1, height: 20,
          background: border, marginRight: 16 }} />
        <span style={{ fontFamily: 'Georgia, serif',
          fontSize: 15, fontWeight: 700,
          color: '#F8F5F0', marginRight: 8 }}>Ashmore</span>
        <span style={{ fontSize: 9, color: copper,
          letterSpacing: 2, textTransform: 'uppercase',
          marginRight: 20 }}>Colombia</span>
        <div style={{ width: 1, height: 20,
          background: border, marginRight: 20 }} />
        <span style={{ fontSize: 11, color: '#4A6070',
          letterSpacing: 2, textTransform: 'uppercase',
          flex: 1 }}>
          Centro de Control · Due Diligence · IA
        </span>
        <div style={{ fontSize: 10, fontWeight: 600,
          padding: '3px 10px',
          background: 'rgba(184,134,11,0.15)',
          color: copper, borderRadius: 2,
          border: '1px solid rgba(184,134,11,0.3)' }}>
          Nivel 2
        </div>
      </div>

      {/* TABS */}
      <div style={{ display: 'flex', background: dark,
        borderBottom: `1px solid ${border}`,
        padding: '0 24px', flexShrink: 0 }}>
        {TABS.map(tab => (
          <div key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{ padding: '12px 20px', fontSize: 13,
              fontWeight: 500, cursor: 'pointer',
              color: activeTab === tab.id
                ? '#F8F5F0' : '#4A6070',
              borderBottom: `2px solid ${activeTab === tab.id
                ? copper : 'transparent'}`,
              display: 'flex', alignItems: 'center',
              gap: 8, transition: 'all 0.15s',
              whiteSpace: 'nowrap' }}>
            <span style={{ display: 'inline-block',
              width: 7, height: 7, borderRadius: '50%',
              background: tab.color }} />
            {tab.label}
          </div>
        ))}
      </div>

      {/* CONTENT */}
      <div style={{ flex: 1, overflow: 'hidden',
        display: 'flex', flexDirection: 'column' }}>
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'financiero' && renderFinanciero()}
        {activeTab === 'dataroom' && renderDataRoom()}
        {activeTab === 'preguntas' && renderPreguntas()}
        {activeTab === 'memo' && renderMemo()}
      </div>
    </div>
  );
};

export default Nivel2DDPage;
