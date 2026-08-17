"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { verificationRoutes as seedRoutes, VerificationRoute } from "@/lib/mock-data";

const VerificationRoutesContext = createContext<{
  routes: VerificationRoute[];
  updateRoute: (check: string, route: VerificationRoute["route"], provider: string) => void;
} | null>(null);

export function VerificationRoutesProvider({ children }: { children: ReactNode }) {
  const [routes, setRoutes] = useState<VerificationRoute[]>(seedRoutes);

  const updateRoute = (check: string, route: VerificationRoute["route"], provider: string) => {
    setRoutes((prev) =>
      prev.map((r) => (r.check === check ? { ...r, route, provider: provider || "Provider pending naming", status: "active" } : r))
    );
  };

  return <VerificationRoutesContext.Provider value={{ routes, updateRoute }}>{children}</VerificationRoutesContext.Provider>;
}

export function useVerificationRoutes() {
  const ctx = useContext(VerificationRoutesContext);
  if (!ctx) throw new Error("useVerificationRoutes must be used within VerificationRoutesProvider");
  return ctx;
}
