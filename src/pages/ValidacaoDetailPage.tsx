import { useParams, useNavigate, Link } from 'react-router-dom';
import { AppLayout } from '@/components/AppLayout';
import { SUBMISSOES, METAS, HISTORICO_META1 } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ArrowLeft, CheckCircle, RotateCcw, XCircle, FileText } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

type Acao = 'aprovado' | 'devolvido' | 'rejeitado';

export default function ValidacaoDetailPage() {
  const { submissaoId } = useParams();
  const navigate = useNavigate();
  const sub = SUBMISSOES.find((s) => s.id === submissaoId);
  const [acao, setAcao] = useState<Acao | null>(null);
  const [comentario, setComentario] = useState('');
  const [loading, setLoading] = useState(false);

  if (!sub) {
    return (
      <AppLayout>
        <div className="text-center py-20 text-muted-foreground">Submissão não encontrada.</div>
      </AppLayout>
    );
  }

  const meta = METAS.find((m) => m.id === sub.meta_id);
  const historico = sub.meta_id === 'meta-1' ? HISTORICO_META1 : [
    { data: '2025-02-15', valor: Math.round((meta?.valor_atual || 0) * 0.5) },
    { data: '2025-03-15', valor: meta?.valor_atual || 0 },
  ];

  const needsComment = acao === 'devolvido' || acao === 'rejeitado';

  const handleConfirm = async () => {
    if (!acao) return;
    if (needsComment && !comentario.trim()) {
      toast.error('Comentário obrigatório para devolver ou rejeitar.');
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    const labels: Record<Acao, string> = { aprovado: 'aprovada', devolvido: 'devolvida', rejeitado: 'rejeitada' };
    toast.success(`Submissão ${labels[acao]} com sucesso.`);
    navigate('/validacao');
  };

  const ACOES = [
    { value: 'aprovado' as Acao, label: 'Aprovar', icon: CheckCircle, variant: 'success' as const },
    { value: 'devolvido' as Acao, label: 'Devolver', icon: RotateCcw, variant: 'warning' as const },
    { value: 'rejeitado' as Acao, label: 'Rejeitar', icon: XCircle, variant: 'destructive' as const },
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" size="icon">
            <Link to="/validacao"><ArrowLeft className="h-4 w-4" /></Link>
          </Button>
          <div>
            <span className="font-mono-id text-sm text-muted-foreground">{sub.meta_codigo}</span>
            <h2 className="text-xl font-bold text-foreground">Revisão de Submissão</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left: submission data */}
          <div className="lg:col-span-3 space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-base">Dados da Submissão</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground">Meta</p>
                    <p className="font-medium text-foreground">{sub.meta_titulo}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Secretaria</p>
                    <p className="font-medium text-foreground">{sub.secretaria_sigla}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Ponto Focal</p>
                    <p className="font-medium text-foreground">{sub.ponto_focal_nome}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Data de Referência</p>
                    <p className="font-medium text-foreground">{new Date(sub.data_referencia).toLocaleDateString('pt-BR')}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Valor Reportado</p>
                    <p className="text-xl font-bold text-foreground">{sub.valor_reportado} <span className="text-sm font-normal">{sub.indicador_unidade}</span></p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Data do Envio</p>
                    <p className="font-medium text-foreground">{new Date(sub.criado_em).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                </div>
                {sub.observacao && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Observação</p>
                    <p className="text-sm text-foreground bg-muted rounded-lg p-3">{sub.observacao}</p>
                  </div>
                )}
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Evidência</p>
                  <div className="flex items-center gap-2 border rounded-lg p-3">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">relatório_obras_mar2025.pdf (mock)</span>
                    <Button variant="ghost" size="sm" className="ml-auto text-secondary">Visualizar</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Mini chart */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-base">Histórico do Indicador</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={historico}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 90%)" />
                      <XAxis dataKey="data" tick={{ fontSize: 10 }} tickFormatter={(v) => new Date(v).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })} />
                      <YAxis tick={{ fontSize: 10 }} />
                      <Tooltip labelFormatter={(v) => new Date(v).toLocaleDateString('pt-BR')} />
                      <Line type="monotone" dataKey="valor" stroke="hsl(210, 60%, 45%)" strokeWidth={2} dot={{ r: 3 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right: validation panel */}
          <div className="lg:col-span-2">
            <Card className="shadow-card sticky top-24">
              <CardHeader>
                <CardTitle className="text-base">Painel de Validação</CardTitle>
                <Badge variant="warning">Pendente de Validação</Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm">Selecione a ação:</Label>
                  <div className="grid gap-2">
                    {ACOES.map((a) => (
                      <button
                        key={a.value}
                        type="button"
                        onClick={() => setAcao(a.value)}
                        className={`flex items-center gap-3 rounded-lg border p-3 text-sm font-medium transition-all text-left ${
                          acao === a.value
                            ? a.value === 'aprovado' ? 'border-success bg-success/5 text-success' :
                              a.value === 'devolvido' ? 'border-warning bg-warning/5 text-warning' :
                              'border-destructive bg-destructive/5 text-destructive'
                            : 'border-border hover:border-secondary/30 text-foreground'
                        }`}
                      >
                        <a.icon className="h-5 w-5" />
                        {a.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm">
                    Comentário {needsComment ? '*' : '(opcional)'}
                  </Label>
                  <Textarea
                    placeholder={needsComment ? 'Descreva o motivo da devolução/rejeição…' : 'Adicione um comentário…'}
                    value={comentario}
                    onChange={(e) => setComentario(e.target.value)}
                    rows={4}
                  />
                </div>

                <Button
                  className="w-full"
                  variant={acao === 'aprovado' ? 'success' : acao === 'rejeitado' ? 'destructive' : 'warning'}
                  disabled={!acao || loading}
                  onClick={handleConfirm}
                >
                  {loading ? 'Processando…' : 'Confirmar Ação'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
