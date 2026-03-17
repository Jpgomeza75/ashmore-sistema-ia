import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";

const AprenderPage = () => {
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

        <div style={{ display: 'inline-flex',
          alignItems: 'center', gap: 8,
          fontSize: 10, fontWeight: 700,
          letterSpacing: 3,
          textTransform: 'uppercase',
          color: copper, marginBottom: 16 }}>
          <div style={{ width: 6, height: 6,
            background: copper,
            borderRadius: '50%' }} />
          Transversal · 09
        </div>

        <div style={{ fontFamily: 'Georgia, serif',
          fontSize: 52, fontWeight: 700,
          color: navy, lineHeight: 1.05,
          marginBottom: 20, letterSpacing: -1 }}>
          Aprender
        </div>

        <div style={{ fontSize: 16,
          color: '#5A6070', lineHeight: 1.7,
          maxWidth: 680, marginBottom: 16 }}>
          Tres fondos, 15 años de operación,
          11 activos en distintos sectores y
          etapas de madurez. Ashmore ha acumulado
          una cantidad enorme de experiencia en
          infraestructura PE en los Andes — pero
          esa experiencia vive en las cabezas
          de las personas, en correos, en carpetas
          de Dropbox, y en memorias de inversión
          que nadie vuelve a leer.
        </div>
        <div style={{ fontSize: 15,
          color: '#5A6070', lineHeight: 1.7,
          maxWidth: 680, marginBottom: 48,
          paddingBottom: 40,
          borderBottom: '1px solid #E0DBD0' }}>
          El conocimiento institucional es uno
          de los activos más valiosos de un fondo
          de PE — y uno de los más frágiles.
          Cuando un analista senior se va, se
          lleva años de contexto sobre los activos,
          los LPs, y los errores que no se
          deben repetir. La IA puede ayudar a
          capturar, organizar, y hacer accesible
          ese conocimiento antes de que se vaya.
        </div>

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
                titulo: 'Los errores se repiten porque no se documentan',
                desc: 'Ashmore ha cometido errores en inversiones pasadas — supuestos que no se cumplieron, riesgos que no se anticiparon, negociaciones que salieron mal. Ese aprendizaje debería alimentar las inversiones futuras. Hoy vive en la memoria de las personas que estuvieron presentes, no en un sistema al que pueda acceder el analista que llegó hace seis meses.',
              },
              {
                titulo: 'El contexto histórico da ventaja competitiva',
                desc: 'Cuando Ashmore evalúa una nueva inversión en el sector de agua en Colombia, debería poder comparar con lo que aprendió en las inversiones anteriores de Ática Andina y ATICA. Esa comparación hoy requiere buscar en carpetas, llamar a personas, y reconstruir contexto. Debería ser una consulta instantánea.',
              },
              {
                titulo: 'El conocimiento sobre LPs es capital relacional',
                desc: 'Ashmore sabe exactamente qué le preocupa a cada LP, qué ha preguntado antes, qué compromisos hizo el equipo en reuniones anteriores, y cómo ha evolucionado la relación. Ese conocimiento debería estar disponible para cualquier miembro del equipo antes de cualquier reunión — no solo en la cabeza del Director de IR.',
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

        <div style={{ marginBottom: 56 }}>
          <div style={{ fontSize: 10,
            fontWeight: 700, letterSpacing: 3,
            textTransform: 'uppercase',
            color: copper, marginBottom: 32 }}>
            — Lo que la IA puede hacer
          </div>
          {[
            {
              titulo: 'Base de conocimiento de inversiones pasadas',
              cuando: 'Disponible en cada nueva evaluación de inversión',
              desc: 'El sistema indexa los investment memos, actas de IC, informes de DD, y reportes de gestión de todos los activos históricos del portafolio. Cuando el equipo está evaluando una nueva inversión en un sector o geografía donde Ashmore ya ha invertido, puede consultar: ¿qué supuestos nos equivocamos la última vez? ¿qué riesgos no anticipamos? ¿qué aprendimos de la negociación del SHA?',
              aplicacion: 'Caja 3 (evaluar), Caja 4 (decidir)',
            },
            {
              titulo: 'Memoria institucional de LPs',
              cuando: 'Antes de cada reunión o comunicación con un LP',
              desc: 'El sistema registra el historial completo de cada LP: qué preguntas hicieron en cada reunión, qué compromisos hizo el equipo, qué temas les generan mayor preocupación, cómo ha evolucionado la relación desde el primer contacto. Cualquier miembro del equipo puede acceder a ese contexto antes de interactuar con el LP — no solo quien estuvo en las reuniones anteriores.',
              aplicacion: 'Caja 1 (levantar), Caja 5 (gestionar)',
            },
            {
              titulo: 'Analizador de desviaciones vs. tesis original',
              cuando: 'Trimestral — como parte del proceso de asset management',
              desc: 'Para cada activo del portafolio, el sistema compara la tesis de inversión original con la realidad actual: ¿qué supuestos se cumplieron? ¿cuáles no? ¿por qué? ¿qué debería cambiar en la tesis de inversión para el próximo fondo? Este análisis sistemático convierte la gestión del portafolio en aprendizaje institucional.',
              aplicacion: 'Caja 5 (gestionar), Transversal permanente',
            },
            {
              titulo: 'Capturador de decisiones y su contexto',
              cuando: 'Después de cada IC, junta directiva, o reunión estratégica',
              desc: 'El sistema registra no solo qué se decidió — sino por qué. Las condiciones de mercado que existían, los argumentos que pesaron, los riesgos que se aceptaron conscientemente. Cuando en cinco años el equipo necesite entender por qué se tomó una decisión, esa información estará disponible — no será necesario reconstruirla de correos y memorias fragmentadas.',
              aplicacion: 'Caja 4 (decidir), Caja 5 (gestionar)',
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
            El conocimiento institucional de
            Ashmore — accesible, no archivado
          </div>
          <div style={{ fontSize: 14,
            color: '#6A8AAA', lineHeight: 1.75,
            maxWidth: 600 }}>
            En el Nivel 2, el sistema indexa
            todo el conocimiento acumulado de
            Ashmore — investment memos, actas
            de IC, DDQs respondidos, reportes
            de gestión, historiales de LPs —
            y lo hace consultable en lenguaje
            natural. El analista que llegó hace
            seis meses tiene acceso al mismo
            contexto que el Director que lleva
            15 años. Ese es el activo más
            valioso que Ashmore puede construir
            con la IA — y el que más difícil
            es de replicar para un competidor.
          </div>
        </div>

      </div>
    </div>
  );
};

export default AprenderPage;
