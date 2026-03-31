import { AppLayout } from '@/components/AppLayout';
import { METAS, calcularProgresso, getSemaforo } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StatusBadge, ProgressBar } from '@/components/StatusBadge';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useState } from 'react';

export default function MetasPage() {
  const [search, setSearch] = useState('');

  const filtered = METAS.filter(
    (m) =>
      m.titulo.toLowerCase().includes(search.toLowerCase()) ||
      m.codigo.toLowerCase().includes(search.toLowerCase()) ||
      m.secretarias.some((s) => s.sigla.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Metas Transversais</h2>
            <p className="text-sm text-muted-foreground mt-1">{METAS.length} metas cadastradas</p>
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por título, código ou sigla…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <div className="grid gap-4">
          {filtered.map((meta) => {
            const pct = calcularProgresso(meta);
            const semaforo = getSemaforo(meta);
            return (
              <Link key={meta.id} to={`/metas/${meta.id}`}>
                <Card className="shadow-card hover:shadow-lift transition-shadow cursor-pointer">
                  <CardContent className="p-5">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono-id text-xs text-muted-foreground">{meta.codigo}</span>
                          <StatusBadge status={semaforo} />
                        </div>
                        <h3 className="font-semibold text-foreground">{meta.titulo}</h3>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {meta.secretarias.map((s) => (
                            <Badge key={s.id} variant="muted" className="text-xs">{s.sigla}</Badge>
                          ))}
                        </div>
                      </div>
                      <div className="w-full md:w-48 space-y-1">
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>{meta.indicador_nome}</span>
                          <span className="font-medium text-foreground">{meta.valor_atual}/{meta.meta_prevista}</span>
                        </div>
                        <ProgressBar value={pct} status={semaforo} />
                      </div>
                      <div className="text-xs text-muted-foreground md:text-right">
                        <div>Prazo: {new Date(meta.prazo_final).toLocaleDateString('pt-BR')}</div>
                        <div>Atualizado: {new Date(meta.ultima_atualizacao).toLocaleDateString('pt-BR')}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
}
