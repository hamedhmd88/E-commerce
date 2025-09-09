import { Navigation } from "@/components/navigation"
import { ProductsGrid } from "@/components/products-grid"
import { Footer } from "@/components/footer"

export default function ProductsPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-balance mb-4">All Products</h1>
          <p className="text-muted-foreground">Discover our complete collection of premium products</p>
        </div>
        <ProductsGrid />
      </main>
      <Footer />
    </div>
  )
}
