"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { agents } from "@/lib/agents";

const REP_EMAIL = "info@trucareprotection.com";
const REP_PHONE = "1-888-699-2878";

const plans = [
  "Furniture Protection Plan",
  "Appliance Protection Plan",
  "Electronics Protection Plan",
];

const terms = ["1", "2", "3", "4", "5"];

const initialStores = Array.from({ length: 4 }, () => ({
  storeName: "",
  streetAddress: "",
  cityStateZip: "",
  storePhone: "",
  storeManager: "",
}));

const initialMeetings = [
  {
    label: "1st choice",
    date: "",
    time: "",
    notes: "",
  },
  {
    label: "2nd choice",
    date: "",
    time: "",
    notes: "",
  },
  {
    label: "3rd choice",
    date: "",
    time: "",
    notes: "",
  },
];

export default function ContactUsPage() {
  const searchParams = useSearchParams();

  const referralCode = searchParams.get("ref");

  const agent = referralCode ? agents[referralCode] : null;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const [stores, setStores] = useState(initialStores);

  const [meetings, setMeetings] = useState(initialMeetings);

  const submittedDate = useMemo(() => {
    return new Intl.DateTimeFormat("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    }).format(new Date());
  }, []);

  useEffect(() => {
    if (!referralCode || !agent) return;

    document.cookie = [
      `agent_ref=${encodeURIComponent(referralCode)}`,
      "path=/",
      "max-age=2592000",
      "samesite=lax",
    ].join("; ");
  }, [referralCode, agent]);

  function updateStore(index, field, value) {
    setStores((current) =>
      current.map((store, storeIndex) =>
        storeIndex === index
          ? {
              ...store,
              [field]: value,
            }
          : store,
      ),
    );
  }

  function updateMeeting(index, field, value) {
    setMeetings((current) =>
      current.map((meeting, meetingIndex) =>
        meetingIndex === index
          ? {
              ...meeting,
              [field]: value,
            }
          : meeting,
      ),
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus({
      type: "",
      message: "",
    });

    const businessName = formData.get("businessName")?.trim();
    const contactName = formData.get("contactName")?.trim();
    const clientEmail = formData.get("clientEmail")?.trim();
    const clientPhone = formData.get("clientPhone")?.trim();

    if (!businessName) {
      setStatus({
        type: "error",
        message: "Please enter the business name.",
      });

      form.elements.businessName?.focus();
      return;
    }

    if (!contactName) {
      setStatus({
        type: "error",
        message: "Please enter the contact name.",
      });

      form.elements.contactName?.focus();
      return;
    }

    if (!clientEmail) {
      setStatus({
        type: "error",
        message: "Please enter the email address.",
      });

      form.elements.clientEmail?.focus();
      return;
    }

    if (!clientPhone) {
      setStatus({
        type: "error",
        message: "Please enter the phone number.",
      });

      form.elements.clientPhone?.focus();
      return;
    }

    setIsSubmitting(true);

    setStatus({
      type: "",
      message: "",
    });

    const protectionPlans = plans.map((plan) => ({
      plan,
      interested: formData.get(`plan-${plan}`) === "yes",
      terms: formData.getAll(`terms-${plan}`),
    }));

    const payload = {
      referralCode,

      salesRep: {
        name: agent?.name || "Direct Website Lead",
        email: REP_EMAIL,
        phone: REP_PHONE,
        dateSubmitted: submittedDate,
      },

      client: {
        businessName: formData.get("businessName"),
        contactName: formData.get("contactName"),
        title: formData.get("title"),
        email: formData.get("clientEmail"),
        phone: formData.get("clientPhone"),
        preferredContactMethod: formData.getAll("preferredContactMethod"),
        bestDaysTimes: formData.get("bestDaysTimes"),
        website: formData.get("website"),
      },

      stores,

      protectionPlans,

      otherPlan: {
        name: formData.get("otherPlan"),
        interested: formData.get("otherPlanInterested") === "yes",
        terms: formData.getAll("otherPlanTerms"),
      },

      onboarding: {
        scheduleMeeting: formData.get("scheduleMeeting"),
        meetingFormat: formData.get("meetingFormat"),
        clientTimeZone: formData.get("clientTimeZone"),
        options: meetings,
      },

      notes: formData.get("notes"),
    };

    try {
      const response = await fetch("/api/pre-onboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to send form.");
      }

      setStatus({
        type: "success",
        message: "Pre-onboarding form submitted successfully.",
      });

      form.reset();
      setStores(initialStores);
      setMeetings(initialMeetings);
    } catch (error) {
      console.error(error);

      setStatus({
        type: "error",
        message: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="bg-[#f7f5f2] py-8 md:py-12">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="
          mx-auto
          w-[calc(100%-24px)]
          max-w-300
          overflow-hidden
          bg-white
          shadow-[0_12px_50px_rgba(0,0,0,0.08)]
        "
      >
        <div className="px-5 py-8 sm:px-8 md:px-12">
          {/* Section 1 */}
          <FormSection number="1" title="Sales Rep">
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Rep Name">
                <input
                  name="repName"
                  value={agent?.name || "Direct Website Lead"}
                  readOnly
                  className={readonlyInputClass}
                />
              </Field>

              <Field label="Rep Email">
                <input
                  name="repEmail"
                  value={REP_EMAIL}
                  readOnly
                  className={readonlyInputClass}
                />
              </Field>

              <Field label="Rep Phone">
                <input
                  name="repPhone"
                  value={REP_PHONE}
                  readOnly
                  className={readonlyInputClass}
                />
              </Field>

              <Field label="Date Submitted">
                <input
                  name="dateSubmitted"
                  value={submittedDate}
                  readOnly
                  className={readonlyInputClass}
                />
              </Field>
            </div>
          </FormSection>

          {/* Section 2 */}
          <FormSection number="2" title="Client Contact">
            <div className="space-y-5">
              <Field label="Business Name">
                <input name="businessName" required className={inputClass} />
              </Field>

              <div className="grid gap-5 md:grid-cols-2">
                <Field label="Contact Name">
                  <input name="contactName" required className={inputClass} />
                </Field>

                <Field label="Title">
                  <input name="title" className={inputClass} />
                </Field>

                <Field label="Email">
                  <input
                    type="email"
                    name="clientEmail"
                    required
                    className={inputClass}
                  />
                </Field>

                <Field label="Phone">
                  <input
                    type="tel"
                    name="clientPhone"
                    required
                    className={inputClass}
                  />
                </Field>

                <Field label="Preferred Contact Method">
                  <div className="flex flex-wrap gap-5 pt-2">
                    {["Call", "Text", "Email"].map((method) => (
                      <Checkbox
                        key={method}
                        name="preferredContactMethod"
                        value={method}
                        label={method}
                      />
                    ))}
                  </div>
                </Field>

                <Field label="Best Days and Times to Reach">
                  <input name="bestDaysTimes" className={inputClass} />
                </Field>
              </div>

              <Field label="Website">
                <input type="url" name="website" className={inputClass} />
              </Field>
            </div>
          </FormSection>

          {/* Section 3 */}
          <FormSection
            number="3"
            title="Store Locations"
            description="Add a row for each location that will sell TruCare plans."
          >
            <div className="hidden overflow-hidden border border-[#ddd] md:block">
              <div className="grid grid-cols-[1.1fr_1.6fr_1.4fr_1fr_1.25fr] bg-[#861126] text-md font-semibold uppercase text-white">
                <TableHeading>Store Name</TableHeading>
                <TableHeading>Street Address</TableHeading>
                <TableHeading>City, State, Zip</TableHeading>
                <TableHeading>Store Phone</TableHeading>
                <TableHeading>Store Manager</TableHeading>
              </div>

              {stores.map((store, index) => (
                <div
                  key={index}
                  className="grid grid-cols-[1.1fr_1.6fr_1.4fr_1fr_1.25fr] border-t border-[#e2e2e2]"
                >
                  <StoreInput
                    value={store.storeName}
                    onChange={(value) => updateStore(index, "storeName", value)}
                  />

                  <StoreInput
                    value={store.streetAddress}
                    onChange={(value) =>
                      updateStore(index, "streetAddress", value)
                    }
                  />

                  <StoreInput
                    value={store.cityStateZip}
                    onChange={(value) =>
                      updateStore(index, "cityStateZip", value)
                    }
                  />

                  <StoreInput
                    value={store.storePhone}
                    onChange={(value) =>
                      updateStore(index, "storePhone", value)
                    }
                  />

                  <StoreInput
                    value={store.storeManager}
                    onChange={(value) =>
                      updateStore(index, "storeManager", value)
                    }
                  />
                </div>
              ))}
            </div>

            {/* Mobile store cards */}
            <div className="space-y-4 md:hidden">
              {stores.map((store, index) => (
                <article
                  key={index}
                  className="border border-[#dedbd8] bg-[#faf9f7] p-4"
                >
                  <h3 className="mb-4 font-semibold text-[#861126]">
                    Location {index + 1}
                  </h3>

                  <div className="space-y-4">
                    <MobileStoreField
                      label="Store Name / #"
                      value={store.storeName}
                      onChange={(value) =>
                        updateStore(index, "storeName", value)
                      }
                    />

                    <MobileStoreField
                      label="Street Address"
                      value={store.streetAddress}
                      onChange={(value) =>
                        updateStore(index, "streetAddress", value)
                      }
                    />

                    <MobileStoreField
                      label="City, State, Zip"
                      value={store.cityStateZip}
                      onChange={(value) =>
                        updateStore(index, "cityStateZip", value)
                      }
                    />

                    <MobileStoreField
                      label="Store Phone"
                      value={store.storePhone}
                      onChange={(value) =>
                        updateStore(index, "storePhone", value)
                      }
                    />

                    <MobileStoreField
                      label="Store Manager"
                      value={store.storeManager}
                      onChange={(value) =>
                        updateStore(index, "storeManager", value)
                      }
                    />
                  </div>
                </article>
              ))}
            </div>
          </FormSection>

          {/* Section 4 */}
          <FormSection
            number="4"
            title="Protection Plans of Interest"
            description="Check the plans and terms the client is interested in selling."
          >
            <div className="overflow-hidden border border-[#e2dedb]">
              <div className="hidden grid-cols-[2fr_0.8fr_2fr] bg-[#861126] px-4 py-3 text-md font-semibold uppercase text-white md:grid">
                <span>Plan</span>
                <span>Interested?</span>
                <span>Terms (Years)</span>
              </div>

              {plans.map((plan, index) => (
                <div
                  key={plan}
                  className={`
                    grid gap-4 px-4 py-4
                    md:grid-cols-[2fr_0.8fr_2fr]
                    ${index % 2 === 0 ? "bg-[#f3eeea]" : "bg-white"}
                  `}
                >
                  <span className="text-md text-[#333]">{plan}</span>

                  <Checkbox name={`plan-${plan}`} value="yes" label="Yes" />

                  <div className="flex flex-wrap gap-4">
                    {terms.map((term) => (
                      <Checkbox
                        key={term}
                        name={`terms-${plan}`}
                        value={term}
                        label={term}
                      />
                    ))}
                  </div>
                </div>
              ))}

              <div className="grid gap-4 bg-white px-4 py-4 md:grid-cols-[2fr_0.8fr_2fr]">
                <div className="flex items-center gap-2">
                  <span className="text-sm">Other:</span>

                  <input
                    name="otherPlan"
                    className="h-9 min-w-0 flex-1 border border-[#ccc] px-2 outline-none focus:border-[#861126]"
                  />
                </div>

                <Checkbox name="otherPlanInterested" value="yes" label="Yes" />

                <div className="flex flex-wrap gap-4">
                  {terms.map((term) => (
                    <Checkbox
                      key={term}
                      name="otherPlanTerms"
                      value={term}
                      label={term}
                    />
                  ))}
                </div>
              </div>
            </div>
          </FormSection>

          {/* Section 5 */}
          <FormSection
            number="5"
            title="Schedule an Onboarding Meeting"
            description="List up to three dates and times that work for the client. TruCare will confirm one by email."
          >
            <div className="grid gap-5 md:grid-cols-3">
              <Field label="Schedule a Meeting?">
                <div className="flex gap-5 pt-2">
                  <Radio name="scheduleMeeting" value="Yes" label="Yes" />

                  <Radio
                    name="scheduleMeeting"
                    value="Not yet"
                    label="Not yet"
                  />
                </div>
              </Field>

              <Field label="Meeting Format">
                <div className="flex gap-5 pt-2">
                  <Radio name="meetingFormat" value="Phone" label="Phone" />

                  <Radio name="meetingFormat" value="Zoom" label="Zoom" />
                </div>
              </Field>

              <Field label="Client Time Zone">
                <input name="clientTimeZone" className={inputClass} />
              </Field>
            </div>

            <div className="mt-6 hidden overflow-hidden border border-[#ddd] md:block">
              <div className="grid grid-cols-[1fr_1.3fr_1.2fr_2.1fr] bg-[#861126] text-md font-semibold uppercase text-white">
                <TableHeading>Option</TableHeading>
                <TableHeading>Date</TableHeading>
                <TableHeading>Time</TableHeading>
                <TableHeading>Notes</TableHeading>
              </div>

              {meetings.map((meeting, index) => (
                <div
                  key={meeting.label}
                  className="grid grid-cols-[1fr_1.3fr_1.2fr_2.1fr] border-t border-[#ddd]"
                >
                  <div className="flex min-h-[48px] items-center px-3 text-md">
                    {meeting.label}
                  </div>

                  <input
                    type="date"
                    value={meeting.date}
                    onChange={(e) =>
                      updateMeeting(index, "date", e.target.value)
                    }
                    className={tableInputClass}
                  />

                  <input
                    type="time"
                    value={meeting.time}
                    onChange={(e) =>
                      updateMeeting(index, "time", e.target.value)
                    }
                    className={tableInputClass}
                  />

                  <input
                    value={meeting.notes}
                    onChange={(e) =>
                      updateMeeting(index, "notes", e.target.value)
                    }
                    className={tableInputClass}
                  />
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-4 md:hidden">
              {meetings.map((meeting, index) => (
                <article
                  key={meeting.label}
                  className="border border-[#ddd] bg-[#faf9f7] p-4"
                >
                  <h3 className="mb-4 font-semibold text-[#861126]">
                    {meeting.label}
                  </h3>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Date">
                      <input
                        type="date"
                        value={meeting.date}
                        onChange={(e) =>
                          updateMeeting(index, "date", e.target.value)
                        }
                        className={inputClass}
                      />
                    </Field>

                    <Field label="Time">
                      <input
                        type="time"
                        value={meeting.time}
                        onChange={(e) =>
                          updateMeeting(index, "time", e.target.value)
                        }
                        className={inputClass}
                      />
                    </Field>
                  </div>

                  <div className="mt-4">
                    <Field label="Notes">
                      <input
                        value={meeting.notes}
                        onChange={(e) =>
                          updateMeeting(index, "notes", e.target.value)
                        }
                        className={inputClass}
                      />
                    </Field>
                  </div>
                </article>
              ))}
            </div>
          </FormSection>

          {/* Section 6 */}
          <FormSection number="6" title="Notes for the TruCare Team">
            <textarea
              name="notes"
              rows={7}
              className="
                w-full resize-y
                border border-[#cfcac6]
                bg-white
                px-3 py-3
                text-[15px]
                text-[#222]
                outline-none
                transition
                focus:border-[#861126]
              "
            />
          </FormSection>

          <div className="mt-10 flex flex-col items-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="
                inline-flex min-w-[190px]
                items-center justify-center gap-2
                rounded-full
                bg-[#d7192d]
                px-8 py-3.5
                text-[14px] font-semibold
                uppercase tracking-wide
                text-white
                transition-all duration-300
                hover:bg-[#a90f21]
                disabled:cursor-not-allowed
                disabled:opacity-70
              "
            >
              {isSubmitting && (
                <span
                  aria-hidden="true"
                  className="
                    size-4 animate-spin
                    rounded-full
                    border-2 border-white/40
                    border-t-white
                  "
                />
              )}

              {isSubmitting ? "Submitting..." : "Submit Lead Form"}
            </button>

            {status.message && (
              <p
                role="status"
                className={`mt-4 text-center text-sm font-medium ${
                  status.type === "success" ? "text-green-600" : "text-red-600"
                }`}
              >
                {status.message}
              </p>
            )}
          </div>
        </div>
      </form>
    </main>
  );
}

const inputClass =
  "h-[46px] w-full border border-[#cfcac6] bg-white px-3 text-[15px] text-[#222] outline-none transition focus:border-[#861126]";

const readonlyInputClass =
  "h-[46px] w-full border border-[#d9d4d0] bg-[#f6f4f2] px-3 text-[15px] font-medium text-[#555] outline-none";

const tableInputClass =
  "min-h-[48px] w-full border-0 border-l border-[#ddd] bg-white px-3 text-sm outline-none focus:bg-[#fff9fa]";

function FormSection({ number, title, description, children }) {
  return (
    <section className="mb-9">
      <div className="mb-4 flex items-center gap-3">
        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-(--primary-color) text-sm font-bold text-white">
          {number}
        </span>

        <h2 className="shrink-0 text-xl font-semibold md:text-2xl">{title}</h2>

        <span className="hidden h-px flex-1 bg-[#cdc7c2] sm:block" />
      </div>

      {description && (
        <p className="-mt-2 mb-4 text-lg text-[#666]">{description}</p>
      )}

      {children}
    </section>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium uppercase text-[#666]">
        {label}
      </span>

      {children}
    </label>
  );
}

function Checkbox({ name, value, label }) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-[#333]">
      <input
        type="checkbox"
        name={name}
        value={value}
        className="
          size-4
          appearance-none
          border border-[#861126]
          bg-white
          checked:bg-[#861126]
          checked:shadow-[inset_0_0_0_3px_white]
        "
      />

      {label}
    </label>
  );
}

function Radio({ name, value, label }) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-[#333]">
      <input
        type="radio"
        name={name}
        value={value}
        className="size-4 accent-[#861126]"
      />

      {label}
    </label>
  );
}

function TableHeading({ children }) {
  return <div className="flex min-h-12 items-center px-3">{children}</div>;
}

function StoreInput({ value, onChange }) {
  return (
    <input
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className={tableInputClass}
    />
  );
}

function MobileStoreField({ label, value, onChange }) {
  return (
    <Field label={label}>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={inputClass}
      />
    </Field>
  );
}
