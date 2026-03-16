import type { SystemComponent } from "@/data/components";

interface ComponentNodeProps {
  component: SystemComponent;
  isSelected: boolean;
  onSelect: (id: string | null) => void;
}

export default function ComponentNode({ component, isSelected, onSelect }: ComponentNodeProps) {
  const isTransversal = component.type === "TRANSVERSAL";
  const isJourney = component.type === "JOURNEY";

  if (isTransversal) {
    return (
      <div className="flex-1 flex items-center justify-center px-4">
        <span
          className="font-sans text-[11px] uppercase tracking-[2px] text-[#4A6070]"
          style={{ letterSpacing: "2px" }}
        >
          {component.shortName}
        </span>
      </div>
    );
  }

  // JOURNEY
  const isActive = component.hasContent;
  const isClickable = isActive;

  return (
    <div
      data-node-id={component.id}
      className={`
        flex-1 min-h-[90px] flex flex-col justify-end px-4 py-3
        transition-colors duration-200
        ${isActive ? "cursor-pointer hover:bg-[#143050]" : "cursor-default"}
      `}
      style={{
        background: isActive ? "#0A2240" : "#EAE7E0",
        borderBottom: isActive ? "3px solid #B8860B" : "none",
        borderRadius: 4,
      }}
      onClick={() => isClickable && onSelect(isSelected ? null : component.id)}
    >
      <span
        className="font-serif font-bold mb-1"
        style={{
          fontSize: 20,
          color: isActive ? "#B8860B" : "#AAAAAA",
        }}
      >
        {component.order}
      </span>
      <span
        className="font-sans text-[13px]"
        style={{
          color: isActive ? "#F8F5F0" : "#AAAAAA",
        }}
      >
        {component.name}
      </span>
    </div>
  );
}
