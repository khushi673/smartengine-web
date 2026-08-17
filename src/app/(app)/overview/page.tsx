import Link from "next/link";
import { DesktopFrame } from "@/components/ui/DeviceFrame";
import { Panel } from "@/components/ui/Card";

const STAGES = [
  {
    title: "Journey configuration & invitation",
    desc: "Bank configures the journey; merchant receives a secure, time-bound, bank-branded link.",
    owner: "SmartEngine + Bank Admin",
    href: "/applicant",
  },
  {
    title: "Consent & data capture",
    desc: "Versioned consent, then dynamic business and signatory details.",
    owner: "Merchant",
    href: "/applicant/consent",
  },
  {
    title: "Document ingestion",
    desc: "Upload, file safety/quality checks, classification.",
    owner: "Merchant + SmartEngine",
    href: "/applicant/documents",
  },
  {
    title: "Extraction & consistency",
    desc: "Fields extracted, compared against entered data, mismatches flagged.",
    owner: "SmartEngine",
    href: "/applicant/processing",
  },
  {
    title: "Verification, review & submission",
    desc: "Routed through direct authority, third-party, or the bank's own layer; merchant confirms and submits.",
    owner: "SmartEngine + Merchant",
    href: "/applicant/review",
  },
  {
    title: "Operations review",
    desc: "Officer focuses on exceptions and evidence, not re-keying the application.",
    owner: "Bank Operations",
    href: "/ops/queue/alnoor",
  },
  {
    title: "Information request loop",
    desc: "Targeted follow-up; only permitted items can be amended.",
    owner: "Bank Operations ↔ Merchant",
    href: "/applicant/resubmission",
  },
  {
    title: "Bank handoff",
    desc: "Review-ready package sent through the approved API or export route.",
    owner: "SmartEngine → Bank",
    href: "/ops/queue/gulf",
  },
  {
    title: "Downstream processing & status return",
    desc: "The bank's own systems decide; the outcome is presented to the merchant as bank-originated.",
    owner: "Bank Systems",
    href: "/applicant/confirmation",
  },
];

export default function OverviewPage() {
  return (
    <DesktopFrame>
      <div className="flex flex-col gap-4">
        <div>
          <h2 className="text-[19px]">End-to-end workflow</h2>
          <span className="text-[13px] text-[var(--muted)]">The complete pipeline, start to finish. Click any stage to jump straight to that screen.</span>
        </div>

        <Panel className="p-2">
          <div className="flex flex-col">
            {STAGES.map((s, i) => (
              <Link
                key={s.title}
                href={s.href}
                className={`group flex items-start gap-4 rounded-[10px] px-4 py-4 transition-colors hover:bg-[var(--surface)] ${
                  i < STAGES.length - 1 ? "border-b border-[var(--border)]" : ""
                }`}
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--brand-wash)] text-[14px] font-extrabold text-[var(--brand)]">
                  {i + 1}
                </span>
                <div className="flex-1">
                  <div className="text-[13.8px] font-bold text-[var(--ink-strong)]">{s.title}</div>
                  <div className="mt-0.5 text-[12px] text-[var(--muted)]">{s.desc}</div>
                  <div className="mt-1.5 text-[10.5px] font-bold tracking-wide text-[var(--muted)] uppercase">{s.owner}</div>
                </div>
                <span className="mt-2 text-[var(--brand)] opacity-0 transition-opacity group-hover:opacity-100">→</span>
              </Link>
            ))}
          </div>
        </Panel>
      </div>
    </DesktopFrame>
  );
}
