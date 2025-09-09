import { Navigation } from "@/components/layout/navigation"
import { ProductDetail } from "@/components/product/product-detail"
import { Footer } from "@/components/layout/footer"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <ProductDetail productId={params.id} />
      </main>
      <Footer />
    </div>
  )
}
