"use client";

import { useState } from "react";
import { DesktopFrame } from "@/components/ui/DeviceFrame";
import { Panel } from "@/components/ui/Card";
import { TableWrap, Th, Td, TrClickable } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { connectors, Connector } from "@/lib/mock-data";

export default function ConnectorsPage() {
  const [selected, setSelected] = useState<Connector | null>(null);

  return (
    <DesktopFrame>
      <Panel className="flex flex-col gap-4 p-4.5">
        <div>
          <h2 className="text-[19px]">Platform connector catalogue</h2>
          <span className="text-[13px] text-[var(--muted)]">Click a row to view what a connector does and which tenants use it.</span>
        </div>

        <TableWrap>
          <thead>
            <tr>
              <Th>Connector</Th>
              <Th>Category</Th>
              <Th>Tenants using</Th>
              <Th>Availability</Th>
              <Th />
            </tr>
          </thead>
          <tbody>
            {connectors.map((c) => (
              <TrClickable key={c.name} onClick={() => setSelected(c)}>
                <Td>{c.name}</Td>
                <Td>{c.category}</Td>
                <Td className="tabular-nums">{c.tenantsUsing}</Td>
                <Td>
                  <Badge tone={c.availability === "available" ? "success" : "warning"}>
                    {c.availability === "available" ? "Available" : "Framework only"}
                  </Badge>
                </Td>
                <Td><Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); setSelected(c); }}>View</Button></Td>
              </TrClickable>
            ))}
          </tbody>
        </TableWrap>
      </Panel>

      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected ? selected.name : "Connector"}
        footer={<Button size="sm" variant="secondary" onClick={() => setSelected(null)}>Close</Button>}
      >
        {selected && (
          <div className="flex flex-col gap-3 text-[13px]">
            <p className="text-[var(--muted)]">{selected.description}</p>
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-2.5">
              <span className="text-[var(--muted)]">Category</span>
              <span className="font-semibold">{selected.category}</span>
            </div>
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-2.5">
              <span className="text-[var(--muted)]">Tenants using</span>
              <span className="tabular-nums font-semibold">{selected.tenantsUsing}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[var(--muted)]">Availability</span>
              <Badge tone={selected.availability === "available" ? "success" : "warning"}>
                {selected.availability === "available" ? "Available" : "Framework only"}
              </Badge>
            </div>
          </div>
        )}
      </Modal>
    </DesktopFrame>
  );
}
