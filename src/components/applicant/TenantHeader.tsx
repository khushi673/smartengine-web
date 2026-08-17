"use client";

import { OblavoMark } from "@/components/ui/OblavoMark";
import { useTenantTheme } from "@/components/shell/TenantThemeContext";

export function TenantHeader() {
  const { tenant } = useTenantTheme();
  const name = tenant === "meridian" ? "Meridian Bank" : "Oblavo (default theme)";
  return (
    <div className="flex items-center gap-2.5">
      <OblavoMark size={26} tenant />
      <div>
        <div className="font-display text-sm font-extrabold text-[var(--t-ink-strong,var(--ink-strong))]">{name}</div>
        <div className="text-[12px] text-[var(--t-muted,var(--muted))]">via Oblavo SmartEngine</div>
      </div>
    </div>
  );
}

export function tenantLabel(tenant: "oblavo" | "meridian") {
  return tenant === "meridian" ? "Meridian Bank Commercial Card Programme" : "Oblavo SmartEngine (default theme preview)";
}
