import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertTriangle, Zap, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";

const stats = [
  { value: "80% reactivo", label: "del pipeline comercial depende de relaciones personales y referidos, no de un proceso sistemático de originación" },
  { value: "2 de 10", label: "oportunidades identificadas llegan a una propuesta formal — el resto se pierde por falta de seguimiento o timing" },
  { value: "0 herramientas", label: "de automatización comercial: el CRM es un Excel y el pipeline vive en la cabeza de los socios" },
];

const level1Outcomes = [
  { title: "Brief de oportunidad en 10 minutos", desc: "De señal de mercado a propuesta comercial completa con valoración, competencia y email listo" },
  { title: "Análisis de fit comprador-target", desc: "Evalúa en minutos si un potencial comprador y un target son compatibles estratégicamente" },
  { title: "Generador de one-pagers y teasers", desc: "Documentos comerciales profesionales listos para enviar a partir de datos básicos" },
  { title: "Draft de emails y propuestas", desc: "Comunicaciones personalizadas para cada tipo de interlocutor (PE, estratégico, family office)" },
];

const level2Outcomes = [
  { title: "Pipeline comercial automatizado", desc: "Sistema que genera y prioriza oportunidades basado en señales de mercado y criterios de la firma" },
  { title: "Seguimiento inteligente de prospects", desc: "Alertas automáticas cuando es momento de reactivar una conversación o cuando cambia el contexto" },
  { title: "Materiales comerciales on-demand", desc: "Teasers, perfiles y propuestas generados automáticamente con datos actualizados" },
  { title: "Métricas de conversión del funnel", desc: "Dashboard de pipeline con tasas de conversión por etapa, sector y banquero" },
];

const DesarrolloComercialPage = () => {
  const { toast } = useToast();
  const handleProximamente = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast({ title: "Próximamente", description: "Este nivel estará disponible pronto." });
  };

  return (
    <div className="min-h-screen md:h-screen flex flex-col md:overflow-hidden bg-background">
      <Header />
      <main className="flex-1 flex flex-col min-h-0 px-4 md:px-6 lg:px-10 pt-4 pb-8 md:pb-16">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="shrink-0">
          <nav className="text-xs md:text-sm font-sans text-muted-foreground mb-2 flex items-center gap-1.5">
            <Link to="/" className="hover:text-foreground transition-colors">Mapa del Sistema</Link>
            <span>/</span>
            <span className="text-foreground font-medium">Desarrollo Comercial</span>
          </nav>
          <div className="mb-3 md:mb-5">
            <span className="inline-block text-[13px] font-sans font-bold uppercase tracking-[0.15em] px-2.5 py-1 rounded-sm mb-2 bg-navy text-cream">CONTINUA</span>
            <h1 className="font-serif text-3xl md:text-5xl font-bold text-foreground leading-tight mb-2">Desarrollo Comercial</h1>
            <p className="text-base md:text-xl font-sans text-muted-foreground">De esperar que el teléfono suene a tener un motor comercial que genera oportunidades sistemáticamente.</p>
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
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12, duration: 0.4 }}
            onClick={handleProximamente}
            className="group bg-card border border-border rounded-lg cursor-pointer flex flex-col hover:border-copper hover:shadow-node-hover transition-all duration-300 p-5 md:py-7 md:px-8">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: "hsl(29 59% 48% / 0.12)" }}><Zap className="w-5 h-5 text-copper" /></div>
              <h3 className="font-serif text-xl md:text-2xl font-bold text-foreground leading-tight">Nivel 1 — El Analista con Superpoderes</h3>
            </div>
            <span className="inline-block text-[13px] font-sans font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-sm mb-3 w-fit" style={{ backgroundColor: "hsl(152 52% 32% / 0.12)", color: "hsl(152 52% 32%)" }}>Disponible hoy</span>
            <p className="text-base md:text-lg font-sans text-muted-foreground leading-relaxed mb-4 md:mb-5">Cada banquero se convierte en una máquina de generación de propuestas. La IA acelera la investigación, el análisis de fit y la preparación de materiales comerciales.</p>
            <div className="space-y-3 md:space-y-4 flex-1">
              {level1Outcomes.map((item, i) => (<div key={i}><span className="text-[14px] md:text-[15px] font-sans font-bold text-copper">{item.title}</span><p className="text-[13px] md:text-sm font-sans text-muted-foreground leading-snug mt-0.5">{item.desc}</p></div>))}
            </div>
            <button onClick={handleProximamente} className="mt-5 md:mt-7 w-full py-2.5 rounded-lg text-base md:text-lg font-sans font-bold transition-colors min-h-[44px]" style={{ backgroundColor: "hsl(29 59% 48%)", color: "white" }}>Explorar Nivel 1 →</button>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.4 }}
            onClick={handleProximamente}
            className="group bg-card border border-border rounded-lg cursor-pointer flex flex-col hover:border-copper hover:shadow-node-hover transition-all duration-300 p-5 md:py-7 md:px-8">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: "hsl(29 59% 48% / 0.15)" }}><Settings className="w-5 h-5 text-copper" /></div>
              <h3 className="font-serif text-xl md:text-2xl font-bold text-foreground leading-tight">Nivel 2 — El Sistema Institucional</h3>
            </div>
            <span className="inline-block text-[13px] font-sans font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-sm mb-3 w-fit" style={{ backgroundColor: "hsl(29 59% 48% / 0.18)", color: "hsl(29 59% 58%)" }}>Visión 2.0</span>
            <p className="text-base md:text-lg font-sans text-muted-foreground leading-relaxed mb-4 md:mb-5">Un motor comercial que identifica oportunidades, califica targets, prepara materiales y hace seguimiento automáticamente. La firma tiene pipeline sin depender de que alguien se acuerde.</p>
            <div className="space-y-3 md:space-y-4 flex-1">
              {level2Outcomes.map((item, i) => (<div key={i}><span className="text-[14px] md:text-[15px] font-sans font-bold text-copper">{item.title}</span><p className="text-[13px] md:text-sm font-sans text-muted-foreground leading-snug mt-0.5">{item.desc}</p></div>))}
            </div>
            <button onClick={handleProximamente} className="mt-5 md:mt-7 w-full py-2.5 rounded-lg text-base md:text-lg font-sans font-bold transition-colors border min-h-[44px]" style={{ backgroundColor: "hsl(29 59% 48% / 0.15)", color: "hsl(29 59% 58%)", borderColor: "hsl(29 59% 48% / 0.3)" }}>Explorar Nivel 2 →</button>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default DesarrolloComercialPage;
