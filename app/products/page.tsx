import { ProductsGrid } from "@/components/product/products-grid"
import { PageLayout } from '@/components/layout/page-layout'

export default function ProductsPage() {
  return (
    <PageLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-balance mb-4">All Products</h1>
        <p className="text-muted-foreground">Discover our complete collection of premium products</p>
      </div>
      <ProductsGrid />
    </PageLayout>
  )
}