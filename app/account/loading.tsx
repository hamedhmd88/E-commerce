import { Skeleton } from "@/components/ui/skeleton"
import { Navigation } from "@/components/layout/navigation"
import { Footer } from "@/components/layout/footer"

export default function Loading() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto px-4 py-8 animate-pulse">
        <Skeleton className="h-96 rounded-lg" /> {/* Placeholder for AccountDashboard */}
      </main>
      <Footer />
    </div>
  )
}