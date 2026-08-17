export const NAV_GROUPS = [
  {
    label: "Overview",
    items: [{ href: "/overview", title: "End-to-end workflow" }],
  },
  {
    label: "Applicant",
    items: [
      { href: "/applicant", title: "Invitation landing" },
      { href: "/applicant/consent", title: "Consent & declaration" },
      { href: "/applicant/business", title: "Business details" },
      { href: "/applicant/signatory", title: "Signatory details" },
      { href: "/applicant/documents", title: "Document upload" },
      { href: "/applicant/processing", title: "AI Processing & Extraction" },
      { href: "/applicant/review", title: "Review & verification" },
      { href: "/applicant/confirmation", title: "Submission confirmation" },
      { href: "/applicant/resubmission", title: "Information request (resubmission)" },
    ],
  },
  {
    label: "Bank Operations",
    items: [
      { href: "/ops", title: "Operations dashboard" },
      { href: "/ops/queue", title: "Case queue" },
    ],
  },
  {
    label: "Bank Admin",
    items: [
      { href: "/admin", title: "Admin dashboard" },
      { href: "/admin/branding", title: "Branding & content" },
      { href: "/admin/verification", title: "Verification & integrations" },
    ],
  },
  {
    label: "Oblavo Admin",
    items: [
      { href: "/platform", title: "Platform dashboard" },
      { href: "/platform/tenants", title: "Tenants" },
    ],
  },
] as const;
