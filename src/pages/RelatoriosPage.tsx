import { AppLayout } from '@/components/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { FileText, Download } from 'lucide-react';
import { toast } from 'sonner';

export default function RelatoriosPage() {
  const TIPOS = [
    { value: 'geral', label: 'Relatório Geral de Metas' },
    { value: 'secretaria', label: 'Relatório por Secretaria' },
    { value: 'risco', label: 'Metas em Risco' },
    { value: 'historico', label: 'Histórico de Atualizações' },
  ];

  return (
    <AppLayout>
      <div className="space-y-6 max-w-2xl">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Relatórios</h2>
          <p className="text-sm text-muted-foreground mt-1">Geração de relatórios em PDF para monitoramento executivo</p>
        </div>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-base">Gerar Relatório</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Tipo de Relatório</Label>
              <Select defaultValue="geral">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {TIPOS.map((t) => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Período Início</Label>
                <Input type="date" defaultValue="2025-01-01" />
              </div>
              <div className="space-y-2">
                <Label>Período Fim</Label>
                <Input type="date" defaultValue="2025-03-31" />
              </div>
            </div>
            <Button variant="secondary" className="w-full" onClick={() => toast.info('Gerando relatório… (funcionalidade será implementada com Edge Functions)')}>
              <FileText className="h-4 w-4 mr-2" />
              Gerar PDF
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-base">Relatórios Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {['Relatório Geral — Mar/2025', 'Metas em Risco — Fev/2025'].map((name) => (
                <div key={name} className="flex items-center justify-between border rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">{name}</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
