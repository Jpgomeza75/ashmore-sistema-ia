import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SystemMap from "@/components/SystemMap";

const Index = () => {
  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background">
      <Header />
      <main className="flex-1 flex flex-col overflow-hidden px-4 sm:px-6 lg:px-8 py-4">
        {/* Hero — compact */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-4 shrink-0"
        >
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-foreground leading-tight mb-1.5">
            El Sistema Operativo de la{" "}
            <span className="text-gradient-copper">Banca de Inversión</span>
          </h1>
          <p className="text-sm font-sans text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Explora los 9 componentes que definen cómo opera una firma de banca de inversión
            — y descubre cómo la IA puede transformar cada uno.
          </p>
        </motion.div>

        {/* Map — fills remaining space */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex-1 flex items-start justify-center overflow-hidden"
        >
          <SystemMap />
        </motion.div>

        {/* Footer note */}
        <p className="text-center text-[10px] font-sans text-muted-foreground mt-2 italic shrink-0">
          La toma de decisiones y los loops iterativos son capas transversales que atraviesan todos los componentes.
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
