import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import type { SystemComponent } from "@/data/components";

interface DetailPanelProps {
  component: SystemComponent;
  onClose: () => void;
}

export default function DetailPanel({ component, onClose }: DetailPanelProps) {
  const navigate = useNavigate();
  return (
    <div className="p-6 h-full flex flex-col">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <span className="inline-block text-[10px] font-sans font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm mb-2 bg-[#0A2240] text-[#F8F5F0]">
            {component.type}
          </span>
          <h2 className="font-serif text-xl font-bold text-[#0A2240] leading-tight mb-2">
            {component.name}
          </h2>
          <p className="text-sm font-sans text-[#6B7280] leading-relaxed">
            {component.description}
          </p>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-md text-[#6B7280] hover:text-[#0A2240] hover:bg-[#F8F5F0] transition-colors ml-3 shrink-0"
          aria-label="Cerrar panel"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {!component.hasContent ? (
        <div className="flex-1 flex flex-col items-center justify-center py-12">
          <div className="w-16 h-16 rounded-full bg-[#F8F5F0] flex items-center justify-center mb-4">
            <span className="text-2xl font-serif font-bold text-[#B8860B]">·</span>
          </div>
          <span className="inline-block px-4 py-2 rounded-lg bg-[#B8860B]/10 text-[#B8860B] font-sans font-semibold text-sm">
            Próximamente
          </span>
          <p className="text-sm font-sans text-[#6B7280] mt-3 text-center max-w-xs">
            Este módulo se habilitará próximamente.
          </p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto space-y-6">
          {component.problemToday && (
            <section>
              <h4 className="text-xs font-sans font-bold uppercase tracking-wider text-[#0A2240] mb-2">
                El problema hoy
              </h4>
              <p className="text-sm font-sans text-[#6B7280] leading-relaxed">
                {component.problemToday}
              </p>
            </section>
          )}

          {component.level1 && (
            <section>
              <h4 className="text-xs font-sans font-bold uppercase tracking-wider text-[#0A2240] mb-2">
                Nivel 1 — Superpoderes con IA
              </h4>
              <p className="text-sm font-sans text-[#6B7280] leading-relaxed mb-4">
                {component.level1.intro}
              </p>
              <ul className="space-y-2">
                {component.level1.cases.map((c, i) => (
                  <li
                    key={i}
                    className="text-sm font-sans text-[#0A2240] pl-3 border-l-2 border-[#B8860B]"
                  >
                    <span className="font-semibold">{c.title}</span> — {c.description}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {component.level2 && (
            <section>
              <h4 className="text-xs font-sans font-bold uppercase tracking-wider text-[#0A2240] mb-2">
                Nivel 2 — Visión institucional
              </h4>
              <p className="text-sm font-sans text-[#6B7280] leading-relaxed mb-4">
                {component.level2.intro}
              </p>
              <ul className="space-y-2">
                {component.level2.features.map((f, i) => (
                  <li key={i} className="text-sm font-sans text-[#6B7280] flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B8860B] shrink-0 mt-1.5" />
                    {f}
                  </li>
                ))}
              </ul>
            </section>
          )}
          <button
            onClick={() => navigate(`/componente/${component.id}`)}
            className="mt-6 w-full py-3 rounded-lg bg-[#B8860B] text-white font-sans font-semibold text-sm hover:bg-[#B8860B]/90 transition-colors"
          >
            Explorar en detalle →
          </button>
        </div>
      )}
    </div>
  );
}
