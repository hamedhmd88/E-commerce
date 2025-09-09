import { Navigation } from "@/components/navigation"
import { WishlistPage } from "@/components/wishlist-page"
import { Footer } from "@/components/footer"

export default function Wishlist() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <WishlistPage />
      </main>
      <Footer />
    </div>
  )
}
