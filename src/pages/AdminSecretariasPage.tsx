import { AppLayout } from '@/components/AppLayout';
import { SECRETARIAS } from '@/data/mockData';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, Pencil } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminSecretariasPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Secretarias</h2>
            <p className="text-sm text-muted-foreground mt-1">Cadastro de secretarias e pontos focais</p>
          </div>
          <Button variant="secondary" onClick={() => toast.info('Formulário será implementado no próximo sprint.')}>
            <Plus className="h-4 w-4 mr-2" />
            Nova Secretaria
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SECRETARIAS.map((sec) => (
            <Card key={sec.id} className="shadow-card hover:shadow-lift transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: sec.cor_identidade }} />
                      <Badge variant="muted" className="text-xs font-bold">{sec.sigla}</Badge>
                    </div>
                    <h3 className="font-semibold text-foreground text-sm">{sec.nome}</h3>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Pencil className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
