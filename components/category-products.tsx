"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { ProductCard } from "@/components/product-card"
import { ProductFilters, type FilterState } from "@/components/product-filters"

interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

interface CategoryProductsProps {
  category: string
}

export function CategoryProducts({ category }: CategoryProductsProps) {
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/category/${encodeURIComponent(category)}`)
        const data = await response.json()
        setAllProducts(data)
        setFilteredProducts(data)
      } catch (error) {
        console.error("Error fetching category products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategoryProducts()
  }, [category])

  const applyFilters = (filters: FilterState) => {
    let filtered = [...allProducts]

    // Search filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase()
      filtered = filtered.filter(
        (product) => product.title.toLowerCase().includes(query) || product.description.toLowerCase().includes(query),
      )
    }

    // Price range filter
    filtered = filtered.filter(
      (product) => product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1],
    )

    // Rating filter
    if (filters.minRating > 0) {
      filtered = filtered.filter((product) => product.rating.rate >= filters.minRating)
    }

    // Sort
    switch (filters.sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating.rate - a.rating.rate)
        break
      case "name":
        filtered.sort((a, b) => a.title.localeCompare(b.title))
        break
      default:
        break
    }

    setFilteredProducts(filtered)
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-muted rounded-lg h-32 animate-pulse"></div>
          ))}
        </div>
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-muted rounded-lg h-64 mb-4"></div>
                <div className="bg-muted rounded h-4 mb-2"></div>
                <div className="bg-muted rounded h-4 w-2/3 mb-2"></div>
                <div className="bg-muted rounded h-6 w-1/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (allProducts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No products found in this category.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Filters Sidebar */}
      <div className="lg:col-span-1">
        <ProductFilters onFiltersChange={applyFilters} />
      </div>

      {/* Products Grid */}
      <div className="lg:col-span-3">
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredProducts.length} of {allProducts.length} products in {category}
            {searchParams.get("q") && <span> for "{searchParams.get("q")}"</span>}
          </p>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No products found matching your criteria.</p>
            <p className="text-sm text-muted-foreground">Try adjusting your filters or search terms.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
