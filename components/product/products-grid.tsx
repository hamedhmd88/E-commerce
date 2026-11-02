"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/product/product-card";
import { ProductFilters } from "@/components/product/product-filters";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "@/services/productService";
import {
  filterProducts,
  paginateProducts,
  readProductFilters,
} from "@/lib/catalog";

const pageSizes = [6, 9, 12] as const;

export function ProductsGrid({
  initialProducts,
}: {
  initialProducts: Product[];
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const query = searchParams.toString();
  const filters = useMemo(
    () => readProductFilters(new URLSearchParams(query)),
    [query],
  );
  const filteredProducts = useMemo(
    () => filterProducts(initialProducts, filters),
    [initialProducts, filters],
  );
  const sizeParam = Number(searchParams.get("size"));
  const pageSize = pageSizes.find((size) => size === sizeParam) ?? 9;
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  const pageParam = Number(searchParams.get("page"));
  const currentPage =
    Number.isInteger(pageParam) && pageParam > 0
      ? Math.min(pageParam, totalPages)
      : 1;
  const currentProducts = paginateProducts(
    filteredProducts,
    currentPage,
    pageSize,
  );
  const first = filteredProducts.length ? (currentPage - 1) * pageSize + 1 : 0;
  const last = Math.min(currentPage * pageSize, filteredProducts.length);

  const updatePage = (page: number) => {
    const params = new URLSearchParams(query);
    if (page <= 1) params.delete("page");
    else params.set("page", String(page));
    router.push(`${pathname}${params.size ? `?${params}` : ""}`, {
      scroll: false,
    });
    document.getElementById("catalog-results")?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
      block: "start",
    });
  };
  const updatePageSize = (size: string) => {
    const params = new URLSearchParams(query);
    params.delete("page");
    if (size === "9") params.delete("size");
    else params.set("size", size);
    router.replace(`${pathname}${params.size ? `?${params}` : ""}`, {
      scroll: false,
    });
  };

  return (
    <div className="grid items-start gap-7 pb-20 lg:grid-cols-[minmax(245px,290px)_minmax(0,1fr)] lg:gap-8">
      <ProductFilters />
      <section
        id="catalog-results"
        className="min-w-0 scroll-mt-28"
        aria-label="Products"
      >
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground" aria-live="polite">
            Showing{" "}
            <span className="font-semibold tabular-nums text-foreground">
              {first}–{last}
            </span>{" "}
            of{" "}
            <span className="font-semibold tabular-nums text-foreground">
              {filteredProducts.length}
            </span>{" "}
            products
          </p>
          <div className="flex items-center gap-3">
            <label
              htmlFor="catalog-page-size"
              className="text-sm text-muted-foreground"
            >
              Per page
            </label>
            <Select value={String(pageSize)} onValueChange={updatePageSize}>
              <SelectTrigger
                id="catalog-page-size"
                className="h-10 w-20 rounded-xl border-border bg-card/70"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-border bg-card/95 shadow-xl backdrop-blur-xl">
                {pageSizes.map((size) => (
                  <SelectItem
                    key={size}
                    value={String(size)}
                    className="rounded-lg focus:bg-primary/10 focus:text-foreground"
                  >
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        {filteredProducts.length === 0 ? (
          <div className="glass-panel rounded-[1.75rem] px-6 py-20 text-center">
            <h2 className="text-2xl font-medium">No matching products</h2>
            <p className="mt-3 text-muted-foreground">
              Try a different category, rating, or price range.
            </p>
          </div>
        ) : (
          <>
            <div className="grid auto-rows-fr gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {currentProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            {totalPages > 1 && (
              <nav
                aria-label="Product pages"
                className="mt-12 flex flex-wrap items-center justify-center gap-2"
              >
                <Button
                  variant="outline"
                  onClick={() => updatePage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="rounded-xl"
                >
                  <ChevronLeft className="size-4" /> Previous
                </Button>
                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1,
                ).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    onClick={() => updatePage(page)}
                    aria-current={currentPage === page ? "page" : undefined}
                    aria-label={`Page ${page}`}
                    className="size-10 rounded-xl px-0 tabular-nums"
                  >
                    {page}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  onClick={() => updatePage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="rounded-xl"
                >
                  Next <ChevronRight className="size-4" />
                </Button>
              </nav>
            )}
          </>
        )}
      </section>
    </div>
  );
}
