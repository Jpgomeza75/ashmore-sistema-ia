import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Copy, Check, ExternalLink } from "lucide-react";
import Header from "@/components/Header";

type Superpower = "deal-spotter" | "pre-pitch" | "resumen" | "competidores";

interface Step {
  title: string;
  desc: string;
}

interface CaseCard {
  label: string;
  title: string;
  description: string;
  stats: { label: string; value: string }[];
  href: string;
}

const superpowers: {
  id: Superpower;
  name: string;
  subtitle: string;
  active: boolean;
}[] = [
  { id: "resumen", name: "Resumen de Mercado", subtitle: "Briefing diario antes de las 9am", active: false },
  { id: "competidores", name: "Análisis de Competidores", subtitle: "Mapa competitivo en segundos", active: false },
  { id: "deal-spotter", name: "Deal Spotter", subtitle: "Encuentra el próximo deal", active: true },
  { id: "pre-pitch", name: "Pre-Pitch en 10 Min", subtitle: "De noticia a propuesta", active: true },
];

const dealSpotterSteps: Step[] = [
  { title: "Identifica un deal cerrado", desc: "Elige una transacción que conozcas bien: quién compró, quién vendió, y por qué" },
  { title: "Abre Claude", desc: "Ve a claude.ai e inicia sesión" },
  { title: "Ejecuta el prompt de análisis", desc: "Pega el prompt de ingeniería reversa para extraer el patrón transaccional" },
  { title: "Revisa con ojo crítico", desc: "Valida el patrón y las oportunidades con tu experiencia" },
  { title: "Pide el dashboard interactivo", desc: "Usa un segundo prompt para convertir el análisis en herramienta visual" },
  { title: "Explora el resultado", desc: "Abre el dashboard, navega las oportunidades, ajusta con tus notas" },
  { title: "Genera el documento Word", desc: "Pide un .docx profesional listo para compartir con el equipo" },
  { title: "Comparte y actúa", desc: "Distribuye, agenda discusión interna, prioriza oportunidades" },
];

const prePitchSteps: Step[] = [
  { title: "Detecta una noticia de mercado", desc: "Identifica un movimiento reciente: M&A, regulación, expansión, salida" },
  { title: "Abre Claude", desc: "Ve a claude.ai e inicia sesión" },
  { title: "Ejecuta el prompt de oportunidad", desc: "Pega el prompt para generar un brief comercial completo" },
  { title: "Revisa con ojo crítico", desc: "Valida oportunidades, valoración, competencia y tono del email" },
  { title: "Pide el dashboard interactivo", desc: "Convierte el brief en herramienta visual con plan de acción" },
  { title: "Explora el resultado", desc: "Revisa cada oportunidad, marca acciones, ajusta notas" },
  { title: "Genera el documento Word", desc: "Pide un .docx profesional del brief de oportunidad" },
  { title: "Ejecuta en 72 horas", desc: "Envía el email, agenda reuniones, capitaliza la ventana" },
];

const dealSpotterCase: CaseCard = {
  label: "CASO PRÁCTICO",
  title: "Avidanti → Patria Investments",
  description: "Ingeniería reversa del deal que creó Zentria, la red hospitalaria más grande de Colombia. Extrae el patrón transaccional y encuentra 5 oportunidades con perfil similar.",
  stats: [
    { label: "Deal de referencia", value: "USD 420M+ invertidos" },
    { label: "Oportunidades identificadas", value: "5 sectores" },
    { label: "Tiempo estimado", value: "15 minutos" },
  ],
  href: "/componente/inteligencia/fase-1/deal-spotter/avidanti-patria",
};

const prePitchCase: CaseCard = {
  label: "CASO PRÁCTICO",
  title: "GeoPark / Frontera Energy",
  description: "Brief de oportunidad a partir de la adquisición de activos upstream por ~USD 600M. Identifica oportunidades derivadas, valoración indicativa y propuesta comercial lista para enviar.",
  stats: [
    { label: "Transacción", value: "~USD 600M enterprise value" },
    { label: "Oportunidades derivadas", value: "4+" },
    { label: "Tiempo estimado", value: "10 minutos" },
  ],
  href: "/componente/inteligencia/fase-1/pre-pitch/geopark-frontera",
};

const stepsMap: Record<string, Step[]> = {
  "deal-spotter": dealSpotterSteps,
  "pre-pitch": prePitchSteps,
};

const casesMap: Record<string, CaseCard> = {
  "deal-spotter": dealSpotterCase,
  "pre-pitch": prePitchCase,
};

const InteligenciaFase1 = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<Superpower>("deal-spotter");

  const steps = stepsMap[selected] || dealSpotterSteps;
  const caseCard = casesMap[selected] || dealSpotterCase;

  return (
    <div className="min-h-screen md:h-screen flex flex-col md:overflow-hidden bg-background">
      <Header />
      <main className="flex-1 flex flex-col min-h-0 px-4 md:px-6 lg:px-10 pt-4 pb-8 md:pb-16">
        {/* Breadcrumb + Title */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="shrink-0 mb-4"
        >
          <nav className="text-xs md:text-sm font-sans text-muted-foreground mb-2 flex items-center gap-1 md:gap-1.5 flex-wrap">
            <Link to="/" className="hover:text-foreground transition-colors">Mapa del Sistema</Link>
            <span>/</span>
            <Link to="/componente/inteligencia" className="hover:text-foreground transition-colors">Inteligencia de Mercado</Link>
            <span>/</span>
            <span className="text-foreground font-medium">Nivel 1</span>
          </nav>
          <h1 className="font-serif text-2xl md:text-4xl font-bold text-foreground leading-tight mb-1">
            El Analista con Superpoderes
          </h1>
          <p className="text-sm md:text-lg font-sans text-muted-foreground max-w-3xl">
            Herramientas prácticas que puedes usar mañana. Selecciona un superpoder para conocer la metodología y ver casos reales.
          </p>
        </motion.div>

        {/* Superpowers Tab Bar - horizontal scroll on mobile */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className="shrink-0 mb-5 overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 min-w-0">
            {superpowers.map((sp) => {
              const isSelected = selected === sp.id;
              const isDisabled = !sp.active;
              return (
                <button
                  key={sp.id}
                  disabled={isDisabled}
                  onClick={() => sp.active && setSelected(sp.id)}
                  className={`relative rounded-lg border px-3 md:px-4 py-2 md:py-2.5 text-left transition-all duration-200
                    ${isDisabled
                      ? "opacity-40 cursor-not-allowed border-border bg-secondary/40"
                      : isSelected
                        ? "border-copper bg-card shadow-node"
                        : "border-border bg-card hover:border-copper/50 cursor-pointer"
                    }`}
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <span className={`text-[13px] md:text-[15px] font-sans font-bold ${isSelected ? "text-copper" : "text-foreground"}`}>
                      {sp.name}
                    </span>
                    {sp.active ? (
                      <span className="text-[10px] font-sans font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-sm"
                        style={{ backgroundColor: "hsl(152 52% 32% / 0.12)", color: "hsl(152 52% 32%)" }}>
                        DEMO
                      </span>
                    ) : (
                      <span className="text-[9px] md:text-[10px] font-sans font-bold uppercase tracking-wider text-muted-foreground">
                        PRÓX.
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] md:text-xs font-sans text-muted-foreground line-clamp-1">{sp.subtitle}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Main Content: Methodology + Case */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[55%_45%] gap-6 overflow-y-auto md:overflow-hidden"
          >
            {/* Left: Methodology */}
            <div className="flex flex-col min-h-0 md:overflow-y-auto pr-0 md:pr-2">
              <h2 className="font-serif text-xl md:text-2xl font-bold text-foreground mb-1">¿Cómo funciona?</h2>
              <p className="text-xs md:text-sm font-sans text-muted-foreground mb-4">
                El mismo flujo de 8 pasos aplica para cualquier caso. La diferencia está en la señal de partida y el prompt.
              </p>
              <div className="space-y-3">
                {steps.map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-sans font-bold"
                      style={{ backgroundColor: "hsl(29 59% 48%)", color: "white" }}>
                      {i + 1}
                    </div>
                    <div className="min-w-0">
                      <span className="text-[14px] md:text-[16px] font-sans font-bold text-foreground">{step.title}</span>
                      <p className="text-[13px] md:text-sm font-sans text-muted-foreground leading-snug mt-0.5">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs font-sans text-muted-foreground mt-4 italic">
                Los prompts específicos y los entregables están en cada caso práctico →
              </p>
            </div>

            {/* Right: Cases */}
            <div className="flex flex-col min-h-0">
              <h2 className="font-serif text-xl md:text-2xl font-bold text-foreground mb-1">Casos Prácticos</h2>
              <p className="text-xs md:text-sm font-sans text-muted-foreground mb-4">
                Ejercicios completos con prompts listos y resultados reales.
              </p>

              <div
                className="border-2 rounded-lg p-4 md:p-6 flex flex-col cursor-pointer group hover:shadow-node-hover transition-all duration-300"
                style={{ borderColor: "hsl(29 59% 48% / 0.4)", backgroundColor: "hsl(29 59% 48% / 0.04)" }}
                onClick={() => navigate(caseCard.href)}
              >
                <span className="text-[10px] font-sans font-bold uppercase tracking-[0.15em] text-copper mb-3">
                  {caseCard.label}
                </span>
                <h3 className="font-serif text-lg md:text-xl font-bold text-foreground mb-2">{caseCard.title}</h3>
                <p className="text-[13px] md:text-sm font-sans text-muted-foreground leading-relaxed mb-4">{caseCard.description}</p>
                <div className="space-y-1.5 mb-5">
                  {caseCard.stats.map((s, i) => (
                    <div key={i} className="flex items-baseline gap-2">
                      <span className="text-xs font-sans text-muted-foreground">{s.label}:</span>
                      <span className="text-sm font-sans font-bold text-foreground">{s.value}</span>
                    </div>
                  ))}
                </div>
                <button
                  className="w-full py-2.5 rounded-lg text-base font-sans font-bold transition-colors min-h-[44px]"
                  style={{ backgroundColor: "hsl(29 59% 48%)", color: "white" }}
                >
                  Ver caso completo →
                </button>
              </div>

              <p className="text-sm font-sans text-muted-foreground/50 mt-4 text-center">
                + Más casos próximamente
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default InteligenciaFase1;
