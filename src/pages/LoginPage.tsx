import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Target } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('gestor');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    login(role);
    setLoading(false);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center">
              <Target className="h-7 w-7 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-foreground">MetaTrack</h1>
          <p className="text-sm text-muted-foreground">Monitoramento de Metas Transversais</p>
          <p className="text-xs text-muted-foreground">Prefeitura do Recife — SEPLAG</p>
        </div>

        <Card className="shadow-card border">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl">Entrar</CardTitle>
            <CardDescription>Acesse com suas credenciais institucionais</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu.nome@recife.pe.gov.br"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* Dev role selector */}
              <div className="space-y-2 rounded-lg border border-dashed border-warning/50 bg-warning/5 p-3">
                <Label className="text-xs font-medium text-warning">Modo Desenvolvimento — Selecione o perfil</Label>
                <Select value={role} onValueChange={(v) => setRole(v as UserRole)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrador</SelectItem>
                    <SelectItem value="gestor">Gestor SEPLAG</SelectItem>
                    <SelectItem value="analista">Analista SEPLAG</SelectItem>
                    <SelectItem value="focal">Ponto Focal</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-soft hover:shadow-card transition-all" disabled={loading}>
                {loading ? 'Entrando…' : 'Entrar'}
              </Button>

              <div className="text-center">
                <button type="button" className="text-sm text-secondary hover:underline">
                  Esqueci minha senha
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
