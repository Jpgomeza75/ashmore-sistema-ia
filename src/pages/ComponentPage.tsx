import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import { getComponentById, getAdjacentComponents } from "@/data/components";

export default function ComponentPage() {
  const { id } = useParams<{ id: string }>();
  const component = getComponentById(id || "");

  if (!component) {
    return (
      <div className="min-h-screen bg-[#F8F5F0]">
        <Header />
        <div className="container max-w-3xl mx-auto px-4 py-20 text-center">
          <h1 className="font-serif text-2xl font-bold text-[#0A2240] mb-2">
            Componente no encontrado
          </h1>
          <Link to="/" className="text-sm font-sans text-[#B8860B] hover:underline">
            Volver al Mapa
          </Link>
        </div>
      </div>
    );
  }

  const adj = getAdjacentComponents(component.id);

  return (
    <div className="min-h-screen bg-[#F8F5F0]">
      <Header />
      <main className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs font-sans text-[#6B7280] mb-8 flex items-center gap-1.5"
        >
          <Link to="/" className="hover:text-[#0A2240] transition-colors">
            Mapa del Sistema
          </Link>
          <span>/</span>
          <span className="text-[#0A2240] font-medium">{component.name}</span>
        </motion.nav>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <span className="inline-block text-[10px] font-sans font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm mb-4 bg-[#0A2240] text-[#F8F5F0]">
            {component.type}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0A2240] leading-tight mb-4">
            {component.name}
          </h1>
          <p className="text-base font-sans text-[#6B7280] leading-relaxed max-w-2xl">
            {component.description}
          </p>
        </motion.div>

        {!component.hasContent ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white border border-[#143050]/20 rounded-lg p-10 text-center mb-12"
          >
            <span className="inline-block px-4 py-2 rounded-lg bg-[#B8860B]/10 text-[#B8860B] font-sans font-semibold text-sm">
              Próximamente
            </span>
            <p className="text-sm font-sans text-[#6B7280] mt-4 max-w-md mx-auto">
              Este módulo se habilitará próximamente.
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-8"
          >
            {component.problemToday && (
              <section>
                <h2 className="font-serif text-lg font-bold text-[#0A2240] mb-3">
                  El problema hoy
                </h2>
                <p className="text-sm font-sans text-[#6B7280] leading-relaxed">
                  {component.problemToday}
                </p>
              </section>
            )}
            {component.level1 && (
              <section>
                <h2 className="font-serif text-lg font-bold text-[#0A2240] mb-3">
                  Nivel 1 — Superpoderes con IA
                </h2>
                <p className="text-sm font-sans text-[#6B7280] leading-relaxed mb-4">
                  {component.level1.intro}
                </p>
                <ul className="space-y-2">
                  {component.level1.cases.map((c, i) => (
                    <li key={i} className="text-sm font-sans text-[#0A2240] pl-3 border-l-2 border-[#B8860B]">
                      <span className="font-semibold">{c.title}</span> — {c.description}
                    </li>
                  ))}
                </ul>
              </section>
            )}
            {component.level2 && (
              <section>
                <h2 className="font-serif text-lg font-bold text-[#0A2240] mb-3">
                  Nivel 2 — Visión institucional
                </h2>
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
          </motion.div>
        )}

        <div className="flex items-center justify-between mt-14 pt-8 border-t border-[#143050]/20">
          {adj.prev ? (
            <Link
              to={`/componente/${adj.prev.id}`}
              className="flex items-center gap-2 text-sm font-sans text-[#6B7280] hover:text-[#0A2240] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {adj.prev.shortName}
            </Link>
          ) : (
            <div />
          )}
          <Link to="/" className="text-sm font-sans font-medium text-[#B8860B] hover:underline">
            Volver al Mapa
          </Link>
          {adj.next ? (
            <Link
              to={`/componente/${adj.next.id}`}
              className="flex items-center gap-2 text-sm font-sans text-[#6B7280] hover:text-[#0A2240] transition-colors"
            >
              {adj.next.shortName}
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </main>
    </div>
  );
}
