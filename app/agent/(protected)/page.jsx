import Link from "next/link";

import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { getAgentSession } from "@/lib/agent-auth";

export const dynamic = "force-dynamic";

export default async function AgentDashboard() {
  const agent = await getAgentSession();

  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("pre_onboarding_submissions")
    .select("*")
    .eq(
      "referral_code",
      agent.referralCode,
    )
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error(
      "Agent submissions error:",
      error,
    );
  }

  const submissions = data || [];

  return (
    <main className="min-h-screen bg-[#f7f5f2] px-5 py-8 md:px-8 md:py-12">
      <div className="mx-auto max-w-[1200px]">
        <header className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-(--primary-color)">
              TruCare Protection
            </p>

            <h1 className="mt-1 text-3xl font-semibold text-[#222]">
              Welcome, {agent.name}
            </h1>

            <p className="mt-1 text-sm text-[#777]">
              Your Pre-Onboarding submissions
            </p>
          </div>

          <form
            action="/api/agent/logout"
            method="POST"
          >
            <button
              type="submit"
              className="rounded-full border border-[#ddd] bg-white px-5 py-2.5 text-sm font-semibold text-[#444]"
            >
              Logout
            </button>
          </form>
        </header>

        <section className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-[#222]">
              Applications
            </h2>

            <span className="text-sm text-[#777]">
              {submissions.length} total
            </span>
          </div>

          <div className="overflow-hidden rounded-[16px] border border-[#e5e5e5] bg-white">
            {submissions.length === 0 ? (
              <div className="px-6 py-14 text-center text-sm text-[#777]">
                No submissions yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px]">
                  <thead className="bg-[#861126] text-left text-sm text-white">
                    <tr>
                      <th className="px-4 py-4">
                        Business
                      </th>

                      <th className="px-4 py-4">
                        Contact
                      </th>

                      <th className="px-4 py-4">
                        Email
                      </th>

                      <th className="px-4 py-4">
                        Status
                      </th>

                      <th className="px-4 py-4">
                        Date
                      </th>

                      <th className="px-4 py-4" />
                    </tr>
                  </thead>

                  <tbody>
                    {submissions.map(
                      (item) => (
                        <tr
                          key={item.id}
                          className="border-t border-[#eee]"
                        >
                          <td className="px-4 py-4 text-sm text-[#444]">
                            {item.client
                              ?.businessName ||
                              "-"}
                          </td>

                          <td className="px-4 py-4 text-sm text-[#444]">
                            {item.client
                              ?.contactName ||
                              "-"}
                          </td>

                          <td className="px-4 py-4 text-sm text-[#444]">
                            {item.client
                              ?.email || "-"}
                          </td>

                          <td className="px-4 py-4 text-sm">
                            {item.email_status ||
                              "pending"}
                          </td>

                          <td className="px-4 py-4 text-sm text-[#444]">
                            {formatDate(
                              item.created_at,
                            )}
                          </td>

                          <td className="px-4 py-4">
                            <Link
                              href={`/agent/submissions/${item.id}`}
                              className="font-semibold text-(--primary-color)"
                            >
                              View
                            </Link>
                          </td>
                        </tr>
                      ),
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
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