import nodemailer from "nodemailer";
import { cookies } from "next/headers";

import { getAgentByCode } from "@/lib/agents";

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
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

    // Get referral code from cookie
    const cookieStore = await cookies();

    const referralCode = cookieStore.get("agent_ref")?.value || null;

    // Find agent
    const agent = getAgentByCode(referralCode);

    // const transporter = nodemailer.createTransport({
    //     service: "gmail",

    //     auth: {
    //         user: process.env.EMAIL_USER,
    //         pass: process.env.EMAIL_PASS,
    //     },
    // });

    const transporter = nodemailer.createTransport({
      host: "smtp.office365.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.verify();

    console.log("SMTP verified successfully");

    await transporter.sendMail({
      from: `"Website Lead" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      replyTo: email,
      subject: agent
        ? `True Care - Referred by ${agent.name}`
        : "True Care Lead",
      html: `...`,
    });

    const selectedBusinessTypes =
      Array.isArray(businessType) && businessType.length
        ? businessType.join(", ")
        : "Not selected";

    await transporter.sendMail({
      from: `"Website Lead" <${process.env.EMAIL_USER}>`,

      to: process.env.ADMIN_EMAIL,

      replyTo: email,

      subject: agent
        ? `True Care - Referred by ${agent.name}`
        : "True Care Lead",

      html: `
                <div
                    style="
                        max-width: 650px;
                        margin: 0 auto;
                        font-family: Arial, sans-serif;
                        color: #222;
                    "
                >
                    <h2>New Website Lead</h2>

                    <h3>Client Details</h3>

                    <p>
                        <strong>Company:</strong>
                        ${escapeHtml(companyName)}
                    </p>

                    <p>
                        <strong>Name:</strong>
                        ${escapeHtml(name)}
                    </p>

                    <p>
                        <strong>Phone:</strong>
                        ${escapeHtml(phone)}
                    </p>

                    <p>
                        <strong>Email:</strong>
                        ${escapeHtml(email)}
                    </p>

                    <p>
                        <strong>Address:</strong>
                        ${escapeHtml(address)}
                    </p>

                    <p>
                        <strong>City:</strong>
                        ${escapeHtml(city)}
                    </p>

                    <p>
                        <strong>Zip Code:</strong>
                        ${escapeHtml(zipCode)}
                    </p>

                    <p>
                        <strong>State:</strong>
                        ${escapeHtml(state)}
                    </p>

                    <p>
                        <strong>Interested In:</strong>
                        ${escapeHtml(interest)}
                    </p>

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
    });

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
