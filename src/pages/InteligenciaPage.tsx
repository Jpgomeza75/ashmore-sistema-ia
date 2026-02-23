import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertTriangle, Zap, Settings, Clock, Signal, Target } from "lucide-react";
import Header from "@/components/Header";

const stats = [
  {
    icon: <Clock className="w-5 h-5" />,
    value: "12 hrs/semana",
    label: "Tiempo promedio de un analista en monitoreo manual de noticias y reportes",
  },
  {
    icon: <Signal className="w-5 h-5" />,
    value: "73% de señales",
    label: "No se procesan a tiempo o se pierden en la bandeja de entrada",
  },
  {
    icon: <Target className="w-5 h-5" />,
    value: "3 de 5 deals",
    label: "Llegan al pipeline cuando la ventana de oportunidad ya se cerró",
  },
];

const level1Capabilities = [
  "Resumen ejecutivo de mercado diario",
  "Análisis de competidores en segundos",
  "Deal Spotter: ingeniería reversa de transacciones",
  "Pre-Pitch: de noticia a propuesta en 10 minutos",
];

const level2Capabilities = [
  "Monitor automatizado con filtros sectoriales y alertas",
  "Dashboard de actividad M&A por sector y geografía",
  "Motor de screening cruzado con bases empresariales",
  "Generación automática de reportes semanales",
];

const InteligenciaPage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background">
      <Header />
      <main className="flex-1 flex flex-col min-h-0 px-6 lg:px-10 py-4">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs font-sans text-muted-foreground mb-3 flex items-center gap-1.5 shrink-0"
        >
          <Link to="/" className="hover:text-foreground transition-colors">Mapa del Sistema</Link>
          <span>/</span>
          <span className="text-foreground font-medium">Inteligencia de Mercado</span>
        </motion.nav>

        {/* ROW 1: Hero + Problem */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-4 shrink-0"
        >
          {/* Hero */}
          <div className="flex flex-col justify-center">
            <span className="inline-block text-[11px] font-sans font-bold uppercase tracking-[0.15em] px-2.5 py-1 rounded-sm mb-3 w-fit bg-navy text-cream">
              CONTINUA
            </span>
            <h1 className="font-serif text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-3">
              Inteligencia de Mercado
            </h1>
            <p className="text-sm lg:text-base font-sans text-muted-foreground leading-relaxed max-w-lg">
              Monitoreo continuo del entorno competitivo, sectorial y macroeconómico para identificar
              oportunidades y amenazas antes que la competencia.
            </p>
          </div>

          {/* Problem Today */}
          <div className="bg-card border border-border rounded-lg p-5">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-4 h-4 text-copper" />
              <h2 className="font-serif text-base font-bold text-foreground">El Problema Hoy</h2>
            </div>
            <div className="space-y-3">
              {stats.map((stat, i) => (
                <div key={i} className="flex items-start gap-3 bg-secondary/60 rounded-md p-3">
                  <span className="text-copper mt-0.5 shrink-0">{stat.icon}</span>
                  <div>
                    <span className="text-base font-sans font-bold text-copper block leading-tight">
                      {stat.value}
                    </span>
                    <span className="text-xs font-sans text-muted-foreground leading-snug">
                      {stat.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ROW 2: Level Panels */}
        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Level 1 */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            onClick={() => navigate("/componente/inteligencia/fase-1")}
            className="group bg-card border border-border rounded-lg p-6 flex flex-col cursor-pointer
                       hover:border-copper hover:shadow-node-hover transition-all duration-300"
            style={{ borderColor: "hsl(29 59% 48% / 0.25)" }}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: "hsl(29 59% 48% / 0.12)" }}>
                <Zap className="w-5 h-5 text-copper" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-foreground leading-tight">
                  Nivel 1 — El Analista con Superpoderes
                </h3>
              </div>
            </div>
            <span className="inline-block text-[10px] font-sans font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm mb-3 w-fit"
              style={{ backgroundColor: "hsl(152 52% 32% / 0.12)", color: "hsl(152 52% 32%)" }}>
              Disponible hoy
            </span>
            <p className="text-sm font-sans text-muted-foreground leading-relaxed mb-4">
              Con herramientas de IA generativa, cada analista se convierte en un radar de mercado
              de alta frecuencia. De minutos a segundos.
            </p>
            <ul className="space-y-2.5 flex-1">
              {level1Capabilities.map((cap, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm font-sans text-foreground/80">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-copper shrink-0" />
                  {cap}
                </li>
              ))}
            </ul>
            <button
              className="mt-4 w-full py-2.5 rounded-lg text-sm font-sans font-semibold transition-colors group-hover:opacity-90"
              style={{ backgroundColor: "hsl(29 59% 48%)", color: "white" }}
            >
              Explorar Nivel 1 →
            </button>
          </motion.div>

          {/* Level 2 */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.4 }}
            onClick={() => navigate("/componente/inteligencia/fase-2")}
            className="group rounded-lg p-6 flex flex-col cursor-pointer
                       border border-border/30 hover:border-copper/40 hover:shadow-node-hover transition-all duration-300"
            style={{ backgroundColor: "hsl(221 45% 14%)" }}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: "hsl(29 59% 48% / 0.15)" }}>
                <Settings className="w-5 h-5 text-copper" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold leading-tight" style={{ color: "hsl(36 45% 97%)" }}>
                  Nivel 2 — El Sistema Institucional
                </h3>
              </div>
            </div>
            <span className="inline-block text-[10px] font-sans font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm mb-3 w-fit"
              style={{ backgroundColor: "hsl(29 59% 48% / 0.18)", color: "hsl(29 59% 58%)" }}>
              Visión 2.0
            </span>
            <p className="text-sm font-sans leading-relaxed mb-4" style={{ color: "hsl(220 15% 65%)" }}>
              Un sistema que captura, procesa y distribuye señales automáticamente,
              alimentando el pipeline comercial 24/7 sin intervención manual.
            </p>
            <ul className="space-y-2.5 flex-1">
              {level2Capabilities.map((cap, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm font-sans" style={{ color: "hsl(220 15% 70%)" }}>
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-copper shrink-0" />
                  {cap}
                </li>
              ))}
            </ul>
            <button
              className="mt-4 w-full py-2.5 rounded-lg text-sm font-sans font-semibold transition-colors group-hover:opacity-90 border"
              style={{ backgroundColor: "hsl(29 59% 48% / 0.15)", color: "hsl(29 59% 58%)", borderColor: "hsl(29 59% 48% / 0.3)" }}
            >
              Explorar Nivel 2 →
            </button>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default InteligenciaPage;
