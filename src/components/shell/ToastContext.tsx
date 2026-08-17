"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, ReactNode } from "react";

type Tone = "default" | "success" | "warning";
interface ToastItem {
  id: number;
  message: string;
  tone: Tone;
}

const ToastContext = createContext<{ showToast: (message: string, tone?: Tone) => void }>({
  showToast: () => {},
});

const DISPLAY_MS = 3200;
const EXIT_MS = 260;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [leaving, setLeaving] = useState<Set<number>>(new Set());

  const showToast = useCallback((message: string, tone: Tone = "default") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, tone }]);
    setTimeout(() => setLeaving((prev) => new Set(prev).add(id)), DISPLAY_MS - EXIT_MS);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), DISPLAY_MS);
  }, []);

  const toneClass: Record<Tone, string> = {
    default: "bg-[var(--ink-strong)] text-white",
    success: "bg-[var(--success-solid)] text-white",
    warning: "bg-[var(--warning-solid)] text-white",
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 bottom-5 z-60 flex flex-col items-center gap-2 px-4">
        {toasts.map((t) => (
          <ToastRow key={t.id} leaving={leaving.has(t.id)} tone={t.tone} className={toneClass[t.tone]}>
            {t.message}
          </ToastRow>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastRow({ children, className, leaving, tone }: { children: ReactNode; className: string; leaving: boolean; tone: Tone }) {
  const [entered, setEntered] = useState(false);
  const frame = useRef<number | undefined>(undefined);

  useEffect(() => {
    frame.current = requestAnimationFrame(() => setEntered(true));
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, []);

  const visible = entered && !leaving;

  return (
    <div
      className={`pointer-events-auto flex max-w-100 items-center gap-2 rounded-lg px-4 py-2.5 text-[13px] font-semibold shadow-2xl transition-all duration-250 ease-out ${className} ${
        visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
      }`}
    >
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0 opacity-90">
        {tone === "warning" ? (
          <>
            <path d="M8 2l7 12H1L8 2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
            <path d="M8 6.5v3M8 11.5h.01" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </>
        ) : (
          <path d="M3 8l3.5 3.5L13 5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        )}
      </svg>
      {children}
    </div>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
