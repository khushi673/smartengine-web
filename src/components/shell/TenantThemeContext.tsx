"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Tenant = "oblavo" | "meridian";

const TenantThemeContext = createContext<{ tenant: Tenant; setTenant: (t: Tenant) => void }>({
  tenant: "meridian",
  setTenant: () => {},
});

export function TenantThemeProvider({ children }: { children: ReactNode }) {
  const [tenant, setTenant] = useState<Tenant>("meridian");
  return <TenantThemeContext.Provider value={{ tenant, setTenant }}>{children}</TenantThemeContext.Provider>;
}

export function useTenantTheme() {
  return useContext(TenantThemeContext);
}
