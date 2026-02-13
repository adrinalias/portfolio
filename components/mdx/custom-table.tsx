interface CustomTableProps {
  children: React.ReactNode;
}

export function CustomTable({ children }: CustomTableProps) {
  return (
    <div className="my-8 overflow-x-auto rounded-lg border border-border -mx-1 sm:mx-0 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-muted [&::-webkit-scrollbar-thumb]:bg-border [&::-webkit-scrollbar-thumb]:rounded-full">
      <table className="w-full text-sm min-w-[480px]">
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
    <th className="px-3 sm:px-4 py-3 text-left font-semibold text-foreground whitespace-nowrap">
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
    <td className="px-3 sm:px-4 py-3 text-muted-foreground">
      {children}
    </td>
  );
}
