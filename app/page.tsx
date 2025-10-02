import { Navigation } from "@/components/layout/navigation";
import { AnimatedSlider } from "@/components/sections/animated-slider";
import { Hero } from "@/components/sections/hero";
import { FeaturedProducts } from "@/components/product/featured-products";
import { Categories } from "@/components/sections/categories";
import { NewsletterSection } from "@/components/sections/newsletter-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { StatsSection } from "@/components/sections/stats-section";
import { Footer } from "@/components/layout/footer";
import { Suspense } from "react";
import { FeaturedProductsSkeleton } from "@/components/product/featured-products-skeleton";
import { FAQSection } from "@/components/sections/faq-section";

export default function HomePage() {
  return (
    <div className="min-h-screen relative">
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
        <FAQSection/>
      </main>
      <Footer />
    </div>
  );
}
