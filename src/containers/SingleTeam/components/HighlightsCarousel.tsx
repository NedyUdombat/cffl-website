"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { SectionHeading } from "./SectionHeading";
import { EASE } from "./types";
import type { CarouselItem } from "./types";

export function HighlightsCarousel({
  items,
  primaryColor,
}: {
  items: CarouselItem[];
  primaryColor: string;
}) {
  const [slide, setSlide] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = (idx: number) => {
    setDirection(idx > slide ? 1 : -1);
    setSlide(idx);
  };
  const prev = () => goTo((slide - 1 + items.length) % items.length);
  const next = () => goTo((slide + 1) % items.length);

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { duration: 0.45, ease: EASE } },
    exit: (dir: number) => ({
      x: dir > 0 ? "-100%" : "100%",
      opacity: 0,
      transition: { duration: 0.3 },
    }),
  };

  return (
    <section className="py-16 md:py-20 px-6 md:px-14 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-7">
          <SectionHeading primaryColor={primaryColor}>Highlights</SectionHeading>

          <div className="flex items-center gap-2">
            <button
              onClick={prev}
              type="button"
              aria-label="Previous slide"
              className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-colors"
            >
              <ArrowLeft size={15} />
            </button>
            <span className="text-white/30 text-xs font-machine w-12 text-center tabular-nums">
              {slide + 1} / {items.length}
            </span>
            <button
              onClick={next}
              type="button"
              aria-label="Next slide"
              className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-colors"
            >
              <ArrowRight size={15} />
            </button>
          </div>
        </div>

        <div
          className="relative w-full rounded-2xl overflow-hidden bg-[#0d1018]"
          style={{ aspectRatio: "16 / 6.5" }}
        >
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={slide}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0"
            >
              <Image
                src={items[slide].src}
                alt={items[slide].caption}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
              <p className="absolute bottom-4 left-5 right-20 text-white/65 text-xs font-machine leading-snug">
                {items[slide].caption}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Dot indicators */}
          <div className="absolute bottom-4 right-4 flex gap-1.5 z-10">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: i === slide ? primaryColor : "rgba(255,255,255,0.25)",
                  transform: i === slide ? "scale(1.5)" : "scale(1)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
