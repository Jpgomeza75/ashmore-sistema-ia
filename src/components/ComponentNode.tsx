import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import type { SystemComponent } from "@/data/components";
import { forwardRef } from "react";

interface ComponentNodeProps {
  component: SystemComponent;
  isSelected: boolean;
  isDimmed: boolean;
  connectionBadge?: "input" | "output" | null;
  onSelect: (id: string | null) => void;
}

const ComponentNode = forwardRef<HTMLDivElement, ComponentNodeProps>(
  ({ component, isSelected, isDimmed, connectionBadge, onSelect }, ref) => {
    const navigate = useNavigate();

    const nodeClass =
      component.type === "CONTINUA"
        ? "node-continua"
        : component.type === "HABILITADORA"
          ? "node-habilitadora"
          : "node-episodica";

    return (
      <div
        ref={ref}
        data-node-id={component.id}
        className={`relative rounded-lg px-3 py-2.5 cursor-pointer transition-all duration-300 ${nodeClass} ${
          isDimmed ? "opacity-[0.35]" : ""
        } ${isSelected ? "shadow-node-hover scale-[1.03] ring-2 ring-copper" : "shadow-node hover:shadow-node-hover hover:scale-[1.01]"}`}
        onClick={() => onSelect(isSelected ? null : component.id)}
      >
        {/* Connection badge */}
        {connectionBadge && !isDimmed && (
          <span
            className={`absolute -top-2 -right-2 w-5 h-5 rounded-full text-[9px] font-sans font-bold flex items-center justify-center ${
              connectionBadge === "output"
                ? "bg-copper text-cream"
                : "bg-navy text-cream"
            }`}
          >
            {connectionBadge === "output" ? "→" : "←"}
          </span>
        )}
        <p className="text-[9px] font-sans font-semibold uppercase tracking-[0.15em] mb-1 text-copper">
          {component.type}
        </p>
        <h3 className="text-xs font-sans font-bold leading-tight">
          {component.name}
        </h3>
      </div>
    );
  }
);

ComponentNode.displayName = "ComponentNode";

export default ComponentNode;
