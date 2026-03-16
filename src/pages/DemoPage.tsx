import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";

const DemoPage = () => {
  const { demoId } = useParams();
  const navigate = useNavigate();
  return (
    <div style={{ background: '#F5F2EC', minHeight: '100vh' }}>
      <Header />
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '48px' }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            fontSize: 12, color: '#8A8880', cursor: 'pointer',
            marginBottom: 40, background: 'none', border: 'none',
            padding: 0, fontFamily: 'Inter, sans-serif',
          }}
        >← Volver</button>
        <div style={{
          fontFamily: 'Georgia, serif', fontSize: 48,
          fontWeight: 700, color: '#0A2240', marginBottom: 16,
        }}>Demo</div>
        <div style={{
          display: 'inline-block', padding: '12px 24px',
          border: '1.5px solid #B8860B', borderRadius: 4,
          fontSize: 11, fontWeight: 700, letterSpacing: 2,
          color: '#B8860B', textTransform: 'uppercase',
        }}>En construcción</div>
      </div>
    </div>
  );
};

export default DemoPage;
