import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import MetasPage from "./pages/MetasPage";
import MetaDetailPage from "./pages/MetaDetailPage";
import MetaUpdatePage from "./pages/MetaUpdatePage";
import ValidacaoPage from "./pages/ValidacaoPage";
import ValidacaoDetailPage from "./pages/ValidacaoDetailPage";
import AlertasPage from "./pages/AlertasPage";
import RelatoriosPage from "./pages/RelatoriosPage";
import AdminMetasPage from "./pages/AdminMetasPage";
import AdminUsuariosPage from "./pages/AdminUsuariosPage";
import AdminSecretariasPage from "./pages/AdminSecretariasPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
            <Route path="/metas" element={<ProtectedRoute><MetasPage /></ProtectedRoute>} />
            <Route path="/metas/:id" element={<ProtectedRoute><MetaDetailPage /></ProtectedRoute>} />
            <Route path="/metas/:id/atualizar" element={<ProtectedRoute allowedRoles={['focal']}><MetaUpdatePage /></ProtectedRoute>} />
            <Route path="/validacao" element={<ProtectedRoute allowedRoles={['analista', 'admin']}><ValidacaoPage /></ProtectedRoute>} />
            <Route path="/validacao/:submissaoId" element={<ProtectedRoute allowedRoles={['analista', 'admin']}><ValidacaoDetailPage /></ProtectedRoute>} />
            <Route path="/alertas" element={<ProtectedRoute><AlertasPage /></ProtectedRoute>} />
            <Route path="/relatorios" element={<ProtectedRoute allowedRoles={['gestor', 'admin']}><RelatoriosPage /></ProtectedRoute>} />
            <Route path="/admin/metas" element={<ProtectedRoute allowedRoles={['admin']}><AdminMetasPage /></ProtectedRoute>} />
            <Route path="/admin/usuarios" element={<ProtectedRoute allowedRoles={['admin']}><AdminUsuariosPage /></ProtectedRoute>} />
            <Route path="/admin/secretarias" element={<ProtectedRoute allowedRoles={['admin']}><AdminSecretariasPage /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
