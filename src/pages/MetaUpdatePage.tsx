import { useParams, useNavigate, Link } from 'react-router-dom';
import { AppLayout } from '@/components/AppLayout';
import { METAS } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ProgressBar } from '@/components/StatusBadge';
import { calcularProgresso, getSemaforo } from '@/data/mockData';
import { ArrowLeft, Upload } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export default function MetaUpdatePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const meta = METAS.find((m) => m.id === id);
  const [valor, setValor] = useState('');
  const [dataRef, setDataRef] = useState('');
  const [observacao, setObservacao] = useState('');
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!meta) {
    return (
      <AppLayout>
        <div className="text-center py-20 text-muted-foreground">Meta não encontrada.</div>
      </AppLayout>
    );
  }

  const pct = calcularProgresso(meta);
  const semaforo = getSemaforo(meta);

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setShowConfirm(false);
    toast.success('Atualização enviada! Você receberá um e-mail quando for validada.');
    navigate('/dashboard');
  };

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" size="icon">
            <Link to="/dashboard"><ArrowLeft className="h-4 w-4" /></Link>
          </Button>
          <div>
            <span className="font-mono-id text-sm text-muted-foreground">{meta.codigo}</span>
            <h2 className="text-xl font-bold text-foreground">Atualizar Meta</h2>
          </div>
        </div>

        {/* Meta info header */}
        <Card className="shadow-soft">
          <CardContent className="p-5 space-y-3">
            <h3 className="font-semibold text-foreground">{meta.titulo}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
              <div>
                <p className="text-muted-foreground text-xs">Indicador</p>
                <p className="font-medium text-foreground">{meta.indicador_nome} ({meta.indicador_unidade})</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Meta Prevista</p>
                <p className="font-medium text-foreground">{meta.meta_prevista} {meta.indicador_unidade}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Linha de Base</p>
                <p className="font-medium text-foreground">{meta.linha_base} {meta.indicador_unidade}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Último Valor</p>
                <p className="font-medium text-foreground">{meta.valor_atual} {meta.indicador_unidade}</p>
              </div>
            </div>
            <ProgressBar value={pct} status={semaforo} />
          </CardContent>
        </Card>

        {/* Form */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-base">Preencher Atualização</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); setShowConfirm(true); }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="valor">Valor atual do indicador *</Label>
                  <Input
                    id="valor"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder={`Ex: 78.5 (em ${meta.indicador_unidade})`}
                    value={valor}
                    onChange={(e) => setValor(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="data">Data de referência *</Label>
                  <Input
                    id="data"
                    type="date"
                    max={new Date().toISOString().split('T')[0]}
                    value={dataRef}
                    onChange={(e) => setDataRef(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="obs">Observações</Label>
                <Textarea
                  id="obs"
                  placeholder="Descreva o contexto do valor informado, dificuldades encontradas, etc."
                  maxLength={1000}
                  rows={4}
                  value={observacao}
                  onChange={(e) => setObservacao(e.target.value)}
                />
                <p className="text-xs text-muted-foreground text-right">{observacao.length}/1000</p>
              </div>

              <div className="space-y-2">
                <Label>Evidência * (PDF, JPG, PNG ou XLSX — máx. 10MB)</Label>
                <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-secondary/50 transition-colors cursor-pointer"
                  onClick={() => document.getElementById('file-input')?.click()}>
                  <input
                    id="file-input"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png,.xlsx"
                    className="hidden"
                    onChange={(e) => setArquivo(e.target.files?.[0] || null)}
                  />
                  {arquivo ? (
                    <div className="space-y-1">
                      <Upload className="h-6 w-6 mx-auto text-secondary" />
                      <p className="text-sm font-medium text-foreground">{arquivo.name}</p>
                      <p className="text-xs text-muted-foreground">{(arquivo.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <Upload className="h-6 w-6 mx-auto text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Clique ou arraste o arquivo aqui</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Button type="button" variant="outline" className="flex-1" onClick={() => toast.info('Rascunho salvo.')}>
                  Salvar Rascunho
                </Button>
                <Button type="submit" variant="secondary" className="flex-1">
                  Enviar para Validação
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmar envio</DialogTitle>
              <DialogDescription>
                Após o envio, não será possível editar esta atualização. Deseja continuar?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowConfirm(false)}>Cancelar</Button>
              <Button variant="secondary" onClick={handleSubmit} disabled={loading}>
                {loading ? 'Enviando…' : 'Confirmar Envio'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}
