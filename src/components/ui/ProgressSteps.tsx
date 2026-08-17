export function ProgressSteps({ total, current }: { total: number; current: number }) {
  return (
    <div className="flex gap-1.5" aria-label={`Step ${current} of ${total}`}>
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={`h-1 flex-1 rounded-full ${
            i < current ? "bg-[var(--t-primary,var(--brand))]" : "bg-[var(--border)]"
          }`}
        />
      ))}
    </div>
  );
}
