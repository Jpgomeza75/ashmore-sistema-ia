import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { X, ArrowDownLeft, ArrowUpRight, Zap } from "lucide-react";
import {
  getComponentById,
  panelData,
  type SystemComponent,
} from "@/data/components";

interface ConnectionPanelProps {
  component: SystemComponent;
  onClose: () => void;
  onHoverConnection?: (targetId: string | null, type: "input" | "output" | null) => void;
}

const ConnectionPanel = ({ component, onClose, onHoverConnection }: ConnectionPanelProps) => {
  const navigate = useNavigate();
  const data = panelData[component.id];
  if (!data) return null;

  const typeColors: Record<string, string> = {
    JOURNEY: "bg-navy text-cream",
    TRANSVERSAL: "bg-navy-light text-cream",
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="bg-card rounded-lg border border-border shadow-node mt-8"
      >
        {/* Header */}
        <div className="flex items-start justify-between p-5 pb-4 border-b border-border">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className={`text-[10px] font-sans font-bold uppercase tracking-[0.15em] px-2 py-0.5 rounded-sm ${typeColors[component.type]}`}>
                {component.type}
              </span>
            </div>
            <h2 className="font-serif text-xl font-bold text-foreground mb-1.5">
              {component.name}
            </h2>
            <p className="text-sm font-sans text-muted-foreground leading-relaxed max-w-2xl">
              {component.description}
            </p>
            <button
              onClick={() => navigate(`/componente/${component.id}`)}
              className="mt-3 text-sm font-sans font-semibold text-copper hover:underline inline-flex items-center gap-1"
            >
              {component.hasContent ? "Explorar en detalle" : "Próximamente"} <span aria-hidden>→</span>
            </button>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors ml-4 shrink-0"
            aria-label="Cerrar panel"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
          {/* Entradas */}
          <div className="p-5">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b-2" style={{ borderBottomColor: "hsl(221 45% 18%)" }}>
              <ArrowDownLeft className="w-4 h-4 text-foreground/60" />
              <h4 className="text-xs font-sans font-bold uppercase tracking-wide text-foreground">
                Entradas
              </h4>
            </div>
            <ul className="space-y-3">
              {data.inputs.map((entry, i) => {
                const source = getComponentById(entry.sourceId);
                return (
                  <li
                    key={i}
                    className="text-xs font-sans text-muted-foreground leading-relaxed pl-3 border-l-2 py-1 cursor-default hover:bg-secondary/50 rounded-r transition-colors"
                    style={{ borderLeftColor: "hsl(221 45% 18%)" }}
                    onMouseEnter={() => onHoverConnection?.(entry.sourceId, "input")}
                    onMouseLeave={() => onHoverConnection?.(null, null)}
                  >
                    <span className="font-bold text-foreground block">{source?.shortName}</span>
                    {entry.label}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Salidas */}
          <div className="p-5">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b-2 border-copper">
              <ArrowUpRight className="w-4 h-4 text-copper" />
              <h4 className="text-xs font-sans font-bold uppercase tracking-wide text-copper">
                Salidas
              </h4>
            </div>
            <ul className="space-y-3">
              {data.outputs.map((entry, i) => {
                const target = getComponentById(entry.sourceId);
                return (
                  <li
                    key={i}
                    className="text-xs font-sans text-muted-foreground leading-relaxed pl-3 border-l-2 border-copper py-1 cursor-default hover:bg-secondary/50 rounded-r transition-colors"
                    onMouseEnter={() => onHoverConnection?.(entry.sourceId, "output")}
                    onMouseLeave={() => onHoverConnection?.(null, null)}
                  >
                    <span className="font-bold text-foreground block">{target?.shortName}</span>
                    {entry.label}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Oportunidades IA */}
          <div className="p-5">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b-2" style={{ borderBottomColor: "hsl(152 52% 32%)" }}>
              <Zap className="w-4 h-4" style={{ color: "hsl(152 52% 32%)" }} />
              <h4 className="text-xs font-sans font-bold uppercase tracking-wide" style={{ color: "hsl(152 52% 32%)" }}>
                Oportunidades IA
              </h4>
            </div>
            <ul className="space-y-3">
              {data.iaOpportunities.map((opp, i) => (
                <li
                  key={i}
                  className="text-xs font-sans text-muted-foreground leading-relaxed pl-3 border-l-2 py-1"
                  style={{ borderLeftColor: "hsl(152 52% 32%)" }}
                >
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
