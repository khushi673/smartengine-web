"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { DesktopFrame } from "@/components/ui/DeviceFrame";
import { Panel } from "@/components/ui/Card";
import { TableWrap, Th, Td, TrClickable } from "@/components/ui/Table";
import { CaseStatusBadge, Badge } from "@/components/ui/Badge";
import { CaseStatus } from "@/lib/mock-data";
import { useCaseStore } from "@/components/shell/CaseStoreContext";

const STATUS_FILTERS: Array<{ value: CaseStatus | "all"; label: string }> = [
  { value: "all", label: "All statuses" },
  { value: "submitted", label: "Submitted" },
  { value: "under_review", label: "Under review" },
  { value: "info_requested", label: "Info requested" },
  { value: "ready_for_handoff", label: "Ready for handoff" },
  { value: "handed_off", label: "Handed off" },
];

export default function CaseQueuePage() {
  const router = useRouter();
  const { listCases } = useCaseStore();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<CaseStatus | "all">("all");

  const cases = listCases();
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return cases.filter((c) => {
      const matchesSearch = !q || c.business.toLowerCase().includes(q) || c.ref.toLowerCase().includes(q);
      const matchesStatus = status === "all" || c.status === status;
      return matchesSearch && matchesStatus;
    });
  }, [cases, search, status]);

  return (
    <DesktopFrame>
      <Panel className="flex flex-col gap-4 p-4.5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-[19px]">Case queue</h2>
          <div className="flex flex-wrap gap-2">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search business, ref…"
              className="min-w-40 flex-1 rounded-md border-[1.5px] border-[var(--border-strong)] bg-[var(--surface-2)] px-3 py-2 text-[13px] outline-none focus:border-[var(--brand)]"
            />
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as CaseStatus | "all")}
              className="min-w-32 rounded-md border-[1.5px] border-[var(--border-strong)] bg-[var(--surface-2)] px-3 py-2 text-[13px]"
            >
              {STATUS_FILTERS.map((f) => (
                <option key={f.value} value={f.value}>
                  {f.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <TableWrap>
          <thead>
            <tr>
              <Th>Case</Th>
              <Th>Business</Th>
              <Th>Status</Th>
              <Th>Exceptions</Th>
              <Th>Age</Th>
              <Th>Assignee</Th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => {
              const mismatches = c.verification.filter((v) => v.state === "mismatch" || v.state === "unable_to_verify").length;
              return (
                <TrClickable key={c.id} onClick={() => router.push(`/ops/queue/${c.id}`)}>
                  <Td className="tabular-nums">{c.ref}</Td>
                  <Td>
                    <div className="flex items-center gap-2">
                      <span>{c.business}</span>
                      {c.existingCustomer && <Badge tone="info">Existing customer</Badge>}
                    </div>
                  </Td>
                  <Td><CaseStatusBadge status={c.status} /></Td>
                  <Td>
                    {mismatches > 0 ? (
                      <Badge tone="warning">{mismatches} mismatch{mismatches > 1 ? "es" : ""}</Badge>
                    ) : (
                      <Badge tone="neutral">None</Badge>
                    )}
                  </Td>
                  <Td className="tabular-nums">{c.ageHours < 24 ? `${c.ageHours}h` : `${Math.round(c.ageHours / 24)}d`}</Td>
                  <Td>{c.assignee ?? "Unassigned"}</Td>
                </TrClickable>
              );
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-3 py-6 text-center text-[13px] text-[var(--muted)]">
                  No cases match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </TableWrap>
        <span className="text-[13px] text-[var(--muted)]">Click any row to open the case workspace.</span>
      </Panel>
    </DesktopFrame>
  );
}
