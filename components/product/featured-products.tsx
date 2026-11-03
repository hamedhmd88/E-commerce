"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { productService } from "@/services/productService";
import { CatalogRequestError } from "@/services/catalog-error";
import { FeaturedProductsSkeleton } from "@/components/product/featured-products-skeleton";
import { StatusPanel } from "@/components/feedback/status-panel";

export function FeaturedProducts() {
  const query = useQuery({
    queryKey: ["products", "featured"],
    queryFn: () => productService.getProducts(8),
  });

  if (query.isPending) return <FeaturedProductsSkeleton />;

  if (query.isError) {
    const error =
      query.error instanceof CatalogRequestError
        ? query.error
        : new CatalogRequestError(undefined, false);
    return (
      <div className="container mx-auto px-4 py-16">
        <StatusPanel
          title="Featured products are temporarily unavailable"
          description={
            error.challenged
              ? "Fake Store API requires a browser security check for this request."
              : "The external product catalog could not be reached. Please try again later."
          }
          onRetry={() => {
            void query.refetch();
          }}
          retrying={query.isFetching}
        />
      </div>
    );
  }

  return (
    <section className="py-20 lg:py-28" aria-labelledby="featured-title">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="mb-3 text-sm font-medium text-primary">
            The pieces people return to
          </p>
          <h2
            id="featured-title"
            className="text-4xl font-medium tracking-[-.055em] text-balance mb-4 sm:text-5xl"
          >
            Favorites, for good reason.
          </h2>
          <p className="text-muted-foreground text-pretty max-w-2xl mx-auto">
            Explore a small selection from the live catalog.
          </p>
        </div>

        <div className="featured-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {query.data.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center">
          <Button asChild size="lg">
            <Link href="/products">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
