import React, { createContext, useContext, useState, useCallback } from 'react';

export type UserRole = 'admin' | 'gestor' | 'analista' | 'focal';

export interface MockUser {
  id: string;
  nome: string;
  email: string;
  role: UserRole;
  secretaria_id?: string;
  secretaria_nome?: string;
}

const MOCK_USERS: Record<UserRole, MockUser> = {
  admin: {
    id: '1',
    nome: 'Carlos Administrador',
    email: 'carlos.admin@recife.pe.gov.br',
    role: 'admin',
  },
  gestor: {
    id: '2',
    nome: 'Ana Gestora',
    email: 'ana.gestora@recife.pe.gov.br',
    role: 'gestor',
  },
  analista: {
    id: '3',
    nome: 'Pedro Analista',
    email: 'pedro.analista@recife.pe.gov.br',
    role: 'analista',
  },
  focal: {
    id: '4',
    nome: 'Maria Ponto Focal',
    email: 'maria.focal@recife.pe.gov.br',
    role: 'focal',
    secretaria_id: 'sec-1',
    secretaria_nome: 'Secretaria de Infraestrutura',
  },
};

interface AuthContextType {
  user: MockUser | null;
  login: (role: UserRole) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(() => {
    const saved = localStorage.getItem('metatrack_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = useCallback((role: UserRole) => {
    const u = MOCK_USERS[role];
    setUser(u);
    localStorage.setItem('metatrack_user', JSON.stringify(u));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('metatrack_user');
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
