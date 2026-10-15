import Link from "next/link";

export const metadata = {
  title: "Thank You | TruCare Protection",
};

export default function ThankYouPage() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[#f7f5f2] px-5 py-16">
      <div className="mx-auto max-w-[720px] text-center">
        <h1 className="text-3xl font-semibold text-(--primary-color) md:text-[42px]">
          Thank You
        </h1>

        <div className="mt-6 space-y-5 text-[16px] leading-7 text-[#555] md:text-[18px]">
          <p>
            Hi there,
          </p>

          <p>
            Thank you for contacting Trucare protection. We’ve received your
            message and appreciate you reaching out.
          </p>

          <p>
            Our team will review your inquiry and get back to you as soon as
            possible.
          </p>

          <p className="font-semibold text-[#222]">
            Truecare Support Team
          </p>
        </div>

        <Link
          href="/"
          className="
            mt-8 inline-flex
            items-center justify-center
            rounded-full
            bg-(--primary-color)
            px-7 py-3
            text-sm font-semibold uppercase
            text-white
            transition-all duration-300
            hover:opacity-90
          "
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}