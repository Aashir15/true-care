"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AgentLoginPage() {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);
    setError("");

    const form = event.currentTarget;

    const formData = new FormData(form);

    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const response = await fetch(
        "/api/agent/login",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to login.",
        );
      }

      router.push("/agent");
      router.refresh();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7f5f2] px-5 py-12">
      <div className="w-full max-w-[440px] rounded-[18px] border border-[#e5e5e5] bg-white p-7 shadow-sm md:p-9">
        <p className="text-sm font-semibold uppercase tracking-wide text-(--primary-color)">
          TruCare Protection
        </p>

        <h1 className="mt-2 text-3xl font-semibold text-[#222]">
          Agent Login
        </h1>

        <p className="mt-2 text-sm text-[#777]">
          Sign in to view your submitted
          applications.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >
          <div>
            <label className="mb-2 block text-sm font-medium text-[#444]">
              Email
            </label>

            <input
              name="email"
              type="email"
              required
              className="h-[48px] w-full rounded-[10px] border border-[#ddd] px-4 outline-none focus:border-(--primary-color)"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#444]">
              Password
            </label>

            <input
              name="password"
              type="password"
              required
              className="h-[48px] w-full rounded-[10px] border border-[#ddd] px-4 outline-none focus:border-(--primary-color)"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="h-[48px] w-full rounded-[10px] bg-(--primary-color) font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
          >
            {loading
              ? "Signing In..."
              : "Sign In"}
          </button>
        </form>
      </div>
    </main>
  );
}