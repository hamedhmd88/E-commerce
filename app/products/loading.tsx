import { Navigation } from "@/components/layout/navigation"
import { Footer } from "@/components/layout/footer"

export default function Loading() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="h-9 w-1/4 bg-muted rounded mb-4 animate-pulse" />
          <div className="h-5 w-1/2 bg-muted rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-muted rounded-lg h-32 animate-pulse" />
            ))}
          </div>
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-muted rounded-lg h-64 mb-4" />
                  <div className="bg-muted rounded h-4 mb-2" />
                  <div className="bg-muted rounded h-4 w-2/3 mb-2" />
                  <div className="bg-muted rounded h-6 w-1/3" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}