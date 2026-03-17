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

  const DEALS = [
    {
      id: 'solar',
      nombre: 'Solar Córdoba',
      pais: '🇨🇴 Colombia',
      monto: '~USD 55M',
      sector: 'Energía renovable',
      sectorColor: '#FCD34D',
      etapa: 'DD en curso',
      etapaColor: '#B8860B',
      etapaBg: 'rgba(184,134,11,0.15)',
      icFecha: 'Abr 15, 2026',
      progreso: 65,
      alertas: 2,
      stages: [
        { label: 'Screening', done: true },
        { label: 'DD Financiero', done: true },
        { label: 'DD Técnico', done: true },
        { label: 'DD Legal', done: false, active: true },
        { label: 'DD ESG', done: false },
        { label: 'IC', done: false },
        { label: 'Cierre', done: false },
      ],
      frentes: [
        { label: 'Financiero', color: '#FCD34D', status: 'En revisión', preguntas: 4 },
        { label: 'Técnico', color: '#86EFAC', status: 'Completo', preguntas: 0 },
        { label: 'Legal', color: '#FCA5A5', status: 'Bloqueado', preguntas: 6 },
        { label: 'ESG', color: '#FCA5A5', status: 'Sin respuesta', preguntas: 3 },
      ],
    },
    {
      id: 'callao',
      nombre: 'Callao Logística',
      pais: '🇵🇪 Perú',
      monto: '~USD 40M',
      sector: 'Logística',
      sectorColor: '#93C5FD',
      etapa: 'Screening',
      etapaColor: '#93C5FD',
      etapaBg: 'rgba(147,197,253,0.1)',
      icFecha: 'Jun 20, 2026',
      progreso: 15,
      alertas: 0,
      stages: [
        { label: 'Screening', done: false, active: true },
        { label: 'DD Financiero', done: false },
        { label: 'DD Técnico', done: false },
        { label: 'DD Legal', done: false },
        { label: 'DD ESG', done: false },
        { label: 'IC', done: false },
        { label: 'Cierre', done: false },
      ],
      frentes: [
        { label: 'Financiero', color: '#4A6070', status: 'No iniciado', preguntas: 0 },
        { label: 'Técnico', color: '#4A6070', status: 'No iniciado', preguntas: 0 },
        { label: 'Legal', color: '#FCD34D', status: 'En revisión', preguntas: 2 },
        { label: 'ESG', color: '#4A6070', status: 'No iniciado', preguntas: 0 },
      ],
    },
    {
      id: 'agua',
      nombre: 'Agua Guatemala',
      pais: '🇬🇹 Guatemala',
      monto: '~USD 35M',
      sector: 'Agua y residuos',
      sectorColor: '#6EE7B7',
      etapa: 'IC preliminar',
      etapaColor: '#86EFAC',
      etapaBg: 'rgba(134,239,172,0.1)',
      icFecha: 'May 8, 2026',
      progreso: 85,
      alertas: 0,
      stages: [
        { label: 'Screening', done: true },
        { label: 'DD Financiero', done: true },
        { label: 'DD Técnico', done: true },
        { label: 'DD Legal', done: true },
        { label: 'DD ESG', done: true },
        { label: 'IC', done: false, active: true },
        { label: 'Cierre', done: false },
      ],
      frentes: [
        { label: 'Financiero', color: '#86EFAC', status: 'Completo', preguntas: 0 },
        { label: 'Técnico', color: '#86EFAC', status: 'Completo', preguntas: 0 },
        { label: 'Legal', color: '#86EFAC', status: 'Completo', preguntas: 0 },
        { label: 'ESG', color: '#86EFAC', status: 'Completo', preguntas: 0 },
      ],
    },
  ];

  const renderSidebar = () => (
    <div style={{
      width: 220, flexShrink: 0,
      background: '#071B33',
      borderRight: '1px solid #1E3A5A',
      display: 'flex', flexDirection: 'column',
      overflow: 'hidden',
    }}>
      <div style={{
        padding: '12px 16px',
        borderBottom: '1px solid #1E3A5A',
        fontSize: 9, fontWeight: 700,
        letterSpacing: 2, textTransform: 'uppercase',
        color: '#4A6070',
      }}>
        Deals activos · Fondo III
      </div>
      <div style={{ overflowY: 'auto', flex: 1 }}>
        {DEALS.map(deal => (
          <div
            key={deal.id}
            onClick={() => setActiveDeal(deal.id)}
            style={{
              padding: '12px 16px',
              cursor: 'pointer',
              borderLeft: `2px solid ${
                activeDeal === deal.id
                  ? '#B8860B' : 'transparent'
              }`,
              background: activeDeal === deal.id
                ? '#0A2240' : 'transparent',
              borderBottom: '1px solid #071B33',
              transition: 'all 0.15s',
            }}
          >
            <div style={{
              display: 'flex', alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 4,
            }}>
              <div style={{
                fontSize: 13, fontWeight: 600,
                color: '#F8F5F0',
              }}>
                {deal.nombre}
              </div>
              {deal.alertas > 0 && (
                <div style={{
                  width: 18, height: 18,
                  borderRadius: '50%',
                  background: '#FCA5A5',
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 9, fontWeight: 700,
                  color: '#7F1D1D', flexShrink: 0,
                }}>
                  {deal.alertas}
                </div>
              )}
            </div>
            <div style={{
              fontSize: 10, color: '#4A6070',
              marginBottom: 6,
            }}>
              {deal.pais} · {deal.monto}
            </div>
            <div style={{
              display: 'inline-block',
              fontSize: 9, fontWeight: 700,
              padding: '1px 6px', borderRadius: 2,
              background: deal.etapaBg,
              color: deal.etapaColor,
              marginBottom: 8,
            }}>
              {deal.etapa}
            </div>
            <div style={{
              height: 3, background: '#1E3A5A',
              borderRadius: 2, overflow: 'hidden',
            }}>
              <div style={{
                height: '100%',
                width: `${deal.progreso}%`,
                background: deal.etapaColor,
                borderRadius: 2,
              }} />
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: 4,
            }}>
              <div style={{
                fontSize: 9, color: '#4A6070',
              }}>
                {deal.progreso}% completo
              </div>
              <div style={{
                fontSize: 9, color: '#4A6070',
              }}>
                IC: {deal.icFecha.split(',')[0]}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{
        padding: '12px 16px',
        borderTop: '1px solid #1E3A5A',
      }}>
        <div style={{
          fontSize: 9, color: '#4A6070',
          textTransform: 'uppercase', letterSpacing: 1,
          marginBottom: 6,
        }}>
          Deal seleccionado
        </div>
        <div style={{
          fontSize: 12, fontWeight: 600,
          color: '#F8F5F0', marginBottom: 2,
        }}>
          {DEALS.find(d => d.id === activeDeal)?.nombre}
        </div>
        <div style={{
          fontSize: 10, color: '#4A6070',
        }}>
          {DEALS.find(d => d.id === activeDeal)?.sector}
        </div>
      </div>
    </div>
  );

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
  const renderDashboard = () => {
    const deal = DEALS.find(d => d.id === activeDeal) || DEALS[0];

    const alertasAll = [
      { color: '#FCA5A5', texto: 'PPA Solar Córdoba: contraparte sin revelar — bloquea valoración legal', accion: 'Escalar al vendedor', deal: 'Solar Córdoba', tiempo: 'Hoy · Crítico' },
      { color: '#FCA5A5', texto: 'Plan de Manejo Ambiental ANLA: 3 días vencido sin respuesta del vendedor', accion: 'Enviar recordatorio', deal: 'Solar Córdoba', tiempo: 'Hoy · Crítico' },
      { color: '#FCD34D', texto: 'Factor de planta: pendiente mediciones históricas de irradiación', accion: 'Solicitar a interventor', deal: 'Solar Córdoba', tiempo: 'Vence Mar 18' },
      { color: '#93C5FD', texto: 'Callao Logística: reunión con management pendiente de agendar', accion: 'Coordinar con bancario', deal: 'Callao', tiempo: 'Sin fecha' },
    ];
    const alertas = alertasAll.filter(a =>
      a.deal.includes(deal.nombre.split(' ')[0])
    );

    return (
      <div style={{ display: 'flex', flexDirection: 'column',
        overflowY: 'auto', flex: 1 }}>
        <div style={{
          padding: '12px 24px',
          borderBottom: '1px solid #1E3A5A',
          background: '#071B33',
          display: 'flex', alignItems: 'center',
          gap: 16, flexShrink: 0,
        }}>
          <div style={{
            fontFamily: 'Georgia, serif',
            fontSize: 18, fontWeight: 700,
            color: '#F8F5F0',
          }}>
            {deal.nombre}
          </div>
          <div style={{
            width: 1, height: 16,
            background: '#1E3A5A',
          }} />
          <div style={{
            fontSize: 11, color: '#4A6070',
          }}>
            {deal.pais} · {deal.monto}
          </div>
          <div style={{
            width: 1, height: 16,
            background: '#1E3A5A',
          }} />
          <span style={{
            fontSize: 9, fontWeight: 700,
            padding: '2px 8px', borderRadius: 2,
            background: deal.etapaBg,
            color: deal.etapaColor,
          }}>
            {deal.etapa}
          </span>
          <div style={{ flex: 1 }} />
          <div style={{
            fontSize: 10, color: '#4A6070',
          }}>
            IC objetivo: {deal.icFecha}
          </div>
        </div>
        <div style={{ padding: '20px 24px', flex: 1 }}>

        {/* KPIs */}
        <div style={{ display: 'grid',
          gridTemplateColumns: 'repeat(4,1fr)',
          gap: 12, marginBottom: 24 }}>
          {[
            { label: 'Deals en DD activo', val: '3',
              sub: 'Fondo Andino III' },
            { label: 'Documentos procesados', val: '147',
              sub: 'Data room indexado' },
            { label: 'Preguntas abiertas', val: '23',
              sub: '8 vencidas hoy',
              subColor: '#FCA5A5' },
            { label: 'Próximo IC', val: 'Abr 15',
              sub: 'Solar Córdoba' },
          ].map((k,i) => (
            <div key={i} style={{ background: dark,
              border: `1px solid ${border}`,
              borderRadius: 4, padding: '14px 16px' }}>
              <div style={{ fontSize: 11, color: '#4A6070',
                textTransform: 'uppercase', letterSpacing: 1,
                marginBottom: 6 }}>{k.label}</div>
              <div style={{ fontFamily: 'Georgia, serif',
                fontSize: 30, fontWeight: 700,
                color: '#F8F5F0', lineHeight: 1,
                marginBottom: 4 }}>{k.val}</div>
              <div style={{ fontSize: 11,
                color: k.subColor || '#4A6070' }}>
                {k.sub}
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid',
          gridTemplateColumns: '1.4fr 1fr', gap: 16 }}>

          {/* Timeline deal activo */}
          <div>
            <div style={{ fontSize: 10, fontWeight: 700,
              letterSpacing: 2, textTransform: 'uppercase',
              color: copper, marginBottom: 16 }}>
              Pipeline de DD — Estado del proceso
            </div>
            <div style={{ background: dark,
              border: `1px solid ${border}`,
              borderRadius: 4, padding: 16,
              marginBottom: 12 }}>
              <div style={{ display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 14 }}>
                <div>
                  <div style={{ fontSize: 14,
                    fontWeight: 600, color: '#F8F5F0',
                    marginBottom: 2 }}>{deal.nombre}</div>
                  <div style={{ fontSize: 11,
                    color: '#4A6070' }}>{deal.pais} · {deal.monto} · {deal.sector}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 9,
                    fontWeight: 700, padding: '2px 8px',
                    borderRadius: 2,
                    background: deal.etapaBg,
                    color: deal.etapaColor,
                    marginBottom: 4 }}>
                    {deal.etapa}
                  </div>
                  <div style={{ fontSize: 10,
                    color: '#4A6070' }}>
                    IC objetivo: {deal.icFecha}
                  </div>
                </div>
              </div>

              {/* Timeline horizontal */}
              <div style={{ position: 'relative',
                marginBottom: 16 }}>
                <div style={{ display: 'flex',
                  alignItems: 'center',
                  position: 'relative' }}>
                  {deal.stages!.map((stage, si) => (
                    <div key={si} style={{ flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      position: 'relative' }}>
                      {si < deal.stages!.length - 1 && (
                        <div style={{
                          position: 'absolute',
                          top: 8, left: '50%',
                          width: '100%', height: 2,
                          background: stage.done
                            ? copper : '#1E3A5A',
                          zIndex: 0 }} />
                      )}
                      <div style={{
                        width: 18, height: 18,
                        borderRadius: '50%',
                        background: stage.done
                          ? copper
                          : stage.active
                          ? '#F8F5F0' : '#1E3A5A',
                        border: stage.active
                          ? `3px solid ${copper}`
                          : 'none',
                        zIndex: 1,
                        flexShrink: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        {stage.done && (
                          <div style={{ width: 6,
                            height: 6, borderRadius: '50%',
                            background: '#0A2240' }} />
                        )}
                      </div>
                      <div style={{ fontSize: 9,
                        color: stage.done
                          ? copper
                          : stage.active
                          ? '#F8F5F0' : '#4A6070',
                        marginTop: 5, textAlign: 'center',
                        fontWeight: stage.active
                          ? 700 : 400,
                        lineHeight: 1.3 }}>
                        {stage.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Frentes summary */}
              <div style={{ display: 'grid',
                gridTemplateColumns: 'repeat(4,1fr)',
                gap: 6 }}>
                {deal.frentes!.map((f, fi) => (
                  <div key={fi} style={{
                    background: navy,
                    borderRadius: 3,
                    padding: '8px 10px' }}>
                    <div style={{ fontSize: 9,
                      color: '#4A6070',
                      textTransform: 'uppercase',
                      letterSpacing: 1,
                      marginBottom: 4 }}>
                      {f.label}
                    </div>
                    <div style={{ display: 'flex',
                      alignItems: 'center', gap: 5 }}>
                      <div style={{ width: 6, height: 6,
                        borderRadius: '50%',
                        background: f.color,
                        flexShrink: 0 }} />
                      <div style={{ fontSize: 10,
                        color: f.color,
                        fontWeight: 600 }}>
                        {f.status}
                      </div>
                    </div>
                    {f.preguntas > 0 && (
                      <div style={{ fontSize: 9,
                        color: '#FCA5A5', marginTop: 2 }}>
                        {f.preguntas} preg. abiertas
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Alertas */}
          <div>
            <div style={{ fontSize: 10, fontWeight: 700,
              letterSpacing: 2, textTransform: 'uppercase',
              color: copper, marginBottom: 16 }}>
              Alertas — Acción requerida hoy
            </div>
            {alertas.map((a, ai) => (
              <div key={ai} style={{ background: dark,
                border: `1px solid ${border}`,
                borderLeft: `3px solid ${a.color}`,
                borderRadius: '0 4px 4px 0',
                padding: '12px 14px',
                marginBottom: 8 }}>
                <div style={{ fontSize: 11,
                  color: '#4A6070', marginBottom: 4 }}>
                  {a.deal} · {a.tiempo}
                </div>
                <div style={{ fontSize: 12,
                  color: '#C8D8E8', lineHeight: 1.5,
                  marginBottom: 10 }}>{a.texto}</div>
                <button style={{ padding: '5px 12px',
                  background: 'transparent',
                  border: `1px solid ${a.color}`,
                  borderRadius: 3, fontSize: 10,
                  fontWeight: 700, color: a.color,
                  cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif' }}>
                  {a.accion} →
                </button>
              </div>
            ))}

            {/* Matriz preguntas abiertas */}
            <div style={{ marginTop: 16 }}>
              <div style={{ fontSize: 10, fontWeight: 700,
                letterSpacing: 2, textTransform: 'uppercase',
                color: copper, marginBottom: 10 }}>
                Preguntas abiertas por frente
              </div>
              <table style={{ width: '100%',
                borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    {['Frente','Vencidas',
                      'Pendientes','Respondidas'].map(h => (
                      <th key={h} style={{ fontSize: 9,
                        color: '#4A6070',
                        textTransform: 'uppercase',
                        letterSpacing: 1,
                        padding: '6px 10px',
                        textAlign: 'left',
                        borderBottom: `1px solid ${border}` }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { f: 'Financiero', v: 0, p: 4, r: 8 },
                    { f: 'Técnico', v: 0, p: 0, r: 10 },
                    { f: 'Legal', v: 5, p: 2, r: 4 },
                    { f: 'ESG', v: 3, p: 5, r: 2 },
                  ].map((row, ri) => (
                    <tr key={ri}>
                      <td style={{ padding: '8px 10px',
                        fontSize: 12, color: '#C8D8E8',
                        borderBottom: '1px solid #0D2540' }}>
                        {row.f}
                      </td>
                      <td style={{ padding: '8px 10px',
                        fontSize: 13, fontWeight: 700,
                        color: row.v > 0
                          ? '#FCA5A5' : '#4A6070',
                        borderBottom: '1px solid #0D2540' }}>
                        {row.v}
                      </td>
                      <td style={{ padding: '8px 10px',
                        fontSize: 13, fontWeight: 700,
                        color: row.p > 0
                          ? '#FCD34D' : '#4A6070',
                        borderBottom: '1px solid #0D2540' }}>
                        {row.p}
                      </td>
                      <td style={{ padding: '8px 10px',
                        fontSize: 13, fontWeight: 700,
                        color: '#86EFAC',
                        borderBottom: '1px solid #0D2540' }}>
                        {row.r}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        </div>
      </div>
    );
  };

  // ── FINANCIERO ───────────────────────────────────
  const renderFinanciero = () => {
    const deal = DEALS.find(d => d.id === activeDeal) || DEALS[0];

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
      <div style={{ display: 'flex', flexDirection: 'column',
        overflowY: 'auto', flex: 1 }}>
        <div style={{
          padding: '12px 24px',
          borderBottom: '1px solid #1E3A5A',
          background: '#071B33',
          display: 'flex', alignItems: 'center',
          gap: 16, flexShrink: 0,
        }}>
          <div style={{
            fontFamily: 'Georgia, serif',
            fontSize: 18, fontWeight: 700,
            color: '#F8F5F0',
          }}>
            {deal.nombre}
          </div>
          <div style={{
            width: 1, height: 16,
            background: '#1E3A5A',
          }} />
          <div style={{
            fontSize: 11, color: '#4A6070',
          }}>
            {deal.pais} · {deal.monto}
          </div>
          <div style={{
            width: 1, height: 16,
            background: '#1E3A5A',
          }} />
          <span style={{
            fontSize: 9, fontWeight: 700,
            padding: '2px 8px', borderRadius: 2,
            background: deal.etapaBg,
            color: deal.etapaColor,
          }}>
            {deal.etapa}
          </span>
          <div style={{ flex: 1 }} />
          <div style={{
            fontSize: 10, color: '#4A6070',
          }}>
            IC objetivo: {deal.icFecha}
          </div>
        </div>
        <div style={{ padding: '20px 24px', flex: 1 }}>

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
      </div>
    );
  };

  // ── DATA ROOM ─────────────────────────────────────
  const renderDataRoom = () => {
    const deal = DEALS.find(d => d.id === activeDeal) || DEALS[0];

    const frentes = [
      {
        label: 'Financiero', color: '#86EFAC',
        recibidos: 8, solicitados: 10,
        docs: [
          { nombre: 'ModeloFinanciero_SC_v3.xlsx',
            estado: 'Analizado', stBg: 'rgba(134,239,172,0.1)',
            stColor: '#86EFAC', paginas: '15 tabs' },
          { nombre: 'Estados_Financieros_2023.pdf',
            estado: 'Indexado', stBg: 'rgba(147,197,253,0.1)',
            stColor: '#93C5FD', paginas: '42 págs' },
          { nombre: 'Proyecciones_Auditadas_2024.pdf',
            estado: 'Indexado', stBg: 'rgba(147,197,253,0.1)',
            stColor: '#93C5FD', paginas: '28 págs' },
          { nombre: 'Estructura_Deuda_Senior.pdf',
            estado: 'Pendiente recibir',
            stBg: 'rgba(239,68,68,0.1)',
            stColor: '#FCA5A5', paginas: '—' },
          { nombre: 'Valoración_Independiente_2023.pdf',
            estado: 'Pendiente recibir',
            stBg: 'rgba(239,68,68,0.1)',
            stColor: '#FCA5A5', paginas: '—' },
        ]
      },
      {
        label: 'Técnico', color: '#93C5FD',
        recibidos: 6, solicitados: 7,
        docs: [
          { nombre: 'Informe_Interventoria_2024.pdf',
            estado: 'Indexado', stBg: 'rgba(147,197,253,0.1)',
            stColor: '#93C5FD', paginas: '84 págs' },
          { nombre: 'Estudio_Irradiacion_NASA.pdf',
            estado: 'Indexado', stBg: 'rgba(147,197,253,0.1)',
            stColor: '#93C5FD', paginas: '31 págs' },
          { nombre: 'Informe_OyM_2024.pdf',
            estado: 'Indexado', stBg: 'rgba(147,197,253,0.1)',
            stColor: '#93C5FD', paginas: '19 págs' },
          { nombre: 'Factor_Planta_Historico.xlsx',
            estado: 'Pendiente recibir',
            stBg: 'rgba(239,68,68,0.1)',
            stColor: '#FCA5A5', paginas: '—' },
        ]
      },
      {
        label: 'Legal', color: '#FCD34D',
        recibidos: 5, solicitados: 9,
        docs: [
          { nombre: 'Contrato_PPA_REDACTED.pdf',
            estado: 'Restringido', stBg: 'rgba(250,204,21,0.1)',
            stColor: '#FCD34D', paginas: '38 págs' },
          { nombre: 'Contrato_OyM_Operador.pdf',
            estado: 'Indexado', stBg: 'rgba(147,197,253,0.1)',
            stColor: '#93C5FD', paginas: '24 págs' },
          { nombre: 'Escritura_Constitucion.pdf',
            estado: 'Indexado', stBg: 'rgba(147,197,253,0.1)',
            stColor: '#93C5FD', paginas: '18 págs' },
          { nombre: 'Acuerdo_Accionistas.pdf',
            estado: 'Pendiente recibir',
            stBg: 'rgba(239,68,68,0.1)',
            stColor: '#FCA5A5', paginas: '—' },
          { nombre: 'Contratos_Seguros.pdf',
            estado: 'Pendiente recibir',
            stBg: 'rgba(239,68,68,0.1)',
            stColor: '#FCA5A5', paginas: '—' },
          { nombre: 'Permisos_Municipales.pdf',
            estado: 'Pendiente recibir',
            stBg: 'rgba(239,68,68,0.1)',
            stColor: '#FCA5A5', paginas: '—' },
        ]
      },
      {
        label: 'ESG', color: '#F9A8D4',
        recibidos: 3, solicitados: 6,
        docs: [
          { nombre: 'Licencia_Ambiental_ANLA.pdf',
            estado: 'Indexado', stBg: 'rgba(147,197,253,0.1)',
            stColor: '#93C5FD', paginas: '52 págs' },
          { nombre: 'Plan_Manejo_Ambiental.pdf',
            estado: 'Pendiente recibir',
            stBg: 'rgba(239,68,68,0.1)',
            stColor: '#FCA5A5', paginas: '—' },
          { nombre: 'Informe_Cumplimiento_ANLA.pdf',
            estado: 'Pendiente recibir',
            stBg: 'rgba(239,68,68,0.1)',
            stColor: '#FCA5A5', paginas: '—' },
          { nombre: 'Consulta_Comunidades.pdf',
            estado: 'Pendiente recibir',
            stBg: 'rgba(239,68,68,0.1)',
            stColor: '#FCA5A5', paginas: '—' },
        ]
      },
    ];

    const searchQueries: Record<string, {
      titulo: string; tag: string; frag: string
    }> = {
      ppa: {
        titulo: 'Contrato_PPA_REDACTED.pdf · Página 12',
        tag: 'Legal',
        frag: '...el vendedor de energía se compromete a vender el 100% de la energía generada por el Proyecto al comprador durante el término del contrato (15 años), con exclusividad geográfica en el departamento de Córdoba. El precio base es USD 42/MWh indexado al CPI de Estados Unidos...'
      },
      factor: {
        titulo: 'Informe_Interventoria_Tecnica_2024.pdf · Página 34',
        tag: 'Técnico',
        frag: '...el factor de planta registrado durante enero-diciembre 2024 fue de 22.3%, consistente con las mediciones de irradiación solar NASA POWER para Córdoba (rango histórico 20.1%-23.8%). El modelo financiero del vendedor asume 26%, un 16% por encima del histórico registrado...'
      },
      anla: {
        titulo: 'Licencia_Ambiental_ANLA_2021.pdf · Página 3',
        tag: 'ESG',
        frag: '...la Autoridad Nacional de Licencias Ambientales otorga licencia ambiental al Proyecto Solar Córdoba por un período de 25 años a partir del 15 de marzo de 2021, sujeto al cumplimiento del Plan de Manejo Ambiental establecido en el Anexo 2...'
      },
      om: {
        titulo: 'Contrato_OyM_Operador_Local.pdf · Página 8',
        tag: 'Legal',
        frag: '...el operador garantiza una disponibilidad mínima del activo del 95% anual. En caso de incumplimiento, se aplicará una penalidad equivalente al 0.5% del valor del contrato por cada punto porcentual de disponibilidad por debajo del mínimo garantizado...'
      },
    };

    const getSearchResult = (q: string) => {
      const ql = q.toLowerCase();
      if (ql.includes('ppa') || ql.includes('contrato'))
        return searchQueries.ppa;
      if (ql.includes('factor') || ql.includes('planta'))
        return searchQueries.factor;
      if (ql.includes('anla') || ql.includes('licencia'))
        return searchQueries.anla;
      if (ql.includes('o&m') || ql.includes('operador')
        || ql.includes('disponibilidad'))
        return searchQueries.om;
      return null;
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column',
        overflowY: 'auto', flex: 1 }}>
        <div style={{
          padding: '12px 24px',
          borderBottom: '1px solid #1E3A5A',
          background: '#071B33',
          display: 'flex', alignItems: 'center',
          gap: 16, flexShrink: 0,
        }}>
          <div style={{
            fontFamily: 'Georgia, serif',
            fontSize: 18, fontWeight: 700,
            color: '#F8F5F0',
          }}>
            {deal.nombre}
          </div>
          <div style={{
            width: 1, height: 16,
            background: '#1E3A5A',
          }} />
          <div style={{
            fontSize: 11, color: '#4A6070',
          }}>
            {deal.pais} · {deal.monto}
          </div>
          <div style={{
            width: 1, height: 16,
            background: '#1E3A5A',
          }} />
          <span style={{
            fontSize: 9, fontWeight: 700,
            padding: '2px 8px', borderRadius: 2,
            background: deal.etapaBg,
            color: deal.etapaColor,
          }}>
            {deal.etapa}
          </span>
          <div style={{ flex: 1 }} />
          <div style={{
            fontSize: 10, color: '#4A6070',
          }}>
            IC objetivo: {deal.icFecha}
          </div>
        </div>
        <div style={{ padding: '20px 24px', flex: 1 }}>

        {/* Buscador */}
        <div style={{ position: 'relative',
          marginBottom: 20 }}>
          <input
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                const r = getSearchResult(searchQuery);
                setSearchResult(r);
              }
            }}
            placeholder='Busca en 147 documentos — ej: "¿qué dice el PPA sobre exclusividad?" o "factor de planta histórico"'
            style={{ width: '100%',
              padding: '12px 140px 12px 16px',
              background: dark,
              border: `1px solid ${border}`,
              borderRadius: 4, color: '#F8F5F0',
              fontSize: 13,
              fontFamily: 'Inter, sans-serif',
              outline: 'none' }}
            onFocus={e =>
              e.target.style.borderColor = copper}
            onBlur={e =>
              e.target.style.borderColor = border}
          />
          <button
            onClick={() => {
              const r = getSearchResult(searchQuery);
              setSearchResult(r);
            }}
            style={{ position: 'absolute', right: 8,
              top: '50%',
              transform: 'translateY(-50%)',
              padding: '7px 16px', background: copper,
              border: 'none', borderRadius: 3,
              fontSize: 12, fontWeight: 700,
              color: navy, cursor: 'pointer',
              fontFamily: 'Inter, sans-serif' }}>
            Buscar
          </button>
        </div>

        {/* Resultado búsqueda */}
        {searchResult && (
          <div style={{ marginBottom: 20,
            background: dark,
            border: `1px solid ${copper}`,
            borderRadius: 4, padding: 16 }}>
            <div style={{ display: 'flex',
              alignItems: 'center', gap: 8,
              marginBottom: 10 }}>
              <span style={{ fontSize: 9,
                fontWeight: 700, padding: '2px 6px',
                background: 'rgba(250,204,21,0.1)',
                color: '#FCD34D', borderRadius: 2 }}>
                {searchResult.tag}
              </span>
              <span style={{ fontSize: 13,
                fontWeight: 600, color: '#C8D8E8' }}>
                {searchResult.titulo}
              </span>
            </div>
            <div style={{ fontSize: 13, color: '#6A8AAA',
              lineHeight: 1.75, fontStyle: 'italic' }}>
              "{searchResult.frag}"
            </div>
            <div style={{ display: 'flex', gap: 8,
              marginTop: 10 }}>
              {['PPA exclusividad','factor de planta',
                'licencia ANLA','O&M disponibilidad'].map(s => (
                <button key={s}
                  onClick={() => {
                    setSearchQuery(s);
                    const r = getSearchResult(s);
                    setSearchResult(r);
                  }}
                  style={{ padding: '4px 10px',
                    background: 'transparent',
                    border: `1px solid ${border}`,
                    borderRadius: 3, fontSize: 10,
                    color: '#6A8AAA', cursor: 'pointer',
                    fontFamily: 'Inter, sans-serif' }}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Cobertura general */}
        <div style={{ display: 'grid',
          gridTemplateColumns: 'repeat(4,1fr)',
          gap: 10, marginBottom: 20 }}>
          {frentes.map((f, fi) => (
            <div key={fi} style={{ background: dark,
              border: `1px solid ${border}`,
              borderRadius: 4, padding: '12px 14px' }}>
              <div style={{ display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 8 }}>
                <div style={{ fontSize: 12,
                  fontWeight: 600, color: f.color }}>
                  {f.label}
                </div>
                <div style={{ fontSize: 11,
                  color: '#4A6070' }}>
                  {f.recibidos}/{f.solicitados}
                </div>
              </div>
              <div style={{ height: 4,
                background: '#1E3A5A',
                borderRadius: 2, overflow: 'hidden',
                marginBottom: 6 }}>
                <div style={{ height: '100%',
                  width: `${(f.recibidos/f.solicitados)*100}%`,
                  background: f.color,
                  borderRadius: 2 }} />
              </div>
              <div style={{ fontSize: 10,
                color: f.recibidos < f.solicitados
                  ? '#FCA5A5' : '#86EFAC' }}>
                {f.solicitados - f.recibidos > 0
                  ? `${f.solicitados - f.recibidos} pendientes de recibir`
                  : 'Data room completo'}
              </div>
            </div>
          ))}
        </div>

        {/* Docs por frente */}
        <div style={{ display: 'grid',
          gridTemplateColumns: 'repeat(4,1fr)',
          gap: 12 }}>
          {frentes.map((f, fi) => (
            <div key={fi}>
              <div style={{ fontSize: 10,
                fontWeight: 700, letterSpacing: 2,
                textTransform: 'uppercase',
                color: f.color, marginBottom: 8 }}>
                {f.label}
              </div>
              {f.docs.map((doc, di) => (
                <div key={di} style={{ background: dark,
                  border: `1px solid ${border}`,
                  borderRadius: 3,
                  padding: '8px 10px',
                  marginBottom: 6 }}>
                  <div style={{ fontSize: 11,
                    color: doc.estado === 'Pendiente recibir'
                      ? '#4A6070' : '#C8D8E8',
                    marginBottom: 4,
                    lineHeight: 1.4 }}>
                    {doc.nombre}
                  </div>
                  <div style={{ display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between' }}>
                    <div style={{ fontSize: 9,
                      color: '#4A6070' }}>
                      {doc.paginas}
                    </div>
                    <span style={{ fontSize: 8,
                      fontWeight: 700,
                      padding: '1px 5px',
                      borderRadius: 2,
                      background: doc.stBg,
                      color: doc.stColor }}>
                      {doc.estado}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
        </div>
      </div>
    );
  };

  // ── PREGUNTAS ─────────────────────────────────────
  const renderPreguntas = () => {
    const deal = DEALS.find(d => d.id === activeDeal) || DEALS[0];

    const preguntas = [
      {
        id: 'P-001',
        q: '¿Puede confirmar por escrito la identidad de la contraparte del PPA y compartir el contrato completo bajo NDA?',
        frente: 'Legal', frColor: '#FCD34D',
        enviada: 'Mar 10', limite: 'Mar 13',
        estado: 'Vencida', estColor: '#FCA5A5',
        estBg: 'rgba(239,68,68,0.1)',
        borderColor: '#FCA5A5',
        nota: 'Sin respuesta · 3 días vencida',
        notaColor: '#FCA5A5',
        respuesta: null,
        evaluacion: null,
      },
      {
        id: 'P-002',
        q: 'Adjuntar el Plan de Manejo Ambiental vigente y el último informe de cumplimiento ante ANLA.',
        frente: 'ESG', frColor: '#F9A8D4',
        enviada: 'Mar 11', limite: 'Mar 14',
        estado: 'Vencida', estColor: '#FCA5A5',
        estBg: 'rgba(239,68,68,0.1)',
        borderColor: '#FCA5A5',
        nota: 'Sin respuesta · 2 días vencida',
        notaColor: '#FCA5A5',
        respuesta: null,
        evaluacion: null,
      },
      {
        id: 'P-003',
        q: '¿En qué se basa el crecimiento de ingresos del 9.8% real anual? ¿Hay contratos firmados o es proyección de mercado?',
        frente: 'Financiero', frColor: '#86EFAC',
        enviada: 'Mar 13', limite: 'Mar 17',
        estado: 'Pendiente', estColor: '#FCD34D',
        estBg: 'rgba(250,204,21,0.1)',
        borderColor: '#FCD34D',
        nota: 'Plazo: 1 día',
        notaColor: '#FCD34D',
        respuesta: null,
        evaluacion: null,
      },
      {
        id: 'P-004',
        q: '¿Cuál es el factor de planta histórico de los últimos 3 años? El modelo asume 26% — ¿hay mediciones de irradiación que lo soporten?',
        frente: 'Técnico', frColor: '#93C5FD',
        enviada: 'Mar 14', limite: 'Mar 18',
        estado: 'Pendiente', estColor: '#FCD34D',
        estBg: 'rgba(250,204,21,0.1)',
        borderColor: '#FCD34D',
        nota: 'Plazo: 2 días',
        notaColor: '#FCD34D',
        respuesta: null,
        evaluacion: null,
      },
      {
        id: 'P-005',
        q: '¿Cuál es el contrato de O&M vigente? ¿Incluye garantías de disponibilidad y penalidades al operador?',
        frente: 'Legal', frColor: '#FCD34D',
        enviada: 'Mar 9', limite: 'Mar 12',
        estado: 'Respondida', estColor: '#86EFAC',
        estBg: 'rgba(134,239,172,0.1)',
        borderColor: '#86EFAC',
        nota: 'Respondida Mar 12',
        notaColor: '#86EFAC',
        respuesta: 'El contrato de O&M con el operador local cubre el período 2022-2030 (8 años). Garantía de disponibilidad del 95% anual. Penalidad: 0.5% del valor del contrato por punto porcentual bajo el mínimo. El contrato fue adjuntado en el data room.',
        evaluacion: { ok: true, texto: 'Respuesta satisfactoria — términos de O&M están en línea con el mercado. Disponibilidad del 95% es estándar para activos solares. Penalidades adecuadas.' },
      },
      {
        id: 'P-006',
        q: '¿Cuál es la estructura de la deuda senior del proyecto? ¿Cuál es el DSCR mínimo requerido por los bancos?',
        frente: 'Financiero', frColor: '#86EFAC',
        enviada: 'Mar 9', limite: 'Mar 13',
        estado: 'Respondida', estColor: '#86EFAC',
        estBg: 'rgba(134,239,172,0.1)',
        borderColor: '#86EFAC',
        nota: 'Respondida Mar 11',
        notaColor: '#86EFAC',
        respuesta: 'Deuda senior: USD 35M con Bancolombia (70% LTV). Plazo: 15 años. Tasa: IBR + 3.8%. DSCR mínimo requerido: 1.25x. Actualmente DSCR proyectado: 1.42x en caso base.',
        evaluacion: { ok: true, texto: 'Estructura de deuda razonable. LTV del 70% y DSCR de 1.42x son conservadores. El IBR + 3.8% es consistente con el mercado colombiano para proyectos energéticos.' },
      },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column',
        overflowY: 'auto', flex: 1 }}>
        <div style={{
          padding: '12px 24px',
          borderBottom: '1px solid #1E3A5A',
          background: '#071B33',
          display: 'flex', alignItems: 'center',
          gap: 16, flexShrink: 0,
        }}>
          <div style={{
            fontFamily: 'Georgia, serif',
            fontSize: 18, fontWeight: 700,
            color: '#F8F5F0',
          }}>
            {deal.nombre}
          </div>
          <div style={{
            width: 1, height: 16,
            background: '#1E3A5A',
          }} />
          <div style={{
            fontSize: 11, color: '#4A6070',
          }}>
            {deal.pais} · {deal.monto}
          </div>
          <div style={{
            width: 1, height: 16,
            background: '#1E3A5A',
          }} />
          <span style={{
            fontSize: 9, fontWeight: 700,
            padding: '2px 8px', borderRadius: 2,
            background: deal.etapaBg,
            color: deal.etapaColor,
          }}>
            {deal.etapa}
          </span>
          <div style={{ flex: 1 }} />
          <div style={{
            fontSize: 10, color: '#4A6070',
          }}>
            IC objetivo: {deal.icFecha}
          </div>
        </div>
        <div style={{ padding: '20px 24px', flex: 1 }}>

        {/* Matriz frente × estado */}
        <div style={{ display: 'grid',
          gridTemplateColumns: '1fr 1fr', gap: 16,
          marginBottom: 24 }}>

          {/* Tabla matriz */}
          <div style={{ background: dark,
            border: `1px solid ${border}`,
            borderRadius: 4, overflow: 'hidden' }}>
            <div style={{ padding: '12px 16px',
              borderBottom: `1px solid ${border}`,
              fontSize: 10, fontWeight: 700,
              letterSpacing: 2,
              textTransform: 'uppercase',
              color: copper }}>
              Preguntas por frente × estado
            </div>
            <table style={{ width: '100%',
              borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {['Frente','Vencidas',
                    'Pendientes','Respondidas',
                    'Total'].map(h => (
                    <th key={h} style={{ fontSize: 9,
                      color: '#4A6070',
                      textTransform: 'uppercase',
                      letterSpacing: 1,
                      padding: '8px 12px',
                      textAlign: 'left',
                      borderBottom:
                        `1px solid ${border}` }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { f: 'Financiero',
                    fc: '#86EFAC',
                    v: 0, p: 4, r: 8 },
                  { f: 'Técnico',
                    fc: '#93C5FD',
                    v: 0, p: 1, r: 10 },
                  { f: 'Legal',
                    fc: '#FCD34D',
                    v: 5, p: 2, r: 4 },
                  { f: 'ESG',
                    fc: '#F9A8D4',
                    v: 3, p: 4, r: 2 },
                ].map((row, ri) => (
                  <tr key={ri}>
                    <td style={{ padding: '10px 12px',
                      borderBottom: '1px solid #0D2540' }}>
                      <div style={{ display: 'flex',
                        alignItems: 'center', gap: 6 }}>
                        <div style={{ width: 6, height: 6,
                          borderRadius: '50%',
                          background: row.fc }} />
                        <span style={{ fontSize: 12,
                          color: '#C8D8E8',
                          fontWeight: 600 }}>
                          {row.f}
                        </span>
                      </div>
                    </td>
                    <td style={{ padding: '10px 12px',
                      fontSize: 14, fontWeight: 700,
                      color: row.v > 0
                        ? '#FCA5A5' : '#4A6070',
                      borderBottom: '1px solid #0D2540' }}>
                      {row.v}
                    </td>
                    <td style={{ padding: '10px 12px',
                      fontSize: 14, fontWeight: 700,
                      color: row.p > 0
                        ? '#FCD34D' : '#4A6070',
                      borderBottom: '1px solid #0D2540' }}>
                      {row.p}
                    </td>
                    <td style={{ padding: '10px 12px',
                      fontSize: 14, fontWeight: 700,
                      color: '#86EFAC',
                      borderBottom: '1px solid #0D2540' }}>
                      {row.r}
                    </td>
                    <td style={{ padding: '10px 12px',
                      fontSize: 12, color: '#6A8AAA',
                      borderBottom: '1px solid #0D2540' }}>
                      {row.v + row.p + row.r}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Timeline comunicaciones */}
          <div style={{ background: dark,
            border: `1px solid ${border}`,
            borderRadius: 4, padding: 16 }}>
            <div style={{ fontSize: 10, fontWeight: 700,
              letterSpacing: 2, textTransform: 'uppercase',
              color: copper, marginBottom: 14 }}>
              Timeline de comunicaciones
            </div>
            {[
              { fecha: 'Mar 9', tipo: 'Ronda 1 enviada',
                desc: '8 preguntas — Legal y Técnico',
                color: '#B8860B' },
              { fecha: 'Mar 11', tipo: 'Respuesta parcial',
                desc: 'Vendedor respondió 2 de 8 (O&M + Deuda)',
                color: '#86EFAC' },
              { fecha: 'Mar 13', tipo: 'Límite ronda 1',
                desc: '6 preguntas sin respuesta — 5 vencidas',
                color: '#FCA5A5' },
              { fecha: 'Mar 13', tipo: 'Ronda 2 enviada',
                desc: '4 preguntas nuevas — Financiero y ESG',
                color: '#B8860B' },
              { fecha: 'Mar 16', tipo: 'Hoy',
                desc: 'Sin nuevas respuestas del vendedor',
                color: '#4A6070' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex',
                gap: 12, marginBottom: 12 }}>
                <div style={{ flexShrink: 0,
                  textAlign: 'right', width: 50 }}>
                  <div style={{ fontSize: 10,
                    color: item.color,
                    fontWeight: 600 }}>{item.fecha}</div>
                </div>
                <div style={{ display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center', width: 16 }}>
                  <div style={{ width: 10, height: 10,
                    borderRadius: '50%',
                    background: item.color,
                    flexShrink: 0 }} />
                  {i < 4 && (
                    <div style={{ width: 1, flex: 1,
                      background: '#1E3A5A',
                      minHeight: 20,
                      marginTop: 2 }} />
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12,
                    fontWeight: 600,
                    color: '#C8D8E8',
                    marginBottom: 2 }}>{item.tipo}</div>
                  <div style={{ fontSize: 11,
                    color: '#6A8AAA',
                    lineHeight: 1.5 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lista de preguntas */}
        <div style={{ fontSize: 10, fontWeight: 700,
          letterSpacing: 2, textTransform: 'uppercase',
          color: copper, marginBottom: 12 }}>
          Todas las preguntas
        </div>
        {preguntas.map((p, i) => (
          <div key={i} style={{ background: dark,
            border: `1px solid ${border}`,
            borderLeft: `3px solid ${p.borderColor}`,
            borderRadius: '0 4px 4px 0',
            padding: '14px 16px', marginBottom: 8 }}>
            <div style={{ display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              marginBottom: 8 }}>
              <div style={{ display: 'flex',
                alignItems: 'center', gap: 8,
                marginBottom: 6 }}>
                <span style={{ fontSize: 9,
                  color: '#4A6070',
                  fontFamily: 'monospace' }}>
                  {p.id}
                </span>
                <span style={{ fontSize: 9,
                  fontWeight: 700, padding: '1px 6px',
                  borderRadius: 2,
                  background: `${p.frColor}22`,
                  color: p.frColor }}>
                  {p.frente}
                </span>
              </div>
              <span style={{ fontSize: 10,
                fontWeight: 700, padding: '2px 8px',
                borderRadius: 2,
                background: p.estBg,
                color: p.estColor,
                flexShrink: 0, marginLeft: 12 }}>
                {p.estado}
              </span>
            </div>
            <div style={{ fontSize: 13, fontWeight: 600,
              color: '#C8D8E8', lineHeight: 1.5,
              marginBottom: 8 }}>{p.q}</div>
            <div style={{ display: 'flex', gap: 16,
              fontSize: 10, color: '#4A6070',
              marginBottom: p.respuesta ? 10 : 0 }}>
              <span>Enviada: {p.enviada}</span>
              <span>Límite: {p.limite}</span>
              <span style={{ color: p.notaColor }}>
                {p.nota}
              </span>
            </div>
            {p.respuesta && (
              <div style={{ marginTop: 10,
                paddingTop: 10,
                borderTop: '1px solid #1E3A5A' }}>
                <div style={{ fontSize: 9,
                  color: '#4A6070',
                  textTransform: 'uppercase',
                  letterSpacing: 1, marginBottom: 6 }}>
                  Respuesta del vendedor
                </div>
                <div style={{ fontSize: 12,
                  color: '#8AAABB', lineHeight: 1.6,
                  marginBottom: 8,
                  fontStyle: 'italic' }}>
                  "{p.respuesta}"
                </div>
                {p.evaluacion && (
                  <div style={{ padding: '8px 10px',
                    background: p.evaluacion.ok
                      ? 'rgba(134,239,172,0.06)'
                      : 'rgba(239,68,68,0.06)',
                    border: `1px solid ${p.evaluacion.ok
                      ? 'rgba(134,239,172,0.2)'
                      : 'rgba(239,68,68,0.2)'}`,
                    borderRadius: 3,
                    fontSize: 11,
                    color: p.evaluacion.ok
                      ? '#86EFAC' : '#FCA5A5',
                    lineHeight: 1.5 }}>
                    {p.evaluacion.ok ? '✓' : '✗'}{' '}
                    {p.evaluacion.texto}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
        </div>
      </div>
    );
  };

  // ── MEMO ──────────────────────────────────────────
  const renderMemo = () => {
    const deal = DEALS.find(d => d.id === activeDeal) || DEALS[0];

    const condiciones = [
      {
        id: 'C-01',
        texto: 'Vendedor revela identidad de contraparte del PPA bajo NDA extendido',
        estado: 'Bloqueada',
        estColor: '#FCA5A5',
        estBg: 'rgba(239,68,68,0.1)',
        responsable: 'Vendedor',
        deadline: 'Antes del IC',
      },
      {
        id: 'C-02',
        texto: 'Factor de planta histórico confirmado con mediciones de irradiación (últimos 3 años)',
        estado: 'Bloqueada',
        estColor: '#FCA5A5',
        estBg: 'rgba(239,68,68,0.1)',
        responsable: 'Vendedor / Interventor',
        deadline: 'Antes del IC',
      },
      {
        id: 'C-03',
        texto: 'Plan de Manejo Ambiental vigente recibido y revisado por asesor ESG',
        estado: 'Pendiente',
        estColor: '#FCD34D',
        estBg: 'rgba(250,204,21,0.1)',
        responsable: 'Ashmore / Asesor ESG',
        deadline: 'Mar 25',
      },
      {
        id: 'C-04',
        texto: 'Estructura de capital confirmada — Acuerdo de accionistas recibido y revisado',
        estado: 'Pendiente',
        estColor: '#FCD34D',
        estBg: 'rgba(250,204,21,0.1)',
        responsable: 'Asesor Legal',
        deadline: 'Mar 28',
      },
    ];

    const riesgos = [
      {
        nombre: 'Concentración de ingresos en un PPA',
        prob: 'Alta', impacto: 'Alto',
        probColor: '#FCA5A5', impactoColor: '#FCA5A5',
        mitigante: 'Verificar diversificación post-2037 antes del cierre. Modelar escenario sin renovación del PPA.',
      },
      {
        nombre: 'Factor de planta optimista sin soporte histórico',
        prob: 'Alta', impacto: 'Alto',
        probColor: '#FCA5A5', impactoColor: '#FCA5A5',
        mitigante: 'Condicionar valoración a confirmación de mediciones históricas. Ajustar modelo a 22% como caso base.',
      },
      {
        nombre: 'Dependencia del múltiplo de salida a 2034',
        prob: 'Media', impacto: 'Alto',
        probColor: '#FCD34D', impactoColor: '#FCA5A5',
        mitigante: 'Negociar mecanismos de salida alternativos. Evaluar atractivo del activo en escenario de retención.',
      },
      {
        nombre: 'Riesgo regulatorio CREG en tarifa de transmisión',
        prob: 'Baja', impacto: 'Medio',
        probColor: '#86EFAC', impactoColor: '#FCD34D',
        mitigante: 'Monitorear resoluciones CREG. Incluir covenant en SHA sobre cambios regulatorios materiales.',
      },
    ];

    const ddCompletitud = [
      { label: 'Financiero', pct: 80, color: '#FCD34D',
        status: 'En revisión' },
      { label: 'Técnico', pct: 95, color: '#86EFAC',
        status: 'Completo' },
      { label: 'Legal', pct: 45, color: '#FCA5A5',
        status: 'Bloqueado' },
      { label: 'ESG', pct: 30, color: '#FCA5A5',
        status: 'Incompleto' },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column',
        overflowY: 'auto', flex: 1 }}>
        <div style={{
          padding: '12px 24px',
          borderBottom: '1px solid #1E3A5A',
          background: '#071B33',
          display: 'flex', alignItems: 'center',
          gap: 16, flexShrink: 0,
        }}>
          <div style={{
            fontFamily: 'Georgia, serif',
            fontSize: 18, fontWeight: 700,
            color: '#F8F5F0',
          }}>
            {deal.nombre}
          </div>
          <div style={{
            width: 1, height: 16,
            background: '#1E3A5A',
          }} />
          <div style={{
            fontSize: 11, color: '#4A6070',
          }}>
            {deal.pais} · {deal.monto}
          </div>
          <div style={{
            width: 1, height: 16,
            background: '#1E3A5A',
          }} />
          <span style={{
            fontSize: 9, fontWeight: 700,
            padding: '2px 8px', borderRadius: 2,
            background: deal.etapaBg,
            color: deal.etapaColor,
          }}>
            {deal.etapa}
          </span>
          <div style={{ flex: 1 }} />
          <div style={{
            fontSize: 10, color: '#4A6070',
          }}>
            IC objetivo: {deal.icFecha}
          </div>
        </div>
        <div style={{ padding: '20px 24px', flex: 1 }}>

        {/* Deal snapshot */}
        <div style={{ background: dark,
          border: `1px solid ${border}`,
          borderRadius: 4, padding: 20,
          marginBottom: 16 }}>
          <div style={{ display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 9,
                fontWeight: 700, letterSpacing: 2,
                textTransform: 'uppercase',
                color: '#4A6070', marginBottom: 6 }}>
                Investment Memo — Borrador para IC
              </div>
              <div style={{ fontFamily: 'Georgia, serif',
                fontSize: 28, fontWeight: 700,
                color: '#F8F5F0', marginBottom: 4 }}>
                Proyecto Solar Córdoba
              </div>
              <div style={{ fontSize: 13,
                color: '#6A8AAA' }}>
                Colombia · Energía renovable · 80 MW
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: 9,
                fontWeight: 700, padding: '3px 10px',
                borderRadius: 2,
                background: 'rgba(249,168,212,0.1)',
                color: '#F9A8D4',
                display: 'inline-block',
                marginBottom: 8 }}>
                Generado por IA · Requiere revisión
              </span>
              <div style={{ fontSize: 11,
                color: '#4A6070' }}>
                IC objetivo: Abr 15, 2026
              </div>
            </div>
          </div>
          <div style={{ display: 'grid',
            gridTemplateColumns: 'repeat(6,1fr)',
            gap: 10 }}>
            {[
              { label: 'Ticket Ashmore', val: '~USD 55M' },
              { label: 'Participación', val: 'Control' },
              { label: 'TIR ajustada', val: '13.1%',
                color: '#FCD34D' },
              { label: 'MOIC base', val: '2.4x',
                color: '#FCD34D' },
              { label: 'TIR pesimista', val: '9.1%',
                color: '#FCA5A5' },
              { label: 'Break-even', val: 'Año 6' },
            ].map((m, i) => (
              <div key={i} style={{ background: navy,
                borderRadius: 3, padding: '10px 12px' }}>
                <div style={{ fontSize: 9,
                  color: '#4A6070',
                  textTransform: 'uppercase',
                  letterSpacing: 1, marginBottom: 4 }}>
                  {m.label}
                </div>
                <div style={{ fontFamily: 'Georgia, serif',
                  fontSize: 18, fontWeight: 700,
                  color: m.color || '#F8F5F0' }}>
                  {m.val}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Estado DD + Condiciones para IC */}
        <div style={{ display: 'grid',
          gridTemplateColumns: '1fr 1.4fr',
          gap: 16, marginBottom: 16 }}>

          {/* Semáforo DD */}
          <div style={{ background: dark,
            border: `1px solid ${border}`,
            borderRadius: 4, padding: 16 }}>
            <div style={{ fontSize: 10, fontWeight: 700,
              letterSpacing: 2, textTransform: 'uppercase',
              color: copper, marginBottom: 14 }}>
              Completitud del DD
            </div>
            {ddCompletitud.map((f, fi) => (
              <div key={fi} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 5 }}>
                  <div style={{ display: 'flex',
                    alignItems: 'center', gap: 6 }}>
                    <div style={{ width: 6, height: 6,
                      borderRadius: '50%',
                      background: f.color }} />
                    <span style={{ fontSize: 12,
                      color: '#C8D8E8' }}>{f.label}</span>
                  </div>
                  <div style={{ display: 'flex',
                    alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 11,
                      color: f.color,
                      fontWeight: 600 }}>{f.status}</span>
                    <span style={{ fontSize: 11,
                      color: '#4A6070' }}>{f.pct}%</span>
                  </div>
                </div>
                <div style={{ height: 5,
                  background: '#1E3A5A',
                  borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ height: '100%',
                    width: `${f.pct}%`,
                    background: f.color,
                    borderRadius: 3,
                    transition: 'width 0.5s' }} />
                </div>
              </div>
            ))}
            <div style={{ marginTop: 14, padding: '10px 12px',
              background: 'rgba(239,68,68,0.06)',
              border: '1px solid rgba(239,68,68,0.2)',
              borderRadius: 3, fontSize: 11,
              color: '#FCA5A5', lineHeight: 1.5 }}>
              El DD Legal y ESG están incompletos —
              el IC no debería convocarse hasta resolver
              las condiciones C-01 y C-02.
            </div>
          </div>

          {/* Condiciones para el IC */}
          <div style={{ background: dark,
            border: `1px solid ${border}`,
            borderRadius: 4, padding: 16 }}>
            <div style={{ fontSize: 10, fontWeight: 700,
              letterSpacing: 2, textTransform: 'uppercase',
              color: copper, marginBottom: 14 }}>
              Condiciones para el IC
            </div>
            {condiciones.map((c, ci) => (
              <div key={ci} style={{ display: 'flex',
                gap: 10, alignItems: 'flex-start',
                padding: '10px 0',
                borderBottom: ci < condiciones.length - 1
                  ? '1px solid #0D2540' : 'none' }}>
                <div style={{ width: 24, height: 24,
                  borderRadius: 3, flexShrink: 0,
                  background: c.estBg,
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 9, fontWeight: 700,
                  color: c.estColor }}>
                  {c.id.replace('C-','')}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12,
                    color: '#C8D8E8', lineHeight: 1.5,
                    marginBottom: 4 }}>{c.texto}</div>
                  <div style={{ display: 'flex',
                    gap: 12, fontSize: 10,
                    color: '#4A6070' }}>
                    <span>Resp: {c.responsable}</span>
                    <span>Plazo: {c.deadline}</span>
                  </div>
                </div>
                <span style={{ fontSize: 9,
                  fontWeight: 700, padding: '2px 7px',
                  borderRadius: 2,
                  background: c.estBg,
                  color: c.estColor,
                  flexShrink: 0 }}>
                  {c.estado}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Matriz de riesgos */}
        <div style={{ background: dark,
          border: `1px solid ${border}`,
          borderRadius: 4, overflow: 'hidden',
          marginBottom: 16 }}>
          <div style={{ padding: '12px 16px',
            borderBottom: `1px solid ${border}`,
            fontSize: 10, fontWeight: 700,
            letterSpacing: 2, textTransform: 'uppercase',
            color: copper }}>
            Matriz de riesgos principales
          </div>
          <table style={{ width: '100%',
            borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Riesgo','Probabilidad',
                  'Impacto','Mitigante'].map(h => (
                  <th key={h} style={{ fontSize: 9,
                    color: '#4A6070',
                    textTransform: 'uppercase',
                    letterSpacing: 1,
                    padding: '8px 14px',
                    textAlign: 'left',
                    borderBottom:
                      `1px solid ${border}` }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {riesgos.map((r, ri) => (
                <tr key={ri} style={{ background:
                  ri % 2 === 0
                    ? 'transparent'
                    : 'rgba(255,255,255,0.02)' }}>
                  <td style={{ padding: '10px 14px',
                    fontSize: 12, fontWeight: 600,
                    color: '#C8D8E8',
                    borderBottom: '1px solid #0D2540',
                    maxWidth: 220 }}>
                    {r.nombre}
                  </td>
                  <td style={{ padding: '10px 14px',
                    borderBottom: '1px solid #0D2540' }}>
                    <span style={{ fontSize: 10,
                      fontWeight: 700,
                      padding: '2px 8px', borderRadius: 2,
                      background: `${r.probColor}22`,
                      color: r.probColor }}>
                      {r.prob}
                    </span>
                  </td>
                  <td style={{ padding: '10px 14px',
                    borderBottom: '1px solid #0D2540' }}>
                    <span style={{ fontSize: 10,
                      fontWeight: 700,
                      padding: '2px 8px', borderRadius: 2,
                      background: `${r.impactoColor}22`,
                      color: r.impactoColor }}>
                      {r.impacto}
                    </span>
                  </td>
                  <td style={{ padding: '10px 14px',
                    fontSize: 11, color: '#6A8AAA',
                    lineHeight: 1.5,
                    borderBottom: '1px solid #0D2540' }}>
                    {r.mitigante}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Secciones del memo */}
        {[
          {
            num: '1', titulo: 'Resumen ejecutivo',
            texto: 'Proyecto Solar Córdoba es un parque solar fotovoltaico de 80 MW-dc en Montería, Colombia, en operación desde enero 2022. El activo tiene un PPA de 40 MW con contraparte no divulgada (bajo NDA) a USD 42/MWh indexado a inflación USA por 15 años. La energía restante se vende en la bolsa XM. Ashmore evalúa un ticket de ~USD 55M por una participación de control.',
            highlight: false,
          },
          {
            num: '2', titulo: 'Análisis financiero',
            texto: 'El modelo del vendedor muestra una TIR del equity de 18.4% USD — materialmente por encima del objetivo del Fondo III (12-16%). El análisis de supuestos identifica tres variables agresivas que explican el exceso de retorno: crecimiento de ingresos de 9.8% real (benchmark: 3-8%), múltiplo de salida de 12.5x EV/EBITDA (benchmark: 7-10x), y factor de planta de 26% sin soporte histórico. Ajustando las tres variables al caso base razonable, la TIR converge a 11.2-13.1%.',
            highlight: false,
          },
          {
            num: '3', titulo: 'Riesgos principales',
            texto: 'Cuatro riesgos requieren resolución antes del IC: (1) Identidad de la contraparte del PPA — el 50% de los ingresos depende de un contrato cuya contraparte permanece bajo NDA. (2) Factor de planta no verificado — el supuesto del 26% no tiene soporte histórico. (3) Plan de manejo ambiental — ANLA no confirmada para el período post-2024. (4) Múltiplo de salida — la valoración requiere compradores a múltiplos de 12.5x a 2034.',
            highlight: false,
          },
          {
            num: '4', titulo: 'Recomendación',
            texto: 'CONTINUAR EL DD CON CONDICIÓN: el vendedor debe (1) revelar la identidad de la contraparte del PPA bajo NDA extendido y (2) proporcionar el historial de factor de planta de los últimos 3 años con soporte de mediciones de irradiación, antes de la sesión del IC. Sin esta información, la valoración no puede confirmarse y el activo no debería presentarse al comité.',
            highlight: true,
          },
        ].map((sec, i) => (
          <div key={i} style={{
            background: sec.highlight
              ? 'rgba(184,134,11,0.06)' : dark,
            border: `1px solid ${border}`,
            borderLeft: `3px solid ${copper}`,
            borderRadius: '0 4px 4px 0',
            padding: '14px 16px', marginBottom: 8 }}>
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
      </div>
    );
  };

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
        display: 'flex', flexDirection: 'row' }}>
        {renderSidebar()}
        <div style={{
          flex: 1, overflow: 'hidden',
          display: 'flex', flexDirection: 'column',
        }}>
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'financiero' && renderFinanciero()}
          {activeTab === 'dataroom' && renderDataRoom()}
          {activeTab === 'preguntas' && renderPreguntas()}
          {activeTab === 'memo' && renderMemo()}
        </div>
      </div>
    </div>
  );
};

export default Nivel2DDPage;
