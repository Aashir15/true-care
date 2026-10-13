import crypto from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "trucare_admin_session";

function getSessionToken() {
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET is missing.");
  }

  return crypto
    .createHmac("sha256", secret)
    .update("trucare-admin")
    .digest("hex");
}

export function validateAdminPassword(password) {
  const expectedPassword =
    process.env.ADMIN_DASHBOARD_PASSWORD || "";

  if (!password || !expectedPassword) {
    return false;
  }

  const a = Buffer.from(password);
  const b = Buffer.from(expectedPassword);

  if (a.length !== b.length) {
    return false;
  }

  return crypto.timingSafeEqual(a, b);
}

export async function createAdminSession() {
  const cookieStore = await cookies();

  cookieStore.set(
    COOKIE_NAME,
    getSessionToken(),
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 8,
    },
  );
}

export async function destroyAdminSession() {
  const cookieStore = await cookies();

  cookieStore.delete(COOKIE_NAME);
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();

  const token =
    cookieStore.get(COOKIE_NAME)?.value;

  if (!token) {
    return false;
  }

  return token === getSessionToken();
}