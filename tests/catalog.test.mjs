import test from "node:test";
import assert from "node:assert/strict";
import {
  filterProducts,
  paginateProducts,
  readProductFilters,
} from "../lib/catalog.ts";
import { productSchema } from "../lib/product-schema.ts";
import {
  CatalogRequestError,
  normalizeCatalogError,
} from "../services/catalog-error.ts";

const products = [
  {
    id: 1,
    title: "Silver Ring",
    description: "Everyday jewelry",
    category: "jewelery",
    price: 25,
    rating: { rate: 4.2, count: 10 },
  },
  {
    id: 2,
    title: "Desk Lamp",
    description: "Office lighting",
    category: "electronics",
    price: 50,
    rating: { rate: 3.5, count: 5 },
  },
  {
    id: 3,
    title: "Gold Ring",
    description: "Statement jewelry",
    category: "jewelery",
    price: 100,
    rating: { rate: 4.8, count: 8 },
  },
];
const defaults = {
  categories: [],
  priceRange: [0, 1000],
  minRating: 0,
  sortBy: "default",
  searchQuery: "",
};

test("search matches title, description and category without case sensitivity", () => {
  assert.deepEqual(
    filterProducts(products, { ...defaults, searchQuery: "RING" }).map(
      (p) => p.id,
    ),
    [1, 3],
  );
  assert.deepEqual(
    filterProducts(products, { ...defaults, searchQuery: "lighting" }).map(
      (p) => p.id,
    ),
    [2],
  );
});
test("category, price and rating filters compose", () => {
  const filtered = filterProducts(products, {
    ...defaults,
    categories: ["jewelery"],
    priceRange: [0, 50],
    minRating: 4,
  });
  assert.deepEqual(
    filtered.map((p) => p.id),
    [1],
  );
});
test("sort is deterministic and does not mutate source order", () => {
  assert.deepEqual(
    filterProducts(products, { ...defaults, sortBy: "price-high" }).map(
      (p) => p.id,
    ),
    [3, 2, 1],
  );
  assert.deepEqual(
    products.map((p) => p.id),
    [1, 2, 3],
  );
});
test("pagination returns requested slice and empty out of range", () => {
  assert.deepEqual(
    paginateProducts(products, 2, 2).map((p) => p.id),
    [3],
  );
  assert.deepEqual(paginateProducts(products, 3, 2), []);
});
test("invalid URL filters are clamped and unsupported categories ignored", () => {
  const filters = readProductFilters(
    new URLSearchParams(
      "minPrice=-5&maxPrice=2000&minRating=99&sortBy=unknown&categories=electronics,invalid,electronics",
    ),
  );
  assert.deepEqual(filters.priceRange, [0, 1000]);
  assert.equal(filters.minRating, 5);
  assert.equal(filters.sortBy, "default");
  assert.deepEqual(filters.categories, ["electronics"]);
});
test("API product schema accepts valid records and rejects malformed prices and ratings", () => {
  const product = {
    ...products[0],
    image: "https://fakestoreapi.com/img/ring.jpg",
  };
  assert.equal(productSchema.parse(product).id, 1);
  assert.equal(
    productSchema.safeParse({ ...product, price: -1 }).success,
    false,
  );
  assert.equal(
    productSchema.safeParse({ ...product, rating: { rate: 6, count: 1 } })
      .success,
    false,
  );
});

test("Cloudflare challenge is identified without treating it as product data", () => {
  assert.throws(
    () =>
      normalizeCatalogError({
        isAxiosError: true,
        response: { status: 403, headers: { "cf-mitigated": "challenge" } },
      }),
    (error) =>
      error instanceof CatalogRequestError &&
      error.status === 403 &&
      error.challenged,
  );
});
