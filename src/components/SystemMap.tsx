import { useState, useRef, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  systemComponents,
  getConnectedIds,
  getComponentById,
  panelData,
} from "@/data/components";
import ComponentNode from "@/components/ComponentNode";
import DetailPanel from "@/components/DetailPanel";

interface LineCoords {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  type: "input" | "output";
}

const SystemMap = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const connectedIds = selectedId ? getConnectedIds(selectedId) : [];
  const containerRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<LineCoords[]>([]);

  const row1 = systemComponents.filter((c) => c.row === 1);
  const row2 = systemComponents.filter((c) => c.row === 2);
  const row3 = systemComponents.filter((c) => c.row === 3);
  const row4 = systemComponents.filter((c) => c.row === 4);
  const row5 = systemComponents.filter((c) => c.row === 5);

  const isDimmed = (id: string) => {
    if (!selectedId) return false;
    return id !== selectedId && !connectedIds.includes(id);
  };

  const getConnectionBadge = (id: string): "input" | "output" | "both" | null => {
    if (!selectedId || id === selectedId) return null;
    const data = panelData[selectedId];
    if (!data) return null;
    const isOutput = data.outputs.some((o) => o.sourceId === id);
    const isInput = data.inputs.some((i) => i.sourceId === id);
    if (isOutput && isInput) return "both";
    if (isOutput) return "output";
    if (isInput) return "input";
    return null;
  };

  const calculateLines = useCallback(() => {
    if (!selectedId || !containerRef.current) {
      setLines([]);
      return;
    }
    const data = panelData[selectedId];
    if (!data) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const selectedEl = containerRef.current.querySelector(
      `[data-node-id="${selectedId}"]`
    ) as HTMLElement | null;
    if (!selectedEl) return;

    const selRect = selectedEl.getBoundingClientRect();
    const selCx = selRect.left + selRect.width / 2 - containerRect.left;
    const selCy = selRect.top + selRect.height / 2 - containerRect.top;

    const newLines: LineCoords[] = [];

    data.outputs.forEach((o) => {
      const el = containerRef.current!.querySelector(
        `[data-node-id="${o.sourceId}"]`
      ) as HTMLElement | null;
      if (!el) return;
      const r = el.getBoundingClientRect();
      newLines.push({
        x1: selCx,
        y1: selCy,
        x2: r.left + r.width / 2 - containerRect.left,
        y2: r.top + r.height / 2 - containerRect.top,
        type: "output",
      });
    });

    data.inputs.forEach((i) => {
      const el = containerRef.current!.querySelector(
        `[data-node-id="${i.sourceId}"]`
      ) as HTMLElement | null;
      if (!el) return;
      const r = el.getBoundingClientRect();
      newLines.push({
        x1: r.left + r.width / 2 - containerRect.left,
        y1: r.top + r.height / 2 - containerRect.top,
        x2: selCx,
        y2: selCy,
        type: "input",
      });
    });

    setLines(newLines);
  }, [selectedId]);

  useEffect(() => {
    const t = setTimeout(calculateLines, 80);
    window.addEventListener("resize", calculateLines);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", calculateLines);
    };
  }, [calculateLines]);

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("[data-node-id]")) return;
    setSelectedId(null);
  };

  const rowLabel = (label: string) => (
    <div className="flex items-center gap-2 mb-1">
      <div className="h-px flex-1 bg-border" />
      <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </span>
      <div className="h-px flex-1 bg-border" />
    </div>
  );

  const mapContent = (
    <div
      ref={containerRef}
      className="relative h-full flex flex-col justify-center gap-0"
      onClick={handleBackgroundClick}
    >
      {/* SVG overlay */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
        style={{ overflow: "visible" }}
      >
        <defs>
          <marker id="arrow-copper" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="8" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 3.5 L 0 7 z" fill="hsl(29 59% 48%)" />
          </marker>
          <marker id="arrow-navy" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="8" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 3.5 L 0 7 z" fill="hsl(221 45% 18%)" opacity="0.5" />
          </marker>
        </defs>
        <AnimatePresence>
          {lines.map((line, i) => (
            <motion.line
              key={`${selectedId}-${i}`}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke={line.type === "output" ? "hsl(29 59% 48%)" : "hsl(221 45% 18%)"}
              strokeOpacity={line.type === "output" ? 0.8 : 0.35}
              strokeWidth={1.5}
              strokeDasharray="6 4"
              markerEnd={line.type === "output" ? "url(#arrow-copper)" : "url(#arrow-navy)"}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          ))}
        </AnimatePresence>
      </svg>

      {/* Row 1 */}
      {rowLabel("Funciones continuas")}
      <div className="grid grid-cols-2 gap-2 mb-1">
        {row1.map((c) => (
          <ComponentNode key={c.id} component={c} isSelected={selectedId === c.id} isDimmed={isDimmed(c.id)} connectionBadge={getConnectionBadge(c.id)} onSelect={setSelectedId} compact={!!selectedId} />
        ))}
      </div>

      <FlowArrow />

      {/* Row 2 */}
      {rowLabel("Embudo de captura")}
      <div className={`mx-auto mb-1 ${selectedId ? "w-full max-w-[70%]" : "max-w-md w-full"}`}>
        {row2.map((c) => (
          <ComponentNode key={c.id} component={c} isSelected={selectedId === c.id} isDimmed={isDimmed(c.id)} connectionBadge={getConnectionBadge(c.id)} onSelect={setSelectedId} compact={!!selectedId} />
        ))}
      </div>

      <FlowArrow />

      {/* Row 3 */}
      {rowLabel("Fábrica del deal")}
      <div className="grid grid-cols-3 gap-2 mb-1">
        {row3.map((c) => (
          <ComponentNode key={c.id} component={c} isSelected={selectedId === c.id} isDimmed={isDimmed(c.id)} connectionBadge={getConnectionBadge(c.id)} onSelect={setSelectedId} compact={!!selectedId} />
        ))}
      </div>

      <FlowArrow />

      {/* Row 4 */}
      {rowLabel("Salida al mundo")}
      <div className={`mx-auto mb-1 ${selectedId ? "w-full max-w-[70%]" : "max-w-md w-full"}`}>
        {row4.map((c) => (
          <ComponentNode key={c.id} component={c} isSelected={selectedId === c.id} isDimmed={isDimmed(c.id)} connectionBadge={getConnectionBadge(c.id)} onSelect={setSelectedId} compact={!!selectedId} />
        ))}
      </div>

      <FlowArrow />

      {/* Row 5 */}
      {rowLabel("Habilitadoras")}
      <div className="grid grid-cols-2 gap-2">
        {row5.map((c) => (
          <ComponentNode key={c.id} component={c} isSelected={selectedId === c.id} isDimmed={isDimmed(c.id)} connectionBadge={getConnectionBadge(c.id)} onSelect={setSelectedId} compact={!!selectedId} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex-1 min-h-0 flex gap-0 overflow-hidden">
      {/* Map side */}
      <motion.div
        className="min-h-0 overflow-hidden"
        animate={{ flex: selectedId ? "0 0 58%" : "0 0 100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="h-full max-w-4xl mx-auto px-2">
          {mapContent}
        </div>
      </motion.div>

      {/* Detail panel side */}
      <AnimatePresence>
        {selectedId && getComponentById(selectedId) && (
          <motion.div
            key="detail-panel"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "42%", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="min-h-0 overflow-hidden border-l-[3px] shrink-0"
            style={{ borderLeftColor: "hsl(29 59% 48%)" }}
          >
            <div className="h-full overflow-y-auto bg-card">
              <DetailPanel
                component={getComponentById(selectedId)!}
                onClose={() => setSelectedId(null)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FlowArrow = () => (
  <div className="flex justify-center my-0.5">
    <svg width="2" height="10" className="text-border">
      <line x1="1" y1="0" x2="1" y2="10" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" />
    </svg>
  </div>
);

export default SystemMap;
