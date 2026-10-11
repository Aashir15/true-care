import Image from "next/image";
import Link from "next/link";
import { plans } from "../../data/plans";

export const metadata = {
  title: "Protection Plans | TruCare Protection",
  description:
    "Explore TruCare protection plan options for appliances, electronics, and furniture.",
};

export default function PlansPage() {
  const planList = Object.values(plans);

  return (
    <>
      <section className="px-6 pt-12 bg-(--bg-color) ">
        <div className="mx-auto grid max-w-7xl items-center md:grid-cols-2">
          <div>
            <h1 className="text-4xl font-bold leading-[1.05] tracking-tight text-neutral-950 sm:text-5xl lg:text-6xl xl:text-[68px]">
              Plan <span className="mt-2 text-(--primary-color)">Options</span>
            </h1>

            <p className="mb-2 leading-7 text-neutral-500 text-lg">
              TruCare Protection is a Protection Plan Program that provides
              value-added features and benefits for retailers and their
              customers.
            </p>
            <p className="mb-8 leading-7 text-neutral-500 text-lg">
              These programs provide unique coverage and exceptional value to
              your customers while they differentiate you from your competition.
            </p>
          </div>

          <figure className="relative">
            <div aria-hidden="true" />

            <Image
              src="/assets/plan.png"
              alt="Remote Diagnostics"
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

      <section className="py-14 md:py-20 bg-(--bg-color)">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="text-4xl font-bold leading-[1.05] tracking-tight text-center text-neutral-950 sm:text-5xl lg:text-6xl xl:text-[68px]">
            <span className="mt-2 text-(--primary-color)">Protection Plan </span>
            Options {" "}
          </h1>
          <div className="grid gap-6 md:grid-cols-2">
            {planList.map((plan) => (
              <Link
                key={plan.slug}
                href={`/plans/${plan.slug}`}
                className="group overflow-hidden transition-all duration-300 hover:-translate-y-1"
              >
                <article>
                  <figure className="relative aspect-5/6 overflow-hidden">
                    <Image
                      src={plan.image}
                      alt={`${plan.title} protection plan`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0" />
                  </figure>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
