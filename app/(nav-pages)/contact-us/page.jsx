"use client";

import { useState } from "react";

import Image from "next/image";
export default function Contact() {
  const [interest, setInterest] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    setIsSubmitting(true);

    setStatus({
      type: "",
      message: "",
    });

    const payload = {
      companyName: formData.get("companyName"),
      name: formData.get("name"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      address: formData.get("address"),
      city: formData.get("city"),
      zipCode: formData.get("zipCode"),
      state: formData.get("state"),
      interest: formData.get("interest"),
      businessType: formData.getAll("businessType"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to send message.");
      }

      setStatus({
        type: "success",
        message: "Message sent successfully.",
      });

      form.reset();
      setInterest("");
    } catch (error) {
      console.error(error);

      setStatus({
        type: "error",
        message: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const dealerOptions = [
    "Cell Phone Store",
    "Phone Repair Shop",
    "Electronic Store",
    "Furniture Store",
    "Appliance Center",
  ];

  const serviceOptions = [
    "Phone Repair Services",
    "Appliance Services",
    "Furniture Services",
    "Electronic Services",
  ];

  const inputClass =
    "h-[46px] w-full rounded-[10px] border border-[#ededed] bg-white px-3 text-[16px] text-[#222] outline-none transition focus:border-(--primary-color)";

  return (
    <>
      <section className="relative flex min-h-[300px] items-center justify-center overflow-hidden">
        {/* Background Image */}
        <Image
          src="/assets/contact-bg.webp"
          alt=""
          fill
          priority
          className="object-cover"
        />
        {/* Center Logo */}
        <div className="relative z-10">
          <Image
            src="/assets/TruCareProtection.png"
            alt="TruCare Protection"
            width={256}
            height={100}
            priority
            className="h-auto w-48 object-contain md:w-64"
          />
        </div>
      </section>

      <section className="bg-(--bg-color) px-6 py-14 md:py-20">
        <div className="mx-auto max-w-[1140px]">
          {/* Heading */}
          <div className="text-center">
            <h2 className="md:text-[40px] text-3xl font-semibold leading-tight text-(--primary-color)">
              Contact Us
            </h2>

            <p className="mt-3 md:text-[20px] text-md text-[#333333]">
              Drop Us A Note and We Will Contact You ASAP
            </p>
          </div>

          <div className="mt-8 max-w-[600px] mx-auto">
            {/* Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="companyName" className="sr-only">
                  Company Name
                </label>

                <input
                  id="companyName"
                  name="companyName"
                  type="text"
                  autoComplete="organization"
                  required
                  placeholder="Company Name*"
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="name" className="sr-only">
                  Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  placeholder="Name*"
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="phone" className="sr-only">
                  Phone Number
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  autoComplete="tel"
                  required
                  placeholder="Phone Number*"
                  onInput={(e) => {
                    e.currentTarget.value = e.currentTarget.value.replace(
                      /\D/g,
                      "",
                    );
                  }}
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="E-mail*"
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="address" className="sr-only">
                  Address
                </label>

                <input
                  id="address"
                  name="address"
                  type="text"
                  autoComplete="street-address"
                  required
                  placeholder="Address*"
                  className={inputClass}
                />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="city" className="sr-only">
                    City
                  </label>

                  <input
                    id="city"
                    name="city"
                    type="text"
                    autoComplete="address-level2"
                    required
                    placeholder="City*"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="zipCode" className="sr-only">
                    Zip Code
                  </label>

                  <input
                    id="zipCode"
                    name="zipCode"
                    type="text"
                    autoComplete="postal-code"
                    required
                    placeholder="Zip Code*"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="state" className="sr-only">
                  State
                </label>

                <input
                  id="state"
                  name="state"
                  type="text"
                  autoComplete="address-level1"
                  required
                  placeholder="State*"
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="interest" className="sr-only">
                  Interested in Becoming
                </label>

                <select
                  id="interest"
                  name="interest"
                  required
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  className={inputClass}
                >
                  <option value="">Interested in Becoming*</option>
                  <option value="dealer">A Dealer</option>
                  <option value="service-partner">A Service Partner</option>
                </select>
              </div>

              {interest && (
                <fieldset>
                  <legend className="mb-3 text-sm font-medium text-neutral-800">
                    {interest === "dealer"
                      ? "Select Dealer Type*"
                      : "Select Service Type*"}
                  </legend>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {(interest === "dealer"
                      ? dealerOptions
                      : serviceOptions
                    ).map((option) => (
                      <label
                        key={option}
                        className="flex cursor-pointer items-center gap-3"
                      >
                        <input
                          type="checkbox"
                          name="businessType"
                          value={option}
                          className="size-4 accent-(--primary-color)"
                        />

                        <span className="text-sm font-medium text-neutral-800">
                          {option}
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              )}

              <div>
                <label htmlFor="message" className="sr-only">
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  placeholder="Message*"
                  className="min-h-[145px] w-full resize-y rounded-[10px] border border-[#ededed] bg-white px-3 py-3 text-[16px] text-[#222] outline-none transition focus:border-(--primary-color)"
                />
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="
            inline-flex min-w-[150px] items-center justify-center gap-2
            rounded-full bg-(--primary-color)
            px-7 py-2.5
            text-[14px] font-semibold uppercase text-white
            transition-all duration-300
            hover:bg-[#d91823]
            disabled:cursor-not-allowed
            disabled:opacity-70
        "
                >
                  {isSubmitting && (
                    <span
                      aria-hidden="true"
                      className="
                    h-4 w-4
                    animate-spin
                    rounded-full
                    border-2 border-white/40
                    border-t-white
                "
                    />
                  )}

                  <span className="transition-all duration-300">
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </span>
                </button>
              </div>

              {status.message && (
                <p
                  role="status"
                  className={`text-center text-sm font-medium ${
                    status.type === "success"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {status.message}
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
