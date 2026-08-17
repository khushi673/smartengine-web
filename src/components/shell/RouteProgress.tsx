"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export function RouteProgress() {
  const pathname = usePathname();
  const [active, setActive] = useState(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setActive(true);
    const timer = setTimeout(() => setActive(false), 280);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed top-0 left-0 z-100 h-[3px] bg-gradient-to-r from-[var(--brand)] to-[var(--sky)] transition-[width,opacity] ease-out ${
        active ? "w-full opacity-100 duration-300" : "w-0 opacity-0 duration-150"
      }`}
    />
  );
}
