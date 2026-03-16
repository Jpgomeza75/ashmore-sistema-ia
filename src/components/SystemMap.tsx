import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { journeyComponents, transversalComponents, getComponentById } from "@/data/components";
import ComponentNode from "./ComponentNode";
import DetailPanel from "./DetailPanel";

export default function SystemMap() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedComponent = selectedId ? getComponentById(selectedId) : null;

  return (
    <div className="flex-1 min-h-0 flex gap-0 overflow-hidden">
      {/* Mapa — 58% cuando hay panel, 100% cuando no */}
      <div
        className="min-h-0 flex flex-col overflow-hidden transition-[flex] duration-300"
        style={{ flex: selectedId ? "0 0 58%" : "1 1 100%" }}
      >
        {/* Etiqueta EL JOURNEY */}
        <div
          className="shrink-0 mb-3 font-sans uppercase"
          style={{
            fontSize: 10,
            letterSpacing: "3px",
            color: "#B8860B",
          }}
        >
          EL JOURNEY
        </div>

        {/* JOURNEY — 5 cajas en fila horizontal */}
        <div className="flex items-stretch gap-0 flex-1 min-h-0">
          {journeyComponents.map((c, idx) => (
            <div key={c.id} className="flex items-stretch flex-1 min-w-0">
              <ComponentNode
                component={c}
                isSelected={selectedId === c.id}
                onSelect={setSelectedId}
              />
              {idx < journeyComponents.length - 1 && (
                <div className="flex items-center justify-center shrink-0 w-6">
                  <ArrowRight size={20} style={{ color: "#B8860B" }} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Separación 24px */}
        <div style={{ height: 24 }} />

        {/* TRANSVERSALES — banda horizontal */}
        <div
          className="shrink-0 flex items-center rounded"
          style={{
            height: 40,
            background: "#0A2240",
          }}
        >
          <span
            className="shrink-0 pl-4 pr-3 font-sans uppercase"
            style={{
              fontSize: 9,
              letterSpacing: "1px",
              color: "#B8860B",
            }}
          >
            BASE TRANSVERSAL
          </span>
          {transversalComponents.map((c, idx) => (
            <div key={c.id} className="flex items-center flex-1">
              {idx > 0 && (
                <div
                  className="h-5 w-px shrink-0"
                  style={{ background: "#1E3A5A" }}
                />
              )}
              <ComponentNode
                component={c}
                isSelected={selectedId === c.id}
                onSelect={setSelectedId}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Panel lateral — 42% del área de contenido */}
      <AnimatePresence>
        {selectedId && selectedComponent && (
          <motion.div
            key="detail-panel"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "42%", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="min-h-0 overflow-hidden shrink-0 bg-white"
            style={{ borderLeft: "3px solid #B8860B" }}
          >
            <div className="h-full overflow-y-auto">
              <DetailPanel component={selectedComponent} onClose={() => setSelectedId(null)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
