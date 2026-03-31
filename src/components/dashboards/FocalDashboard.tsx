import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { METAS, SUBMISSOES, calcularProgresso, getSemaforo } from '@/data/mockData';
import { ProgressBar } from '@/components/StatusBadge';
import { Link } from 'react-router-dom';
import { AlertTriangle, ArrowRight } from 'lucide-react';

export function FocalDashboard() {
  // Focal sees metas for SEINF (sec-1)
  const myMetas = METAS.filter((m) => m.secretarias.some((s) => s.id === 'sec-1'));

  const getMetaStatus = (metaId: string) => {
    const subs = SUBMISSOES.filter((s) => s.meta_id === metaId);
    const latest = subs.sort((a, b) => new Date(b.criado_em).getTime() - new Date(a.criado_em).getTime())[0];
    if (!latest) return { label: 'Aguardando Envio', variant: 'warning' as const, canUpdate: true };
    if (latest.status === 'pendente') return { label: 'Em Validação', variant: 'secondary' as const, canUpdate: false };
    if (latest.status === 'em_analise') return { label: 'Em Análise', variant: 'secondary' as const, canUpdate: false };
    if (latest.status === 'aprovado') return { label: 'Aprovado', variant: 'success' as const, canUpdate: true };
    if (latest.status === 'devolvido') return { label: 'Devolvido', variant: 'destructive' as const, canUpdate: true };
    return { label: 'Aguardando Envio', variant: 'warning' as const, canUpdate: true };
  };

  const hasOverdue = myMetas.some((m) => {
    const daysSince = Math.floor((Date.now() - new Date(m.ultima_atualizacao).getTime()) / 86400000);
    return daysSince > m.ciclo_atualizacao;
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Minhas Metas</h2>
        <p className="text-sm text-muted-foreground mt-1">Secretaria de Infraestrutura — SEINF</p>
      </div>

      {hasOverdue && (
        <div className="flex items-center gap-3 rounded-lg border border-warning/30 bg-warning/5 p-4">
          <AlertTriangle className="h-5 w-5 text-warning shrink-0" />
          <p className="text-sm text-foreground">
            Você tem metas com <span className="font-semibold">atualização pendente</span>. Atualize-as para evitar alertas.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {myMetas.map((meta) => {
          const pct = calcularProgresso(meta);
          const semaforo = getSemaforo(meta);
          const status = getMetaStatus(meta.id);

          return (
            <Card key={meta.id} className="shadow-card hover:shadow-lift transition-shadow">
              <CardContent className="p-5 space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="font-mono-id text-xs text-muted-foreground">{meta.codigo}</span>
                    <h3 className="font-semibold text-foreground mt-0.5 leading-tight">{meta.titulo}</h3>
                  </div>
                  <Badge variant={status.variant}>{status.label}</Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{meta.indicador_nome}</span>
                    <span className="font-medium text-foreground">
                      {meta.valor_atual} / {meta.meta_prevista} {meta.indicador_unidade}
                    </span>
                  </div>
                  <ProgressBar value={pct} status={semaforo} />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs text-muted-foreground">
                    Última atualização: {new Date(meta.ultima_atualizacao).toLocaleDateString('pt-BR')}
                  </span>
                  {status.canUpdate && (
                    <Button asChild variant="secondary" size="sm">
                      <Link to={`/metas/${meta.id}/atualizar`}>
                        Atualizar <ArrowRight className="h-3.5 w-3.5 ml-1" />
                      </Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
