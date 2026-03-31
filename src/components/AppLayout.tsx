import React, { useState } from 'react';
import { AppSidebar } from '@/components/AppSidebar';
import { Bell, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { NOTIFICACOES } from '@/data/mockData';
import { Link } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useAuth();
  const unreadCount = NOTIFICACOES.filter((n) => !n.lida).length;

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Desktop sidebar */}
      <div className="hidden md:block">
        <AppSidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 border-b bg-card flex items-center justify-between px-4 md:px-6 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            {/* Mobile menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-64">
                <AppSidebar collapsed={false} onToggle={() => {}} />
              </SheetContent>
            </Sheet>
            <h1 className="text-lg font-semibold text-foreground hidden sm:block">
              {getPageTitle(location.pathname)}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <Link to="/alertas">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 h-4 w-4 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </Button>
            </Link>
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-sm font-bold text-primary-foreground">
              {user?.nome.charAt(0)}
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

function getPageTitle(pathname: string): string {
  if (pathname.startsWith('/dashboard')) return 'Dashboard';
  if (pathname.startsWith('/validacao')) return 'Validação';
  if (pathname.startsWith('/metas')) return 'Metas';
  if (pathname.startsWith('/alertas')) return 'Alertas';
  if (pathname.startsWith('/relatorios')) return 'Relatórios';
  if (pathname.startsWith('/admin/metas')) return 'Gestão de Metas';
  if (pathname.startsWith('/admin/usuarios')) return 'Gestão de Usuários';
  if (pathname.startsWith('/admin/secretarias')) return 'Secretarias';
  if (pathname.startsWith('/perfil')) return 'Perfil';
  return 'MetaTrack';
}
