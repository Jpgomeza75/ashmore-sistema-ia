import { useState } from "react";
import { Link } from "react-router-dom";
import { LogOut, Menu, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function Header() {
  const { logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#143050]/20">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 md:h-16 flex items-center justify-between">
        <Link to="/" className="shrink-0 flex items-center gap-2">
          <span
            className="font-serif text-[#0A2240] tracking-tight leading-none"
            style={{ fontSize: "1.35rem", fontWeight: 700 }}
          >
            Ashmore
          </span>
          <span
            className="font-sans text-[#6B7280] text-[0.65rem] uppercase tracking-widest hidden sm:block"
          >
            Colombia
          </span>
        </Link>

        <span className="text-xs font-sans text-[#6B7280] tracking-[0.15em] uppercase hidden md:block">
          Sistema Operativo · IA
        </span>

        <nav className="hidden md:flex items-center gap-4">
          <Link
            to="/"
            className="text-sm font-sans font-medium text-[#6B7280] hover:text-[#0A2240] transition-colors"
          >
            Mapa del Sistema
          </Link>
          <button
            onClick={logout}
            className="text-[#6B7280] hover:text-[#0A2240] transition-colors"
            title="Cerrar sesión"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </nav>

        <button
          className="md:hidden text-[#0A2240] p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menú"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-[#143050]/20 px-4 py-3 flex flex-col gap-3">
          <Link
            to="/"
            className="text-sm font-sans font-medium text-[#0A2240]"
            onClick={() => setMenuOpen(false)}
          >
            Mapa del Sistema
          </Link>
          <button
            onClick={() => {
              logout();
              setMenuOpen(false);
            }}
            className="text-sm font-sans text-[#6B7280] text-left flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Cerrar sesión
          </button>
        </div>
      )}
    </header>
  );
}
