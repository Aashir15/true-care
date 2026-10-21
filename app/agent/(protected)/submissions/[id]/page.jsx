import Link from "next/link";
import { notFound } from "next/navigation";

import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { getAgentSession } from "@/lib/agent-auth";

export const dynamic = "force-dynamic";

export default async function AgentSubmissionPage({
  params,
}) {
  const { id } = await params;

  const agent = await getAgentSession();

  const supabase = getSupabaseAdmin();

  const { data: submission, error } =
    await supabase
      .from("pre_onboarding_submissions")
      .select("*")
      .eq("id", id)
      .eq(
        "referral_code",
        agent.referralCode,
      )
      .maybeSingle();

  if (error) {
    console.error(
      "Agent submission detail error:",
      error,
    );
  }

  if (!submission) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f7f5f2] px-5 py-10 md:px-8">
      <div className="mx-auto max-w-[1000px]">
        <Link
          href="/agent"
          className="text-sm font-semibold text-(--primary-color)"
        >
          ← Back to Applications
        </Link>

        <div className="mt-6 rounded-[16px] border border-[#e5e5e5] bg-white p-6 md:p-8">
          <h1 className="text-2xl font-semibold text-[#222]">
            Pre-Onboarding Application
          </h1>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <Field
              label="Business Name"
              value={
                submission.client
                  ?.businessName
              }
            />

            <Field
              label="Contact Name"
              value={
                submission.client
                  ?.contactName
              }
            />

            <Field
              label="Email"
              value={
                submission.client?.email
              }
            />

            <Field
              label="Phone"
              value={
                submission.client?.phone
              }
            />

            <Field
              label="Account Executive"
              value={
                submission.agent_name
              }
            />

            <Field
              label="Referral Code"
              value={
                submission.referral_code
              }
            />

            <Field
              label="Email Status"
              value={
                submission.email_status
              }
            />

            <Field
              label="Submitted"
              value={formatDate(
                submission.created_at,
              )}
            />
          </div>

          <div className="mt-8">
            <h2 className="mb-3 text-lg font-semibold text-[#222]">
              Full Submission Data
            </h2>

            <pre className="overflow-x-auto rounded-[12px] bg-[#f7f7f7] p-5 text-sm text-[#444]">
              {JSON.stringify(
                submission,
                null,
                2,
              )}
            </pre>
          </div>
        </div>
      </div>
    </main>
  );
}

function Field({ label, value }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-[#888]">
        {label}
      </p>

      <p className="mt-1 text-base text-[#333]">
        {value || "-"}
      </p>
    </div>
  );
}

function formatDate(value) {
  if (!value) return "-";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}