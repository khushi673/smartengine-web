export function KpiTile({
  value,
  label,
  tone,
  delta,
  deltaTone = "success",
}: {
  value: string | number;
  label: string;
  tone?: "success" | "warning";
  delta?: string;
  deltaTone?: "success" | "warning";
}) {
  const color =
    tone === "success" ? "text-[var(--success-text)]" : tone === "warning" ? "text-[var(--warning-text)]" : "text-[var(--ink-strong)]";
  return (
    <div className="flex min-w-30 flex-1 flex-col gap-1 rounded-[14px] border border-[var(--border)] bg-[var(--surface-2)] p-4">
      <span className={`font-display text-2xl font-extrabold tabular-nums ${color}`}>{value}</span>
      <span className="text-[11.5px] font-semibold text-[var(--muted)]">{label}</span>
      {delta && (
        <span className={`mt-1.5 text-[10.5px] font-bold ${deltaTone === "success" ? "text-[var(--success-text)]" : "text-[var(--warning-text)]"}`}>
          {delta}
        </span>
      )}
    </div>
  );
}
