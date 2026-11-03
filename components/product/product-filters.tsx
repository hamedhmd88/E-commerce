"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Filter, Search, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { readProductFilters } from "@/lib/catalog";

const categories = [
  { id: "electronics", label: "Electronics" },
  { id: "jewelery", label: "Jewelry" },
  { id: "men's clothing", label: "Men's clothing" },
  { id: "women's clothing", label: "Women's clothing" },
];
const sorts = [
  { id: "default", label: "Featured" },
  { id: "price-low", label: "Price: low to high" },
  { id: "price-high", label: "Price: high to low" },
  { id: "rating", label: "Highest rated" },
  { id: "name", label: "Name: A to Z" },
];
const dropdownClass =
  "rounded-2xl border-border bg-card/95 p-1 shadow-2xl backdrop-blur-2xl";
const itemClass = "rounded-xl py-2.5 focus:bg-primary/10 focus:text-foreground";

export function ProductFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.toString();
  const filters = useMemo(
    () => readProductFilters(new URLSearchParams(query)),
    [query],
  );
  const [priceMin, priceMax] = filters.priceRange;
  const [search, setSearch] = useState(filters.searchQuery);
  const [range, setRange] = useState<number[]>(filters.priceRange);
  useEffect(() => setSearch(filters.searchQuery), [filters.searchQuery]);
  useEffect(() => setRange([priceMin, priceMax]), [priceMin, priceMax]);

  const update = (values: Record<string, string | null>) => {
    const params = new URLSearchParams(query);
    for (const [key, value] of Object.entries(values)) {
      if (value === null || value === "") params.delete(key);
      else params.set(key, value);
    }
    params.delete("page");
    router.replace(`${pathname}${params.size ? `?${params}` : ""}`, {
      scroll: false,
    });
  };
  const toggleCategory = (category: string) => {
    const selected = filters.categories.includes(category);
    update({
      categories: (selected
        ? filters.categories.filter((item) => item !== category)
        : [...filters.categories, category]
      ).join(","),
    });
  };
  const activeCount =
    filters.categories.length +
    Number(filters.priceRange[0] > 0 || filters.priceRange[1] < 1000) +
    Number(filters.minRating > 0) +
    Number(filters.sortBy !== "default") +
    Number(Boolean(filters.searchQuery));
  const clear = () =>
    update({
      q: null,
      categories: null,
      minPrice: null,
      maxPrice: null,
      minRating: null,
      sortBy: null,
    });

  return (
    <aside
      className="glass-panel catalog-filter-panel h-fit self-start rounded-[1.75rem] p-5 sm:p-6 lg:sticky lg:top-24"
      aria-label="Product filters"
    >
      <div className="mb-6 flex items-start justify-between gap-3">
        <div>
          <p className="flex items-center gap-2 text-lg font-semibold">
            <SlidersHorizontal className="size-5 text-primary" /> Refine your
            view
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Find what feels right.
          </p>
        </div>
        {activeCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clear}
            className="rounded-full text-primary"
          >
            <X className="size-3.5" />
            Clear
          </Button>
        )}
      </div>
      <div className="space-y-6">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            update({ q: search.trim() });
          }}
        >
          <label
            htmlFor="product-search"
            className="mb-2 block text-sm font-medium"
          >
            Search the collection
          </label>
          <div className="relative">
            <Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="product-search"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Name or description"
              className="h-11 rounded-xl border-border/70 bg-background/60 ps-10 pe-16"
            />
            <button
              type="submit"
              className="absolute end-1 top-1/2 -translate-y-1/2 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary-dark"
            >
              Find
            </button>
          </div>
        </form>
        <div className="border-t border-border/60 pt-5">
          <label
            htmlFor="product-sort"
            className="mb-2 block text-sm font-medium"
          >
            Sort by
          </label>
          <Select
            value={filters.sortBy}
            onValueChange={(value) =>
              update({ sortBy: value === "default" ? null : value })
            }
          >
            <SelectTrigger
              id="product-sort"
              className="h-11 w-full rounded-xl border-border/70 bg-background/60"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent className={dropdownClass}>
              {sorts.map((sort) => (
                <SelectItem value={sort.id} key={sort.id} className={itemClass}>
                  {sort.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="border-t border-border/60 pt-5">
          <p className="mb-3 text-sm font-medium">Categories</p>
          <div className="grid grid-cols-2 gap-2">
            {categories.map((category) => {
              const selected = filters.categories.includes(category.id);
              return (
                <button
                  type="button"
                  key={category.id}
                  onClick={() => toggleCategory(category.id)}
                  aria-pressed={selected}
                  className={`min-h-11 rounded-xl border px-2 py-2 text-center text-xs font-medium transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-ring sm:text-sm ${selected ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/20" : "border-border/70 bg-background/50 text-foreground hover:border-primary/50 hover:bg-primary/10"}`}
                >
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>
        <div className="border-t border-border/60 pt-5">
          <div className="mb-4 flex items-center justify-between gap-2">
            <p className="text-sm font-medium">Price range</p>
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium tabular-nums text-primary">
              ${range[0]} – ${range[1]}
            </span>
          </div>
          <Slider
            min={0}
            max={1000}
            step={10}
            thumbLabels={["Minimum price", "Maximum price"]}
            value={range}
            onValueChange={setRange}
            onValueCommit={(values) =>
              update({
                minPrice: values[0] === 0 ? null : String(values[0]),
                maxPrice: values[1] === 1000 ? null : String(values[1]),
              })
            }
            aria-label="Price range"
            className="py-3"
          />
          <div className="mt-1 flex justify-between text-xs text-muted-foreground">
            <span>$0</span>
            <span>$1000</span>
          </div>
        </div>
        <div className="border-t border-border/60 pt-5">
          <label
            htmlFor="product-rating"
            className="mb-2 block text-sm font-medium"
          >
            Minimum rating
          </label>
          <Select
            value={String(filters.minRating)}
            onValueChange={(value) =>
              update({ minRating: value === "0" ? null : value })
            }
          >
            <SelectTrigger
              id="product-rating"
              className="h-11 w-full rounded-xl border-border/70 bg-background/60"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent className={dropdownClass}>
              {[0, 4, 3, 2, 1].map((rating) => (
                <SelectItem
                  key={rating}
                  value={String(rating)}
                  className={itemClass}
                >
                  {rating === 0 ? "Any rating" : `${rating}+ stars`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <p className="mt-6 flex items-center gap-2 border-t border-border/60 pt-4 text-xs text-muted-foreground">
        <Filter className="size-3.5" /> Filters update the live catalog.
      </p>
    </aside>
  );
}
