import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";

const EntenderEntornoPage = () => {
  const navigate = useNavigate();
  const navy = '#0A2240';
  const copper = '#B8860B';
  const cream = '#F5F2EC';

  return (
    <div style={{ background: cream,
      minHeight: '100vh',
      fontFamily: 'Inter, sans-serif' }}>
      <Header />
      <div style={{ maxWidth: 960,
        margin: '0 auto',
        padding: '48px 64px 80px' }}>

        <button onClick={() => navigate('/')}
          style={{ fontSize: 13, color: '#8A8880',
            cursor: 'pointer', marginBottom: 40,
            background: 'none', border: 'none',
            padding: 0, display: 'inline-flex',
            alignItems: 'center', gap: 6,
            fontFamily: 'Inter, sans-serif' }}>
          ← Volver al mapa
        </button>

        {/* TAG */}
        <div style={{ display: 'inline-flex',
          alignItems: 'center', gap: 8,
          fontSize: 10, fontWeight: 700,
          letterSpacing: 3,
          textTransform: 'uppercase',
          color: copper, marginBottom: 16 }}>
          <div style={{ width: 6, height: 6,
            background: copper,
            borderRadius: '50%' }} />
          Transversal · 06
        </div>

        {/* TÍTULO */}
        <div style={{ fontFamily: 'Georgia, serif',
          fontSize: 52, fontWeight: 700,
          color: navy, lineHeight: 1.05,
          marginBottom: 20, letterSpacing: -1 }}>
          Entender el Entorno
        </div>

        {/* DESCRIPCIÓN */}
        <div style={{ fontSize: 16,
          color: '#5A6070', lineHeight: 1.7,
          maxWidth: 680, marginBottom: 16 }}>
          Ashmore invierte en infraestructura en
          seis países con marcos regulatorios,
          ciclos políticos, y condiciones
          macroeconómicas distintas. El equipo
          necesita entender ese entorno antes de
          invertir, mientras invierte, y mientras
          gestiona lo invertido.
        </div>
        <div style={{ fontSize: 15,
          color: '#5A6070', lineHeight: 1.7,
          maxWidth: 680, marginBottom: 48,
          paddingBottom: 40,
          borderBottom: '1px solid #E0DBD0' }}>
          Esta transversal cruza las 5 cajas del
          journey porque el entorno nunca para.
          Una elección en Colombia afecta el
          fundraising del Fondo IV. Una reforma
          regulatoria en Perú cambia la TIR
          proyectada de una inversión en proceso
          de due diligence. Un shock de tasas
          globales redefine el atractivo relativo
          de la infraestructura andina.
        </div>

        {/* POR QUÉ EXISTE */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: 10,
            fontWeight: 700, letterSpacing: 3,
            textTransform: 'uppercase',
            color: copper, marginBottom: 20 }}>
            — Por qué esta transversal importa
          </div>
          <div style={{ display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: 12 }}>
            {[
              {
                titulo: 'El entorno define el retorno',
                desc: 'La TIR de una inversión en infraestructura en Colombia no depende solo de la operación del activo — depende del precio de la energía, la política tarifaria, las tasas de cambio, y el costo del capital local. Entender el entorno es entender el modelo financiero.',
              },
              {
                titulo: 'La información es asimétrica',
                desc: 'Ashmore compite con fondos globales que tienen equipos de research en cada mercado. El equipo local tiene la ventaja del contexto — pero necesita procesar volúmenes de información que ningún equipo pequeño puede manejar manualmente.',
              },
              {
                titulo: 'El entorno cambia más rápido que el portafolio',
                desc: 'Un activo de infraestructura dura 15-25 años. En ese tiempo cambian gobiernos, marcos regulatorios, tecnologías, y condiciones de mercado. El equipo de asset management necesita anticipar esos cambios antes de que afecten el portafolio.',
              },
            ].map((item, i) => (
              <div key={i} style={{
                background: 'white',
                border: '1px solid #E0DBD0',
                borderTop: `3px solid ${navy}`,
                borderRadius: 6,
                padding: '20px 18px' }}>
                <div style={{ fontSize: 13,
                  fontWeight: 700, color: navy,
                  marginBottom: 8 }}>
                  {item.titulo}
                </div>
                <div style={{ fontSize: 13,
                  color: '#6A7080',
                  lineHeight: 1.65 }}>
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SUPERPODERES */}
        <div style={{ marginBottom: 56 }}>
          <div style={{ fontSize: 10,
            fontWeight: 700, letterSpacing: 3,
            textTransform: 'uppercase',
            color: copper, marginBottom: 32 }}>
            — Lo que la IA puede hacer
          </div>
          {[
            {
              titulo: 'Monitor de riesgo político y regulatorio',
              cuando: 'Permanente — antes, durante y después de cada inversión',
              desc: 'El sistema monitorea el Diario Oficial, las resoluciones de la CREG, ANI, CRA, y los registros legislativos de los 6 países del mandato. Cuando aparece algo relevante para el portafolio o para una inversión en análisis, genera una alerta con el impacto específico. No es un agregador de noticias — es un sistema que conecta los cambios del entorno con las posiciones concretas de Ashmore.',
              aplicacion: 'Caja 2 (buscar), Caja 3 (evaluar), Caja 5 (gestionar)',
            },
            {
              titulo: 'Analizador de entorno macroeconómico por geografía',
              cuando: 'Antes de cada IC y cada trimestre para el reporte a LPs',
              desc: 'Dado el mandato del fondo, genera un análisis de las condiciones macroeconómicas relevantes por país: crecimiento, inflación, tasas, tipo de cambio, spreads soberanos, y sus implicaciones para la infraestructura. No es un resumen de Bloomberg — es un análisis específico para la tesis de inversión de Ashmore en cada geografía.',
              aplicacion: 'Caja 1 (levantar), Caja 2 (buscar), Caja 4 (decidir)',
            },
            {
              titulo: 'Rastreador de competidores y deal flow',
              cuando: 'Mensual durante el período de inversión del fondo',
              desc: 'Monitorea las inversiones de otros fondos de infraestructura en la región: IFC, CAF, Patria, Vinci, BlackRock, fondos de pensiones colombianos. Cuando un competidor entra a un sector o geografía, analiza qué significa para el deal flow de Ashmore — ¿más competencia por activos o validación de la tesis?',
              aplicacion: 'Caja 2 (buscar), Caja 3 (evaluar)',
            },
            {
              titulo: 'Generador de contexto para presentaciones a Londres',
              cuando: 'Antes de cada comité de inversión global',
              desc: 'El equipo de Bogotá tiene que convencer al equipo global de Londres de que Colombia, Perú, y Centroamérica son mercados atractivos para seguir desplegando capital. La IA genera el contexto de entorno — por qué ahora, por qué esta geografía, qué está pasando en el mercado local — en el formato y tono que espera el comité global.',
              aplicacion: 'Caja 1 (levantar), Caja 4 (decidir)',
            },
          ].map((sp, i) => (
            <div key={i} style={{
              padding: '28px 0',
              borderTop: '1px solid #E0DBD0' }}>
              <div style={{ display: 'flex',
                gap: 24 }}>
                <div style={{ fontFamily:
                  'Georgia, serif', fontSize: 40,
                  fontWeight: 700, color: '#E8E4DC',
                  lineHeight: 1, flexShrink: 0,
                  width: 48 }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 18,
                    fontWeight: 700, color: navy,
                    marginBottom: 6 }}>
                    {sp.titulo}
                  </div>
                  <div style={{ fontSize: 11,
                    color: copper, fontWeight: 600,
                    marginBottom: 10,
                    textTransform: 'uppercase',
                    letterSpacing: 1 }}>
                    {sp.cuando}
                  </div>
                  <div style={{ fontSize: 14,
                    color: '#5A6070',
                    lineHeight: 1.75,
                    marginBottom: 10 }}>
                    {sp.desc}
                  </div>
                  <div style={{ fontSize: 11,
                    color: '#8A8880' }}>
                    Aplica en: {sp.aplicacion}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div style={{ borderTop:
            '1px solid #E0DBD0' }} />
        </div>

        {/* NIVEL 2 */}
        <div style={{ background: navy,
          borderRadius: 8,
          padding: '40px 48px' }}>
          <div style={{ fontSize: 9,
            fontWeight: 700, letterSpacing: 3,
            textTransform: 'uppercase',
            color: copper, marginBottom: 12 }}>
            Nivel 2 · La visión institucional
          </div>
          <div style={{ fontFamily: 'Georgia, serif',
            fontSize: 28, fontWeight: 700,
            color: '#F8F5F0', lineHeight: 1.2,
            marginBottom: 12, maxWidth: 520 }}>
            Un sistema de inteligencia de entorno
            siempre activo
          </div>
          <div style={{ fontSize: 14,
            color: '#6A8AAA', lineHeight: 1.75,
            maxWidth: 600 }}>
            En el Nivel 2, el monitoreo del entorno
            deja de ser reactivo y se vuelve
            proactivo. El sistema recibe
            automáticamente las resoluciones de
            reguladores, los registros legislativos,
            los reportes macroeconómicos, y las
            noticias relevantes de los 6 países del
            mandato — y los conecta con las
            posiciones concretas del portafolio y
            el pipeline de inversiones. El equipo
            no busca información — la información
            llega cuando es relevante, con el
            análisis de impacto ya hecho.
          </div>
        </div>

      </div>
    </div>
  );
};

export default EntenderEntornoPage;
