"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useAuth } from "@/components/auth/auth-provider"
import { useWishlist } from "@/components/account/wishlist-provider"
import { User, ShoppingBag, Heart, Settings, LogOut } from "lucide-react"
import { EditProfileModal } from "@/components/account/edit-profile-modal"

export function AccountDashboard() {
  const { user, logout, isLoading } = useAuth()
  const { wishlistCount } = useWishlist()
  const router = useRouter()
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  console.log('AccountDashboard render:', { user: !!user, isLoading })

  useEffect(() => {
    console.log('AccountDashboard useEffect:', { user: !!user, isLoading })
    if (!isLoading && !user) {
      console.log('Redirecting to login')
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

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between animate-in fade-in-0 slide-in-from-top-4 duration-700">
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16 hover:scale-110 transition-transform duration-200">
            <AvatarFallback className="text-lg">
              {user.name.firstname[0]}
              {user.name.lastname[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">
              {user.name.firstname} {user.name.lastname}
            </h1>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
        </div>
        <Button
          variant="outline"
          onClick={handleLogout}
          className="hover:scale-105 transition-transform bg-transparent"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/account/orders">
          <Card className="cursor-pointer hover:shadow-md hover:scale-105 transition-all duration-200 animate-in fade-in-0 slide-in-from-bottom-4">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Orders</CardTitle>
              <ShoppingBag className="h-4 w-4 ml-auto text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">Total orders placed</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/account/wishlist">
          <Card className="cursor-pointer hover:shadow-md hover:scale-105 transition-all duration-200 animate-in fade-in-0 slide-in-from-bottom-4 delay-100">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Wishlist</CardTitle>
              <Heart className="h-4 w-4 ml-auto text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{wishlistCount}</div>
              <p className="text-xs text-muted-foreground">Saved items</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/account/profile">
          <Card className="cursor-pointer hover:shadow-md hover:scale-105 transition-all duration-200 animate-in fade-in-0 slide-in-from-bottom-4 delay-200">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Profile</CardTitle>
              <Settings className="h-4 w-4 ml-auto text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">✓</div>
              <p className="text-xs text-muted-foreground">Account settings</p>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Account Information */}
      <Card className="animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-300">
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
          <CardDescription>Manage your personal information and preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">First Name</label>
              <p className="text-sm">{user.name.firstname}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Last Name</label>
              <p className="text-sm">{user.name.lastname}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Email</label>
              <p className="text-sm">{user.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Username</label>
              <p className="text-sm">{user.username}</p>
            </div>
          </div>
          <div className="pt-4">
            <Button
              variant="outline"
              onClick={() => setIsEditModalOpen(true)}
              className="hover:scale-105 transition-transform"
            >
              <User className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-500">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your recent orders and account activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <ShoppingBag className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No recent activity</p>
            <p className="text-sm">Start shopping to see your order history here</p>
          </div>
        </CardContent>
      </Card>

      <EditProfileModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} />
    </div>
  )
}
