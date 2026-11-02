"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/components/auth/auth-provider";
import { useWishlist } from "@/components/account/wishlist-provider";
import { ShoppingBag, Heart, Settings, LogOut } from "lucide-react";
import { getDemoOrders, type DemoOrder } from "@/lib/demo-orders";

export function AccountDashboard() {
  const { user, logout, isLoading } = useAuth();
  const { wishlistCount } = useWishlist();
  const router = useRouter();
  const [orders, setOrders] = useState<DemoOrder[]>([]);
  useEffect(() => {
    setOrders(getDemoOrders());
  }, []);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handleLogout = async () => {
    try {
      // Call logout to clear all data
      logout();

      // Use replace instead of push to prevent going back to account page
      await router.replace("/login");

      // Force a complete page refresh to ensure clean state
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout error:", error);
      // Fallback: force navigation to login
      window.location.href = "/login";
    }
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6 py-4 lg:py-7">
      <div className="glass-panel flex flex-wrap items-center justify-between gap-4 rounded-[1.75rem] p-5 sm:p-7">
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16 ring-4 ring-primary/15">
            <AvatarFallback className="bg-primary/15 text-lg text-primary">
              {user.name.firstname[0]}
              {user.name.lastname[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-xs font-semibold tracking-[.15em] text-primary">YOUR SPACE</p><h1 className="font-serif text-2xl sm:text-3xl">
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

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Link href="/account/orders">
          <Card className="glass-panel account-tile cursor-pointer rounded-2xl bg-transparent transition-transform duration-200 hover:-translate-y-1 motion-reduce:transform-none">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Orders</CardTitle>
              <ShoppingBag className="h-4 w-4 ml-auto text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{orders.length}</div>
              <p className="text-xs text-muted-foreground">
                Total orders placed
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/account/wishlist">
          <Card className="glass-panel account-tile cursor-pointer rounded-2xl bg-transparent transition-transform duration-200 hover:-translate-y-1 motion-reduce:transform-none">
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
          <Card className="glass-panel account-tile cursor-pointer rounded-2xl bg-transparent transition-transform duration-200 hover:-translate-y-1 motion-reduce:transform-none">
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
      <Card className="glass-panel rounded-[1.75rem] bg-transparent">
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
          <CardDescription>
            Manage your personal information and preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 [&>div]:rounded-xl [&>div]:border [&>div]:border-border/50 [&>div]:bg-background/40 [&>div]:p-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                First Name
              </label>
              <p className="text-sm">{user.name.firstname}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Last Name
              </label>
              <p className="text-sm">{user.name.lastname}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Email
              </label>
              <p className="text-sm">{user.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Username
              </label>
              <p className="text-sm">{user.username}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Phone
              </label>
              <p className="text-sm">{user.phone || "Not provided"}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Address
              </label>
              <p className="text-sm">
                {user.address
                  ? `${user.address.city}, ${user.address.street}`
                  : "Not provided"}
              </p>
            </div>
          </div>
          {/* حذف بخش pt-4 و دکمه Edit Profile */}
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="glass-panel rounded-[1.75rem] bg-transparent">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Recent demo orders saved in this browser
          </CardDescription>
        </CardHeader>
        <CardContent>
          {orders.length ? (
            <div className="space-y-3">
              {orders.slice(0, 3).map((order) => (
                <Link
                  key={order.id}
                  href={`/order-success?id=${encodeURIComponent(order.id)}`}
                  className="flex justify-between rounded-lg border p-3 hover:bg-muted/50"
                >
                  <span>{order.id}</span>
                  <span>${order.total.toFixed(2)}</span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-primary/25 bg-background/35 py-9 text-center text-muted-foreground">
              <ShoppingBag className="mx-auto mb-3 size-10 text-primary/60" />
              <p>No demo orders yet</p><Link href="/products" className="mt-3 inline-block text-sm font-medium text-primary underline underline-offset-4">Explore products</Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
