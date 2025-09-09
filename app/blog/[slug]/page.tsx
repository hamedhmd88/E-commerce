import { Navigation } from "@/components/layout/navigation"
import { BlogPost } from "@/components/blog/blog-post"
import { Footer } from "@/components/layout/footer"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <BlogPost slug={params.slug} />
      </main>
      <Footer />
    </div>
  )
}
