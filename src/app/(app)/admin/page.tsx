"use client";

import Link from "next/link";
import { useState } from "react";
import { DesktopFrame } from "@/components/ui/DeviceFrame";
import { Panel } from "@/components/ui/Card";
import { KpiTile } from "@/components/ui/KpiTile";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Field, Input, Select } from "@/components/ui/Field";
import { useAdminActivity } from "@/components/shell/AdminActivityContext";
import { useVerificationRoutes } from "@/components/shell/VerificationRoutesContext";
import { useToast } from "@/components/shell/ToastContext";
import { tenants, bankUsers as seedUsers, BankUser } from "@/lib/mock-data";

const ROLE_OPTIONS = ["Operations officer", "Operations manager", "Tenant administrator"];

export default function AdminDashboardPage() {
  const { activity, logActivity } = useAdminActivity();
  const { showToast } = useToast();
  const { routes: verificationRoutes } = useVerificationRoutes();
  const meridian = tenants.find((t) => t.name === "Meridian Bank")!;
  const configuredRoutes = verificationRoutes.filter((r) => r.status !== "sandbox").length;

  const [users, setUsers] = useState<BankUser[]>(seedUsers);
  const activeUsers = users.filter((u) => u.status === "active").length;

  const [inviteOpen, setInviteOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(ROLE_OPTIONS[0]);

  const [managing, setManaging] = useState<BankUser | null>(null);

  const resetInviteForm = () => {
    setName("");
    setEmail("");
    setRole(ROLE_OPTIONS[0]);
  };

  const sendInvite = () => {
    if (!name.trim() || !email.trim()) return;
    const newUser: BankUser = { name: name.trim(), role, email: email.trim(), status: "invited" };
    setUsers((prev) => [...prev, newUser]);
    logActivity(`${newUser.name} invited as ${role}`);
    showToast(`Invitation sent to ${newUser.email}.`, "success");
    setInviteOpen(false);
    resetInviteForm();
  };

  const activateUser = (email: string) => {
    setUsers((prev) => prev.map((u) => (u.email === email ? { ...u, status: "active" } : u)));
    logActivity(`${managing?.name} accepted invitation`);
    showToast("User marked active.", "success");
    setManaging(null);
  };

  const removeUser = (email: string) => {
    setUsers((prev) => prev.filter((u) => u.email !== email));
    logActivity(`${managing?.name} removed from Meridian Bank tenant`);
    showToast("User removed.", "warning");
    setManaging(null);
  };

  return (
    <DesktopFrame>
      <div className="flex flex-col gap-5">
        <div>
          <h2 className="text-[19px]">Admin dashboard</h2>
          <span className="text-[13px] text-[var(--muted)]">Meridian Bank · Tenant administration overview</span>
        </div>

        <div className="flex flex-wrap gap-3">
          <KpiTile value={activeUsers} label="Active users" />
          <KpiTile value={`${configuredRoutes} / ${verificationRoutes.length}`} label="Verification checks configured" />
          <KpiTile value={`${meridian.connectorsEnabled} / ${meridian.connectorsTotal}`} label="Connected services enabled" />
          <KpiTile value="Active" label={meridian.domain} tone="success" />
        </div>

        <div className="flex flex-wrap items-stretch gap-4">
          <div className="flex min-w-80 flex-2 flex-col gap-3">
            <QuickCard
              href="/admin/branding"
              title="Branding & content"
              desc="Tenant theme, applicant-facing copy and custom domain status."
            />
            <QuickCard
              href="/admin/verification"
              title="Verification & integrations"
              desc="Configure which verification routes and connected services this tenant uses."
            />
          </div>

          <Panel className="min-w-60 flex-1 p-4.5">
            <strong className="text-[13px]">Recent configuration activity</strong>
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

        <Panel className="p-4.5">
          <div className="mb-3 flex items-center justify-between">
            <strong className="text-[13px]">Users &amp; access</strong>
            <Button size="sm" onClick={() => setInviteOpen(true)}>+ Invite user</Button>
          </div>
          <div className="flex flex-col gap-2.5">
            {users.map((u) => (
              <div key={u.email} className="flex items-center justify-between text-[13px]">
                <div>
                  <span className="font-semibold">{u.name}</span>
                  <span className="text-[var(--muted)]"> · {u.role}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge tone={u.status === "active" ? "success" : "neutral"}>{u.status === "active" ? "Active" : "Invited"}</Badge>
                  <Button size="sm" variant="ghost" onClick={() => setManaging(u)}>Manage</Button>
                </div>
              </div>
            ))}
            {users.length === 0 && <span className="text-[12.5px] text-[var(--muted)]">No users yet.</span>}
          </div>
        </Panel>
      </div>

      <Modal
        open={inviteOpen}
        onClose={() => {
          setInviteOpen(false);
          resetInviteForm();
        }}
        title="Invite user"
        footer={
          <>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                setInviteOpen(false);
                resetInviteForm();
              }}
            >
              Cancel
            </Button>
            <Button size="sm" onClick={sendInvite} disabled={!name.trim() || !email.trim()}>
              Send invite
            </Button>
          </>
        }
      >
        <div className="flex flex-col gap-3.5">
          <Field label="Full name">
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. James Whitfield" />
          </Field>
          <Field label="Work email">
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@meridianbank.ae" />
          </Field>
          <Field label="Role" hint="Determines what this person can see and do within the Meridian Bank tenant.">
            <Select value={role} onChange={(e) => setRole(e.target.value)}>
              {ROLE_OPTIONS.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </Select>
          </Field>
        </div>
      </Modal>

      <Modal
        open={!!managing}
        onClose={() => setManaging(null)}
        title={managing?.name ?? "Manage user"}
        footer={
          managing ? (
            <>
              <Button variant="danger-line" size="sm" onClick={() => removeUser(managing.email)}>Remove user</Button>
              {managing.status === "invited" && (
                <Button size="sm" onClick={() => activateUser(managing.email)}>Mark as active</Button>
              )}
            </>
          ) : undefined
        }
      >
        {managing && (
          <div className="flex flex-col gap-2.5 text-[13px]">
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-2.5">
              <span className="text-[var(--muted)]">Email</span>
              <span className="font-semibold">{managing.email}</span>
            </div>
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-2.5">
              <span className="text-[var(--muted)]">Role</span>
              <span className="font-semibold">{managing.role}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[var(--muted)]">Status</span>
              <Badge tone={managing.status === "active" ? "success" : "neutral"}>{managing.status === "active" ? "Active" : "Invited"}</Badge>
            </div>
          </div>
        )}
      </Modal>
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
