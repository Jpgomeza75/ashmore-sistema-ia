import { useNavigate } from "react-router-dom";
import { X, ArrowDownLeft, ArrowUpRight, Zap } from "lucide-react";
import {
  getComponentById,
  panelData,
  type SystemComponent,
} from "@/data/components";

interface DetailPanelProps {
  component: SystemComponent;
  onClose: () => void;
}

const DetailPanel = ({ component, onClose }: DetailPanelProps) => {
  const navigate = useNavigate();
  const data = panelData[component.id];
  if (!data) return null;

  const typeColors: Record<string, string> = {
    JOURNEY: "bg-navy text-cream",
    TRANSVERSAL: "bg-navy-light text-cream",
  };

  return (
    <div className="p-5">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <span className={`inline-block text-[11px] font-sans font-bold uppercase tracking-[0.15em] px-2.5 py-1 rounded-sm mb-2 ${typeColors[component.type]}`}>
            {component.type}
          </span>
          <h2 className="font-serif text-xl font-bold text-foreground leading-tight mb-1.5">
            {component.name}
          </h2>
          <p className="text-sm font-sans text-muted-foreground leading-relaxed">
            {component.description}
          </p>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors ml-3 shrink-0"
          aria-label="Cerrar panel"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Entradas */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-3 pb-1.5 border-b-2" style={{ borderBottomColor: "hsl(221 45% 18%)" }}>
          <ArrowDownLeft className="w-3.5 h-3.5 text-foreground/60" />
          <h4 className="text-xs font-sans font-bold uppercase tracking-wide text-foreground">
            Entradas
          </h4>
        </div>
        <ul className="space-y-2">
          {data.inputs.map((entry, i) => {
            const source = getComponentById(entry.sourceId);
            return (
              <li
                key={i}
                className="text-sm font-sans text-muted-foreground leading-relaxed pl-3 border-l-2 py-0.5"
                style={{ borderLeftColor: "hsl(221 45% 18%)" }}
              >
                <span className="font-bold text-foreground block text-xs">{source?.shortName}</span>
                {entry.label}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Salidas */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-3 pb-1.5 border-b-2 border-copper">
          <ArrowUpRight className="w-3.5 h-3.5 text-copper" />
          <h4 className="text-xs font-sans font-bold uppercase tracking-wide text-copper">
            Salidas
          </h4>
        </div>
        <ul className="space-y-2">
          {data.outputs.map((entry, i) => {
            const target = getComponentById(entry.sourceId);
            return (
              <li
                key={i}
                className="text-sm font-sans text-muted-foreground leading-relaxed pl-3 border-l-2 border-copper py-0.5"
              >
                <span className="font-bold text-copper block text-xs">{target?.shortName}</span>
                {entry.label}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Oportunidades IA */}
      <div className="mb-5">
        <div className="flex items-center gap-2 mb-3 pb-1.5 border-b-2" style={{ borderBottomColor: "hsl(152 52% 32%)" }}>
          <Zap className="w-3.5 h-3.5" style={{ color: "hsl(152 52% 32%)" }} />
          <h4 className="text-xs font-sans font-bold uppercase tracking-wide" style={{ color: "hsl(152 52% 32%)" }}>
            Oportunidades IA
          </h4>
        </div>
        <ul className="space-y-2">
          {data.iaOpportunities.map((opp, i) => (
            <li
              key={i}
              className="text-sm font-sans text-muted-foreground leading-relaxed pl-3 border-l-2 py-0.5"
              style={{ borderLeftColor: "hsl(152 52% 32%)" }}
            >
              {opp}
            </li>
          ))}
        </ul>
      </div>

      {/* Navigate button */}
      <button
        onClick={() => navigate(`/componente/${component.id}`)}
        className="w-full py-3 rounded-lg text-base font-sans font-semibold transition-colors"
        style={{ backgroundColor: "hsl(29 59% 48%)", color: "white" }}
      >
        {component.hasContent ? "Explorar en detalle →" : "Próximamente →"}
      </button>
    </div>
  );
};

export default DetailPanel;
