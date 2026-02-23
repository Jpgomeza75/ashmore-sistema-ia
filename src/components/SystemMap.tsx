import { useState, useRef, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  systemComponents,
  getConnectedIds,
  getComponentById,
  panelData,
} from "@/data/components";
import ComponentNode from "@/components/ComponentNode";
import ConnectionPanel from "@/components/ConnectionPanel";

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

  const getConnectionBadge = (id: string): "input" | "output" | null => {
    if (!selectedId || id === selectedId) return null;
    const data = panelData[selectedId];
    if (!data) return null;
    const isOutput = data.outputs.some((o) => o.sourceId === id);
    const isInput = data.inputs.some((i) => i.sourceId === id);
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

    // outputs (copper)
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

    // inputs (navy)
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
    // Small delay to let DOM settle
    const t = setTimeout(calculateLines, 50);
    window.addEventListener("resize", calculateLines);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", calculateLines);
    };
  }, [calculateLines]);

  const rowLabel = (label: string) => (
    <div className="flex items-center gap-2 mb-1.5">
      <div className="h-px flex-1 bg-border" />
      <span className="text-[9px] font-sans font-medium uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </span>
      <div className="h-px flex-1 bg-border" />
    </div>
  );

  return (
    <>
      <div ref={containerRef} className="w-full max-w-4xl mx-auto relative">
        {/* SVG overlay for connection lines */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
          style={{ overflow: "visible" }}
        >
          <defs>
            <marker
              id="arrow-copper"
              viewBox="0 0 10 7"
              refX="10"
              refY="3.5"
              markerWidth="8"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 3.5 L 0 7 z" fill="hsl(29 59% 48%)" />
            </marker>
            <marker
              id="arrow-navy"
              viewBox="0 0 10 7"
              refX="10"
              refY="3.5"
              markerWidth="8"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path
                d="M 0 0 L 10 3.5 L 0 7 z"
                fill="hsl(221 45% 18%)"
                opacity="0.5"
              />
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
                stroke={
                  line.type === "output"
                    ? "hsl(29 59% 48%)"
                    : "hsl(221 45% 18%)"
                }
                strokeOpacity={line.type === "output" ? 0.8 : 0.35}
                strokeWidth={1.5}
                strokeDasharray="6 4"
                markerEnd={
                  line.type === "output"
                    ? "url(#arrow-copper)"
                    : "url(#arrow-navy)"
                }
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            ))}
          </AnimatePresence>
        </svg>

        {/* Row 1 */}
        {rowLabel("Funciones continuas")}
        <div className="grid grid-cols-2 gap-3 mb-3">
          {row1.map((c) => (
            <ComponentNode
              key={c.id}
              component={c}
              isSelected={selectedId === c.id}
              isDimmed={isDimmed(c.id)}
              connectionBadge={getConnectionBadge(c.id)}
              onSelect={setSelectedId}
            />
          ))}
        </div>

        <FlowArrow />

        {/* Row 2 */}
        {rowLabel("Embudo de captura")}
        <div className="max-w-sm mx-auto mb-3">
          {row2.map((c) => (
            <ComponentNode
              key={c.id}
              component={c}
              isSelected={selectedId === c.id}
              isDimmed={isDimmed(c.id)}
              connectionBadge={getConnectionBadge(c.id)}
              onSelect={setSelectedId}
            />
          ))}
        </div>

        <FlowArrow />

        {/* Row 3 */}
        {rowLabel("Fábrica del deal")}
        <div className="grid grid-cols-3 gap-3 mb-3">
          {row3.map((c) => (
            <ComponentNode
              key={c.id}
              component={c}
              isSelected={selectedId === c.id}
              isDimmed={isDimmed(c.id)}
              connectionBadge={getConnectionBadge(c.id)}
              onSelect={setSelectedId}
            />
          ))}
        </div>

        <FlowArrow />

        {/* Row 4 */}
        {rowLabel("Salida al mundo")}
        <div className="max-w-sm mx-auto mb-3">
          {row4.map((c) => (
            <ComponentNode
              key={c.id}
              component={c}
              isSelected={selectedId === c.id}
              isDimmed={isDimmed(c.id)}
              connectionBadge={getConnectionBadge(c.id)}
              onSelect={setSelectedId}
            />
          ))}
        </div>

        <FlowArrow />

        {/* Row 5 */}
        {rowLabel("Habilitadoras")}
        <div className="grid grid-cols-2 gap-3">
          {row5.map((c) => (
            <ComponentNode
              key={c.id}
              component={c}
              isSelected={selectedId === c.id}
              isDimmed={isDimmed(c.id)}
              connectionBadge={getConnectionBadge(c.id)}
              onSelect={setSelectedId}
            />
          ))}
        </div>
      </div>

      {/* Overlay panel */}
      <AnimatePresence>
        {selectedId && getComponentById(selectedId) && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border shadow-[0_-4px_24px_rgba(0,0,0,0.1)]"
            style={{ maxHeight: "35vh" }}
          >
            <div className="overflow-y-auto" style={{ maxHeight: "35vh" }}>
              <ConnectionPanel
                component={getComponentById(selectedId)!}
                onClose={() => setSelectedId(null)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const FlowArrow = () => (
  <div className="flex justify-center my-1">
    <svg width="2" height="14" className="text-border">
      <line
        x1="1"
        y1="0"
        x2="1"
        y2="14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="3 2"
      />
    </svg>
  </div>
);

export default SystemMap;
