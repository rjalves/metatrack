import { AppLayout } from '@/components/AppLayout';
import { METAS, SECRETARIAS } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, MoreHorizontal } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminMetasPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Gestão de Metas</h2>
            <p className="text-sm text-muted-foreground mt-1">Cadastro e configuração de metas transversais</p>
          </div>
          <Button variant="secondary" onClick={() => toast.info('Formulário de criação será implementado no próximo sprint.')}>
            <Plus className="h-4 w-4 mr-2" />
            Nova Meta
          </Button>
        </div>

        <Card className="shadow-card">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Código</th>
                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Título</th>
                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Secretarias</th>
                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Status</th>
                    <th className="text-right py-3 px-4 font-semibold text-muted-foreground">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {METAS.map((meta, i) => (
                    <tr key={meta.id} className={i % 2 === 0 ? 'bg-accent/30' : ''}>
                      <td className="py-3 px-4 font-mono-id text-xs">{meta.codigo}</td>
                      <td className="py-3 px-4 font-medium text-foreground">{meta.titulo}</td>
                      <td className="py-3 px-4">
                        <div className="flex gap-1">{meta.secretarias.map((s) => <Badge key={s.id} variant="muted" className="text-xs">{s.sigla}</Badge>)}</div>
                      </td>
                      <td className="py-3 px-4"><Badge variant="success" className="text-xs capitalize">{meta.status}</Badge></td>
                      <td className="py-3 px-4 text-right">
                        <Button variant="ghost" size="icon" onClick={() => toast.info('Edição será implementada no próximo sprint.')}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
