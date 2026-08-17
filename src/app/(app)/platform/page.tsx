"use client";

import Link from "next/link";
import { DesktopFrame } from "@/components/ui/DeviceFrame";
import { Panel } from "@/components/ui/Card";
import { KpiTile } from "@/components/ui/KpiTile";
import { Badge } from "@/components/ui/Badge";
import { useAdminActivity } from "@/components/shell/AdminActivityContext";
import { tenants, connectors } from "@/lib/mock-data";

export default function PlatformDashboardPage() {
  const { activity } = useAdminActivity();
  const activeTenants = tenants.filter((t) => t.status === "active").length;
  const availableConnectors = connectors.filter((c) => c.availability === "available").length;

  return (
    <DesktopFrame>
      <div className="flex flex-col gap-5">
        <div>
          <h2 className="text-[19px]">Platform dashboard</h2>
          <span className="text-[13px] text-[var(--muted)]">Oblavo · Cross-tenant platform overview</span>
        </div>

        <div className="flex flex-wrap gap-3">
          <KpiTile value={tenants.length} label="Total tenants" />
          <KpiTile value={activeTenants} label="Active tenants" tone="success" />
          <KpiTile value={connectors.length} label="Catalogue connectors" />
          <KpiTile value={`${availableConnectors} / ${connectors.length}`} label="Connectors available" />
        </div>

        <div className="flex flex-wrap items-stretch gap-4">
          <div className="flex min-w-80 flex-2 flex-col gap-3">
            <QuickCard href="/platform/tenants" title="Tenants" desc="Provision tenants and review domain, status and connector enablement." />
            <QuickCard href="/platform/connectors" title="Connectors" desc="Master catalogue of verification, payment and communication connectors." />

            <Panel className="p-4.5">
              <strong className="text-[13px]">Tenant status</strong>
              <div className="mt-3 flex flex-col gap-2.5">
                {tenants.map((t) => (
                  <div key={t.name} className="flex items-center justify-between text-[13px]">
                    <span>{t.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="tabular-nums text-[var(--muted)]">{t.connectorsEnabled}/{t.connectorsTotal} connectors</span>
                      <Badge tone={t.status === "active" ? "success" : "neutral"}>{t.status === "active" ? "Active" : "Provisioning"}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Panel>
          </div>

          <Panel className="min-w-60 flex-1 p-4.5">
            <strong className="text-[13px]">Recent platform activity</strong>
            <div className="mt-3 flex flex-col gap-3">
              {activity.map((a) => (
                <div key={a.id} className="flex flex-col gap-0.5">
                  <span className="text-[12.5px]">{a.message}</span>
                  <span className="text-[11px] text-[var(--muted)]">{a.timestamp}</span>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </DesktopFrame>
  );
}

function QuickCard({ href, title, desc }: { href: string; title: string; desc: string }) {
  return (
    <Link
      href={href}
      className="group flex flex-col gap-1.5 rounded-[10px] border border-[var(--border)] bg-[var(--surface-2)] p-4 transition-colors hover:border-[var(--brand)]"
    >
      <div className="flex items-center justify-between">
        <strong className="text-[14px]">{title}</strong>
        <span className="text-[var(--brand)] transition-transform group-hover:translate-x-0.5">→</span>
      </div>
      <span className="text-[12.5px] text-[var(--muted)]">{desc}</span>
    </Link>
  );
}
