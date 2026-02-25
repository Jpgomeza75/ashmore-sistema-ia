import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertTriangle, Zap, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";

const stats = [
  { value: "100% manual", label: "la revisión de calidad depende de que el socio tenga tiempo de revisar — si no lo tiene, sale sin control" },
  { value: "Sin estándar", label: "documentado de qué es un modelo, un IM o un teaser 'bueno' — la calidad depende de quién lo haga" },
  { value: "0 trazabilidad", label: "de quién revisó qué, cuándo se aprobó y qué cambios se hicieron — todo vive en cadenas de email" },
];

const level1Outcomes = [
  { title: "Auditoría automática de modelos", desc: "Verifica fórmulas, consistencia y razonabilidad de assumptions" },
  { title: "Revisión de documentos pre-envío", desc: "Detecta errores de formato, datos inconsistentes y omisiones" },
  { title: "Checklist de calidad por tipo de entregable", desc: "Verificación estandarizada adaptada al tipo de documento" },
  { title: "Comparación con mejores prácticas", desc: "Evalúa el entregable contra estándares de la industria y de la firma" },
];

const level2Outcomes = [
  { title: "Gate de calidad automático", desc: "Ningún entregable sale de la firma sin pasar por revisión estandarizada" },
  { title: "Estándares vivos", desc: "Las reglas de calidad se actualizan automáticamente con lecciones de cada deal" },
  { title: "Dashboard de calidad", desc: "Métricas de errores por tipo, analista y fase — tendencias de mejora en el tiempo" },
  { title: "Audit trail completo", desc: "Registro inmutable de quién creó, revisó y aprobó cada entregable" },
];

const ControlCalidadGobernanzaPage = () => {
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
            <span className="text-foreground font-medium">Control de Calidad y Gobernanza</span>
          </nav>
          <div className="mb-5">
            <span className="inline-block text-[13px] font-sans font-bold uppercase tracking-[0.15em] px-2.5 py-1 rounded-sm mb-2 bg-navy text-cream">HABILITADORA</span>
            <h1 className="font-serif text-5xl font-bold text-foreground leading-tight mb-2">Control de Calidad y Gobernanza</h1>
            <p className="text-xl font-sans text-muted-foreground">De depender del ojo del socio a tener estándares que se aplican automáticamente.</p>
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
            <p className="text-lg font-sans text-muted-foreground leading-relaxed mb-5">La IA actúa como primer filtro de calidad: revisa modelos, valida documentos y detecta inconsistencias antes de que lleguen al socio.</p>
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
            <p className="text-lg font-sans text-muted-foreground leading-relaxed mb-5">Un sistema de gobernanza que asegura que todo entregable cumple los estándares de la firma, con trazabilidad completa y mejora continua.</p>
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

export default ControlCalidadGobernanzaPage;
