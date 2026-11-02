import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Search } from "lucide-react";
import { blogPosts } from "@/data/blog-posts";
import { BlogPageSize } from "./blog-page-size";

const categories = ["All", "Jewelry", "Technology", "Fashion", "Shopping"];
const sizes = [10, 20, 30];

function blogHref(category?: string, query?: string, size = 10, page = 1) {
  const params = new URLSearchParams();
  if (category && category !== "All") params.set("category", category);
  if (query) params.set("q", query);
  if (size !== 10) params.set("size", String(size));
  if (page > 1) params.set("page", String(page));
  return `/blog${params.size ? `?${params}` : ""}`;
}

export function BlogGrid({
  category,
  query,
  page = 1,
  size = 10,
}: {
  category?: string;
  query?: string;
  page?: number;
  size?: number;
}) {
  const topic = categories.includes(category || "") ? category : undefined;
  const term = query?.trim().toLocaleLowerCase() || "";
  const pageSize = sizes.includes(size) ? size : 10;
  const filtered = blogPosts.filter(
    (post) =>
      (!topic || topic === "All" || post.category === topic) &&
      (!term ||
        `${post.title} ${post.excerpt} ${post.category}`
          .toLocaleLowerCase()
          .includes(term)),
  );
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(Math.max(1, page), pageCount);
  const visible = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  return (
    <section aria-label="Journal articles" className="pb-16">
      <div className="glass-panel journal-toolbar mb-8 rounded-[1.6rem] p-4 sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <form
            action="/blog"
            role="search"
            className="flex w-full max-w-xl items-center gap-2 rounded-2xl border border-border/70 bg-background/55 p-1.5 shadow-sm focus-within:ring-2 focus-within:ring-primary/30"
          >
            {topic && <input type="hidden" name="category" value={topic} />}
            {pageSize !== 10 && (
              <input type="hidden" name="size" value={pageSize} />
            )}
            <Search
              aria-hidden="true"
              className="ml-3 size-5 shrink-0 text-primary"
            />
            <input
              name="q"
              type="search"
              defaultValue={query}
              aria-label="Search journal articles"
              placeholder="Search stories, ideas, or topics"
              className="min-w-0 flex-1 bg-transparent px-2 py-2.5 text-sm outline-none placeholder:text-muted-foreground/80"
            />
            <button
              type="submit"
              className="rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-dark focus-visible:outline-offset-2"
            >
              Search
            </button>
          </form>
          <p
            aria-live="polite"
            className="shrink-0 text-sm text-muted-foreground"
          >
            {filtered.length} {filtered.length === 1 ? "story" : "stories"} to
            explore
          </p>
        </div>
        <nav
          className="mt-4 flex flex-wrap items-center gap-2 border-t border-border/60 pt-4"
          aria-label="Article categories"
        >
          <span className="mr-2 text-xs font-medium text-muted-foreground">
            Explore
          </span>
          {categories.map((item) => (
            <Link
              key={item}
              href={blogHref(item, query, pageSize)}
              aria-current={(topic || "All") === item ? "page" : undefined}
              className={`journal-chip rounded-full border px-4 py-2 text-sm font-medium transition-[background-color,color,border-color,transform] focus-visible:outline-offset-2 ${(topic || "All") === item ? "border-primary bg-primary text-primary-foreground" : "border-border/75 bg-background/50 text-foreground hover:border-primary/45 hover:bg-primary/10"}`}
            >
              {item}
            </Link>
          ))}
        </nav>
      </div>

      {visible.length === 0 ? (
        <div className="glass-panel rounded-3xl px-6 py-16 text-center">
          <h2 className="font-serif text-2xl">No stories found</h2>
          <p className="mt-2 text-muted-foreground">
            Try a different search or choose another topic.
          </p>
          <Link
            href="/blog"
            className="mt-5 inline-block font-medium text-primary underline underline-offset-4"
          >
            View all stories
          </Link>
        </div>
      ) : (
        <div className="journal-grid grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="journal-tile glass-panel group flex min-w-0 flex-col overflow-hidden rounded-[1.4rem] focus-visible:outline-offset-4"
            >
              <div className="relative aspect-[1.65] overflow-hidden bg-muted">
                <Image
                  src={post.image}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.045]"
                />
                <span className="absolute bottom-3 left-3 rounded-full border border-white/30 bg-black/45 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
                  {post.category}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <h2 className="text-balance text-xl font-medium leading-snug tracking-[-.035em] transition-colors group-hover:text-primary sm:text-[1.35rem]">
                  {post.title}
                </h2>
                <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted-foreground">
                  {post.excerpt}
                </p>
                <div className="mt-auto flex items-center justify-between gap-3 border-t border-border/60 pt-5 text-xs text-muted-foreground">
                  <span>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}{" "}
                    · {post.readTime}
                  </span>
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-primary/25 bg-primary/10 text-primary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                    <ArrowUpRight className="size-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {filtered.length > 0 && (
        <div className="mt-9 flex flex-col gap-5 border-t border-border/65 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <BlogPageSize size={pageSize} category={topic} query={query} />
          <nav
            aria-label="Journal pages"
            className="flex flex-wrap items-center gap-2"
          >
            <Link
              aria-disabled={currentPage === 1}
              tabIndex={currentPage === 1 ? -1 : undefined}
              href={blogHref(
                topic,
                query,
                pageSize,
                Math.max(1, currentPage - 1),
              )}
              className={`journal-page-control ${currentPage === 1 ? "pointer-events-none opacity-40" : ""}`}
            >
              <ArrowLeft className="size-4" />
              <span className="sr-only sm:not-sr-only">Previous</span>
            </Link>
            {Array.from({ length: pageCount }, (_, index) => index + 1).map(
              (number) => (
                <Link
                  key={number}
                  aria-current={currentPage === number ? "page" : undefined}
                  href={blogHref(topic, query, pageSize, number)}
                  className={`journal-page-control min-w-10 justify-center ${currentPage === number ? "border-primary bg-primary text-primary-foreground" : ""}`}
                >
                  {number}
                </Link>
              ),
            )}
            <Link
              aria-disabled={currentPage === pageCount}
              tabIndex={currentPage === pageCount ? -1 : undefined}
              href={blogHref(
                topic,
                query,
                pageSize,
                Math.min(pageCount, currentPage + 1),
              )}
              className={`journal-page-control ${currentPage === pageCount ? "pointer-events-none opacity-40" : ""}`}
            >
              <span className="sr-only sm:not-sr-only">Next</span>
              <ArrowRight className="size-4" />
            </Link>
          </nav>
        </div>
      )}
    </section>
  );
}
