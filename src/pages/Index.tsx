import { motion } from "framer-motion";
import Header from "@/components/Header";
import SystemMap from "@/components/SystemMap";

const Index = () => {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />
      <main className="flex-1 min-h-0 flex flex-col container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4">

        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-3 md:mb-4 shrink-0"
        >
          <h1 className="text-xl md:text-2xl font-serif text-foreground leading-tight">
            Sistema Operativo{" "}
            <span className="text-gradient-copper">· IA</span>
          </h1>
          <p className="text-xs md:text-sm font-sans text-muted-foreground mt-0.5">
            Infraestructura Private Equity — Ciclo completo de inversión
            aumentado con inteligencia artificial
          </p>
        </motion.div>

        <div className="flex-1 min-h-0 flex flex-col">
          <SystemMap />
          <p className="text-center text-[10px] font-sans text-muted-foreground mt-1 italic shrink-0 hidden md:block">
            Las transversales (Entender, Comunicar, Cumplir, Aprender)
            cruzan todas las etapas del ciclo de inversión.
          </p>
        </div>

      </main>
    </div>
  );
};

export default Index;
