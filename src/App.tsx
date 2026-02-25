import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import ComponentPage from "./pages/ComponentPage";
import InteligenciaPage from "./pages/InteligenciaPage";
import InteligenciaFase1 from "./pages/InteligenciaFase1";
import InteligenciaFase2 from "./pages/InteligenciaFase2";
import DealSpotterCase from "./pages/DealSpotterCase";
import PrePitchCase from "./pages/PrePitchCase";
import AnalisisPage from "./pages/AnalisisPage";
import AnalisisFase1 from "./pages/AnalisisFase1";
import AnalisisFase2 from "./pages/AnalisisFase2";
import AuditorCase from "./pages/AuditorCase";
import ModeloPresentacionCase from "./pages/ModeloPresentacionCase";
import DesarrolloComercialPage from "./pages/DesarrolloComercialPage";
import PitchCapturaMandatoPage from "./pages/PitchCapturaMandatoPage";
import EstructuracionDisenoValorPage from "./pages/EstructuracionDisenoValorPage";
import NarrativaDocumentacionPage from "./pages/NarrativaDocumentacionPage";
import EjecucionGestionProcesoPage from "./pages/EjecucionGestionProcesoPage";
import ControlCalidadGobernanzaPage from "./pages/ControlCalidadGobernanzaPage";
import MemoriaCorporativaPage from "./pages/MemoriaCorporativaPage";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import Footer from "./components/Footer";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

const LoginRoute = () => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to="/" replace />;
  return <LoginPage />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginRoute />} />
            <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
            <Route path="/componente/inteligencia" element={<ProtectedRoute><InteligenciaPage /></ProtectedRoute>} />
            <Route path="/componente/inteligencia/fase-1" element={<ProtectedRoute><InteligenciaFase1 /></ProtectedRoute>} />
            <Route path="/componente/inteligencia/fase-1/deal-spotter/avidanti-patria" element={<ProtectedRoute><DealSpotterCase /></ProtectedRoute>} />
            <Route path="/componente/inteligencia/fase-1/pre-pitch/geopark-frontera" element={<ProtectedRoute><PrePitchCase /></ProtectedRoute>} />
            <Route path="/componente/inteligencia/fase-2" element={<ProtectedRoute><InteligenciaFase2 /></ProtectedRoute>} />
            <Route path="/componente/analisis" element={<ProtectedRoute><AnalisisPage /></ProtectedRoute>} />
            <Route path="/componente/analisis/fase-1" element={<ProtectedRoute><AnalisisFase1 /></ProtectedRoute>} />
            <Route path="/componente/analisis/fase-1/auditor/demo-en-vivo" element={<ProtectedRoute><AuditorCase /></ProtectedRoute>} />
            <Route path="/componente/analisis/fase-1/modelo-a-presentacion/demo-en-vivo" element={<ProtectedRoute><ModeloPresentacionCase /></ProtectedRoute>} />
            <Route path="/componente/analisis/fase-2" element={<ProtectedRoute><AnalisisFase2 /></ProtectedRoute>} />
            <Route path="/componente/desarrollo" element={<ProtectedRoute><DesarrolloComercialPage /></ProtectedRoute>} />
            <Route path="/componente/pitch" element={<ProtectedRoute><PitchCapturaMandatoPage /></ProtectedRoute>} />
            <Route path="/componente/estructuracion" element={<ProtectedRoute><EstructuracionDisenoValorPage /></ProtectedRoute>} />
            <Route path="/componente/narrativa" element={<ProtectedRoute><NarrativaDocumentacionPage /></ProtectedRoute>} />
            <Route path="/componente/ejecucion" element={<ProtectedRoute><EjecucionGestionProcesoPage /></ProtectedRoute>} />
            <Route path="/componente/control" element={<ProtectedRoute><ControlCalidadGobernanzaPage /></ProtectedRoute>} />
            <Route path="/componente/memoria" element={<ProtectedRoute><MemoriaCorporativaPage /></ProtectedRoute>} />
            <Route path="/componente/:id" element={<ProtectedRoute><ComponentPage /></ProtectedRoute>} />
            <Route path="*" element={<ProtectedRoute><NotFound /></ProtectedRoute>} />
          </Routes>
          <Footer />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
