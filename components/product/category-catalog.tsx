"use client";

import { useQuery } from "@tanstack/react-query";
import { StatusPanel } from "@/components/feedback/status-panel";
import { ProductCard } from "@/components/product/product-card";
import { CatalogUnavailable } from "@/components/product/catalog-unavailable";
import { productService } from "@/services/productService";
import { CatalogRequestError } from "@/services/catalog-error";

export function CategoryCatalog({ category }: { category: string }) {
  const query = useQuery({
    queryKey: ["products", "category", category],
    queryFn: () => productService.getProductsByCategory(category),
  });

  if (query.isPending) {
    return (
      <div
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        aria-label="Loading category products"
      >
        {Array.from({ length: 8 }, (_, index) => (
          <div key={index} className="animate-pulse rounded-xl border p-5">
            <div className="mb-4 aspect-square rounded-lg bg-muted" />
            <div className="mb-2 h-4 rounded bg-muted" />
            <div className="h-4 w-2/3 rounded bg-muted" />
          </div>
        ))}
      </div>
    );
  }

  if (query.isError) {
    const error =
      query.error instanceof CatalogRequestError
        ? query.error
        : new CatalogRequestError(undefined, false);
    return (
      <CatalogUnavailable
        error={error}
        retryHref={`/category/${encodeURIComponent(category)}`}
      />
    );
  }

  if (query.data.length === 0) {
    return (
      <StatusPanel
        kind="empty"
        title="No products in this collection"
        description="No products are available in this collection right now."
        actionHref="/products"
        actionLabel="Browse all products"
      />
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {query.data.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
