import { AppLayout } from '@/components/AppLayout';
import { NOTIFICACOES } from '@/data/mockData';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, Clock, AlertTriangle, CheckCircle, RotateCcw, FileWarning, Mail } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const TIPO_ICONS: Record<string, React.ElementType> = {
  prazo_vencendo: Clock,
  prazo_vencido: AlertTriangle,
  nova_submissao: Mail,
  validacao_aprovada: CheckCircle,
  validacao_devolvida: RotateCcw,
  desvio_critico: FileWarning,
};

const TIPO_COLORS: Record<string, string> = {
  prazo_vencendo: 'text-warning bg-warning/10',
  prazo_vencido: 'text-destructive bg-destructive/10',
  nova_submissao: 'text-secondary bg-secondary/10',
  validacao_aprovada: 'text-success bg-success/10',
  validacao_devolvida: 'text-warning bg-warning/10',
  desvio_critico: 'text-destructive bg-destructive/10',
};

export default function AlertasPage() {
  const [notifications, setNotifications] = useState(NOTIFICACOES);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, lida: true })));
  };

  const markRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, lida: true } : n));
  };

  const unread = notifications.filter((n) => !n.lida).length;

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Central de Alertas</h2>
            <p className="text-sm text-muted-foreground mt-1">{unread} notificações não lidas</p>
          </div>
          {unread > 0 && (
            <Button variant="outline" size="sm" onClick={markAllRead}>
              Marcar todas como lidas
            </Button>
          )}
        </div>

        <div className="space-y-3">
          {notifications.map((notif) => {
            const Icon = TIPO_ICONS[notif.tipo] || Bell;
            return (
              <Card
                key={notif.id}
                className={cn('shadow-soft cursor-pointer transition-all', !notif.lida && 'border-l-4 border-l-secondary shadow-card')}
                onClick={() => markRead(notif.id)}
              >
                <CardContent className="p-4 flex items-start gap-3">
                  <div className={cn('h-9 w-9 rounded-lg flex items-center justify-center shrink-0', TIPO_COLORS[notif.tipo])}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className={cn('text-sm font-medium', !notif.lida ? 'text-foreground' : 'text-muted-foreground')}>
                        {notif.titulo}
                      </h4>
                      {!notif.lida && <span className="h-2 w-2 rounded-full bg-secondary shrink-0" />}
                    </div>
                    <p className="text-sm text-muted-foreground mt-0.5">{notif.mensagem}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(notif.criado_em).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
}
