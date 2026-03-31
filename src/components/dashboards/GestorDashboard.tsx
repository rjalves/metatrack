import { Target, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { METAS, calcularProgresso, getSemaforo } from '@/data/mockData';
import { StatusBadge, ProgressBar } from '@/components/StatusBadge';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

export function GestorDashboard() {
  const metas = METAS.filter((m) => m.status === 'ativa');
  const stats = {
    total: metas.length,
    verde: metas.filter((m) => getSemaforo(m) === 'verde').length,
    amarelo: metas.filter((m) => getSemaforo(m) === 'amarelo').length,
    vermelho: metas.filter((m) => getSemaforo(m) === 'vermelho').length,
  };

  const CARDS = [
    { label: 'Total de Metas', value: stats.total, icon: Target, variant: 'default' as const },
    { label: 'No Prazo', value: stats.verde, icon: CheckCircle, variant: 'success' as const },
    { label: 'Atenção', value: stats.amarelo, icon: AlertTriangle, variant: 'warning' as const },
    { label: 'Críticas', value: stats.vermelho, icon: XCircle, variant: 'destructive' as const },
  ];

  const VARIANT_STYLES = {
    default: 'border-l-4 border-l-primary',
    success: 'border-l-4 border-l-success',
    warning: 'border-l-4 border-l-warning',
    destructive: 'border-l-4 border-l-destructive',
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Painel Executivo</h2>
        <p className="text-sm text-muted-foreground mt-1">Visão consolidada das metas transversais do município</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {CARDS.map((card) => (
          <Card key={card.label} className={`shadow-card ${VARIANT_STYLES[card.variant]}`}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{card.label}</p>
                  <p className="text-3xl font-bold text-foreground mt-1">{card.value}</p>
                </div>
                <card.icon className="h-8 w-8 text-muted-foreground/40" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Metas table */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-lg">Metas Transversais</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-3 font-semibold text-muted-foreground">Código</th>
                  <th className="text-left py-3 px-3 font-semibold text-muted-foreground">Título</th>
                  <th className="text-left py-3 px-3 font-semibold text-muted-foreground">Secretaria(s)</th>
                  <th className="text-left py-3 px-3 font-semibold text-muted-foreground w-40">Progresso</th>
                  <th className="text-left py-3 px-3 font-semibold text-muted-foreground">Última Atualização</th>
                  <th className="text-left py-3 px-3 font-semibold text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {metas.map((meta, i) => {
                  const pct = calcularProgresso(meta);
                  const semaforo = getSemaforo(meta);
                  return (
                    <tr key={meta.id} className={i % 2 === 0 ? 'bg-accent/30' : ''}>
                      <td className="py-3 px-3">
                        <Link to={`/metas/${meta.id}`} className="font-mono-id text-xs font-medium text-secondary hover:underline">
                          {meta.codigo}
                        </Link>
                      </td>
                      <td className="py-3 px-3 font-medium text-foreground max-w-[250px]">
                        <Link to={`/metas/${meta.id}`} className="hover:text-secondary transition-colors">
                          {meta.titulo}
                        </Link>
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex flex-wrap gap-1">
                          {meta.secretarias.map((s) => (
                            <Badge key={s.id} variant="muted" className="text-xs">
                              {s.sigla}
                            </Badge>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <ProgressBar value={pct} status={semaforo} />
                      </td>
                      <td className="py-3 px-3 text-muted-foreground text-xs">
                        {new Date(meta.ultima_atualizacao).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="py-3 px-3">
                        <StatusBadge status={semaforo} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
