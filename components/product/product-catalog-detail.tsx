"use client";

import { useQuery } from "@tanstack/react-query";
import { ProductDetail } from "@/components/product/product-detail";
import { CatalogUnavailable } from "@/components/product/catalog-unavailable";
import { StatusPanel } from "@/components/feedback/status-panel";
import { productService } from "@/services/productService";
import { CatalogRequestError } from "@/services/catalog-error";

export function ProductCatalogDetail({ id }: { id: number }) {
  const query = useQuery({
    queryKey: ["products", id],
    queryFn: () => productService.getProduct(id),
  });

  if (query.isPending) {
    return (
      <div className="grid gap-10 md:grid-cols-2" aria-label="Loading product">
        <div className="aspect-square animate-pulse rounded-xl bg-muted" />
        <div className="space-y-4 py-8">
          <div className="h-8 animate-pulse rounded bg-muted" />
          <div className="h-5 w-1/3 animate-pulse rounded bg-muted" />
          <div className="h-24 animate-pulse rounded bg-muted" />
        </div>
      </div>
    );
  }

  if (query.isError) {
    const error =
      query.error instanceof CatalogRequestError
        ? query.error
        : new CatalogRequestError(undefined, false);
    return <CatalogUnavailable error={error} retryHref={`/products/${id}`} />;
  }

  if (!query.data) {
    return (
      <StatusPanel
        kind="empty"
        headingLevel={1}
        title="Product not found"
        description="This product is not in the current demo catalog."
        homeLink
        className="my-12"
      />
    );
  }

  return <ProductDetail product={query.data} />;
}
