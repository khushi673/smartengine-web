"use client";

import { ReactNode, useState } from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "./Sidebar";
import { NAV_GROUPS } from "./nav-config";
import { useTenantTheme } from "./TenantThemeContext";
import { RouteProgress } from "./RouteProgress";

function findCrumb(pathname: string) {
  for (const group of NAV_GROUPS) {
    const item = group.items.find((i) => i.href === pathname);
    if (item) return { group: group.label, title: item.title };
  }
  // dynamic case workspace route
  if (pathname.startsWith("/ops/queue/")) return { group: "Bank Operations", title: "Case workspace" };
  return { group: "", title: "" };
}

export function AppShell({ children }: { children: ReactNode }) {
  const [navOpen, setNavOpen] = useState(false);
  const pathname = usePathname();
  const { tenant, setTenant } = useTenantTheme();
  const crumb = findCrumb(pathname);

  return (
    <div className="flex h-dvh">
      <RouteProgress />
      <Sidebar open={navOpen} onNavigate={() => setNavOpen(false)} />
      {navOpen && (
        <button
          aria-label="Close navigation"
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={() => setNavOpen(false)}
        />
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center gap-3.5 border-b border-[var(--border)] bg-[var(--surface-2)] px-5.5 py-3">
          <button
            aria-label="Toggle navigation"
            className="text-[var(--ink)] md:hidden"
            onClick={() => setNavOpen((v) => !v)}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
          <div className="flex min-w-0 flex-col gap-0.5">
            <span className="text-[10.5px] font-bold tracking-wide text-[var(--muted)] uppercase">{crumb.group}</span>
            <span className="truncate font-display text-[15px] font-bold text-[var(--ink-strong)]">{crumb.title}</span>
          </div>
          <div className="flex-1" />
          <span className="hidden rounded-full bg-[var(--brand-wash)] px-2.5 py-1 text-[11.5px] font-bold text-[var(--brand)] sm:inline-flex">
            Day 2–3 checkpoint set
          </span>
          <div className="flex items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--surface)] p-0.5">
            <button
              onClick={() => setTenant("oblavo")}
              className={`rounded-full px-3 py-1.5 text-[12.5px] font-semibold ${
                tenant === "oblavo" ? "bg-[var(--brand)] text-white" : "text-[var(--muted)]"
              }`}
            >
              Oblavo default
            </button>
            <button
              onClick={() => setTenant("meridian")}
              className={`rounded-full px-3 py-1.5 text-[12.5px] font-semibold ${
                tenant === "meridian" ? "bg-[var(--brand)] text-white" : "text-[var(--muted)]"
              }`}
            >
              Meridian Bank
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-[var(--surface)] p-8">{children}</main>
      </div>
    </div>
  );
}
