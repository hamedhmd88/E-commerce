"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Star, ShoppingCart, Heart, ArrowLeft, Trash } from "lucide-react"  // اضافه کردن Trash برای delete
import { useCart } from "@/components/cart/cart-provider"
import Link from "next/link"
import { useAuth } from "@/components/auth/auth-provider"  // import برای useAuth
import { useToast } from "@/hooks/use-toast"  // import برای useToast
import { useWishlist } from "@/components/account/wishlist-provider"  // import برای useWishlist

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

interface ProductDetailProps {
  productId: string
}

export function ProductDetail({ productId }: ProductDetailProps) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const { items, addItem, updateQuantity, removeItem } = useCart()  // گرفتن متدهای لازم از useCart
  const { user } = useAuth()  // گرفتن وضعیت کاربر از useAuth
  const { toast } = useToast()  // برای نمایش toast
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()  // گرفتن متدهای wishlist

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${productId}`)
        const data = await response.json()
        setProduct(data)
      } catch (error) {
        console.error("Error fetching product:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [productId])

  // محاسبه quantity فعلی محصول در کارت
  const currentQuantity = product ? (items.find((item) => item.id === product.id)?.quantity || 0) : 0

  const handleAddToCart = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in first to add items to your cart.",
        variant: "destructive",
      })
      return
    }
    if (product) {
      addItem({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
      })
    }
  }

  const handleUpdateQuantity = (delta: number) => {
    if (product) {
      updateQuantity(product.id, currentQuantity + delta)
    }
  }

  const handleRemoveFromCart = () => {
    if (product) {
      removeItem(product.id)
    }
  }

  const handleToggleWishlist = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in first to manage your wishlist.",
        variant: "destructive",
      })
      return
    }
    if (product) {
      if (isInWishlist(product.id)) {
        removeFromWishlist(product.id)
      } else {
        addToWishlist(product)
      }
    }
  }

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-muted rounded-lg h-96"></div>
          <div className="space-y-4">
            <div className="bg-muted rounded h-8 w-3/4"></div>
            <div className="bg-muted rounded h-4 w-1/2"></div>
            <div className="bg-muted rounded h-6 w-1/4"></div>
            <div className="bg-muted rounded h-20"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Product not found.</p>
        <Link href="/products">
          <Button className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <Link href="/products">
        <Button variant="ghost" className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Button>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="space-y-4">
          <Card>
            <CardContent className="p-8">
              <div className="relative aspect-square">
                <Image src={product.image || "/placeholder.svg"} alt={product.title} fill className="object-contain" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <Badge className="mb-2 capitalize">{product.category}</Badge>
            <h1 className="text-3xl font-bold text-balance mb-4">{product.title}</h1>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{product.rating.rate}</span>
                <span className="text-muted-foreground">({product.rating.count} reviews)</span>
              </div>
            </div>

            <p className="text-3xl font-bold text-primary mb-6">${product.price.toFixed(2)}</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>
          </div>

          <div className="space-y-4 w-full">
            {/* <div className="flex items-center gap-4">
              <label htmlFor="quantity" className="font-medium">
                Quantity:
              </label>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  -
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
                  +
                </Button>
              </div>
            </div> */}

            <div className="flex gap-4 items-center justify-center">
              {currentQuantity > 0 ? (
                <div className="flex items-center gap-2">
                  {currentQuantity === 1 ? (
                    <Button variant="outline" size="icon" onClick={handleRemoveFromCart}>
                      <Trash className="h-5 w-5" />
                    </Button>
                  ) : (
                    <Button variant="outline" size="icon" onClick={() => handleUpdateQuantity(-1)}>
                      -
                    </Button>
                  )}
                  <span className="w-12 text-center">{currentQuantity}</span>
                  <Button variant="outline" size="icon" onClick={() => handleUpdateQuantity(1)}>
                    +
                  </Button>
                  {currentQuantity > 1 && (
                    <Button variant="outline" size="icon" onClick={handleRemoveFromCart}>
                      <Trash className="h-5 w-5" />
                    </Button>
                  )}
                </div>
              ) : (
                <Button onClick={handleAddToCart} className="flex-1" size="lg">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
              )}
              <Button variant="outline" size="lg" onClick={handleToggleWishlist}>
                <Heart className={`h-5 w-5 ${isInWishlist(product?.id ?? 0) ? "fill-red-500 text-red-500" : ""}`} />
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Free shipping</span>
                  <span>On orders over $50</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Returns</span>
                  <span>30-day return policy</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Warranty</span>
                  <span>1-year manufacturer warranty</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
