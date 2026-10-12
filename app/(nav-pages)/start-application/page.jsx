import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";

import { agents } from "@/lib/agents";

export const metadata = {
  title: "Our Agents",
  description: "Connect with one of our trusted agents.",
};

export default function AgentsPage() {
  const agentList = Object.entries(agents);

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
              Our Agents
            </h1>

            <p className="mt-4 text-[16px] leading-7 text-[#5f5f5f] md:text-[18px]">
              Choose an agent below to get started. You’ll be taken directly
              to our contact form.
            </p>
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
                      Agent {String(index + 1).padStart(2, "0")}
                    </p>
                  </div>
                </div>

                <div className="mt-5 border-t border-[#f0f0f0] pt-5">
                  <Link
                    href={`/contact-us?ref=${encodeURIComponent(code)}`}
                    className="
                      flex w-full
                      items-center justify-center gap-2
                      rounded-full
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
                   Start Your Application - Click Here

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