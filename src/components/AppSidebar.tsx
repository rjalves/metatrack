import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Target,
  ClipboardCheck,
  Bell,
  FileText,
  Settings,
  Users,
  Building2,
  LogOut,
  ChevronLeft,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { NOTIFICACOES } from '@/data/mockData';

interface AppSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const NAV_ITEMS = [
  { title: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, roles: ['admin', 'gestor', 'analista', 'focal'] },
  { title: 'Metas', href: '/metas', icon: Target, roles: ['admin', 'gestor', 'analista', 'focal'] },
  { title: 'Validação', href: '/validacao', icon: ClipboardCheck, roles: ['admin', 'analista'] },
  { title: 'Alertas', href: '/alertas', icon: Bell, roles: ['admin', 'gestor', 'analista', 'focal'] },
  { title: 'Relatórios', href: '/relatorios', icon: FileText, roles: ['admin', 'gestor'] },
];

const ADMIN_ITEMS = [
  { title: 'Metas', href: '/admin/metas', icon: Settings, roles: ['admin'] },
  { title: 'Usuários', href: '/admin/usuarios', icon: Users, roles: ['admin'] },
  { title: 'Secretarias', href: '/admin/secretarias', icon: Building2, roles: ['admin'] },
];

export function AppSidebar({ collapsed, onToggle }: AppSidebarProps) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const unreadCount = NOTIFICACOES.filter((n) => !n.lida).length;

  if (!user) return null;

  const navItems = NAV_ITEMS.filter((i) => i.roles.includes(user.role));
  const adminItems = ADMIN_ITEMS.filter((i) => i.roles.includes(user.role));

  return (
    <aside
      className={cn(
        'flex flex-col bg-sidebar text-sidebar-foreground h-screen sticky top-0 transition-all duration-300 z-30',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Logo */}
      <div className="flex items-center h-16 px-4 border-b border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <Target className="h-7 w-7 text-sidebar-foreground" />
            <span className="text-lg font-bold tracking-tight text-sidebar-foreground">MetaTrack</span>
          </div>
        )}
        {collapsed && <Target className="h-7 w-7 mx-auto text-sidebar-foreground" />}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const active = location.pathname === item.href || location.pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors relative',
                active
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                  : 'text-sidebar-muted hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
              )}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span>{item.title}</span>}
              {item.href === '/alertas' && unreadCount > 0 && (
                <span className={cn(
                  'bg-destructive text-destructive-foreground text-xs font-bold rounded-full flex items-center justify-center',
                  collapsed ? 'absolute -top-1 -right-1 h-4 w-4 text-[10px]' : 'ml-auto h-5 min-w-[20px] px-1'
                )}>
                  {unreadCount}
                </span>
              )}
            </Link>
          );
        })}

        {adminItems.length > 0 && (
          <>
            <div className={cn('pt-4 pb-2', collapsed ? 'px-2' : 'px-3')}>
              {!collapsed && (
                <span className="text-xs font-semibold uppercase tracking-wider text-sidebar-muted">
                  Administração
                </span>
              )}
              {collapsed && <div className="border-t border-sidebar-border" />}
            </div>
            {adminItems.map((item) => {
              const active = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                    active
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                      : 'text-sidebar-muted hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
                  )}
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  {!collapsed && <span>{item.title}</span>}
                </Link>
              );
            })}
          </>
        )}
      </nav>

      {/* Footer */}
      <div className="border-t border-sidebar-border p-3 space-y-2">
        {!collapsed && (
          <div className="flex items-center gap-3 px-2 py-1">
            <div className="h-8 w-8 rounded-full bg-sidebar-accent flex items-center justify-center text-sm font-bold text-sidebar-accent-foreground">
              {user.nome.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate text-sidebar-foreground">{user.nome}</p>
              <p className="text-xs truncate text-sidebar-muted capitalize">{user.role}</p>
            </div>
          </div>
        )}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="text-sidebar-muted hover:text-sidebar-foreground hover:bg-sidebar-accent/50 shrink-0"
          >
            <ChevronLeft className={cn('h-4 w-4 transition-transform', collapsed && 'rotate-180')} />
          </Button>
          {!collapsed && (
            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              className="text-sidebar-muted hover:text-sidebar-foreground hover:bg-sidebar-accent/50 flex-1 justify-start gap-2"
            >
              <LogOut className="h-4 w-4" />
              Sair
            </Button>
          )}
        </div>
      </div>
    </aside>
  );
}
