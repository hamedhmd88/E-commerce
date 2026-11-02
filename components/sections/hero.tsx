"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";

const slides = [
  {
    eyebrow: "The wardrobe edit",
    title: "Wear what\nfeels like you.",
    description:
      "Thoughtful everyday pieces, selected for the way real life moves.",
    image: "/summer-fashion-collection-modern-lifestyle.jpg",
    alt: "A relaxed, sunlit fashion editorial",
    href: "/category/women's clothing",
    cta: "Explore the edit",
  },
  {
    eyebrow: "Objects with a purpose",
    title: "Good design\nin the details.",
    description:
      "Useful technology that earns its place in your daily routine.",
    image: "/modern-electronics-technology-gadgets.jpg",
    alt: "A considered selection of everyday technology",
    href: "/category/electronics",
    cta: "Browse technology",
  },
  {
    eyebrow: "Small things, kept close",
    title: "A little shine,\na lot of meaning.",
    description:
      "Jewelry chosen to feel personal today and easy to wear tomorrow.",
    image: "/luxury-jewelry-elegant-accessories.jpg",
    alt: "Jewelry arranged in a soft editorial still life",
    href: "/category/jewelery",
    cta: "Discover jewelry",
  },
  {
    eyebrow: "The everyday uniform",
    title: "Made for the\nway you move.",
    description: "Easy layers and useful favorites for every day in between.",
    image: "/photo-slider/manclth2.jpg",
    alt: "Men's clothing in a relaxed editorial setting",
    href: "/category/men's clothing",
    cta: "Explore menswear",
  },
  {
    eyebrow: "A fresh perspective",
    title: "Find your\nnext favorite.",
    description:
      "A considered mix of shapes, textures, and pieces to make your own.",
    image: "/photo-slider/womanclth2.jpg",
    alt: "Women's clothing styled for everyday wear",
    href: "/category/women's clothing",
    cta: "Explore womenswear",
  },
];

export function Hero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (paused || hovered || reduceMotion) return;
    const timer = window.setInterval(
      () => setActive((current) => (current + 1) % slides.length),
      6500,
    );
    return () => window.clearInterval(timer);
  }, [paused, hovered, reduceMotion]);

  const slide = slides[active];
  const changeSlide = (direction: number) =>
    setActive(
      (current) => (current + direction + slides.length) % slides.length,
    );

  return (
    <section
      aria-label="Featured collections"
      aria-roledescription="carousel"
      className="hero-shell relative isolate overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="hero-glow" aria-hidden="true" />
      <div className="mx-auto grid min-h-[640px] max-w-[1440px] items-center gap-10 px-5 pb-16 pt-10 sm:px-8 lg:min-h-[720px] lg:grid-cols-[.88fr_1.12fr] lg:gap-14 lg:px-14 lg:py-16">
        <div className="relative z-10 order-2 lg:order-1">
          <div className="mb-7 flex items-center gap-3 text-sm font-medium text-primary">
            <span className="h-px w-8 bg-primary" />
            <span>{slide.eyebrow}</span>
          </div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="max-w-[13ch] whitespace-pre-line text-[clamp(3.25rem,6.4vw,6.5rem)] font-medium leading-[1.02] tracking-[-.07em]">
                {slide.title}
              </h1>
              <p className="mt-7 max-w-md text-base leading-7 text-muted-foreground sm:text-lg">
                {slide.description}
              </p>
              <Link
                href={slide.href}
                className="button-liquid mt-8 inline-flex min-h-14 items-center gap-3 rounded-full bg-primary px-7 font-medium text-primary-foreground shadow-lg shadow-primary/15 transition-transform hover:-translate-y-0.5"
              >
                {slide.cta}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </motion.div>
          </AnimatePresence>

          <div
            className="mt-12 flex items-center gap-5"
            aria-label="Carousel controls"
          >
            <div className="flex items-center gap-2">
              {slides.map((item, index) => (
                <button
                  key={item.eyebrow}
                  type="button"
                  onClick={() => setActive(index)}
                  aria-label={`Show slide ${index + 1}: ${item.eyebrow}`}
                  aria-current={active === index ? "true" : undefined}
                  className={`carousel-dot ${active === index ? "is-active" : ""}`}
                />
              ))}
            </div>
            <span
              className="text-xs tabular-nums text-muted-foreground"
              aria-live="polite"
            >
              0{active + 1} <span aria-hidden="true">/</span> 0{slides.length}
            </span>
            <div className="ml-auto flex gap-2">
              <button
                type="button"
                className="glass-control"
                onClick={() => changeSlide(-1)}
                aria-label="Previous collection"
              >
                <ArrowLeft className="size-4" />
              </button>
              <button
                type="button"
                className="glass-control"
                onClick={() => changeSlide(1)}
                aria-label="Next collection"
              >
                <ArrowRight className="size-4" />
              </button>
              {!reduceMotion && (
                <button
                  type="button"
                  className="glass-control"
                  onClick={() => setPaused((value) => !value)}
                  aria-label={
                    paused ? "Play automatic slides" : "Pause automatic slides"
                  }
                >
                  {paused ? (
                    <Play className="size-4" />
                  ) : (
                    <Pause className="size-4" />
                  )}
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="relative order-1 mx-auto w-full max-w-[660px] lg:order-2">
          <div className="hero-frame glass-panel relative aspect-[.92] overflow-hidden rounded-[2rem] p-2 sm:aspect-[1.08] sm:rounded-[2.5rem]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active}
                className="absolute inset-2 overflow-hidden rounded-[1.65rem] sm:rounded-[2.1rem]"
                initial={reduceMotion ? false : { opacity: 0, scale: 1.025 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduceMotion ? undefined : { opacity: 0 }}
                transition={{ duration: 0.65, ease: "easeOut" }}
              >
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 56vw"
                  className="hero-image object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-white/5" />
                <div className="glass-panel absolute bottom-5 left-5 right-5 flex items-center justify-between gap-4 rounded-2xl p-4 text-white sm:bottom-7 sm:left-7 sm:right-7 sm:p-5">
                  <div>
                    <p className="text-xs text-white/70">
                      Selected for the everyday
                    </p>
                    <p className="mt-1 font-medium">Morrow</p>
                  </div>
                  <span className="grid size-10 place-items-center rounded-full border border-white/25 bg-white/10">
                    <ArrowRight className="size-4 -rotate-45" />
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="hero-orbit" aria-hidden="true">
            <span>Curated with care</span>
          </div>
          <p className="sr-only" aria-live="polite">
            {slide.eyebrow}: {slide.description}
          </p>
        </div>
      </div>
    </section>
  );
}
