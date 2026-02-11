interface CustomTableProps {
  children: React.ReactNode;
}

export function CustomTable({ children }: CustomTableProps) {
  return (
    <div className="my-8 overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm">
        {children}
      </table>
    </div>
  );
}

export function CustomThead({ children }: { children: React.ReactNode }) {
  return (
    <thead className="bg-muted border-b border-border">
      {children}
    </thead>
  );
}

export function CustomTh({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-4 py-3 text-left font-semibold text-foreground">
      {children}
    </th>
  );
}

export function CustomTr({ children }: { children: React.ReactNode }) {
  return (
    <tr className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
      {children}
    </tr>
  );
}

export function CustomTd({ children }: { children: React.ReactNode }) {
  return (
    <td className="px-4 py-3 text-muted-foreground">
      {children}
    </td>
  );
}
