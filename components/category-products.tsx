"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Heart } from "lucide-react"

interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  description: string
  category: string
  inStock: boolean
}

interface CategoryProductsProps {
  category: string
}

// Mock products data
const mockProducts: Product[] = [
  {
    id: 1,
    name: "Premium Headphones",
    price: 299,
    originalPrice: 399,
    image: "https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=premium%20wireless%20headphones%20product%20photography%20white%20background&image_size=square",
    description: "High-quality wireless headphones with noise cancellation",
    category: "electronics",
    inStock: true
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 199,
    image: "https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20smartwatch%20product%20photography%20white%20background&image_size=square",
    description: "Feature-rich smartwatch with health monitoring",
    category: "electronics",
    inStock: true
  },
  {
    id: 3,
    name: "Designer T-Shirt",
    price: 49,
    originalPrice: 69,
    image: "https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=stylish%20cotton%20t-shirt%20product%20photography%20white%20background&image_size=square",
    description: "Comfortable cotton t-shirt with modern design",
    category: "clothing",
    inStock: true
  }
]

export function CategoryProducts({ category }: CategoryProductsProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const fetchProducts = async () => {
      setLoading(true)
      // Filter products by category
      const filteredProducts = mockProducts.filter(
        product => product.category.toLowerCase() === category.toLowerCase()
      )
      
      // Simulate loading delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      setProducts(filteredProducts)
      setLoading(false)
    }

    fetchProducts()
  }, [category])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <div className="aspect-square bg-gray-200 rounded-t-lg"></div>
            <CardHeader>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-8 bg-gray-200 rounded w-full"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold mb-2">No products found</h3>
        <p className="text-muted-foreground">We couldn't find any products in the {category} category.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-300">
          <div className="relative aspect-square overflow-hidden rounded-t-lg">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {product.originalPrice && (
              <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                Sale
              </Badge>
            )}
            <Button
              size="icon"
              variant="ghost"
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/80 hover:bg-white"
            >
              <Heart className="h-4 w-4" />
            </Button>
          </div>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg line-clamp-1">{product.name}</CardTitle>
            <CardDescription className="line-clamp-2">{product.description}</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
              <Badge variant={product.inStock ? "default" : "secondary"}>
                {product.inStock ? "In Stock" : "Out of Stock"}
              </Badge>
            </div>
            <Button 
              className="w-full" 
              disabled={!product.inStock}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}