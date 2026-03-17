import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";

const ComunicarPage = () => {
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
          Transversal · 07
        </div>

        <div style={{ fontFamily: 'Georgia, serif',
          fontSize: 52, fontWeight: 700,
          color: navy, lineHeight: 1.05,
          marginBottom: 20, letterSpacing: -1 }}>
          Comunicar
        </div>

        <div style={{ fontSize: 16,
          color: '#5A6070', lineHeight: 1.7,
          maxWidth: 680, marginBottom: 16 }}>
          Ashmore tiene múltiples audiencias con
          intereses distintos: los LPs que pusieron
          el capital, el equipo global de Londres
          que respalda la operación local, las
          compañías del portafolio donde Ashmore
          tiene representación, y el mercado que
          observa al fondo.
        </div>
        <div style={{ fontSize: 15,
          color: '#5A6070', lineHeight: 1.7,
          maxWidth: 680, marginBottom: 48,
          paddingBottom: 40,
          borderBottom: '1px solid #E0DBD0' }}>
          Comunicar bien no es redactar bonito.
          Es saber qué decir, cómo enmarcarlo,
          y qué no decir — según quién escucha y
          qué está en juego. La IA no reemplaza
          el juicio del equipo en momentos
          difíciles. Sí ayuda a pensar mejor antes
          de hablar.
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
                titulo: 'Cada audiencia es diferente',
                desc: 'Lo que CAF necesita escuchar sobre una inversión es diferente a lo que necesita Porvenir, y ambos son diferentes a lo que espera el comité de inversión de Londres. El mismo hecho — una caída en el EBITDA de un activo — se comunica de manera completamente distinta según a quién va dirigido.',
              },
              {
                titulo: 'Los momentos difíciles son los más importantes',
                desc: 'Cuando algo sale mal en el portafolio — un activo que no está cumpliendo el plan, un evento operativo grave, un conflicto con una comunidad — la comunicación con los LPs no puede ser un correo improvisado. El equipo necesita pensar bien antes de escribir.',
              },
              {
                titulo: 'La narrativa construye confianza',
                desc: 'Ashmore acaba de levantar USD 420M sobredemandados. Esa confianza se construyó con años de comunicación consistente con los LPs. El equipo que comunica bien en los momentos de incertidumbre es el que consigue el próximo fondo.',
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
              titulo: 'Enmarcador de malas noticias',
              cuando: 'Cuando un activo se desvía del plan o hay un evento material',
              desc: 'Antes de escribir el correo al LP, el sistema ayuda a pensar: ¿qué pasó realmente? ¿qué está en control del equipo y qué no? ¿qué acciones ya se tomaron? ¿qué espera el LP en términos de información y timing? El output no es el correo final — es el pensamiento estructurado que hace que el correo final sea el correcto.',
              aplicacion: 'Caja 5 (gestionar), Transversal Cumplir',
            },
            {
              titulo: 'Adaptador de narrativa por audiencia',
              cuando: 'Antes de cada reunión con un LP o presentación al comité global',
              desc: 'El mismo trimestre, la misma cartera, el mismo período. La narrativa para CAF enfatiza el impacto de desarrollo. La narrativa para Porvenir enfatiza el DSCR y la distribución proyectada. La narrativa para Londres enfatiza el pipeline y la posición competitiva. El sistema adapta el énfasis sin cambiar los hechos.',
              aplicacion: 'Caja 1 (levantar), Caja 5 (gestionar)',
            },
            {
              titulo: 'Simulador de escenarios de comunicación',
              cuando: 'Antes de momentos de alta tensión con LPs o stakeholders',
              desc: 'Si un LP va a hacer preguntas difíciles en la próxima reunión, el sistema ayuda a preparar las respuestas antes de que lleguen. No es solo anticipar preguntas — es trabajar la narrativa completa: qué decir primero, cómo enmarcar las noticias negativas, qué compromisos hacer y cuáles evitar.',
              aplicacion: 'Caja 1 (levantar), Caja 4 (decidir)',
            },
            {
              titulo: 'Generador de actualizaciones a Londres',
              cuando: 'Mensual — reporte al equipo global',
              desc: 'El equipo de Bogotá reporta al equipo global de Ashmore sobre el estado del portafolio local, el pipeline, y el entorno. El sistema genera el borrador del reporte mensual en el formato y tono que espera la casa matriz — ahorrando horas de trabajo manual cada mes.',
              aplicacion: 'Transversal permanente',
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
            Comunicación institucional sin
            fricción — a la audiencia correcta,
            en el momento correcto
          </div>
          <div style={{ fontSize: 14,
            color: '#6A8AAA', lineHeight: 1.75,
            maxWidth: 600 }}>
            En el Nivel 2, el sistema sabe quién
            es cada LP, qué le preocupa, y qué ha
            preguntado antes. Cuando hay un evento
            material en el portafolio, genera
            automáticamente el borrador de
            comunicación para cada audiencia
            relevante — con el énfasis correcto
            para cada una. El equipo revisa,
            ajusta, y envía. No empieza desde cero.
          </div>
        </div>

      </div>
    </div>
  );
};

export default ComunicarPage;
