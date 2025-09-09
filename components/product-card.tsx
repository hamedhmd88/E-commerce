"use client"

import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, Heart } from "lucide-react"
import { useCart } from "@/components/cart-provider"
import { useWishlist } from "@/components/wishlist-provider"
import { useAuth } from "@/components/auth-provider"
import { useState } from "react"
import { toast } from "sonner"

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

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const { user } = useAuth()
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsAddingToCart(true)

    // Add a small delay for animation effect
    await new Promise((resolve) => setTimeout(resolve, 300))

    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
    })

    setIsAddingToCart(false)
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!user) {
      toast.error("Please log in to add items to your wishlist")
      return
    }

    const isCurrentlyWishlisted = isInWishlist(product.id)

    if (isCurrentlyWishlisted) {
      removeFromWishlist(product.id)
      toast.success("Removed from wishlist")
    } else {
      addToWishlist(product)
      toast.success("Added to wishlist")
    }
  }

  return (
    <Link href={`/products/${product.id}`}>
      <Card className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] h-full relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <CardContent className="p-4 relative z-10">
          <div className="relative aspect-square mb-4 overflow-hidden rounded-lg bg-transparent">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.title}
              fill
              className="object-contain group-hover:scale-110 transition-transform duration-500"
            />
            <Badge className="absolute top-0 right-2 capitalize animate-in fade-in-0 slide-in-from-top-2 duration-300 delay-200">
              {product.category}
            </Badge>

            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 left-2 bg-white/80 hover:bg-white hover:scale-110 transition-all duration-200 opacity-0 group-hover:opacity-100"
              onClick={handleWishlist}
            >
              <Heart
                className={`h-4 w-4 transition-all duration-200 ${
                  isInWishlist(product.id)
                    ? "fill-red-500 text-red-500 scale-110"
                    : "text-muted-foreground hover:text-red-400"
                }`}
              />
            </Button>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors duration-300">
              {product.title}
            </h3>

            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 group-hover:scale-110 transition-transform duration-200" />
              <span className="text-sm text-muted-foreground">
                {product.rating.rate} ({product.rating.count})
              </span>
            </div>

            <p className="text-lg font-bold text-primary group-hover:scale-105 transition-transform duration-200 origin-left">
              ${product.price.toFixed(2)}
            </p>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0 relative z-10">
          <Button
            onClick={handleAddToCart}
            className="w-full hover:scale-105 transition-all duration-200 relative overflow-hidden"
            size="sm"
            disabled={isAddingToCart}
          >
            <div
              className={`absolute inset-0 bg-white/20 transform transition-transform duration-300 ${isAddingToCart ? "translate-x-0" : "-translate-x-full"}`}
            />
            <ShoppingCart
              className={`mr-2 h-4 w-4 transition-transform duration-200 ${isAddingToCart ? "animate-bounce" : ""}`}
            />
            {isAddingToCart ? "Adding..." : "Add to Cart"}
          </Button>
        </CardFooter>
      </Card>
    </Link>
  )
}
