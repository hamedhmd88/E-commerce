"use client";

import { useQuery } from "@tanstack/react-query";
import { ProductsGrid } from "@/components/product/products-grid";
import { CatalogUnavailable } from "@/components/product/catalog-unavailable";
import { productService } from "@/services/productService";
import { CatalogRequestError } from "@/services/catalog-error";

export function ProductsCatalog() {
  const query = useQuery({
    queryKey: ["products"],
    queryFn: productService.getAllProducts,
  });

  if (query.isPending) {
    return (
      <div
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        aria-label="Loading products"
      >
        {Array.from({ length: 9 }, (_, index) => (
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
    return <CatalogUnavailable error={error} retryHref="/products" />;
  }

  return <ProductsGrid initialProducts={query.data} />;
}
