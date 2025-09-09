import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, ArrowRight } from "lucide-react"

const blogPosts = [
  {
    id: "1",
    slug: "2024-tech-trends",
    title: "Top Technology Trends to Watch in 2024",
    excerpt: "Discover the latest innovations shaping the tech industry and how they impact your daily life.",
    category: "Technology",
    author: "Sarah Johnson",
    date: "2024-01-15",
    readTime: "5 min read",
    image: "/modern-technology-trends.jpg",
  },
  {
    id: "2",
    slug: "sustainable-fashion-guide",
    title: "The Complete Guide to Sustainable Fashion",
    excerpt: "Learn how to build a sustainable wardrobe without compromising on style or quality.",
    category: "Fashion",
    author: "Emily Rodriguez",
    date: "2024-01-12",
    readTime: "7 min read",
    image: "/sustainable-fashion.png",
  },
  {
    id: "3",
    slug: "jewelry-care-tips",
    title: "How to Care for Your Precious Jewelry",
    excerpt: "Expert tips on maintaining and preserving your jewelry collection for years to come.",
    category: "Jewelry",
    author: "Michael Chen",
    date: "2024-01-10",
    readTime: "4 min read",
    image: "/luxury-jewelry-care.jpg",
  },
  {
    id: "4",
    slug: "home-office-setup",
    title: "Creating the Perfect Home Office Setup",
    excerpt: "Transform your workspace with the right electronics and accessories for maximum productivity.",
    category: "Lifestyle",
    author: "David Kim",
    date: "2024-01-08",
    readTime: "6 min read",
    image: "/modern-home-office.png",
  },
  {
    id: "5",
    slug: "spring-fashion-trends",
    title: "Spring Fashion Trends You Need to Know",
    excerpt: "Get ready for the new season with these must-have fashion pieces and styling tips.",
    category: "Fashion",
    author: "Lisa Wang",
    date: "2024-01-05",
    readTime: "5 min read",
    image: "/spring-fashion-trends.jpg",
  },
  {
    id: "6",
    slug: "smart-shopping-tips",
    title: "Smart Shopping: How to Get the Best Deals",
    excerpt: "Insider secrets to finding quality products at great prices and making informed purchases.",
    category: "Shopping",
    author: "Alex Thompson",
    date: "2024-01-03",
    readTime: "8 min read",
    image: "/smart-shopping-deals.jpg",
  },
]

export function BlogGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {blogPosts.map((post) => (
        <Link key={post.id} href={`/blog/${post.slug}`}>
          <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
            <CardHeader className="p-0">
              <div className="relative aspect-video overflow-hidden rounded-t-lg bg-muted">
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-4 left-4">{post.category}</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                <h3 className="text-xl font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>

                <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 text-primary">
                    <span>{post.readTime}</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
