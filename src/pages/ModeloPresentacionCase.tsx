import CaseStepper, { CopyPromptButton, PromptBlock, type StepContent } from "@/components/CaseStepper";
import { ExternalLink } from "lucide-react";

const promptExtraccion = `Necesito extraer los datos clave de este modelo para generar una presentación ejecutiva. Haz lo siguiente:

PASO 1 — EXTRAE LOS KEY TAKEAWAYS
Lee todo el workbook e identifica:
- Qué empresa o activo se está analizando
- Qué tipo de análisis es (valoración, proyección, due diligence, comparables, etc.)
- Los 5-8 números más importantes del modelo
- Las assumptions clave que más impactan el resultado
- Si hay escenarios, los resultados de cada uno
- Conclusión implícita del modelo

PASO 2 — ESTRUCTURA LOS DATOS
Organiza en formato:
EMPRESA/ACTIVO: [nombre]
TIPO DE ANÁLISIS: [tipo]
MÉTRICAS CLAVE: [listado]
ASSUMPTIONS: [listado]
ESCENARIOS: [si aplica]
CONCLUSIÓN: [1-2 líneas]

PASO 3 — GENERA EL PROMPT PARA LA PRESENTACIÓN
Genera un prompt completo que yo pueda copiar y pegar en Claude web para que me cree una presentación de 8-12 slides con estructura de banca de inversión.

El prompt debe incluir TODOS los datos extraídos (Claude web no tiene acceso al Excel), pedir slides de: portada, resumen ejecutivo, empresa/activo, metodología, valoración/resultados, sensibilidades, escenarios, conclusión y próximos pasos.

Entrégame el prompt completo listo para copiar.`;

const steps: StepContent[] = [
  {
    instruction: "Empieza con un modelo financiero ya completo",
    content: (
      <div>
        <p className="text-base font-sans text-muted-foreground mb-5 leading-relaxed">
          Este superpoder funciona con modelos terminados de los que necesitas extraer información para presentar. Puede ser para un comité, para un cliente, o para un pitch.
        </p>
      </div>
    ),
  },
  {
    instruction: "Abre el sidebar de Claude dentro de Excel",
    content: (
      <div>
        <p className="text-base font-sans text-muted-foreground mb-5 leading-relaxed">
          Usa el atajo de teclado para abrir el chat lateral donde Claude puede leer y editar tu workbook.
        </p>
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div className="bg-card border border-border rounded-lg p-4 text-center">
            <span className="text-xs font-sans text-muted-foreground block mb-1">Mac</span>
            <span className="text-lg font-mono font-bold text-foreground">Ctrl + Option + C</span>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 text-center">
            <span className="text-xs font-sans text-muted-foreground block mb-1">Windows</span>
            <span className="text-lg font-mono font-bold text-foreground">Ctrl + Alt + C</span>
          </div>
        </div>
        <p className="text-sm font-sans text-muted-foreground leading-relaxed">
          Si no tienes el add-in, búscalo como "Claude by Anthropic" en Microsoft Marketplace e instálalo. Requiere plan Pro, Max, Team o Enterprise.
        </p>
      </div>
    ),
  },
  {
    instruction: "Copia este prompt para que Claude extraiga los datos y genere el prompt de presentación",
    content: (
      <div>
        <p className="text-base font-sans text-muted-foreground mb-4 leading-relaxed">
          Este prompt le pide a Claude que lea el modelo, extraiga los datos clave, y genere un prompt completo que puedas usar en Claude web para crear la presentación.
        </p>
        <PromptBlock>{promptExtraccion}</PromptBlock>
        <CopyPromptButton text={promptExtraccion} />
      </div>
    ),
  },
  {
    instruction: "Valida que los números y la conclusión sean correctos",
    content: (
      <div>
        <p className="text-base font-sans text-muted-foreground mb-5 leading-relaxed">
          Claude mostrará en el chat los datos extraídos organizados. Este es tu checkpoint — si algún número está mal o falta contexto, corrígelo antes del siguiente paso.
        </p>
        <div className="space-y-3 mb-5">
          {[
            "¿Los números clave son correctos?",
            "¿La conclusión refleja lo que dice el modelo?",
            "¿Falta algún dato importante para la presentación?",
            "¿Los escenarios están bien capturados?",
          ].map((q, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <span className="text-copper mt-0.5">✓</span>
              <span className="text-base font-sans text-foreground">{q}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    instruction: "Claude generó un prompt completo con todos los datos de tu modelo",
    content: (
      <div>
        <p className="text-base font-sans text-muted-foreground mb-5 leading-relaxed">
          Este prompt largo incluye toda la información necesaria para que Claude web genere la presentación sin acceso al Excel. Cópialo completo.
        </p>
        <div className="rounded-lg p-4 border" style={{ backgroundColor: "hsl(29 59% 48% / 0.06)", borderColor: "hsl(29 59% 48% / 0.2)" }}>
          <p className="text-sm font-sans text-foreground leading-relaxed">
            El prompt aparecerá en el chat de Excel — selecciona todo y copia.
          </p>
        </div>
      </div>
    ),
  },
  {
    instruction: "Ve a claude.ai en tu navegador",
    content: (
      <div>
        <p className="text-base font-sans text-muted-foreground mb-5 leading-relaxed">
          Aquí es donde se genera la presentación. Abre Claude en una nueva ventana.
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
      </div>
    ),
  },
  {
    instruction: "Pega el prompt y deja que Claude genere el PowerPoint",
    content: (
      <div>
        <p className="text-base font-sans text-muted-foreground mb-5 leading-relaxed">
          Claude web recibirá todos los datos de tu modelo y generará una presentación ejecutiva profesional de 8-12 slides. Puede generar un archivo .pptx descargable o un artifact visual que puedes exportar.
        </p>
        <div className="rounded-lg p-4 border" style={{ backgroundColor: "hsl(29 59% 48% / 0.06)", borderColor: "hsl(29 59% 48% / 0.2)" }}>
          <p className="text-sm font-sans text-foreground leading-relaxed">
            Si quieres ajustes, simplemente pídelos: "Hazla más concisa", "Agrega un slide de riesgos", "Cambia los colores a los de BANICOL".
          </p>
        </div>
      </div>
    ),
  },
  {
    instruction: "Acabas de convertir un modelo financiero en una presentación ejecutiva",
    content: (
      <div>
        <p className="text-base font-sans text-muted-foreground mb-5 leading-relaxed">
          Sin reescribir un solo número. Sin copiar datos celda por celda. Sin formatear slides a las 11pm. El pipeline funciona con cualquier modelo, cualquier tipo de análisis.
        </p>
        <p className="text-xl font-sans font-bold text-copper text-center mb-5">
          Esto es Nivel 1. Imagina un sistema donde cada modelo que se cierra genera automáticamente su presentación estándar y alimenta la biblioteca de la firma. Eso es Nivel 2.
        </p>
      </div>
    ),
  },
];

const ModeloPresentacionCase = () => (
  <CaseStepper
    breadcrumbLabel="Modelo a Presentación"
    title="Caso: Del Modelo a la Presentación — Demo en Vivo"
    subtitle="Pipeline: Excel → datos estructurados → prompt → presentación ejecutiva"
    steps={steps}
    parentName="Análisis y Modelación"
    parentHref="/componente/analisis"
    fase1Href="/componente/analisis/fase-1"
  />
);

export default ModeloPresentacionCase;
