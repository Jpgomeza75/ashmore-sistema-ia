import { useState } from "react";
import { Link } from "react-router-dom";
import { LogOut, Menu, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const { logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 md:h-16 flex items-center justify-between">

        {/* Logo — tipografía serif Ashmore, sin imagen */}
        <Link to="/" className="shrink-0 flex items-center gap-2">
          <span
            className="font-serif text-navy tracking-tight leading-none"
            style={{ fontSize: "1.35rem", fontWeight: 700, letterSpacing: "-0.01em" }}
          >
            Ashmore
          </span>
          <span
            className="font-sans text-muted-foreground/60 tracking-tight leading-none hidden sm:block"
            style={{ fontSize: "0.65rem", fontWeight: 400, letterSpacing: "0.08em", textTransform: "uppercase", marginTop: "1px" }}
          >
            Colombia
          </span>
        </Link>

        {/* Center label */}
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
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-card border-t border-border px-4 py-3 flex flex-col gap-3">
          <Link
            to="/"
            className="text-sm font-sans font-medium text-foreground"
            onClick={() => setMenuOpen(false)}
          >
            Mapa del Sistema
          </Link>
          <button
            onClick={() => { logout(); setMenuOpen(false); }}
            className="text-sm font-sans text-muted-foreground text-left flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Cerrar sesión
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
