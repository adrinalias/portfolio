interface MetricProps {
  label: string;
  value: string;
  description?: string;
}

export function Metric({ label, value, description }: MetricProps) {
  return (
    <div className="flex flex-col p-6 bg-muted/50 rounded-lg border border-border">
      <div className="text-3xl font-bold text-foreground mb-2">{value}</div>
      <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
        {label}
      </div>
      {description && (
        <div className="text-xs text-muted-foreground mt-2">{description}</div>
      )}
    </div>
  );
}

interface MetricsGridProps {
  children: React.ReactNode;
  columns?: 2 | 3 | 4;
}

export function MetricsGrid({ children, columns = 2 }: MetricsGridProps) {
  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-4 my-8 not-prose`}>
      {children}
    </div>
  );
}
