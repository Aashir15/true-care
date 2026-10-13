import Link from "next/link";
import { notFound } from "next/navigation";

import { getSupabaseAdmin } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

export default async function PreOnboardingDetails({
  params,
}) {
  const { id } = await params;

  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("pre_onboarding_submissions")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    notFound();
  }

  const salesRep = data.sales_rep || {};
  const client = data.client || {};
  const stores = data.stores || [];
  const plans = data.protection_plans || [];
  const otherPlan = data.other_plan || {};
  const onboarding = data.onboarding || {};

  return (
    <main className="min-h-screen bg-[#f7f5f2] px-5 py-10">
      <div className="mx-auto max-w-[1000px]">
        <Link
          href="/admin"
          className="text-sm font-semibold text-(--primary-color)"
        >
          ← Back to Dashboard
        </Link>

        <div className="mt-5 space-y-6">
          <AdminSection title="Sales Rep">
            <DetailsGrid>
              <Detail
                label="Rep Name"
                value={salesRep.name}
              />

              <Detail
                label="Rep Email"
                value={salesRep.email}
              />

              <Detail
                label="Rep Phone"
                value={salesRep.phone}
              />

              <Detail
                label="Date Submitted"
                value={
                  salesRep.dateSubmitted
                }
              />

              <Detail
                label="Referral Code"
                value={
                  data.referral_code ||
                  "Direct"
                }
              />
            </DetailsGrid>
          </AdminSection>

          <AdminSection title="Client Contact">
            <DetailsGrid>
              <Detail
                label="Business Name"
                value={
                  client.businessName
                }
              />

              <Detail
                label="Contact Name"
                value={
                  client.contactName
                }
              />

              <Detail
                label="Title"
                value={client.title}
              />

              <Detail
                label="Email"
                value={client.email}
              />

              <Detail
                label="Phone"
                value={client.phone}
              />

              <Detail
                label="Preferred Contact"
                value={
                  client.preferredContactMethod?.join(
                    ", ",
                  ) || "-"
                }
              />

              <Detail
                label="Best Days / Times"
                value={
                  client.bestDaysTimes
                }
              />

              <Detail
                label="Website"
                value={client.website}
              />
            </DetailsGrid>
          </AdminSection>

          <AdminSection title="Store Locations">
            {stores.length === 0 ? (
              <p className="text-sm text-[#777]">
                No stores provided.
              </p>
            ) : (
              <div className="space-y-4">
                {stores.map(
                  (store, index) => (
                    <div
                      key={index}
                      className="rounded-[12px] border border-[#eee] p-4"
                    >
                      <p className="mb-4 font-semibold text-(--primary-color)">
                        Location {index + 1}
                      </p>

                      <DetailsGrid>
                        <Detail
                          label="Store Name"
                          value={
                            store.storeName
                          }
                        />

                        <Detail
                          label="Street Address"
                          value={
                            store.streetAddress
                          }
                        />

                        <Detail
                          label="City, State, Zip"
                          value={
                            store.cityStateZip
                          }
                        />

                        <Detail
                          label="Store Phone"
                          value={
                            store.storePhone
                          }
                        />

                        <Detail
                          label="Store Manager"
                          value={
                            store.storeManager
                          }
                        />
                      </DetailsGrid>
                    </div>
                  ),
                )}
              </div>
            )}
          </AdminSection>

          <AdminSection title="Protection Plans">
            <div className="space-y-4">
              {plans.map((plan) => (
                <div
                  key={plan.plan}
                  className="rounded-[12px] border border-[#eee] p-4"
                >
                  <strong>
                    {plan.plan}
                  </strong>

                  <p className="mt-2 text-sm">
                    Interested:{" "}
                    {plan.interested
                      ? "Yes"
                      : "No"}
                  </p>

                  <p className="mt-1 text-sm">
                    Terms:{" "}
                    {plan.terms?.length
                      ? plan.terms.join(
                          ", ",
                        )
                      : "-"}
                  </p>
                </div>
              ))}

              {otherPlan?.name && (
                <div className="rounded-[12px] border border-[#eee] p-4">
                  <strong>
                    Other: {otherPlan.name}
                  </strong>

                  <p className="mt-2 text-sm">
                    Interested:{" "}
                    {otherPlan.interested
                      ? "Yes"
                      : "No"}
                  </p>

                  <p className="mt-1 text-sm">
                    Terms:{" "}
                    {otherPlan.terms
                      ?.length
                      ? otherPlan.terms.join(
                          ", ",
                        )
                      : "-"}
                  </p>
                </div>
              )}
            </div>
          </AdminSection>

          <AdminSection title="Onboarding Meeting">
            <DetailsGrid>
              <Detail
                label="Schedule Meeting"
                value={
                  onboarding.scheduleMeeting
                }
              />

              <Detail
                label="Meeting Format"
                value={
                  onboarding.meetingFormat
                }
              />

              <Detail
                label="Client Time Zone"
                value={
                  onboarding.clientTimeZone
                }
              />
            </DetailsGrid>

            <div className="mt-5 space-y-3">
              {onboarding.options?.map(
                (option, index) => (
                  <div
                    key={index}
                    className="rounded-[12px] border border-[#eee] p-4"
                  >
                    <strong>
                      {option.label}
                    </strong>

                    <DetailsGrid>
                      <Detail
                        label="Date"
                        value={
                          option.date
                        }
                      />

                      <Detail
                        label="Time"
                        value={
                          option.time
                        }
                      />

                      <Detail
                        label="Notes"
                        value={
                          option.notes
                        }
                      />
                    </DetailsGrid>
                  </div>
                ),
              )}
            </div>
          </AdminSection>

          <AdminSection title="Notes for TruCare Team">
            <p className="whitespace-pre-wrap text-[15px] text-[#333]">
              {data.notes ||
                "No additional notes."}
            </p>
          </AdminSection>
        </div>
      </div>
    </main>
  );
}

function AdminSection({
  title,
  children,
}) {
  return (
    <section className="rounded-[18px] bg-white p-6 shadow-sm md:p-8">
      <h2 className="mb-6 text-xl font-semibold text-(--primary-color)">
        {title}
      </h2>

      {children}
    </section>
  );
}

function DetailsGrid({ children }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {children}
    </div>
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