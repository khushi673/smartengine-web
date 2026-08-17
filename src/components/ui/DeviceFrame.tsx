import { ReactNode } from "react";

export function PhoneFrame({ children, tenant = "meridian" }: { children: ReactNode; tenant?: "oblavo" | "meridian" }) {
  return (
    <div className="flex flex-col items-center gap-3.5">
      <span className="text-[11px] font-semibold text-[var(--muted)]">Applicant · Mobile-first</span>
      <div
        data-tenant={tenant}
        className="relative flex min-h-[760px] w-[390px] flex-col overflow-hidden rounded-[38px] border-[10px] border-[var(--ink-strong)] shadow-2xl"
        style={{ background: "var(--t-bg, var(--bg))" }}
      >
        <div className="absolute top-0 left-1/2 z-10 h-[22px] w-[120px] -translate-x-1/2 rounded-b-2xl bg-[var(--ink-strong)]" />
        <div className="flex flex-1 flex-col gap-[18px] overflow-y-auto px-5 pt-[38px] pb-6">{children}</div>
      </div>
    </div>
  );
}

export function DesktopFrame({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[1180px] rounded-2xl border border-[var(--border)] bg-[var(--bg)] shadow-2xl">
      <div className="px-[30px] pt-[26px] pb-10">{children}</div>
    </div>
  );
}
