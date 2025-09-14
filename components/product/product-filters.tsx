"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Filter } from "lucide-react";

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

  // Initialize filters from URL params
  useEffect(() => {
    const urlCategories =
      searchParams.get("categories")?.split(",").filter(Boolean) || [];
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

    if (JSON.stringify(filters) !== JSON.stringify(initialFilters)) {
      setFilters(initialFilters);
      onFiltersChange(initialFilters);
    }
  }, [searchParams, onFiltersChange]);

  const updateURL = (newFilters: FilterState) => {
    const params = new URLSearchParams();

    if (newFilters.searchQuery) params.set("q", newFilters.searchQuery);
    if (newFilters.categories.length > 0)
      params.set("categories", newFilters.categories.join(","));
    if (newFilters.priceRange[0] > 0)
      params.set("minPrice", newFilters.priceRange[0].toString());
    if (newFilters.priceRange[1] < 1000)
      params.set("maxPrice", newFilters.priceRange[1].toString());
    if (newFilters.minRating > 0)
      params.set("minRating", newFilters.minRating.toString());
    if (newFilters.sortBy !== "default")
      params.set("sortBy", newFilters.sortBy);

    const url = params.toString()
      ? `/products?${params.toString()}`
      : "/products";
    router.push(url, { scroll: false });
  };

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
    updateURL(newFilters);
  };

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    const newCategories = checked
      ? [...filters.categories, categoryId]
      : filters.categories.filter((c) => c !== categoryId);
    handleFilterChange("categories", newCategories);
  };

  const clearFilters = () => {
    const clearedFilters = {
      categories: [],
      priceRange: [0, 1000] as [number, number],
      minRating: 0,
      sortBy: "default",
      searchQuery: filters.searchQuery, // Keep search query
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
    updateURL(clearedFilters);
  };

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
            onClick={() => {
              console.log('Removing category:', category); // Debug log (می‌تونی بعد از تست حذف کنی)
              handleCategoryChange(category, false);
            }}
          >
            {categories.find((c) => c.id === category)?.label}
            <X className="h-4 w-4 ml-1 text-muted-foreground hover:text-destructive transition-colors" />
          </Badge>
        ))}
        {(filters.priceRange[0] > 0 || filters.priceRange[1] < 1000) && (
          <Badge 
            variant="secondary" 
            className="flex items-center gap-1 cursor-pointer hover:bg-secondary/80 transition-colors"
            onClick={() => {
              console.log('Removing price range'); // Debug log
              handleFilterChange("priceRange", [0, 1000]);
            }}
          >
            ${filters.priceRange[0]} - ${filters.priceRange[1]}
            <X className="h-4 w-4 ml-1 text-muted-foreground hover:text-destructive transition-colors" />
          </Badge>
        )}
        {filters.minRating > 0 && (
          <Badge 
            variant="secondary" 
            className="flex items-center gap-1 cursor-pointer hover:bg-secondary/80 transition-colors"
            onClick={() => {
              console.log('Removing min rating:', filters.minRating); // Debug log
              handleFilterChange("minRating", 0);
            }}
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
            <div key={category.id} className="flex items-center space-x-2 cursor-pointer">
              <Checkbox
                id={category.id}
                checked={filters.categories.includes(category.id)}
                onCheckedChange={(checked) =>
                  handleCategoryChange(category.id, checked as boolean)
                }
              />
              <Label
                htmlFor={category.id}
                className="text-sm font-normal "
              >
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
        <CardContent className="space-y-4 cursor-pointer">
          <Slider
            value={filters.priceRange}
            onValueChange={(value) =>
              handleFilterChange("priceRange", value as [number, number])
            }
            max={1000}
            min={0}
            step={10}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>${filters.priceRange[0]}</span>
            <span>${filters.priceRange[1]}</span>
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
