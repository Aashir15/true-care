import { redirect } from "next/navigation";

import { isAdminAuthenticated } from "@/lib/admin-auth";

export default async function AdminProtectedLayout({
  children,
}) {
  const authenticated =
    await isAdminAuthenticated();

  if (!authenticated) {
    redirect("/admin/login");
  }

  return children;
}