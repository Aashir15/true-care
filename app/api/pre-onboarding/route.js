import { cookies } from "next/headers";

import { getAgentByCode } from "@/lib/agents";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function getMicrosoftAccessToken() {
  const params = new URLSearchParams();

  params.append("client_id", process.env.MICROSOFT_CLIENT_ID);
  params.append("client_secret", process.env.MICROSOFT_CLIENT_SECRET);
  params.append("scope", "https://graph.microsoft.com/.default");
  params.append("grant_type", "client_credentials");

  const response = await fetch(
    `https://login.microsoftonline.com/${process.env.MICROSOFT_TENANT_ID}/oauth2/v2.0/token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
      cache: "no-store",
    },
  );

  const data = await response.json();

  if (!response.ok) {
    console.error("Microsoft token error:", data);

    throw new Error("Unable to authenticate with Microsoft.");
  }

  return data.access_token;
}

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      referralCode,
      salesRep,
      client,
      stores = [],
      protectionPlans = [],
      otherPlan,
      onboarding,
      notes,
    } = body;

    if (
      !client?.businessName ||
      !client?.contactName ||
      !client?.email ||
      !client?.phone
    ) {
      return Response.json(
        {
          success: false,
          message: "Please fill all required fields.",
        },
        {
          status: 400,
        },
      );
    }

    // Prefer cookie referral if available
    const cookieStore = await cookies();

    const cookieReferralCode = cookieStore.get("agent_ref")?.value || null;

    const finalReferralCode = referralCode || cookieReferralCode || null;

    const agent = getAgentByCode(finalReferralCode);

    const repName = agent?.name || salesRep?.name || "Direct Website Lead";

    const supabase = getSupabaseAdmin();

    const { data: submission, error: submissionError } = await supabase
      .from("pre_onboarding_submissions")
      .insert({
        referral_code: finalReferralCode,
        agent_name: repName,

        sales_rep: {
          name: repName,
          email: salesRep?.email || "",
          phone: salesRep?.phone || "",
          dateSubmitted: salesRep?.dateSubmitted || "",
        },

        client: client || {},

        stores: Array.isArray(stores) ? stores : [],

        protection_plans: Array.isArray(protectionPlans) ? protectionPlans : [],

        other_plan: otherPlan || {},

        onboarding: onboarding || {},

        notes: notes || "",

        email_status: "pending",
      })
      .select("id")
      .single();

    if (submissionError) {
      console.error("Pre-onboarding Supabase insert error:", submissionError);

      throw new Error("Unable to save pre-onboarding submission.");
    }

    const storeRows = stores
      .filter(
        (store) =>
          store.storeName ||
          store.streetAddress ||
          store.cityStateZip ||
          store.storePhone ||
          store.storeManager,
      )
      .map(
        (store) => `
          <tr>
            <td style="padding:8px;border:1px solid #ddd;">
              ${escapeHtml(store.storeName)}
            </td>

            <td style="padding:8px;border:1px solid #ddd;">
              ${escapeHtml(store.streetAddress)}
            </td>

            <td style="padding:8px;border:1px solid #ddd;">
              ${escapeHtml(store.cityStateZip)}
            </td>

            <td style="padding:8px;border:1px solid #ddd;">
              ${escapeHtml(store.storePhone)}
            </td>

            <td style="padding:8px;border:1px solid #ddd;">
              ${escapeHtml(store.storeManager)}
            </td>
          </tr>
        `,
      )
      .join("");

    const planRows = [
      ...protectionPlans,
      ...(otherPlan?.name
        ? [
            {
              plan: otherPlan.name,
              interested: otherPlan.interested,
              terms: otherPlan.terms,
            },
          ]
        : []),
    ]
      .map(
        (plan) => `
          <tr>
            <td style="padding:8px;border:1px solid #ddd;">
              ${escapeHtml(plan.plan)}
            </td>

            <td style="padding:8px;border:1px solid #ddd;">
              ${plan.interested ? "Yes" : "No"}
            </td>

            <td style="padding:8px;border:1px solid #ddd;">
              ${escapeHtml(plan.terms?.join(", ") || "-")}
            </td>
          </tr>
        `,
      )
      .join("");

    const meetingRows = (onboarding?.options || [])
      .filter((option) => option.date || option.time || option.notes)
      .map(
        (option) => `
          <tr>
            <td style="padding:8px;border:1px solid #ddd;">
              ${escapeHtml(option.label)}
            </td>

            <td style="padding:8px;border:1px solid #ddd;">
              ${escapeHtml(option.date)}
            </td>

            <td style="padding:8px;border:1px solid #ddd;">
              ${escapeHtml(option.time)}
            </td>

            <td style="padding:8px;border:1px solid #ddd;">
              ${escapeHtml(option.notes)}
            </td>
          </tr>
        `,
      )
      .join("");

    // const repName = agent?.name || salesRep?.name || "Direct Website Lead";

    const accessToken = await getMicrosoftAccessToken();

    const graphResponse = await fetch(
      `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(
        process.env.EMAIL_USER,
      )}/sendMail`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: {
            subject: `TruCare Pre-Onboarding Lead - ${repName}`,

            body: {
              contentType: "HTML",

              content: `
                <div
                  style="
                    max-width:760px;
                    margin:0 auto;
                    font-family:Arial,sans-serif;
                    color:#222;
                  "
                >
                  <h1 style="color:#861126;">
                    TruCare Pre-Onboarding Lead Form
                  </h1>

                  <h2>1. Sales Rep</h2>

                  <p>
                    <strong>Rep Name:</strong>
                    ${escapeHtml(repName)}
                  </p>

                  <p>
                    <strong>Rep Email:</strong>
                    ${escapeHtml(salesRep?.email || "Signup@trucaredealer.com")}
                  </p>

                  <p>
                    <strong>Rep Phone:</strong>
                    ${escapeHtml(salesRep?.phone || "1-877-820-1777")}
                  </p>

                  <p>
                    <strong>Date Submitted:</strong>
                    ${escapeHtml(salesRep?.dateSubmitted || "")}
                  </p>

                  <hr />

                  <h2>2. Client Contact</h2>

                  <p>
                    <strong>Business Name:</strong>
                    ${escapeHtml(client.businessName)}
                  </p>

                  <p>
                    <strong>Contact Name:</strong>
                    ${escapeHtml(client.contactName)}
                  </p>

                  <p>
                    <strong>Title:</strong>
                    ${escapeHtml(client.title)}
                  </p>

                  <p>
                    <strong>Email:</strong>
                    ${escapeHtml(client.email)}
                  </p>

                  <p>
                    <strong>Phone:</strong>
                    ${escapeHtml(client.phone)}
                  </p>

                  <p>
                    <strong>Preferred Contact Method:</strong>
                    ${escapeHtml(
                      client.preferredContactMethod?.join(", ") || "-",
                    )}
                  </p>

                  <p>
                    <strong>Best Days and Times to Reach:</strong>
                    ${escapeHtml(client.bestDaysTimes)}
                  </p>

                  <p>
                    <strong>Website:</strong>
                    ${escapeHtml(client.website)}
                  </p>

                  <hr />

                  <h2>3. Store Locations</h2>

                  ${
                    storeRows
                      ? `
                        <table
                          cellpadding="0"
                          cellspacing="0"
                          style="
                            width:100%;
                            border-collapse:collapse;
                            font-size:13px;
                          "
                        >
                          <thead>
                            <tr
                              style="
                                background:#861126;
                                color:white;
                              "
                            >
                              <th style="padding:8px;border:1px solid #ddd;">
                                Store Name / #
                              </th>

                              <th style="padding:8px;border:1px solid #ddd;">
                                Street Address
                              </th>

                              <th style="padding:8px;border:1px solid #ddd;">
                                City, State, Zip
                              </th>

                              <th style="padding:8px;border:1px solid #ddd;">
                                Store Phone
                              </th>

                              <th style="padding:8px;border:1px solid #ddd;">
                                Store Manager
                              </th>
                            </tr>
                          </thead>

                          <tbody>
                            ${storeRows}
                          </tbody>
                        </table>
                      `
                      : `
                        <p>
                          No store locations provided.
                        </p>
                      `
                  }

                  <hr />

                  <h2>
                    4. Protection Plans of Interest
                  </h2>

                  <table
                    cellpadding="0"
                    cellspacing="0"
                    style="
                      width:100%;
                      border-collapse:collapse;
                      font-size:13px;
                    "
                  >
                    <thead>
                      <tr
                        style="
                          background:#861126;
                          color:white;
                        "
                      >
                        <th style="padding:8px;border:1px solid #ddd;">
                          Plan
                        </th>

                        <th style="padding:8px;border:1px solid #ddd;">
                          Interested?
                        </th>

                        <th style="padding:8px;border:1px solid #ddd;">
                          Terms
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      ${planRows}
                    </tbody>
                  </table>

                  <hr />

                  <h2>
                    5. Schedule an Onboarding Meeting
                  </h2>

                  <p>
                    <strong>Schedule a Meeting:</strong>
                    ${escapeHtml(onboarding?.scheduleMeeting || "-")}
                  </p>

                  <p>
                    <strong>Meeting Format:</strong>
                    ${escapeHtml(onboarding?.meetingFormat || "-")}
                  </p>

                  <p>
                    <strong>Client Time Zone:</strong>
                    ${escapeHtml(onboarding?.clientTimeZone || "-")}
                  </p>

                  ${
                    meetingRows
                      ? `
                        <table
                          cellpadding="0"
                          cellspacing="0"
                          style="
                            width:100%;
                            border-collapse:collapse;
                            font-size:13px;
                          "
                        >
                          <thead>
                            <tr
                              style="
                                background:#861126;
                                color:white;
                              "
                            >
                              <th style="padding:8px;border:1px solid #ddd;">
                                Option
                              </th>

                              <th style="padding:8px;border:1px solid #ddd;">
                                Date
                              </th>

                              <th style="padding:8px;border:1px solid #ddd;">
                                Time
                              </th>

                              <th style="padding:8px;border:1px solid #ddd;">
                                Notes
                              </th>
                            </tr>
                          </thead>

                          <tbody>
                            ${meetingRows}
                          </tbody>
                        </table>
                      `
                      : ""
                  }

                  <hr />

                  <h2>
                    6. Notes for the TruCare Team
                  </h2>

                  <p>
                    ${escapeHtml(notes || "No additional notes.")}
                  </p>

                  <hr />

                  <p>
                    <strong>Referral Code:</strong>
                    ${escapeHtml(finalReferralCode || "Direct")}
                  </p>
                </div>
              `,
            },

            toRecipients: [
              {
                emailAddress: {
                  address: process.env.ADMIN_EMAIL,
                },
              },
            ],

            replyTo: client?.email
              ? [
                  {
                    emailAddress: {
                      address: client.email,
                      name: client.contactName,
                    },
                  },
                ]
              : [],
          },

          saveToSentItems: true,
        }),
      },
    );

    if (!graphResponse.ok) {
      const graphError = await graphResponse.text();

      console.error("Microsoft Graph pre-onboarding send error:", graphError);

      await supabase
        .from("pre_onboarding_submissions")
        .update({
          email_status: "failed",
          email_error: graphError.slice(0, 2000),
        })
        .eq("id", submission.id);

      throw new Error("Unable to send pre-onboarding form.");
    }

    const { error: emailStatusError } = await supabase
      .from("pre_onboarding_submissions")
      .update({
        email_status: "sent",
        email_error: null,
      })
      .eq("id", submission.id);

    if (emailStatusError) {
      console.error(
        "Pre-onboarding email status update error:",
        emailStatusError,
      );
    }

    return Response.json({
      success: true,
      message: "Pre-onboarding form submitted successfully.",
    });
  } catch (error) {
    console.error("Pre-onboarding form error:", error);

    return Response.json(
      {
        success: false,
        message: "Unable to send pre-onboarding form.",
      },
      {
        status: 500,
      },
    );
  }
}
