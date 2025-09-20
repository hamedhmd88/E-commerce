import { Navigation } from "@/components/layout/navigation"
import { Footer } from "@/components/layout/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, User, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

// Mock blog post data
const mockBlogPosts = [
  {
    slug: "getting-started-with-ecommerce",
    title: "Getting Started with E-commerce: A Beginner's Guide",
    content: `
      <p>Starting an e-commerce business can be both exciting and overwhelming. In this comprehensive guide, we'll walk you through the essential steps to launch your online store successfully.</p>
      
      <h2>1. Choose Your Niche</h2>
      <p>The first step is identifying what products you want to sell. Consider your interests, market demand, and competition levels.</p>
      
      <h2>2. Set Up Your Online Store</h2>
      <p>Choose a reliable e-commerce platform that suits your needs and budget. Consider factors like ease of use, customization options, and payment processing.</p>
      
      <h2>3. Optimize for Success</h2>
      <p>Focus on user experience, mobile responsiveness, and search engine optimization to attract and retain customers.</p>
    `,
    excerpt: "Learn the essential steps to launch your online store successfully with our comprehensive beginner's guide.",
    author: "John Doe",
    publishedAt: "2024-01-15",
    readTime: "5 min read",
    category: "Business",
    image: "https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20ecommerce%20website%20dashboard%20clean%20design&image_size=landscape_16_9"
  },
  {
    slug: "mobile-commerce-trends",
    title: "Mobile Commerce Trends to Watch in 2024",
    content: `
      <p>Mobile commerce continues to reshape the retail landscape. Here are the key trends that will define mobile shopping in 2024.</p>
      
      <h2>1. Progressive Web Apps (PWAs)</h2>
      <p>PWAs offer app-like experiences through web browsers, providing faster loading times and offline functionality.</p>
      
      <h2>2. Voice Commerce</h2>
      <p>Voice-activated shopping is becoming more sophisticated, allowing customers to make purchases through smart speakers and voice assistants.</p>
      
      <h2>3. Augmented Reality Shopping</h2>
      <p>AR technology enables customers to visualize products in their own space before making a purchase decision.</p>
    `,
    excerpt: "Discover the mobile commerce trends that will shape the future of online shopping in 2024.",
    author: "Jane Smith",
    publishedAt: "2024-01-10",
    readTime: "7 min read",
    category: "Technology",
    image: "https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=mobile%20phone%20shopping%20app%20interface%20modern%20design&image_size=landscape_16_9"
  }
]

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = mockBlogPosts.find(p => p.slug === params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <Button variant="ghost" asChild className="mb-6">
            <Link href="/blog" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
          </Button>

          {/* Hero image */}
          <div className="aspect-video mb-8 rounded-lg overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Article header */}
          <header className="mb-8">
            <Badge className="mb-4">{post.category}</Badge>
            <h1 className="text-4xl font-bold mb-4 text-balance">{post.title}</h1>
            <p className="text-xl text-muted-foreground mb-6">{post.excerpt}</p>
            
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </header>

          {/* Article content */}
          <article 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Call to action */}
          <div className="mt-12 p-6 bg-gray-50 rounded-lg text-center">
            <h3 className="text-xl font-semibold mb-2">Ready to start your e-commerce journey?</h3>
            <p className="text-muted-foreground mb-4">Explore our products and find everything you need to succeed.</p>
            <Button asChild>
              <Link href="/">Shop Now</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

// Generate static params for known blog posts
export async function generateStaticParams() {
  return mockBlogPosts.map((post) => ({
    slug: post.slug,
  }))
}