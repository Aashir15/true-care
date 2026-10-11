import Image from "next/image";
import Link from "next/link";

const leftBenefits = [
  "No Lemon Guarantee",
  "Power Surge Protection",
  "Covers wear & tear from normal use",
  "Fully Insured Program with an, A.M. Best Rated ``A`` Carrier",
  "Replacement and Repair Programs",
];

const rightBenefits = [
  "100% Covered Parts and Labor Coverage",
  "No Surprise Costs or Deductibles",
  "Toll-Free Customer Service Support",
  "If the product can't be fixed, we'll replace it — it's that simple!",
];

export default function Benefits() {
  const benefits = [
    {
      image: "/assets/icon-1.png",
      text: "Enable product warranties on your website.",
    },
    {
      image: "/assets/icon-2.png",
      text: "Reduce product returns.",
    },
    {
      image: "/assets/icon-3.png",
      text: "Increase your profits TODAY!",
    },
  ];

  return (
    <>
      <section className="px-6 py-12 bg-(--bg-color)">
        <div className="mx-auto grid max-w-300 items-center md:grid-cols-2">
          <div>
            <h1 className="text-4xl font-bold mb-8 leading-[1.05] tracking-tight text-neutral-950 md:text-[45px]">
              TruCare{" "}
              <span className="mt-2 text-(--primary-color)">Benefits</span>
            </h1>

            <p className="mb-8 leading-7 text-xl">
              Own better coverage on purchases! TruCare Plans protect your newly
              purchased products from the unexpected mishaps of everyday use,
              allowing YOU to extend your product life while giving you the
              protection you deserve.
            </p>
          </div>

          <figure className="relative">
            <div aria-hidden="true" />

            <Image
              src="/assets/benefits-1.png"
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

      <section className="bg-(--bg-color) px-6 py-12">
        <div className="mx-auto max-w-6xl">
          {/* Heading */}
          <div className="text-center">
          

            <h1 className="text-4xl font-bold mb-8 leading-[1.05] tracking-tight text-neutral-950 md:text-[45px]">
              <span className="mt-2 block text-(--primary-color)">Why TruCare</span>
              Protection?
            </h1>
          </div>

          {/* Benefits */}
          <div className="mt-20 grid gap-12 md:grid-cols-2 md:gap-20">
            <ul className="space-y-5">
              {leftBenefits.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-lg leading-7 text-neutral-950"
                >
                  <i
                    className="ri-arrow-right-s-line mt-[2px] text-xl text-(--primary-color)"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <ul className="space-y-5">
              {rightBenefits.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-lg leading-7 text-neutral-950"
                >
                  <i
                    className="ri-arrow-right-s-line mt-[2px] text-xl text-(--primary-color)"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-(--bg-color) px-6 py-14 md:py-16">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid gap-14 text-center sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
            {/* Experience */}
            <article className="flex flex-col items-center">
              <i
                className="ri-award-fill mb-6 text-[68px] leading-none text-(--primary-color)"
                aria-hidden="true"
              />

              <h3 className="mb-7 text-xl font-bold text-(--primary-color)">
                Experience
              </h3>

              <p className="max-w-[260px] text-lg leading-[1.5] text-black">
                TruCare has over 40 years of service plan Warranty experience
                serving the industry.
              </p>
            </article>

            {/* Trusted */}
            <article className="flex flex-col items-center">
              <i
                className="ri-discuss-line mb-6 text-[68px] leading-none text-(--primary-color)"
                aria-hidden="true"
              />

              <h3 className="mb-7 text-xl font-bold text-(--primary-color)">
                Trusted
              </h3>

              <p className="max-w-[270px] text-[18px] leading-[1.5] text-black">
                Service warranty professionals founded TruCare to provide our
                retail partners and customers with the level of service they
                expect as part of their brand.
              </p>
            </article>

            {/* Compliance / Risk */}
            <article className="flex flex-col items-center">
              <i
                className="ri-shake-hands-fill mb-6 text-[68px] leading-none text-(--primary-color)"
                aria-hidden="true"
              />

              <h3 className="mb-7 text-xl font-bold text-(--primary-color)">
                Compliance/Risk
              </h3>

              <p className="max-w-[270px] text-[18px] leading-[1.5] text-black">
                TruCare Protection Plans are fully underwritten, and compliant
                protection plans.
              </p>
            </article>

            {/* Nationwide */}
            <article className="flex flex-col items-center">
              <i
                className="ri-map-2-fill mb-6 text-[68px] leading-none text-(--primary-color)"
                aria-hidden="true"
              />

              <h3 className="mb-7 text-xl font-bold text-(--primary-color)">
                Nationwide
              </h3>

              <p className="max-w-[270px] text-lg leading-[1.5] text-black">
                TruCare offers nationwide service for various products. We
                provide coverage in more than 85% of zip codes within available
                areas, including all metro.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-(--bg-color) py-14 sm:py-16 lg:py-20">
        <div className="mx-auto grid max-w-[1180px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 lg:px-10">
          {/* Left Image */}
          <figure className="flex justify-center lg:justify-start">
            <Image
              src="/assets/benefits-1.png"
              alt="Remote Diagnostics"
              width={1200}
              height={1000}
              className="h-auto w-full rounded-3xl object-cover"
            />
          </figure>

          {/* Right Content */}
          <article className="text-center lg:text-left">
            <header>
              <h2 className="text-[36px] text-center font-bold leading-[1.12] text-black sm:text-[44px] lg:text-[46px]">
                <span className="block text-[#ff0033]">Trucare is</span>
                <span className="block">on Shopify</span>
              </h2>

              <p className="mt-8 text-[16px] font-bold text-center uppercase text-[#ff0033] sm:text-lg">
                Install the app today!
              </p>
            </header>

            {/* Benefits */}
            <div className="mt-14 grid gap-10 sm:grid-cols-3 sm:gap-6 lg:mt-20">
              {benefits.map((item) => (
                <article
                  key={item.text}
                  className="flex flex-col items-center text-center"
                >
                  <div className="relative mb-5 size-[76px]">
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      className="object-contain"
                      sizes="76px"
                    />
                  </div>

                  <p className="max-w-[170px] text-lg leading-6 text-black">
                    {item.text}
                  </p>
                </article>
              ))}
            </div>

            {/* Button */}
            <div className="mt-12 flex justify-center lg:mt-14">
              <Link
                href="/contact-us"
                className="
                inline-flex
                min-h-[50px]
                items-center
                justify-center
                rounded-full
                bg-gradient-to-r
                from-[#332625]
                to-[#ff3048]
                px-7
                text-sm
                font-medium
                text-white
                transition-transform
                duration-300
                hover:-translate-y-1
              "
              >
                Learn More
              </Link>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
