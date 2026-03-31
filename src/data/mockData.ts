export interface Secretaria {
  id: string;
  nome: string;
  sigla: string;
  cor_identidade: string;
}

export interface Meta {
  id: string;
  titulo: string;
  descricao: string;
  codigo: string;
  secretarias: Secretaria[];
  analista_nome: string;
  indicador_nome: string;
  indicador_unidade: string;
  meta_prevista: number;
  linha_base: number;
  valor_atual: number;
  prazo_final: string;
  ciclo_atualizacao: number;
  status: 'ativa' | 'pausada' | 'concluida' | 'cancelada';
  ultima_atualizacao: string;
}

export interface Submissao {
  id: string;
  meta_id: string;
  meta_codigo: string;
  meta_titulo: string;
  secretaria_sigla: string;
  ponto_focal_nome: string;
  valor_reportado: number;
  indicador_unidade: string;
  data_referencia: string;
  observacao: string;
  evidencia_url: string | null;
  status: 'pendente' | 'em_analise' | 'aprovado' | 'devolvido' | 'rejeitado';
  criado_em: string;
}

export interface Notificacao {
  id: string;
  tipo: 'prazo_vencendo' | 'prazo_vencido' | 'nova_submissao' | 'validacao_aprovada' | 'validacao_devolvida' | 'desvio_critico';
  titulo: string;
  mensagem: string;
  meta_id?: string;
  lida: boolean;
  criado_em: string;
}

export const SECRETARIAS: Secretaria[] = [
  { id: 'sec-1', nome: 'Secretaria de Infraestrutura', sigla: 'SEINF', cor_identidade: '#1A3A5C' },
  { id: 'sec-2', nome: 'Secretaria de Saúde', sigla: 'SESAU', cor_identidade: '#1E6B44' },
  { id: 'sec-3', nome: 'Secretaria de Educação', sigla: 'SEDUC', cor_identidade: '#2E75B6' },
  { id: 'sec-4', nome: 'Secretaria de Mobilidade', sigla: 'SEMOB', cor_identidade: '#B45309' },
  { id: 'sec-5', nome: 'Secretaria de Meio Ambiente', sigla: 'SEMAS', cor_identidade: '#166534' },
];

export const METAS: Meta[] = [
  {
    id: 'meta-1',
    titulo: 'Requalificação de 50 vias em comunidades',
    descricao: 'Programa de pavimentação e drenagem de vias em comunidades de interesse social do município.',
    codigo: 'MT-2025-001',
    secretarias: [SECRETARIAS[0], SECRETARIAS[3]],
    analista_nome: 'Pedro Analista',
    indicador_nome: 'Vias requalificadas',
    indicador_unidade: 'unidades',
    meta_prevista: 50,
    linha_base: 0,
    valor_atual: 38,
    prazo_final: '2025-12-31',
    ciclo_atualizacao: 15,
    status: 'ativa',
    ultima_atualizacao: '2025-03-15',
  },
  {
    id: 'meta-2',
    titulo: 'Ampliação da cobertura vacinal infantil',
    descricao: 'Atingir 95% de cobertura vacinal em crianças de 0 a 5 anos em todas as regionais.',
    codigo: 'MT-2025-002',
    secretarias: [SECRETARIAS[1]],
    analista_nome: 'Pedro Analista',
    indicador_nome: 'Cobertura vacinal',
    indicador_unidade: '%',
    meta_prevista: 95,
    linha_base: 72,
    valor_atual: 88,
    prazo_final: '2025-10-31',
    ciclo_atualizacao: 30,
    status: 'ativa',
    ultima_atualizacao: '2025-03-20',
  },
  {
    id: 'meta-3',
    titulo: 'Construção de 10 novas creches',
    descricao: 'Expansão da rede municipal de educação infantil com construção de novas unidades.',
    codigo: 'MT-2025-003',
    secretarias: [SECRETARIAS[2], SECRETARIAS[0]],
    analista_nome: 'Pedro Analista',
    indicador_nome: 'Creches construídas',
    indicador_unidade: 'unidades',
    meta_prevista: 10,
    linha_base: 0,
    valor_atual: 4,
    prazo_final: '2025-12-31',
    ciclo_atualizacao: 30,
    status: 'ativa',
    ultima_atualizacao: '2025-02-28',
  },
  {
    id: 'meta-4',
    titulo: 'Implantação de 30km de ciclovias',
    descricao: 'Expansão da malha cicloviária conectando bairros periféricos ao centro.',
    codigo: 'MT-2025-004',
    secretarias: [SECRETARIAS[3], SECRETARIAS[0]],
    analista_nome: 'Pedro Analista',
    indicador_nome: 'Km implantados',
    indicador_unidade: 'km',
    meta_prevista: 30,
    linha_base: 0,
    valor_atual: 22,
    prazo_final: '2025-11-30',
    ciclo_atualizacao: 15,
    status: 'ativa',
    ultima_atualizacao: '2025-03-22',
  },
  {
    id: 'meta-5',
    titulo: 'Recuperação de 15 praças públicas',
    descricao: 'Revitalização de praças com novos equipamentos, iluminação e paisagismo.',
    codigo: 'MT-2025-005',
    secretarias: [SECRETARIAS[0], SECRETARIAS[4]],
    analista_nome: 'Pedro Analista',
    indicador_nome: 'Praças recuperadas',
    indicador_unidade: 'unidades',
    meta_prevista: 15,
    linha_base: 0,
    valor_atual: 6,
    prazo_final: '2025-12-31',
    ciclo_atualizacao: 15,
    status: 'ativa',
    ultima_atualizacao: '2025-01-10',
  },
  {
    id: 'meta-6',
    titulo: 'Plantio de 100 mil árvores',
    descricao: 'Programa de arborização urbana com foco em áreas de maior ilha de calor.',
    codigo: 'MT-2025-006',
    secretarias: [SECRETARIAS[4]],
    analista_nome: 'Pedro Analista',
    indicador_nome: 'Árvores plantadas',
    indicador_unidade: 'unidades',
    meta_prevista: 100000,
    linha_base: 0,
    valor_atual: 95000,
    prazo_final: '2025-12-31',
    ciclo_atualizacao: 30,
    status: 'ativa',
    ultima_atualizacao: '2025-03-25',
  },
];

export const SUBMISSOES: Submissao[] = [
  {
    id: 'sub-1',
    meta_id: 'meta-1',
    meta_codigo: 'MT-2025-001',
    meta_titulo: 'Requalificação de 50 vias em comunidades',
    secretaria_sigla: 'SEINF',
    ponto_focal_nome: 'Maria Ponto Focal',
    valor_reportado: 41,
    indicador_unidade: 'unidades',
    data_referencia: '2025-03-28',
    observacao: 'Concluídas mais 3 vias no bairro do Ibura. Aguardando liberação de recurso para próximo lote.',
    evidencia_url: null,
    status: 'pendente',
    criado_em: '2025-03-28T14:30:00Z',
  },
  {
    id: 'sub-2',
    meta_id: 'meta-2',
    meta_codigo: 'MT-2025-002',
    meta_titulo: 'Ampliação da cobertura vacinal infantil',
    secretaria_sigla: 'SESAU',
    ponto_focal_nome: 'João da Silva',
    valor_reportado: 91,
    indicador_unidade: '%',
    data_referencia: '2025-03-25',
    observacao: 'Campanha intensificada na regional Sul. Faltam dados do distrito sanitário Norte.',
    evidencia_url: null,
    status: 'pendente',
    criado_em: '2025-03-26T09:15:00Z',
  },
  {
    id: 'sub-3',
    meta_id: 'meta-4',
    meta_codigo: 'MT-2025-004',
    meta_titulo: 'Implantação de 30km de ciclovias',
    secretaria_sigla: 'SEMOB',
    ponto_focal_nome: 'Roberto Santos',
    valor_reportado: 24.5,
    indicador_unidade: 'km',
    data_referencia: '2025-03-22',
    observacao: 'Trecho Boa Viagem-Pina concluído. Sinalização horizontal em execução.',
    evidencia_url: null,
    status: 'em_analise',
    criado_em: '2025-03-23T16:45:00Z',
  },
];

export const NOTIFICACOES: Notificacao[] = [
  {
    id: 'not-1',
    tipo: 'nova_submissao',
    titulo: 'Nova atualização recebida',
    mensagem: 'Maria Ponto Focal enviou atualização para MT-2025-001 (Requalificação de vias).',
    meta_id: 'meta-1',
    lida: false,
    criado_em: '2025-03-28T14:30:00Z',
  },
  {
    id: 'not-2',
    tipo: 'prazo_vencendo',
    titulo: 'Prazo de atualização se aproxima',
    mensagem: 'A meta MT-2025-005 (Praças públicas) está há 78 dias sem atualização.',
    meta_id: 'meta-5',
    lida: false,
    criado_em: '2025-03-28T08:00:00Z',
  },
  {
    id: 'not-3',
    tipo: 'desvio_critico',
    titulo: 'Desvio crítico detectado',
    mensagem: 'A meta MT-2025-005 (Praças públicas) está com 40% de progresso — abaixo do limiar de 70%.',
    meta_id: 'meta-5',
    lida: false,
    criado_em: '2025-03-27T10:00:00Z',
  },
  {
    id: 'not-4',
    tipo: 'validacao_aprovada',
    titulo: 'Submissão aprovada',
    mensagem: 'Sua atualização da meta MT-2025-006 (Plantio de árvores) foi aprovada pelo analista.',
    meta_id: 'meta-6',
    lida: true,
    criado_em: '2025-03-26T11:00:00Z',
  },
];

export const HISTORICO_META1 = [
  { data: '2025-01-15', valor: 8 },
  { data: '2025-02-01', valor: 15 },
  { data: '2025-02-15', valor: 22 },
  { data: '2025-03-01', valor: 30 },
  { data: '2025-03-15', valor: 38 },
];

export function calcularProgresso(meta: Meta): number {
  if (meta.meta_prevista === meta.linha_base) return 0;
  return Math.round(((meta.valor_atual - meta.linha_base) / (meta.meta_prevista - meta.linha_base)) * 100);
}

export function getSemaforo(meta: Meta): 'verde' | 'amarelo' | 'vermelho' | 'cinza' {
  if (!meta.valor_atual && meta.valor_atual !== 0) return 'cinza';
  const pct = calcularProgresso(meta);
  if (pct >= 90) return 'verde';
  if (pct >= 70) return 'amarelo';
  return 'vermelho';
}

export function getStatusSubmissaoLabel(status: Submissao['status']): string {
  const map: Record<string, string> = {
    pendente: 'Pendente',
    em_analise: 'Em Análise',
    aprovado: 'Aprovado',
    devolvido: 'Devolvido',
    rejeitado: 'Rejeitado',
  };
  return map[status] || status;
}
