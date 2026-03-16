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
      <div className="flex-1 min-h-0 flex flex-col justify-center p-4">
        {/* CAPA 1 — TRANSVERSALES */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-px flex-1 bg-[#143050]/30" />
            <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-[#6B7280]">
              Transversales
            </span>
            <div className="h-px flex-1 bg-[#143050]/30" />
          </div>
          <div className="grid grid-cols-4 gap-3">
            {transversalComponents.map((c) => (
              <ComponentNode
                key={c.id}
                component={c}
                isSelected={selectedId === c.id}
                onSelect={setSelectedId}
              />
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-2 my-4">
          <div className="h-px flex-1 bg-[#143050]/20" />
          <div className="text-[#B8860B]">
            <svg width="12" height="12" viewBox="0 0 12 12">
              <path
                d="M6 0 L6 10 M2 6 L6 10 L10 6"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="h-px flex-1 bg-[#143050]/20" />
        </div>

        {/* CAPA 2 — JOURNEY */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="h-px flex-1 bg-[#143050]/30" />
            <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-[#6B7280]">
              El Journey
            </span>
            <div className="h-px flex-1 bg-[#143050]/30" />
          </div>
          <div className="flex items-stretch gap-0">
            {journeyComponents.map((c, idx) => (
              <div key={c.id} className="flex items-center flex-1 min-w-0">
                <div className="flex-1 min-w-0">
                  <ComponentNode
                    component={c}
                    isSelected={selectedId === c.id}
                    onSelect={setSelectedId}
                  />
                </div>
                {idx < journeyComponents.length - 1 && (
                  <div className="flex items-center justify-center w-8 shrink-0">
                    <ArrowRight className="w-5 h-5 text-[#B8860B]" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Panel lateral */}
      <AnimatePresence>
        {selectedId && selectedComponent && (
          <motion.div
            key="detail-panel"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "42%", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="min-h-0 overflow-hidden border-l-2 border-[#B8860B] shrink-0 bg-white"
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
