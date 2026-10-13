"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import PrimaryBtn from "@/components/PrimaryBtn";

const slides = [
  {
    id: 1,
    title: "Become a",
    highlight: "Dealer Partner!",
    buttonText: "Signup Now",
    buttonLink: "/start-application",
    image: "/assets/slide-1-mob.png",
  },
  {
    id: 2,
    title: "Protect yourself from",
    highlight: "True Life experiences!",
    buttonText: "Learn More",
    buttonLink: "/contact-us",
    image: "/assets/slide-2-mob.png",
  },
  {
    id: 3,
    title: "Protect yourself from",
    highlight: "True Life experiences!",
    buttonText: "Request more Information",
    buttonLink: "/contact-us",
    image: "/assets/slide-3-mob.png",
  },
];

const AUTO_PLAY_TIME = 8000;

const transition = {
  duration: 0.8,
  ease: [0.16, 1, 0.3, 1],
};

export default function HeroSlider() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, AUTO_PLAY_TIME);

    return () => clearInterval(timer);
  }, []);

  const slide = slides[activeSlide];

  return (
    <section aria-label="Featured services" className="relative w-full overflow-hidden bg-(--bg-color) md:hidden">

      {/* PROGRESS BAR */}
      <div className="absolute left-0 top-0 z-30 h-[3px] w-full bg-neutral-200">
        <motion.div
          key={activeSlide}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: AUTO_PLAY_TIME / 1000, ease: "linear" }}
          className="h-full w-full origin-left bg-(--primary-color)"
        />
      </div>

      <div className="mx-auto w-full max-w-[600px] px-5 pb-10 pt-14">

        {/* TEXT CONTENT */}
        <div className="relative flex min-h-[200px] w-full items-start">

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, x: 35 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -35 }}
              transition={transition}
              className="absolute inset-x-0 top-0 text-left"
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-[clamp(30px,8vw,44px)] font-bold leading-[1.12] tracking-[-0.04em] text-neutral-950"
              >
                {slide.title}
                <span className="mt-1 block text-(--primary-color)">{slide.highlight}</span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.35 }}
                className="mt-7 flex justify-start"
              >
                <PrimaryBtn href={slide.buttonLink} className="rounded-md">{slide.buttonText}</PrimaryBtn>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* IMAGE */}
        <div className="relative mx-auto mt-2 aspect-square w-full max-w-[420px] overflow-hidden">

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, x: 40, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -40, scale: 1.02 }}
              transition={transition}
              className="absolute inset-0"
            >
              <motion.div
                initial={{ scale: 1.08 }}
                animate={{ scale: 1 }}
                transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={slide.image}
                  alt={slide.highlight}
                  fill
                  priority={activeSlide === 0}
                  sizes="(max-width: 420px) 90vw, 420px"
                  className="object-cover object-center"
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}