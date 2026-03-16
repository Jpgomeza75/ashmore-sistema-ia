import Header from "@/components/Header";
import SystemMap from "@/components/SystemMap";

const Index = () => {
  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: '#F5F2EC',
      overflow: 'hidden'
    }}>
      <Header />
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: '24px 32px 20px',
        minHeight: 0,
        overflow: 'hidden'
      }}>
        <SystemMap />
      </div>
    </div>
  );
};

export default Index;
