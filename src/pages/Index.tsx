import Sidebar from "@/components/Sidebar";
import SystemMap from "@/components/SystemMap";

const Index = () => {
  return (
    <div style={{ 
      display: 'flex', 
      height: '100vh', 
      overflow: 'hidden',
      background: '#F5F2EC'
    }}>
      <Sidebar />
      <div style={{ 
        flex: 1, 
        display: 'flex',
        flexDirection: 'column',
        padding: '36px 36px 28px 28px',
        overflow: 'hidden'
      }}>
        <SystemMap />
      </div>
    </div>
  );
};

export default Index;
