import { Skeleton } from "@/components/ui/skeleton"
import { Navigation } from "@/components/layout/navigation"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* User Profile Header Skeleton */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-16 w-16 rounded-full bg-muted" /> {/* Avatar */}
              <div>
                <Skeleton className="h-6 w-40 bg-muted rounded" /> {/* Name */}
                <Skeleton className="h-4 w-32 bg-muted rounded mt-2" /> {/* Email */}
              </div>
            </div>
            <Skeleton className="h-10 w-28 bg-muted rounded" /> {/* Sign Out Button */}
          </div>

          {/* Cards Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Orders Card */}
            <Card>
              <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                <Skeleton className="h-4 w-16 bg-muted rounded" /> {/* Title */}
                <Skeleton className="h-4 w-4 ml-auto bg-muted rounded" /> {/* Icon */}
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-8 bg-muted rounded" /> {/* Number */}
                <Skeleton className="h-3 w-24 bg-muted rounded mt-2" /> {/* Description */}
              </CardContent>
            </Card>

            {/* Wishlist Card */}
            <Card>
              <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                <Skeleton className="h-4 w-16 bg-muted rounded" /> {/* Title */}
                <Skeleton className="h-4 w-4 ml-auto bg-muted rounded" /> {/* Icon */}
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-8 bg-muted rounded" /> {/* Number */}
                <Skeleton className="h-3 w-24 bg-muted rounded mt-2" /> {/* Description */}
              </CardContent>
            </Card>

            {/* Profile Card */}
            <Card>
              <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                <Skeleton className="h-4 w-16 bg-muted rounded" /> {/* Title */}
                <Skeleton className="h-4 w-4 ml-auto bg-muted rounded" /> {/* Icon */}
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-8 bg-muted rounded" /> {/* Number */}
                <Skeleton className="h-3 w-24 bg-muted rounded mt-2" /> {/* Description */}
              </CardContent>
            </Card>
          </div>

          {/* Account Information Card Skeleton */}
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-48 bg-muted rounded" /> {/* Title */}
              <Skeleton className="h-4 w-64 bg-muted rounded mt-2" /> {/* Description */}
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i}>
                    <Skeleton className="h-4 w-24 bg-muted rounded" /> {/* Label */}
                    <Skeleton className="h-4 w-32 bg-muted rounded mt-2" /> {/* Value */}
                  </div>
                ))}
              </div>
              <div className="pt-4">
                <Skeleton className="h-10 w-32 bg-muted rounded" /> {/* Edit Button */}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity Card Skeleton */}
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-40 bg-muted rounded" /> {/* Title */}
              <Skeleton className="h-4 w-56 bg-muted rounded mt-2" /> {/* Description */}
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-8">
                <Skeleton className="h-12 w-12 bg-muted rounded-full mb-4" /> {/* Icon */}
                <Skeleton className="h-4 w-32 bg-muted rounded mb-2" /> {/* Text */}
                <Skeleton className="h-3 w-48 bg-muted rounded" /> {/* Subtext */}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}