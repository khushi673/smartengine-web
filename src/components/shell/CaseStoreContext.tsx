"use client";

import { createContext, useCallback, useContext, useMemo, useState, ReactNode } from "react";
import { Case, CaseStatus, cases as seedCases, TimelineEvent } from "@/lib/mock-data";

interface CaseStoreValue {
  listCases: () => Case[];
  getCase: (id: string) => Case | undefined;
  markReadyForHandoff: (id: string) => void;
  requestInformation: (id: string, note: string) => void;
  requestCorrection: (id: string, field: string, note: string) => void;
  resolveOpenItems: (id: string) => void;
}

const CaseStoreContext = createContext<CaseStoreValue | null>(null);

function nowLabel() {
  return new Date().toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function withTimeline(c: Case, event: TimelineEvent): Case {
  return { ...c, timeline: [...c.timeline, event] };
}

export function CaseStoreProvider({ children }: { children: ReactNode }) {
  const [store, setStore] = useState<Record<string, Case>>(() =>
    Object.fromEntries(seedCases.map((c) => [c.id, c]))
  );

  const markReadyForHandoff = useCallback((id: string) => {
    setStore((prev) => {
      const c = prev[id];
      if (!c) return prev;
      const updated = withTimeline({ ...c, status: "ready_for_handoff" as CaseStatus }, {
        label: "Marked ready for handoff",
        actor: "Operations",
        timestamp: nowLabel(),
        tone: "success",
      });
      return { ...prev, [id]: updated };
    });
  }, []);

  const requestInformation = useCallback((id: string, note: string) => {
    setStore((prev) => {
      const c = prev[id];
      if (!c) return prev;
      const updated = withTimeline({ ...c, status: "info_requested" as CaseStatus }, {
        label: note ? `Information requested — ${note}` : "Information requested",
        actor: "Operations",
        timestamp: nowLabel(),
        tone: "warning",
      });
      return { ...prev, [id]: updated };
    });
  }, []);

  const requestCorrection = useCallback((id: string, field: string, note: string) => {
    setStore((prev) => {
      const c = prev[id];
      if (!c) return prev;
      const updated = withTimeline({ ...c, status: "info_requested" as CaseStatus }, {
        label: `Correction requested — ${field}${note ? `: ${note}` : ""}`,
        actor: "Operations",
        timestamp: nowLabel(),
        tone: "warning",
      });
      return { ...prev, [id]: updated };
    });
  }, []);

  const resolveOpenItems = useCallback((id: string) => {
    setStore((prev) => {
      const c = prev[id];
      if (!c) return prev;
      const resolvedVerification = c.verification.map((v) =>
        v.state === "mismatch" || v.state === "unable_to_verify" ? { ...v, state: "verified" as const, extracted: v.applicantEntered } : v
      );
      const updated = withTimeline(
        { ...c, verification: resolvedVerification, status: "under_review" as CaseStatus },
        {
          label: "Applicant resubmitted requested items",
          actor: "Applicant",
          timestamp: nowLabel(),
          tone: "success",
        }
      );
      return { ...prev, [id]: updated };
    });
  }, []);

  const value = useMemo<CaseStoreValue>(
    () => ({
      listCases: () => Object.values(store),
      getCase: (id: string) => store[id],
      markReadyForHandoff,
      requestInformation,
      requestCorrection,
      resolveOpenItems,
    }),
    [store, markReadyForHandoff, requestInformation, requestCorrection, resolveOpenItems]
  );

  return <CaseStoreContext.Provider value={value}>{children}</CaseStoreContext.Provider>;
}

export function useCaseStore() {
  const ctx = useContext(CaseStoreContext);
  if (!ctx) throw new Error("useCaseStore must be used within CaseStoreProvider");
  return ctx;
}
