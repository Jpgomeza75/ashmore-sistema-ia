import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { BookOpen, TrendingUp, ShieldCheck, FileOutput, Zap, Brain, Radio, BarChart3, ClipboardList, Mail, Users, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";

type MotorId = "biblioteca" | "comparables" | "qa" | "entregables";

interface Capability {
  title: string;
  desc: string;
}

interface Connection {
  icon: React.ReactNode;
  name: string;
  contribution: string;
}

interface Motor {
  id: MotorId;
  name: string;
  subtitle: string;
  icon: React.ReactNode;
  standalone: {
    description: string;
    capabilities: Capability[];
  };
  connected: {
    description: string;
    connections: Connection[];
  };
}

const motors: Motor[] = [
  {
    id: "biblioteca",
    name: "Biblioteca de Modelos",
    subtitle: "Templates sectoriales que mejoran con cada deal cerrado",
    icon: <BookOpen className="w-5 h-5" />,
    standalone: {
      description: "Repositorio inteligente de modelos financieros organizados por sector, tipo de transacción y fecha, con búsqueda semántica.",
      capabilities: [
        { title: "Templates por sector y tipo", desc: "DCF para energía, LBO para salud, comparables para tech. Cada uno con las mejores prácticas de la firma" },
        { title: "Evolución automática", desc: "Cuando se cierra un deal, el modelo ganador se incorpora al template del sector" },
        { title: "Búsqueda inteligente", desc: "\"Muéstrame el modelo más reciente de valoración en infraestructura\" y lo encuentras en segundos" },
      ],
    },
    connected: {
      description: "La biblioteca se convierte en la memoria analítica viva de la firma. Cada modelo nuevo hereda el conocimiento de todos los anteriores.",
      connections: [
        { icon: <Brain className="w-4 h-4" />, name: "Memoria Corporativa", contribution: "Los modelos se vinculan con las lecciones aprendidas de cada transacción: qué assumptions fallaron, qué ajustes se hicieron post-cierre" },
        { icon: <Radio className="w-4 h-4" />, name: "Inteligencia de Mercado", contribution: "Los templates se actualizan automáticamente con nuevos comparables detectados por el radar de señales" },
        { icon: <BarChart3 className="w-4 h-4" />, name: "KPIs y Gestión", contribution: "Métricas de uso: qué templates se usan más, cuáles necesitan actualización, precisión histórica de las valoraciones" },
      ],
    },
  },
  {
    id: "comparables",
    name: "Comparables Vivos",
    subtitle: "Múltiplos y métricas actualizados automáticamente",
    icon: <TrendingUp className="w-5 h-5" />,
    standalone: {
      description: "Base de múltiplos y métricas de transacciones que se actualiza automáticamente con datos de mercado y transacciones cerradas.",
      capabilities: [
        { title: "Múltiplos siempre frescos", desc: "EV/EBITDA, P/E, EV/Revenue por sector y geografía, actualizados con datos públicos" },
        { title: "Transacciones precedentes", desc: "Cada deal que BANICOL cierra o monitorea se agrega a la base con todos los términos" },
        { title: "Ajustes automáticos", desc: "Los comparables se ajustan por tamaño, geografía, momento del ciclo y control premium" },
      ],
    },
    connected: {
      description: "Los comparables dejan de ser una foto estática. Se convierten en un flujo vivo que alimenta cada análisis con data propietaria.",
      connections: [
        { icon: <Radio className="w-4 h-4" />, name: "Radar de Señales", contribution: "Cada transacción detectada por el radar se agrega automáticamente a la base de comparables" },
        { icon: <ClipboardList className="w-4 h-4" />, name: "Ejecución de Mandatos", contribution: "Los términos reales de deals cerrados (no solo los públicos) enriquecen la base con data propietaria" },
        { icon: <BookOpen className="w-4 h-4" />, name: "Biblioteca de Modelos", contribution: "Los templates de valoración se alimentan directamente de los comparables más recientes" },
      ],
    },
  },
  {
    id: "qa",
    name: "QA Automático",
    subtitle: "Auditoría estandarizada antes de que cualquier modelo salga de la firma",
    icon: <ShieldCheck className="w-5 h-5" />,
    standalone: {
      description: "Cada modelo financiero pasa por una auditoría estandarizada automática antes de convertirse en entregable.",
      capabilities: [
        { title: "Checklist automático", desc: "Verifica estructura, consistencia de fórmulas, balance entre estados financieros, razonabilidad de assumptions" },
        { title: "Estándares de la firma", desc: "Las reglas de auditoría reflejan las mejores prácticas de BANICOL, no un checklist genérico" },
        { title: "Certificación interna", desc: "El modelo sale con un stamp de \"auditado\" que da confianza al socio y al cliente" },
      ],
    },
    connected: {
      description: "El QA se convierte en un sistema de mejora continua que aprende de cada error y eleva la calidad de toda la firma.",
      connections: [
        { icon: <BookOpen className="w-4 h-4" />, name: "Biblioteca de Modelos", contribution: "Los errores recurrentes detectados en QA retroalimentan los templates para prevenir que se repitan" },
        { icon: <BarChart3 className="w-4 h-4" />, name: "KPIs y Gestión", contribution: "Métricas de calidad: tasa de errores por analista, tipos de error más comunes, mejora en el tiempo" },
        { icon: <Brain className="w-4 h-4" />, name: "Memoria Corporativa", contribution: "El historial de auditorías de cada modelo queda documentado: quién lo hizo, cuándo, qué se encontró" },
      ],
    },
  },
  {
    id: "entregables",
    name: "Generador de Entregables",
    subtitle: "Del modelo terminado al deck, teaser o IM en minutos",
    icon: <FileOutput className="w-5 h-5" />,
    standalone: {
      description: "Convierte modelos financieros terminados en entregables profesionales: presentaciones, teasers, information memorandums.",
      capabilities: [
        { title: "Presentación ejecutiva automática", desc: "Del modelo al deck de 10-15 slides con la estructura estándar de BANICOL" },
        { title: "Teasers y perfiles", desc: "Genera one-pagers y teasers de empresa a partir de los datos del modelo" },
        { title: "Information Memorandums", desc: "Estructura las secciones clave del IM a partir del análisis financiero" },
      ],
    },
    connected: {
      description: "Los entregables dejan de ser artesanales. Se generan con estándares consistentes y se personalizan según el destinatario.",
      connections: [
        { icon: <Mail className="w-4 h-4" />, name: "Desarrollo de Negocio", contribution: "Los teasers y decks generados alimentan directamente el pipeline comercial con material listo para enviar" },
        { icon: <Users className="w-4 h-4" />, name: "Gestión de Relaciones", contribution: "Los entregables se personalizan automáticamente según el perfil del destinatario: fondo de PE, estratégico, family office" },
        { icon: <BookOpen className="w-4 h-4" />, name: "Biblioteca de Modelos", contribution: "Los formatos de entregables se estandarizan y mejoran con cada iteración" },
      ],
    },
  },
];

const AnalisisFase2 = () => {
  const [selected, setSelected] = useState<MotorId>("biblioteca");
  const motor = motors.find((m) => m.id === selected)!;

  return (
    <div className="min-h-screen md:h-screen flex flex-col md:overflow-hidden bg-background">
      <Header />
      <main className="flex-1 flex flex-col min-h-0 px-4 md:px-6 lg:px-10 pt-4 pb-8 md:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="shrink-0 mb-4 md:mb-5"
        >
          <nav className="text-xs md:text-sm font-sans text-muted-foreground mb-2 flex items-center gap-1 md:gap-1.5 flex-wrap">
            <Link to="/" className="hover:text-foreground transition-colors">Mapa del Sistema</Link>
            <span>/</span>
            <Link to="/componente/analisis" className="hover:text-foreground transition-colors">Análisis y Modelación</Link>
            <span>/</span>
            <span className="text-foreground font-medium">Nivel 2</span>
          </nav>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[13px] font-sans font-bold uppercase tracking-[0.15em] px-2.5 py-1 rounded-sm"
              style={{ backgroundColor: "hsl(29 59% 48% / 0.18)", color: "hsl(29 59% 58%)" }}>
              Visión 2.0
            </span>
          </div>
          <h1 className="font-serif text-2xl md:text-4xl font-bold text-foreground leading-tight mb-1">
            El Sistema Institucional
          </h1>
          <p className="text-sm md:text-lg font-sans text-muted-foreground max-w-4xl">
            Cada modelo que la firma construye deja conocimiento. Hoy se pierde. Mañana alimenta al siguiente.
          </p>
        </motion.div>

        <div className="flex-1 min-h-0 flex flex-col lg:grid lg:grid-cols-[38%_62%] gap-4 md:gap-6 overflow-y-auto lg:overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="shrink-0 lg:flex lg:flex-col lg:min-h-0"
          >
            <h2 className="font-serif text-xl md:text-2xl font-bold text-foreground mb-3">Motores de Análisis</h2>
            <div className="flex lg:hidden gap-2 overflow-x-auto -mx-4 px-4 pb-2">
              {motors.map((m) => {
                const isSelected = selected === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => setSelected(m.id)}
                    className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-left transition-all duration-200 shrink-0 whitespace-nowrap
                      ${isSelected ? "border-copper shadow-node" : "border-border bg-card"}`}
                    style={isSelected ? { backgroundColor: "hsl(29 59% 48% / 0.06)", borderColor: "hsl(29 59% 48%)" } : {}}
                  >
                    <span className="text-copper">{m.icon}</span>
                    <span className={`text-[13px] font-sans font-bold ${isSelected ? "text-copper" : "text-foreground"}`}>
                      {m.name}
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="hidden lg:flex lg:flex-col space-y-2.5 flex-1">
              {motors.map((m) => {
                const isSelected = selected === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => setSelected(m.id)}
                    className={`w-full flex items-center gap-3.5 rounded-lg border px-4 py-3 text-left transition-all duration-200
                      ${isSelected
                        ? "border-copper shadow-node"
                        : "border-border bg-card hover:border-copper/50 hover:shadow-node"
                      }`}
                    style={isSelected ? { backgroundColor: "hsl(29 59% 48% / 0.06)", borderColor: "hsl(29 59% 48%)" } : {}}
                  >
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: isSelected ? "hsl(29 59% 48% / 0.15)" : "hsl(29 59% 48% / 0.08)" }}>
                      <span className="text-copper">{m.icon}</span>
                    </div>
                    <div className="min-w-0">
                      <span className={`text-[17px] font-sans font-bold block leading-tight ${isSelected ? "text-copper" : "text-foreground"}`}>
                        {m.name}
                      </span>
                      <span className="text-sm font-sans text-muted-foreground leading-snug">{m.subtitle}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selected}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col min-h-0 lg:overflow-y-auto pr-0 lg:pr-1"
            >
              <div className="mb-4">
                <span className="inline-block text-[11px] font-sans font-bold uppercase tracking-[0.15em] px-2 py-0.5 rounded-sm mb-2"
                  style={{ backgroundColor: "hsl(152 52% 32% / 0.12)", color: "hsl(152 52% 32%)" }}>
                  Por sí solo
                </span>
                <h3 className="font-serif text-xl md:text-2xl font-bold text-foreground mb-1">{motor.name}</h3>
                <p className="text-sm md:text-base font-sans text-muted-foreground leading-relaxed mb-4">{motor.standalone.description}</p>
                <div className="space-y-3">
                  {motor.standalone.capabilities.map((cap, i) => (
                    <div key={i}>
                      <span className="text-[14px] md:text-[15px] font-sans font-bold text-copper">{cap.title}</span>
                      <p className="text-[13px] md:text-sm font-sans text-muted-foreground leading-snug mt-0.5">{cap.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 my-3">
                <div className="flex-1 h-px bg-border" />
                <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "hsl(29 59% 48% / 0.12)" }}>
                  <Zap className="w-4 h-4 text-copper" />
                </div>
                <div className="flex-1 h-px bg-border" />
              </div>

              <div className="rounded-lg border p-4 md:p-5"
                style={{ borderColor: "hsl(29 59% 48% / 0.25)", backgroundColor: "hsl(29 59% 48% / 0.03)" }}>
                <span className="inline-block text-[11px] font-sans font-bold uppercase tracking-[0.15em] px-2 py-0.5 rounded-sm mb-2"
                  style={{ backgroundColor: "hsl(29 59% 48% / 0.15)", color: "hsl(29 59% 48%)" }}>
                  Conectado al ecosistema
                </span>
                <h3 className="font-serif text-lg md:text-xl font-bold text-copper mb-1">Con el sistema completo</h3>
                <p className="text-sm md:text-base font-sans text-muted-foreground leading-relaxed mb-4">{motor.connected.description}</p>
                <div className="space-y-2.5">
                  {motor.connected.connections.map((conn, i) => (
                    <div key={i} className="flex items-start gap-3 rounded-lg border border-border bg-card px-3 md:px-4 py-3">
                      <div className="w-7 h-7 rounded-md flex items-center justify-center shrink-0 mt-0.5"
                        style={{ backgroundColor: "hsl(29 59% 48% / 0.1)" }}>
                        <span className="text-copper">{conn.icon}</span>
                      </div>
                      <div className="min-w-0">
                        <span className="text-sm font-sans font-bold text-foreground">{conn.name}</span>
                        <p className="text-xs font-sans text-muted-foreground leading-snug mt-0.5">{conn.contribution}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.4 }}
          className="shrink-0 pt-4 mt-auto"
        >
          <div className="text-center mb-3">
            <p className="text-sm md:text-lg font-sans font-bold text-copper leading-snug">
              Cada modelo que se construye hoy en BANICOL es conocimiento que se pierde mañana. Este sistema lo captura, lo organiza y lo convierte en ventaja acumulativa.
            </p>
            <p className="text-xs md:text-sm font-sans text-muted-foreground mt-1">
              La firma que aprende de cada transacción no compite en igualdad de condiciones. Compite con ventaja.
            </p>
          </div>
          <div className="flex justify-center">
            <Link
              to="/componente/analisis"
              className="flex items-center gap-2 text-sm font-sans text-muted-foreground hover:text-foreground transition-colors min-h-[44px]"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver a Análisis y Modelación
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default AnalisisFase2;
