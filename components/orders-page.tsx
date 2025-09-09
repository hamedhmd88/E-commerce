"use client"

import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { ShoppingBag, Package } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export function OrdersPage() {
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
        <h1 className="text-3xl font-bold text-balance mb-4">My Orders</h1>
        <p className="text-muted-foreground">Track and manage your order history</p>
      </div>

      <div className="text-center py-16 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
        <Package className="h-16 w-16 mx-auto mb-6 text-muted-foreground/50" />
        <h2 className="text-2xl font-semibold mb-4">No orders yet</h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          You haven't placed any orders yet. Start shopping to see your order history here.
        </p>
        <Link href="/products">
          <Button className="hover:scale-105 transition-transform">
            <ShoppingBag className="mr-2 h-4 w-4" />
            Start Shopping
          </Button>
        </Link>
      </div>
    </div>
  )
}
