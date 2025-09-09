import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Calendar, User, Clock, Share2 } from "lucide-react"

interface BlogPostProps {
  slug: string
}

// Mock blog post data - in a real app, this would come from a CMS or API
const getBlogPost = (slug: string) => {
  const posts = {
    "2024-tech-trends": {
      title: "Top Technology Trends to Watch in 2024",
      content: `
        <p>The technology landscape continues to evolve at an unprecedented pace, bringing innovations that reshape how we work, communicate, and live. As we navigate through 2024, several key trends are emerging that promise to have significant impact across industries.</p>
        
        <h2>Artificial Intelligence Integration</h2>
        <p>AI is no longer a futuristic concept but a present reality integrated into everyday applications. From smart home devices to advanced analytics platforms, AI is becoming more accessible and practical for consumers and businesses alike.</p>
        
        <h2>Sustainable Technology</h2>
        <p>Environmental consciousness is driving innovation in sustainable tech solutions. Companies are prioritizing eco-friendly materials, energy-efficient designs, and circular economy principles in their product development.</p>
        
        <h2>Enhanced Connectivity</h2>
        <p>The rollout of 5G networks and improvements in wireless technology are enabling new possibilities for remote work, IoT devices, and real-time collaboration tools.</p>
        
        <p>These trends represent just the beginning of what promises to be an exciting year of technological advancement. Stay tuned as we continue to monitor and report on these developments.</p>
      `,
      category: "Technology",
      author: "Sarah Johnson",
      date: "2024-01-15",
      readTime: "5 min read",
      image: "/modern-technology-trends.jpg",
    },
    "sustainable-fashion-guide": {
      title: "The Complete Guide to Sustainable Fashion",
      content: `
        <p>Sustainable fashion is more than just a trend—it's a movement towards responsible consumption and environmental stewardship. This comprehensive guide will help you understand how to build a wardrobe that's both stylish and sustainable.</p>
        
        <h2>Understanding Sustainable Fashion</h2>
        <p>Sustainable fashion encompasses ethical production practices, environmentally friendly materials, and designs that prioritize longevity over fast fashion trends.</p>
        
        <h2>Building Your Sustainable Wardrobe</h2>
        <p>Start by investing in quality pieces that will last for years. Look for timeless designs, durable materials, and versatile items that can be mixed and matched.</p>
        
        <h2>Caring for Your Clothes</h2>
        <p>Proper care extends the life of your garments. Follow care instructions, use eco-friendly detergents, and consider professional cleaning when necessary.</p>
        
        <p>Making sustainable fashion choices doesn't mean sacrificing style. With thoughtful selection and proper care, you can create a wardrobe that reflects your values and personal aesthetic.</p>
      `,
      category: "Fashion",
      author: "Emily Rodriguez",
      date: "2024-01-12",
      readTime: "7 min read",
      image: "/sustainable-fashion.png",
    },
  }

  return posts[slug as keyof typeof posts] || null
}

export function BlogPost({ slug }: BlogPostProps) {
  const post = getBlogPost(slug)

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto text-center py-16">
        <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
        <p className="text-muted-foreground mb-6">The blog post you're looking for doesn't exist.</p>
        <Button asChild>
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <article className="max-w-4xl mx-auto">
      {/* Back Button */}
      <Button variant="ghost" asChild className="mb-8">
        <Link href="/blog">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Link>
      </Button>

      {/* Header */}
      <header className="mb-8">
        <Badge className="mb-4">{post.category}</Badge>
        <h1 className="text-4xl lg:text-5xl font-bold text-balance mb-6">{post.title}</h1>

        <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
          <div className="flex items-center space-x-6 text-muted-foreground">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>{new Date(post.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>{post.readTime}</span>
            </div>
          </div>
          <Button variant="outline" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>

        {/* Featured Image */}
        <div className="relative aspect-video overflow-hidden rounded-lg bg-muted mb-8">
          <img src={post.image || "/placeholder.svg"} alt={post.title} className="object-cover w-full h-full" />
        </div>
      </header>

      {/* Content */}
      <div className="prose prose-lg max-w-none mb-12">
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>

      {/* Related Posts */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4">Continue Reading</h3>
          <div className="flex justify-between items-center">
            <p className="text-muted-foreground">Discover more insights and trends</p>
            <Button asChild>
              <Link href="/blog">View All Posts</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </article>
  )
}
