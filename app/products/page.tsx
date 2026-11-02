import { ProductsCatalog } from "@/components/product/products-catalog";
import { PageLayout } from "@/components/layout/page-layout";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "All products",
  description:
    "Browse the full demo catalog of clothing, jewelry, and electronics from Fake Store API.",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  return (
    <PageLayout variant="catalog">
      <div className="mb-10 max-w-3xl pt-7 lg:mb-12 lg:pt-10">
        <p className="mb-3 text-sm font-medium text-primary">
          The Morrow collection
        </p>
        <h1 className="text-4xl font-medium tracking-[-.055em] text-balance sm:text-5xl lg:text-6xl">
          Find your next favorite.
        </h1>
        <p className="mt-5 max-w-xl leading-7 text-muted-foreground">
          Explore clothing, jewelry, and useful objects. Refine the live demo
          catalog to find what fits your day.
        </p>
        <Link
          href="/products/manage"
          className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full border border-primary/35 bg-card/60 px-5 text-sm font-medium text-primary transition-colors hover:bg-primary/10"
        >
          Explore product API methods <ArrowUpRight className="size-4" />
        </Link>
      </div>
      <ProductsCatalog />
    </PageLayout>
  );
}
