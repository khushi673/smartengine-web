import Link from "next/link";
import { OblavoMark } from "@/components/ui/OblavoMark";

const groups = [
  {
    title: "Applicant",
    device: "Mobile-first",
    desc: "Guided merchant onboarding journey — invitation through submission, with document quality and verification states visible at every step.",
    href: "/applicant",
    cta: "Walk through the applicant journey",
  },
  {
    title: "Bank Operations",
    device: "Desktop-first",
    desc: "Dashboard, case queue and case workspace — extraction vs. verification evidence, exceptions and handoff readiness.",
    href: "/ops",
    cta: "Open the operations dashboard",
  },
  {
    title: "Bank Admin",
    device: "Desktop-first",
    desc: "Its own dashboard for the bank tenant — users, branding, applicant-facing content and verification-route configuration within governed limits.",
    href: "/admin",
    cta: "Open the admin dashboard",
  },
  {
    title: "Oblavo Admin",
    device: "Desktop-first",
    desc: "Platform-wide dashboard for tenant provisioning and the connector catalogue shared across every bank tenant.",
    href: "/platform",
    cta: "See platform administration",
  },
];

export default function DemoLandingPage() {
  return (
    <div className="mx-auto flex min-h-dvh max-w-245 flex-col gap-10 px-6 py-14">
      <div className="flex items-center gap-3">
        <OblavoMark size={34} />
        <div>
          <div className="font-display text-lg font-extrabold text-[var(--ink-strong)]">OBLAVO</div>
          <div className="text-[11px] tracking-wide text-[var(--muted)] uppercase">Connecting Businesses Intelligently</div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <span className="w-fit rounded-full bg-[var(--brand-wash)] px-3 py-1 text-[12px] font-bold text-[var(--brand)]">
          SmartEngine · Phase 1 direction reference
        </span>
        <h1 className="text-[32px]">A working walkthrough of the SmartEngine experience</h1>
        <p className="max-w-165 text-[15px] leading-relaxed text-[var(--muted)]">
          This is a Next.js build with dummy data — a real, clickable interface across the four SmartEngine
          experience groups, ready to demo end to end and to extend with a live backend later. The canonical
          Phase 1 design of record still lives in the Oblavo-controlled Figma workspace.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {groups.map((g) => (
          <Link
            key={g.href}
            href={g.href}
            className="group flex flex-col gap-2.5 rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] p-5 transition-colors hover:border-[var(--brand)]"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-[16px]">{g.title}</h2>
              <span className="rounded-full border border-[var(--border)] px-2.5 py-0.5 text-[10.5px] font-bold text-[var(--muted)] uppercase">
                {g.device}
              </span>
            </div>
            <p className="text-[13px] leading-relaxed text-[var(--muted)]">{g.desc}</p>
            <span className="mt-1 inline-flex items-center gap-1 text-[13px] font-bold text-[var(--brand)]">
              {g.cta}
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-auto rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 text-[12.5px] text-[var(--muted)]">
        Suggested walkthrough order for a live call: Applicant invitation → document upload (try both scan states) →
        review &amp; verification → Bank Operations queue → click a case → toggle the tenant theme in the top bar to
        show white-labeling without a redesign.
      </div>
    </div>
  );
}
