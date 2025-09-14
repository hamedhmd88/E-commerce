"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { ProductCard } from "@/components/product/product-card"
import { ProductFilters, type FilterState } from "@/components/product/product-filters"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

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

export function ProductsGrid({ initialProducts }: { initialProducts: Product[] }) {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialProducts)
  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage] = useState(12)
  const searchParams = useSearchParams()



  const applyFilters = (filters: FilterState) => {
    let filtered = [...initialProducts]

    // Search filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase()
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query),
      )
    }

    // Category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter((product) => filters.categories.includes(product.category))
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
    setCurrentPage(1)
  }

  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    window.scrollTo({ top: 0, behavior: "smooth" })
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
            Showing {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, filteredProducts.length)} of{" "}
            {filteredProducts.length} products
            {searchParams.get("q") && <span> for "{searchParams.get("q")}"</span>}
          </p>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No products found matching your criteria.</p>
            <p className="text-sm text-muted-foreground">Try adjusting your filters or search terms.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="animate-in fade-in-0 slide-in-from-bottom-4 duration-500"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2 mt-12">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="hover:scale-105 transition-transform"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>

                <div className="flex space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                    <Button
                      key={number}
                      variant={currentPage === number ? "default" : "outline"}
                      size="sm"
                      onClick={() => paginate(number)}
                      className="hover:scale-105 transition-transform"
                    >
                      {number}
                    </Button>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="hover:scale-105 transition-transform"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
