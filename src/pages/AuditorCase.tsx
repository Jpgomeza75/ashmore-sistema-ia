import CaseStepper, { CopyPromptButton, PromptBlock, type StepContent } from "@/components/CaseStepper";


const promptAuditoria = `Necesito que hagas una auditoría completa de este workbook. Tómate tu tiempo y sé exhaustivo.

PASO 1 — MAPA DEL MODELO
Recorre todas las tabs y genera un mapa de la estructura:
- Qué hace cada tab (inputs, cálculos, outputs, auxiliares)
- Cómo se conectan entre sí (qué tab alimenta a cuál)
- Cuáles son los inputs principales que el usuario debe modificar (assumptions)
- Cuál es el output final del modelo (valoración, proyección, análisis, etc.)

PASO 2 — AUDITORÍA DE FÓRMULAS
Revisa las fórmulas buscando:
- Valores hardcodeados dentro de fórmulas que deberían ser referencias a celdas de assumptions
- Referencias circulares o potenciales errores de dependencia
- Fórmulas inconsistentes dentro de un mismo rango
- Celdas con errores (#REF!, #VALUE!, #DIV/0!, #N/A)
- Rangos que deberían usar fórmulas pero tienen valores pegados manualmente

PASO 3 — VALIDACIÓN DE LÓGICA
Evalúa si la lógica del modelo tiene sentido:
- ¿Las proyecciones de crecimiento son razonables?
- ¿Los ratios y márgenes son consistentes a lo largo del tiempo?
- ¿Hay inconsistencias entre el Balance, el P&L y el Cash Flow (si aplica)?
- ¿Las tasas de descuento, múltiplos o parámetros de valoración están en rangos razonables?

PASO 4 — CREA UNA HOJA DE AUDITORÍA
Crea una nueva hoja en este mismo workbook llamada "Auditoría Claude" con:

Sección A: RESUMEN DEL MODELO
- Descripción general
- Tabla: Nombre de Tab | Función | Recibe datos de | Envía datos a
- Lista de inputs principales con ubicación exacta

Sección B: HALLAZGOS
Tabla: Severidad | Tab | Celda | Hallazgo | Por qué importa | Corrección sugerida
- CRÍTICO (rojo) / IMPORTANTE (amarillo) / SUGERENCIA (verde)
- Usa formato condicional para colorear por severidad

Sección C: MÉTRICAS DEL MODELO
- Total de tabs, fórmulas vs hardcodes (%), errores por tipo, complejidad

Formatea profesionalmente: headers oscuros, bordes limpios, columnas autoajustadas.`;

const steps: StepContent[] = [
  {
    instruction: "Abre cualquier workbook con un modelo financiero",
    content: (
      <div>
        <p className="text-base font-sans text-muted-foreground mb-5 leading-relaxed">
          No importa cuántas tabs tenga, qué tipo de análisis sea, ni cómo esté estructurado. Claude lee todo. Puede ser un DCF, un LBO, un modelo de proyecciones, un análisis de comparables — lo que sea.
        </p>
        <div className="rounded-lg p-4 border" style={{ backgroundColor: "hsl(29 59% 48% / 0.06)", borderColor: "hsl(29 59% 48% / 0.2)" }}>
          <p className="text-sm font-sans text-foreground leading-relaxed">
            Para la demo: le pediremos a un analista que abra un modelo real de su computador. Sin preparar nada.
          </p>
        </div>
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
    instruction: "Copia este prompt y pégalo en el chat de Claude en Excel",
    content: (
      <div>
        <p className="text-base font-sans text-muted-foreground mb-4 leading-relaxed">
          Este prompt le pide a Claude que haga 4 cosas: mapear la estructura del modelo, auditar fórmulas, validar la lógica financiera, y crear una hoja de auditoría profesional dentro del mismo libro.
        </p>
        <PromptBlock>{promptAuditoria}</PromptBlock>
        <CopyPromptButton text={promptAuditoria} />
      </div>
    ),
  },
  {
    instruction: "Claude está leyendo todo el workbook",
    content: (
      <div>
        <p className="text-base font-sans text-muted-foreground mb-5 leading-relaxed">
          Dependiendo del tamaño del modelo, esto puede tomar entre 1 y 3 minutos. Claude recorre cada tab, cada fórmula, cada referencia. Mientras trabaja, puedes ver su progreso en el chat.
        </p>
        <div className="rounded-lg p-4 border" style={{ backgroundColor: "hsl(29 59% 48% / 0.06)", borderColor: "hsl(29 59% 48% / 0.2)" }}>
          <p className="text-sm font-sans text-foreground leading-relaxed">
            Si el modelo es muy grande (30+ tabs), puede tardar más. La espera vale la pena.
          </p>
        </div>
      </div>
    ),
  },
  {
    instruction: "Ve a la nueva tab 'Auditoría Claude' en tu workbook",
    content: (
      <div>
        <p className="text-base font-sans text-muted-foreground mb-5 leading-relaxed">
          Claude creó una hoja completamente nueva dentro de tu archivo con toda la auditoría formateada profesionalmente. Navega entre las tres secciones:
        </p>
        <div className="space-y-3">
          {[
            "Sección A: Mapa completo del modelo — cómo fluyen los datos entre tabs",
            "Sección B: Tabla de hallazgos con severidad, celda exacta y corrección sugerida",
            "Sección C: Métricas — incluyendo el % de valores hardcodeados vs. fórmulas",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <span className="text-copper mt-0.5 font-bold">{String.fromCharCode(65 + i)}</span>
              <span className="text-base font-sans text-foreground">{item}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    instruction: "Haz click en las celdas citadas y verifica",
    content: (
      <div>
        <p className="text-base font-sans text-muted-foreground mb-5 leading-relaxed">
          Cada hallazgo incluye la referencia exacta a la celda. Ve directo, verifica si Claude tiene razón, y decide si lo corriges.
        </p>
        <div className="space-y-3 mb-5">
          {[
            "¿Los hallazgos críticos (rojos) son reales?",
            "¿El mapa de tabs refleja correctamente la estructura?",
            "¿Hay hallazgos que te sorprendan?",
            "¿El porcentaje de hardcodes es aceptable o preocupante?",
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
    instruction: "Prioriza los hallazgos críticos y trabaja hacia abajo",
    content: (
      <div>
        <p className="text-base font-sans text-muted-foreground mb-5 leading-relaxed">
          Puedes pedirle a Claude directamente en el chat que corrija los errores. Por ejemplo: "Corrige el hardcode en la celda D15 de la tab Proyecciones y reemplázalo por una referencia al assumption correspondiente."
        </p>
        <div className="rounded-lg p-4 border" style={{ backgroundColor: "hsl(29 59% 48% / 0.06)", borderColor: "hsl(29 59% 48% / 0.2)" }}>
          <p className="text-sm font-sans text-foreground leading-relaxed">
            Claude puede hacer las correcciones preservando las dependencias de fórmulas.
          </p>
        </div>
      </div>
    ),
  },
  {
    instruction: "Ahora tu modelo tiene documentación y auditoría integrada",
    content: (
      <div>
        <p className="text-base font-sans text-muted-foreground mb-5 leading-relaxed">
          Cada modelo que sale de BANICOL podría tener esta auditoría. No más "heredar" modelos sin documentación. No más errores que se descubren cuando ya es tarde.
        </p>
        <p className="text-xl font-sans font-bold text-copper text-center mb-5">
          Esto es un analista con superpoderes. Imagina un sistema donde CADA modelo pasa por auditoría automática antes de salir de la firma. Eso es Nivel 2.
        </p>
      </div>
    ),
  },
];

const AuditorCase = () => (
  <CaseStepper
    breadcrumbLabel="El Auditor"
    title="Caso: El Auditor — Demo en Vivo"
    subtitle="Sigue los pasos para auditar cualquier modelo financiero"
    steps={steps}
    parentName="Análisis y Modelación"
    parentHref="/componente/analisis"
    fase1Href="/componente/analisis/fase-1"
  />
);

export default AuditorCase;
