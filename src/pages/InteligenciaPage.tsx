import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertTriangle, Zap, Settings } from "lucide-react";
import Header from "@/components/Header";

const stats = [
  { value: "12 hrs/semana", label: "por analista dedicadas a revisar noticias, reportes sectoriales y bases de datos manualmente" },
  { value: "73% de señales", label: "de oportunidades y movimientos de mercado no se procesan a tiempo o se pierden en la bandeja de entrada" },
  { value: "3 de 5 deals", label: "llegan al pipeline comercial cuando otro banco ya hizo el primer contacto o la ventana se cerró" },
];

const level1Outcomes = [
  { title: "Briefing de mercado antes de las 9am", desc: "Resumen ejecutivo diario de noticias, transacciones y movimientos relevantes para los sectores de BANICOL" },
  { title: "Mapa de competidores en segundos", desc: "Análisis de mandatos recientes, posicionamiento y movimientos de otras firmas en cualquier sector" },
  { title: "Deal Spotter: encuentra el próximo deal", desc: "Ingeniería reversa de transacciones cerradas para identificar empresas con perfil similar que nadie está mirando" },
  { title: "Pre-Pitch en 10 minutos", desc: "De señal de mercado a propuesta comercial completa con valoración indicativa, competencia y email listo para enviar" },
];

const level2Outcomes = [
  { title: "Alertas automáticas por sector y criterio", desc: "El sistema monitorea fuentes y dispara alertas cuando detecta señales relevantes: transacciones, cambios regulatorios, movimientos de competidores" },
  { title: "Dashboard de actividad M&A en tiempo real", desc: "Mapa visual de transacciones por sector, geografía y tamaño, actualizado diariamente con fuentes públicas y privadas" },
  { title: "Screening automático de targets", desc: "Motor que cruza criterios de inversión con bases empresariales para identificar candidatos que cumplan el perfil buscado" },
  { title: "Reportes semanales sin esfuerzo", desc: "Generación y distribución automática de inteligencia de mercado al equipo, sin que nadie tenga que compilar manualmente" },
];

const InteligenciaPage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background">
      <Header />
      <main className="flex-1 flex flex-col min-h-0 px-6 lg:px-10 pt-4 pb-16">
        {/* ZONA 1 — Hero */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="shrink-0"
        >
          {/* Breadcrumb */}
          <nav className="text-sm font-sans text-muted-foreground mb-2 flex items-center gap-1.5">
            <Link to="/" className="hover:text-foreground transition-colors">Mapa del Sistema</Link>
            <span>/</span>
            <span className="text-foreground font-medium">Inteligencia de Mercado</span>
          </nav>

          {/* Hero */}
          <div className="mb-5">
            <span className="inline-block text-[13px] font-sans font-bold uppercase tracking-[0.15em] px-2.5 py-1 rounded-sm mb-2 bg-navy text-cream">
              CONTINUA
            </span>
            <h1 className="font-serif text-5xl font-bold text-foreground leading-tight mb-2">
              Inteligencia de Mercado
            </h1>
            <p className="text-xl font-sans text-muted-foreground">
              De revisar noticias manualmente a tener un radar de oportunidades que nunca duerme.
            </p>
          </div>

          {/* El Problema Hoy — KPI bar */}
          <div className="bg-secondary/60 border border-border rounded-lg px-5 py-3.5 flex items-center gap-5">
            <div className="flex items-center gap-2 shrink-0 pr-5 border-r border-border">
              <AlertTriangle className="w-5 h-5 text-copper" />
              <span className="text-sm font-sans font-bold uppercase tracking-wider text-muted-foreground whitespace-nowrap">El problema hoy</span>
            </div>
            <div className="flex items-start flex-1 divide-x divide-border">
              {stats.map((stat, i) => (
                <div key={i} className="flex-1 px-5 first:pl-0 last:pr-0">
                  <span className="text-2xl lg:text-[28px] font-sans font-bold text-copper block leading-tight mb-0.5">{stat.value}</span>
                  <span className="text-[15px] font-sans text-muted-foreground leading-snug">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Spacer between KPIs and panels */}
        <div className="shrink-0 h-8 lg:h-10" />

        {/* ZONA 2 — Los Dos Niveles — NOT flex-1, auto height */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 shrink-0 auto-rows-fr">
          {/* Nivel 1 */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.4 }}
            onClick={() => navigate("/componente/inteligencia/fase-1")}
            className="group bg-card border border-border rounded-lg cursor-pointer flex flex-col justify-center
                       hover:border-copper hover:shadow-node-hover transition-all duration-300"
            style={{ padding: "28px 32px" }}
          >
            <div className="flex items-center gap-3 mb-1">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: "hsl(29 59% 48% / 0.12)" }}>
                <Zap className="w-5 h-5 text-copper" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-foreground leading-tight">
                Nivel 1 — El Analista con Superpoderes
              </h3>
            </div>
            <span className="inline-block text-[13px] font-sans font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-sm mb-3 w-fit"
              style={{ backgroundColor: "hsl(152 52% 32% / 0.12)", color: "hsl(152 52% 32%)" }}>
              Disponible hoy
            </span>
            <p className="text-lg font-sans text-muted-foreground leading-relaxed mb-5">
              Con herramientas de IA generativa, cada analista se convierte en un radar de mercado de alta frecuencia. No reemplaza el criterio del banquero — lo amplifica, procesando en minutos lo que antes tomaba días.
            </p>
            <div className="space-y-4 mb-7">
              {level1Outcomes.map((item, i) => (
                <div key={i}>
                  <span className="text-[15px] font-sans font-bold text-copper">{item.title}</span>
                  <p className="text-sm font-sans text-muted-foreground leading-snug mt-0.5">{item.desc}</p>
                </div>
              ))}
            </div>
            <button
              className="w-full py-2.5 rounded-lg text-lg font-sans font-bold transition-colors"
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
            className="group bg-card border border-border rounded-lg cursor-pointer flex flex-col justify-center
                       hover:border-copper hover:shadow-node-hover transition-all duration-300"
            style={{ padding: "28px 32px" }}
          >
            <div className="flex items-center gap-3 mb-1">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: "hsl(29 59% 48% / 0.15)" }}>
                <Settings className="w-5 h-5 text-copper" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-foreground leading-tight">
                Nivel 2 — El Sistema Institucional
              </h3>
            </div>
            <span className="inline-block text-[13px] font-sans font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-sm mb-3 w-fit"
              style={{ backgroundColor: "hsl(29 59% 48% / 0.18)", color: "hsl(29 59% 58%)" }}>
              Visión 2.0
            </span>
            <p className="text-lg font-sans text-muted-foreground leading-relaxed mb-5">
              Un sistema institucional que captura, procesa y distribuye inteligencia de mercado automáticamente. La firma tiene un radar encendido 24/7 que alimenta el pipeline comercial sin depender de que alguien se acuerde de revisar las noticias.
            </p>
            <div className="space-y-4 mb-7">
              {level2Outcomes.map((item, i) => (
                <div key={i}>
                  <span className="text-[15px] font-sans font-bold text-copper">{item.title}</span>
                  <p className="text-sm font-sans text-muted-foreground leading-snug mt-0.5">{item.desc}</p>
                </div>
              ))}
            </div>
            <button
              className="w-full py-2.5 rounded-lg text-lg font-sans font-bold transition-colors border"
              style={{ backgroundColor: "hsl(29 59% 48% / 0.15)", color: "hsl(29 59% 58%)", borderColor: "hsl(29 59% 48% / 0.3)" }}
            >
              Explorar Nivel 2 →
            </button>
          </motion.div>
        </div>

        {/* ZONA 3 — Respiro visual natural hasta el footer */}
      </main>
    </div>
  );
};

export default InteligenciaPage;
