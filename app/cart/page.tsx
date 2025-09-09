import { Navigation } from "@/components/navigation"
import { CartPage } from "@/components/cart-page"
import { Footer } from "@/components/footer"

export default function Cart() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <CartPage />
      </main>
      <Footer />
    </div>
  )
}
