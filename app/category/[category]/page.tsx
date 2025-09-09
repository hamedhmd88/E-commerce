import { Navigation } from "@/components/navigation"
import { CategoryProducts } from "@/components/category-products"
import { Footer } from "@/components/footer"

interface CategoryPageProps {
  params: {
    category: string
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const decodedCategory = decodeURIComponent(params.category)

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-balance mb-4 capitalize">{decodedCategory}</h1>
          <p className="text-muted-foreground">Browse our {decodedCategory} collection</p>
        </div>
        <CategoryProducts category={decodedCategory} />
      </main>
      <Footer />
    </div>
  )
}
