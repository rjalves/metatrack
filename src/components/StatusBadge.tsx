import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: 'verde' | 'amarelo' | 'vermelho' | 'cinza';
  className?: string;
}

const STATUS_CONFIG = {
  verde: { label: 'No Prazo', className: 'bg-success text-success-foreground' },
  amarelo: { label: 'Atenção', className: 'bg-warning text-warning-foreground' },
  vermelho: { label: 'Crítico', className: 'bg-destructive text-destructive-foreground' },
  cinza: { label: 'Sem Dados', className: 'bg-muted text-muted-foreground' },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status];
  return (
    <span className={cn('inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold', config.className, className)}>
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80" />
      {config.label}
    </span>
  );
}

interface ProgressBarProps {
  value: number;
  status: 'verde' | 'amarelo' | 'vermelho' | 'cinza';
  className?: string;
}

const BAR_COLORS = {
  verde: 'bg-success',
  amarelo: 'bg-warning',
  vermelho: 'bg-destructive',
  cinza: 'bg-muted-foreground',
};

export function ProgressBar({ value, status, className }: ProgressBarProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={cn('h-full rounded-full transition-all duration-500', BAR_COLORS[status])}
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
      <span className="text-xs font-medium text-muted-foreground w-10 text-right">{value}%</span>
    </div>
  );
}
