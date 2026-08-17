"use client";

import { ReactNode, useState } from "react";

export interface TabItem {
  key: string;
  label: string;
  content: ReactNode;
}

export function Tabs({ items, defaultKey }: { items: TabItem[]; defaultKey?: string }) {
  const [active, setActive] = useState(defaultKey ?? items[0]?.key);
  const activeItem = items.find((i) => i.key === active) ?? items[0];

  return (
    <div>
      <div className="flex gap-0.5 border-b border-[var(--border)] px-1" role="tablist">
        {items.map((item) => (
          <button
            key={item.key}
            role="tab"
            aria-selected={active === item.key}
            onClick={() => setActive(item.key)}
            className={`border-b-2 px-3.5 py-2.5 text-[12.5px] font-bold transition-colors ${
              active === item.key
                ? "border-[var(--brand)] text-[var(--brand)]"
                : "border-transparent text-[var(--muted)] hover:text-[var(--ink-strong)]"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="pt-4.5">{activeItem?.content}</div>
    </div>
  );
}
