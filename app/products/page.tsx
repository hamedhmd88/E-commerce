import { ProductsGrid } from "@/components/product/products-grid"
import { PageLayout } from '@/components/layout/page-layout'
import { productService } from "@/services/productService"

// تعریف type Product برای سازگاری (می‌تونید این رو به فایل جداگانه منتقل کنید اگر لازم باشه)
interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

export default async function ProductsPage() {
  const products: Product[] = await productService.getAllProducts();
  return (
    <PageLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-balance mb-4">All Products</h1>
        <p className="text-muted-foreground">Discover our complete collection of premium products</p>
      </div>
      <ProductsGrid initialProducts={products} />
    </PageLayout>
  )
}