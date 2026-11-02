import { BlogGrid } from "@/components/blog/blog-grid";
import { PageLayout } from "@/components/layout/page-layout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Journal",
  description: "Ideas on style, thoughtful shopping, and everyday technology.",
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{
    category?: string;
    q?: string;
    page?: string;
    size?: string;
  }>;
}) {
  const { category, q, page, size } = await searchParams;
  return (
    <PageLayout customLastLabel="Blog" variant="catalog">
      <header className="mb-8 max-w-3xl pt-6 lg:mb-10 lg:pt-9">
        <p className="mb-2 text-sm font-medium text-primary">
          The Morrow journal
        </p>
        <h1 className="text-4xl font-medium tracking-[-.055em] text-balance sm:text-5xl lg:text-6xl">
          Ideas for the everyday.
        </h1>
        <p className="mt-3 max-w-xl leading-7 text-muted-foreground">
          Considered notes on style, useful technology, and shopping well.
        </p>
      </header>
      <BlogGrid
        category={category}
        query={q}
        page={Number(page) || 1}
        size={Number(size) || 10}
      />
    </PageLayout>
  );
}
