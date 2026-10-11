import Image from "next/image";
import { notFound } from "next/navigation";

import { plans } from "../../../data/plans";

export function generateStaticParams() {
  return Object.keys(plans).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const plan = plans[slug];

  if (!plan) {
    return {
      title: "Plan Not Found | TruCare Protection",
    };
  }

  return {
    title: `${plan.title} Coverage | TruCare Protection`,
    description: plan.description,
  };
}

export default async function PlanDetailsPage({ params }) {
  const { slug } = await params;

  const plan = plans[slug];

  if (!plan) {
    notFound();
  }

  return (
    <main className="bg-(--bg-color)">
      <section className="px-6 py-12 md:py-16">
        <div className="mx-auto max-w-7xl">
          <section className="">
            <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2 lg:gap-16">
              <div>
                <h1 className="text-4xl font-bold leading-[1.05] tracking-tight text-neutral-950 sm:text-5xl lg:text-6xl xl:text-[68px]">
                  {plan.title}
                  <span className="mt-2 block text-(--primary-color)">
                    Coverage
                  </span>
                </h1>

                <p className="mb-2 leading-7 text-neutral-500 text-lg">
                  {plan.description}
                </p>
              </div>

              <figure className="relative">
                <div aria-hidden="true" />

                <Image
                  src={plan.image}
                  alt={`${plan.title} coverage`}
                  width={1200}
                  height={1000}
                  className="h-auto w-full rounded-3xl object-cover"
                />

                <figcaption className="sr-only">
                  TruCare day-one protection coverage
                </figcaption>
              </figure>
            </div>
          </section>

          {/* Coverage Sections */}
          {/* <div className="mt-16 space-y-12">
                        {plan.coverageSections.map((section) => (
                            <section key={section.title}>
                                <h2 className="mb-5 text-2xl font-semibold text-(--primary-color)">
                                    {section.title}
                                </h2>

                                <ul className="space-y-3">
                                    {section.items.map((item) => (
                                        <li
                                            key={item}
                                            className="flex items-start gap-2 text-xl leading-6 text-neutral-900"
                                        >
                                            <i
                                                className="ri-arrow-right-s-line mt-[2px] text-[16px] text-neutral-500"
                                                aria-hidden="true"
                                            />

                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        ))}
                    </div> */}

          <div className="mt-16">
            {plan.coverageSections.map((section) => (
              <section key={section.title}>
                <h2 className="my-10 text-center text-xl font-bold text-black sm:text-2xl">
                  {section.title}
                </h2>

                <ul className="mx-auto grid max-w-2xl grid-cols-1 gap-x-20 gap-y-5 sm:grid-cols-2">
                  {section.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-lg font-medium text-neutral-900"
                    >
                      <i
                        className="ri-arrow-right-s-line text-xl text-(--primary-color)"
                        aria-hidden="true"
                      />

                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          {/* Bottom Note */}
          <div className="mt-16 text-center">
            <p className="text-xl font-semibold text-(--primary-color)">
              There are no hidden deductibles or costs!
            </p>

            <p className="mx-auto mt-5 max-w-[900px] text-lg leading-6 text-neutral-900">
              {plan.bottomNote}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
