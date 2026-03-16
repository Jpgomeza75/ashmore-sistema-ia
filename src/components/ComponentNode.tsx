import type { SystemComponent } from "@/data/components";

interface ComponentNodeProps {
  component: SystemComponent;
  isSelected: boolean;
  onSelect: (id: string | null) => void;
}

export default function ComponentNode({ component, isSelected, onSelect }: ComponentNodeProps) {
  const isTransversal = component.type === "TRANSVERSAL";
  const isJourney = component.type === "JOURNEY";

  const baseClass = "relative rounded-lg cursor-pointer transition-all duration-300 px-3 py-3";
  const transversalClass = "bg-[#0A2240] text-[#F8F5F0] border border-[#B8860B]/40";
  const journeyClass = "bg-white text-[#0A2240] border-2 border-[#0A2240]";
  const selectedClass = "ring-2 ring-[#B8860B] scale-[1.02] shadow-lg";

  return (
    <div
      data-node-id={component.id}
      className={`${baseClass} ${isTransversal ? transversalClass : journeyClass} ${
        isSelected ? selectedClass : "hover:border-[#B8860B]/60"
      }`}
      onClick={() => onSelect(isSelected ? null : component.id)}
    >
      {isJourney && (
        <span className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-[#B8860B] text-white text-xs font-bold flex items-center justify-center">
          {component.order}
        </span>
      )}
      <p className="font-sans text-[10px] font-semibold uppercase tracking-wider mb-0.5 text-[#B8860B]">
        {component.type}
      </p>
      <h3 className="font-sans font-bold leading-tight text-sm">
        {component.name}
      </h3>
    </div>
  );
}
