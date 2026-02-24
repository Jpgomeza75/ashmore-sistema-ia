import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import logoBanicol from "@/assets/logo-banicol.png";
import xptnovaLogo from "@/assets/xptnova-light.svg";

const LoginPage = () => {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (login(user, pass)) {
      navigate("/", { replace: true });
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-primary px-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <img src={logoBanicol} alt="Banicol" className="h-14 w-auto mb-4 invert" />
          <span className="text-xs font-sans tracking-[0.15em] uppercase text-primary-foreground/60">
            Sistema Operativo · IA
          </span>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-lg border border-border/20 bg-primary-foreground/5 backdrop-blur-sm p-8 space-y-5"
        >
          <div className="space-y-1.5">
            <label className="text-xs font-sans font-medium text-primary-foreground/70 uppercase tracking-wider">
              Usuario
            </label>
            <input
              value={user}
              onChange={(e) => { setUser(e.target.value); setError(false); }}
              className="w-full h-10 rounded-md border border-primary-foreground/15 bg-primary-foreground/5 px-3 text-sm text-primary-foreground placeholder:text-primary-foreground/30 focus:outline-none focus:ring-1 focus:ring-accent"
              autoFocus
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-sans font-medium text-primary-foreground/70 uppercase tracking-wider">
              Contraseña
            </label>
            <input
              type="password"
              value={pass}
              onChange={(e) => { setPass(e.target.value); setError(false); }}
              className="w-full h-10 rounded-md border border-primary-foreground/15 bg-primary-foreground/5 px-3 text-sm text-primary-foreground placeholder:text-primary-foreground/30 focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>

          {error && (
            <p className="text-xs text-destructive font-sans">
              Credenciales incorrectas. Intenta de nuevo.
            </p>
          )}

          <button
            type="submit"
            className="w-full h-10 rounded-md bg-accent text-accent-foreground font-sans font-medium text-sm hover:bg-accent/90 transition-colors"
          >
            Ingresar
          </button>
        </form>
      </div>

      <div className="fixed bottom-0 left-0 right-0 py-2.5 flex items-center justify-center gap-2 text-xs font-sans text-primary-foreground/40">
        <span>Presentado por</span>
        <a href="https://xptnova.com" target="_blank" rel="noopener noreferrer">
          <img src={xptnovaLogo} alt="XPT Nova" className="h-4 w-auto opacity-40 hover:opacity-70 transition-opacity" />
        </a>
      </div>
    </div>
  );
};

export default LoginPage;
