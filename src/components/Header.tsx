import { useState } from "react";
import { Link } from "react-router-dom";
import { LogOut, Menu, X } from "lucide-react";
import logoBanicol from "@/assets/logo-banicol.png";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const { logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 md:h-16 flex items-center justify-between">
        <Link to="/" className="shrink-0">
          <img src={logoBanicol} alt="Banicol — Banca de Inversión" className="h-9 md:h-12 w-auto" />
        </Link>
        <span className="text-xs font-sans text-muted-foreground tracking-[0.15em] uppercase hidden md:block">
          Sistema Operativo · IA
        </span>
        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-4">
          <Link
            to="/"
            className="text-sm font-sans font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Mapa del Sistema
          </Link>
          <button
            onClick={logout}
            className="text-muted-foreground/60 hover:text-foreground transition-colors"
            title="Cerrar sesión"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </nav>
        {/* Mobile hamburger */}
        <button
          className="md:hidden text-foreground p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menú"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="md:hidden absolute inset-x-0 top-14 bg-card border-b border-border shadow-lg z-40">
          <nav className="flex flex-col px-6 py-4 gap-1">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="text-base font-sans font-medium text-foreground py-3 border-b border-border"
            >
              Mapa del Sistema
            </Link>
            <button
              onClick={() => { logout(); setMenuOpen(false); }}
              className="text-base font-sans font-medium text-muted-foreground py-3 text-left flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" /> Cerrar sesión
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
