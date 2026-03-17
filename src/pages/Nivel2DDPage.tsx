import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, BarElement,
  LineController, PointElement, LineElement, Filler,
  Tooltip, Legend
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale, LinearScale, BarElement,
  LineController, PointElement, LineElement, Filler,
  Tooltip, Legend
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
  const renderFinanciero = () => {

    const anos = ['2022','2023','2024','2025',
      '2026','2027','2028','2029','2030','2031'];

    // FCLE por año (USD M) — curva J típica
    const fclData = [
      -55, -4.2, 3.1, 3.8, 4.3, 5.1,
      5.9, 6.8, 7.4, 72.3
    ];

    // Línea de capital acumulado invertido
    const capitalAcumulado = [
      55, 59.2, 56.1, 52.3, 48.0,
      42.9, 37.0, 30.2, 22.8, 0
    ];

    // BRIDGE TIR
    const bridgeLabels = [
      'Punto de\npartida',
      'EBITDA\noperativo',
      'Reducción\ndeuda',
      'Crecimiento\ncontractual',
      'Expansión\nmúltiplo',
      'TIR\ntotal'
    ];
    const bridgeBase =  [0,    8.0,  8.0,  8.0,  11.2, 0];
    const bridgeDelta = [8.0,  3.2,  2.4,  3.2,  1.6,  0];
    const bridgeFinal = [0,    0,    0,    0,    0,  18.4];

    // ESCENARIOS
    const escenarios = [
      {
        nombre: 'Pesimista',
        color: '#FCA5A5',
        bg: 'rgba(239,68,68,0.08)',
        border: 'rgba(239,68,68,0.3)',
        tir: '9.1%',
        moic: '1.6x',
        dpi5: '0.3x',
        breakeven: 'Año 8',
        supuestos: [
          'Crecimiento ingresos: 4% real',
          'Múltiplo salida: 6x EV/EBITDA',
          'Factor de planta: 20%',
          'PPA no renovado al vencimiento',
        ],
        tirNum: 9.1,
        aboveHurdle: false,
      },
      {
        nombre: 'Base Ashmore',
        color: '#FCD34D',
        bg: 'rgba(184,134,11,0.08)',
        border: 'rgba(184,134,11,0.5)',
        tir: '13.1%',
        moic: '2.4x',
        dpi5: '0.6x',
        breakeven: 'Año 6',
        supuestos: [
          'Crecimiento ingresos: 6% real',
          'Múltiplo salida: 8x EV/EBITDA',
          'Factor de planta: 22%',
          'PPA renovado en términos similares',
        ],
        tirNum: 13.1,
        aboveHurdle: true,
      },
      {
        nombre: 'Modelo vendedor',
        color: '#FCA5A5',
        bg: 'rgba(239,68,68,0.05)',
        border: 'rgba(239,68,68,0.2)',
        tir: '18.4%',
        moic: '3.8x',
        dpi5: '0.9x',
        breakeven: 'Año 5',
        supuestos: [
          'Crecimiento ingresos: 9.8% real',
          'Múltiplo salida: 12.5x EV/EBITDA',
          'Factor de planta: 26%',
          'PPA renovado con upside de precio',
        ],
        tirNum: 18.4,
        aboveHurdle: false,
      },
    ];

    // TABLA DE SUPUESTOS
    const supuestos = [
      {
        nombre: 'Múltiplo de salida EV/EBITDA',
        modelo: '12.5x', min: '7x', max: '10x',
        delta: '+2.5x - +5.5x',
        impacto: '+3.2pp TIR',
        status: 'rojo',
        celda: 'Tab Salida · F8',
      },
      {
        nombre: 'Crecimiento de ingresos (real anual)',
        modelo: '9.8%', min: '3%', max: '8%',
        delta: '+1.8pp - +6.8pp',
        impacto: '+2.8pp TIR',
        status: 'rojo',
        celda: 'Tab Ingresos · C14',
      },
      {
        nombre: 'Factor de planta (capacity factor)',
        modelo: '26%', min: '20%', max: '24%',
        delta: '+2pp - +6pp',
        impacto: '+1.6pp TIR',
        status: 'rojo',
        celda: 'Tab Técnico · B22',
      },
      {
        nombre: 'Margen EBITDA operativo',
        modelo: '68%', min: '45%', max: '75%',
        delta: '-7pp - +23pp',
        impacto: '+0.4pp TIR',
        status: 'amarillo',
        celda: 'Tab P&L · D45',
      },
      {
        nombre: 'WACC aplicado',
        modelo: '9.5%', min: '9%', max: '12%',
        delta: '+0.5pp - -2.5pp',
        impacto: '-0.2pp TIR',
        status: 'verde',
        celda: 'Tab WACC · B5',
      },
      {
        nombre: 'Capex de mantenimiento',
        modelo: '2.1%', min: '2%', max: '5%',
        delta: '-0.1pp - +2.9pp',
        impacto: '+0.2pp TIR',
        status: 'verde',
        celda: 'Tab Capex · E12',
      },
    ];

    const statusStyle = (s: string) => ({
      rojo: { bg: 'rgba(239,68,68,0.1)', color: '#FCA5A5', label: 'Agresivo' },
      amarillo: { bg: 'rgba(250,204,21,0.1)', color: '#FCD34D', label: 'En línea' },
      verde: { bg: 'rgba(34,197,94,0.1)', color: '#86EFAC', label: 'Conservador' },
    }[s] || { bg: '', color: '', label: '' });

    return (
      <div style={{ padding: '20px 24px',
        overflowY: 'auto', flex: 1 }}>

        {/* ── KPIs ── */}
        <div style={{ display: 'grid',
          gridTemplateColumns: 'repeat(4,1fr)',
          gap: 12, marginBottom: 24 }}>
          {[
            { label: 'TIR modelo vendedor', val: '18.4%',
              sub: 'Sobre objetivo del fondo',
              color: '#FCA5A5' },
            { label: 'TIR base Ashmore', val: '13.1%',
              sub: 'Con supuestos de mercado',
              color: '#FCD34D' },
            { label: 'TIR caso pesimista', val: '9.1%',
              sub: 'Bajo hurdle rate',
              color: '#FCA5A5' },
            { label: 'Hurdle rate fondo', val: '12.0%',
              sub: 'Mínimo requerido',
              color: '#6A8AAA' },
          ].map((k,i) => (
            <div key={i} style={{ background: dark,
              border: `1px solid ${border}`,
              borderRadius: 4, padding: '14px 16px' }}>
              <div style={{ fontSize: 11, color: '#4A6070',
                textTransform: 'uppercase', letterSpacing: 1,
                marginBottom: 6 }}>{k.label}</div>
              <div style={{ fontFamily: 'Georgia, serif',
                fontSize: 30, fontWeight: 700,
                color: k.color, lineHeight: 1,
                marginBottom: 4 }}>{k.val}</div>
              <div style={{ fontSize: 11,
                color: '#4A6070' }}>{k.sub}</div>
            </div>
          ))}
        </div>

        {/* ── FILA 1: Perfil de FCL + Bridge TIR ── */}
        <div style={{ display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: 16, marginBottom: 16 }}>

          {/* Perfil de flujos de caja */}
          <div style={{ background: dark,
            border: `1px solid ${border}`,
            borderRadius: 4, padding: 16 }}>
            <div style={{ fontSize: 10, fontWeight: 700,
              letterSpacing: 2, textTransform: 'uppercase',
              color: copper, marginBottom: 4 }}>
              Perfil de flujos de caja al equity (USD M)
            </div>
            <div style={{ fontSize: 11, color: '#4A6070',
              marginBottom: 12 }}>
              Inversión inicial + distribuciones + desinversión año 10
            </div>
            <div style={{ height: 200 }}>
              <Bar
                data={{
                  labels: anos,
                  datasets: [
                    {
                      type: 'bar' as const,
                      label: 'FCLE',
                      data: fclData,
                      backgroundColor: fclData.map(v =>
                        v >= 0
                          ? 'rgba(134,239,172,0.8)'
                          : 'rgba(252,165,165,0.8)'
                      ),
                      borderRadius: 2,
                      yAxisID: 'y',
                    },
                    {
                      type: 'line' as const,
                      label: 'Capital en riesgo',
                      data: capitalAcumulado,
                      borderColor: copper,
                      backgroundColor: 'transparent',
                      borderWidth: 2,
                      pointBackgroundColor: copper,
                      pointRadius: 3,
                      tension: 0.3,
                      yAxisID: 'y',
                    }
                  ]
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: true,
                      labels: {
                        color: '#8AAABB',
                        font: { size: 10 },
                        boxWidth: 10,
                      }
                    },
                    tooltip: {
                      backgroundColor: navy,
                      titleColor: '#F8F5F0',
                      bodyColor: '#8AAABB',
                      borderColor: border,
                      borderWidth: 1,
                      callbacks: {
                        label: (ctx: { raw: number }) =>
                          ` USD ${ctx.raw}M`
                      }
                    }
                  },
                  scales: {
                    x: {
                      ticks: { color: '#8AAABB',
                        font: { size: 10 } },
                      grid: { color: border },
                      border: { color: border }
                    },
                    y: {
                      ticks: {
                        color: '#8AAABB',
                        font: { size: 10 },
                        callback: (v: number) => `$${v}M`
                      },
                      grid: { color: border },
                      border: { color: border }
                    }
                  }
                }}
              />
            </div>
            <div style={{ marginTop: 10, padding: '8px 12px',
              background: 'rgba(184,134,11,0.06)',
              border: '1px solid rgba(184,134,11,0.15)',
              borderRadius: 3, fontSize: 11,
              color: '#8AAABB', lineHeight: 1.6 }}>
              El 78% del retorno del modelo se genera en el año 10
              por la desinversión (USD 72.3M). El activo es
              altamente dependiente del múltiplo de salida —
              no del flujo operativo.
            </div>
          </div>

          {/* Bridge TIR */}
          <div style={{ background: dark,
            border: `1px solid ${border}`,
            borderRadius: 4, padding: 16 }}>
            <div style={{ fontSize: 10, fontWeight: 700,
              letterSpacing: 2, textTransform: 'uppercase',
              color: copper, marginBottom: 4 }}>
              Construcción de la TIR
            </div>
            <div style={{ fontSize: 11, color: '#4A6070',
              marginBottom: 12 }}>
              De dónde viene cada punto porcentual
            </div>
            <div style={{ height: 200 }}>
              <Bar
                data={{
                  labels: bridgeLabels,
                  datasets: [
                    {
                      label: 'Base',
                      data: bridgeBase,
                      backgroundColor: 'transparent',
                      borderWidth: 0,
                      stack: 'stack',
                    },
                    {
                      label: 'Incremento',
                      data: bridgeDelta,
                      backgroundColor: bridgeDelta.map((_,i) =>
                        i === 0 ? 'rgba(106,138,170,0.8)' :
                        i === 4 ? 'rgba(252,165,165,0.8)' :
                        'rgba(134,239,172,0.8)'
                      ),
                      borderRadius: 2,
                      stack: 'stack',
                    },
                    {
                      label: 'Total',
                      data: bridgeFinal,
                      backgroundColor: 'rgba(184,134,11,0.85)',
                      borderRadius: 2,
                      stack: 'stack',
                    }
                  ]
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { display: false },
                    tooltip: {
                      backgroundColor: navy,
                      titleColor: '#F8F5F0',
                      bodyColor: '#8AAABB',
                      borderColor: border,
                      borderWidth: 1,
                      callbacks: {
                        label: (ctx: { raw: number }) =>
                          ctx.raw > 0
                            ? ` +${ctx.raw}pp`
                            : ''
                      }
                    }
                  },
                  scales: {
                    x: {
                      stacked: true,
                      ticks: { color: '#8AAABB',
                        font: { size: 10 } },
                      grid: { display: false },
                      border: { color: border }
                    },
                    y: {
                      stacked: true,
                      ticks: {
                        color: '#8AAABB',
                        font: { size: 10 },
                        callback: (v: number) => `${v}%`
                      },
                      grid: { color: border },
                      border: { color: border },
                      max: 22
                    }
                  }
                }}
              />
            </div>
            <div style={{ marginTop: 10, padding: '8px 12px',
              background: 'rgba(239,68,68,0.06)',
              border: '1px solid rgba(239,68,68,0.15)',
              borderRadius: 3, fontSize: 11,
              color: '#FCA5A5', lineHeight: 1.6 }}>
              Solo 8.0pp del retorno son operativos
              (EBITDA + reducción deuda). Los otros 10.4pp
              dependen de supuestos de crecimiento y salida
              no verificados.
            </div>
          </div>
        </div>

        {/* ── FILA 2: Escenarios ── */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 10, fontWeight: 700,
            letterSpacing: 2, textTransform: 'uppercase',
            color: copper, marginBottom: 12 }}>
            Análisis de escenarios
          </div>
          <div style={{ display: 'grid',
            gridTemplateColumns: 'repeat(3,1fr)',
            gap: 12 }}>
            {escenarios.map((esc, i) => (
              <div key={i} style={{
                background: esc.bg,
                border: `1px solid ${esc.border}`,
                borderRadius: 4, padding: 16,
                borderTop: `3px solid ${esc.color}`,
              }}>
                <div style={{ display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 14 }}>
                  <div style={{ fontSize: 13,
                    fontWeight: 700,
                    color: esc.color }}>
                    {esc.nombre}
                  </div>
                  <div style={{ fontSize: 9,
                    fontWeight: 700, padding: '2px 7px',
                    borderRadius: 2,
                    background: esc.aboveHurdle
                      ? 'rgba(134,239,172,0.15)'
                      : 'rgba(239,68,68,0.15)',
                    color: esc.aboveHurdle
                      ? '#86EFAC' : '#FCA5A5' }}>
                    {esc.aboveHurdle
                      ? '✓ Sobre hurdle'
                      : '✗ Bajo hurdle'}
                  </div>
                </div>

                <div style={{ display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 8, marginBottom: 14 }}>
                  {[
                    { label: 'TIR equity', val: esc.tir },
                    { label: 'MOIC', val: esc.moic },
                    { label: 'DPI año 5', val: esc.dpi5 },
                    { label: 'Break-even', val: esc.breakeven },
                  ].map((m, j) => (
                    <div key={j} style={{
                      background: 'rgba(7,27,51,0.6)',
                      borderRadius: 3,
                      padding: '8px 10px' }}>
                      <div style={{ fontSize: 9,
                        color: '#4A6070',
                        textTransform: 'uppercase',
                        letterSpacing: 1,
                        marginBottom: 3 }}>
                        {m.label}
                      </div>
                      <div style={{
                        fontFamily: 'Georgia, serif',
                        fontSize: j === 0 ? 22 : 16,
                        fontWeight: 700,
                        color: j === 0
                          ? esc.color : '#F8F5F0' }}>
                        {m.val}
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ borderTop:
                  `1px solid ${esc.border}`,
                  paddingTop: 10 }}>
                  <div style={{ fontSize: 9,
                    color: '#4A6070',
                    textTransform: 'uppercase',
                    letterSpacing: 1, marginBottom: 6 }}>
                    Supuestos clave
                  </div>
                  {esc.supuestos.map((s, j) => (
                    <div key={j} style={{
                      display: 'flex', gap: 6,
                      alignItems: 'flex-start',
                      marginBottom: 3 }}>
                      <div style={{ width: 4, height: 4,
                        borderRadius: '50%',
                        background: esc.color,
                        flexShrink: 0,
                        marginTop: 5 }} />
                      <div style={{ fontSize: 11,
                        color: '#6A8AAA',
                        lineHeight: 1.5 }}>{s}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── FILA 3: Tabla de supuestos ── */}
        <div style={{ background: dark,
          border: `1px solid ${border}`,
          borderRadius: 4, overflow: 'hidden' }}>
          <div style={{ padding: '12px 16px',
            borderBottom: `1px solid ${border}` }}>
            <div style={{ fontSize: 10, fontWeight: 700,
              letterSpacing: 2, textTransform: 'uppercase',
              color: copper }}>
              Supuestos críticos — Modelo vs benchmark LatAm
            </div>
          </div>
          <table style={{ width: '100%',
            borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Supuesto', 'Modelo vendedor',
                  'Benchmark mín.', 'Benchmark máx.',
                  'Delta', 'Impacto TIR', 'Estado',
                  'Referencia'].map(h => (
                  <th key={h} style={{
                    fontSize: 9, fontWeight: 700,
                    letterSpacing: 1,
                    textTransform: 'uppercase',
                    color: '#4A6070',
                    padding: '8px 12px',
                    textAlign: 'left',
                    borderBottom: `1px solid ${border}` }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {supuestos.map((s, i) => {
                const st = statusStyle(s.status);
                return (
                  <tr key={i} style={{
                    background: i % 2 === 0
                      ? 'transparent'
                      : 'rgba(255,255,255,0.02)' }}>
                    <td style={{ padding: '10px 12px',
                      borderBottom: '1px solid #0D2540',
                      fontSize: 12, color: '#C8D8E8',
                      fontWeight: 600 }}>
                      {s.nombre}
                    </td>
                    <td style={{ padding: '10px 12px',
                      borderBottom: '1px solid #0D2540',
                      fontSize: 13, fontWeight: 700,
                      color: st.color }}>
                      {s.modelo}
                    </td>
                    <td style={{ padding: '10px 12px',
                      borderBottom: '1px solid #0D2540',
                      fontSize: 12, color: '#6A8AAA' }}>
                      {s.min}
                    </td>
                    <td style={{ padding: '10px 12px',
                      borderBottom: '1px solid #0D2540',
                      fontSize: 12, color: '#6A8AAA' }}>
                      {s.max}
                    </td>
                    <td style={{ padding: '10px 12px',
                      borderBottom: '1px solid #0D2540',
                      fontSize: 11, color: '#4A6070' }}>
                      {s.delta}
                    </td>
                    <td style={{ padding: '10px 12px',
                      borderBottom: '1px solid #0D2540',
                      fontSize: 12, fontWeight: 700,
                      color: st.color }}>
                      {s.impacto}
                    </td>
                    <td style={{ padding: '10px 12px',
                      borderBottom: '1px solid #0D2540' }}>
                      <span style={{ fontSize: 10,
                        fontWeight: 700,
                        padding: '2px 8px',
                        borderRadius: 2,
                        background: st.bg,
                        color: st.color }}>
                        {st.label}
                      </span>
                    </td>
                    <td style={{ padding: '10px 12px',
                      borderBottom: '1px solid #0D2540',
                      fontSize: 10, color: '#4A6070',
                      fontFamily: 'monospace' }}>
                      {s.celda}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>
    );
  };

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
