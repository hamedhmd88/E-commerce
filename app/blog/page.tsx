import { Navigation } from "@/components/navigation"
import { BlogGrid } from "@/components/blog-grid"
import { Footer } from "@/components/footer"

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-6xl font-bold text-balance mb-6">Our Blog</h1>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Stay updated with the latest trends, product launches, and industry insights from ModernStore.
          </p>
        </div>
        <BlogGrid />
      </main>
      <Footer />
    </div>
  )
}
