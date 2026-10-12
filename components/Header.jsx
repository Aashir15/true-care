"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Menu, X } from "lucide-react";
import PrimaryBtn from "./PrimaryBtn";

const navLinks = [
  {
    name: "HOME",
    path: "/",
  },
  {
    name: "ABOUT US",
    path: "/about-us",
    dropdown: [
      { name: "Privacy Policy", path: "/privacy-policy" },
      { name: "FAQ", path: "/faqs" },
    ],
  },
  {
    name: "PLAN OPTIONS",
    path: "/plans",
    dropdown: [
      { name: "Appliances", path: "/plans/appliances" },
      { name: "Electronics", path: "/plans/electronics" },
      { name: "Furniture", path: "/plans/furniture" },
    ],
  },
  {
    name: "BENEFITS",
    path: "/benefits",
  },
  {
    name: "CONTACT US",
    path: "/contact-us",
  },
  // {
  //     name: "SUBMIT A CLAIM",
  //     path: "/submit-a-claim",
  // },
];

export default function Header2() {
  const [open, setOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState(null);

  return (
    <>
      <header className="relative z-50 w-full bg-white">
        {/* Desktop Header */}
        <div className="hidden lg:block">
          {/* Main content */}
          <div className="px-[39px] pt-[35px] max-w-300 mx-auto">
            <div className="flex items-start justify-between">
              {/* Logo */}
              <Link
                href="/"
                aria-label="TruCare Protection home"
                className="shrink-0"
              >
                <Image
                  src="/assets/TruCareProtection.png"
                  alt="TruCare Protection"
                  width={245}
                  height={95}
                  priority
                  className="h-auto w-[245px] object-contain"
                />
              </Link>

              {/* Contact Info */}
              <div className="flex items-center pt-[10px]">
                {/* Address */}
                <div className="flex items-center gap-[16px] pr-[20px]">
                  <MapPin
                    size={15}
                    strokeWidth={3}
                    className="shrink-0 text-[#ff1f2d]"
                  />

                  <span className="text-[16px] font-normal tracking-[0.1px] text-[#777777]">
                    1692 Coastal Highway, Lewes, Delaware, 19958
                  </span>
                </div>

                {/* Divider */}
                <span
                  aria-hidden="true"
                  className="h-[23px] w-px bg-[#dddddd]"
                />

                {/* Phone */}
                <PrimaryBtn
                  href="/start-application"
                  showIcon={false}
                  className="rounded-md"
                >
                  Become a Dealer
                </PrimaryBtn>
              </div>
            </div>

            {/* Tagline */}
            <p className="mt-[21px] pb-[20px] text-[17px] italic leading-none text-[#777777]">
              Protection Plans for Appliances, Electronics &amp; Furniture
            </p>
          </div>

          {/* Desktop Navigation */}
          <nav
            aria-label="Main navigation"
            className="h-[43px] border-y border-[#dddddd] "
          >
            <div className="flex h-full items-center pl-[58px] max-w-300 mx-auto">
              {navLinks.map((link, index) => (
                <div
                  key={link.name}
                  className="group relative flex h-[21px] items-center"
                >
                  <Link
                    href={link.path}
                    className={`whitespace-nowrap px-[29px] text-[14px] font-semibold leading-[21px] transition-colors hover:text-[#ff1f2d] ${
                      index === 0 ? "pl-0 text-[#ff1f2d]" : "text-[#707070]"
                    }`}
                  >
                    {link.name}
                  </Link>

                  {link.dropdown && (
                    <div className="invisible absolute left-0 top-full z-90 pt-[12px] opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                      <div className="relative min-w-[220px] bg-[#8b1220] py-1 shadow-md">
                        {/* Top triangle */}
                        <span className="absolute -top-[9px] left-8 h-0 w-0 border-x-[10px] border-b-[10px] border-x-transparent border-b-[#8b1220] z-99" />

                        {link.dropdown.map((item) => (
                          <Link
                            key={item.name}
                            href={item.path}
                            className="block px-7 py-[18px] text-[16px] font-normal uppercase text-white transition-colors hover:bg-[#76101b]"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {index !== navLinks.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="ml-[3px] h-[21px] w-px bg-[#dddddd]"
                    />
                  )}
                </div>
              ))}
            </div>
          </nav>
        </div>

        {/* Mobile Header */}
        <div className="flex h-[82px] items-center justify-between border-b border-[#dddddd] px-5 lg:hidden">
          <Link href="/" aria-label="TruCare Protection home">
            <Image
              src="/assets/TruCareProtection.png"
              alt="TruCare Protection"
              width={170}
              height={65}
              priority
              className="h-auto w-[170px] object-contain"
            />
          </Link>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={open}
            className="flex size-10 items-center justify-center text-[#777777]"
          >
            <Menu size={28} />
          </button>
        </div>
      </header>

      {/* Mobile Overlay */}
      {open && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-50 bg-black/40 lg:hidden"
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        aria-label="Mobile navigation"
        className={`fixed right-0 top-0 z-60 h-dvh w-[85%] max-w-[320px] bg-(--primary-color) shadow-xl transition-transform duration-300 lg:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-[82px] items-center justify-end border-b border-[#dddddd] px-5">
          {/* <Image
                        src="/assets/TruCareProtection.png"
                        alt="TruCare Protection"
                        width={150}
                        height={60}
                        className="h-auto w-[150px] object-contain"
                    /> */}

          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close navigation menu"
            className="flex size-10 items-center justify-center text-white"
          >
            <X size={25} />
          </button>
        </div>

        <nav aria-label="Mobile navigation links" className="px-5 py-4">
          {navLinks.map((link, index) => (
            <div key={link.name} className="border-b border-[#eeeeee]">
              {link.dropdown ? (
                <>
                  <div className="flex items-center">
                    <Link
                      href={link.path}
                      onClick={() => setOpen(false)}
                      className={`flex-1 py-4 text-[14px] font-semibold ${
                        index === 0 ? "text-[#ff1f2d]" : "text-white"
                      }`}
                    >
                      {link.name}
                    </Link>

                    <button
                      type="button"
                      onClick={() =>
                        setMobileDropdown(
                          mobileDropdown === link.name ? null : link.name,
                        )
                      }
                      aria-label={`Toggle ${link.name} menu`}
                      aria-expanded={mobileDropdown === link.name}
                      className="flex size-10 items-center justify-center text-white"
                    >
                      <i
                        className={`ri-arrow-down-s-line text-xl transition-transform duration-200 ${
                          mobileDropdown === link.name ? "rotate-180" : ""
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                  </div>

                  <div
                    className={`grid transition-all duration-300 ${
                      mobileDropdown === link.name
                        ? "grid-rows-[1fr] pb-3"
                        : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="ml-3 border-l border-[#dddddd]">
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.name}
                            href={item.path}
                            onClick={() => {
                              setOpen(false);
                              setMobileDropdown(null);
                            }}
                            className="block px-5 py-2.5 text-[13px] font-medium text-white transition-colors hover:text-[#ff1f2d]"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <Link
                  href={link.path}
                  onClick={() => setOpen(false)}
                  className={`block py-4 text-[14px] font-semibold ${
                    index === 0 ? "text-white" : "text-white"
                  }`}
                >
                  {link.name}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
