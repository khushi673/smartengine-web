import { HTMLAttributes } from "react";

export function Card({ className = "", flat, ...rest }: HTMLAttributes<HTMLDivElement> & { flat?: boolean }) {
  return (
    <div
      className={`rounded-[14px] border border-[var(--border)] p-4 ${
        flat ? "bg-[var(--t-wash,var(--surface))]" : "bg-[var(--t-surface,var(--surface-2))]"
      } ${className}`}
      {...rest}
    />
  );
}

export function Panel({ className = "", ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-[14px] border border-[var(--border)] bg-[var(--surface-2)] shadow-[var(--shadow-card)] ${className}`}
      {...rest}
    />
  );
}
