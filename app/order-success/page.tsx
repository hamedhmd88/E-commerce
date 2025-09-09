import { Navigation } from "@/components/navigation"
import { OrderSuccess } from "@/components/order-success"
import { Footer } from "@/components/footer"

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
