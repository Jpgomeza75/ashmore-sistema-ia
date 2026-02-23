import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, ExternalLink, CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";

export interface StepContent {
  instruction: string;
  content: React.ReactNode;
}

interface CaseStepperProps {
  breadcrumbLabel: string;
  title: string;
  subtitle: string;
  steps: StepContent[];
}

const CopyPromptButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={copy}
      className="w-full py-2.5 rounded-lg text-base font-sans font-bold transition-colors mt-4 flex items-center justify-center gap-2"
      style={{ backgroundColor: "hsl(29 59% 48%)", color: "white" }}
    >
      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      {copied ? "Copiado" : "Copiar Prompt"}
    </button>
  );
};

export { CopyPromptButton };

const PromptBlock = ({ children }: { children: string }) => (
  <div className="rounded-xl p-5 text-sm font-mono leading-relaxed whitespace-pre-wrap"
    style={{ backgroundColor: "#0d1525", color: "#e2e8f0", border: "1px solid hsl(217 27% 28%)" }}>
    {children}
  </div>
);

export { PromptBlock };

const CaseStepper = ({ breadcrumbLabel, title, subtitle, steps }: CaseStepperProps) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background">
      <Header />
      <main className="flex-1 flex flex-col min-h-0 px-6 lg:px-10 pt-4 pb-16">
        {/* Breadcrumb + Title */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="shrink-0 mb-3"
        >
          <nav className="text-sm font-sans text-muted-foreground mb-1.5 flex items-center gap-1.5">
            <Link to="/" className="hover:text-foreground transition-colors">Mapa del Sistema</Link>
            <span>/</span>
            <Link to="/componente/inteligencia" className="hover:text-foreground transition-colors">Inteligencia de Mercado</Link>
            <span>/</span>
            <Link to="/componente/inteligencia/fase-1" className="hover:text-foreground transition-colors">Nivel 1</Link>
            <span>/</span>
            <span className="text-foreground font-medium">{breadcrumbLabel}</span>
          </nav>
          <h1 className="font-serif text-3xl font-bold text-foreground leading-tight">{title}</h1>
          <p className="text-base font-sans text-muted-foreground">{subtitle}</p>
        </motion.div>

        {/* Stepper */}
        <div className="shrink-0 flex items-center justify-center gap-0 mb-4 py-2">
          {steps.map((_, i) => (
            <div key={i} className="flex items-center">
              <button
                onClick={() => setCurrentStep(i)}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-sans font-bold transition-all duration-200 shrink-0
                  ${i === currentStep
                    ? ""
                    : i < currentStep
                      ? "border-2"
                      : "border-2"
                  }`}
                style={
                  i === currentStep
                    ? { backgroundColor: "hsl(29 59% 48%)", color: "white" }
                    : i < currentStep
                      ? { borderColor: "hsl(29 59% 48%)", backgroundColor: "hsl(29 59% 48% / 0.1)", color: "hsl(29 59% 48%)" }
                      : { borderColor: "hsl(220 20% 88%)", color: "hsl(217 20% 55%)" }
                }
              >
                {i < currentStep ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
              </button>
              {i < steps.length - 1 && (
                <div className="w-8 lg:w-12 h-0.5 mx-0.5"
                  style={{ backgroundColor: i < currentStep ? "hsl(29 59% 48%)" : "hsl(220 20% 88%)" }} />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="flex-1 min-h-0 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                {steps[currentStep].instruction}
              </h2>
              {steps[currentStep].content}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="shrink-0 flex items-center justify-between pt-3 border-t border-border mt-2">
          <button
            disabled={currentStep === 0}
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            className="text-base font-sans font-medium text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            ← Anterior
          </button>
          {currentStep < steps.length - 1 ? (
            <button
              onClick={() => setCurrentStep(currentStep + 1)}
              className="text-base font-sans font-bold px-6 py-2 rounded-lg transition-colors"
              style={{ backgroundColor: "hsl(29 59% 48%)", color: "white" }}
            >
              Siguiente →
            </button>
          ) : (
            <button
              onClick={() => navigate("/componente/inteligencia/fase-1")}
              className="text-base font-sans font-bold px-6 py-2 rounded-lg transition-colors"
              style={{ backgroundColor: "hsl(29 59% 48%)", color: "white" }}
            >
              ← Volver a Nivel 1
            </button>
          )}
        </div>
      </main>
    </div>
  );
};

export default CaseStepper;
