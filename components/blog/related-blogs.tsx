import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { blogPosts } from "@/data/blog-posts";

export function RelatedBlogs({ currentSlug }: { currentSlug: string }) {
  const current = blogPosts.find((post) => post.slug === currentSlug);
  const related = blogPosts
    .filter((post) => post.slug !== currentSlug)
    .sort(
      (a, b) =>
        Number(b.category === current?.category) -
        Number(a.category === current?.category),
    )
    .slice(0, 3);
  return (
    <section aria-labelledby="related-heading" className="lg:sticky lg:top-28">
      <div className="mb-4 flex items-center justify-between gap-3 border-b border-border/70 pb-3">
        <h2 id="related-heading" className="font-serif text-2xl">
          Keep reading
        </h2>
        <span className="text-xs text-muted-foreground">Selected for you</span>
      </div>
      <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
        {related.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="journal-related glass-panel group grid grid-cols-[5.5rem_minmax(0,1fr)] gap-3 overflow-hidden rounded-2xl p-2.5 focus-visible:outline-offset-3 sm:grid-cols-1 lg:grid-cols-[5.5rem_minmax(0,1fr)]"
          >
            <div className="relative aspect-square overflow-hidden rounded-xl bg-muted sm:aspect-[1.8] lg:aspect-square">
              <Image
                src={post.image}
                alt=""
                fill
                sizes="(max-width: 1024px) 30vw, 100px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex min-w-0 flex-col justify-between py-0.5">
              <span className="text-[.68rem] font-medium text-primary">
                {post.category}
              </span>
              <h3 className="line-clamp-2 text-sm font-medium leading-snug tracking-[-.02em] transition-colors group-hover:text-primary">
                {post.title}
              </h3>
              <div className="flex items-center justify-between text-[.67rem] text-muted-foreground">
                <span>{post.readTime}</span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-3.5 text-primary"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
