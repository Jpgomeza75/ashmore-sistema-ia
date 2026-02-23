import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SystemMap from "@/components/SystemMap";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4">
            El Sistema Operativo de la{" "}
            <span className="text-gradient-copper">Banca de Inversión</span>
          </h1>
          <p className="text-base sm:text-lg font-sans text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Explora los 9 componentes que definen cómo opera una firma de banca de inversión
            — y descubre cómo la IA puede transformar cada uno.
          </p>
        </motion.div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <SystemMap />
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-xs font-sans text-muted-foreground mt-12 max-w-lg mx-auto italic"
        >
          La toma de decisiones y los loops iterativos son capas transversales que atraviesan todos los componentes.
        </motion.p>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
