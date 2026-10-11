"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const faqs = [
  {
    question: "1. When does the plan begin?",
    answer:
      "Starting on the date of purchase/delivery of the covered product and until the end of the contract term, this DOES NOT take place of the manufacturer warranty. TruCare Protection will repair or replace the covered product when caused by a breakdown, including normal wear and tear, and mechanical or electrical failure caused as a direct result of a power surge (in absence of insurance). We will also repair damage resulting from Accidental Damage from Handling including stains, rips and tears.",
  },
  {
    question: "2. How do I submit a claim?",
    answer: (
      <>
        To submit a claim, you can visit our website at{" "}
        <a
          href="https://www.trucareprotection.com/claims"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-red-600 underline underline-offset-2 hover:text-red-700"
        >
          www.trucareprotection.com/claims
        </a>{" "}
        to submit a claim virtually, or you can give us a call at{" "}
        <a
          href="tel:18886992287"
          className="font-medium text-red-600 underline underline-offset-2 hover:text-red-700"
        >
          888-699-2TRU (2878)
        </a>
        .
      </>
    ),
  },
  {
    question: "3. Do I need to register my TruCare Protection Plan?",
    answer:
      "No registration is needed! Your protection plan is ready to do at the time of purchase! If possible, please keep a copy of your sales receipt.",
  },
  {
    question: "4. How does my product get serviced?",
    answer:
      "TruCare Protection offers Nationwide Service: Carry-in, Depot and On-site Repair Services. Most of our services are provided by our in-home service technicians.",
  },
  {
    question: "5. How do I get a copy of my Program Terms & Conditions?",
    answer: (
      <>
        You can send an email to{" "}
        <a
          href="mailto:info@trucareprotection.com"
          className="font-medium text-red-600 underline underline-offset-2 hover:text-red-700"
        >
          info@trucareprotection.com
        </a>{" "}
        asking for the Terms and Conditions. Also, when you sign up, you receive
        a copy of your T&amp;C’s in a Welcome email.
      </>
    ),
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <>
      <section className="relative flex min-h-[300px] items-center justify-center overflow-hidden">
        {/* Background Image */}
        <Image
          src="/assets/faq.webp"
          alt=""
          fill
          priority
          className="object-cover"
        />
        {/* Center Logo */}
        <div className="relative z-10">
          <h2 className="heading">FAQ’S</h2>
        </div>
      </section>

      <section className="bg-[#e2e2e2] px-6 py-12 md:py-20">
        <div className="mx-auto max-w-300">
          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <article key={faq.question} className="overflow-hidden">
                  <h2>
                    <button
                      type="button"
                      onClick={() => toggleFAQ(index)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left sm:px-6"
                    >
                      <span
                        className={`leading-6 transition-colors duration-300 text-lg ${
                          isOpen ? "text-red-600" : "text-neutral-600"
                        }`}
                      >
                        {faq.question}
                      </span>

                      <span
                        className={`flex size-9 shrink-0 bg-white items-center justify-center text-2xl font-light transition-colors duration-300 ${
                          isOpen ? "text-red-600" : "text-neutral-950"
                        }`}
                        aria-hidden="true"
                      >
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>
                  </h2>

                  <div
                    className={`grid transition-all duration-300 ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-6 pr-14 text-lg leading-7 text-neutral-600 sm:px-6">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-6 text-center">
            <h2 className="text-2xl font-bold text-[#ff1f2d] md:text-3xl">
              Need help or have other questions?
            </h2>

            <div className="mt-12">
              <Link
                href="/contact"
                className="inline-flex min-h-[62px] items-center justify-center rounded-full bg-gradient-to-r from-[#ff1f2d] to-[#8b1220] px-8 text-base font-medium text-white transition-transform duration-300 hover:-translate-y-0.5"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
