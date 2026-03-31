import { useAuth } from '@/contexts/AuthContext';
import { GestorDashboard } from '@/components/dashboards/GestorDashboard';
import { FocalDashboard } from '@/components/dashboards/FocalDashboard';
import { AppLayout } from '@/components/AppLayout';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <AppLayout>
      {user?.role === 'focal' ? <FocalDashboard /> : <GestorDashboard />}
    </AppLayout>
  );
}
