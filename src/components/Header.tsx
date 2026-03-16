import { LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import logoAshmore from "@/assets/logo-ashmore.svg";
import logoXptnova from "@/assets/xptnova-dark.svg";

const Header = () => {
  const { logout } = useAuth();
  return (
    <header style={{
      height: 56,
      background: '#F5F2EC',
      borderBottom: '1px solid #E0DBD0',
      display: 'flex',
      alignItems: 'center',
      padding: '0 32px',
      flexShrink: 0,
    }}>
      <div style={{ display:'flex', alignItems:'center', flex:1, gap:0 }}>
        <img src={logoAshmore} alt="Ashmore" style={{ height: 24, width:'auto' }} />
        <div style={{ width:1, height:20, background:'#D5D0C8', margin:'0 14px' }} />
        <span style={{
          fontSize: 11, color:'#8A8880',
          letterSpacing:'2px', textTransform:'uppercase',
          fontFamily:'Inter, sans-serif'
        }}>Sistema Operativo · IA</span>
      </div>
      <div style={{ display:'flex', alignItems:'center', gap:10 }}>
        <img src={logoXptnova} alt="XPTNova" style={{ height:14, width:'auto', opacity:0.6 }} />
        <div style={{ width:1, height:20, background:'#D5D0C8' }} />
        <button
          onClick={logout}
          title="Cerrar sesión"
          style={{
            width:30, height:30,
            border:'1px solid #E0DBD0', borderRadius:4,
            background:'transparent', cursor:'pointer',
            display:'flex', alignItems:'center', justifyContent:'center',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = '#0A2240';
            e.currentTarget.style.borderColor = '#0A2240';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.borderColor = '#E0DBD0';
          }}
        >
          <LogOut size={13} color="#8A8880" />
        </button>
      </div>
    </header>
  );
};

export default Header;
