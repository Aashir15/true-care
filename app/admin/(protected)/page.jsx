import Link from "next/link";

import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { agents } from "@/lib/agents";

export const dynamic = "force-dynamic";

export default async function AdminDashboard({ searchParams }) {
  const params = await searchParams;

  const formFilter = params?.form || "all";
  const agentFilter = params?.agent || "all";
  const statusFilter = params?.status || "all";

  const supabase = getSupabaseAdmin();

  const [contactResult, preOnboardingResult] = await Promise.all([
    supabase.from("contact_submissions").select("*").order("created_at", {
      ascending: false,
    }),

    supabase
      .from("pre_onboarding_submissions")
      .select("*")
      .order("created_at", {
        ascending: false,
      }),
  ]);

  if (contactResult.error) {
    console.error("Contact submissions error:", contactResult.error);
  }

  if (preOnboardingResult.error) {
    console.error(
      "Pre-onboarding submissions error:",
      preOnboardingResult.error,
    );
  }

  const allContacts = contactResult.data || [];
  const allPreOnboarding = preOnboardingResult.data || [];

  function matchesAgent(item) {
    if (agentFilter === "all") {
      return true;
    }

    if (agentFilter === "direct") {
      return !item.agent_name;
    }

    return item.agent_name === agentFilter;
  }

  function matchesStatus(item) {
    if (statusFilter === "all") {
      return true;
    }

    return item.email_status === statusFilter;
  }

  const contacts =
    formFilter === "pre-onboarding"
      ? []
      : allContacts.filter((item) => matchesStatus(item));

  const preOnboarding =
    formFilter === "contact"
      ? []
      : allPreOnboarding.filter(
          (item) => matchesAgent(item) && matchesStatus(item),
        );

  const total = contacts.length + preOnboarding.length;

  const agentOptions = [
    ...new Set(Object.values(agents).map((agent) => agent.name)),
  ].sort((a, b) => a.localeCompare(b));

  return (
    <main className="min-h-screen bg-[#f7f5f2] px-5 py-8 md:px-8 md:py-12">
      <div className="mx-auto max-w-300">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-(--primary-color)">
              TruCare
            </p>

            <h1 className="mt-1 text-3xl font-semibold text-[#222]">
              Dashboard
            </h1>
          </div>

          <form action="/api/admin/logout" method="POST">
            <button
              type="submit"
              className="rounded-full border border-[#ddd] bg-white px-5 py-2.5 text-sm font-semibold text-[#444]"
            >
              Logout
            </button>
          </form>
        </header>

        <section className="mt-8 rounded-[16px] border border-[#e5e5e5] bg-white p-5">
          <form
            action="/admin"
            method="GET"
            className="grid gap-4 md:grid-cols-[1fr_1fr_1fr_auto_auto] md:items-end"
          >
            {/* Form Type */}
            <div>
              <label
                htmlFor="form"
                className="mb-2 block text-xs font-semibold uppercase tracking-wide text-[#777]"
              >
                Form
              </label>

              <select
                id="form"
                name="form"
                defaultValue={formFilter}
                className="h-[44px] w-full rounded-[10px] border border-[#ddd] bg-white px-3 text-sm outline-none focus:border-(--primary-color)"
              >
                <option value="all">All Forms</option>

                <option value="contact">Contact Forms</option>

                <option value="pre-onboarding">Pre-Onboarding</option>
              </select>
            </div>

            {/* Agent */}
            {formFilter !== "contact" && (
              <div>
                <label
                  htmlFor="agent"
                  className="mb-2 block text-xs font-semibold uppercase tracking-wide text-[#777]"
                >
                  Agent
                </label>

                <select
                  id="agent"
                  name="agent"
                  defaultValue={agentFilter}
                  className="h-[44px] w-full rounded-[10px] border border-[#ddd] bg-white px-3 text-sm outline-none focus:border-(--primary-color)"
                >
                  <option value="all">All Agents</option>

                  <option value="direct">Direct Website Lead</option>

                  {agentOptions.map((agent) => (
                    <option key={agent} value={agent}>
                      {agent}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Status */}
            <div>
              <label
                htmlFor="status"
                className="mb-2 block text-xs font-semibold uppercase tracking-wide text-[#777]"
              >
                Email Status
              </label>

              <select
                id="status"
                name="status"
                defaultValue={statusFilter}
                className="h-[44px] w-full rounded-[10px] border border-[#ddd] bg-white px-3 text-sm outline-none focus:border-(--primary-color)"
              >
                <option value="all">All Statuses</option>

                <option value="sent">Sent</option>

                <option value="pending">Pending</option>

                <option value="failed">Failed</option>
              </select>
            </div>

            <button
              type="submit"
              className="
        h-[44px]
        rounded-[10px]
        bg-(--primary-color)
        px-6
        text-sm font-semibold
        uppercase text-white
        transition
        hover:opacity-90
      "
            >
              Filter
            </button>

            <Link
              href="/admin"
              className="
        flex h-[44px]
        items-center justify-center
        rounded-[10px]
        border border-[#ddd]
        bg-white
        px-6
        text-sm font-semibold
        text-[#555]
        transition
        hover:bg-[#f7f7f7]
      "
            >
              Reset
            </Link>
          </form>
        </section>

        {/* Stats */}
        <section className="mt-8 grid gap-4 sm:grid-cols-3">
          <StatCard label="Total Submissions" value={total} />

          <StatCard label="Contact Forms" value={contacts.length} />

          <StatCard label="Pre-Onboarding" value={preOnboarding.length} />
        </section>

        {/* Contact forms */}
        {formFilter !== "pre-onboarding" && (
          <section className="mt-10">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-[#222]">
                Contact Form Submissions
              </h2>

              <span className="text-sm text-[#777]">
                {contacts.length} total
              </span>
            </div>

            <div className="overflow-hidden rounded-[16px] border border-[#e5e5e5] bg-white">
              {contacts.length === 0 ? (
                <EmptyState />
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[750px]">
                    <thead className="bg-[#861126] text-left text-sm text-white">
                      <tr>
                        <TableHeader>Company</TableHeader>
                        <TableHeader>Name</TableHeader>
                        <TableHeader>Email</TableHeader>
                        {/* <TableHeader>Agent</TableHeader> */}
                        <TableHeader>Status</TableHeader>
                        <TableHeader>Date</TableHeader>
                        <TableHeader />
                      </tr>
                    </thead>

                    <tbody>
                      {contacts.map((item) => (
                        <tr key={item.id} className="border-t border-[#eee]">
                          <TableCell>{item.company_name}</TableCell>

                          <TableCell>{item.name}</TableCell>

                          <TableCell>{item.email}</TableCell>

                          {/* <TableCell>{item.agent_name || "Direct"}</TableCell> */}

                          <TableCell>
                            <Status status={item.email_status} />
                          </TableCell>

                          <TableCell>{formatDate(item.created_at)}</TableCell>

                          <TableCell>
                            <Link
                              href={`/admin/contact/${item.id}`}
                              className="font-semibold text-(--primary-color)"
                            >
                              View
                            </Link>
                          </TableCell>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Pre-Onboarding */}
        {formFilter !== "contact" && (
          <section className="mt-10">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-[#222]">
                Pre-Onboarding Submissions
              </h2>

              <span className="text-sm text-[#777]">
                {preOnboarding.length} total
              </span>
            </div>

            <div className="overflow-hidden rounded-[16px] border border-[#e5e5e5] bg-white">
              {preOnboarding.length === 0 ? (
                <EmptyState />
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[750px]">
                    <thead className="bg-[#861126] text-left text-sm text-white">
                      <tr>
                        <TableHeader>Business</TableHeader>

                        <TableHeader>Contact</TableHeader>

                        <TableHeader>Email</TableHeader>

                        <TableHeader>Account Executive</TableHeader>

                        <TableHeader>Status</TableHeader>

                        <TableHeader>Date</TableHeader>

                        <TableHeader />
                      </tr>
                    </thead>

                    <tbody>
                      {preOnboarding.map((item) => (
                        <tr key={item.id} className="border-t border-[#eee]">
                          <TableCell>
                            {item.client?.businessName || "-"}
                          </TableCell>

                          <TableCell>
                            {item.client?.contactName || "-"}
                          </TableCell>

                          <TableCell>{item.client?.email || "-"}</TableCell>

                          <TableCell>{item.agent_name || "Direct"}</TableCell>

                          <TableCell>
                            <Status status={item.email_status} />
                          </TableCell>

                          <TableCell>{formatDate(item.created_at)}</TableCell>

                          <TableCell>
                            <Link
                              href={`/admin/pre-onboarding/${item.id}`}
                              className="font-semibold text-(--primary-color)"
                            >
                              View
                            </Link>
                          </TableCell>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

function StatCard({ label, value }) {
  return (
    <article className="rounded-[16px] border border-[#e8e8e8] bg-white p-6">
      <p className="text-sm text-[#777]">{label}</p>

      <strong className="mt-2 block text-3xl font-semibold text-(--primary-color)">
        {value}
      </strong>
    </article>
  );
}

function TableHeader({ children }) {
  return (
    <th className="whitespace-nowrap px-4 py-4 font-semibold">{children}</th>
  );
}

function TableCell({ children }) {
  return (
    <td className="whitespace-nowrap px-4 py-4 text-sm text-[#444]">
      {children}
    </td>
  );
}

function Status({ status }) {
  const sent = status === "sent";

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
        sent
          ? "bg-green-50 text-green-700"
          : status === "failed"
            ? "bg-red-50 text-red-700"
            : "bg-yellow-50 text-yellow-700"
      }`}
    >
      {status || "pending"}
    </span>
  );
}

function EmptyState() {
  return (
    <div className="px-6 py-12 text-center text-sm text-[#777]">
      No submissions yet.
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
