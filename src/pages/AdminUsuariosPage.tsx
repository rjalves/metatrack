import { AppLayout } from '@/components/AppLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, Pencil } from 'lucide-react';
import { toast } from 'sonner';

const USERS = [
  { id: '1', nome: 'Carlos Administrador', email: 'carlos.admin@recife.pe.gov.br', role: 'admin', secretaria: '—', ativo: true },
  { id: '2', nome: 'Ana Gestora', email: 'ana.gestora@recife.pe.gov.br', role: 'gestor', secretaria: '—', ativo: true },
  { id: '3', nome: 'Pedro Analista', email: 'pedro.analista@recife.pe.gov.br', role: 'analista', secretaria: '—', ativo: true },
  { id: '4', nome: 'Maria Ponto Focal', email: 'maria.focal@recife.pe.gov.br', role: 'focal', secretaria: 'SEINF', ativo: true },
  { id: '5', nome: 'João da Silva', email: 'joao.silva@recife.pe.gov.br', role: 'focal', secretaria: 'SESAU', ativo: true },
  { id: '6', nome: 'Roberto Santos', email: 'roberto.santos@recife.pe.gov.br', role: 'focal', secretaria: 'SEMOB', ativo: true },
];

const ROLE_LABELS: Record<string, string> = {
  admin: 'Administrador',
  gestor: 'Gestor',
  analista: 'Analista',
  focal: 'Ponto Focal',
};

export default function AdminUsuariosPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Gestão de Usuários</h2>
            <p className="text-sm text-muted-foreground mt-1">{USERS.length} usuários cadastrados</p>
          </div>
          <Button variant="secondary" onClick={() => toast.info('Formulário de convite será implementado no próximo sprint.')}>
            <Plus className="h-4 w-4 mr-2" />
            Convidar Usuário
          </Button>
        </div>

        <Card className="shadow-card">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Nome</th>
                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground">E-mail</th>
                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Perfil</th>
                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Secretaria</th>
                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Status</th>
                    <th className="text-right py-3 px-4 font-semibold text-muted-foreground">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {USERS.map((u, i) => (
                    <tr key={u.id} className={i % 2 === 0 ? 'bg-accent/30' : ''}>
                      <td className="py-3 px-4 font-medium text-foreground">{u.nome}</td>
                      <td className="py-3 px-4 text-muted-foreground text-xs">{u.email}</td>
                      <td className="py-3 px-4"><Badge variant="muted" className="text-xs">{ROLE_LABELS[u.role]}</Badge></td>
                      <td className="py-3 px-4 text-muted-foreground">{u.secretaria}</td>
                      <td className="py-3 px-4"><Badge variant="success" className="text-xs">Ativo</Badge></td>
                      <td className="py-3 px-4 text-right">
                        <Button variant="ghost" size="icon"><Pencil className="h-4 w-4" /></Button>
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
