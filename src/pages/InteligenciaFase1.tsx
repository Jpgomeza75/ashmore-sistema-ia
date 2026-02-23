import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, Copy, Check } from "lucide-react";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getComponentById } from "@/data/components";

const PromptCard = ({ title, description, prompt }: { title: string; description: string; prompt: string }) => {
  const [copied, setCopied] = useState(false);
  const copyPrompt = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-5 flex flex-col">
      <h4 className="text-base font-sans font-bold text-foreground mb-2">{title}</h4>
      <p className="text-sm font-sans text-muted-foreground leading-relaxed mb-4 flex-1">{description}</p>
      <div className="bg-secondary rounded p-3 mb-4">
        <p className="text-xs font-sans text-foreground/80 leading-relaxed">{prompt}</p>
      </div>
      <button
        onClick={copyPrompt}
        className="flex items-center gap-1.5 text-sm font-sans font-medium text-copper hover:text-copper-light transition-colors self-start"
      >
        {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
        {copied ? "Copiado" : "Copiar prompt"}
      </button>
    </div>
  );
};

const InteligenciaFase1 = () => {
  const component = getComponentById("inteligencia")!;
  const level1 = component.level1!;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs font-sans text-muted-foreground mb-8 flex items-center gap-1.5"
        >
          <Link to="/" className="hover:text-foreground transition-colors">Mapa del Sistema</Link>
          <span>/</span>
          <Link to="/componente/inteligencia" className="hover:text-foreground transition-colors">Inteligencia de Mercado</Link>
          <span>/</span>
          <span className="text-foreground font-medium">Nivel 1</span>
        </motion.nav>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-copper" />
            <span className="text-[10px] font-sans font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm"
              style={{ backgroundColor: "hsl(152 52% 32% / 0.12)", color: "hsl(152 52% 32%)" }}>
              Disponible hoy
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground leading-tight mb-4">
            Nivel 1 — El Analista con Superpoderes
          </h1>
          <p className="text-base font-sans text-muted-foreground leading-relaxed max-w-2xl">
            {level1.intro}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14"
        >
          {level1.cases.map((c, i) => (
            <PromptCard key={i} title={c.title} description={c.description} prompt={c.prompt} />
          ))}
        </motion.div>

        <div className="flex items-center justify-between pt-8 border-t border-border">
          <Link
            to="/componente/inteligencia"
            className="flex items-center gap-2 text-sm font-sans text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a Inteligencia
          </Link>
          <Link
            to="/componente/inteligencia/fase-2"
            className="text-sm font-sans font-medium text-copper hover:underline"
          >
            Nivel 2 — El Sistema →
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default InteligenciaFase1;
