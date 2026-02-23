import CaseStepper, { CopyPromptButton, PromptBlock, type StepContent } from "@/components/CaseStepper";
import { ExternalLink } from "lucide-react";

const prompt3 = `Actúa como VP senior de banca de inversión en BANICOL, firma boutique colombiana con 100+ transacciones y USD 2.5B+ en M&A. Sectores foco: energía, infraestructura, servicios financieros, salud, tecnología.

Acabo de leer esta noticia: GeoPark adquirió los activos upstream de Frontera Energy en Colombia por ~USD 600M. GeoPark se convierte en el mayor productor privado de petróleo en Colombia (68K → 90K bpd objetivo 2028). Frontera retiene infraestructura (Oleoducto de los Llanos + Puerto Bahía) y planea spin-off de activos de infraestructura.

Genera un BRIEF DE OPORTUNIDAD COMERCIAL completo con:

1. ANÁLISIS DE LA SEÑAL: Qué pasó, por qué importa, qué cambia en el mercado colombiano de energía
2. OPORTUNIDADES DERIVADAS: Mínimo 4 oportunidades de negocio para BANICOL derivadas de esta transacción
3. TARGET PRIORITARIO: La oportunidad más atractiva y por qué
4. CONTEXTO COMPETITIVO: Qué otros bancos podrían estar mirando estas oportunidades
5. VALORACIÓN INDICATIVA: Rango de valoración del target prioritario con metodología y comparables
6. DRAFT DE EMAIL: Email profesional para el decisor del target prioritario proponiendo una conversación
7. PLAN DE ACCIÓN 72 HORAS: Qué hacer esta semana para capitalizar antes que la competencia

Usa búsqueda web para datos reales. Sé específico con nombres, personas y cifras.`;

const prompt5 = `Convierte el brief de oportunidad en un artifact HTML interactivo con:

- Banner con la señal de mercado y datos clave de la transacción
- Cards expandibles para cada oportunidad derivada con tabs: análisis, valoración con barras visuales, competencia en tabla, notas editables
- Plan de acción de 72 horas con checkboxes clickeables
- Panel de decisores
- Sección de email draft colapsable y copiable
- Diseño profesional, tema oscuro navy con acentos copper

Un solo archivo HTML autocontenido.`;

const prompt7 = `Convierte el brief de oportunidad en un documento Word profesional (.docx) con:

- Portada con título "Brief de Oportunidad — GeoPark / Frontera Energy" y branding BANICOL
- Resumen ejecutivo con la señal de mercado
- Análisis de cada oportunidad derivada
- Valoración indicativa del target prioritario
- Contexto competitivo
- Draft de email para el decisor
- Plan de acción de 72 horas
- Recomendación y próximos pasos

Formato profesional, tipografía limpia, colores sobrios.`;

const steps: StepContent[] = [
  {
    instruction: "El punto de partida: una noticia reciente de mercado",
    content: (
      <div>
        <div className="bg-card border border-border rounded-xl p-6 mb-5">
          <h3 className="font-serif text-xl font-bold text-foreground mb-3">
            GeoPark adquiere activos upstream de Frontera Energy — Enero 2026
          </h3>
          <div className="space-y-2.5 text-base font-sans text-muted-foreground leading-relaxed">
            <p>Valor: ~USD 600M enterprise value</p>
            <p>GeoPark se convierte en el mayor productor privado de petróleo en Colombia (68K → 90K bpd objetivo 2028)</p>
            <p>Frontera retiene infraestructura: Oleoducto de los Llanos + Puerto Bahía</p>
            <p>Frontera planea spin-off de activos de infraestructura</p>
          </div>
        </div>
        <p className="text-lg font-sans font-bold text-foreground">
          Pregunta clave: ¿Qué oportunidades de negocio genera esta transacción para BANICOL?
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
    instruction: "Copia este prompt para generar el brief de oportunidad",
    content: (
      <div>
        <p className="text-base font-sans text-muted-foreground mb-4 leading-relaxed">
          Este prompt genera un brief comercial completo: análisis de la señal, oportunidades derivadas, valoración, email y plan de acción.
        </p>
        <PromptBlock>{prompt3}</PromptBlock>
        <CopyPromptButton text={prompt3} />
      </div>
    ),
  },
  {
    instruction: "Lee el resultado con ojo crítico",
    content: (
      <div>
        <p className="text-base font-sans text-muted-foreground mb-5 leading-relaxed">
          Revisa cada sección del brief. El valor está en la velocidad — tu criterio valida la calidad.
        </p>
        <div className="space-y-3 mb-5">
          {[
            "¿Las oportunidades derivadas son realmente consecuencia de esta transacción?",
            "¿El target prioritario tiene sentido para el perfil de BANICOL?",
            "¿El email tiene el tono correcto? ¿Lo enviarías tal cual?",
            "¿El plan de 72 horas es realista y accionable?",
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
          Convierte el brief en una herramienta visual interactiva. Copia este prompt:
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
          Claude generará un artifact directamente en la conversación. Haz click en "pantalla completa" para verlo mejor.
        </p>
        <div className="bg-card border border-border rounded-lg p-5 text-center">
          <p className="text-base font-sans text-muted-foreground">
            Ejemplo disponible próximamente
          </p>
        </div>
      </div>
    ),
  },
  {
    instruction: "Exporta el brief a un documento profesional",
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
    instruction: "Tienes un brief comercial completo. ¿Ahora qué?",
    content: (
      <div>
        <p className="text-base font-sans text-muted-foreground mb-5 leading-relaxed">
          En 10 minutos pasaste de leer una noticia a tener un brief comercial con oportunidades, valoración, email y plan de acción.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[
            "Envía el email al decisor del target prioritario",
            "Agenda reuniones internas para validar las oportunidades",
            "Activa el plan de 72 horas antes de que otro banco se adelante",
          ].map((action, i) => (
            <div key={i} className="bg-card border border-border rounded-lg p-4">
              <p className="text-sm font-sans text-foreground leading-relaxed">{action}</p>
            </div>
          ))}
        </div>
        <p className="text-xl font-sans font-bold text-copper text-center">
          Esto es Nivel 1. Imagina un sistema que haga esto automáticamente cada vez que sale una noticia relevante. Eso es Nivel 2.
        </p>
      </div>
    ),
  },
];

const PrePitchCase = () => (
  <CaseStepper
    breadcrumbLabel="Pre-Pitch"
    title="Caso: GeoPark / Frontera Energy"
    subtitle="Sigue los pasos para generar un brief comercial completo en 10 minutos"
    steps={steps}
  />
);

export default PrePitchCase;
