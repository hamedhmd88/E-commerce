import { Navigation } from "@/components/navigation"
import { BlogPost } from "@/components/blog-post"
import { Footer } from "@/components/footer"

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
