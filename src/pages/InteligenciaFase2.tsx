import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Layers } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getComponentById } from "@/data/components";

const InteligenciaFase2 = () => {
  const component = getComponentById("inteligencia")!;
  const level2 = component.level2!;

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
          <span className="text-foreground font-medium">Nivel 2</span>
        </motion.nav>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          <div className="flex items-center gap-2 mb-3">
            <Layers className="w-5 h-5 text-copper" />
            <span className="text-[10px] font-sans font-bold uppercase tracking-wider bg-copper/10 text-copper px-2 py-0.5 rounded-sm">
              Visión 2.0
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground leading-tight mb-4">
            Nivel 2 — El Sistema Institucional
          </h1>
          <p className="text-base font-sans text-muted-foreground leading-relaxed max-w-2xl">
            {level2.intro}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="bg-card border border-border rounded-lg p-8 mb-14"
        >
          <h2 className="font-serif text-xl font-bold text-foreground mb-6">Capacidades del Sistema</h2>
          <ul className="space-y-4">
            {level2.features.map((f, i) => (
              <li key={i} className="flex items-start gap-3 text-sm font-sans text-muted-foreground leading-relaxed">
                <span className="mt-1.5 w-2 h-2 rounded-full bg-copper shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </motion.div>

        <div className="flex items-center justify-between pt-8 border-t border-border">
          <Link
            to="/componente/inteligencia/fase-1"
            className="flex items-center gap-2 text-sm font-sans text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Nivel 1 — El Analista
          </Link>
          <Link
            to="/componente/inteligencia"
            className="text-sm font-sans font-medium text-copper hover:underline"
          >
            Volver a Inteligencia
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default InteligenciaFase2;
