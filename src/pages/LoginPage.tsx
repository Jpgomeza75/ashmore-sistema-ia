import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      navigate("/", { replace: true });
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0A2240] px-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <span
            className="font-serif text-3xl font-bold text-[#F8F5F0] mb-4"
          >
            Ashmore
          </span>
          <span className="text-xs font-sans tracking-[0.15em] uppercase text-[#F8F5F0]/70">
            Sistema Operativo · IA
          </span>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-lg border border-[#143050] bg-white/5 backdrop-blur-sm p-8 space-y-5"
        >
          <div className="space-y-1.5">
            <label className="text-xs font-sans font-medium text-[#F8F5F0]/80 uppercase tracking-wider">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              className="w-full h-10 rounded-md border border-[#143050] bg-white/10 px-3 text-sm text-[#F8F5F0] placeholder:text-[#F8F5F0]/40 focus:outline-none focus:ring-1 focus:ring-[#B8860B]"
              placeholder="Ingresa la contraseña"
              autoFocus
            />
          </div>

          {error && (
            <p className="text-xs text-red-300 font-sans">
              Contraseña incorrecta. Intenta de nuevo.
            </p>
          )}

          <button
            type="submit"
            className="w-full h-10 rounded-md bg-[#B8860B] text-white font-sans font-medium text-sm hover:bg-[#B8860B]/90 transition-colors"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}
