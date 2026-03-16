import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Copy, Check, Sparkles, AlertTriangle, Layers, Link2 } from "lucide-react";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  getComponentById,
  getAdjacentComponents,
  getOutputConnections,
  getInputConnections,
  systemComponents,
} from "@/data/components";

const ComponentPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const component = getComponentById(id || "");

  if (!component) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container max-w-3xl mx-auto px-4 py-20 text-center">
          <h1 className="font-serif text-2xl font-bold text-foreground mb-2">Componente no encontrado</h1>
          <Link to="/" className="text-sm font-sans text-copper hover:underline">Volver al Mapa</Link>
        </div>
      </div>
    );
  }

  const { prev, next } = getAdjacentComponents(component.id);
  const outputs = getOutputConnections(component.id);
  const inputs = getInputConnections(component.id);

  const typeColors: Record<string, string> = {
    JOURNEY: "bg-navy text-cream",
    TRANSVERSAL: "bg-navy-light text-cream",
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs font-sans text-muted-foreground mb-8 flex items-center gap-1.5"
        >
          <Link to="/" className="hover:text-foreground transition-colors">Mapa del Sistema</Link>
          <span>/</span>
          <span className="text-foreground font-medium">{component.name}</span>
        </motion.nav>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <span className={`inline-block text-[10px] font-sans font-bold uppercase tracking-[0.15em] px-2.5 py-1 rounded-sm mb-4 ${typeColors[component.type]}`}>
            {component.type}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground leading-tight mb-4">
            {component.name}
          </h1>
          <p className="text-base font-sans text-muted-foreground leading-relaxed max-w-2xl">
            {component.description}
          </p>
        </motion.div>

        {!component.hasContent ? (
          /* Coming Soon */
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-border rounded-lg p-10 text-center mb-12"
          >
            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
              <Layers className="w-5 h-5 text-muted-foreground" />
            </div>
            <h2 className="font-serif text-xl font-bold text-foreground mb-2">Próximamente</h2>
            <p className="text-sm font-sans text-muted-foreground max-w-md mx-auto leading-relaxed">
              Este módulo se habilitará próximamente como parte del taller.
              Contacta al equipo para más información.
            </p>
          </motion.div>
        ) : (
          <>
            {/* El Problema Hoy */}
            <Section icon={<AlertTriangle className="w-4 h-4" />} title="El Problema Hoy" delay={0.1}>
              <p className="text-sm font-sans text-muted-foreground leading-relaxed">
                {component.problemToday}
              </p>
            </Section>

            {/* Nivel 1 */}
            {component.level1 && (
              <Section icon={<Sparkles className="w-4 h-4" />} title="Nivel 1 — El Analista con Superpoderes" delay={0.2}>
                <p className="text-sm font-sans text-muted-foreground leading-relaxed mb-6">
                  {component.level1.intro}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {component.level1.cases.map((c, i) => (
                    <PromptCard key={i} title={c.title} description={c.description} prompt={c.prompt} />
                  ))}
                </div>
              </Section>
            )}

            {/* Nivel 2 */}
            {component.level2 && (
              <Section icon={<Layers className="w-4 h-4" />} title="Nivel 2 — El Sistema Institucional" delay={0.3} vision>
                <p className="text-sm font-sans text-muted-foreground leading-relaxed mb-6">
                  {component.level2.intro}
                </p>
                <ul className="space-y-3">
                  {component.level2.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm font-sans text-muted-foreground">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-copper shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </Section>
            )}
          </>
        )}

        {/* Conexiones */}
        <Section icon={<Link2 className="w-4 h-4" />} title="Conexiones en el Ecosistema" delay={0.35}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h4 className="text-xs font-sans font-bold uppercase tracking-wide text-foreground mb-3">Entradas</h4>
              <ul className="space-y-2">
                {inputs.map((conn, i) => {
                  const source = getComponentById(conn.from);
                  return (
                    <li key={i} className="text-xs font-sans text-muted-foreground">
                      <span className="font-semibold text-foreground">{source?.shortName}</span> — {conn.label}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-sans font-bold uppercase tracking-wide text-copper mb-3">Salidas</h4>
              <ul className="space-y-2">
                {outputs.map((conn, i) => {
                  const target = getComponentById(conn.to);
                  return (
                    <li key={i} className="text-xs font-sans text-muted-foreground">
                      <span className="font-semibold text-foreground">{target?.shortName}</span> — {conn.label}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          {/* Mini map */}
          <div className="mt-6 flex flex-wrap gap-2 justify-center">
            {systemComponents.map(sc => {
              const isThis = sc.id === component.id;
              const isConnected = [...inputs.map(c => c.from), ...outputs.map(c => c.to)].includes(sc.id);
              return (
                <Link
                  key={sc.id}
                  to={`/componente/${sc.id}`}
                  className={`text-[10px] font-sans px-2.5 py-1 rounded-sm border transition-all ${
                    isThis
                      ? "bg-navy text-cream border-copper font-bold"
                      : isConnected
                        ? "bg-secondary text-foreground border-border hover:border-copper"
                        : "bg-background text-muted-foreground border-border opacity-40"
                  }`}
                >
                  {sc.shortName}
                </Link>
              );
            })}
          </div>
        </Section>

        {/* Footer Nav */}
        <div className="flex items-center justify-between mt-14 pt-8 border-t border-border">
          {prev ? (
            <Link
              to={`/componente/${prev.id}`}
              className="flex items-center gap-2 text-sm font-sans text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {prev.shortName}
            </Link>
          ) : <div />}
          <Link
            to="/"
            className="text-sm font-sans font-medium text-copper hover:underline"
          >
            Volver al Mapa
          </Link>
          {next ? (
            <Link
              to={`/componente/${next.id}`}
              className="flex items-center gap-2 text-sm font-sans text-muted-foreground hover:text-foreground transition-colors"
            >
              {next.shortName}
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : <div />}
        </div>
      </main>
      <Footer />
    </div>
  );
};

/* Section wrapper */
const Section = ({
  icon,
  title,
  children,
  delay = 0,
  vision = false,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  delay?: number;
  vision?: boolean;
}) => (
  <motion.section
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.4 }}
    className="mb-10"
  >
    <div className="flex items-center gap-2.5 mb-4">
      <span className="text-copper">{icon}</span>
      <h2 className="font-serif text-lg font-bold text-foreground">{title}</h2>
      {vision && (
        <span className="text-[9px] font-sans font-bold uppercase tracking-wider bg-copper/10 text-copper px-2 py-0.5 rounded-sm">
          Visión 2.0
        </span>
      )}
    </div>
    {children}
  </motion.section>
);

/* Prompt Card */
const PromptCard = ({ title, description, prompt }: { title: string; description: string; prompt: string }) => {
  const [copied, setCopied] = useState(false);

  const copyPrompt = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 flex flex-col">
      <h4 className="text-sm font-sans font-bold text-foreground mb-1.5">{title}</h4>
      <p className="text-xs font-sans text-muted-foreground leading-relaxed mb-3 flex-1">{description}</p>
      <div className="bg-secondary rounded p-3 mb-3">
        <p className="text-[11px] font-sans text-foreground/80 leading-relaxed line-clamp-4">{prompt}</p>
      </div>
      <button
        onClick={copyPrompt}
        className="flex items-center gap-1.5 text-xs font-sans font-medium text-copper hover:text-copper-light transition-colors self-start"
      >
        {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
        {copied ? "Copiado" : "Copiar prompt"}
      </button>
    </div>
  );
};

export default ComponentPage;
