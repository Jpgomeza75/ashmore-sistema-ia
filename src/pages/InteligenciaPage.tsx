import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertTriangle, Zap, Settings } from "lucide-react";
import Header from "@/components/Header";

const stats = [
  { value: "12 hrs/semana", label: "en monitoreo manual" },
  { value: "73% de señales", label: "se pierden o llegan tarde" },
  { value: "3 de 5 deals", label: "llegan cuando la ventana se cerró" },
];

const level1Outcomes = [
  "Briefing de mercado listo antes de las 9am",
  "Mapa de competidores actualizado en segundos",
  "Encuentra el próximo deal antes que la competencia",
  "De noticia a propuesta comercial en 10 minutos",
];

const level2Outcomes = [
  "Alertas automáticas cuando hay oportunidad en tus sectores",
  "Pipeline de M&A actualizado por sector y geografía cada día",
  "Screening automático de targets según tus criterios",
  "Reportes semanales generados y distribuidos sin esfuerzo",
];

const InteligenciaPage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background">
      <Header />
      <main className="flex-1 flex flex-col min-h-0 px-6 lg:px-10 py-3">
        {/* ZONA 1 — Hero + Problema (~28%) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="shrink-0 mb-4"
        >
          {/* Breadcrumb */}
          <nav className="text-xs font-sans text-muted-foreground mb-2 flex items-center gap-1.5">
            <Link to="/" className="hover:text-foreground transition-colors">Mapa del Sistema</Link>
            <span>/</span>
            <span className="text-foreground font-medium">Inteligencia de Mercado</span>
          </nav>

          {/* Hero */}
          <div className="mb-4">
            <span className="inline-block text-[10px] font-sans font-bold uppercase tracking-[0.15em] px-2 py-0.5 rounded-sm mb-2 bg-navy text-cream">
              CONTINUA
            </span>
            <h1 className="font-serif text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-1.5">
              Inteligencia de Mercado
            </h1>
            <p className="text-sm font-sans text-muted-foreground">
              De revisar noticias manualmente a tener un radar de oportunidades que nunca duerme.
            </p>
          </div>

          {/* El Problema Hoy — KPI bar */}
          <div className="bg-secondary/60 border border-border rounded-lg px-5 py-3">
            <div className="flex items-center gap-1.5 mb-2.5">
              <AlertTriangle className="w-3.5 h-3.5 text-copper" />
              <span className="text-[11px] font-sans font-semibold uppercase tracking-wider text-muted-foreground">El problema hoy</span>
            </div>
            <div className="flex items-center divide-x divide-border">
              {stats.map((stat, i) => (
                <div key={i} className="flex-1 px-4 first:pl-0 last:pr-0 text-center">
                  <span className="text-lg font-sans font-bold text-copper block leading-tight">{stat.value}</span>
                  <span className="text-[11px] font-sans text-muted-foreground">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ZONA 2 — Los Dos Niveles (~55-58%) */}
        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-5 mb-4">
          {/* Nivel 1 */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.4 }}
            onClick={() => navigate("/componente/inteligencia/fase-1")}
            className="group bg-card border border-border rounded-lg p-5 flex flex-col cursor-pointer
                       hover:border-copper hover:shadow-node-hover transition-all duration-300"
          >
            <div className="flex items-center gap-2.5 mb-1.5">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "hsl(29 59% 48% / 0.12)" }}>
                <Zap className="w-4 h-4 text-copper" />
              </div>
              <h3 className="font-serif text-base lg:text-lg font-bold text-foreground leading-tight">
                Nivel 1 — El Analista con Superpoderes
              </h3>
            </div>
            <span className="inline-block text-[9px] font-sans font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm mb-2 w-fit"
              style={{ backgroundColor: "hsl(152 52% 32% / 0.12)", color: "hsl(152 52% 32%)" }}>
              Disponible hoy
            </span>
            <p className="text-xs font-sans text-muted-foreground leading-relaxed mb-3">
              Cada analista se convierte en un radar de mercado. Resultados en minutos, no en días.
            </p>
            <ul className="space-y-2 flex-1">
              {level1Outcomes.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm font-sans text-foreground/80">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-copper shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <button
              className="mt-3 w-full py-2 rounded-lg text-sm font-sans font-semibold transition-colors"
              style={{ backgroundColor: "hsl(29 59% 48%)", color: "white" }}
            >
              Explorar Nivel 1 →
            </button>
          </motion.div>

          {/* Nivel 2 */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            onClick={() => navigate("/componente/inteligencia/fase-2")}
            className="group rounded-lg p-5 flex flex-col cursor-pointer
                       border border-border/30 hover:border-copper/40 hover:shadow-node-hover transition-all duration-300"
            style={{ backgroundColor: "hsl(221 45% 14%)" }}
          >
            <div className="flex items-center gap-2.5 mb-1.5">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "hsl(29 59% 48% / 0.15)" }}>
                <Settings className="w-4 h-4 text-copper" />
              </div>
              <h3 className="font-serif text-base lg:text-lg font-bold leading-tight" style={{ color: "hsl(36 45% 97%)" }}>
                Nivel 2 — El Sistema Institucional
              </h3>
            </div>
            <span className="inline-block text-[9px] font-sans font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm mb-2 w-fit"
              style={{ backgroundColor: "hsl(29 59% 48% / 0.18)", color: "hsl(29 59% 58%)" }}>
              Visión 2.0
            </span>
            <p className="text-xs font-sans leading-relaxed mb-3" style={{ color: "hsl(220 15% 65%)" }}>
              Un sistema que alimenta el pipeline comercial 24/7 sin intervención humana.
            </p>
            <ul className="space-y-2 flex-1">
              {level2Outcomes.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm font-sans" style={{ color: "hsl(220 15% 70%)" }}>
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-copper shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <button
              className="mt-3 w-full py-2 rounded-lg text-sm font-sans font-semibold transition-colors border"
              style={{ backgroundColor: "hsl(29 59% 48% / 0.15)", color: "hsl(29 59% 58%)", borderColor: "hsl(29 59% 48% / 0.3)" }}
            >
              Explorar Nivel 2 →
            </button>
          </motion.div>
        </div>

        {/* ZONA 3 — Respiro visual, el footer fijo se encarga */}
      </main>
    </div>
  );
};

export default InteligenciaPage;
