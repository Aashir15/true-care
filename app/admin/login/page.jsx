import { redirect } from "next/navigation";

import {
  createAdminSession,
  isAdminAuthenticated,
  validateAdminPassword,
} from "@/lib/admin-auth";

export default async function AdminLoginPage({
  searchParams,
}) {
  const authenticated =
    await isAdminAuthenticated();

  if (authenticated) {
    redirect("/admin");
  }

  const params = await searchParams;

  async function login(formData) {
    "use server";

    const password =
      formData.get("password")?.toString() || "";

    if (!validateAdminPassword(password)) {
      redirect("/admin/login?error=1");
    }

    await createAdminSession();

    redirect("/admin");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7f5f2] px-5">
      <div className="w-full max-w-[420px] rounded-[20px] bg-white p-7 shadow-[0_12px_45px_rgba(0,0,0,0.08)] md:p-9">
        <h1 className="text-center text-2xl font-semibold text-(--primary-color)">
          Admin Login
        </h1>

        <p className="mt-2 text-center text-sm text-[#777]">
          TruCare Dashboard
        </p>

        <form action={login} className="mt-7">
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-[#555]"
          >
            Password
          </label>

          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="
              h-[46px] w-full
              rounded-[10px]
              border border-[#ddd]
              px-4
              outline-none
              transition
              focus:border-(--primary-color)
            "
          />

          {params?.error && (
            <p className="mt-3 text-sm text-red-600">
              Incorrect password.
            </p>
          )}

          <button
            type="submit"
            className="
              mt-6 w-full
              rounded-full
              bg-(--primary-color)
              px-6 py-3
              text-sm font-semibold
              uppercase text-white
              transition
              hover:opacity-90
            "
          >
            Login
          </button>
        </form>
      </div>
    </main>
  );
}