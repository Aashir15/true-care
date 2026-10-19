import Link from "next/link";
import { notFound } from "next/navigation";

import { getSupabaseAdmin } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

export default async function ContactSubmissionPage({
  params,
}) {
  const { id } = await params;

  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("contact_submissions")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f7f5f2] px-5 py-10">
      <div className="mx-auto max-w-[900px]">
        <Link
          href="/admin"
          className="text-sm font-semibold text-(--primary-color)"
        >
          ← Back to Dashboard
        </Link>

        <div className="mt-5 rounded-[18px] bg-white p-6 shadow-sm md:p-8">
          <h1 className="text-2xl font-semibold text-[#222]">
            Contact Submission
          </h1>

          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            <Detail
              label="Company"
              value={data.company_name}
            />

            <Detail
              label="Name"
              value={data.name}
            />

            <Detail
              label="Phone"
              value={data.phone}
            />

            <Detail
              label="Email"
              value={data.email}
            />

            <Detail
              label="Address"
              value={data.address}
            />

            <Detail
              label="City"
              value={data.city}
            />

            <Detail
              label="Zip Code"
              value={data.zip_code}
            />

            <Detail
              label="State"
              value={data.state}
            />

            <Detail
              label="Interested In"
              value={data.interest}
            />

            <Detail
              label="Business Type"
              value={
                Array.isArray(
                  data.business_type,
                )
                  ? data.business_type.join(
                      ", ",
                    )
                  : "-"
              }
            />

            {/* <Detail
              label="Agent"
              value={
                data.agent_name || "Direct"
              }
            />

            <Detail
              label="Referral Code"
              value={
                data.referral_code || "-"
              }
            /> */}

            <Detail
              label="Email Status"
              value={data.email_status}
            />
          </div>

          <div className="mt-6">
            <Detail
              label="Message"
              value={data.message}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

function Detail({ label, value }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-[#888]">
        {label}
      </p>

      <p className="mt-1 break-words text-[15px] text-[#222]">
        {value || "-"}
      </p>
    </div>
  );
}