import CaseStepper, { CopyPromptButton, PromptBlock, type StepContent } from "@/components/CaseStepper";
import { ExternalLink } from "lucide-react";

const prompt3 = `Actúa como analista senior de M&A en una firma de banca de inversión boutique en Colombia con más de 100 transacciones cerradas.

Tu tarea: hacer ingeniería reversa de la transacción Avidanti → Patria Investments.

1. INVESTIGA la transacción: Patria Investments (fondo brasileño) adquirió Avidanti (operador hospitalario colombiano) en 2020 y construyó la plataforma Zentria.

2. ANALIZA el perfil de Avidanti como target: qué la hacía atractiva, tamaño, sector, fragmentación del mercado, tipo de accionistas, potencial de consolidación.

3. ANALIZA la motivación de Patria como comprador: tesis de inversión, estrategia de buy-and-build, contexto del sector salud en Colombia.

4. EXTRAE un patrón transaccional: lista de 8-10 características que definen "una empresa con perfil similar a Avidanti" en cualquier sector.

5. APLICA ese patrón al mercado colombiano actual: identifica 5 empresas o sectores que hoy cumplen esas características y podrían ser candidatos a una transacción similar.

Para cada oportunidad incluye: nombre del sector/empresa, por qué coincide con el patrón, tamaño estimado de transacción, tipo de comprador probable, y urgencia (alta/media/baja).

Usa búsqueda web para obtener datos reales y actualizados.`;

const prompt5 = `Toma todo el análisis que acabas de hacer y conviértelo en un artifact HTML interactivo con:

- Dashboard con el deal de referencia y KPIs principales arriba
- Grilla del patrón transaccional (las 10 características) que se iluminen según la oportunidad seleccionada
- Lista de oportunidades en panel izquierdo con probabilidad y urgencia
- Panel derecho con detalle de cada oportunidad: análisis, compradores, señales a monitorear, comparables, y notas editables
- Diseño profesional, tema oscuro, tipografía limpia

Un solo archivo HTML autocontenido.`;

const prompt7 = `Convierte el análisis del Deal Spotter en un documento Word profesional (.docx) con:

- Portada con título "Deal Spotter — Ingeniería Reversa" y branding BANICOL
- Resumen ejecutivo con KPIs principales
- Ingeniería reversa (perfil del target, motivación del comprador, timing)
- Patrón transaccional (las 10 características)
- Tabla resumen de oportunidades
- Detalle de cada oportunidad con análisis, compradores y comparables
- Recomendación y próximos pasos

Formato profesional, tipografía limpia, colores sobrios.`;

const steps: StepContent[] = [
  {
    instruction: "El punto de partida: una transacción que BANICOL conoce bien",
    content: (
      <div>
        <div className="bg-card border border-border rounded-xl p-6 mb-5">
          <h3 className="font-serif text-xl font-bold text-foreground mb-3">Avidanti → Patria Investments (2020)</h3>
          <div className="space-y-2.5 text-base font-sans text-muted-foreground leading-relaxed">
            <p>Patria (fondo brasileño, USD 14,000M AUM) adquirió Avidanti, un operador hospitalario colombiano, como plataforma de consolidación en el sector salud.</p>
            <p>En 6 años construyó Zentria: 25 hospitales, 106 centros médicos, 2,700 camas, USD 420M+ invertidos.</p>
            <p>En 2025 compró Banmédica en Chile por ~USD 1,000M con la misma tesis.</p>
          </div>
        </div>
        <p className="text-lg font-sans font-bold text-foreground">
          Pregunta clave: ¿Qué otros sectores en Colombia tienen hoy las mismas condiciones que tenía salud cuando Patria entró?
        </p>
      </div>
    ),
  },
  {
    instruction: "Abre claude.ai en tu navegador",
    content: (
      <div>
        <p className="text-base font-sans text-muted-foreground mb-5 leading-relaxed">
          Ve a claude.ai e inicia sesión. Si no tienes cuenta, créala gratis con tu email.
        </p>
        <a
          href="https://claude.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-lg font-sans font-bold transition-colors"
          style={{ backgroundColor: "hsl(29 59% 48%)", color: "white" }}
        >
          Abrir Claude <ExternalLink className="w-5 h-5" />
        </a>
        <p className="text-sm font-sans text-muted-foreground mt-4 italic">
          También funciona con ChatGPT o Gemini, pero los prompts están optimizados para Claude.
        </p>
      </div>
    ),
  },
  {
    instruction: "Copia este prompt y pégalo en Claude",
    content: (
      <div>
        <p className="text-base font-sans text-muted-foreground mb-4 leading-relaxed">
          Este prompt hace la ingeniería reversa: analiza el target, el comprador, el contexto, extrae el patrón, y busca oportunidades similares.
        </p>
        <PromptBlock>{prompt3}</PromptBlock>
        <CopyPromptButton text={prompt3} />
      </div>
    ),
  },
  {
    instruction: "Lee el análisis con ojo crítico",
    content: (
      <div>
        <p className="text-base font-sans text-muted-foreground mb-5 leading-relaxed">
          Claude generará el análisis en 30-60 segundos. No lo tomes como verdad absoluta — el valor está en la velocidad y amplitud, pero el criterio final es tuyo.
        </p>
        <div className="space-y-3 mb-5">
          {[
            "¿El patrón transaccional tiene sentido con tu experiencia?",
            "¿Las oportunidades identificadas son reales y relevantes?",
            "¿Cuáles ya conocías y cuáles son nuevas?",
            "¿Hay alguna que descartarías o agregarías?",
          ].map((q, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <span className="text-copper mt-0.5">✓</span>
              <span className="text-base font-sans text-foreground">{q}</span>
            </div>
          ))}
        </div>
        <div className="rounded-lg p-4 border" style={{ backgroundColor: "hsl(29 59% 48% / 0.06)", borderColor: "hsl(29 59% 48% / 0.2)" }}>
          <p className="text-sm font-sans text-foreground leading-relaxed">
            Si algo no te convence, pídele a Claude que profundice, corrija o explore otra dirección. Es una conversación.
          </p>
        </div>
      </div>
    ),
  },
  {
    instruction: "Pide el dashboard visual interactivo",
    content: (
      <div>
        <p className="text-base font-sans text-muted-foreground mb-4 leading-relaxed">
          Ahora convierte el análisis en una herramienta visual. Copia este segundo prompt:
        </p>
        <PromptBlock>{prompt5}</PromptBlock>
        <CopyPromptButton text={prompt5} />
      </div>
    ),
  },
  {
    instruction: "Abre y explora el resultado interactivo",
    content: (
      <div>
        <p className="text-base font-sans text-muted-foreground mb-5 leading-relaxed">
          Claude generará un artifact directamente en la conversación. Haz click en "pantalla completa" para verlo mejor. Aquí puedes ver un ejemplo real:
        </p>
        <a
          href="https://claude.ai/public/artifacts/bf2ead7c-e273-46e9-9e64-996bf4060cd1"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-lg font-sans font-bold transition-colors"
          style={{ backgroundColor: "hsl(29 59% 48%)", color: "white" }}
        >
          Ver Ejemplo de Dashboard <ExternalLink className="w-5 h-5" />
        </a>
        <p className="text-sm font-sans text-muted-foreground mt-4 italic">
          Este es un ejemplo generado con el prompt anterior. Tu resultado puede variar ligeramente.
        </p>
      </div>
    ),
  },
  {
    instruction: "Exporta el análisis a un documento profesional",
    content: (
      <div>
        <p className="text-base font-sans text-muted-foreground mb-4 leading-relaxed">
          Para compartir con el equipo o archivar, pide un .docx descargable:
        </p>
        <PromptBlock>{prompt7}</PromptBlock>
        <CopyPromptButton text={prompt7} />
        <p className="text-sm font-sans text-muted-foreground mt-4 italic">
          Claude genera el .docx que puedes descargar directamente.
        </p>
      </div>
    ),
  },
  {
    instruction: "Tienes un análisis completo. ¿Ahora qué?",
    content: (
      <div>
        <p className="text-base font-sans text-muted-foreground mb-5 leading-relaxed">
          En menos de 15 minutos generaste: un análisis de ingeniería reversa, un patrón transaccional, 5 oportunidades, un dashboard interactivo y un documento Word.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[
            "Comparte el Word con tu equipo para validar las oportunidades",
            "Agenda una sesión para discutir las 2-3 más prometedoras",
            "Repite el ejercicio con otros deals cerrados de BANICOL",
          ].map((action, i) => (
            <div key={i} className="bg-card border border-border rounded-lg p-4">
              <p className="text-sm font-sans text-foreground leading-relaxed">{action}</p>
            </div>
          ))}
        </div>
        <p className="text-xl font-sans font-bold text-copper text-center">
          Esto es Nivel 1. Imagina esto corriendo permanentemente. Eso es Nivel 2.
        </p>
      </div>
    ),
  },
];

const DealSpotterCase = () => (
  <CaseStepper
    breadcrumbLabel="Deal Spotter"
    title="Caso: Avidanti → Patria Investments"
    subtitle="Sigue los pasos para replicar este ejercicio de ingeniería reversa"
    steps={steps}
  />
);

export default DealSpotterCase;
