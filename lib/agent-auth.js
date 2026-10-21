import crypto from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "agent_session";

function getSecret() {
  const secret = process.env.AGENT_SESSION_SECRET;

  if (!secret) {
    throw new Error("AGENT_SESSION_SECRET is missing.");
  }

  return secret;
}

function sign(value) {
  return crypto
    .createHmac("sha256", getSecret())
    .update(value)
    .digest("base64url");
}

export function createAgentToken(payload) {
  const encoded = Buffer.from(
    JSON.stringify(payload),
  ).toString("base64url");

  const signature = sign(encoded);

  return `${encoded}.${signature}`;
}

export function verifyAgentToken(token) {
  try {
    if (!token) return null;

    const [encoded, signature] = token.split(".");

    if (!encoded || !signature) {
      return null;
    }

    const expectedSignature = sign(encoded);

    const receivedBuffer = Buffer.from(signature);
    const expectedBuffer = Buffer.from(expectedSignature);

    if (
      receivedBuffer.length !== expectedBuffer.length
    ) {
      return null;
    }

    const valid = crypto.timingSafeEqual(
      receivedBuffer,
      expectedBuffer,
    );

    if (!valid) return null;

    const payload = JSON.parse(
      Buffer.from(encoded, "base64url").toString(
        "utf8",
      ),
    );

    return payload;
  } catch {
    return null;
  }
}

export async function getAgentSession() {
  const cookieStore = await cookies();

  const token =
    cookieStore.get(COOKIE_NAME)?.value;

  return verifyAgentToken(token);
}

export async function setAgentSession(agent) {
  const cookieStore = await cookies();

  const token = createAgentToken({
    name: agent.name,
    email: agent.email,
    referralCode: agent.referralCode,
  });

  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure:
      process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
}

export async function clearAgentSession() {
  const cookieStore = await cookies();

  cookieStore.delete(COOKIE_NAME);
}