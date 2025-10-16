import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/components/blog/blog-grid";
import { BreadcrumbNav } from "@/components/layout/breadcrumb-nav";
import { Calendar, Clock, User, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}



export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <div className="min-h-screen">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <BreadcrumbNav customLastLabel={slug} />
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
              <h1 className="text-4xl font-bold mb-4 text-balance">
                {post.title}
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                {post.excerpt}
              </p>

              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </header>

            {/* Article content */}
            <article
              className="prose prose-lg custom-prose max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Call to action */}
            <div className="mt-12 p-6 bg-gray-50 rounded-lg text-center">
              <h3 className="text-xl font-semibold mb-2">
                Ready to start your e-commerce journey?
              </h3>
              <p className="text-muted-foreground mb-4">
                Explore our products and find everything you need to succeed.
              </p>
              <Button asChild>
                <Link href="/">Shop Now</Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

// Generate static params for known blog posts
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}
