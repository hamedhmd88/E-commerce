import { Skeleton } from "@/components/ui/skeleton"
import { Navigation } from "@/components/layout/navigation"
import { Footer } from "@/components/layout/footer"

export default function Loading() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto px-4 py-16 animate-pulse">
        {/* Header */}
        <div className="text-center mb-16">
          <Skeleton className="h-12 w-64 mx-auto mb-6" />
          <Skeleton className="h-6 w-3/4 mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <Skeleton className="h-8 w-48 mb-6" />
            <Skeleton className="h-96 rounded-lg" />
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <Skeleton className="h-8 w-48 mb-6" />
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-32 rounded-lg mb-2" />
              ))}
            </div>
            <Skeleton className="h-32 rounded-lg" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}