"use client";

import { createContext, useCallback, useContext, useMemo, useState, ReactNode } from "react";

export interface ActivityItem {
  id: number;
  message: string;
  timestamp: string;
}

const AdminActivityContext = createContext<{ activity: ActivityItem[]; logActivity: (message: string) => void }>({
  activity: [],
  logActivity: () => {},
});

function nowLabel() {
  return new Date().toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const SEED_ACTIVITY: ActivityItem[] = [
  { id: 1, message: "VAT certificate route enabled by F. Al Zaabi", timestamp: "13 Aug, 09:12" },
  { id: 2, message: "Applicant welcome message updated", timestamp: "12 Aug, 16:40" },
  { id: 3, message: "Al Waha Bank tenant provisioned by Oblavo platform team", timestamp: "10 Aug, 11:05" },
];

export function AdminActivityProvider({ children }: { children: ReactNode }) {
  const [activity, setActivity] = useState<ActivityItem[]>(SEED_ACTIVITY);

  const logActivity = useCallback((message: string) => {
    setActivity((prev) => [{ id: Date.now() + Math.random(), message, timestamp: nowLabel() }, ...prev].slice(0, 8));
  }, []);

  const value = useMemo(() => ({ activity, logActivity }), [activity, logActivity]);

  return <AdminActivityContext.Provider value={value}>{children}</AdminActivityContext.Provider>;
}

export function useAdminActivity() {
  return useContext(AdminActivityContext);
}
