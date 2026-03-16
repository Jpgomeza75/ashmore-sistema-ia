import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import logoAshmore from "@/assets/logo-ashmore.svg";
import logoXptnova from "@/assets/xptnova-light.svg";

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
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ background: "#0A2240" }}
    >
      <div className="w-full max-w-sm flex flex-col items-center">
        {/* Logo Ashmore arriba del card */}
        <img
          src={logoAshmore}
          alt="Ashmore"
          className="mb-6"
          style={{ width: 120 }}
        />

        {/* Card */}
        <form
          onSubmit={handleSubmit}
          className="w-full rounded p-8 space-y-5"
          style={{
            background: "#143050",
            border: "1px solid #B8860B",
          }}
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
              className="w-full h-10 bg-transparent px-0 text-sm text-[#F8F5F0] placeholder:text-[#F8F5F0]/40 focus:outline-none border-0 border-b border-[#B8860B] rounded-none"
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
            className="w-full h-10 rounded font-sans font-bold text-sm transition-colors hover:opacity-90"
            style={{
              background: "#B8860B",
              color: "#0A2240",
            }}
          >
            Ingresar
          </button>
        </form>

        {/* Logo XPTNova abajo del card */}
        <img
          src={logoXptnova}
          alt="XPTNova"
          className="mt-8 opacity-50"
          style={{ width: 80 }}
        />
      </div>
    </div>
  );
}
