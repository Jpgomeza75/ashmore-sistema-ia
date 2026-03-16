import { useNavigate, useLocation } from "react-router-dom";
import { LayoutGrid } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const NAV_ITEMS = [
  { icon: LayoutGrid, label: "Mapa del Sistema", path: "/" }
];

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div style={{
      width: 56,
      minHeight: '100vh',
      background: '#0A2240',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px 0 16px',
      flexShrink: 0,
      borderRight: '1px solid #1E3A5A',
      position: 'relative'
    }}>
      
      {/* Logo */}
      <div style={{
        width: 36, height: 36,
        background: '#F8F5F0',
        borderRadius: 3,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'Georgia, serif',
        fontSize: 15, fontWeight: 700, color: '#0A2240',
        flexShrink: 0, marginBottom: 12
      }}>A</div>

      {/* Copper divider */}
      <div style={{
        width: 20, height: 1,
        background: '#B8860B', opacity: 0.5,
        marginBottom: 16
      }} />

      {/* Nav items */}
      {NAV_ITEMS.map(({ icon: Icon, label, path }) => {
        const isActive = location.pathname === path;
        return (
          <div
            key={path}
            onClick={() => navigate(path)}
            title={label}
            style={{
              width: 36, height: 36,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              borderRadius: 6,
              cursor: 'pointer',
              background: isActive ? '#143050' : 'transparent',
              marginBottom: 4,
              transition: 'background 0.15s',
              position: 'relative'
            }}
            onMouseEnter={e => {
              if (!isActive) e.currentTarget.style.background = '#0F2A40';
              const tip = e.currentTarget.querySelector('.tip') as HTMLElement;
              if (tip) tip.style.opacity = '1';
            }}
            onMouseLeave={e => {
              if (!isActive) e.currentTarget.style.background = 'transparent';
              const tip = e.currentTarget.querySelector('.tip') as HTMLElement;
              if (tip) tip.style.opacity = '0';
            }}
          >
            <Icon 
              size={16} 
              color={isActive ? '#F8F5F0' : '#4A6070'} 
            />
            {/* Tooltip */}
            <div className="tip" style={{
              position: 'absolute',
              left: 44, top: '50%',
              transform: 'translateY(-50%)',
              background: '#0A2240',
              border: '1px solid #1E3A5A',
              color: '#F8F5F0',
              fontSize: 11,
              fontWeight: 500,
              padding: '4px 10px',
              borderRadius: 4,
              whiteSpace: 'nowrap',
              opacity: 0,
              transition: 'opacity 0.15s',
              pointerEvents: 'none',
              zIndex: 100,
              fontFamily: 'DM Sans, sans-serif'
            }}>
              {label}
            </div>
          </div>
        );
      })}

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* XPTNova label */}
      <div style={{
        fontSize: 6,
        letterSpacing: 1.5,
        color: '#2A4060',
        textTransform: 'uppercase',
        marginBottom: 10,
        writingMode: 'vertical-rl',
        transform: 'rotate(180deg)',
        fontFamily: 'DM Sans, sans-serif'
      }}>XPTNova</div>

      {/* Logout */}
      <div
        onClick={logout}
        title="Cerrar sesión"
        style={{
          width: 36, height: 36,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          borderRadius: 6, cursor: 'pointer',
          background: 'transparent',
          transition: 'background 0.15s',
          position: 'relative'
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = '#0F2A40';
          const tip = e.currentTarget.querySelector('.tip') as HTMLElement;
          if (tip) tip.style.opacity = '1';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'transparent';
          const tip = e.currentTarget.querySelector('.tip') as HTMLElement;
          if (tip) tip.style.opacity = '0';
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" 
          fill="none" stroke="#4A6070" strokeWidth="1.5" 
          strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
          <polyline points="16 17 21 12 16 7"/>
          <line x1="21" y1="12" x2="9" y2="12"/>
        </svg>
        <div className="tip" style={{
          position: 'absolute',
          left: 44, top: '50%',
          transform: 'translateY(-50%)',
          background: '#0A2240',
          border: '1px solid #1E3A5A',
          color: '#F8F5F0',
          fontSize: 11,
          fontWeight: 500,
          padding: '4px 10px',
          borderRadius: 4,
          whiteSpace: 'nowrap',
          opacity: 0,
          transition: 'opacity 0.15s',
          pointerEvents: 'none',
          zIndex: 100,
          fontFamily: 'DM Sans, sans-serif'
        }}>
          Cerrar sesión
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
