import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import type { SystemComponent } from "@/data/components";

interface ComponentNodeProps {
  component: SystemComponent;
  isSelected: boolean;
  isDimmed: boolean;
  onSelect: (id: string | null) => void;
}

const typeLabels: Record<string, string> = {
  CONTINUA: "CONTINUA",
  "EPISÓDICA": "EPISÓDICA",
  HABILITADORA: "HABILITADORA",
};

const ComponentNode = ({ component, isSelected, isDimmed, onSelect }: ComponentNodeProps) => {
  const navigate = useNavigate();

  const nodeClass =
    component.type === "CONTINUA"
      ? "node-continua"
      : component.type === "HABILITADORA"
        ? "node-habilitadora"
        : "node-episodica";

  const labelColor =
    component.type === "EPISÓDICA" ? "text-copper" : "text-copper";

  return (
    <motion.div
      layout
      className={`relative rounded-lg px-5 py-4 cursor-pointer transition-all duration-300 ${nodeClass} ${
        isDimmed ? "opacity-30" : ""
      } ${isSelected ? "shadow-node-hover scale-[1.03]" : "shadow-node hover:shadow-node-hover hover:scale-[1.02]"}`}
      onClick={() => onSelect(isSelected ? null : component.id)}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <p className={`text-[10px] font-sans font-semibold uppercase tracking-[0.15em] mb-1.5 ${labelColor}`}>
        {typeLabels[component.type]}
      </p>
      <h3 className="text-sm font-sans font-bold leading-tight">
        {component.name}
      </h3>
      {isSelected && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-3 pt-3 border-t border-current/10"
        >
          <p className="text-xs font-sans opacity-80 leading-relaxed mb-3">
            {component.description}
          </p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/componente/${component.id}`);
            }}
            className="text-xs font-sans font-semibold text-copper hover:underline flex items-center gap-1"
          >
            Explorar <span aria-hidden>→</span>
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ComponentNode;
