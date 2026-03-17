import { useState } from "react";
import { useNavigate } from "react-router-dom";

const navy = '#0A2240';
const copper = '#B8860B';
const dark = '#071B33';
const border = '#1E3A5A';

const ACTIVOS = [
  {
    id: 'termoem',
    nombre: 'TermoemCali',
    tipo: 'Energía · Gas',
    pais: '🇨🇴 Colombia',
    fondo: 'Fondo I',
    fondoColor: '#93C5FD',
    ticket: 'USD 285M',
    desde: '1999',
    salud: { fin: 'amarillo', op: 'amarillo',
      esg: 'verde', reg: 'rojo' },
    kpis: {
      ingresos: 'USD 8.4M', ingresosDelta: '-6%',
      ebitda: 'USD 5.6M', margen: '67%',
      dscr: '1.42x', disponibilidad: '91.2%',
    },
    alertas: 3,
    proximaJunta: 'Mar 25, 2026',
    briefListo: true,
    esgPct: 78,
    regulaciones: ['CREG 101 100/2026'],
  },
  {
    id: 'cacao',
    nombre: 'Ruta del Cacao',
    tipo: 'Transporte · 4G',
    pais: '🇨🇴 Colombia',
    fondo: 'Fondo II',
    fondoColor: '#86EFAC',
    ticket: 'USD 248M',
    desde: '2018',
    salud: { fin: 'verde', op: 'verde',
      esg: 'verde', reg: 'verde' },
    kpis: {
      ingresos: 'USD 6.2M', ingresosDelta: '+4%',
      ebitda: 'USD 4.8M', margen: '77%',
      dscr: '1.61x', disponibilidad: '97.8%',
    },
    alertas: 0,
    proximaJunta: 'Abr 8, 2026',
    briefListo: false,
    esgPct: 85,
    regulaciones: [],
  },
  {
    id: 'transambiental',
    nombre: 'Transambiental',
    tipo: 'Transporte · Urbano',
    pais: '🇨🇴 Colombia',
    fondo: 'Fondo II',
    fondoColor: '#86EFAC',
    ticket: 'USD 80M',
    desde: '2017',
    salud: { fin: 'verde', op: 'amarillo',
      esg: 'verde', reg: 'verde' },
    kpis: {
      ingresos: 'USD 4.1M', ingresosDelta: '+2%',
      ebitda: 'USD 2.8M', margen: '68%',
      dscr: '1.38x', disponibilidad: '94.1%',
    },
    alertas: 1,
    proximaJunta: 'Abr 15, 2026',
    briefListo: false,
    esgPct: 91,
    regulaciones: [],
  },
  {
    id: 'guajira',
    nombre: 'Líneas La Guajira',
    tipo: 'Energía · Transmisión',
    pais: '🇨🇴 Colombia',
    fondo: 'Fondo I',
    fondoColor: '#93C5FD',
    ticket: 'USD 45M',
    desde: '2015',
    salud: { fin: 'verde', op: 'verde',
      esg: 'amarillo', reg: 'rojo' },
    kpis: {
      ingresos: 'USD 2.1M', ingresosDelta: '+1%',
      ebitda: 'USD 1.8M', margen: '86%',
      dscr: '1.72x', disponibilidad: '99.1%',
    },
    alertas: 1,
    proximaJunta: 'May 6, 2026',
    briefListo: false,
    esgPct: 62,
    regulaciones: ['CREG 101 100/2026'],
  },
  {
    id: 'atlas',
    nombre: 'Atlas Renewable',
    tipo: 'Energía · Renovable',
    pais: '🇨🇴 Colombia',
    fondo: 'Fondo III',
    fondoColor: '#FCD34D',
    ticket: 'USD 55M',
    desde: '2022',
    salud: { fin: 'verde', op: 'verde',
      esg: 'verde', reg: 'amarillo' },
    kpis: {
      ingresos: 'USD 1.8M', ingresosDelta: '+8%',
      ebitda: 'USD 1.4M', margen: '78%',
      dscr: '1.45x', disponibilidad: '96.2%',
    },
    alertas: 1,
    proximaJunta: 'Abr 22, 2026',
    briefListo: false,
    esgPct: 88,
    regulaciones: ['CREG 101 100/2026'],
  },
  {
    id: 'bioena',
    nombre: 'Bioena',
    tipo: 'Industria · Pellets',
    pais: '🇨🇴 Colombia',
    fondo: 'Fondo III',
    fondoColor: '#FCD34D',
    ticket: 'USD 100M',
    desde: '2023',
    salud: { fin: 'verde', op: 'verde',
      esg: 'verde', reg: 'verde' },
    kpis: {
      ingresos: 'USD 4.8M', ingresosDelta: '+2%',
      ebitda: 'USD 2.9M', margen: '60%',
      dscr: '1.44x', disponibilidad: '93.5%',
    },
    alertas: 0,
    proximaJunta: 'May 12, 2026',
    briefListo: false,
    esgPct: 65,
    regulaciones: [],
  },
  {
    id: 'logika',
    nombre: 'Lógika',
    tipo: 'Logística · Centro',
    pais: '🇨🇴 Colombia',
    fondo: 'Fondo III',
    fondoColor: '#FCD34D',
    ticket: 'USD 35M',
    desde: '2023',
    salud: { fin: 'amarillo', op: 'verde',
      esg: 'verde', reg: 'verde' },
    kpis: {
      ingresos: 'USD 3.2M', ingresosDelta: '-8%',
      ebitda: 'USD 2.1M', margen: '66%',
      dscr: '1.31x', disponibilidad: '—',
    },
    alertas: 1,
    proximaJunta: 'Abr 29, 2026',
    briefListo: false,
    esgPct: 92,
    regulaciones: [],
  },
  {
    id: 'sohec',
    nombre: 'Sohec',
    tipo: 'Salud · Oncología',
    pais: '🇨🇴 Colombia',
    fondo: 'Fondo II',
    fondoColor: '#86EFAC',
    ticket: 'USD 28M',
    desde: '2019',
    salud: { fin: 'verde', op: 'verde',
      esg: 'verde', reg: 'verde' },
    kpis: {
      ingresos: 'USD 1.4M', ingresosDelta: '+6%',
      ebitda: 'USD 0.9M', margen: '64%',
      dscr: '1.52x', disponibilidad: '—',
    },
    alertas: 0,
    proximaJunta: 'May 20, 2026',
    briefListo: false,
    esgPct: 79,
    regulaciones: [],
  },
  {
    id: 'ferrocol',
    nombre: 'FERROCOL',
    tipo: 'Transporte · Ferroviario',
    pais: '🇨🇴 Colombia',
    fondo: 'Fondo II',
    fondoColor: '#86EFAC',
    ticket: 'USD 42M',
    desde: '2018',
    salud: { fin: 'verde', op: 'verde',
      esg: 'amarillo', reg: 'verde' },
    kpis: {
      ingresos: 'USD 2.8M', ingresosDelta: '+3%',
      ebitda: 'USD 1.9M', margen: '68%',
      dscr: '1.48x', disponibilidad: '95.4%',
    },
    alertas: 0,
    proximaJunta: 'Jun 3, 2026',
    briefListo: false,
    esgPct: 58,
    regulaciones: [],
  },
  {
    id: 'atica',
    nombre: 'Ática Andina',
    tipo: 'Agua · Residuos',
    pais: '🇨🇴 Colombia',
    fondo: 'Fondo III',
    fondoColor: '#FCD34D',
    ticket: 'USD 30M',
    desde: '2023',
    salud: { fin: 'verde', op: 'amarillo',
      esg: 'verde', reg: 'verde' },
    kpis: {
      ingresos: 'USD 2.1M', ingresosDelta: '+3%',
      ebitda: 'USD 1.4M', margen: '67%',
      dscr: '1.52x', disponibilidad: '—',
    },
    alertas: 1,
    proximaJunta: 'Abr 30, 2026',
    briefListo: false,
    esgPct: 41,
    regulaciones: [],
  },
  {
    id: 'creas',
    nombre: 'Creas',
    tipo: 'Social · Infraestructura',
    pais: '🇨🇴 Colombia',
    fondo: 'Fondo III',
    fondoColor: '#FCD34D',
    ticket: 'USD 25M',
    desde: '2023',
    salud: { fin: 'verde', op: 'verde',
      esg: 'verde', reg: 'verde' },
    kpis: {
      ingresos: 'USD 1.8M', ingresosDelta: 'En línea',
      ebitda: 'USD 1.2M', margen: '67%',
      dscr: '1.38x', disponibilidad: '—',
    },
    alertas: 0,
    proximaJunta: 'May 28, 2026',
    briefListo: false,
    esgPct: 100,
    regulaciones: [],
  },
];

const TABS = [
  { id: 'dashboard', label: 'Dashboard',
    color: copper },
  { id: 'activos', label: 'Activos',
    color: '#86EFAC' },
  { id: 'regulatorio', label: 'Regulatorio',
    color: '#93C5FD' },
  { id: 'juntas', label: 'Juntas',
    color: '#FCD34D' },
  { id: 'reporting', label: 'Reporting LP',
    color: '#F9A8D4' },
];

const PORTAFOLIO_CONSOLIDADO = {
  tirObjetivo: 13.2,
  tirActual: 12.8,
  tirEntrada: 14.1,
  moicObjetivo: 2.1,
  moicActual: 1.8,
  capitalDesplegado: 953,
  navTotal: 1089,
  ebitdaQ1: 22.7,
  ebitdaQ1Plan: 24.1,
  distribuciones: 0,
};

const ACTIVOS_DETALLE: Record<string, {
  tirEntrada: number;
  tirActual: number;
  moicActual: number;
  moicObjetivo: number;
  ebitdaActual: number;
  ebitdaPlan: number;
  ingresoActual: number;
  ingresoPlan: number;
  deuda: number;
  dscr: number;
  dscrMinimo: number;
  supuestosEntrada: Array<{
    nombre: string;
    valorEntrada: string;
    valorActual: string;
    cumplido: boolean | 'parcial';
  }>;
  valoracion: {
    entryEV: number;
    currentEV: number;
    entryEbitdaMultiple: number;
    currentEbitdaMultiple: number;
  };
}> = {
  termoem: {
    tirEntrada: 15.2, tirActual: 13.1,
    moicActual: 1.6, moicObjetivo: 2.2,
    ebitdaActual: 5.6, ebitdaPlan: 6.1,
    ingresoActual: 8.4, ingresoPlan: 8.9,
    deuda: 42, dscr: 1.42, dscrMinimo: 1.25,
    supuestosEntrada: [
      { nombre: 'Precio bolsa energía ($/MWh)',
        valorEntrada: 'USD 185/MWh',
        valorActual: 'USD 162/MWh',
        cumplido: false },
      { nombre: 'Factor de disponibilidad',
        valorEntrada: '95%',
        valorActual: '91.2%',
        cumplido: false },
      { nombre: 'Cargo por confiabilidad (OEF)',
        valorEntrada: 'USD 14,200/MW-mes',
        valorActual: 'USD 13,800/MW-mes',
        cumplido: 'parcial' },
      { nombre: 'Crecimiento ingresos real',
        valorEntrada: '4% anual',
        valorActual: '-6% Q1 2026',
        cumplido: false },
      { nombre: 'Margen EBITDA',
        valorEntrada: '71%',
        valorActual: '67%',
        cumplido: 'parcial' },
    ],
    valoracion: {
      entryEV: 185, currentEV: 172,
      entryEbitdaMultiple: 8.2,
      currentEbitdaMultiple: 7.7,
    },
  },
  cacao: {
    tirEntrada: 14.8, tirActual: 14.2,
    moicActual: 1.9, moicObjetivo: 2.4,
    ebitdaActual: 4.8, ebitdaPlan: 4.6,
    ingresoActual: 6.2, ingresoPlan: 5.9,
    deuda: 89, dscr: 1.61, dscrMinimo: 1.20,
    supuestosEntrada: [
      { nombre: 'Tráfico vehicular (VMD)',
        valorEntrada: '18,500 veh/día',
        valorActual: '19,200 veh/día',
        cumplido: true },
      { nombre: 'Peaje promedio ponderado',
        valorEntrada: 'COP 12,800',
        valorActual: 'COP 13,100',
        cumplido: true },
      { nombre: 'Disponibilidad vía',
        valorEntrada: '98%',
        valorActual: '97.8%',
        cumplido: true },
      { nombre: 'CAPEX de mantenimiento',
        valorEntrada: '3.2% ingresos',
        valorActual: '3.0% ingresos',
        cumplido: true },
    ],
    valoracion: {
      entryEV: 312, currentEV: 334,
      entryEbitdaMultiple: 7.8,
      currentEbitdaMultiple: 8.3,
    },
  },
  atlas: {
    tirEntrada: 16.1, tirActual: 15.4,
    moicActual: 1.4, moicObjetivo: 2.6,
    ebitdaActual: 1.4, ebitdaPlan: 1.3,
    ingresoActual: 1.8, ingresoPlan: 1.7,
    deuda: 28, dscr: 1.45, dscrMinimo: 1.20,
    supuestosEntrada: [
      { nombre: 'Factor de planta solar',
        valorEntrada: '22%',
        valorActual: '21.8%',
        cumplido: true },
      { nombre: 'Precio PPA',
        valorEntrada: 'USD 48/MWh',
        valorActual: 'USD 48/MWh',
        cumplido: true },
      { nombre: 'Crecimiento ingresos',
        valorEntrada: '6% anual',
        valorActual: '+8% Q1 2026',
        cumplido: true },
    ],
    valoracion: {
      entryEV: 68, currentEV: 74,
      entryEbitdaMultiple: 9.1,
      currentEbitdaMultiple: 9.8,
    },
  },
  logika: {
    tirEntrada: 13.8, tirActual: 11.2,
    moicActual: 1.1, moicObjetivo: 2.1,
    ebitdaActual: 2.1, ebitdaPlan: 2.3,
    ingresoActual: 3.2, ingresoPlan: 3.5,
    deuda: 18, dscr: 1.31, dscrMinimo: 1.25,
    supuestosEntrada: [
      { nombre: 'Ocupación del centro logístico',
        valorEntrada: '92%',
        valorActual: '78%',
        cumplido: false },
      { nombre: 'Tarifa arrendamiento',
        valorEntrada: 'USD 8.2/m²/mes',
        valorActual: 'USD 7.9/m²/mes',
        cumplido: 'parcial' },
      { nombre: 'Crecimiento demanda logística',
        valorEntrada: '8% anual',
        valorActual: '-8% Q1 2026',
        cumplido: false },
    ],
    valoracion: {
      entryEV: 42, currentEV: 38,
      entryEbitdaMultiple: 7.2,
      currentEbitdaMultiple: 6.5,
    },
  },
};

const getActiDetail = (id: string) =>
  ACTIVOS_DETALLE[id] || ACTIVOS_DETALLE.cacao;

const saludColor = (s: string) =>
  s === 'verde' ? '#22C55E' :
  s === 'amarillo' ? '#EAB308' : '#EF4444';

const Nivel2PortafolioPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] =
    useState('dashboard');
  const [activeActivo, setActiveActivo] =
    useState('termoem');
  const [activeLp, setActiveLp] = useState('caf');

  const activo = ACTIVOS.find(
    a => a.id === activeActivo) || ACTIVOS[0];

  const badge = (
    text: string, bg: string, color: string
  ) => (
    <span style={{ display: 'inline-block',
      fontSize: 9, fontWeight: 700,
      padding: '2px 7px', borderRadius: 2,
      background: bg, color }}>
      {text}
    </span>
  );

  const sLabel = (text: string,
    color = copper) => (
    <div style={{ fontSize: 9, fontWeight: 700,
      letterSpacing: 2, textTransform: 'uppercase',
      color, marginBottom: 10 }}>
      {text}
    </div>
  );

  const kpiCard = (
    label: string, val: string,
    sub?: string, subColor = '#4A6070'
  ) => (
    <div style={{ background: dark,
      border: `1px solid ${border}`,
      borderRadius: 4, padding: '12px 14px' }}>
      <div style={{ fontSize: 10, color: '#4A6070',
        textTransform: 'uppercase', letterSpacing: 1,
        marginBottom: 5 }}>{label}</div>
      <div style={{ fontFamily: 'Georgia, serif',
        fontSize: 24, fontWeight: 700,
        color: '#F8F5F0', lineHeight: 1,
        marginBottom: 3 }}>{val}</div>
      {sub && <div style={{ fontSize: 10,
        color: subColor }}>{sub}</div>}
    </div>
  );

  // ── SIDEBAR ──────────────────────────────────
  const renderSidebar = () => (
    <div style={{ width: 200, flexShrink: 0,
      borderRight: `1px solid ${border}`,
      display: 'flex', flexDirection: 'column',
      overflow: 'hidden' }}>
      <div style={{ padding: '10px 14px 8px',
        fontSize: 9, fontWeight: 700,
        letterSpacing: 2, textTransform: 'uppercase',
        color: '#4A6070',
        borderBottom: `1px solid ${border}` }}>
        11 activos · 3 fondos
      </div>
      <div style={{ overflowY: 'auto', flex: 1 }}>
        {ACTIVOS.map(a => (
          <div key={a.id}
            onClick={() => setActiveActivo(a.id)}
            style={{ padding: '10px 14px',
              cursor: 'pointer',
              borderLeft: `2px solid ${
                activeActivo === a.id
                  ? copper : 'transparent'}`,
              background: activeActivo === a.id
                ? '#0A2A40' : 'transparent',
              borderBottom: `1px solid #071B33` }}>
            <div style={{ display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 2 }}>
              <div style={{ fontSize: 12,
                fontWeight: 600,
                color: '#F8F5F0' }}>
                {a.nombre}
              </div>
              {a.alertas > 0 && (
                <div style={{ width: 16, height: 16,
                  borderRadius: '50%',
                  background: '#FCA5A5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 8, fontWeight: 700,
                  color: '#7F1D1D' }}>
                  {a.alertas}
                </div>
              )}
            </div>
            <div style={{ fontSize: 9,
              color: '#4A6070', marginBottom: 4 }}>
              {a.tipo}
            </div>
            <div style={{ display: 'flex',
              gap: 4 }}>
              {Object.values(a.salud).map((s,i) => (
                <div key={i} style={{ width: 6,
                  height: 6, borderRadius: '50%',
                  background: saludColor(s) }} />
              ))}
              <span style={{ fontSize: 9,
                color: '#4A6070', marginLeft: 2 }}>
                {a.fondo}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // ── TAB 1: DASHBOARD ─────────────────────────
  const renderDashboard = () => {
    const pc = PORTAFOLIO_CONSOLIDADO;
    const tirDelta = pc.tirActual - pc.tirObjetivo;
    const ebitdaDelta = ((pc.ebitdaQ1 - pc.ebitdaQ1Plan)
      / pc.ebitdaQ1Plan * 100);

    return (
      <div style={{ flex: 1, overflow: 'hidden',
        display: 'flex' }}>
        {renderSidebar()}
        <div style={{ flex: 1, overflowY: 'auto',
          padding: '20px 24px' }}>

          {/* TIR y retorno — lo más importante */}
          <div style={{ marginBottom: 20 }}>
            {sLabel('Performance del fondo vs. ' +
              'compromisos con LPs')}
            <div style={{ display: 'grid',
              gridTemplateColumns:
                '1fr 1fr 1fr 1fr', gap: 10 }}>
              {[
                {
                  label: 'TIR neta proyectada',
                  val: `${pc.tirActual}%`,
                  sub: `Objetivo: ${pc.tirObjetivo}%`,
                  delta: `${tirDelta > 0 ? '+' : ''}${tirDelta.toFixed(1)}pp vs. objetivo`,
                  deltaColor: tirDelta >= 0
                    ? '#86EFAC' : '#FCA5A5',
                },
                {
                  label: 'TIR de entrada promedio',
                  val: `${pc.tirEntrada}%`,
                  sub: 'Al momento de inversión',
                  delta: `${(pc.tirActual - pc.tirEntrada).toFixed(1)}pp desde entrada`,
                  deltaColor: pc.tirActual >= pc.tirEntrada
                    ? '#86EFAC' : '#FCA5A5',
                },
                {
                  label: 'MOIC actual',
                  val: `${pc.moicActual}x`,
                  sub: `Objetivo: ${pc.moicObjetivo}x`,
                  delta: 'Período de inversión activo',
                  deltaColor: '#4A6070',
                },
                {
                  label: 'NAV total portafolio',
                  val: `USD ${pc.navTotal}M`,
                  sub: `Capital desplegado: USD ${pc.capitalDesplegado}M`,
                  delta: `+${((pc.navTotal - pc.capitalDesplegado) / pc.capitalDesplegado * 100).toFixed(1)}% vs. costo`,
                  deltaColor: '#86EFAC',
                },
              ].map((k, i) => (
                <div key={i} style={{ background: dark,
                  border: `1px solid ${border}`,
                  borderTop: `3px solid ${k.deltaColor}`,
                  borderRadius: 4,
                  padding: '14px 16px' }}>
                  <div style={{ fontSize: 10,
                    color: '#4A6070',
                    textTransform: 'uppercase',
                    letterSpacing: 1,
                    marginBottom: 6 }}>{k.label}</div>
                  <div style={{ fontFamily:
                    'Georgia, serif', fontSize: 28,
                    fontWeight: 700,
                    color: '#F8F5F0',
                    lineHeight: 1,
                    marginBottom: 4 }}>{k.val}</div>
                  <div style={{ fontSize: 10,
                    color: '#4A6070',
                    marginBottom: 3 }}>{k.sub}</div>
                  <div style={{ fontSize: 10,
                    color: k.deltaColor,
                    fontWeight: 600 }}>
                    {k.delta}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activos por performance vs. plan */}
          <div style={{ marginBottom: 20 }}>
            {sLabel('Activos — Performance vs. ' +
              'modelo de entrada')}
            <div style={{ background: dark,
              border: `1px solid ${border}`,
              borderRadius: 4,
              overflow: 'hidden' }}>
              <div style={{ display: 'grid',
                gridTemplateColumns:
                  '140px 80px 80px 80px 80px 1fr',
                padding: '8px 14px',
                borderBottom:
                  `1px solid ${border}` }}>
                {['Activo','TIR entrada','TIR actual',
                  'EBITDA actual','vs. plan',
                  'Supuestos'].map(h => (
                  <div key={h} style={{ fontSize: 9,
                    color: '#4A6070',
                    textTransform: 'uppercase',
                    letterSpacing: 1 }}>{h}</div>
                ))}
              </div>
              {ACTIVOS.filter(a =>
                ACTIVOS_DETALLE[a.id]).map((a, i) => {
                const d = ACTIVOS_DETALLE[a.id];
                const tirDiff = d.tirActual
                  - d.tirEntrada;
                const ebitdaDiff = ((d.ebitdaActual
                  - d.ebitdaPlan) / d.ebitdaPlan
                  * 100);
                const cumplidos = d.supuestosEntrada
                  .filter(s => s.cumplido === true)
                  .length;
                const total = d.supuestosEntrada.length;
                return (
                  <div key={a.id}
                    onClick={() => {
                      setActiveActivo(a.id);
                      setActiveTab('activos');
                    }}
                    style={{ display: 'grid',
                      gridTemplateColumns:
                        '140px 80px 80px 80px 80px 1fr',
                      padding: '10px 14px',
                      cursor: 'pointer',
                      borderBottom:
                        `1px solid #0D2540`,
                      background: i % 2 === 0
                        ? 'transparent'
                        : 'rgba(255,255,255,0.02)' }}
                    onMouseEnter={e =>
                      e.currentTarget.style
                        .background = '#071B33'}
                    onMouseLeave={e =>
                      e.currentTarget.style
                        .background = i % 2 === 0
                        ? 'transparent'
                        : 'rgba(255,255,255,0.02)'}>
                    <div>
                      <div style={{ fontSize: 12,
                        fontWeight: 600,
                        color: '#F8F5F0' }}>
                        {a.nombre}
                      </div>
                      <div style={{ fontSize: 9,
                        color: '#4A6070' }}>
                        {a.fondo}
                      </div>
                    </div>
                    <div style={{ fontSize: 13,
                      fontWeight: 600,
                      color: '#6A8AAA' }}>
                      {d.tirEntrada}%
                    </div>
                    <div style={{ fontSize: 13,
                      fontWeight: 700,
                      color: d.tirActual >= d.tirEntrada
                        ? '#86EFAC' : '#FCA5A5' }}>
                      {d.tirActual}%
                    </div>
                    <div style={{ fontSize: 12,
                      color: '#C8D8E8' }}>
                      USD {d.ebitdaActual}M
                    </div>
                    <div style={{ fontSize: 12,
                      fontWeight: 600,
                      color: ebitdaDiff >= 0
                        ? '#86EFAC' : '#FCA5A5' }}>
                      {ebitdaDiff > 0 ? '+' : ''}
                      {ebitdaDiff.toFixed(1)}%
                    </div>
                    <div style={{ display: 'flex',
                      alignItems: 'center', gap: 6 }}>
                      <div style={{ flex: 1,
                        height: 4, background:
                          '#1E3A5A', borderRadius: 2,
                        overflow: 'hidden' }}>
                        <div style={{ height: '100%',
                          width: `${(cumplidos/total)*100}%`,
                          background: cumplidos === total
                            ? '#86EFAC'
                            : cumplidos >= total/2
                            ? '#FCD34D' : '#FCA5A5',
                          borderRadius: 2 }} />
                      </div>
                      <span style={{ fontSize: 10,
                        color: '#6A8AAA',
                        whiteSpace: 'nowrap' }}>
                        {cumplidos}/{total} supuestos
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* EBITDA consolidado vs plan */}
          <div style={{ display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 16 }}>
            <div style={{ background: dark,
              border: `1px solid ${border}`,
              borderRadius: 4,
              padding: '16px' }}>
              {sLabel('EBITDA consolidado Q1 2026')}
              <div style={{ display: 'flex',
                alignItems: 'baseline',
                gap: 8, marginBottom: 12 }}>
                <div style={{ fontFamily:
                  'Georgia, serif', fontSize: 32,
                  fontWeight: 700,
                  color: '#F8F5F0' }}>
                  USD {pc.ebitdaQ1}M
                </div>
                <div style={{ fontSize: 13,
                  color: ebitdaDelta >= 0
                    ? '#86EFAC' : '#FCA5A5',
                  fontWeight: 600 }}>
                  {ebitdaDelta.toFixed(1)}% vs. plan
                </div>
              </div>
              <div style={{ fontSize: 12,
                color: '#6A8AAA', marginBottom: 8 }}>
                Plan: USD {pc.ebitdaQ1Plan}M
              </div>
              {ACTIVOS.filter(a =>
                ACTIVOS_DETALLE[a.id]).map(a => {
                const d = ACTIVOS_DETALLE[a.id];
                const pct = (d.ebitdaActual /
                  d.ebitdaPlan) * 100;
                return (
                  <div key={a.id}
                    style={{ marginBottom: 6 }}>
                    <div style={{ display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: 3 }}>
                      <span style={{ fontSize: 11,
                        color: '#8AAABB' }}>
                        {a.nombre}
                      </span>
                      <span style={{ fontSize: 11,
                        fontWeight: 600,
                        color: pct >= 100
                          ? '#86EFAC' : '#FCA5A5' }}>
                        USD {d.ebitdaActual}M
                        ({pct.toFixed(0)}% del plan)
                      </span>
                    </div>
                    <div style={{ height: 4,
                      background: '#1E3A5A',
                      borderRadius: 2,
                      overflow: 'hidden' }}>
                      <div style={{ height: '100%',
                        width: `${Math.min(pct,100)}%`,
                        background: pct >= 100
                          ? '#86EFAC'
                          : pct >= 85
                          ? '#FCD34D' : '#FCA5A5',
                        borderRadius: 2 }} />
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ background: dark,
              border: `1px solid ${border}`,
              borderRadius: 4, padding: '16px' }}>
              {sLabel('Estructura de capital ' +
                'del portafolio')}
              {ACTIVOS.filter(a =>
                ACTIVOS_DETALLE[a.id]).map(a => {
                const d = ACTIVOS_DETALLE[a.id];
                const dscrOk = d.dscr >= d.dscrMinimo;
                return (
                  <div key={a.id} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10, padding: '7px 0',
                    borderBottom:
                      `1px solid #0D2540` }}>
                    <div style={{ width: 90,
                      flexShrink: 0, fontSize: 11,
                      color: '#C8D8E8' }}>
                      {a.nombre}
                    </div>
                    <div style={{ width: 60,
                      flexShrink: 0, fontSize: 11,
                      color: '#6A8AAA' }}>
                      Deuda: ${d.deuda}M
                    </div>
                    <div style={{ flex: 1,
                      height: 4, background: '#1E3A5A',
                      borderRadius: 2,
                      overflow: 'hidden' }}>
                      <div style={{ height: '100%',
                        width: `${Math.min(
                          (d.deuda/100)*60,100)}%`,
                        background: '#1E3A5A',
                        borderRadius: 2 }} />
                    </div>
                    <div style={{ width: 60,
                      flexShrink: 0, textAlign: 'right',
                      fontSize: 12, fontWeight: 700,
                      color: dscrOk
                        ? '#86EFAC' : '#FCA5A5' }}>
                      {d.dscr}x
                    </div>
                    <div style={{ fontSize: 9,
                      color: dscrOk
                        ? '#86EFAC' : '#FCA5A5',
                      width: 40 }}>
                      {dscrOk ? 'OK' : 'ALERT'}
                    </div>
                  </div>
                );
              })}
              <div style={{ marginTop: 10,
                fontSize: 10, color: '#4A6070' }}>
                DSCR mínimo requerido por activo
                según estructura de deuda
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ── TAB 2: ACTIVOS ────────────────────────────
  const renderActivos = () => {
    const d = getActiDetail(activeActivo);
    const tirDiff = d.tirActual - d.tirEntrada;
    const ebitdaDiff = ((d.ebitdaActual - d.ebitdaPlan)
      / d.ebitdaPlan * 100);
    const evDiff = ((d.valoracion.currentEV
      - d.valoracion.entryEV)
      / d.valoracion.entryEV * 100);

    return (
      <div style={{ flex: 1, overflow: 'hidden',
        display: 'flex' }}>
        {renderSidebar()}
        <div style={{ flex: 1, overflowY: 'auto',
          padding: '20px 24px' }}>

          {/* Header del activo */}
          <div style={{ marginBottom: 20,
            paddingBottom: 16,
            borderBottom: `1px solid ${border}` }}>
            <div style={{ display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontFamily:
                  'Georgia, serif', fontSize: 24,
                  fontWeight: 700,
                  color: '#F8F5F0',
                  marginBottom: 6 }}>
                  {activo.nombre}
                </div>
                <div style={{ display: 'flex',
                  gap: 10 }}>
                  <span style={{ fontSize: 11,
                    color: '#4A6070' }}>
                    {activo.tipo} · {activo.pais}
                  </span>
                  <span style={{ fontSize: 9,
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: 2,
                    background:
                      `${activo.fondoColor}22`,
                    color: activo.fondoColor }}>
                    {activo.fondo}
                  </span>
                  <span style={{ fontSize: 11,
                    color: '#4A6070' }}>
                    En portafolio desde {activo.desde}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* TIR entrada vs actual — lo primero */}
          <div style={{ marginBottom: 20 }}>
            {sLabel('Retorno — Entrada vs. hoy')}
            <div style={{ display: 'grid',
              gridTemplateColumns: 'repeat(4,1fr)',
              gap: 10 }}>
              {[
                {
                  label: 'TIR de entrada',
                  val: `${d.tirEntrada}%`,
                  sub: 'Al momento de la inversión',
                  color: '#6A8AAA',
                },
                {
                  label: 'TIR proyectada hoy',
                  val: `${d.tirActual}%`,
                  sub: `${tirDiff > 0 ? '+' : ''}${tirDiff.toFixed(1)}pp vs. entrada`,
                  color: d.tirActual >= d.tirEntrada
                    ? '#86EFAC' : '#FCA5A5',
                },
                {
                  label: 'MOIC actual',
                  val: `${d.moicActual}x`,
                  sub: `Objetivo al exit: ${d.moicObjetivo}x`,
                  color: '#F8F5F0',
                },
                {
                  label: 'EV actual vs. entrada',
                  val: `USD ${d.valoracion.currentEV}M`,
                  sub: `Entrada: USD ${d.valoracion.entryEV}M (${evDiff > 0 ? '+' : ''}${evDiff.toFixed(1)}%)`,
                  color: evDiff >= 0
                    ? '#86EFAC' : '#FCA5A5',
                },
              ].map((k, i) => (
                <div key={i} style={{ background: dark,
                  border: `1px solid ${border}`,
                  borderTop:
                    `3px solid ${k.color}`,
                  borderRadius: 4,
                  padding: '14px 16px' }}>
                  <div style={{ fontSize: 10,
                    color: '#4A6070',
                    textTransform: 'uppercase',
                    letterSpacing: 1,
                    marginBottom: 5 }}>
                    {k.label}
                  </div>
                  <div style={{ fontFamily:
                    'Georgia, serif', fontSize: 26,
                    fontWeight: 700,
                    color: '#F8F5F0',
                    lineHeight: 1,
                    marginBottom: 4 }}>{k.val}</div>
                  <div style={{ fontSize: 10,
                    color: k.color }}>
                    {k.sub}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Valoración */}
          <div style={{ marginBottom: 20,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 12 }}>
            <div style={{ background: dark,
              border: `1px solid ${border}`,
              borderRadius: 4,
              padding: '16px' }}>
              {sLabel('Múltiplo EV/EBITDA')}
              <div style={{ display: 'flex',
                gap: 20, alignItems: 'center',
                marginBottom: 12 }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 10,
                    color: '#4A6070',
                    marginBottom: 4 }}>
                    Entrada
                  </div>
                  <div style={{ fontFamily:
                    'Georgia, serif', fontSize: 28,
                    fontWeight: 700,
                    color: '#6A8AAA' }}>
                    {d.valoracion.entryEbitdaMultiple}x
                  </div>
                </div>
                <div style={{ fontSize: 20,
                  color: '#1E3A5A' }}>→</div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 10,
                    color: '#4A6070',
                    marginBottom: 4 }}>
                    Hoy
                  </div>
                  <div style={{ fontFamily:
                    'Georgia, serif', fontSize: 28,
                    fontWeight: 700,
                    color: d.valoracion.currentEbitdaMultiple >= d.valoracion.entryEbitdaMultiple
                      ? '#86EFAC' : '#FCA5A5' }}>
                    {d.valoracion.currentEbitdaMultiple}x
                  </div>
                </div>
              </div>
            </div>

            <div style={{ background: dark,
              border: `1px solid ${border}`,
              borderRadius: 4, padding: '16px' }}>
              {sLabel('Deuda y DSCR')}
              <div style={{ display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: 13,
                  color: '#C8D8E8' }}>
                  Deuda: USD {d.deuda}M
                </span>
                <span style={{ fontSize: 18,
                  fontWeight: 700,
                  fontFamily: 'Georgia, serif',
                  color: d.dscr >= d.dscrMinimo
                    ? '#86EFAC' : '#FCA5A5' }}>
                  DSCR {d.dscr}x
                </span>
              </div>
              <div style={{ fontSize: 11,
                color: '#6A8AAA' }}>
                Mínimo requerido: {d.dscrMinimo}x
              </div>
            </div>
          </div>

          {/* Supuestos de entrada */}
          {sLabel('Supuestos de entrada vs. realidad')}
          <div style={{ background: dark,
            border: `1px solid ${border}`,
            borderRadius: 4, overflow: 'hidden',
            marginBottom: 20 }}>
            <div style={{ display: 'grid',
              gridTemplateColumns: '1fr 100px 100px 70px',
              padding: '8px 14px',
              borderBottom: `1px solid ${border}` }}>
              {['Supuesto','Entrada','Actual',
                'Cumplido'].map(h => (
                <div key={h} style={{ fontSize: 9,
                  color: '#4A6070',
                  textTransform: 'uppercase',
                  letterSpacing: 1 }}>{h}</div>
              ))}
            </div>
            {d.supuestosEntrada.map((s, i) => (
              <div key={i} style={{ display: 'grid',
                gridTemplateColumns:
                  '1fr 100px 100px 70px',
                padding: '10px 14px',
                borderBottom: `1px solid #0D2540`,
                background: i % 2 === 0
                  ? 'transparent'
                  : 'rgba(255,255,255,0.02)' }}>
                <div style={{ fontSize: 12,
                  color: '#C8D8E8' }}>{s.nombre}</div>
                <div style={{ fontSize: 11,
                  color: '#6A8AAA' }}>{s.valorEntrada}</div>
                <div style={{ fontSize: 11,
                  color: s.cumplido === true
                    ? '#86EFAC' : s.cumplido === 'parcial'
                    ? '#FCD34D' : '#FCA5A5' }}>
                  {s.valorActual}
                </div>
                <div style={{ fontSize: 10,
                  fontWeight: 700,
                  color: s.cumplido === true
                    ? '#86EFAC' : s.cumplido === 'parcial'
                    ? '#FCD34D' : '#FCA5A5' }}>
                  {s.cumplido === true ? '✓' :
                   s.cumplido === 'parcial' ? '~' : '✗'}
                </div>
              </div>
            ))}
          </div>

          {/* Próxima junta */}
          <div style={{ background: dark,
            border: `1px solid ${border}`,
            borderRadius: 4, padding: '14px 16px' }}>
            {sLabel('Próxima junta')}
            <div style={{ fontSize: 16,
              fontWeight: 700, color: copper,
              marginBottom: 4 }}>
              {activo.proximaJunta}
            </div>
            <div style={{ fontSize: 12,
              color: '#6A8AAA', marginBottom: 10 }}>
              {activo.briefListo
                ? 'Brief generado automáticamente'
                : 'Documentos pendientes de recibir'}
            </div>
            <button
              onClick={() => navigate(
                '/demo/preparador-juntas')}
              style={{ padding: '7px 14px',
                background: activo.briefListo
                  ? copper : 'transparent',
                border: `1px solid ${activo.briefListo
                  ? copper : border}`,
                borderRadius: 3, fontSize: 11,
                fontWeight: 700,
                color: activo.briefListo
                  ? navy : '#6A8AAA',
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif' }}>
              {activo.briefListo
                ? 'Ver brief →'
                : 'Ver cómo se genera →'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ── TAB 3: REGULATORIO ────────────────────────
  const renderRegulatorio = () => (
    <div style={{ flex: 1, overflow: 'hidden',
      display: 'flex' }}>
      {renderSidebar()}
      <div style={{ flex: 1, overflowY: 'auto',
        padding: '20px 24px' }}>

        {sLabel('Matriz de impacto regulatorio — ' +
          'Resoluciones activas')}

        {/* Matriz */}
        <div style={{ background: dark,
          border: `1px solid ${border}`,
          borderRadius: 4, overflow: 'hidden',
          marginBottom: 20 }}>
          <div style={{ display: 'grid',
            gridTemplateColumns: '160px 1fr 80px',
            padding: '8px 14px',
            borderBottom: `1px solid ${border}` }}>
            {['Resolución','Activos afectados',
              'Estado'].map(h => (
              <div key={h} style={{ fontSize: 9,
                color: '#4A6070',
                textTransform: 'uppercase',
                letterSpacing: 1 }}>{h}</div>
            ))}
          </div>
          {[
            {
              nombre: 'CREG 101 100/2026',
              desc: 'Mecanismo de Comercialización de Energía (MCE)',
              fecha: 'Feb 19, 2026',
              regulador: 'CREG',
              afectados: ['TermoemCali','Atlas Renewable','Líneas La Guajira'],
              estado: 'Analizado',
              estColor: '#86EFAC',
              estBg: 'rgba(134,239,172,0.1)',
              impacto: 'alto',
            },
            {
              nombre: 'Res. ANI 2026-012',
              desc: 'Modificación de indicadores de gestión 4G',
              fecha: 'Mar 5, 2026',
              regulador: 'ANI',
              afectados: ['Ruta del Cacao'],
              estado: 'En análisis',
              estColor: '#FCD34D',
              estBg: 'rgba(250,204,21,0.1)',
              impacto: 'medio',
            },
            {
              nombre: 'Circular SHT 04/2026',
              desc: 'Nuevos estándares de seguridad transporte urbano',
              fecha: 'Mar 10, 2026',
              regulador: 'Min.Transporte',
              afectados: ['Transambiental'],
              estado: 'Pendiente',
              estColor: '#FCA5A5',
              estBg: 'rgba(239,68,68,0.1)',
              impacto: 'bajo',
            },
          ].map((reg, i) => (
            <div key={i}
              onClick={() => {
                if (reg.nombre.includes('CREG'))
                  navigate('/demo/traductor-regulatorio');
              }}
              style={{ display: 'grid',
                gridTemplateColumns:
                  '160px 1fr 80px',
                padding: '12px 14px',
                borderBottom: `1px solid #0D2540`,
                cursor: reg.nombre.includes('CREG')
                  ? 'pointer' : 'default',
                background: i % 2 === 0
                  ? 'transparent'
                  : 'rgba(255,255,255,0.02)' }}
              onMouseEnter={e => {
                if (reg.nombre.includes('CREG'))
                  e.currentTarget.style.background =
                    '#071B33';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background =
                  i % 2 === 0 ? 'transparent'
                  : 'rgba(255,255,255,0.02)';
              }}>
              <div>
                <div style={{ fontSize: 12,
                  fontWeight: 600,
                  color: '#F8F5F0',
                  marginBottom: 2 }}>
                  {reg.nombre}
                </div>
                <div style={{ fontSize: 9,
                  color: '#4A6070' }}>
                  {reg.regulador} · {reg.fecha}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 11,
                  color: '#8AAABB',
                  marginBottom: 5 }}>{reg.desc}</div>
                <div style={{ display: 'flex',
                  gap: 6, flexWrap: 'wrap' }}>
                  {reg.afectados.map(a => (
                    <span key={a} style={{
                      fontSize: 9, padding: '1px 6px',
                      background:
                        'rgba(184,134,11,0.15)',
                      color: copper,
                      borderRadius: 2 }}>{a}</span>
                  ))}
                  {reg.nombre.includes('CREG') && (
                    <span style={{ fontSize: 9,
                      color: '#4A6070',
                      fontStyle: 'italic' }}>
                      ← Ver análisis completo
                    </span>
                  )}
                </div>
              </div>
              <div>
                <span style={{ fontSize: 9,
                  fontWeight: 700, padding: '2px 7px',
                  borderRadius: 2,
                  background: reg.estBg,
                  color: reg.estColor }}>
                  {reg.estado}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Output embebido CREG */}
        <div style={{ background: dark,
          border: `1px solid ${copper}`,
          borderRadius: 4, padding: '16px' }}>
          <div style={{ display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 12 }}>
            {sLabel('Output del Traductor Regulatorio ' +
              '— CREG 101 100/2026')}
            <button
              onClick={() => navigate(
                '/demo/traductor-regulatorio')}
              style={{ fontSize: 10, padding:
                '4px 12px', background: copper,
                border: 'none', borderRadius: 3,
                color: navy, fontWeight: 700,
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif' }}>
              Ver demo completa →
            </button>
          </div>
          {[
            {
              num: '1', title: 'Qué dice la resolución',
              color: '#93C5FD',
              preview: 'La CREG crea el MCE — un mercado de ruedas anónimas donde generadores ofertan precio mínimo de venta y comercializadores ofertan precio máximo de compra. Conexión Energética hace el calce al precio de equilibrio. Opera en paralelo al mercado mayorista. Vigente desde Feb 19, 2026 (Art. 17).',
            },
            {
              num: '2',
              title: 'Información requerida',
              color: '#FCD34D',
              preview: 'PRERREQUISITOS: (1) Contratos bilaterales vigentes de TermoemCali — cláusulas de exclusividad. (2) Análisis jurídico de Arts. 5, 9(ii) y 16(v) por equipo legal de Ashmore. Sin estos dos datos, ninguna decisión de participación puede tomarse.',
            },
            {
              num: '3',
              title: 'Oportunidades y amenazas',
              color: '#86EFAC',
              preview: '3 oportunidades: Optimización ingresos TermoemCali · Posicionamiento Atlas Renewable · Hedge natural del portafolio de energía. 3 amenazas: Presión sobre ingresos de bolsa · Riesgo sobre el OEF · Desplazamiento progresivo de térmicas.',
            },
          ].map((sec, i) => (
            <div key={i} style={{ padding:
              '10px 0', borderBottom:
              i < 2 ? `1px solid #1E3A5A` : 'none',
              display: 'flex', gap: 12 }}>
              <div style={{ width: 28, height: 28,
                borderRadius: '50%', flexShrink: 0,
                background: `${sec.color}22`,
                border: `1px solid ${sec.color}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 12, fontWeight: 700,
                color: sec.color }}>
                {sec.num}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11,
                  fontWeight: 700, color: '#C8D8E8',
                  marginBottom: 4 }}>{sec.title}</div>
                <div style={{ fontSize: 11,
                  color: '#6A8AAA',
                  lineHeight: 1.6 }}>
                  {sec.preview}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ── TAB 4: JUNTAS ─────────────────────────────
  const renderJuntas = () => (
    <div style={{ flex: 1, overflow: 'hidden',
      display: 'flex' }}>
      {renderSidebar()}
      <div style={{ flex: 1, overflowY: 'auto',
        padding: '20px 24px' }}>

        {/* KPIs juntas */}
        <div style={{ display: 'grid',
          gridTemplateColumns: 'repeat(3,1fr)',
          gap: 10, marginBottom: 20 }}>
          {kpiCard('Próximas 30 días', '4',
            'TermoemCali, Transambiental...')}
          {kpiCard('Briefs listos', '1',
            'TermoemCali · 4 pendientes')}
          {kpiCard('Compromisos abiertos', '8',
            '3 vencidos', '#FCA5A5')}
        </div>

        {/* Calendario de juntas */}
        {sLabel('Próximas juntas del portafolio')}
        <div style={{ display: 'flex',
          flexDirection: 'column', gap: 8,
          marginBottom: 20 }}>
          {ACTIVOS.filter(a =>
            a.proximaJunta.includes('Mar') ||
            a.proximaJunta.includes('Abr')
          ).sort((a, b) =>
            a.proximaJunta.localeCompare(
              b.proximaJunta)
          ).map(a => (
            <div key={a.id} style={{ background: dark,
              border: `1px solid ${border}`,
              borderRadius: 4, padding: '14px 16px',
              display: 'flex', gap: 16,
              alignItems: 'flex-start' }}>
              <div style={{ flexShrink: 0,
                textAlign: 'center', width: 60 }}>
                <div style={{ fontSize: 16,
                  fontWeight: 700,
                  fontFamily: 'Georgia, serif',
                  color: a.alertas > 0
                    ? '#FCA5A5' : copper }}>
                  {a.proximaJunta.split(' ')[1]}
                </div>
                <div style={{ fontSize: 10,
                  color: '#4A6070' }}>
                  {a.proximaJunta.split(' ')[0]}
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex',
                  gap: 8, alignItems: 'center',
                  marginBottom: 4 }}>
                  <div style={{ fontSize: 14,
                    fontWeight: 600,
                    color: '#F8F5F0' }}>
                    {a.nombre}
                  </div>
                  <div style={{ fontSize: 9,
                    padding: '1px 6px',
                    background:
                      `${a.fondoColor}22`,
                    color: a.fondoColor,
                    borderRadius: 2,
                    fontWeight: 700 }}>
                    {a.fondo}
                  </div>
                </div>
                <div style={{ fontSize: 11,
                  color: '#6A8AAA',
                  marginBottom: 8 }}>
                  {a.tipo} · {a.pais}
                </div>
                <div style={{ display: 'flex',
                  gap: 8, alignItems: 'center' }}>
                  <span style={{ fontSize: 9,
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: 2,
                    background: a.briefListo
                      ? 'rgba(134,239,172,0.1)'
                      : 'rgba(239,68,68,0.1)',
                    color: a.briefListo
                      ? '#86EFAC' : '#FCA5A5' }}>
                    {a.briefListo
                      ? '✓ Brief listo'
                      : 'Docs pendientes'}
                  </span>
                  {a.alertas > 0 && (
                    <span style={{ fontSize: 9,
                      color: '#FCA5A5' }}>
                      {a.alertas} compromisos abiertos
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={() => navigate(
                  '/demo/preparador-juntas')}
                style={{ padding: '6px 14px',
                  background: a.briefListo
                    ? copper : 'transparent',
                  border: `1px solid ${a.briefListo
                    ? copper : border}`,
                  borderRadius: 3, fontSize: 10,
                  fontWeight: 700, flexShrink: 0,
                  color: a.briefListo
                    ? navy : '#6A8AAA',
                  cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif' }}>
                {a.briefListo
                  ? 'Ver brief →' : 'Generar →'}
              </button>
            </div>
          ))}
        </div>

        {/* Compromisos pendientes consolidados */}
        {sLabel('Compromisos pendientes ' +
          '— Todas las juntas')}
        <div style={{ display: 'flex',
          flexDirection: 'column', gap: 6 }}>
          {[
            { activo: 'TermoemCali',
              compromiso: 'Plan de Manejo Residuos Fase II',
              responsable: 'Gerencia Técnica',
              vence: 'Mar 25, 2026',
              estado: 'VENCIDO',
              color: '#FCA5A5' },
            { activo: 'TermoemCali',
              compromiso: 'Informe auditoría ANLA',
              responsable: 'Dirección ESG',
              vence: 'Mar 15, 2026',
              estado: 'VENCIDO',
              color: '#FCA5A5' },
            { activo: 'TermoemCali',
              compromiso: 'Nuevo gerente operaciones',
              responsable: 'Gerencia General',
              vence: 'Mar 30, 2026',
              estado: 'Pendiente',
              color: '#FCD34D' },
            { activo: 'Transambiental',
              compromiso: 'Plan renovación flota GHG',
              responsable: 'Gerencia Técnica',
              vence: 'Abr 30, 2026',
              estado: 'Pendiente',
              color: '#FCD34D' },
            { activo: 'FERROCOL',
              compromiso: 'Actualización plan ESG 2026',
              responsable: 'Dirección ESG',
              vence: 'May 15, 2026',
              estado: 'En proceso',
              color: '#86EFAC' },
          ].map((c, i) => (
            <div key={i} style={{ display: 'flex',
              gap: 12, padding: '10px 14px',
              background: dark,
              border: `1px solid ${border}`,
              borderLeft:
                `3px solid ${c.color}`,
              borderRadius: '0 4px 4px 0' }}>
              <div style={{ flexShrink: 0,
                width: 100 }}>
                <div style={{ fontSize: 11,
                  fontWeight: 600,
                  color: copper }}>
                  {c.activo}
                </div>
                <div style={{ fontSize: 9,
                  color: '#4A6070' }}>
                  Vence: {c.vence}
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12,
                  color: '#C8D8E8',
                  marginBottom: 2 }}>
                  {c.compromiso}
                </div>
                <div style={{ fontSize: 10,
                  color: '#4A6070' }}>
                  Resp: {c.responsable}
                </div>
              </div>
              <span style={{ fontSize: 9,
                fontWeight: 700, padding: '2px 8px',
                borderRadius: 2, flexShrink: 0,
                background: `${c.color}22`,
                color: c.color,
                alignSelf: 'center' }}>
                {c.estado}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ── TAB 5: REPORTING LP ───────────────────────
  const LPS = [
    { id: 'caf', nombre: 'CAF',
      tipo: 'DFI Internacional',
      color: '#93C5FD',
      deadline: 'Abr 15, 2026',
      estado: 'En generación',
      estColor: '#FCD34D',
      pct: 70 },
    { id: 'bid', nombre: 'BID Invest',
      tipo: 'DFI Internacional',
      color: '#93C5FD',
      deadline: 'Abr 15, 2026',
      estado: 'No iniciado',
      estColor: '#FCA5A5',
      pct: 0 },
    { id: 'porvenir', nombre: 'Porvenir',
      tipo: 'Pensiones Local',
      color: '#B8860B',
      deadline: 'Abr 30, 2026',
      estado: 'No iniciado',
      estColor: '#4A6070',
      pct: 0 },
    { id: 'proteccion', nombre: 'Protección',
      tipo: 'Pensiones Local',
      color: '#B8860B',
      deadline: 'Abr 30, 2026',
      estado: 'No iniciado',
      estColor: '#4A6070',
      pct: 0 },
    { id: 'skandia', nombre: 'Skandia',
      tipo: 'Aseguradora Local',
      color: '#B8860B',
      deadline: 'May 5, 2026',
      estado: 'No iniciado',
      estColor: '#4A6070',
      pct: 0 },
  ];

  const renderReporting = () => {
    const lp = LPS.find(l => l.id === activeLp)
      || LPS[0];

    return (
      <div style={{ flex: 1, overflow: 'hidden',
        display: 'flex' }}>
        {/* Sidebar LPs */}
        <div style={{ width: 200, flexShrink: 0,
          borderRight: `1px solid ${border}`,
          overflow: 'hidden',
          display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '10px 14px 8px',
            fontSize: 9, fontWeight: 700,
            letterSpacing: 2,
            textTransform: 'uppercase',
            color: '#4A6070',
            borderBottom: `1px solid ${border}` }}>
            Reportes Q1 2026
          </div>
          <div style={{ overflowY: 'auto', flex: 1 }}>
            {LPS.map(l => (
              <div key={l.id}
                onClick={() => setActiveLp(l.id)}
                style={{ padding: '10px 14px',
                  cursor: 'pointer',
                  borderLeft: `2px solid ${
                    activeLp === l.id
                      ? copper : 'transparent'}`,
                  background: activeLp === l.id
                    ? '#0A2A40' : 'transparent',
                  borderBottom:
                    `1px solid #071B33` }}>
                <div style={{ fontSize: 13,
                  fontWeight: 600,
                  color: '#F8F5F0',
                  marginBottom: 2 }}>
                  {l.nombre}
                </div>
                <div style={{ fontSize: 9,
                  color: '#4A6070',
                  marginBottom: 5 }}>{l.tipo}</div>
                <div style={{ height: 3,
                  background: border,
                  borderRadius: 2,
                  overflow: 'hidden',
                  marginBottom: 3 }}>
                  <div style={{ height: '100%',
                    width: `${l.pct}%`,
                    background: l.pct === 100
                      ? '#86EFAC'
                      : l.pct > 0
                      ? copper : 'transparent',
                    borderRadius: 2 }} />
                </div>
                <div style={{ fontSize: 9,
                  color: l.estColor,
                  fontWeight: 600 }}>
                  {l.estado}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Panel LP */}
        <div style={{ flex: 1, overflowY: 'auto',
          padding: '20px 24px' }}>
          <div style={{ marginBottom: 20,
            paddingBottom: 16,
            borderBottom: `1px solid ${border}` }}>
            <div style={{ fontFamily:
              'Georgia, serif', fontSize: 22,
              fontWeight: 700, color: '#F8F5F0',
              marginBottom: 6 }}>
              {lp.nombre}
            </div>
            <div style={{ display: 'flex',
              gap: 10, alignItems: 'center' }}>
              <span style={{ fontSize: 11,
                color: '#4A6070' }}>{lp.tipo}</span>
              <span style={{ fontSize: 9,
                fontWeight: 700, padding: '2px 8px',
                borderRadius: 2,
                background: `${lp.estColor}22`,
                color: lp.estColor }}>
                {lp.estado}
              </span>
              <span style={{ fontSize: 10,
                color: '#4A6070' }}>
                Deadline: {lp.deadline}
              </span>
            </div>
          </div>

          {/* Pipeline Q1 */}
          {sLabel('Reporte Q1 2026 — Estado')}
          <div style={{ background: dark,
            border: `1px solid ${border}`,
            borderRadius: 4, padding: '16px',
            marginBottom: 20 }}>
            <div style={{ display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 10 }}>
              <div style={{ fontSize: 13,
                color: '#C8D8E8' }}>
                Reporte Q1 2026 — Fondo Andino III
              </div>
              <span style={{ fontSize: 11,
                fontWeight: 700, color: lp.estColor }}>
                {lp.pct}% completado
              </span>
            </div>
            <div style={{ height: 6,
              background: '#1E3A5A',
              borderRadius: 3, overflow: 'hidden',
              marginBottom: 12 }}>
              <div style={{ height: '100%',
                width: `${lp.pct}%`,
                background: lp.pct === 100
                  ? '#86EFAC' : copper,
                borderRadius: 3 }} />
            </div>
            <div style={{ display: 'grid',
              gridTemplateColumns: 'repeat(6,1fr)',
              gap: 4 }}>
              {[
                { label: 'Carta gestor',
                  done: lp.pct >= 20 },
                { label: 'KPIs fondo',
                  done: lp.pct >= 35 },
                { label: 'Estado portafolio',
                  done: lp.pct >= 50 },
                { label: 'Eventos materiales',
                  done: lp.pct >= 60 },
                { label: 'Métricas ESG',
                  done: lp.pct >= 70 },
                { label: 'Perspectivas',
                  done: lp.pct >= 85 },
              ].map((step, i) => (
                <div key={i} style={{
                  textAlign: 'center',
                  padding: '6px 4px',
                  background: step.done
                    ? 'rgba(134,239,172,0.08)'
                    : 'rgba(255,255,255,0.02)',
                  borderRadius: 3,
                  border: `1px solid ${step.done
                    ? 'rgba(134,239,172,0.2)'
                    : border}` }}>
                  <div style={{ fontSize: 14,
                    marginBottom: 2 }}>
                    {step.done ? '✓' : '○'}
                  </div>
                  <div style={{ fontSize: 8,
                    color: step.done
                      ? '#86EFAC' : '#4A6070',
                    lineHeight: 1.3 }}>
                    {step.label}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 12,
              display: 'flex', gap: 8 }}>
              <button
                onClick={() => navigate(
                  '/demo/reporte-lp')}
                style={{ padding: '8px 16px',
                  background: copper, border: 'none',
                  borderRadius: 3, fontSize: 11,
                  fontWeight: 700, color: navy,
                  cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif' }}>
                Ver reporte generado →
              </button>
            </div>
          </div>

          {/* Historial */}
          {sLabel('Historial de reportes')}
          <div style={{ display: 'flex',
            flexDirection: 'column', gap: 6 }}>
            {[
              { periodo: 'Q4 2025',
                enviado: 'Ene 15, 2026',
                estado: 'Enviado',
                color: '#86EFAC',
                nota: 'Recibido. Sin preguntas de seguimiento.' },
              { periodo: 'Q3 2025',
                enviado: 'Oct 15, 2025',
                estado: 'Enviado',
                color: '#86EFAC',
                nota: 'CAF solicitó información adicional sobre métricas de empleo. Respondida Oct 22.' },
              { periodo: 'Q2 2025',
                enviado: 'Jul 15, 2025',
                estado: 'Enviado',
                color: '#86EFAC',
                nota: 'Recibido. Sin preguntas.' },
            ].map((h, i) => (
              <div key={i} style={{ display: 'flex',
                gap: 12, padding: '10px 14px',
                background: dark,
                border: `1px solid ${border}`,
                borderRadius: 4 }}>
                <div style={{ flexShrink: 0,
                  width: 60 }}>
                  <div style={{ fontSize: 12,
                    fontWeight: 700,
                    color: copper }}>{h.periodo}</div>
                  <div style={{ fontSize: 9,
                    color: '#4A6070' }}>
                    {h.enviado}
                  </div>
                </div>
                <div style={{ flex: 1, fontSize: 11,
                  color: '#8AAABB',
                  lineHeight: 1.5 }}>{h.nota}</div>
                <span style={{ fontSize: 9,
                  fontWeight: 700,
                  padding: '2px 7px',
                  borderRadius: 2,
                  background:
                    'rgba(134,239,172,0.1)',
                  color: '#86EFAC',
                  alignSelf: 'center',
                  flexShrink: 0 }}>
                  {h.estado}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ height: '100vh',
      display: 'flex', flexDirection: 'column',
      background: navy,
      fontFamily: 'Inter, sans-serif',
      overflow: 'hidden' }}>

      {/* HEADER */}
      <div style={{ height: 48, background: navy,
        borderBottom: `1px solid ${border}`,
        display: 'flex', alignItems: 'center',
        padding: '0 24px', flexShrink: 0 }}>
        <button
          onClick={() => navigate(
            '/componente/gestionar-invertido')}
          style={{ fontSize: 12, color: '#4A6070',
            background: 'none', border: 'none',
            cursor: 'pointer', marginRight: 16,
            fontFamily: 'Inter, sans-serif' }}
          onMouseEnter={e =>
            e.currentTarget.style.color = '#8AAABB'}
          onMouseLeave={e =>
            e.currentTarget.style.color = '#4A6070'}>
          ← Volver
        </button>
        <div style={{ width: 1, height: 20,
          background: border, marginRight: 16 }} />
        <span style={{ fontFamily: 'Georgia, serif',
          fontSize: 15, fontWeight: 700,
          color: '#F8F5F0', marginRight: 8 }}>
          Ashmore
        </span>
        <span style={{ fontSize: 9, color: copper,
          letterSpacing: 2,
          textTransform: 'uppercase',
          marginRight: 20 }}>Colombia</span>
        <div style={{ width: 1, height: 20,
          background: border, marginRight: 20 }} />
        <span style={{ fontSize: 11,
          color: '#4A6070', letterSpacing: 2,
          textTransform: 'uppercase', flex: 1 }}>
          Centro de Control · Portafolio · IA
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
      <div style={{ display: 'flex',
        background: dark,
        borderBottom: `1px solid ${border}`,
        padding: '0 24px', flexShrink: 0 }}>
        {TABS.map(tab => (
          <div key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{ padding: '12px 20px',
              fontSize: 13, fontWeight: 500,
              cursor: 'pointer',
              color: activeTab === tab.id
                ? '#F8F5F0' : '#4A6070',
              borderBottom: `2px solid ${
                activeTab === tab.id
                  ? copper : 'transparent'}`,
              display: 'flex', alignItems: 'center',
              gap: 8, transition: 'all 0.15s',
              whiteSpace: 'nowrap' }}>
            <span style={{ display: 'inline-block',
              width: 7, height: 7,
              borderRadius: '50%',
              background: tab.color }} />
            {tab.label}
          </div>
        ))}
      </div>

      {/* CONTENT */}
      <div style={{ flex: 1, overflow: 'hidden',
        display: 'flex', flexDirection: 'column' }}>
        {activeTab === 'dashboard' &&
          renderDashboard()}
        {activeTab === 'activos' && renderActivos()}
        {activeTab === 'regulatorio' &&
          renderRegulatorio()}
        {activeTab === 'juntas' && renderJuntas()}
        {activeTab === 'reporting' &&
          renderReporting()}
      </div>
    </div>
  );
};

export default Nivel2PortafolioPage;
