import { notFound } from "next/navigation";
import { getCase } from "@/lib/mock-data";
import { CaseWorkspaceClient } from "@/components/ops/CaseWorkspaceClient";

export default async function CaseWorkspacePage({ params }: { params: Promise<{ caseId: string }> }) {
  const { caseId } = await params;
  if (!getCase(caseId)) notFound();
  return <CaseWorkspaceClient caseId={caseId} />;
}
