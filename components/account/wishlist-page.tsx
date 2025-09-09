"use client"

import { useWishlist } from "@/components/account/wishlist-provider"
import { useAuth } from "@/components/auth/auth-provider"
import { ProductCard } from "@/components/product/product-card"
import { Button } from "@/components/ui/button"
import { Heart, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export function WishlistPage() {
  const { wishlistItems, wishlistCount } = useWishlist()
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="space-y-8">
      <div className="animate-in fade-in-0 slide-in-from-top-4 duration-700">
        <h1 className="text-3xl font-bold text-balance mb-4">My Wishlist</h1>
        <p className="text-muted-foreground">
          {wishlistCount > 0
            ? `You have ${wishlistCount} item${wishlistCount === 1 ? "" : "s"} in your wishlist`
            : "Your wishlist is empty"}
        </p>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="text-center py-16 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
          <Heart className="h-16 w-16 mx-auto mb-6 text-muted-foreground/50" />
          <h2 className="text-2xl font-semibold mb-4">Your wishlist is empty</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Start adding products to your wishlist by clicking the heart icon on any product
          </p>
          <Link href="/products">
            <Button className="hover:scale-105 transition-transform">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Browse Products
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((product, index) => (
            <div
              key={product.id}
              className="animate-in fade-in-0 slide-in-from-bottom-4 duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
