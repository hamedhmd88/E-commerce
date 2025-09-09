"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { dataSlider } from "@/data/data";

export function AnimatedSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (!isHovered) {
      timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % dataSlider.length);
      }, 5000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isHovered]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % dataSlider.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + dataSlider.length) % dataSlider.length
    );
  };

  return (
    <div
      className="group relative h-[300px] sm:h-[400px] md:h-[600px] overflow-hidden rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {dataSlider.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === currentSlide
              ? "opacity-100 translate-x-0"
              : index < currentSlide
              ? "opacity-0 -translate-x-full"
              : "opacity-0 translate-x-full"
          }`}
        >
          <div className="relative h-full flex items-center after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1/3 after:bg-gradient-to-t after:from-black/50 after:to-transparent">
            <Image
              src={slide.image || "/placeholder.svg"}
              alt={slide.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/40" />

            <div className="relative z-10 container mx-auto px-4">
              <div className="max-w-2xl text-white">
                <h3 className="text-xs sm:text-sm font-medium mb-2 opacity-90 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
                  {slide.subtitle}
                </h3>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-balance  animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-200">
                  {slide.title}
                </h2>
                <p className="text-lg sm:text-xl mb-8 opacity-90 animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-400">
                  {slide.description}
                </p>
                <Link href={slide.link}>
                  <Button
                    size="xl"
                    variant="ghost"
                    className="bg-primary-dark text-white hover:bg-accent transition-all duration-300 animate-in fade-in-0 slide-in-from-bottom-4 "
                  >
                    {slide.cta}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-primary hover:bg-primary-dark hover:scale-110 transition-all duration-200 opacity-0 group-hover:opacity-100"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-primary hover:bg-primary-dark hover:scale-110 transition-all duration-200 opacity-0 group-hover:opacity-100"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Slide Indicators */}
      <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 flex space-x-2 m-7">
        {dataSlider.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
              index === currentSlide ? "bg-primary" : "bg-white/50"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}
