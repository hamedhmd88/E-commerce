import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { blogPosts } from "@/data/blog-posts";

export function RelatedBlogs({
  currentSlug,
  posts,
}: {
  currentSlug: string;
  posts: typeof blogPosts;
}) {
  const current = posts.find((post) => post.slug === currentSlug);
  const related = posts
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
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
        {related.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="journal-related glass-panel group grid grid-cols-[7rem_minmax(0,1fr)] gap-4 overflow-hidden rounded-[1.3rem] p-3 focus-visible:outline-offset-3 sm:grid-cols-1 lg:grid-cols-[7rem_minmax(0,1fr)]"
          >
            <div className="relative aspect-square overflow-hidden rounded-xl bg-muted sm:aspect-[1.7] lg:aspect-square">
              <Image
                src={post.image}
                alt=""
                fill
                sizes="(max-width: 1024px) 45vw, 112px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex min-w-0 flex-col justify-between py-0.5">
              <span className="text-xs font-medium text-primary">
                {post.category}
              </span>
              <h3 className="line-clamp-2 text-base font-semibold leading-snug tracking-[-.02em] transition-colors group-hover:text-primary">
                {post.title}
              </h3>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{post.readTime}</span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-4 text-primary"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
