import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#f7f7f7] text-[#777]">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-10 px-5 py-12 md:flex-row md:px-8 lg:px-7">
        {/* Logo */}
        <div className="flex justify-center md:justify-start">
          <Link href="/" aria-label="TruCare Protection home">
            <Image
              src="/assets/TruCareProtection.png"
              alt="TruCare Protection"
              width={250}
              height={100}
              className="h-auto w-[220px] object-contain sm:w-[245px]"
            />
          </Link>
        </div>

        {/* Contact Info */}
       <div className="flex flex-col items-start gap-4">
          <h3 className="text-2xl font-semibold text-(--primary-color)">
            Connect
          </h3>

          {/* Phone */}
          <div className="flex items-center gap-2">
            <i
              className="ri-phone-fill shrink-0 text-xl text-(--primary-color)"
              aria-hidden="true"
            />

            <a
              href="tel:18778201777"
              className="text-3xl leading-6 transition-colors text-(--primary-color) md:leading-7"
            >
              1-877-820-1777
            </a>
          </div>

          {/* Email */}
          <div className="flex items-center gap-2">
            <i
              className="ri-mail-fill shrink-0 text-[18px]"
              aria-hidden="true"
            />

            <a
              href="mailto:Signup@trucaredealer.com"
              className="text-lg leading-6 transition-colors hover:text-(--primary-color) md:leading-7"
            >
              Signup@trucaredealer.com
            </a>
          </div>

          {/* Address */}
          <div className="flex items-start gap-2">
            <i
              className="ri-map-pin-fill mt-1 shrink-0 text-[18px]"
              aria-hidden="true"
            />

            <p className="max-w-[280px] text-lg leading-6 md:max-w-none md:whitespace-nowrap md:leading-7">
              1692 Coastal Highway, Lewes, Delaware, 19958
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-[#dddddd]">
        <div className="mx-auto max-w-[1280px] px-7 py-[62px] md:px-10 lg:px-7">
          <p className="text-md text-[#333]">
            <Link href="/" className="text-[#777] underline">
              TruCare Protection
            </Link>{" "}
            © {new Date().getFullYear()}, All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
