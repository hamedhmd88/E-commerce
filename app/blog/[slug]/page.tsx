import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/components/blog/blog-grid";
import { RelatedBlogs } from "@/components/blog/related-blogs";
import { BreadcrumbNav } from "@/components/layout/breadcrumb-nav";
import { Calendar, Clock, User, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  return post
    ? {
        title: post.title,
        description: post.excerpt,
        openGraph: {
          title: post.title,
          description: post.excerpt,
          images: [post.image],
        },
      }
    : { title: "Article not found" };
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
          <div className="mx-auto max-w-3xl">
            {/* Back button */}
            <Button variant="ghost" asChild className="mb-6">
              <Link href="/blog" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Blog
              </Link>
            </Button>

            {/* Hero image */}
            <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-3xl bg-muted">
              <Image
                src={post.image}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
                priority
              />
            </div>

            {/* Article header */}
            <header className="mb-8">
              <Badge className="mb-4">{post.category}</Badge>
              <h1 className="mb-5 font-serif text-4xl leading-tight tracking-tight text-balance sm:text-6xl">
                {post.title}
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                {post.excerpt}
              </p>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{post.author} · Demo editorial</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </header>

            {/* Article content */}
            <article className="space-y-6 text-lg leading-[1.8] text-muted-foreground">
              {[...post.content.matchAll(/<(h2|p)>([\s\S]*?)<\/\1>/g)].map(
                (match, index) =>
                  match[1] === "h2" ? (
                    <h2
                      key={index}
                      className="pt-6 font-serif text-3xl leading-tight text-foreground"
                    >
                      {match[2].replace(/<[^>]*>/g, "")}
                    </h2>
                  ) : (
                    <p key={index}>{match[2].replace(/<[^>]*>/g, "")}</p>
                  ),
              )}
            </article>

            {/* Call to action */}
            <div className="mt-12 rounded-lg text-center">
              {/* Related blogs section */}
              <RelatedBlogs currentSlug={slug} />
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
