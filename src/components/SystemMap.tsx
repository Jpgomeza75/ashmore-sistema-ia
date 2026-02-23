import { useState } from "react";
import { motion } from "framer-motion";
import { systemComponents, getConnectedIds, getComponentById } from "@/data/components";
import ComponentNode from "@/components/ComponentNode";
import ConnectionPanel from "@/components/ConnectionPanel";

const SystemMap = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const connectedIds = selectedId ? getConnectedIds(selectedId) : [];

  const row1 = systemComponents.filter(c => c.row === 1);
  const row2 = systemComponents.filter(c => c.row === 2);
  const row3 = systemComponents.filter(c => c.row === 3);
  const row4 = systemComponents.filter(c => c.row === 4);
  const row5 = systemComponents.filter(c => c.row === 5);

  const isDimmed = (id: string) => {
    if (!selectedId) return false;
    return id !== selectedId && !connectedIds.includes(id);
  };

  const rowLabel = (label: string) => (
    <div className="flex items-center gap-3 mb-3">
      <div className="h-px flex-1 bg-border" />
      <span className="text-[10px] font-sans font-medium uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </span>
      <div className="h-px flex-1 bg-border" />
    </div>
  );

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Row 1 — Funciones continuas */}
      {rowLabel("Funciones continuas")}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {row1.map(c => (
          <ComponentNode
            key={c.id}
            component={c}
            isSelected={selectedId === c.id}
            isDimmed={isDimmed(c.id)}
            onSelect={setSelectedId}
          />
        ))}
      </div>

      {/* Flow indicator */}
      <FlowArrow />

      {/* Row 2 — Embudo de captura */}
      {rowLabel("Embudo de captura")}
      <div className="max-w-md mx-auto mb-6">
        {row2.map(c => (
          <ComponentNode
            key={c.id}
            component={c}
            isSelected={selectedId === c.id}
            isDimmed={isDimmed(c.id)}
            onSelect={setSelectedId}
          />
        ))}
      </div>

      <FlowArrow />

      {/* Row 3 — Fábrica del deal */}
      {rowLabel("Fábrica del deal")}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {row3.map(c => (
          <ComponentNode
            key={c.id}
            component={c}
            isSelected={selectedId === c.id}
            isDimmed={isDimmed(c.id)}
            onSelect={setSelectedId}
          />
        ))}
      </div>

      <FlowArrow />

      {/* Row 4 — Salida al mundo */}
      {rowLabel("Salida al mundo")}
      <div className="max-w-md mx-auto mb-6">
        {row4.map(c => (
          <ComponentNode
            key={c.id}
            component={c}
            isSelected={selectedId === c.id}
            isDimmed={isDimmed(c.id)}
            onSelect={setSelectedId}
          />
        ))}
      </div>

      <FlowArrow />

      {/* Row 5 — Habilitadoras */}
      {rowLabel("Habilitadoras")}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {row5.map(c => (
          <ComponentNode
            key={c.id}
            component={c}
            isSelected={selectedId === c.id}
            isDimmed={isDimmed(c.id)}
            onSelect={setSelectedId}
          />
        ))}
      </div>

      {/* Connection Panel */}
      {selectedId && getComponentById(selectedId) && (
        <ConnectionPanel
          component={getComponentById(selectedId)!}
          onClose={() => setSelectedId(null)}
        />
      )}
    </div>
  );
};

const FlowArrow = () => (
  <div className="flex justify-center my-3">
    <svg width="2" height="28" className="text-border">
      <line
        x1="1" y1="0" x2="1" y2="28"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="4 3"
      />
    </svg>
  </div>
);

export default SystemMap;
