"use client";

import { useRouter } from "next/navigation";
import { PhoneFrame } from "@/components/ui/DeviceFrame";
import { Button } from "@/components/ui/Button";
import { ProgressSteps } from "@/components/ui/ProgressSteps";
import { Field, Input, Select } from "@/components/ui/Field";
import { useTenantTheme } from "@/components/shell/TenantThemeContext";

export default function SignatoryDetailsPage() {
  const { tenant } = useTenantTheme();
  const router = useRouter();

  return (
    <PhoneFrame tenant={tenant}>
      <div className="flex flex-col gap-1">
        <span className="text-[10.5px] font-bold tracking-wide text-[var(--t-primary,var(--brand))] uppercase">
          Step 3 of 6 · Signatory details
        </span>
        <h1 className="text-[19px]">Who is completing this application?</h1>
      </div>
      <ProgressSteps total={6} current={3} />

      <Field label="Authorised signatory name">
        <Input defaultValue="Fatima Al Suwaidi" />
      </Field>
      <Field label="Emirates ID number">
        <Input defaultValue="784-1990-1234567-1" />
      </Field>
      <Field label="Role / authority basis">
        <Select defaultValue="General Manager (POA)">
          <option>Owner</option>
          <option>General Manager (POA)</option>
          <option>Delegated representative</option>
        </Select>
      </Field>
      <Field label="Mobile number">
        <Input defaultValue="+971 50 123 4567" />
      </Field>
      <Field label="Email">
        <Input defaultValue="fatima@alnoortrading.ae" />
      </Field>

      <div className="mt-auto flex gap-2.5 pt-2">
        <Button variant="secondary" onClick={() => router.push("/applicant/business")}>
          Back
        </Button>
        <Button className="flex-1" onClick={() => router.push("/applicant/documents")}>
          Continue to documents
        </Button>
      </div>
    </PhoneFrame>
  );
}
