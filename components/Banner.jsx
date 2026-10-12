"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import PrimaryBtn from "./PrimaryBtn";

const slides = [
  {
    image: "/assets/slide-1.webp",
    title: "Become a",
    highlight: "Dealer Partner!",
    description: "",
    button: "Contact us",
  },
  {
    image: "/assets/slide-2.webp",
    title: "Protect yourself from",
    highlight: "True Life experiences!",
    description: "",
    button: "Learn More",
  },
  {
    image: "/assets/slide-3.webp",
    title: "Protect yourself from",
    highlight: "True Life experiences!",
    description: "",
    button: "Request more Information",
  },
];

const AUTO_PLAY_TIME = 5000;

export default function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, AUTO_PLAY_TIME);

    return () => clearInterval(interval);
  }, []);

  const slide = slides[currentSlide];

  return (
    <section className="relative flex min-h-[700px] items-center overflow-hidden bg-(--bg-color)">
      {/* TOP PROGRESS BAR */}
      <div className="absolute left-0 top-0 z-20 h-1 w-full bg-neutral-200">
        <motion.div
          key={`progress - ${currentSlide} `}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{
            duration: AUTO_PLAY_TIME / 1000,
            ease: "linear",
          }}
          className="h-full w-full origin-left bg-neutral-400"
        />
      </div>

      {/* Background */}
      <AnimatePresence mode="sync">
        <motion.div
          key={slide.image}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: {
              duration: 1,
              ease: "easeInOut",
            },
          }}
          className="absolute inset-0 overflow-hidden"
        >
          <motion.div
            initial={{ x: "0%" }}
            animate={{ x: "8%" }}
            transition={{
              duration: AUTO_PLAY_TIME / 1000,
              ease: "linear",
            }}
            className="absolute -inset-y-0 -left-[8%] w-[100%]"
          >
            <Image
              src={slide.image}
              alt=""
              fill
              priority={currentSlide === 0}
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-20 mx-auto w-full max-w-300 px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{
              opacity: 0,
              x: 120,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              x: -80,
            }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="max-w-xl"
          >
            <h1 className="text-4xl font-bold leading-[1.05] tracking-tight text-neutral-950 [text-shadow:0_3px_10px_rgba(0,0,0,0.55)] sm:text-5xl lg:text-6xl">
              {slide.title}
              <span className="mt-2 block text-(--primary-color)">
                {slide.highlight}
              </span>
            </h1>

            <p className="mb-8 text-base leading-7 md:text-2xl">
              {slide.description}
            </p>

            <PrimaryBtn
              href="/contact-us"
              showIcon={false}
              className="rounded-md"
            >
              {slide.button}
            </PrimaryBtn>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1} `}
            className={`h - 2 rounded - full transition - all duration - 300 ${
              index === currentSlide ? "w-8 bg-black" : "w-2 bg-black/40"
            } `}
          />
        ))}
      </div>
    </section>
  );
}
