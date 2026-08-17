import { ReactNode } from "react";
import { TenantThemeProvider } from "@/components/shell/TenantThemeContext";
import { CaseStoreProvider } from "@/components/shell/CaseStoreContext";
import { VerificationRoutesProvider } from "@/components/shell/VerificationRoutesContext";
import { AdminActivityProvider } from "@/components/shell/AdminActivityContext";
import { ToastProvider } from "@/components/shell/ToastContext";
import { AppShell } from "@/components/shell/AppShell";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <TenantThemeProvider>
      <CaseStoreProvider>
        <VerificationRoutesProvider>
          <AdminActivityProvider>
            <ToastProvider>
              <AppShell>{children}</AppShell>
            </ToastProvider>
          </AdminActivityProvider>
        </VerificationRoutesProvider>
      </CaseStoreProvider>
    </TenantThemeProvider>
  );
}
