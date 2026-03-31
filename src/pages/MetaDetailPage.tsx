import { useParams, Link } from 'react-router-dom';
import { AppLayout } from '@/components/AppLayout';
import { METAS, HISTORICO_META1, calcularProgresso, getSemaforo, SUBMISSOES } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StatusBadge, ProgressBar } from '@/components/StatusBadge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, User, Target } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, CartesianGrid } from 'recharts';

export default function MetaDetailPage() {
  const { id } = useParams();
  const meta = METAS.find((m) => m.id === id);

  if (!meta) {
    return (
      <AppLayout>
        <div className="text-center py-20 text-muted-foreground">Meta não encontrada.</div>
      </AppLayout>
    );
  }

  const pct = calcularProgresso(meta);
  const semaforo = getSemaforo(meta);
  const historico = id === 'meta-1' ? HISTORICO_META1 : [
    { data: '2025-01-15', valor: Math.round(meta.valor_atual * 0.3) },
    { data: '2025-02-15', valor: Math.round(meta.valor_atual * 0.6) },
    { data: '2025-03-15', valor: meta.valor_atual },
  ];

  const submissoes = SUBMISSOES.filter((s) => s.meta_id === meta.id);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" size="icon">
            <Link to="/metas"><ArrowLeft className="h-4 w-4" /></Link>
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono-id text-sm text-muted-foreground">{meta.codigo}</span>
              <StatusBadge status={semaforo} />
            </div>
            <h2 className="text-xl font-bold text-foreground">{meta.titulo}</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Info + Chart */}
          <div className="lg:col-span-2 space-y-6">
            {/* Info cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Card className="shadow-soft">
                <CardContent className="p-4 text-center">
                  <p className="text-xs text-muted-foreground">Meta Prevista</p>
                  <p className="text-xl font-bold text-foreground">{meta.meta_prevista} <span className="text-sm font-normal">{meta.indicador_unidade}</span></p>
                </CardContent>
              </Card>
              <Card className="shadow-soft">
                <CardContent className="p-4 text-center">
                  <p className="text-xs text-muted-foreground">Valor Atual</p>
                  <p className="text-xl font-bold text-foreground">{meta.valor_atual} <span className="text-sm font-normal">{meta.indicador_unidade}</span></p>
                </CardContent>
              </Card>
              <Card className="shadow-soft">
                <CardContent className="p-4 text-center">
                  <p className="text-xs text-muted-foreground">Progresso</p>
                  <p className="text-xl font-bold text-foreground">{pct}%</p>
                </CardContent>
              </Card>
              <Card className="shadow-soft">
                <CardContent className="p-4 text-center">
                  <p className="text-xs text-muted-foreground">Prazo</p>
                  <p className="text-sm font-semibold text-foreground">{new Date(meta.prazo_final).toLocaleDateString('pt-BR')}</p>
                </CardContent>
              </Card>
            </div>

            <ProgressBar value={pct} status={semaforo} />

            {/* Chart */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-base">Histórico do Indicador</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={historico}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 90%)" />
                      <XAxis dataKey="data" tick={{ fontSize: 11 }} tickFormatter={(v) => new Date(v).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })} />
                      <YAxis tick={{ fontSize: 11 }} />
                      <Tooltip
                        labelFormatter={(v) => new Date(v).toLocaleDateString('pt-BR')}
                        formatter={(v: number) => [`${v} ${meta.indicador_unidade}`, meta.indicador_nome]}
                      />
                      <ReferenceLine y={meta.meta_prevista} stroke="hsl(210, 53%, 23%)" strokeDasharray="5 5" label={{ value: 'Meta', fill: 'hsl(215, 14%, 46%)', fontSize: 11 }} />
                      <Line type="monotone" dataKey="valor" stroke="hsl(210, 60%, 45%)" strokeWidth={2} dot={{ r: 4, fill: 'hsl(210, 60%, 45%)' }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right: Meta info + Submissions */}
          <div className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-base">Informações</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <p className="text-muted-foreground">{meta.descricao}</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Target className="h-4 w-4" />
                    <span>{meta.indicador_nome} ({meta.indicador_unidade})</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Ciclo: a cada {meta.ciclo_atualizacao} dias</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span>Analista: {meta.analista_nome}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {meta.secretarias.map((s) => (
                    <Badge key={s.id} variant="muted">{s.nome}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-base">Submissões Recentes</CardTitle>
              </CardHeader>
              <CardContent>
                {submissoes.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Nenhuma submissão registrada.</p>
                ) : (
                  <div className="space-y-3">
                    {submissoes.map((sub) => (
                      <div key={sub.id} className="border rounded-lg p-3 space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-foreground">{sub.valor_reportado} {sub.indicador_unidade}</span>
                          <Badge variant={sub.status === 'aprovado' ? 'success' : sub.status === 'pendente' ? 'warning' : 'muted'} className="text-xs capitalize">
                            {sub.status.replace('_', ' ')}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{sub.ponto_focal_nome} — {new Date(sub.criado_em).toLocaleDateString('pt-BR')}</p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
