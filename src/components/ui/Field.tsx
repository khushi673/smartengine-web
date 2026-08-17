import { InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from "react";

export function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[12.5px] font-bold text-[var(--t-ink,var(--ink-strong))]">{label}</label>
      {children}
      {hint && <span className="text-[11.5px] text-[var(--t-muted,var(--muted))]">{hint}</span>}
    </div>
  );
}

const inputClass =
  "w-full rounded-md border-[1.5px] border-[var(--border-strong)] bg-[var(--t-surface,var(--surface-2))] px-3 py-2.5 text-[13.5px] text-[var(--t-ink,var(--ink))] outline-none focus:border-[var(--t-primary,var(--brand))]";

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${inputClass} ${props.className ?? ""}`} />;
}

export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={`${inputClass} ${props.className ?? ""}`} />;
}
