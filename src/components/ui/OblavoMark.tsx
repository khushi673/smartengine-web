export function OblavoMark({ size = 26, tenant = false }: { size?: number; tenant?: boolean }) {
  if (tenant) {
    return (
      <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true" className="shrink-0">
        <circle cx="20" cy="20" r="15" fill="none" stroke="var(--t-primary, var(--brand))" strokeWidth="7" />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true" className="shrink-0">
      <defs>
        <linearGradient id="oblavo-ring" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1F6FFF" />
          <stop offset="1" stopColor="#22B8F5" />
        </linearGradient>
      </defs>
      <circle cx="20" cy="20" r="15" fill="none" stroke="url(#oblavo-ring)" strokeWidth="7" />
    </svg>
  );
}
