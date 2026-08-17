import { ReactNode } from "react";

export function TableWrap({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-[10px] border border-[var(--border)]">
      <table className="w-full min-w-160 border-collapse text-[13px]">{children}</table>
    </div>
  );
}

export function Th({ children }: { children?: ReactNode }) {
  return (
    <th className="border-b border-[var(--border)] px-3 pb-2 text-left text-[10.5px] font-bold uppercase tracking-wide text-[var(--muted)]">
      {children}
    </th>
  );
}

export function Td({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <td className={`border-b border-[var(--border)] px-3 py-3 align-middle ${className}`}>{children}</td>;
}

export function TrClickable({ children, onClick }: { children: ReactNode; onClick?: () => void }) {
  return (
    <tr onClick={onClick} className={onClick ? "cursor-pointer hover:bg-[var(--surface)]" : ""}>
      {children}
    </tr>
  );
}
