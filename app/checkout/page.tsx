import { Navigation } from "@/components/navigation"
import { CheckoutPage } from "@/components/checkout-page"
import { Footer } from "@/components/footer"

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
