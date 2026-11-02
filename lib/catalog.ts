import type { Product } from "./product-schema";

export interface CatalogFilters {
  categories: string[];
  priceRange: [number, number];
  minRating: number;
  sortBy: string;
  searchQuery: string;
}

export const catalogCategories = [
  "electronics",
  "jewelery",
  "men's clothing",
  "women's clothing",
] as const;
export const catalogSorts = [
  "default",
  "price-low",
  "price-high",
  "rating",
  "name",
] as const;

function numberInRange(
  value: string | null,
  fallback: number,
  maximum: number,
): number {
  const parsed = Number(value);
  return value !== null && Number.isFinite(parsed)
    ? Math.min(maximum, Math.max(0, parsed))
    : fallback;
}

export function readProductFilters(params: URLSearchParams): CatalogFilters {
  const minPrice = numberInRange(params.get("minPrice"), 0, 1000);
  const maxPrice = numberInRange(params.get("maxPrice"), 1000, 1000);
  const sort = params.get("sortBy") ?? "default";
  return {
    categories: [
      ...new Set(
        (params.get("categories") ?? "")
          .split(",")
          .filter((value) => catalogCategories.some((item) => item === value)),
      ),
    ],
    priceRange: [Math.min(minPrice, maxPrice), maxPrice],
    minRating: numberInRange(params.get("minRating"), 0, 5),
    sortBy: catalogSorts.some((item) => item === sort) ? sort : "default",
    searchQuery: (params.get("q") ?? "").slice(0, 100),
  };
}

export function filterProducts(
  products: Product[],
  filters: CatalogFilters,
): Product[] {
  const query = filters.searchQuery.trim().toLocaleLowerCase();
  const result = products.filter((product) => {
    const matchesSearch =
      !query ||
      `${product.title} ${product.description} ${product.category}`
        .toLocaleLowerCase()
        .includes(query);
    const matchesCategory =
      !filters.categories.length ||
      filters.categories.includes(product.category);
    return (
      matchesSearch &&
      matchesCategory &&
      product.price >= filters.priceRange[0] &&
      product.price <= filters.priceRange[1] &&
      product.rating.rate >= filters.minRating
    );
  });
  switch (filters.sortBy) {
    case "price-low":
      return result.sort((a, b) => a.price - b.price);
    case "price-high":
      return result.sort((a, b) => b.price - a.price);
    case "rating":
      return result.sort((a, b) => b.rating.rate - a.rating.rate);
    case "name":
      return result.sort((a, b) => a.title.localeCompare(b.title));
    default:
      return result;
  }
}

export function paginateProducts<T>(
  items: T[],
  page: number,
  pageSize: number,
): T[] {
  return items.slice((page - 1) * pageSize, page * pageSize);
}
