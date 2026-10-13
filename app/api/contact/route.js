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
      companyName,
      name,
      phone,
      email,
      address,
      city,
      zipCode,
      state,
      interest,
      businessType,
      message,
    } = body;

    if (
      !companyName ||
      !name ||
      !phone ||
      !email ||
      !address ||
      !city ||
      !zipCode ||
      !state ||
      !interest ||
      !message
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

    const cookieStore = await cookies();

    const referralCode = cookieStore.get("agent_ref")?.value || null;

    const agent = getAgentByCode(referralCode);

    const supabase = getSupabaseAdmin();

    const { data: submission, error: submissionError } = await supabase
      .from("contact_submissions")
      .insert({
        company_name: companyName,
        name,
        phone,
        email,
        address,
        city,
        zip_code: zipCode,
        state,
        interest,

        business_type: Array.isArray(businessType) ? businessType : [],

        message,

        referral_code: referralCode,
        agent_name: agent?.name || null,

        email_status: "pending",
      })
      .select("id")
      .single();

    if (submissionError) {
      console.error("Contact Supabase insert error:", submissionError);

      throw new Error("Unable to save contact submission.");
    }

    const selectedBusinessTypes =
      Array.isArray(businessType) && businessType.length
        ? businessType.join(", ")
        : "Not selected";

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
            subject: agent
              ? `True Care - Referred by ${agent.name}`
              : "True Care Lead",

            body: {
              contentType: "HTML",
              content: `
                <div
                  style="
                    max-width: 650px;
                    margin: 0 auto;
                    font-family: Arial, sans-serif;
                    color: #222;
                  "
                >
                  <h2>True Care</h2>

                  <h3>Client Details</h3>

                  <p><strong>Company:</strong> ${escapeHtml(companyName)}</p>
                  <p><strong>Name:</strong> ${escapeHtml(name)}</p>
                  <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
                  <p><strong>Email:</strong> ${escapeHtml(email)}</p>
                  <p><strong>Address:</strong> ${escapeHtml(address)}</p>
                  <p><strong>City:</strong> ${escapeHtml(city)}</p>
                  <p><strong>Zip Code:</strong> ${escapeHtml(zipCode)}</p>
                  <p><strong>State:</strong> ${escapeHtml(state)}</p>
                  <p><strong>Interested In:</strong> ${escapeHtml(interest)}</p>
                  <p>
                    <strong>Business Type:</strong>
                    ${escapeHtml(selectedBusinessTypes)}
                  </p>

                  <p>
                    <strong>Message:</strong><br />
                    ${escapeHtml(message)}
                  </p>

                  <hr />

                  <h3>Referral Details</h3>

                  ${
                    agent
                      ? `
                        <p>
                          <strong>Agent:</strong>
                          ${escapeHtml(agent.name)}
                        </p>

                        <p>
                          <strong>Referral Code:</strong>
                          ${escapeHtml(referralCode)}
                        </p>
                      `
                      : `
                        <p>
                          <strong>Source:</strong>
                          Direct Website Lead
                        </p>
                      `
                  }
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

            replyTo: [
              {
                emailAddress: {
                  address: email,
                  name,
                },
              },
            ],
          },

          saveToSentItems: true,
        }),
      },
    );

    if (!graphResponse.ok) {
      const graphError = await graphResponse.text();

      console.error("Microsoft Graph send error:", graphError);

      await supabase
        .from("contact_submissions")
        .update({
          email_status: "failed",
          email_error: graphError.slice(0, 2000),
        })
        .eq("id", submission.id);

      throw new Error("Unable to send email.");
    }

    const { error: emailStatusError } = await supabase
      .from("contact_submissions")
      .update({
        email_status: "sent",
        email_error: null,
      })
      .eq("id", submission.id);

    if (emailStatusError) {
      console.error("Contact email status update error:", emailStatusError);
    }

    return Response.json({
      success: true,
      message: "Message sent successfully.",
    });
  } catch (error) {
    console.error("Contact form error:", error);

    return Response.json(
      {
        success: false,
        message: "Unable to send message.",
      },
      {
        status: 500,
      },
    );
  }
}
