"use client";

import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { DesktopFrame } from "@/components/ui/DeviceFrame";
import { Panel } from "@/components/ui/Card";
import { KpiTile } from "@/components/ui/KpiTile";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Field, Input, Select } from "@/components/ui/Field";
import { useToast } from "@/components/shell/ToastContext";
import { dashboardMetrics, cases } from "@/lib/mock-data";

interface CsvRow {
  business_name: string;
  trade_licence_no: string;
  emirate: string;
  signatory_name: string;
  signatory_email: string;
  signatory_phone: string;
  hasError: boolean;
}

function parseTargetListCsv(text: string): CsvRow[] {
  const lines = text.trim().split(/\r?\n/).filter(Boolean);
  const [headerLine, ...dataLines] = lines;
  const headers = headerLine.split(",").map((h) => h.trim());
  return dataLines.map((line) => {
    const cells = line.split(",").map((c) => c.trim());
    const row = Object.fromEntries(headers.map((h, i) => [h, cells[i] ?? ""])) as unknown as CsvRow;
    row.hasError = !row.business_name || !row.signatory_email;
    return row;
  });
}

export default function OpsDashboardPage() {
  const m = dashboardMetrics;
  const { showToast } = useToast();
  const [campaignOpen, setCampaignOpen] = useState(false);
  const [campaignName, setCampaignName] = useState("");
  const [csvFileName, setCsvFileName] = useState<string | null>(null);
  const [csvRows, setCsvRows] = useState<CsvRow[] | null>(null);

  const onCsvChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCsvFileName(file.name);
    file.text().then((text) => setCsvRows(parseTargetListCsv(text)));
  };

  const resetCampaignForm = () => {
    setCampaignName("");
    setCsvFileName(null);
    setCsvRows(null);
  };

  const createCampaign = () => {
    const count = csvRows?.length ?? 0;
    const errorCount = csvRows?.filter((r) => r.hasError).length ?? 0;
    const name = campaignName || "Untitled campaign";
    const detail = count > 0 ? ` with ${count} merchant${count > 1 ? "s" : ""}${errorCount > 0 ? ` (${errorCount} need attention before sending)` : ""}` : "";
    showToast(`"${name}" created${detail} (demo only — no backend yet).`, "success");
    setCampaignOpen(false);
    resetCampaignForm();
  };

  return (
    <DesktopFrame>
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[19px]">Operations dashboard</h2>
            <span className="text-[13px] text-[var(--muted)]">Meridian Bank · Q3 Merchant Card Programme</span>
          </div>
          <Button size="sm" onClick={() => setCampaignOpen(true)}>+ New campaign</Button>
        </div>

        <div className="flex flex-wrap gap-3">
          <KpiTile value={m.invited.toLocaleString()} label="Invited" delta={m.invitedDelta} />
          <KpiTile value={m.opened.toLocaleString()} label="Opened" delta={m.openedDelta} />
          <KpiTile value={m.submitted.toLocaleString()} label="Submitted" delta={m.submittedDelta} />
          <KpiTile value={m.infoRequested} label="Info requested" tone="warning" delta={m.infoRequestedDelta} deltaTone="warning" />
          <KpiTile value={m.readyForHandoff} label="Ready for handoff" tone="success" delta={m.readyForHandoffDelta} />
          <KpiTile value={m.handedOff} label="Handed off" delta={m.handedOffDelta} />
        </div>

        <div className="flex flex-wrap items-stretch gap-4">
          <Panel className="min-w-80 flex-2 p-4.5">
            <div className="mb-3 flex items-center justify-between">
              <strong className="text-[13px]">Campaign progress</strong>
              <Badge tone="info">Live</Badge>
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-[13px]">
                <span>Applications submitted</span>
                <span className="tabular-nums text-[var(--muted)]">
                  {m.submitted.toLocaleString()} / {m.invited.toLocaleString()}
                </span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-[var(--border)]">
                <span
                  className="block h-full rounded-full bg-[var(--brand)]"
                  style={{ width: `${Math.round((m.submitted / m.invited) * 100)}%` }}
                />
              </div>
            </div>
            <hr className="my-4 border-[var(--border)]" />
            <div className="mb-2 flex items-center justify-between text-[13px]">
              <strong>Non-responders (7+ days)</strong>
              <Link href="/ops/queue" className="font-bold text-[var(--brand)]">
                View all
              </Link>
            </div>
            <div className="flex flex-col gap-2 text-[13px]">
              {m.nonResponders.map((n) => {
                const matchedCase = cases.find((c) => c.business === n.business);
                const row = (
                  <div className="flex justify-between">
                    <span>{n.business}</span>
                    <span className="tabular-nums text-[var(--muted)]">Invited {n.invitedDaysAgo} days ago</span>
                  </div>
                );
                return matchedCase ? (
                  <Link key={n.business} href={`/ops/queue/${matchedCase.id}`} className="rounded-md transition-colors hover:text-[var(--brand)]">
                    {row}
                  </Link>
                ) : (
                  <div key={n.business}>{row}</div>
                );
              })}
            </div>
          </Panel>

          <Panel className="min-w-60 flex-1 p-4.5">
            <strong className="text-[13px]">Exceptions needing attention</strong>
            <div className="mt-3 flex flex-col gap-2.5">
              {m.exceptions.map((e) => (
                <div key={e.label} className="flex justify-between text-[13px]">
                  <span>{e.label}</span>
                  <Badge tone={e.tone}>{e.count}</Badge>
                </div>
              ))}
            </div>
            <Link
              href="/ops/queue"
              className="mt-3.5 inline-flex w-full items-center justify-center rounded-md border-[1.5px] border-[var(--border-strong)] px-3 py-1.5 text-[12.5px] font-bold text-[var(--brand)] hover:bg-[var(--surface)]"
            >
              Open case queue
            </Link>
          </Panel>
        </div>
      </div>

      <Modal
        open={campaignOpen}
        onClose={() => {
          setCampaignOpen(false);
          resetCampaignForm();
        }}
        title="New campaign"
        footer={
          <>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                setCampaignOpen(false);
                resetCampaignForm();
              }}
            >
              Cancel
            </Button>
            <Button size="sm" onClick={createCampaign}>Create campaign</Button>
          </>
        }
      >
        <div className="flex flex-col gap-3.5">
          <Field label="Campaign name">
            <Input value={campaignName} onChange={(e) => setCampaignName(e.target.value)} placeholder="e.g. Q4 Merchant Card Programme" />
          </Field>
          <Field label="Journey template">
            <Select defaultValue="standard">
              <option value="standard">Standard merchant onboarding</option>
              <option value="fleet">Fleet card onboarding</option>
            </Select>
          </Field>
          <Field label="Target list">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <label className="inline-flex cursor-pointer items-center rounded-md border-[1.5px] border-[var(--border-strong)] bg-[var(--surface-2)] px-3 py-2 text-[12.5px] font-bold text-[var(--ink)] hover:bg-[var(--surface)]">
                  {csvFileName ?? "Choose CSV file"}
                  <input type="file" accept=".csv" className="hidden" onChange={onCsvChange} />
                </label>
                <a href="/sample-merchant-campaign.csv" download className="text-[12px] font-bold text-[var(--brand)]">
                  Download sample CSV
                </a>
              </div>
              <span className="text-[11.5px] text-[var(--muted)]">
                Documented batch/API contract from Phase 2 — this pilot flow accepts CSV. Duplicates and missing fields are flagged before
                invitations send.
              </span>

              {csvRows && (
                <div className="mt-1 flex flex-col gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[12.5px] font-bold">
                      {csvRows.length} merchant{csvRows.length === 1 ? "" : "s"} detected
                    </span>
                    {csvRows.some((r) => r.hasError) ? (
                      <Badge tone="warning">{csvRows.filter((r) => r.hasError).length} need attention</Badge>
                    ) : (
                      <Badge tone="success">All rows valid</Badge>
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    {csvRows.slice(0, 3).map((r, i) => (
                      <div key={i} className={`flex justify-between text-[11.5px] ${r.hasError ? "text-[var(--warning-text)]" : "text-[var(--muted)]"}`}>
                        <span>{r.business_name || "(missing business name)"}</span>
                        <span>{r.emirate}</span>
                      </div>
                    ))}
                    {csvRows.length > 3 && <span className="text-[11px] text-[var(--muted)]">+{csvRows.length - 3} more</span>}
                  </div>
                </div>
              )}
            </div>
          </Field>
        </div>
      </Modal>
    </DesktopFrame>
  );
}
