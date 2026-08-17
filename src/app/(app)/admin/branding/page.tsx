"use client";

import { ChangeEvent, CSSProperties, useState } from "react";
import { DesktopFrame } from "@/components/ui/DeviceFrame";
import { Panel } from "@/components/ui/Card";
import { Field, Input } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { OblavoMark } from "@/components/ui/OblavoMark";
import { useToast } from "@/components/shell/ToastContext";
import { useAdminActivity } from "@/components/shell/AdminActivityContext";

type CSSVarStyle = CSSProperties & Record<`--${string}`, string>;

export default function BrandingPage() {
  const { showToast } = useToast();
  const { logActivity } = useAdminActivity();
  const [primary, setPrimary] = useState("#0F6B5C");
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [welcome, setWelcome] = useState("You're invited to complete your merchant application");
  const [domain, setDomain] = useState("apply.meridianbank.ae");

  const onLogoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLogoUrl(URL.createObjectURL(file));
    logActivity("Tenant logo updated");
    showToast("Logo updated in preview.", "success");
  };

  const save = () => {
    logActivity("Branding & applicant-facing content saved");
    showToast("Branding changes saved (demo only — no backend yet).", "success");
  };

  return (
    <DesktopFrame>
      <div className="flex flex-col gap-5">
        <h2 className="text-[19px]">Branding &amp; applicant-facing content</h2>

        <div className="flex flex-wrap items-start gap-5">
          <div className="flex min-w-80 flex-1 flex-col gap-4">
            <Panel className="p-4">
              <strong className="text-[13px]">Tenant theme</strong>
              <div className="mt-3 flex flex-wrap items-end gap-3">
                <ColorSwatch label="Primary colour" value={primary} onChange={setPrimary} />
                <label className="flex cursor-pointer flex-col gap-1.5">
                  <span className="text-[11px] text-[var(--muted)]">Logo</span>
                  <span className="relative flex h-9 w-16 items-center justify-center overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[11px] text-[var(--muted)] hover:border-[var(--brand)]">
                    {logoUrl ? (
                      <span
                        className="absolute inset-0"
                        style={{ backgroundImage: `url(${logoUrl})`, backgroundSize: "cover", backgroundPosition: "center" }}
                      />
                    ) : (
                      "Upload"
                    )}
                    <input type="file" accept="image/*" className="absolute inset-0 cursor-pointer opacity-0" onChange={onLogoChange} />
                  </span>
                </label>
              </div>
              <p className="mt-3 text-[11.5px] text-[var(--muted)]">
                Only approved brand tokens are editable — layout, components and workflow logic remain fixed by the SmartEngine core design system.
              </p>
            </Panel>

            <Panel className="flex flex-col gap-3.5 p-4">
              <strong className="text-[13px]">Applicant-facing content</strong>
              <Field label="Welcome message">
                <Input value={welcome} onChange={(e) => setWelcome(e.target.value)} />
              </Field>
              <Field label="Support email">
                <Input defaultValue="onboarding-support@meridianbank.ae" />
              </Field>
              <Field label="Custom domain" hint="DNS/SSL configuration finalised in Phase 2/3.">
                <Input value={domain} onChange={(e) => setDomain(e.target.value)} />
              </Field>
            </Panel>

            <Button size="sm" className="self-start" onClick={save}>
              Save changes
            </Button>
          </div>

          <div className="flex w-70 flex-none flex-col gap-2">
            <span className="text-[13px] font-bold">Live preview — applicant invitation</span>
            <div
              className="relative flex min-h-105 flex-col overflow-hidden rounded-[28px] border-8 border-[var(--ink-strong)] shadow-xl"
              style={{ background: "#FBFAF6", "--t-primary": primary } as CSSVarStyle}
            >
              <div className="flex flex-col gap-3 px-4 pt-6.5 pb-4">
                <div className="flex items-center gap-2">
                  {logoUrl ? (
                    <span
                      className="h-4.5 w-4.5 shrink-0 rounded-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${logoUrl})` }}
                    />
                  ) : (
                    <OblavoMark size={18} tenant />
                  )}
                  <strong className="font-display text-[13px]" style={{ color: "#123028" }}>
                    Meridian Bank
                  </strong>
                </div>
                <h1 className="text-[15px]" style={{ color: "#123028" }}>
                  {welcome || "You're invited to complete your merchant application"}
                </h1>
                <span
                  className="inline-flex w-fit items-center justify-center rounded-md px-3 py-1.5 text-[12.5px] font-bold text-white"
                  style={{ background: primary }}
                >
                  Start application
                </span>
                <span className="text-[10.5px]" style={{ color: "#6B7568" }}>
                  {domain || "apply.meridianbank.ae"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DesktopFrame>
  );
}

function ColorSwatch({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="flex cursor-pointer flex-col gap-1.5">
      <span className="text-[11px] text-[var(--muted)]">{label}</span>
      <span className="relative block h-9 w-16 overflow-hidden rounded-lg border border-[var(--border)]" style={{ background: value }}>
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          aria-label={label}
        />
      </span>
    </label>
  );
}
