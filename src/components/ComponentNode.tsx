import type { SystemComponent } from "@/data/components";

interface ComponentNodeProps {
  component: SystemComponent;
  isSelected: boolean;
  isDimmed: boolean;
  connectionBadge?: "input" | "output" | "both" | null;
  onSelect: (id: string | null) => void;
  compact?: boolean;
}

const ComponentNode = ({ component, isSelected, isDimmed, connectionBadge, onSelect, compact }: ComponentNodeProps) => {
  const nodeClass =
    component.type === "CONTINUA"
      ? "node-continua"
      : component.type === "HABILITADORA"
        ? "node-habilitadora"
        : "node-episodica";

  const badgeSymbol = connectionBadge === "both" ? "↔" : connectionBadge === "output" ? "→" : "←";

  return (
    <div
      data-node-id={component.id}
      className={`relative rounded-lg cursor-pointer transition-all duration-300 ${nodeClass} ${
        compact ? "px-2.5 py-2" : "px-3 py-3"
      } ${
        isDimmed ? "opacity-[0.35]" : ""
      } ${
        isSelected
          ? "shadow-node-hover scale-[1.03] ring-2 ring-copper"
          : "shadow-node hover:shadow-node-hover hover:scale-[1.01]"
      }`}
      onClick={() => onSelect(isSelected ? null : component.id)}
    >
      {connectionBadge && !isDimmed && (
        <span
          className={`absolute -top-2 -right-2 w-5 h-5 rounded-full text-[9px] font-sans font-bold flex items-center justify-center ${
            connectionBadge === "input"
              ? "bg-navy text-cream"
              : "bg-copper text-cream"
          }`}
        >
          {badgeSymbol}
        </span>
      )}
      <p className={`font-sans font-semibold uppercase tracking-[0.15em] mb-0.5 text-copper ${compact ? "text-[9px]" : "text-[11px]"}`}>
        {component.type}
      </p>
      <h3 className={`font-sans font-bold leading-tight ${compact ? "text-sm" : "text-base"}`}>
        {component.name}
      </h3>
    </div>
  );
};

export default ComponentNode;
