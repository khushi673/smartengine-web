"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { OblavoMark } from "@/components/ui/OblavoMark";
import { NAV_GROUPS } from "./nav-config";

export function Sidebar({ open, onNavigate }: { open: boolean; onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <aside
      className={`flex w-62 shrink-0 flex-col gap-5.5 overflow-y-auto bg-[var(--rail-bg)] px-3.5 py-5 text-[var(--rail-ink)] md:static md:translate-x-0 ${
        open ? "fixed inset-y-0 left-0 z-40 translate-x-0" : "fixed inset-y-0 left-0 z-40 -translate-x-full md:flex"
      } transition-transform`}
    >
      <div className="flex items-center gap-2.5 border-b border-white/10 px-1.5 pb-3.5">
        <OblavoMark size={30} />
        <div>
          <div className="font-display text-[15.5px] font-extrabold text-[var(--rail-ink-strong)]">OBLAVO</div>
          <div className="text-[9.5px] tracking-wide text-[var(--rail-ink)] uppercase">SmartEngine · Demo</div>
        </div>
      </div>

      {NAV_GROUPS.map((group) => (
        <nav key={group.label} className="flex flex-col gap-0.5">
          <div className="mb-1.5 px-2.5 text-[10.5px] font-bold tracking-wide text-[#5E6E8F] uppercase">{group.label}</div>
          {group.items.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] ${
                  active ? "bg-[var(--rail-active)] font-semibold text-[var(--rail-ink-strong)]" : "hover:bg-white/6 hover:text-[var(--rail-ink-strong)]"
                }`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${active ? "bg-[var(--sky)]" : "bg-current opacity-35"}`} />
                {item.title}
              </Link>
            );
          })}
        </nav>
      ))}

      <div className="mt-auto border-t border-white/10 pt-3.5 text-[11px] text-[#5E6E8F]">
        Next.js demo build · dummy data
        <br />
        Not the Figma deliverable
      </div>
    </aside>
  );
}
