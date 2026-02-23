import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ComponentPage from "./pages/ComponentPage";
import InteligenciaPage from "./pages/InteligenciaPage";
import InteligenciaFase1 from "./pages/InteligenciaFase1";
import InteligenciaFase2 from "./pages/InteligenciaFase2";
import DealSpotterCase from "./pages/DealSpotterCase";
import PrePitchCase from "./pages/PrePitchCase";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/componente/inteligencia" element={<InteligenciaPage />} />
          <Route path="/componente/inteligencia/fase-1" element={<InteligenciaFase1 />} />
          <Route path="/componente/inteligencia/fase-1/deal-spotter/avidanti-patria" element={<DealSpotterCase />} />
          <Route path="/componente/inteligencia/fase-1/pre-pitch/geopark-frontera" element={<PrePitchCase />} />
          <Route path="/componente/inteligencia/fase-2" element={<InteligenciaFase2 />} />
          <Route path="/componente/:id" element={<ComponentPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
