"use client";

import { useEffect, useState } from "react";
import { Globe2, Languages, MessageSquareText, X } from "lucide-react";

export default function LanguageSwitcher() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,es",
          autoDisplay: false,
        },
        "google_translate_element",
      );
    };

    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");

      script.id = "google-translate-script";
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;

      document.body.appendChild(script);
    }

    const removeGoogleBar = () => {
      // Reset page position
      document.body.style.top = "0px";
      document.documentElement.style.top = "0px";
      document.body.style.marginTop = "0px";
      document.documentElement.style.marginTop = "0px";

      // Remove Google banner iframe
      document
        .querySelectorAll(
          `
          iframe.goog-te-banner-frame,
          iframe.skiptranslate,
          .goog-te-banner-frame,
          .goog-te-banner-frame.skiptranslate
        `,
        )
        .forEach((element) => {
          element.style.display = "none";
          element.style.visibility = "hidden";
          element.style.height = "0";
        });

      // Hide Google's injected top-level container
      document.querySelectorAll("body > .skiptranslate").forEach((element) => {
        if (element.id !== "google_translate_element") {
          element.style.display = "none";
        }
      });
    };

    removeGoogleBar();

    const observer = new MutationObserver(() => {
      removeGoogleBar();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  function changeLanguage(language) {
    const select = document.querySelector(".goog-te-combo");

    if (!select) return;

    select.value = language;

    select.dispatchEvent(
      new Event("change", {
        bubbles: true,
      }),
    );

    setOpen(false);
  }

  return (
    <>
      <div id="google_translate_element" className="hidden" />

      <div className="fixed bottom-6 right-5 z-[9999] flex flex-col items-end gap-3 md:bottom-8 md:right-8">
        {open && (
          <div className="w-[170px] overflow-hidden rounded-[14px] border border-[#e5e5e5] bg-white shadow-[0_12px_40px_rgba(0,0,0,0.15)]">
            <button
              type="button"
              onClick={() => changeLanguage("en")}
              className="
                flex w-full items-center
                px-4 py-3
                text-left text-sm font-semibold
                text-[#333]
                transition
                hover:bg-[#f7f7f7]
              "
            >
              English
            </button>

            <button
              type="button"
              onClick={() => changeLanguage("es")}
              className="
                flex w-full items-center
                border-t border-[#eeeeee]
                px-4 py-3
                text-left text-sm font-semibold
                text-[#333]
                transition
                hover:bg-[#f7f7f7]
              "
            >
              Español
            </button>
          </div>
        )}

        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          aria-label="Change language"
          className="
            flex size-12
            items-center justify-center
            rounded-full
            bg-(--primary-color)
            text-white
            shadow-[0_8px_25px_rgba(0,0,0,0.2)]
            transition-all duration-300
            hover:scale-105
          "
        >
          {/* {open ? <X className="size-5" /> : <Languages className="size-5" />} */}
          {open ? <X className="size-5" /> : <Globe2 className="size-5" />}
          {/* {open ? <X className="size-5" /> : <MessageSquareText className="size-5" />} */}
        </button>
      </div>
    </>
  );
}
