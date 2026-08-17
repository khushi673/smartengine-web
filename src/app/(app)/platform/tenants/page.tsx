"use client";

import { ReactNode, useState } from "react";
import { DesktopFrame } from "@/components/ui/DeviceFrame";
import { Panel } from "@/components/ui/Card";
import { TableWrap, Th, Td, TrClickable } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { tenants, Tenant } from "@/lib/mock-data";

export default function TenantsPage() {
  const [selected, setSelected] = useState<Tenant | null>(null);

  return (
    <DesktopFrame>
      <Panel className="flex flex-col gap-4 p-4.5">
        <div>
          <h2 className="text-[19px]">Tenants</h2>
          <span className="text-[13px] text-[var(--muted)]">Click a row to view provisioning and connector detail.</span>
        </div>

        <TableWrap>
          <thead>
            <tr>
              <Th>Tenant</Th>
              <Th>Programme</Th>
              <Th>Domain</Th>
              <Th>Status</Th>
              <Th>Connectors enabled</Th>
              <Th />
            </tr>
          </thead>
          <tbody>
            {tenants.map((t) => (
              <TrClickable key={t.name} onClick={() => setSelected(t)}>
                <Td>{t.name}</Td>
                <Td>{t.programme}</Td>
                <Td className="tabular-nums">{t.domain}</Td>
                <Td><Badge tone={t.status === "active" ? "success" : "neutral"}>{t.status === "active" ? "Active" : "Provisioning"}</Badge></Td>
                <Td className="tabular-nums">{t.connectorsEnabled} / {t.connectorsTotal}</Td>
                <Td><Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); setSelected(t); }}>Manage</Button></Td>
              </TrClickable>
            ))}
          </tbody>
        </TableWrap>
      </Panel>

      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected ? selected.name : "Tenant"}
        footer={<Button size="sm" variant="secondary" onClick={() => setSelected(null)}>Close</Button>}
      >
        {selected && (
          <div className="flex flex-col gap-3 text-[13px]">
            <DetailRow label="Programme" value={selected.programme} />
            <DetailRow label="Domain" value={selected.domain} />
            <DetailRow
              label="Status"
              value={<Badge tone={selected.status === "active" ? "success" : "neutral"}>{selected.status === "active" ? "Active" : "Provisioning"}</Badge>}
            />
            <DetailRow label="Connectors enabled" value={`${selected.connectorsEnabled} of ${selected.connectorsTotal} platform connectors`} />
            <p className="text-[12.5px] text-[var(--muted)]">
              Provisioning, connector availability and support access are managed here by the Oblavo platform team. Bank-level branding and verification configuration stay with the bank tenant administrator.
            </p>
          </div>
        )}
      </Modal>
    </DesktopFrame>
  );
}

function DetailRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex items-center justify-between border-b border-[var(--border)] pb-2.5">
      <span className="text-[var(--muted)]">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
