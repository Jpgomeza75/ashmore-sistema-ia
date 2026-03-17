import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import LoginPage from "./pages/LoginPage";
import ComponentPage from "./pages/ComponentPage";
import DemoPage from "./pages/DemoPage";
import DdqPage from "./pages/DdqPage";
import Nivel2Page from "./pages/Nivel2Page";
import TesisPage from "./pages/TesisPage";
import BriefingPage from "./pages/BriefingPage";

function LoginRoute() {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to="/" replace />;
  return <LoginPage />;
}

function ProtectedLayout() {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <Outlet />;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginRoute />} />
          <Route element={<ProtectedLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/componente/:id" element={<ComponentPage />} />
            <Route path="/demo/ddq-respondedor" element={<DdqPage />} />
            <Route path="/demo/tesis-inversion" element={<TesisPage />} />
            <Route path="/demo/nivel2-fundraising" element={<Nivel2Page />} />
            <Route path="/demo/briefing-lp" element={<BriefingPage />} />
            <Route path="/demo/:demoId" element={<DemoPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
