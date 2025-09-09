import { Navigation } from "@/components/layout/navigation"
import { CheckoutPage } from "@/components/cart/checkout-page"
import { Footer } from "@/components/layout/footer"

export default function Checkout() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <CheckoutPage />
      </main>
      <Footer />
    </div>
  )
}
