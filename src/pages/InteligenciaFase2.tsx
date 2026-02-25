import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Radio, Database, Search, GitMerge, Zap, Brain, Users, BarChart3, Target, Mail, ClipboardList, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";

type MotorId = "radar" | "perfilador" | "competitiva" | "pipeline";

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
    id: "radar",
    name: "Radar de Señales",
    subtitle: "Captura señales de oportunidad antes de que sean obvias",
    icon: <Radio className="w-5 h-5" />,
    standalone: {
      description: "Monitorea fuentes públicas y privadas para detectar señales tempranas de oportunidad transaccional.",
      capabilities: [
        { title: "Alertas por sector y criterio", desc: "Filtra noticias, registros de Supersociedades, movimientos regulatorios y cambios corporativos relevantes para los sectores de BANICOL" },
        { title: "Detección de eventos trigger", desc: "Cambios en juntas directivas, vencimientos de fondos de PE, nuevos entrantes al mercado, cambios de control accionario" },
        { title: "Briefing ejecutivo diario", desc: "Resumen priorizado de señales relevantes entregado cada mañana al equipo" },
      ],
    },
    connected: {
      description: "El radar no solo detecta la señal — sabe qué hacer con ella. Cruza automáticamente con la memoria de la firma y dispara acciones.",
      connections: [
        { icon: <Brain className="w-4 h-4" />, name: "Memoria Corporativa", contribution: "El sistema sabe que BANICOL ya contactó a esta empresa hace 2 años y que el socio X tiene relación con el CEO" },
        { icon: <Mail className="w-4 h-4" />, name: "Desarrollo de Negocio", contribution: "Genera automáticamente un brief de oportunidad y draft de email listo para enviar" },
        { icon: <BarChart3 className="w-4 h-4" />, name: "Análisis y Modelación", contribution: "Adjunta una valoración indicativa basada en comparables del sector" },
      ],
    },
  },
  {
    id: "perfilador",
    name: "Perfilador de Targets",
    subtitle: "Base inteligente de empresas con match automático",
    icon: <Database className="w-5 h-5" />,
    standalone: {
      description: "Base de datos inteligente de empresas que BANICOL ha analizado, contactado o identificado como potenciales targets.",
      capabilities: [
        { title: "Fichas de empresa enriquecidas", desc: "Datos financieros, accionistas, sector, tamaño, historial de acercamientos, notas internas del equipo" },
        { title: "Scoring automático", desc: "Cada empresa tiene un score de \"transaccionabilidad\" basado en criterios definidos por los socios" },
        { title: "Match con señales", desc: "Cuando el Radar detecta algo, el Perfilador identifica automáticamente si hay targets en la base que coinciden" },
      ],
    },
    connected: {
      description: "El perfilador se convierte en la memoria comercial viva de la firma. No pierde ningún target que alguna vez se evaluó.",
      connections: [
        { icon: <Radio className="w-4 h-4" />, name: "Radar de Señales", contribution: "Cada señal nueva se cruza automáticamente contra la base de targets para encontrar matches" },
        { icon: <Brain className="w-4 h-4" />, name: "Memoria Corporativa", contribution: "Integra historial de pitches, propuestas enviadas, reuniones y feedback de cada empresa" },
        { icon: <ClipboardList className="w-4 h-4" />, name: "Ejecución de Mandatos", contribution: "Los targets que avanzan a mandato heredan toda la información del perfil sin re-trabajo" },
      ],
    },
  },
  {
    id: "competitiva",
    name: "Inteligencia Competitiva",
    subtitle: "Quién está mandateado, en qué, y desde cuándo",
    icon: <Search className="w-5 h-5" />,
    standalone: {
      description: "Monitorea la actividad de otras firmas de banca de inversión, fondos de PE y asesores en el mercado colombiano y regional.",
      capabilities: [
        { title: "Tracker de mandatos activos", desc: "Quién está asesorando a quién en qué sector, basado en fuentes públicas, registros y señales de mercado" },
        { title: "Mapa de competidores por sector", desc: "Qué firmas están más activas en energía, salud, infraestructura, tech, y con qué clientes" },
        { title: "Alertas de competencia", desc: "Notificación cuando un competidor aparece vinculado a un target que BANICOL está evaluando" },
      ],
    },
    connected: {
      description: "La inteligencia competitiva se convierte en ventaja estratégica real: no solo sabes qué hace la competencia, sabes cómo moverte antes.",
      connections: [
        { icon: <Mail className="w-4 h-4" />, name: "Desarrollo de Negocio", contribution: "El brief comercial incluye automáticamente quién más podría estar mirando esta oportunidad" },
        { icon: <Database className="w-4 h-4" />, name: "Perfilador de Targets", contribution: "Los targets se enriquecen con información de qué otros asesores los han contactado" },
        { icon: <Users className="w-4 h-4" />, name: "Gestión de Relaciones", contribution: "Identifica relaciones del equipo que podrían dar ventaja sobre la competencia" },
      ],
    },
  },
  {
    id: "pipeline",
    name: "Generador de Pipeline",
    subtitle: "Conecta todo y prioriza oportunidades de negocio",
    icon: <GitMerge className="w-5 h-5" />,
    standalone: {
      description: "Integra señales, targets e inteligencia competitiva para generar un pipeline comercial priorizado y accionable.",
      capabilities: [
        { title: "Pipeline priorizado automático", desc: "Lista de oportunidades rankeadas por probabilidad, tamaño, urgencia y fit con BANICOL" },
        { title: "Recomendaciones de acción", desc: "Para cada oportunidad: qué hacer, quién del equipo debería liderar, y cuál es la ventana de tiempo" },
        { title: "Tablero de seguimiento", desc: "Estado de cada oportunidad desde identificación hasta mandato firmado" },
      ],
    },
    connected: {
      description: "El pipeline deja de ser un Excel que alguien actualiza los viernes. Se convierte en un sistema vivo que refleja la realidad del mercado en tiempo real.",
      connections: [
        { icon: <Zap className="w-4 h-4" />, name: "Los 3 motores anteriores", contribution: "Se alimenta automáticamente del Radar, Perfilador e Inteligencia Competitiva" },
        { icon: <Target className="w-4 h-4" />, name: "Comité de Inversiones", contribution: "Las oportunidades priorizadas alimentan directamente la agenda del comité con toda la información de soporte" },
        { icon: <BarChart3 className="w-4 h-4" />, name: "KPIs y Gestión", contribution: "Métricas de conversión del pipeline alimentan los indicadores de gestión de la firma" },
      ],
    },
  },
];

const InteligenciaFase2 = () => {
  const [selected, setSelected] = useState<MotorId>("radar");
  const motor = motors.find((m) => m.id === selected)!;

  return (
    <div className="min-h-screen md:h-screen flex flex-col md:overflow-hidden bg-background">
      <Header />
      <main className="flex-1 flex flex-col min-h-0 px-4 md:px-6 lg:px-10 pt-4 pb-8 md:pb-16">
        {/* Top Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="shrink-0 mb-4 md:mb-5"
        >
          <nav className="text-xs md:text-sm font-sans text-muted-foreground mb-2 flex items-center gap-1 md:gap-1.5 flex-wrap">
            <Link to="/" className="hover:text-foreground transition-colors">Mapa del Sistema</Link>
            <span>/</span>
            <Link to="/componente/inteligencia" className="hover:text-foreground transition-colors">Inteligencia de Mercado</Link>
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
            Un radar permanente que encuentra oportunidades, las califica y las pone en el escritorio del banquero correcto.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 min-h-0 flex flex-col lg:grid lg:grid-cols-[38%_62%] gap-4 md:gap-6 overflow-y-auto lg:overflow-hidden">
          {/* Motor selector - horizontal scroll tabs on mobile, vertical list on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="shrink-0 lg:flex lg:flex-col lg:min-h-0"
          >
            <h2 className="font-serif text-xl md:text-2xl font-bold text-foreground mb-3">Motores de Inteligencia</h2>
            {/* Mobile: horizontal tabs */}
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
            {/* Desktop: vertical list */}
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

          {/* Right: Motor Detail */}
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

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.4 }}
          className="shrink-0 pt-4 mt-auto"
        >
          <div className="text-center mb-3">
            <p className="text-sm md:text-lg font-sans font-bold text-copper leading-snug">
              Cada motor es valioso por sí solo. Los 4 motores juntos son poderosos. Los 9 componentes del sistema operativo integrados son transformacionales.
            </p>
            <p className="text-xs md:text-sm font-sans text-muted-foreground mt-1">
              La tecnología para construir esto existe hoy. La pregunta es cuándo BANICOL decide dar el paso.
            </p>
          </div>
          <div className="flex justify-center">
            <Link
              to="/componente/inteligencia"
              className="flex items-center gap-2 text-sm font-sans text-muted-foreground hover:text-foreground transition-colors min-h-[44px]"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver a Inteligencia de Mercado
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default InteligenciaFase2;
