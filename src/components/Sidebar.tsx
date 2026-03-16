import { LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import logoAshmore from "@/assets/logo-ashmore.svg";
import logoXptnova from "@/assets/xptnova-light.svg";

const Sidebar = () => {
  const { logout } = useAuth();
  return (
    <div style={{
      width: 64,
      minHeight: '100vh',
      background: '#0A2240',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '24px 0 20px',
      flexShrink: 0,
      borderRight: '1px solid #1E3A5A'
    }}>
      <img 
        src={logoAshmore} 
        alt="Ashmore" 
        style={{ width: 36, height: 'auto' }}
      />
      <div style={{
        width: 24, height: 1,
        background: '#B8860B',
        margin: '16px 0',
        opacity: 0.6
      }} />
      <div style={{ flex: 1 }} />
      <img
        src={logoXptnova}
        alt="XPTNova"
        style={{ width: 32, opacity: 0.35, marginBottom: 12 }}
      />
      <button
        onClick={logout}
        style={{
          width: 32, height: 32,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          borderRadius: 4,
          marginBottom: 8
        }}
        onMouseEnter={e => (e.currentTarget.style.background = '#143050')}
        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
        title="Cerrar sesión"
      >
        <LogOut size={16} color="#4A6070" />
      </button>
    </div>
  );
};

export default Sidebar;
