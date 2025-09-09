import { Navigation } from "@/components/navigation";
import { AnimatedSlider } from "@/components/animated-slider";
import { Hero } from "@/components/hero";
import { FeaturedProducts } from "@/components/featured-products";
import { Categories } from "@/components/categories";
import { NewsletterSection } from "@/components/newsletter-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { StatsSection } from "@/components/stats-section";
import { Footer } from "@/components/footer";
import { SpotlightEffect } from "@/components/spotlight-effect";
import { Suspense } from "react";
import { FeaturedProductsSkeleton } from "@/components/featured-products-skeleton";

export default function HomePage() {
  return (
    <div className="min-h-screen relative">
      {/* <SpotlightEffect /> */}
      <Navigation />
      <main>
        <AnimatedSlider />
        <Hero />
        <StatsSection />
        {/* <Categories /> */}
        <Suspense fallback={<FeaturedProductsSkeleton/>}>
        <FeaturedProducts />
        </Suspense>
        <TestimonialsSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
}
