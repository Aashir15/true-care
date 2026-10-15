"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function CompensationPassword() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/compensation/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Incorrect password.");
      }

      router.refresh();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-[75vh] items-center justify-center bg-[#f7f5f2] px-5">
      <div className="w-full max-w-[430px] rounded-[18px] border border-[#e8e8e8] bg-white p-7 shadow-[0_15px_50px_rgba(0,0,0,0.08)] md:p-9">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-(--primary-color)">
            Compensation Access
          </h1>

          <p className="mt-2 text-sm leading-6 text-[#777]">
            Please enter the password to view compensation information.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-7">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoFocus
              placeholder="Enter password"
              className="
        h-[48px] w-full
        rounded-[10px]
        border border-[#ddd]
        bg-white
        px-4 pr-12
        text-[15px] text-[#222]
        outline-none
        transition
        focus:border-(--primary-color)
      "
            />

            <button
              type="button"
              onClick={() => setShowPassword((current) => !current)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="
        absolute right-3 top-1/2
        -translate-y-1/2
        text-[#777]
        transition
        hover:text-(--primary-color)
      "
            >
              {showPassword ? (
                <EyeOff className="size-5" />
              ) : (
                <Eye className="size-5" />
              )}
            </button>
          </div>

          {error && (
            <p className="mt-3 text-center text-sm font-medium text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="
      mt-5 flex h-[48px] w-full
      items-center justify-center
      rounded-[10px]
      bg-(--primary-color)
      px-6
      text-sm font-semibold
      uppercase text-white
      transition
      hover:opacity-90
      disabled:cursor-not-allowed
      disabled:opacity-60
    "
          >
            {loading ? "Checking..." : "View Compensation"}
          </button>
        </form>
      </div>
    </main>
  );
}
