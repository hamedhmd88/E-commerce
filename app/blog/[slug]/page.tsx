import { PageLayout } from "@/components/layout/page-layout";
import { RelatedBlogs } from "@/components/blog/related-blogs";
import { blogPosts } from "@/data/blog-posts";
import { ArrowLeft, CalendarDays, Clock3, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { localeCookie, normalizeLocale } from "@/lib/i18n/locale";
import { localizedBlogPost, localizedBlogPosts } from "@/data/blog-posts-fa";
import { translate } from "@/lib/i18n/translate";

type Props = { params: Promise<{ slug: string }> };

const editorialImages: Record<string, { src: string; caption: string }[]> = {
  Jewelry: [
    {
      src: "/luxury-jewelry-elegant-accessories.jpg",
      caption:
        "Look at scale, finish, and the details you will notice every day.",
    },
    {
      src: "/luxury-jewelry-care.jpg",
      caption: "Good care begins with knowing how a piece is made.",
    },
  ],
  Technology: [
    {
      src: "/modern-home-office.png",
      caption: "Start with the place and tasks a device needs to support.",
    },
    {
      src: "/modern-technology-trends.jpg",
      caption:
        "Compare the complete setup, not just the headline specification.",
    },
  ],
  Fashion: [
    {
      src: "/sustainable-fashion.png",
      caption: "The most useful pieces fit into the week you actually have.",
    },
    {
      src: "/summer-fashion-collection-modern-lifestyle.jpg",
      caption: "Fit, fabric, and care bring an outfit into everyday life.",
    },
  ],
  Shopping: [
    {
      src: "/smart-shopping-deals.jpg",
      caption: "A clearer comparison makes space for better choices.",
    },
    {
      src: "/modern-home-office.png",
      caption: "Imagine the item in its real place before deciding.",
    },
  ],
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const locale = normalizeLocale((await cookies()).get(localeCookie)?.value);
  const found = blogPosts.find((item) => item.slug === slug);
  const post = found ? localizedBlogPost(found, locale) : undefined;
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

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const locale = normalizeLocale((await cookies()).get(localeCookie)?.value);
  const found = blogPosts.find((item) => item.slug === slug);
  if (!found) notFound();
  const post = localizedBlogPost(found, locale);
  const blocks = [...post.content.matchAll(/<(h2|p)>([\s\S]*?)<\/\1>/g)].map(
    (match) => ({ type: match[1], text: match[2].replace(/<[^>]*>/g, "") }),
  );
  const images = editorialImages[post.category];
  const sectionCount = blocks.filter((block) => block.type === "h2").length;
  const imageAfter = [
    Math.max(1, Math.floor(sectionCount / 3)),
    Math.max(2, Math.floor((sectionCount * 2) / 3)),
  ];
  let sectionIndex = 0;

  return (
    <PageLayout customLastLabel={post.title} variant="catalog">
      <div className="pt-5 lg:pt-7">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary focus-visible:outline-offset-2"
        >
          <ArrowLeft className="size-4" />
          Back to journal
        </Link>
      </div>
      <div className="mt-5 grid items-start gap-8 pb-20 lg:grid-cols-[minmax(0,1fr)_22rem] xl:grid-cols-[minmax(0,1fr)_24rem] xl:gap-12">
        <article className="min-w-0">
          <header className="mb-7 max-w-3xl">
            <div className="mb-4 flex items-center gap-3">
              <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                {post.category}
              </span>
              <span className="text-xs text-muted-foreground">
                Morrow journal
              </span>
            </div>
            <h1 className="max-w-[18ch] font-serif text-[clamp(2.4rem,4.7vw,4.8rem)] leading-[1.05] tracking-[-.055em] text-balance">
              {post.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
              {post.excerpt}
            </p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 border-t border-border/70 pt-5 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <UserRound className="size-4 text-primary" />
                {post.author} editorial
              </span>
              <span className="inline-flex items-center gap-2">
                <CalendarDays className="size-4 text-primary" />
                {new Date(post.date).toLocaleDateString(
                  locale === "fa" ? "fa-IR" : "en-US",
                  {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  },
                )}
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock3 className="size-4 text-primary" />
                {post.readTime}
              </span>
            </div>
          </header>
          <figure className="journal-cover glass-panel relative mb-11 overflow-hidden rounded-[1.6rem] p-2">
            <div className="relative aspect-[1.65] overflow-hidden rounded-[1.2rem] bg-muted sm:aspect-[1.85]">
              <Image
                src={post.image}
                alt={post.title}
                fill
                sizes="(max-width: 1024px) 100vw, 70vw"
                className="object-cover"
                priority
              />
            </div>
            <figcaption className="flex items-center justify-between px-3 py-3 text-xs text-muted-foreground">
              <span>Morrow editorial</span>
              <span>
                {post.category} / {post.readTime}
              </span>
            </figcaption>
          </figure>
          <div className="journal-article-body max-w-[74ch]">
            {blocks.map((block, index) => {
              if (block.type === "h2") sectionIndex += 1;
              const inlineIndex =
                block.type === "p" && index > 0
                  ? imageAfter.findIndex(
                      (position) =>
                        position === sectionIndex &&
                        blocks[index - 1]?.type === "h2",
                    )
                  : -1;
              return (
                <div key={`${post.slug}-${index}`}>
                  {block.type === "h2" ? (
                    <h2 className="mb-4 mt-10 font-serif text-[clamp(1.7rem,2.7vw,2.35rem)] leading-tight tracking-[-.035em] text-foreground">
                      {block.text}
                    </h2>
                  ) : (
                    <p
                      className={`mb-5 text-[1.02rem] leading-[1.85] text-muted-foreground sm:text-[1.08rem] ${index === 0 ? "journal-lead text-foreground" : ""}`}
                    >
                      {block.text}
                    </p>
                  )}
                  {inlineIndex >= 0 && images[inlineIndex] && (
                    <figure className="my-9">
                      <div className="glass-panel relative aspect-[1.8] overflow-hidden rounded-2xl p-1.5">
                        <div className="relative size-full overflow-hidden rounded-[.85rem]">
                          <Image
                            src={images[inlineIndex].src}
                            alt=""
                            fill
                            sizes="(max-width: 1024px) 100vw, 70vw"
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <figcaption className="mt-2 px-1 text-xs leading-5 text-muted-foreground">
                        {translate(images[inlineIndex].caption, locale)}
                      </figcaption>
                    </figure>
                  )}
                </div>
              );
            })}
          </div>
          <div className="mt-12 border-t border-border/70 pt-6">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              <ArrowLeft className="size-4" />
              Explore all stories
            </Link>
          </div>
        </article>
        <aside className="min-w-0 lg:self-stretch">
          <RelatedBlogs currentSlug={slug} posts={localizedBlogPosts(locale)} />
        </aside>
      </div>
    </PageLayout>
  );
}
