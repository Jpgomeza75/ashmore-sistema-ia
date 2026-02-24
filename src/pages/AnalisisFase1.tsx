import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Header from "@/components/Header";

type Superpower = "auditor" | "modelo-presentacion" | "escenarios" | "constructor";

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
  { id: "escenarios", name: "Generador de Escenarios", subtitle: "Sensibilidades y stress testing automático", active: false },
  { id: "constructor", name: "Constructor de Modelos", subtitle: "Asistente para armar modelos desde cero", active: false },
  { id: "auditor", name: "El Auditor", subtitle: "Audita, documenta y encuentra errores", active: true },
  { id: "modelo-presentacion", name: "Modelo a Presentación", subtitle: "Del Excel al PowerPoint en 5 minutos", active: true },
];

const auditorSteps: Step[] = [
  { title: "Abre tu modelo en Excel", desc: "Cualquier workbook .xlsx con un modelo financiero" },
  { title: "Activa Claude en Excel", desc: "Ctrl+Option+C (Mac) o Ctrl+Alt+C (Windows) para abrir el sidebar" },
  { title: "Pega el prompt de auditoría", desc: "Claude lee todas las tabs, fórmulas y estructura" },
  { title: "Espera el análisis (~2 min)", desc: "Claude recorre el workbook completo buscando errores e inconsistencias" },
  { title: "Revisa la hoja nueva", desc: "Claude crea una tab \"Auditoría Claude\" dentro de tu mismo libro" },
  { title: "Valida los hallazgos", desc: "Revisa los errores encontrados — ve directo a cada celda citada" },
  { title: "Corrige lo crítico", desc: "Prioriza los hallazgos rojos y trabaja hacia abajo" },
  { title: "Comparte con el equipo", desc: "El modelo ahora tiene documentación y auditoría integrada" },
];

const modeloPresentacionSteps: Step[] = [
  { title: "Abre tu modelo terminado", desc: "El modelo del que necesitas extraer datos para presentar" },
  { title: "Activa Claude en Excel", desc: "Ctrl+Option+C (Mac) o Ctrl+Alt+C (Windows)" },
  { title: "Pega el prompt de extracción", desc: "Claude lee el modelo y extrae los key takeaways" },
  { title: "Revisa los datos extraídos", desc: "Valida que los números y la conclusión sean correctos" },
  { title: "Copia el prompt generado", desc: "Claude genera un prompt completo con todos los datos incluidos" },
  { title: "Abre Claude en el navegador", desc: "Ve a claude.ai — aquí se genera la presentación" },
  { title: "Pega el prompt y ejecuta", desc: "Claude web genera la presentación completa con los datos de tu modelo" },
  { title: "Descarga y ajusta", desc: "Descarga el PowerPoint y haz los ajustes finales" },
];

const auditorCase: CaseCard = {
  label: "CASO PRÁCTICO — DEMO EN VIVO",
  title: "El Auditor",
  description: "Este ejercicio se ejecuta en caliente sobre un modelo real de BANICOL. Claude audita cualquier workbook: identifica errores, documenta la estructura, y crea una hoja de auditoría profesional dentro del mismo archivo.",
  stats: [
    { label: "Herramienta", value: "Claude add-in para Excel" },
    { label: "Tiempo estimado", value: "3-5 minutos" },
    { label: "Output", value: "Hoja \"Auditoría Claude\" nueva en el workbook" },
  ],
  href: "/componente/analisis/fase-1/auditor/demo-en-vivo",
};

const modeloPresentacionCase: CaseCard = {
  label: "CASO PRÁCTICO — DEMO EN VIVO",
  title: "Del Modelo a la Presentación",
  description: "Pipeline de dos pasos: Claude extrae los datos clave del modelo en Excel, genera un prompt con toda la información, y Claude web produce una presentación ejecutiva completa. De Excel a PowerPoint en 5 minutos.",
  stats: [
    { label: "Herramienta", value: "Claude add-in para Excel + Claude web" },
    { label: "Tiempo estimado", value: "5-8 minutos" },
    { label: "Output", value: "Presentación ejecutiva en PowerPoint" },
  ],
  href: "/componente/analisis/fase-1/modelo-a-presentacion/demo-en-vivo",
};

const stepsMap: Record<string, Step[]> = {
  "auditor": auditorSteps,
  "modelo-presentacion": modeloPresentacionSteps,
};

const casesMap: Record<string, CaseCard> = {
  "auditor": auditorCase,
  "modelo-presentacion": modeloPresentacionCase,
};

const AnalisisFase1 = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<Superpower>("auditor");

  const steps = stepsMap[selected] || auditorSteps;
  const caseCard = casesMap[selected] || auditorCase;

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background">
      <Header />
      <main className="flex-1 flex flex-col min-h-0 px-6 lg:px-10 pt-4 pb-16">
        {/* Breadcrumb + Title */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="shrink-0 mb-4"
        >
          <nav className="text-sm font-sans text-muted-foreground mb-2 flex items-center gap-1.5">
            <Link to="/" className="hover:text-foreground transition-colors">Mapa del Sistema</Link>
            <span>/</span>
            <Link to="/componente/analisis" className="hover:text-foreground transition-colors">Análisis y Modelación</Link>
            <span>/</span>
            <span className="text-foreground font-medium">Nivel 1</span>
          </nav>
          <h1 className="font-serif text-4xl font-bold text-foreground leading-tight mb-1">
            El Analista con Superpoderes
          </h1>
          <p className="text-lg font-sans text-muted-foreground max-w-3xl">
            Claude trabaja dentro de Excel con el add-in. Selecciona un superpoder para conocer la metodología y ver el caso práctico.
          </p>
        </motion.div>

        {/* Superpowers Tab Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className="shrink-0 grid grid-cols-4 gap-3 mb-5"
        >
          {superpowers.map((sp) => {
            const isSelected = selected === sp.id;
            const isDisabled = !sp.active;
            return (
              <button
                key={sp.id}
                disabled={isDisabled}
                onClick={() => sp.active && setSelected(sp.id)}
                className={`relative rounded-lg border px-4 py-2.5 text-left transition-all duration-200
                  ${isDisabled
                    ? "opacity-40 cursor-not-allowed border-border bg-secondary/40"
                    : isSelected
                      ? "border-copper bg-card shadow-node"
                      : "border-border bg-card hover:border-copper/50 cursor-pointer"
                  }`}
              >
                <div className="flex items-center justify-between mb-0.5">
                  <span className={`text-[15px] font-sans font-bold ${isSelected ? "text-copper" : "text-foreground"}`}>
                    {sp.name}
                  </span>
                  {sp.active ? (
                    <span className="text-[10px] font-sans font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-sm"
                      style={{ backgroundColor: "hsl(152 52% 32% / 0.12)", color: "hsl(152 52% 32%)" }}>
                      DEMO
                    </span>
                  ) : (
                    <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-muted-foreground">
                      PRÓXIMAMENTE
                    </span>
                  )}
                </div>
                <span className="text-xs font-sans text-muted-foreground">{sp.subtitle}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Main Content: Methodology + Case */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[55%_45%] gap-6"
          >
            {/* Left: Methodology */}
            <div className="flex flex-col min-h-0 overflow-y-auto pr-2">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-1">¿Cómo funciona?</h2>
              <p className="text-sm font-sans text-muted-foreground mb-4">
                Estos superpoderes usan el add-in de Claude directamente dentro de Excel. El flujo es el mismo para cualquier modelo.
              </p>
              <div className="space-y-3">
                {steps.map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-sans font-bold"
                      style={{ backgroundColor: "hsl(29 59% 48%)", color: "white" }}>
                      {i + 1}
                    </div>
                    <div className="min-w-0">
                      <span className="text-[16px] font-sans font-bold text-foreground">{step.title}</span>
                      <p className="text-sm font-sans text-muted-foreground leading-snug mt-0.5">{step.desc}</p>
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
              <h2 className="font-serif text-2xl font-bold text-foreground mb-1">Caso Práctico</h2>
              <p className="text-sm font-sans text-muted-foreground mb-4">
                Demo en vivo sobre un modelo real.
              </p>

              <div
                className="border-2 rounded-lg p-6 flex flex-col cursor-pointer group hover:shadow-node-hover transition-all duration-300"
                style={{ borderColor: "hsl(29 59% 48% / 0.4)", backgroundColor: "hsl(29 59% 48% / 0.04)" }}
                onClick={() => navigate(caseCard.href)}
              >
                <span className="text-[10px] font-sans font-bold uppercase tracking-[0.15em] text-copper mb-3">
                  {caseCard.label}
                </span>
                <h3 className="font-serif text-xl font-bold text-foreground mb-2">{caseCard.title}</h3>
                <p className="text-sm font-sans text-muted-foreground leading-relaxed mb-4">{caseCard.description}</p>
                <div className="space-y-1.5 mb-5">
                  {caseCard.stats.map((s, i) => (
                    <div key={i} className="flex items-baseline gap-2">
                      <span className="text-xs font-sans text-muted-foreground">{s.label}:</span>
                      <span className="text-sm font-sans font-bold text-foreground">{s.value}</span>
                    </div>
                  ))}
                </div>
                <button
                  className="w-full py-2.5 rounded-lg text-base font-sans font-bold transition-colors"
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

export default AnalisisFase1;
