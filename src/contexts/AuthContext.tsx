import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

const USER_KEY = "ashmore_user";

const USERS = [
  { email: "jp@xptnova.com", password: "Xptn@2026" },
  { email: "ana.jimenez@ashmoregroup.com.co", password: "Ana@2026" },
  { email: "benjamin.greiffenstein@ashmoregroup.com.co", password: "Ben@2026" },
  { email: "bogotamr1@ashmoregroup.com", password: "Bog@2026" },
  { email: "jack.von@ashmoregroup.com.co", password: "Jack@2026" },
  { email: "jaime.pedroza@ashmoregroup.com.co", password: "Jaime@2026" },
  { email: "juan.cote@ashmoregroup.com.co", password: "Cote@2026" },
  { email: "juanfernando.salazar@ashmoregroup.com.co", password: "Jfs@2026" },
  { email: "juanpablo.fonseca@ashmoregroup.com.co", password: "Jpf@2026" },
  { email: "juanpablo.rozo@ashmoregroup.com.co", password: "Jpr@2026" },
  { email: "juliana.paez@ashmoregroup.com.co", password: "Juli@2026" },
  { email: "lucas.marulanda@ashmoregroup.com.co", password: "Lucas@2026" },
  { email: "yuliana.otalora@ashmoregroup.com.co", password: "Yuli@2026" },
];

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(USER_KEY);
    setIsAuthenticated(!!stored);
  }, []);

  const login = (email: string, password: string): boolean => {
    const user = USERS.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (user) {
      localStorage.setItem(USER_KEY, user.email);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem(USER_KEY);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
