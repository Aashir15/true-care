import { redirect } from "next/navigation";

import { destroyAdminSession } from "@/lib/admin-auth";

export async function POST() {
  await destroyAdminSession();

  redirect("/admin/login");
}