import { Navigation } from "@/components/layout/navigation"
import { ProductDetail } from "@/components/product/product-detail"
import { Footer } from "@/components/layout/footer"
import { PageLayout } from '@/components/layout/page-layout'
import { productService } from "@/services/productService"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await productService.getProduct(Number(params.id))

  return (
    <PageLayout customLastLabel={product.title}>
      <ProductDetail productId={params.id} />
    </PageLayout>
  )
}
