import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";

import { agents } from "@/lib/agents";

export const metadata = {
  title: "Select Your Account Executive",
  description: "Connect with one of our trusted agents.",
};

export default function StartApplication() {
  const agentList = Object.entries(agents).sort(([, a], [, b]) =>
    a.name.localeCompare(b.name),
  );

  return (
    <main className="min-h-screen bg-(--bg-color)">
      <section className="px-5 py-14 sm:px-6 md:py-20">
        <div className="mx-auto max-w-[1140px]">
          <header className="mx-auto max-w-[680px] text-center">
            <div className="mx-auto mb-5 flex size-12 items-center justify-center rounded-full bg-(--primary-color)/10">
              <Users
                aria-hidden="true"
                className="size-5 text-(--primary-color)"
              />
            </div>

            <h1 className="text-3xl font-semibold leading-tight text-(--primary-color) md:text-[42px]">
              Select Your Account Executive
            </h1>
          </header>

          <section
            aria-label="Agent list"
            className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {agentList.map(([code, agent], index) => (
              <article
                key={code}
                className="
                  group
                  rounded-[18px]
                  border border-[#e9e9e9]
                  bg-white
                  p-5
                  shadow-[0_8px_30px_rgba(0,0,0,0.04)]
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:border-(--primary-color)/25
                  hover:shadow-[0_14px_40px_rgba(0,0,0,0.08)]
                "
              >
                <div className="flex items-center gap-4">
                  <div
                    className="
                      flex size-12 shrink-0
                      items-center justify-center
                      rounded-full
                      bg-(--primary-color)/10
                      text-[16px] font-semibold
                      text-(--primary-color)
                    "
                  >
                    {agent.name
                      .split(" ")
                      .map((word) => word[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </div>

                  <div className="min-w-0">
                    <h2 className="truncate text-[18px] font-semibold text-[#222]">
                      {agent.name}
                    </h2>

                    <p className="mt-1 text-sm text-[#8a8a8a]">
                      Account Executive
                    </p>
                  </div>
                </div>

                <div className="mt-5 border-t border-[#f0f0f0] pt-5">
                  <Link
                    href={`/pre-onboarding?ref=${encodeURIComponent(code)}`}
                    className="
                      flex w-full
                      items-center justify-center gap-2
                      rounded-md
                      bg-(--primary-color)
                      px-5 py-3
                      text-[14px] font-semibold
                      uppercase text-white
                      transition-all duration-300
                      hover:bg-[#d91823]
                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-(--primary-color)
                      focus-visible:ring-offset-2
                    "
                  >
                    Signup now
                    <ArrowRight
                      aria-hidden="true"
                      className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              </article>
            ))}
          </section>
        </div>
      </section>
    </main>
  );
}
