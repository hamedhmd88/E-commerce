import { Navigation } from "@/components/layout/navigation"
import { OrderSuccess } from "@/components/cart/order-success"
import { Footer } from "@/components/layout/footer"

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <OrderSuccess />
      </main>
      <Footer />
    </div>
  )
}
