import { AppLayout } from '@/components/AppLayout';
import { SUBMISSOES, getStatusSubmissaoLabel } from '@/data/mockData';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function ValidacaoPage() {
  const pendentes = SUBMISSOES.filter((s) => s.status === 'pendente');
  const emAnalise = SUBMISSOES.filter((s) => s.status === 'em_analise');
  const concluidas = SUBMISSOES.filter((s) => ['aprovado', 'devolvido', 'rejeitado'].includes(s.status));

  const renderSubmissao = (sub: typeof SUBMISSOES[0]) => (
    <Card key={sub.id} className="shadow-card hover:shadow-lift transition-shadow">
      <CardContent className="p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono-id text-xs text-muted-foreground">{sub.meta_codigo}</span>
              <Badge variant="muted">{sub.secretaria_sigla}</Badge>
            </div>
            <h3 className="font-semibold text-foreground">{sub.meta_titulo}</h3>
            <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
              <span>Ponto Focal: {sub.ponto_focal_nome}</span>
              <span>Valor: <span className="font-semibold text-foreground">{sub.valor_reportado} {sub.indicador_unidade}</span></span>
              <span>Ref: {new Date(sub.data_referencia).toLocaleDateString('pt-BR')}</span>
              <span>Envio: {new Date(sub.criado_em).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>
          <Button asChild variant="secondary" size="sm">
            <Link to={`/validacao/${sub.id}`}>
              Revisar <ArrowRight className="h-3.5 w-3.5 ml-1" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Fila de Validação</h2>
          <p className="text-sm text-muted-foreground mt-1">Revisão de submissões dos pontos focais</p>
        </div>

        <Tabs defaultValue="pendentes">
          <TabsList>
            <TabsTrigger value="pendentes">
              Pendentes {pendentes.length > 0 && <Badge variant="destructive" className="ml-2 h-5 min-w-[20px] px-1 text-xs">{pendentes.length}</Badge>}
            </TabsTrigger>
            <TabsTrigger value="em_analise">Em Análise</TabsTrigger>
            <TabsTrigger value="concluidas">Concluídas</TabsTrigger>
          </TabsList>
          <TabsContent value="pendentes" className="space-y-3 mt-4">
            {pendentes.length === 0 ? (
              <p className="text-sm text-muted-foreground py-8 text-center">Nenhuma submissão pendente.</p>
            ) : pendentes.map(renderSubmissao)}
          </TabsContent>
          <TabsContent value="em_analise" className="space-y-3 mt-4">
            {emAnalise.length === 0 ? (
              <p className="text-sm text-muted-foreground py-8 text-center">Nenhuma submissão em análise.</p>
            ) : emAnalise.map(renderSubmissao)}
          </TabsContent>
          <TabsContent value="concluidas" className="space-y-3 mt-4">
            {concluidas.length === 0 ? (
              <p className="text-sm text-muted-foreground py-8 text-center">Nenhuma submissão concluída.</p>
            ) : concluidas.map(renderSubmissao)}
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
