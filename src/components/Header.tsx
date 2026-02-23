import { Link, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import logoBanicol from "@/assets/logo-banicol.png";

const Header = () => {
  const location = useLocation();
  const isSubpage = location.pathname !== "/";

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {isSubpage && (
            <Link
              to="/"
              className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors text-sm font-sans"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Mapa</span>
            </Link>
          )}
          <Link to="/" className="flex items-center gap-3">
            <img src={logoBanicol} alt="Banicol — Banca de Inversión" className="h-12 w-auto" />
            <span className="hidden sm:block h-5 w-px bg-border" />
            <span className="hidden sm:block text-xs font-sans text-muted-foreground tracking-wide uppercase">
              Sistema Operativo · IA
            </span>
          </Link>
        </div>
        <nav className="flex items-center gap-6">
          <Link
            to="/"
            className={`text-sm font-sans font-medium transition-colors ${
              !isSubpage ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Mapa del Sistema
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
