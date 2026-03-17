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
import DdFinancieroPage from "./pages/DdFinancieroPage";
import Nivel2DDPage from "./pages/Nivel2DDPage";
import TraductorRegulatorioPage from "./pages/TraductorRegulatorioPage";
import PreparadorJuntasPage from "./pages/PreparadorJuntasPage";
import ReporteLpPage from "./pages/ReporteLpPage";
import Nivel2PortafolioPage from "./pages/Nivel2PortafolioPage";

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
            <Route path="/demo/dd-financiero" element={<DdFinancieroPage />} />
            <Route path="/demo/nivel2-dd" element={<Nivel2DDPage />} />
            <Route path="/demo/traductor-regulatorio" element={<TraductorRegulatorioPage />} />
            <Route path="/demo/preparador-juntas" element={<PreparadorJuntasPage />} />
            <Route path="/demo/reporte-lp" element={<ReporteLpPage />} />
            <Route path="/demo/nivel2-portafolio" element={<Nivel2PortafolioPage />} />
            <Route path="/demo/:demoId" element={<DemoPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
