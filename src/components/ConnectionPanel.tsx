import { motion, AnimatePresence } from "framer-motion";
import {
  getOutputConnections,
  getInputConnections,
  getComponentById,
  type SystemComponent,
} from "@/data/components";
import { ArrowUpRight, ArrowDownLeft, Sparkles } from "lucide-react";

interface ConnectionPanelProps {
  componentId: string;
}

const iaOpportunities: Record<string, string[]> = {
  inteligencia: [
    "Monitoreo automatizado de noticias con alertas inteligentes",
    "Screening de targets con criterios dinámicos",
    "Generación de reportes sectoriales con IA",
  ],
  desarrollo: [
    "CRM inteligente con scoring de oportunidades",
    "Generación automática de materiales de acercamiento",
    "Seguimiento predictivo de relaciones",
  ],
  pitch: [
    "Generación de pitch decks personalizados",
    "Análisis de competidores en el pitch",
    "Estimación de probabilidad de éxito",
  ],
  analisis: [
    "Validación automática de supuestos con datos de mercado",
    "Modelación de escenarios con Monte Carlo",
    "Tradución de modelos a narrativa ejecutiva",
  ],
  estructuracion: [
    "Sugerencia de estructuras basada en precedentes",
    "Optimización de términos con análisis de escenarios",
    "Benchmarking automático de condiciones de mercado",
  ],
  narrativa: [
    "Generación de borradores de documentos con IA",
    "Revisión automática de consistencia y estilo",
    "Adaptación de documentos a diferentes audiencias",
  ],
  ejecucion: [
    "Gestión inteligente de data rooms",
    "Automatización de seguimiento de tareas",
    "Análisis automático de documentos de due diligence",
  ],
  control: [
    "Checklists dinámicos con verificación automática",
    "Detección de inconsistencias entre documentos",
    "Auditoría automática de cumplimiento regulatorio",
  ],
  memoria: [
    "Búsqueda semántica sobre el repositorio institucional",
    "Captura automática de conocimiento al cierre de deals",
    "Recomendación de precedentes relevantes",
  ],
};

const ConnectionPanel = ({ componentId }: ConnectionPanelProps) => {
  const outputs = getOutputConnections(componentId);
  const inputs = getInputConnections(componentId);
  const opportunities = iaOpportunities[componentId] || [];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="bg-card rounded-lg border border-border shadow-node p-6 mt-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Entradas */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <ArrowDownLeft className="w-4 h-4 text-foreground/60" />
              <h4 className="text-sm font-sans font-bold text-foreground uppercase tracking-wide">
                Entradas
              </h4>
            </div>
            <ul className="space-y-2">
              {inputs.map((conn, i) => {
                const source = getComponentById(conn.from);
                return (
                  <li key={i} className="text-xs font-sans text-muted-foreground leading-relaxed">
                    <span className="font-semibold text-foreground">{source?.shortName}</span>{" "}
                    — {conn.label}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Salidas */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <ArrowUpRight className="w-4 h-4 text-copper" />
              <h4 className="text-sm font-sans font-bold text-copper uppercase tracking-wide">
                Salidas
              </h4>
            </div>
            <ul className="space-y-2">
              {outputs.map((conn, i) => {
                const target = getComponentById(conn.to);
                return (
                  <li key={i} className="text-xs font-sans text-muted-foreground leading-relaxed">
                    <span className="font-semibold text-foreground">{target?.shortName}</span>{" "}
                    — {conn.label}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Oportunidades IA */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-copper" />
              <h4 className="text-sm font-sans font-bold text-copper uppercase tracking-wide">
                Oportunidades IA
              </h4>
            </div>
            <ul className="space-y-2">
              {opportunities.map((opp, i) => (
                <li key={i} className="text-xs font-sans text-muted-foreground leading-relaxed">
                  {opp}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ConnectionPanel;
