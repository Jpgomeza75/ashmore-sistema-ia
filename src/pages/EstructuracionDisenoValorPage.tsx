import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertTriangle, Zap, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";

const stats = [
  { value: "3 estructuras", label: "tipo se repiten en el 80% de las transacciones — hay poca innovación en cómo se diseñan los deals" },
  { value: "15+ horas", label: "de análisis para evaluar alternativas de estructura, impacto fiscal, mecanismos de protección y earn-outs" },
  { value: "70% de valor", label: "se define en la fase de estructuración, pero recibe menos atención que la ejecución posterior" },
];

const level1Outcomes = [
  { title: "Generador de alternativas de estructura", desc: "A partir de los parámetros del deal, propone 4-6 estructuras con pros y contras" },
  { title: "Análisis de impacto fiscal rápido", desc: "Simulación preliminar de implicaciones tributarias por tipo de estructura" },
  { title: "Benchmark de mecanismos contractuales", desc: "Earn-outs, escrows, reps & warranties típicos por sector y tamaño" },
  { title: "Mapa de stakeholders y alineación", desc: "Identifica intereses de cada parte y propone estructura que maximiza alineación" },
];

const level2Outcomes = [
  { title: "Base de estructuras por tipo de deal", desc: "Cada transacción cerrada alimenta una biblioteca de cómo se estructuró y por qué" },
  { title: "Simulador de escenarios de valor", desc: "Herramienta que modela impacto de diferentes estructuras en el precio y condiciones" },
  { title: "Alertas regulatorias y fiscales", desc: "Monitoreo de cambios normativos que afectan la estructuración de transacciones" },
  { title: "Playbooks de negociación", desc: "Guías basadas en experiencia acumulada de qué funciona en cada tipo de negociación" },
];

const EstructuracionDisenoValorPage = () => {
  const { toast } = useToast();
  const handleProximamente = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast({ title: "Próximamente", description: "Este nivel estará disponible pronto." });
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background">
      <Header />
      <main className="flex-1 flex flex-col min-h-0 px-6 lg:px-10 pt-4 pb-16">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="shrink-0">
          <nav className="text-sm font-sans text-muted-foreground mb-2 flex items-center gap-1.5">
            <Link to="/" className="hover:text-foreground transition-colors">Mapa del Sistema</Link>
            <span>/</span>
            <span className="text-foreground font-medium">Estructuración y Diseño de Valor</span>
          </nav>
          <div className="mb-5">
            <span className="inline-block text-[13px] font-sans font-bold uppercase tracking-[0.15em] px-2.5 py-1 rounded-sm mb-2 bg-navy text-cream">EPISÓDICA</span>
            <h1 className="font-serif text-5xl font-bold text-foreground leading-tight mb-2">Estructuración y Diseño de Valor</h1>
            <p className="text-xl font-sans text-muted-foreground">De estructuras estándar a diseñar transacciones que maximizan valor para todas las partes.</p>
          </div>
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

        <div className="shrink-0 h-8 lg:h-10" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 shrink-0 auto-rows-fr">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12, duration: 0.4 }}
            onClick={handleProximamente}
            className="group bg-card border border-border rounded-lg cursor-pointer flex flex-col hover:border-copper hover:shadow-node-hover transition-all duration-300"
            style={{ padding: "28px 32px" }}>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: "hsl(29 59% 48% / 0.12)" }}><Zap className="w-5 h-5 text-copper" /></div>
              <h3 className="font-serif text-2xl font-bold text-foreground leading-tight">Nivel 1 — El Analista con Superpoderes</h3>
            </div>
            <span className="inline-block text-[13px] font-sans font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-sm mb-3 w-fit" style={{ backgroundColor: "hsl(152 52% 32% / 0.12)", color: "hsl(152 52% 32%)" }}>Disponible hoy</span>
            <p className="text-lg font-sans text-muted-foreground leading-relaxed mb-5">La IA amplía el universo de opciones de estructuración y evalúa rápidamente el impacto de cada alternativa sobre el valor de la transacción.</p>
            <div className="space-y-4 flex-1">
              {level1Outcomes.map((item, i) => (<div key={i}><span className="text-[15px] font-sans font-bold text-copper">{item.title}</span><p className="text-sm font-sans text-muted-foreground leading-snug mt-0.5">{item.desc}</p></div>))}
            </div>
            <button onClick={handleProximamente} className="mt-7 w-full py-2.5 rounded-lg text-lg font-sans font-bold transition-colors" style={{ backgroundColor: "hsl(29 59% 48%)", color: "white" }}>Explorar Nivel 1 →</button>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.4 }}
            onClick={handleProximamente}
            className="group bg-card border border-border rounded-lg cursor-pointer flex flex-col hover:border-copper hover:shadow-node-hover transition-all duration-300"
            style={{ padding: "28px 32px" }}>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: "hsl(29 59% 48% / 0.15)" }}><Settings className="w-5 h-5 text-copper" /></div>
              <h3 className="font-serif text-2xl font-bold text-foreground leading-tight">Nivel 2 — El Sistema Institucional</h3>
            </div>
            <span className="inline-block text-[13px] font-sans font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-sm mb-3 w-fit" style={{ backgroundColor: "hsl(29 59% 48% / 0.18)", color: "hsl(29 59% 58%)" }}>Visión 2.0</span>
            <p className="text-lg font-sans text-muted-foreground leading-relaxed mb-5">Un sistema que acumula la experiencia de cada transacción cerrada y la convierte en inteligencia para estructurar mejor las siguientes.</p>
            <div className="space-y-4 flex-1">
              {level2Outcomes.map((item, i) => (<div key={i}><span className="text-[15px] font-sans font-bold text-copper">{item.title}</span><p className="text-sm font-sans text-muted-foreground leading-snug mt-0.5">{item.desc}</p></div>))}
            </div>
            <button onClick={handleProximamente} className="mt-7 w-full py-2.5 rounded-lg text-lg font-sans font-bold transition-colors border" style={{ backgroundColor: "hsl(29 59% 48% / 0.15)", color: "hsl(29 59% 58%)", borderColor: "hsl(29 59% 48% / 0.3)" }}>Explorar Nivel 2 →</button>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default EstructuracionDisenoValorPage;
