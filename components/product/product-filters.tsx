"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Filter, Plus, Minus } from "lucide-react";
import { CustomSlider } from "../ui/custom-slider";

interface ProductFiltersProps {
  onFiltersChange: (filters: FilterState) => void;
}

export interface FilterState {
  categories: string[];
  priceRange: [number, number];
  minRating: number;
  sortBy: string;
  searchQuery: string;
}

const categories = [
  { id: "electronics", label: "Electronics" },
  { id: "jewelery", label: "Jewelry" },
  { id: "men's clothing", label: "Men's Clothing" },
  { id: "women's clothing", label: "Women's Clothing" },
];

const sortOptions = [
  { value: "default", label: "Default" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "name", label: "Name: A to Z" },
];

export function ProductFilters({ onFiltersChange }: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: [0, 1000],
    minRating: 0,
    sortBy: "default",
    searchQuery: "",
  });

  const [tempPriceRange, setTempPriceRange] = useState(filters.priceRange);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const isUpdating = useRef(false);

  // استفاده از useCallback برای onFiltersChange
  const memoizedOnFiltersChange = useCallback(onFiltersChange, [onFiltersChange]);

  // اصلاح useEffect برای جلوگیری از infinite loop
  useEffect(() => {
    memoizedOnFiltersChange(filters);
  }, [filters, memoizedOnFiltersChange]);

  // تابع برای تغییرات موقت (با debounce)
  const handleTempChange = useCallback((value: number[]) => {
    setTempPriceRange(value as [number, number]);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      handleFilterChange("priceRange", value as [number, number]);
    }, 300);
  }, []);

  // تابع adjustPrice
  const adjustPrice = useCallback((index: 0 | 1, delta: number) => {
    setTempPriceRange((prev) => {
      const newRange = [...prev];
      newRange[index] = Math.max(0, Math.min(1000, newRange[index] + delta));
      if (index === 0 && newRange[0] > newRange[1]) newRange[0] = newRange[1];
      if (index === 1 && newRange[1] < newRange[0]) newRange[1] = newRange[0];
      return newRange as [number, number];
    });
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setFilters(prev => ({ ...prev, priceRange: tempPriceRange }));
    }, 300);
  }, [tempPriceRange]);

  // Initialization from URL (با ref برای جلوگیری از لوپ)
  useEffect(() => {
    if (isUpdating.current) return;

    const urlCategories = searchParams.get("categories")?.split(",").filter(Boolean) || [];
    const urlMinPrice = Number(searchParams.get("minPrice")) || 0;
    const urlMaxPrice = Number(searchParams.get("maxPrice")) || 1000;
    const urlMinRating = Number(searchParams.get("minRating")) || 0;
    const urlSortBy = searchParams.get("sortBy") || "default";
    const urlSearchQuery = searchParams.get("q") || "";

    const initialFilters = {
      categories: urlCategories,
      priceRange: [urlMinPrice, urlMaxPrice] as [number, number],
      minRating: urlMinRating,
      sortBy: urlSortBy,
      searchQuery: urlSearchQuery,
    };

    const isDifferent = JSON.stringify(filters) !== JSON.stringify(initialFilters);
    if (isDifferent) {
      isUpdating.current = true;
      setFilters(initialFilters);
      setTempPriceRange(initialFilters.priceRange);
      setTimeout(() => {
        isUpdating.current = false;
      }, 0);
    }
  }, [searchParams]);

  // updateURL با چک برای جلوگیری از push غیرضروری
  const updateURL = useCallback((newFilters: FilterState) => {
    const params = new URLSearchParams();
    if (newFilters.searchQuery) params.set("q", newFilters.searchQuery);
    if (newFilters.categories.length > 0) params.set("categories", newFilters.categories.join(","));
    if (newFilters.priceRange[0] > 0) params.set("minPrice", newFilters.priceRange[0].toString());
    if (newFilters.priceRange[1] < 1000) params.set("maxPrice", newFilters.priceRange[1].toString());
    if (newFilters.minRating > 0) params.set("minRating", newFilters.minRating.toString());
    if (newFilters.sortBy !== "default") params.set("sortBy", newFilters.sortBy);

    const newUrl = params.toString() ? `/products?${params.toString()}` : "/products";
    
    if (window.location.pathname + window.location.search !== newUrl) {
      isUpdating.current = true;
      router.push(newUrl, { scroll: false });
      setTimeout(() => {
        isUpdating.current = false;
      }, 0);
    }
  }, [router]);

  // handleFilterChange با چک اضافی
  const handleFilterChange = useCallback((key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value };
    if (JSON.stringify(newFilters) !== JSON.stringify(filters)) {
      setFilters(newFilters);
      updateURL(newFilters);
    }
  }, [filters, updateURL]);

  const handleCategoryChange = useCallback((categoryId: string, checked: boolean) => {
    const newCategories = checked
      ? [...filters.categories, categoryId]
      : filters.categories.filter((c) => c !== categoryId);
    handleFilterChange("categories", newCategories);
  }, [filters.categories, handleFilterChange]);

  const clearFilters = useCallback(() => {
    const clearedFilters = {
      categories: [],
      priceRange: [0, 1000] as [number, number],
      minRating: 0,
      sortBy: "default",
      searchQuery: filters.searchQuery,
    };
    setFilters(clearedFilters);
    setTempPriceRange(clearedFilters.priceRange);
    updateURL(clearedFilters);
  }, [filters.searchQuery, updateURL]);

  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 1000 ||
    filters.minRating > 0 ||
    filters.sortBy !== "default";

  return (
    <div className="space-y-6">
      {/* Sort and Clear */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base flex items-center">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </CardTitle>
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear All
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-sm font-medium">Sort By</Label>
            <Select
              value={filters.sortBy}
              onValueChange={(value) => handleFilterChange("sortBy", value)}
            >
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Active Filters */}
      {hasActiveFilters && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-2">
              {filters.categories.map((category) => (
                <Badge
                  key={category}
                  variant="secondary"
                  className="flex items-center gap-1 cursor-pointer hover:bg-secondary/80 transition-colors"
                  onClick={() => handleCategoryChange(category, false)}
                >
                  {categories.find((c) => c.id === category)?.label}
                  <X className="h-4 w-4 ml-1 text-muted-foreground hover:text-destructive transition-colors" />
                </Badge>
              ))}
              {(filters.priceRange[0] > 0 || filters.priceRange[1] < 1000) && (
                <Badge
                  variant="secondary"
                  className="flex items-center gap-1 cursor-pointer hover:bg-secondary/80 transition-colors"
                  onClick={() => handleFilterChange("priceRange", [0, 1000])}
                >
                  ${filters.priceRange[0]} - ${filters.priceRange[1]}
                  <X className="h-4 w-4 ml-1 text-muted-foreground hover:text-destructive transition-colors" />
                </Badge>
              )}
              {filters.minRating > 0 && (
                <Badge
                  variant="secondary"
                  className="flex items-center gap-1 cursor-pointer hover:bg-secondary/80 transition-colors"
                  onClick={() => handleFilterChange("minRating", 0)}
                >
                  {filters.minRating}+ Stars
                  <X className="h-4 w-4 ml-1 text-muted-foreground hover:text-destructive transition-colors" />
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <Checkbox
                id={category.id}
                checked={filters.categories.includes(category.id)}
                onCheckedChange={(checked) =>
                  handleCategoryChange(category.id, checked as boolean)
                }
              />
              <Label htmlFor={category.id} className="text-sm font-normal">
                {category.label}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Price Range */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Price Range</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <CustomSlider
            value={tempPriceRange}
            onValueChange={handleTempChange}
            max={1000}
            min={0}
            step={10}
            className="w-full"
          />
          <div className="flex items-start justify-between text-sm text-muted-foreground">
            <div className="flex flex-col items-center">
              <span>${tempPriceRange[0]}</span>
              <div className="flex space-x-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => adjustPrice(0, -10)}
                  disabled={tempPriceRange[0] <= 0}
                  className="h-6 w-6 p-0"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => adjustPrice(0, 10)}
                  disabled={tempPriceRange[0] >= tempPriceRange[1]}
                  className="h-6 w-6 p-0"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <span>${tempPriceRange[1]}</span>
              <div className="flex space-x-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => adjustPrice(1, -10)}
                  disabled={tempPriceRange[1] <= tempPriceRange[0]}
                  className="h-6 w-6 p-0"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => adjustPrice(1, 10)}
                  disabled={tempPriceRange[1] >= 1000}
                  className="h-6 w-6 p-0"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rating */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Minimum Rating</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox
                id={`rating-${rating}`}
                checked={filters.minRating === rating}
                onCheckedChange={(checked) =>
                  handleFilterChange("minRating", checked ? rating : 0)
                }
              />
              <Label
                htmlFor={`rating-${rating}`}
                className="text-sm font-normal cursor-pointer"
              >
                {rating}+ Stars
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
