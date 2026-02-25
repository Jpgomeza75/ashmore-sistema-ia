import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertTriangle, Zap, Settings } from "lucide-react";
import Header from "@/components/Header";

const stats = [
  { value: "6-8 hrs", label: "para construir un modelo de valoración desde cero, de las cuales 60% es trabajo mecánico repetible" },
  { value: "40% de errores", label: "en modelos financieros tienen origen en valores hardcodeados o fórmulas inconsistentes que nadie revisa" },
  { value: "3 hrs más", label: "para convertir el modelo terminado en una presentación ejecutiva que el socio necesita para mañana" },
];

const level1Outcomes = [
  { title: "Auditoría automática de cualquier modelo", desc: "Identifica errores, documenta la estructura y genera un reporte profesional en una hoja nueva" },
  { title: "Del modelo a la presentación en 5 minutos", desc: "Extrae los datos clave y genera una presentación ejecutiva lista para el comité" },
  { title: "Documentación que nadie hace", desc: "Mapa de tabs, flujo de datos, assumptions principales. Todo dentro del mismo archivo" },
  { title: "Segundo par de ojos instantáneo", desc: "Valida lógica financiera, consistencia de fórmulas y razonabilidad de assumptions" },
];

const level2Outcomes = [
  { title: "Biblioteca viva de modelos por sector", desc: "Cada modelo cerrado alimenta una base de templates y benchmarks sectoriales" },
  { title: "Comparables siempre actualizados", desc: "Múltiplos y métricas de transacciones se actualizan automáticamente con datos de mercado" },
  { title: "Quality assurance automático", desc: "Todo modelo pasa por auditoría estandarizada antes de salir de la firma" },
  { title: "Trazabilidad completa", desc: "Historial de versiones, assumptions y cambios de cada modelo con autoría y timestamp" },
];

const AnalisisPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen md:h-screen flex flex-col md:overflow-hidden bg-background">
      <Header />
      <main className="flex-1 flex flex-col min-h-0 px-4 md:px-6 lg:px-10 pt-4 pb-8 md:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="shrink-0"
        >
          <nav className="text-xs md:text-sm font-sans text-muted-foreground mb-2 flex items-center gap-1.5">
            <Link to="/" className="hover:text-foreground transition-colors">Mapa del Sistema</Link>
            <span>/</span>
            <span className="text-foreground font-medium">Análisis y Modelación</span>
          </nav>
          <div className="mb-3 md:mb-5">
            <span className="inline-block text-[13px] font-sans font-bold uppercase tracking-[0.15em] px-2.5 py-1 rounded-sm mb-2 bg-navy text-cream">EPISÓDICA</span>
            <h1 className="font-serif text-3xl md:text-5xl font-bold text-foreground leading-tight mb-2">Análisis y Modelación</h1>
            <p className="text-base md:text-xl font-sans text-muted-foreground">De pasar horas construyendo modelos y presentaciones a tener un copiloto que audita, extrae y genera por ti.</p>
          </div>
          <div className="bg-secondary/60 border border-border rounded-lg px-4 md:px-5 py-3 md:py-3.5 flex flex-col md:flex-row md:items-center gap-3 md:gap-5">
            <div className="flex items-center gap-2 shrink-0 md:pr-5 pb-2 md:pb-0 border-b md:border-b-0 md:border-r border-border">
              <AlertTriangle className="w-5 h-5 text-copper" />
              <span className="text-sm font-sans font-bold uppercase tracking-wider text-muted-foreground whitespace-nowrap">El problema hoy</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-start flex-1 md:divide-x divide-border gap-3 md:gap-0">
              {stats.map((stat, i) => (
                <div key={i} className="flex-1 md:px-5 md:first:pl-0 md:last:pr-0">
                  <span className="text-xl md:text-2xl lg:text-[28px] font-sans font-bold text-copper block leading-tight mb-0.5">{stat.value}</span>
                  <span className="text-[13px] md:text-[15px] font-sans text-muted-foreground leading-snug">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="shrink-0 h-5 md:h-8 lg:h-10" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-7 shrink-0 lg:auto-rows-fr">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.4 }}
            onClick={() => navigate("/componente/analisis/fase-1")}
            className="group bg-card border border-border rounded-lg cursor-pointer flex flex-col hover:border-copper hover:shadow-node-hover transition-all duration-300 p-5 md:py-7 md:px-8"
          >
            <div className="flex items-center gap-3 mb-1">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: "hsl(29 59% 48% / 0.12)" }}>
                <Zap className="w-5 h-5 text-copper" />
              </div>
              <h3 className="font-serif text-xl md:text-2xl font-bold text-foreground leading-tight">Nivel 1 — El Analista con Superpoderes</h3>
            </div>
            <span className="inline-block text-[13px] font-sans font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-sm mb-3 w-fit" style={{ backgroundColor: "hsl(152 52% 32% / 0.12)", color: "hsl(152 52% 32%)" }}>Disponible hoy</span>
            <p className="text-base md:text-lg font-sans text-muted-foreground leading-relaxed mb-4 md:mb-5">Claude trabaja dentro de Excel, directamente en los modelos que ya tienes. No cambias de herramienta — la IA viene a ti.</p>
            <div className="space-y-3 md:space-y-4 flex-1">
              {level1Outcomes.map((item, i) => (
                <div key={i}>
                  <span className="text-[14px] md:text-[15px] font-sans font-bold text-copper">{item.title}</span>
                  <p className="text-[13px] md:text-sm font-sans text-muted-foreground leading-snug mt-0.5">{item.desc}</p>
                </div>
              ))}
            </div>
            <button className="mt-5 md:mt-7 w-full py-2.5 rounded-lg text-base md:text-lg font-sans font-bold transition-colors min-h-[44px]" style={{ backgroundColor: "hsl(29 59% 48%)", color: "white" }}>Explorar Nivel 1 →</button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            onClick={() => navigate("/componente/analisis/fase-2")}
            className="group bg-card border border-border rounded-lg cursor-pointer flex flex-col hover:border-copper hover:shadow-node-hover transition-all duration-300 p-5 md:py-7 md:px-8"
          >
            <div className="flex items-center gap-3 mb-1">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: "hsl(29 59% 48% / 0.15)" }}>
                <Settings className="w-5 h-5 text-copper" />
              </div>
              <h3 className="font-serif text-xl md:text-2xl font-bold text-foreground leading-tight">Nivel 2 — El Sistema Institucional</h3>
            </div>
            <span className="inline-block text-[13px] font-sans font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-sm mb-3 w-fit" style={{ backgroundColor: "hsl(29 59% 48% / 0.18)", color: "hsl(29 59% 58%)" }}>Visión 2.0</span>
            <p className="text-base md:text-lg font-sans text-muted-foreground leading-relaxed mb-4 md:mb-5">Un sistema que aprende de cada modelo que la firma construye y convierte ese conocimiento en ventaja acumulativa.</p>
            <div className="space-y-3 md:space-y-4 flex-1">
              {level2Outcomes.map((item, i) => (
                <div key={i}>
                  <span className="text-[14px] md:text-[15px] font-sans font-bold text-copper">{item.title}</span>
                  <p className="text-[13px] md:text-sm font-sans text-muted-foreground leading-snug mt-0.5">{item.desc}</p>
                </div>
              ))}
            </div>
            <button className="mt-5 md:mt-7 w-full py-2.5 rounded-lg text-base md:text-lg font-sans font-bold transition-colors border min-h-[44px]" style={{ backgroundColor: "hsl(29 59% 48% / 0.15)", color: "hsl(29 59% 58%)", borderColor: "hsl(29 59% 48% / 0.3)" }}>Explorar Nivel 2 →</button>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default AnalisisPage;
