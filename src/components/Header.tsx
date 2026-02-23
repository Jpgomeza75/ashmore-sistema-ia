import { Link } from "react-router-dom";
import logoBanicol from "@/assets/logo-banicol.png";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="shrink-0">
          <img src={logoBanicol} alt="Banicol — Banca de Inversión" className="h-12 w-auto" />
        </Link>
        <span className="text-xs font-sans text-muted-foreground tracking-[0.15em] uppercase hidden sm:block">
          Sistema Operativo · IA
        </span>
        <nav>
          <Link
            to="/"
            className="text-sm font-sans font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Mapa del Sistema
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
