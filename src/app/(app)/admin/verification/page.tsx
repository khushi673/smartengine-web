"use client";

import { useState } from "react";
import { DesktopFrame } from "@/components/ui/DeviceFrame";
import { Panel, Card } from "@/components/ui/Card";
import { TableWrap, Th, Td } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Field, Input, Select } from "@/components/ui/Field";
import { useToast } from "@/components/shell/ToastContext";
import { useAdminActivity } from "@/components/shell/AdminActivityContext";
import { useVerificationRoutes } from "@/components/shell/VerificationRoutesContext";
import { VerificationRoute } from "@/lib/mock-data";

const statusBadge: Record<string, { tone: "success" | "info" | "neutral"; label: string }> = {
  active: { tone: "success", label: "Active" },
  bank_owned: { tone: "info", label: "Bank-owned" },
  sandbox: { tone: "neutral", label: "Sandbox" },
};

const ROUTE_OPTIONS: Array<Exclude<VerificationRoute["route"], "Not configured">> = [
  "Direct authority",
  "Third-party provider",
  "Bank verification layer",
];

export default function VerificationAdminPage() {
  const { showToast } = useToast();
  const { logActivity } = useAdminActivity();
  const { routes, updateRoute } = useVerificationRoutes();
  const [editing, setEditing] = useState<VerificationRoute | null>(null);
  const [draftRoute, setDraftRoute] = useState<VerificationRoute["route"]>("Direct authority");
  const [draftProvider, setDraftProvider] = useState("");

  const openEdit = (r: VerificationRoute) => {
    setEditing(r);
    setDraftRoute(r.route === "Not configured" ? "Direct authority" : r.route);
    setDraftProvider(r.provider === "—" ? "" : r.provider);
  };

  const saveEdit = () => {
    if (!editing) return;
    updateRoute(editing.check, draftRoute, draftProvider);
    logActivity(`${editing.check} verification ${editing.status === "sandbox" ? "enabled" : "reconfigured"} — ${draftRoute}`);
    showToast(`${editing.check} verification updated.`, "success");
    setEditing(null);
  };

  return (
    <DesktopFrame>
      <Panel className="flex flex-col gap-4 p-4.5">
        <div>
          <h2 className="text-[19px]">Verification routes &amp; connected services</h2>
          <span className="text-[13px] text-[var(--muted)]">
            Routes selected here apply platform-wide for this tenant. Replacing a provider does not change the applicant or operations experience.
          </span>
        </div>

        <TableWrap>
          <thead>
            <tr>
              <Th>Check</Th>
              <Th>Route</Th>
              <Th>Provider</Th>
              <Th>Status</Th>
              <Th />
            </tr>
          </thead>
          <tbody>
            {routes.map((r) => (
              <tr key={r.check}>
                <Td>{r.check}</Td>
                <Td>{r.route}</Td>
                <Td>{r.provider}</Td>
                <Td><Badge tone={statusBadge[r.status].tone}>{statusBadge[r.status].label}</Badge></Td>
                <Td>
                  <Button size="sm" variant="ghost" onClick={() => openEdit(r)}>
                    {r.status === "sandbox" ? "Enable" : "Configure"}
                  </Button>
                </Td>
              </tr>
            ))}
          </tbody>
        </TableWrap>

        <hr className="border-[var(--border)]" />
        <strong className="text-[13px]">Connected merchant services</strong>
        <div className="flex flex-wrap gap-3">
          <Card className="w-55">
            <div className="flex items-center justify-between">
              <strong className="text-[13px]">Acquiring / cards</strong>
              <Badge tone="neutral">Not connected</Badge>
            </div>
            <span className="text-[11.5px] text-[var(--muted)]">Admin-ready framework · live scope separately agreed.</span>
          </Card>
          <Card className="w-55">
            <div className="flex items-center justify-between">
              <strong className="text-[13px]">Notifications</strong>
              <Badge tone="success">Email active</Badge>
            </div>
            <span className="text-[11.5px] text-[var(--muted)]">SMS/WhatsApp adapter-ready for Phase 2.</span>
          </Card>
        </div>
      </Panel>

      <Modal
        open={!!editing}
        onClose={() => setEditing(null)}
        title={editing ? `${editing.status === "sandbox" ? "Enable" : "Configure"} — ${editing.check}` : ""}
        footer={
          <>
            <Button variant="secondary" size="sm" onClick={() => setEditing(null)}>Cancel</Button>
            <Button size="sm" onClick={saveEdit}>Save</Button>
          </>
        }
      >
        <div className="flex flex-col gap-3.5">
          <Field label="Verification route">
            <Select value={draftRoute} onChange={(e) => setDraftRoute(e.target.value as VerificationRoute["route"])}>
              {ROUTE_OPTIONS.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </Select>
          </Field>
          <Field
            label="Provider name"
            hint="Provider-agnostic adapter — replacing this does not change the applicant or operations experience."
          >
            <Input value={draftProvider} onChange={(e) => setDraftProvider(e.target.value)} placeholder="e.g. DED Registry (UAE)" />
          </Field>
        </div>
      </Modal>
    </DesktopFrame>
  );
}
