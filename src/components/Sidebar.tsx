import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import logoAshmore from "@/assets/logo-ashmore.svg";
import logoXptnova from "@/assets/xptnova-light.svg";

export default function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <aside className="w-16 shrink-0 h-screen flex flex-col items-center bg-[#0A2240]">
      {/* Logo Ashmore */}
      <div className="pt-6 flex justify-center">
        <img
          src={logoAshmore}
          alt="Ashmore"
          className="h-7 object-contain"
          style={{ height: 28 }}
        />
      </div>

      {/* Línea separadora copper */}
      <div
        className="my-4 h-px bg-[#B8860B]"
        style={{ width: 24 }}
      />

      {/* Espacio flexible */}
      <div className="flex-1" />

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="pb-5 text-[#4A6070] hover:text-[#F8F5F0] transition-colors"
        title="Cerrar sesión"
        aria-label="Cerrar sesión"
      >
        <LogOut size={16} />
      </button>

      {/* Logo XPTNova */}
      <div className="pb-4 flex justify-center">
        <img
          src={logoXptnova}
          alt="XPTNova"
          className="object-contain"
          style={{ width: 36 }}
        />
      </div>
    </aside>
  );
}
