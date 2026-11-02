import { Navigation } from "@/components/layout/navigation";
import { Hero } from "@/components/sections/hero";
import { FeaturedProducts } from "@/components/product/featured-products";
import { Categories } from "@/components/sections/categories";
import { NewsletterSection } from "@/components/sections/newsletter-section";
import { Footer } from "@/components/layout/footer";
import { Suspense } from "react";
import { FeaturedProductsSkeleton } from "@/components/product/featured-products-skeleton";
import { FAQSection } from "@/components/sections/faq-section";
import { EditorialNote } from "@/components/sections/editorial-note";
import { ProductStory } from "@/components/sections/product-story";
import { JournalSection } from "@/components/sections/journal-section";

export default function HomePage() {
  return (
    <div className="home-canvas min-h-screen relative">
      <Navigation />
      <main id="main-content">
        <Hero />
        <Categories />
        <JournalSection />
        <ProductStory />
        <Suspense fallback={<FeaturedProductsSkeleton />}>
          <FeaturedProducts />
        </Suspense>
        <EditorialNote />
        <NewsletterSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
