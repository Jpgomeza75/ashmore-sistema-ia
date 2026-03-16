import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import { getComponentById, getAdjacentComponents } from "@/data/components";

export default function ComponentPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const component = getComponentById(id || "");

  if (!component) {
    return (
      <div style={{ height: "100vh", display: "flex", flexDirection: "column", background: "#F5F2EC" }}>
        <Header />
        <div style={{ flex: 1, overflow: "auto" }}>
          <div style={{ maxWidth: 768, margin: "0 auto", padding: 80, textAlign: "center" }}>
            <h1 style={{ fontFamily: "Georgia, serif", fontSize: 24, fontWeight: 700, color: "#0A2240", marginBottom: 8 }}>
              Componente no encontrado
            </h1>
            <Link to="/" style={{ fontSize: 14, color: "#B8860B", textDecoration: "underline" }}>
              Volver al Mapa
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const adj = getAdjacentComponents(component.id);

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", background: "#F5F2EC" }}>
      <Header />
      <div style={{ flex: 1, overflow: "auto" }}>
        <main style={{ maxWidth: 896, margin: "0 auto", padding: "40px 24px 56px" }}>
          <button
            onClick={() => navigate("/")}
            style={{
              background: "none",
              border: "none",
              color: "#0A2240",
              fontSize: 13,
              cursor: "pointer",
              padding: 0,
              marginBottom: 24,
              fontFamily: "Inter, sans-serif"
            }}
          >
            ← Volver al mapa
          </button>

          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ fontSize: 12, color: "#6B7280", marginBottom: 32, display: "flex", alignItems: "center", gap: 6 }}
          >
            <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>Mapa del Sistema</Link>
            <span>/</span>
            <span style={{ color: "#0A2240", fontWeight: 500 }}>{component.name}</span>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={{ marginBottom: 48 }}
          >
            <span style={{
              display: "inline-block",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: 2,
              textTransform: "uppercase",
              padding: "4px 10px",
              borderRadius: 4,
              marginBottom: 16,
              background: "#0A2240",
              color: "#F8F5F0"
            }}>
              {component.type}
            </span>
            <h1 style={{
              fontFamily: "Georgia, serif",
              fontSize: 36,
              fontWeight: 700,
              color: "#0A2240",
              lineHeight: 1.2,
              marginBottom: 16
            }}>
              {component.name}
            </h1>
            <p style={{ fontSize: 16, color: "#6B7280", lineHeight: 1.6, maxWidth: 672 }}>
              {component.description}
            </p>
          </motion.div>

          {!component.hasContent ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              style={{
                background: "white",
                border: "1px solid #E0DBD0",
                borderRadius: 8,
                padding: 40,
                textAlign: "center",
                marginBottom: 48
              }}
            >
              <span style={{
                display: "inline-block",
                padding: "8px 16px",
                borderRadius: 8,
                background: "rgba(184,134,11,0.1)",
                color: "#B8860B",
                fontWeight: 600,
                fontSize: 14
              }}>
                Próximamente
              </span>
              <p style={{ fontSize: 14, color: "#6B7280", marginTop: 16, maxWidth: 400, margin: "16px auto 0" }}>
                Este módulo se habilitará próximamente.
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              style={{ display: "flex", flexDirection: "column", gap: 32 }}
            >
              {component.problemToday && (
                <section>
                  <h2 style={{ fontFamily: "Georgia, serif", fontSize: 18, fontWeight: 700, color: "#0A2240", marginBottom: 12 }}>
                    El problema hoy
                  </h2>
                  <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.6 }}>
                    {component.problemToday}
                  </p>
                </section>
              )}
              {component.level1 && (
                <section>
                  <h2 style={{ fontFamily: "Georgia, serif", fontSize: 18, fontWeight: 700, color: "#0A2240", marginBottom: 12 }}>
                    Nivel 1 — Superpoderes con IA
                  </h2>
                  <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.6, marginBottom: 16 }}>
                    {component.level1.intro}
                  </p>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {component.level1.cases.map((c, i) => (
                      <li key={i} style={{
                        fontSize: 14,
                        color: "#0A2240",
                        paddingLeft: 12,
                        borderLeft: "2px solid #B8860B",
                        marginBottom: 8
                      }}>
                        <span style={{ fontWeight: 600 }}>{c.title}</span> — {c.description}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
              {component.level2 && (
                <section>
                  <h2 style={{ fontFamily: "Georgia, serif", fontSize: 18, fontWeight: 700, color: "#0A2240", marginBottom: 12 }}>
                    Nivel 2 — Visión institucional
                  </h2>
                  <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.6, marginBottom: 16 }}>
                    {component.level2.intro}
                  </p>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {component.level2.features.map((f, i) => (
                      <li key={i} style={{
                        fontSize: 14,
                        color: "#6B7280",
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 8,
                        marginBottom: 8
                      }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#B8860B", flexShrink: 0, marginTop: 6 }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </motion.div>
          )}

          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 56,
            paddingTop: 32,
            borderTop: "1px solid #E0DBD0"
          }}>
            {adj.prev ? (
              <Link
                to={`/componente/${adj.prev.id}`}
                style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "#6B7280", textDecoration: "none" }}
              >
                <ArrowLeft size={16} />
                {adj.prev.shortName}
              </Link>
            ) : (
              <div />
            )}
            <Link to="/" style={{ fontSize: 14, fontWeight: 500, color: "#B8860B", textDecoration: "underline" }}>
              Volver al Mapa
            </Link>
            {adj.next ? (
              <Link
                to={`/componente/${adj.next.id}`}
                style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "#6B7280", textDecoration: "none" }}
              >
                {adj.next.shortName}
                <ArrowRight size={16} />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
