import Image from "next/image";
import Link from "next/link";

const features = [
    {
        title: "SERVICE",
        icon: "ri-group-fill",
        description:
            "We service our customers with how they want to be treated! We provide customer service to not only meet expectations but to exceed expectations.",
    },
    {
        title: "TECHNOLOGY",
        icon: "ri-code-box-fill",
        description:
            "We provide our customers with the latest technology needs. We are always employing a balance of efficiency, cost-effectiveness, and improvements to the overall customer experience.",
    },
    {
        title: "CULTURE",
        icon: "ri-award-fill",
        description:
            "We provide our partners with years of experience in service, retail, claims, operations, management, program development, and much more. We strive to do what is right and provide our years of experience in providing programs and experiences of how it should be, different from what it’s always been. We love doing what we do!",
    },
];

export default function AboutUsPage() {
    return (
        <>
            <section className="px-6 py-12 bg-(--bg-color)">
                <div className="mx-auto grid max-w-7xl items-center md:grid-cols-2">

                    <div>
                        <h1 className="text-4xl font-bold leading-[1.05] tracking-tight text-neutral-950 sm:text-5xl lg:text-6xl xl:text-[68px]">
                            About TruCare

                            <span className="mt-2 block text-(--primary-color)">
                                Protection
                            </span>
                        </h1>

                        <p className="mb-8 leading-7 text-neutral-600 text-lg">
                            Protect yourself from “True Life” experiences!
                        </p>
                    </div>

                    <figure className="relative">
                        <div aria-hidden="true" />

                        <Image
                            src="/assets/about.png"
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

            <section className="px-6 bg-(--bg-color)">
                <div className="mx-auto flex max-w-7xl flex-col items-center">
                    <div className="w-full">
                        <p className="mx-auto mb-8 text-center leading-7 text-neutral-600 text-lg">
                            About us – TruCare was created by a team of industry service plan
                            experts designed to cover customers for everyday unexpected failures
                            and mishaps.
                        </p>

                        <p className="mx-auto mb-8 text-center leading-7 text-neutral-600 text-lg">
                            Our team provides our partners with more than 80 years of service and
                            warranty experience and prides itself on caring for its customers. No
                            matter how big or small, every TruCare customer will be treated with
                            the greatest of care. Each plan is fully insured and backed by AM Best
                            Rated insurance providing compliant and financially supported programs.
                        </p>

                        <p className="mx-auto mb-8 text-center leading-7 text-neutral-600 text-lg">
                            TruCare Protection provides value-added features and benefits for
                            retailers and their customers. With “True” coverage benefits for
                            customers and nationwide service available for repairs TruCare also
                            provides our retail partners with Day One bottom line income without
                            the expense of overhead or investment in physical products.
                        </p>

                        <p className="mx-auto mb-8 text-center leading-7 text-neutral-600 text-lg">
                            Our goal is to provide unique programs that offer exceptional value to
                            your customers while differentiating you from your customers.
                        </p>
                    </div>
                </div>
            </section>

            <section className="px-6 bg-(--bg-color)">
                <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2 lg:gap-16">

                    <div>
                        <h2 className="heading mb-5">
                            TruCare Protection´s
                            formula for success!
                        </h2>

                        <p className="mb-8 leading-7 text-neutral-500 text-lg">
                            AppliancesTruCare Protection not only provides our partners with day-one revenue, but we also provide their customers with our core beliefs.
                        </p>
                    </div>

                    <figure className="relative">
                        <div aria-hidden="true" />

                        <Image
                            src="/assets/about-2.png"
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

            <section className="bg-(--bg-color) px-6 py-14 md:py-16">
                <div className="mx-auto max-w-[1200px]">
                    <div className="grid gap-14 text-center md:grid-cols-3 md:gap-10">
                        {features.map((feature) => (
                            <article
                                key={feature.title}
                                className="flex flex-col items-center"
                            >
                                <i
                                    className={`${feature.icon} mb-5 text-[64px] leading-none text-[#ff1f2d]`}
                                    aria-hidden="true"
                                />

                                <h3 className="mb-7 text-[18px] font-semibold text-[#ff1f2d]">
                                    {feature.title}
                                </h3>

                                <p className="max-w-[360px] text-lg leading-[1.45] text-black">
                                    {feature.description}
                                </p>
                            </article>
                        ))}
                    </div>

                    <div className="mt-14 flex justify-center">
                        <Link
                            href="/contact-us"
                            className="rounded-full bg-gradient-to-r from-[#ff1f2d] to-[#9b111e] px-7 py-3 text-[14px] font-medium text-white transition-transform duration-200 hover:scale-105"
                        >
                            Learn More
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}